import LogIn from "./LogIn";
import SignUp from "./SignUp";

// eslint-disable-next-line react/prop-types
const Account = ({ heading, statusUser }) => {

  return (
      <div className= {`container ${statusUser} pt-6 md:pt-14 px-4 md:px-0 m-auto flex items-center gap-10`}>
        <div className="photo hidden md:block rounded overflow-hidden w-[50%]">
          <img src="/imgs/shopping.jpg" alt="imgShop" />
        </div>
  
        <div className={`accounting-form w-full md:w-[40%]`}>
          <h1 className="font-inter text-[30px] sm:text-[27px] md:text-[29px] font-medium tracking-[1.44px] leading-8 pb-6">{heading}</h1>
          <p className="font-normal leading-6 text-base">Enter your details below</p>
  
          {statusUser == 'sign-up' ? <SignUp /> : <LogIn />}
        </div>
      </div>
  );
}

export default Account; 
