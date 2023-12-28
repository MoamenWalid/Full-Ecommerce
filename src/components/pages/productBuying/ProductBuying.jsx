/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Quantity from "../../Quantity";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { convertPrice } from "../../convertPrice";
import { updateCart, updateProductsUser, wishlistProducts } from "../../../store/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import Categories from "../home/Categories";

const ProductBuying = () => {
  const param = useParams();
  const [product, setProduct] = useState({});
  const [srces, setSrces] = useState([]);
  const [srcImg, setSrcImg] = useState('');
  const refIcon = useRef();
  const refImg = useRef();
  const { userId } = useSelector(state => state.user);
  const dispatch = useDispatch();
  
  useEffect(() => {
    axios('http://localhost:3005/products').then(({ data }) => {
      const found = data[0][param.cat].find(item => item.id == param.id);
      const defaultColors = Object.values(found.colors[0])[0].map(src => `/imgs/Products/${found.title}/${src}`);
      setProduct(found);
      setSrces(defaultColors);
      setSrcImg(defaultColors[0]);
    })
  }, [param.cat, param.id])

  useEffect(() => {
    if (Object.keys(product).length && userId) {
      axios(`http://localhost:3005/users/${userId}`).then(({ data }) => {
        dispatch(updateProductsUser(data.wishlist));
        dispatch(updateCart(data.cart));

        const itemIndexWishlist = data.wishlist.findIndex(element => element.title == product.title);
        if (itemIndexWishlist >= 0) refIcon.current.classList.add('active');
    })
    }
  }, [product])

  function getColors() {
      const colors = product.colors.map(color => Object.keys(color)[0]);
      return colors;  
  }

  function clickColor(color) {
    const foundColor = product.colors.find(obj => Object.keys(obj)[0] == color);
    const srcImgs = Object.values(foundColor)[0].map(src => `/imgs/Products/${product.title}/${src}`);
    setSrces(srcImgs);
    setSrcImg(srcImgs[0]);
  }

  function addAlert() {
    withReactContent(Swal).fire({
      icon: "error",
      html: "You Must <span class='text-button2 font-inter font-medium'>Log in</span> Or <span class='text-button2 font-inter font-medium'>Sign up</span>",
    })
  }

  function onClickHeart() {
    if (Object.keys(product).length && userId) {
      refIcon.current.classList.toggle('active');
      dispatch(wishlistProducts(product));
    }
    else addAlert();
  }

  return (
    <>
      <div className="container mt-[60px] mx-auto px-5">
        {Object.keys(product).length > 0 && <div className="flex flex-col md:flex-row gap-6">
          <div className="main-photo overflow-hidden flex max-h-[400px] min-w-[330px] basis-[400px] items-center order-1 md:order-2 justify-center">
            {srcImg.length ? <img className="max-h-full" ref={refImg} src={srcImg} alt="img" /> : <p>Loading...</p>}
          </div>

          <div className="rounded-photos m-auto md:m-0 flex-wrap w-fit items-start justify-start order-2 md:order-1 flex flex-row md:flex-col gap-3">
            {srces.length ? srces.map(src => <div onClick={() => setSrcImg(src)} key={src} className="w-[60px] cursor-pointer p-4 rounded-md bg-secondary overflow-hidden"><img className="w-full" src={src} alt="img" /></div>) : <p>Loading...</p>}
          </div>

          <div className="product-details flex pl-3 flex-col gap-4 order-3">
            <h2 className="title text-[20px] font-inter font-semibold">{product.title}</h2>
            <span className="price block font-medium"><span className="text-button2">{convertPrice(+parseInt(product.price - ((product.price * product.sale) / 100)) * product.counter)}</span> EGP</span>
            <div className="colors flex items-center gap-2">Colors: {getColors().map(color => (<span onClick={() => clickColor(color)} key={color} style={{background: `${color}`, border: '2px solid #fff', outline: '1px solid #333'}} className={`inline-block cursor-pointer w-[17px] h-[17px] rounded-full`}></span>))}</div>
            <div className="buying flex gap-3 items-center justify-start">
              <Quantity item={product} minCounter='1' />
              <button className="bg-button2 text-white px-2 py-1 rounded">Buy Now</button>
              <div className="px-2 py-1 rounded-md border cursor-pointer"><FontAwesomeIcon ref={refIcon} onClick={onClickHeart} icon={faHeart} className="heart-icon text-red-200" /></div>
            </div>
            <div className="description mt-1">
              <p className="text-button2 font-inter font-medium">Description: </p>
              <ul className="description text-[15px] md:text-[17px]">
                {product.description.map(dec => (<li key={dec} className="p-[5px]">{dec}</li>))}
              </ul>
            </div>
          </div>
        </div>}
      </div>
      <Categories />
    </>
  );
}

export default ProductBuying;
















