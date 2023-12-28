import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const Sale = () => {
  return (
    <div className="sale container py-5 px-3 mt-7 mx-auto md:h-[50vh] flex flex-col md:flex-row items-center justify-center gap-6 bg-black text-white rounded">
      <div className="text flex flex-col gap-3">
        <div className="sale-name flex items-center justify-start flex-row gap-4">
          <img src="imgs/iphone.png" alt="img" />
          <span>iPhone 14 Series</span>
        </div>
        <p className="font-inter font-semibold text-[48px] tracking-[1.92px] w-[294px]">Up to 10% off Voucher</p>
        <Link to='/products/phones/8'>Shop Now <FontAwesomeIcon icon={faArrowRight} className="ml-2" /></Link>
      </div>

      <div className="photo">
        <Link to='/products/phones/8'><img src="imgs/sale.png" alt="img" /></Link>
      </div>
    </div>
  );
}

export default Sale;
