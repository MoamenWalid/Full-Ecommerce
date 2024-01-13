/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { cartProducts, updateCart, updateProductsUser, wishlistProducts } from '../store/slices/userSlice';
import axios from 'axios';
import Swal from 'sweetalert2';
import urlFetching from '../url/url';


const Product = ({ item, img, sale, title, beforeSale, afterSale }) => {
  const [isHovered, setHovered] = useState(false);
  const refIcon = useRef();
  const refText = useRef();
  const { userId } = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) {
      axios(urlFetching(`users/${userId}`)).then(({ data }) => {
        dispatch(updateProductsUser(data.wishlist));
        dispatch(updateCart(data.cart));

        const itemIndexWishlist = data.wishlist.findIndex(element => element.title == item.title);
        const itemIndexCart = data.cart.findIndex(element => element.title == item.title);

        if (itemIndexWishlist >= 0) refIcon.current ? refIcon.current.classList.add('active') : null;
        if (itemIndexCart >= 0) refIcon.current ? refText.current.textContent = 'In Cart' : null;
    })
    }
  }, [])

  function addAlert() {
    Swal.fire({
      icon: "error",
      html: "You Must <span class='text-button2 font-inter font-medium'>Log in</span> Or <span class='text-button2 font-inter font-medium'>Sign up</span>",
    })
  }

  function onClickHeart() {
    if (userId) {
      refIcon.current.classList.toggle('active');
      dispatch(wishlistProducts(item));
    }
    else addAlert();
  }

  function onClickAddToCart() {
    if (userId) {
      refText.current.textContent = 'In cart';
      dispatch(cartProducts(item));
    }
    else addAlert();
  }

  const variants = {
    hidden: {y: '100%', opacity: 0},
    h : {y: 0, opacity: 1}
  }

  return (
    <div className='flex max-w-[262px] flex-col gap-3'>
      <motion.div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} className="product relative overflow-hidden photo p-12 px-14 rounded-[10px] w-fit">
        <Link to={`/products/${item.cat}/${item.id}`}><img src={img} className="max-w-[150px]" alt="img" /></Link>
        {+sale ? <span className="absolute top-2 left-2 sale bg-button2 rounded p-1 px-2 font-thin text-sm text-white">-{sale}%</span> : null}
        
        <FontAwesomeIcon ref={refIcon} onClick={onClickHeart} icon={faHeart} className={`heart-icon absolute top-2 right-2 p-2 w-[20px] h-[20px] rounded-[50%] cursor-pointer`}></FontAwesomeIcon>
        
        <motion.button ref={refText} onClick={onClickAddToCart} variants={variants} animate={isHovered ? 'hover' : 'hidden'} className="bg-black text-white absolute bottom-0 left-0 w-full p-2 font-light font-inter tracking-[1.92px]">Add To Cart</motion.button>
      </motion.div>
    
      <div className="text">
        <div className="title font-semibold tracking-[1.25px]">{title}</div>
        <div className="price text-button2 text-[16px] font-medium leading-[24px]">{afterSale} EGP<span className="text-dark pl-2 line-through">{+sale ? `${beforeSale} EGP` : null}</span></div>
      </div>
    </div>
  );
}

export default Product;







