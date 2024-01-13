import { useEffect, useState } from "react";
import Product from "./product";
import { convertPrice } from "./convertPrice";
import Slider from "./Slider";
import { useDispatch, useSelector } from "react-redux";
import { byType } from "../store/slices/userSlice";
import { ClipLoader } from "react-spinners";

// eslint-disable-next-line react/prop-types
const GetProducts = ({ type, size, numOfPage }) => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const { productsByType } = useSelector(state => state.user);
  const sizeOfPage = 3;

  function productsBySlider(numOfPage, products) {
    const startLen = (numOfPage * sizeOfPage) - sizeOfPage;
    const endLen = (numOfPage * sizeOfPage) - 1;
    const productsLen = products.filter((_, index) => index >= startLen && index <= endLen);
    setProducts(productsLen);
  }

  useEffect(() => {
    dispatch(byType(type));
  }, [type, dispatch])


  useEffect(() => {
    if (productsByType.length) productsBySlider(numOfPage, productsByType);
  }, [productsByType, numOfPage])

  useEffect(() => {
    if (productsByType.length) {
      if (+size) {
        const sizeProducts = productsByType.filter((_, index) => index + 1 <= size);
        setProducts(sizeProducts);
      }
    }
  }, [productsByType, size])

  return (
    <>
      {products.length ? 
        <div className="flex flex-wrap gap-4 gap-y-7 items-center md:items-start justify-center">
          {
            products.map((item) => (
              <Product key={item.title}
                item={item}
                img={`/imgs/Products/${item.title}/${item.mainPhoto}`}
                sale={item.sale}
                title={item.title}
                beforeSale={convertPrice(+item.price)}
                afterSale={convertPrice(+parseInt(item.price - ((item.price * item.sale) / 100)))} />
            ))
          }
        </div>
      :
      <p className="flex gap-1 items-center text-[24px]">L <ClipLoader color="#DB4444" size={18} cssOverride={{}} loading speedMultiplier={1} /> ding</p>}

      {Math.ceil(productsByType.length / sizeOfPage) > 1 && !size && numOfPage <= Math.ceil(productsByType.length / sizeOfPage) ? <Slider size={productsByType.length ? productsByType.length : 0} sizeOfPage={sizeOfPage} /> : null}
    </>
  );
}

export default GetProducts;
