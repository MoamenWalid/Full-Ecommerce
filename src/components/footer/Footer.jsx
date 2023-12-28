import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Footer = () => {
  const { userId } = useSelector(state => state.user);
  return (
    <footer className="mt-5 bg-black text-white">
      <div className="footer gap-7 mx-auto max-w-[1400px] text-center items-start justify-evenly py-9">
        <div>
          <ul className="font-extralight">
            <li className="mb-2"><h3 className="text-xl font-medium font-inter"><Link to='/'>Mo-Shop</Link></h3></li>
            <li><Link to='/sign-up' className="font-normal">Subscribe</Link></li>
            <li><p>Get 10% off your first order</p></li>
          </ul>
        </div>

        <div>
          <ul className="font-extralight">
            <li className="mb-2"><h3 className="text-xl font-medium font-inter">Support</h3></li>
            <li><a href="mailto:moshop@gmail.com">moshop@gmail.com</a></li>
            <li>+20 155 691 5374</li>
          </ul>
        </div>

        <div>
          <ul className="font-extralight">
            <li className="mb-2"><h3 className="text-xl font-medium font-inter">Account</h3></li>
            {userId ? <li><Link to='/account'>My Account</Link></li> : <li><Link to='/sign-up'>Sign up</Link></li>}
            {userId ? null : <li><Link to='/log-in'>Login / Register</Link></li>}
            <li><Link to='/cart'>Cart</Link></li>
            <li><Link to='/wishlist'>Wishlist</Link></li>
            <li><Link to='/'>Shop</Link></li>
          </ul>
        </div>

        <div>
          <ul className="font-extralight">
            <li className="mb-2"><h3 className="text-xl font-medium font-inter">Quick Link</h3></li>
            <li><Link to='/contact'>Contact</Link></li>
            <li><Link to='/about'>About</Link></li>
          </ul>
        </div>
      </div>

      <div className="text-center p-3 border-t-dark border-t text-dark">
        &copy; Copyright Moamen 2023. All right reserved
      </div>
    </footer>
  );
}

export default Footer;
