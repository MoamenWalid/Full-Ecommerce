
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';


// eslint-disable-next-line react/prop-types
const Links = ({ show, open }) => {

  const { userId } = useSelector(state => state.user);
  const variants = {
    open: {transition: {staggerChildren: 0.1}},
    closed: {transition: {staggerChildren: 0.1, staggerDirection: -1}}
  }

  const itemVariants = {
    open: {x: 0, opacity: 1, transition: {type: 'spring'}},
    closed: {x: -100, opacity: 0, transition: {type: 'spring'}}
  }

  return (
    <motion.ul animate={open ? 'open' : 'closed'} variants={variants} className={`gap-3 items-center ${show}`}>
      <motion.li whileTap={{ scale: 1.1 }} variants={itemVariants}><NavLink className='pb-1 nav-sidebar' to='/'>Home</NavLink></motion.li>
      <motion.li whileTap={{ scale: 1.1 }} variants={itemVariants}><NavLink className='pb-1 nav-sidebar' to='/contact'>Contact</NavLink></motion.li>
      <motion.li whileTap={{ scale: 1.1 }} variants={itemVariants}><NavLink className='pb-1 nav-sidebar' to='/about'>About</NavLink></motion.li>
      {userId ? null : <motion.li whileTap={{ scale: 1.1 }} variants={itemVariants}><NavLink className='pb-1 nav-sidebar' to='/sign-up'>Sign Up</NavLink></motion.li>}
    </motion.ul>
  );
}

export default Links;
