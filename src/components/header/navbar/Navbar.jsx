import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const Navbar = () => {

  const { userId } = useSelector(state => state.user);

  return (
    <ul className="hidden md:flex items-center justify-center gap-3">
      <motion.li><NavLink className='pb-1 nav-header' to='/'>Home</NavLink></motion.li>
      <motion.li><NavLink className='pb-1 nav-header' to='/contact'>Contact</NavLink></motion.li>
      <motion.li><NavLink className='pb-1 nav-header' to='/about'>About</NavLink></motion.li>
      {userId ? null : <motion.li><NavLink className='pb-1 nav-header' to='/sign-up'>Sign Up</NavLink></motion.li>}
    </ul>
  );
}

export default Navbar;
