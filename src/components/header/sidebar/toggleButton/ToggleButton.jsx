
import { motion } from "framer-motion"

// eslint-disable-next-line react/prop-types
const ToggleButton = ({ setOpen, open }) => {

  const spanOne = {
    open: {y: 5, rotate: -45, transition: {type: 'spring', stiffness: 130}},
    closed: false
  }

  const spanTwo = {
    open: {opacity: 0, transition: {duration: 0}},
    closed: {opacity: 1}
  }

  const spanThree = {
    open: {y: -7, rotate: 45, transition: {type: 'spring', stiffness: 130}},
    closed: false
  }

  return (
    <motion.button onClick={() => setOpen(prev => !prev)} className="flex md:hidden flex-col gap-1 relative z-30">
      <motion.span variants={spanOne} animate={open ? 'open' : 'closed'} className="block w-[18px] h-[2px] bg-dark"></motion.span>
      <motion.span variants={spanTwo} animate={open ? 'open' : 'closed'} className="block w-[18px] translate-x-[3px] h-[2px] bg-dark"></motion.span>
      <motion.span variants={spanThree} animate={open ? 'open' : 'closed'} className="block w-[18px] h-[2px] bg-dark"></motion.span>
    </motion.button>
  );
}

export default ToggleButton;
