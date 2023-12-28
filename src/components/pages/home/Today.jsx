
import { Link } from "react-router-dom";
import Button from "../../Button";
import Cat from "../../Cat";
import GetProducts from "../../GetProducts";
import TimeSale from "../../TimeSale";
import { useState } from "react";

const Today = () => {
  const [dateSale, setDateSale] = useState(['00', '00', '00', '00']);

  return (
    <>
      {dateSale.length ?
        <div className="container border-b pb-[30px] px-3 mx-auto my-[50px]">
        <Cat text={`Today's`}/>
        <div className="flex items-center mt-5 mb-9 justify-center md:justify-start flex-wrap gap-5 md:gap-10">
          <h1 className="font-inter text-[31px] md:text-[36px] font-semibold leading-[48px] tracking-[1.44px]">Flash Sales</h1>
          <TimeSale date="Feb 18, 2024 16:09:20" setDateSale={setDateSale} dateSale={dateSale} />
        </div>
  
        <div className="products gap-7">
          <GetProducts type='sale' size='8' />
        </div>
  
        <div className="text-center mt-[50px]">
          <Link to='/products/sale'><Button text='View All Products' className='px-4 py-2' /></Link>
        </div>
        </div>
      : null}
    </>
  );
}

export default Today;
