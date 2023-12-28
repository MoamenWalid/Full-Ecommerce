/* eslint-disable react/prop-types */

import { useContext, useEffect, useRef } from "react";
import { NumOfPage } from "./pages/products/Products";


const Slider = ({ size, sizeOfPage }) => {
  const { setSearchParams, searchParams } = useContext(NumOfPage);
  const num = +searchParams.get('page');
  const ref3 = useRef();

  useEffect(() => {
    const buttons = document.querySelectorAll('.nums button');
    if (buttons[num - 1]) {
      buttons.forEach(button => {
        button.classList.remove('active');
      })

      buttons[num - 1].classList.add('active');
    } else buttons[2].classList.add('active');
  }, [num])

  function loopingButtonActive(event, page) {
    const buttons = document.querySelectorAll('.nums button');
    if (buttons.length) {
      buttons.forEach(button => {
        button.classList.remove('active');
      })

      event.target.classList.add('active');
      setSearchParams({ page });
    }
  }

  return (
    <div className="border mt-7 mx-auto rounded-md flex flex-row w-fit p-3">
      <button className="previous flex items-center gap-1" onClick={() => searchParams.get('page') - 1 >= 1 ? setSearchParams({ page: +searchParams.get('page') - 1 }) : false}>
        <img className="w-[13px] md:w-[15px]" src="/imgs/arrow-left.svg" alt="arrow" />
        <span className="pr-2 border-r">Prev</span>
      </button>

      <div className="nums flex items-center justify-center gap-4 px-4">
        <button onClick={(e) => loopingButtonActive(e, 1)} className="w-[20px] md:w-[30px] font-semibold">1</button>
        <button onClick={(e) => loopingButtonActive(e, 2)} className="w-[20px] md:w-[30px] font-semibold">2</button>
        {Math.ceil(size / sizeOfPage) >= 3 && <button ref={ref3} onClick={(e) => loopingButtonActive(e, ref3.current.textContent)} className="w-[20px] md:w-[30px] font-semibold">{+searchParams.get('page') > 3 ? searchParams.get('page') : 3}</button>}
        {Math.ceil(size / sizeOfPage) === 4 && <button onClick={(e) => loopingButtonActive(e, 4)} className="w-[20px] md:w-[30px] font-semibold">4</button>}

        {(Math.ceil(size / sizeOfPage) > 4 && (ref3.current && +ref3.current.textContent < Math.ceil(size / sizeOfPage))) ? <span className="w-fit text-center text-[#6f7373]">...</span> : null}
        {(Math.ceil(size / sizeOfPage) > 4 && (ref3.current && +ref3.current.textContent < Math.ceil(size / sizeOfPage))) ? <span className="w-[20px] md:w-[30px] text-center text-[#6f7373]">{Math.ceil(size / sizeOfPage)}</span> : null}
      </div>

      <button className="next flex items-center gap-1" onClick={() => +searchParams.get('page') + 1 <= Math.ceil(size / sizeOfPage) ? setSearchParams({ page: +searchParams.get('page') + 1 }) : false}>
        <span className="pl-2 border-l">Next</span>
        <img className="w-[13px] md:w-[15px]" src="/imgs/arrow-right.svg" alt="arrow" />
      </button>
    </div>
  );
}

export default Slider;
