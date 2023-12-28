
import Search from "./search/Search";
import Sidebar from "./sidebar/Sidebar.jsx";
import Navbar from "./navbar/Navbar.jsx";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogging } from "../../store/slices/userSlice.js";

const Header = () => {
  const { productsUser, cartProductsUser, userId } = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userLogging());
  }, [dispatch]);

  const countCart = cartProductsUser.reduce((acc, current) => acc + current.counter, 0);

  return (
    <>
      <header className="sticky z-40 bg-[#ffffff78] top-0 md:top-5 md:border lg:px-3 md:w-[99%] lg:w-[900px] md:mt-5 md:mx-auto md:rounded-[50px] backdrop-blur-[7px] shadow-md">
        <div className="container mx-auto py-4 px-4 flex gap-4 md:gap-0 justify-between items-center flex-wrap">
          <Sidebar />

          <Link to="/" className="text-2xl font-[500]">Mo-Shop</Link>

          <Navbar/>

          <div className="flex justify-center gap-3 items-center">
            <Search show= "hidden md:flex"/>
          
            <div className="icons flex items-center gap-3">
              <Link to='/wishlist' className="relative w-[32px] h-[32px]">
                <img className="cursor-pointer" src="/imgs/wishList.svg" alt="img" />
                {userId ? <span className="absolute top-[-3px] right-[-5px] bg-button2 text-white leading-[4px] w-[20px] h-[20px] rounded-full flex items-center justify-center font-inter font-light text-[14px]">{productsUser.length}</span> : null}
              </Link>

              <Link to='/cart' className="relative w-[32px] h-[32px] flex">
                <img className="cursor-pointer" src="/imgs/cart.svg" alt="img" />
                {userId ? <span className="absolute top-[-6px] right-[-7px] bg-button2 text-white leading-[4px] w-[20px] h-[20px] rounded-full flex items-center justify-center font-inter font-light text-[14px]">{countCart}</span> : null}
              </Link>

              {userId ? <Link to='/account' className="w-[32px] h-[32px]"><img className="cursor-pointer" src={`/imgs/${window.location.pathname == '/account' ? 'userActive' : 'user'}.svg`} alt="img" /></Link> : null}
            </div>
        
          </div>
          <Search show= "flex md:hidden w-full"/>
        </div>
      </header>
    </>
  );
}

export default Header;
