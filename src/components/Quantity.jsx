/* eslint-disable react/prop-types */
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { updateCartOnCounter } from "../store/slices/userSlice";

const Quantity = ({ item, minCounter }) => {
  const refCounter = useRef();
  const dispatch = useDispatch();

  function plusFunc() {
    refCounter.current.innerHTML++;
    dispatch(updateCartOnCounter({item, counter: +refCounter.current.innerHTML}));
  }

  function minusFunc() {
    refCounter.current.innerHTML--;
    minCounter === '1' && refCounter.current.innerHTML === '0' ? refCounter.current.textContent = 1 : dispatch(updateCartOnCounter({item, counter: +refCounter.current.innerHTML}));
  }

  return (
    <div className="quantity flex flex-row h-[32px] w-fit">
      <div onClick={minusFunc} className="minus cursor-pointer w-[40px] flex items-center justify-center border text-white"><img src="/imgs/icon-minus.svg" alt="img" /></div>
      <div ref={refCounter} className="counter border-t border-b w-[53px] font-inter text-[20px] font-semibold flex items-center justify-center select-none">{item.counter}</div>
      <div onClick={plusFunc} className="plus cursor-pointer w-[40px] flex items-center justify-center bg-button2 text-white"><img src="/imgs/icon-plus.svg" alt="img" /></div>
    </div>
  );
}

export default Quantity;
