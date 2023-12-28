/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux";
import Product from "../../product";
import { convertPrice } from "../../convertPrice";
import { useEffect } from "react";
import axios from "axios";
import { updateCart, updateProductsUser } from "../../../store/slices/userSlice";
import { Link } from "react-router-dom";
import Categories from "../home/Categories";

const Wishlist = () => {
  const { userId, productsUser } = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) {
      axios(`http://localhost:3005/users/${userId}`).then(({ data }) => {
        if (data.cart) dispatch(updateCart(data.cart));
        if (data.wishlist) dispatch(updateProductsUser(data.wishlist));
    })
    }
  }, [userId])

  return (
    <>
      <div className="wishlist container px-3 mx-auto my-[50px]">
      {productsUser.length ? <h1 className="font-inter text-center md:text-left text-[31px] md:text-[36px] mt-5 mb-9 font-semibold leading-[48px] tracking-[1.44px] capitalize">{productsUser.length ? 'Browse By Wishlist' : null}</h1> : null}
        {productsUser.length ? 
          <div className="products flex-wrap flex flex-col md:flex-row gap-5 items-center md:items-start justify-center">
            {
              productsUser.map((item) => (
                <Product key={item.title}
                  item={item}
                  img={`../imgs/Products/${item.title}/${item.mainPhoto}`}
                  sale={item.sale}
                  title={item.title}
                  beforeSale={convertPrice(+item.price)}
                  afterSale={convertPrice(+parseInt(item.price - ((item.price * item.sale) / 100)))}
                />
              ))
            }
          </div>
        : <Link to='/'><p className="text-[35px] font-semibold font-inter text-center">Add To Wishlist!</p></Link>}
      </div>
      <Categories />
    </>

  );
}

export default Wishlist;
