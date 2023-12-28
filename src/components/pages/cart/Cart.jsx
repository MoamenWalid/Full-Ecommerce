/* eslint-disable react-hooks/exhaustive-deps */

import { useDispatch, useSelector } from "react-redux";
import { convertPrice } from "../../convertPrice";
import Quantity from "../../Quantity";
import { useEffect } from "react";
import axios from "axios";
import { removeCartItem, updateCart, updateProductsUser } from "../../../store/slices/userSlice";
import { Link } from "react-router-dom";
import Categories from "../home/Categories";

const Cart = () => {
  const { userId, cartProductsUser } = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) {
      axios(`http://localhost:3005/users/${userId}`).then(({ data }) => {
      if (data.cart) dispatch(updateCart(data.cart));
      if (data.wishlist) dispatch(updateProductsUser(data.wishlist));
    })
    }
  }, [userId])

  const totalPrice = cartProductsUser.reduce((acc, current) => acc + (current.counter * +parseInt(current.price - ((current.price * current.sale) / 100))), 0);
  
  return (
    <>
      <div className="cart container my-[50px] mx-auto px-3 flex gap-7 flex-col">
        {cartProductsUser.length ? <h1 className="text-[30px] pb-6 font-medium font-inter text-center">Your Cart</h1> : null}

        {cartProductsUser.length ?
          cartProductsUser.map(item => (
            <div className="product select-none pb-5 flex gap-7 border-b" key={`${item.title}${item.id}`}>
              <div className="photo w-[145px]"><img src={`/imgs/Products/${item.title}/${item.mainPhoto}`} alt="img" /></div>
              <div className="details flex flex-col gap-2">
                <div className="title text-[19px]">{item.title}</div>
                <div className="price text-[17px]">Price: <span className="text-button2">{convertPrice(+parseInt(item.price - ((item.price * item.sale) / 100)))}</span> EGP</div>
                <div className="count"><Quantity item={item}/></div>
                <div className="total-price">Total: <span className="text-button2">{convertPrice(+parseInt(item.price - ((item.price * item.sale) / 100)) * item.counter)}</span> EGP</div>
                <div onClick={() => dispatch(removeCartItem(item))} className="remove text-button2 cursor-pointer text-[14px] font-inter font-extralight">Remove</div>
              </div>
            </div>
          ))
        : <Link to='/'><p className="text-[35px] font-semibold font-inter text-center">Add To Cart!</p></Link>}
        {cartProductsUser.length ?
          <div className="total-cart text-center my-5">
            <h3 className="font-inter font-semibold text-[25px] mb-1">Cart Total</h3>
            <p className="font-normal">Total: <span className="text-button2">{convertPrice(totalPrice)}</span> EGP</p>
          </div>  
        : null}
      </div>
      <Categories />
    </>
  );
}

export default Cart;
