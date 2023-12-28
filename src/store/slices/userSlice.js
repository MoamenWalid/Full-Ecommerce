import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";

export const userLogging = createAsyncThunk('userSlice/userLogging', async(_, { rejectWithValue }) => {
  try {
    const { data } = await axios({url: 'http://localhost:3005/user', method: 'GET'});
    return data;

  } catch (error) {
    return rejectWithValue(error.message);
  }
})

export const wishlistProducts = createAsyncThunk('userSlice/wishlist', async(data, { rejectWithValue }) => {
  try {
    return data;

  } catch (error) {
    return rejectWithValue(error.message);
  }
})

export const updateAccount = createAsyncThunk('userSlick/updateAccount', async(DATA, { rejectWithValue, getState }) => {
  try {
    const { data } = await axios.get(`http://localhost:3005/users/${getState().user.userId}`);
    return {...DATA, wishlist: [...data.wishlist], cart: [...data.cart]};

  } catch (error) {
    return rejectWithValue(error.message);
  }
})

export const cartProducts = createAsyncThunk('userSlice/cartProducts', async(data, { rejectWithValue }) => {
  try {
    return data;

  } catch (error) {
    return rejectWithValue(error.message);
  }
}) 

export const byType = createAsyncThunk('userSlice/byType', async(cat, { rejectWithValue }) => {
  try {
    const { data } = await axios.get('http://localhost:3005/products');
    return { data, cat };

  } catch (error) {
    return rejectWithValue(error.message);
  }
})

const userSlice = createSlice({
  name: 'userSlice',
  initialState: {userId: 0, user: {}, productsUser: [], cartProductsUser: [], productsByType: [], updateAccount: {}},

  reducers: {
    updateProductsUser(state, action) {
      state.productsUser = [];
      state.productsUser = action.payload;
    },
    updateCart(state, action) {
      state.cartProductsUser = [];
      state.cartProductsUser = action.payload;
    },
    updateCartOnCounter(state, action) {
      if (state.userId) {
        const itemIndex = current(state).cartProductsUser.findIndex(element => element.title == action.payload.item.title);
        if (itemIndex >= 0 && action.payload.counter <= 0) state.cartProductsUser.splice(itemIndex, 1);
        else if (itemIndex >= 0 && action.payload.counter > 0) state.cartProductsUser[itemIndex].counter = action.payload.counter;
        axios({url: `http://localhost:3005/users/${state.userId}`, method: 'PUT', data: {...state.user, wishlist: [...state.productsUser], cart: [...state.cartProductsUser]}});
      }
    },
    removeCartItem(state, action) {
      const itemIndex = current(state).cartProductsUser.findIndex(element => element.title == action.payload.title);
      state.cartProductsUser.splice(itemIndex, 1);
      axios({url: `http://localhost:3005/users/${state.userId}`, method: 'PUT', data: {...state.user, wishlist: [...state.productsUser], cart: [...state.cartProductsUser]}});
    },
    removeUser(state) {
      state.user = {};
      state.userId = 0;
      axios.post('http://localhost:3005/user', {});
    },
    updateUser(state, action) {
      state.user = action.payload;
      axios.post('http://localhost:3005/user', {...action.payload, id: state.userId});
    }
  },

  extraReducers: (builder) => {
    builder.addCase(userLogging.fulfilled, (state, action) => {
      state.user = action.payload;
      state.userId = action.payload.id;
    }) 

    builder.addCase(wishlistProducts.fulfilled, (state, action) => {
      const itemIndexWishlist = current(state).productsUser.findIndex(element => element.title == action.payload.title);
      itemIndexWishlist >= 0 ? state.productsUser.splice(itemIndexWishlist, 1) : state.productsUser.push(action.payload);
      axios({url: `http://localhost:3005/users/${state.userId}`, method: 'PUT', data: {...state.user, wishlist: [...state.productsUser], cart: [...state.cartProductsUser]}});
    }) 

    builder.addCase(cartProducts.fulfilled, (state, action) => {
      const itemIndexCart = current(state).cartProductsUser.findIndex(element => element.title == action.payload.title);
      if (itemIndexCart < 0) state.cartProductsUser.push(action.payload);
      axios({url: `http://localhost:3005/users/${state.userId}`, method: 'PUT', data: {...state.user, wishlist: [...state.productsUser], cart: [...state.cartProductsUser]}});
    })

    builder.addCase(byType.fulfilled, (state, action) => {
      state.productsByType = [];
      const { data, cat } = action.payload; 
      if (cat === 'sale') {
        for(const key in data[0]) {
          data[0][key].filter(item => item.saleBool ? state.productsByType.push(item) : false)
        }
      } else {
        data[0][cat].map(item => state.productsByType.push(item));
      }
    })
  }
})

export const { updateProductsUser, updateCart, updateCartOnCounter, removeCartItem, removeUser, updateUser } = userSlice.actions;
export default userSlice.reducer;




