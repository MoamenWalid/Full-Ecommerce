
import { motion } from 'framer-motion';

// eslint-disable-next-line react/prop-types
const Overlay = ({ open, setOpen }) => {

  const variants = {
    open: {
      display: 'block',
      transition: {type: 'spring'},
    },
    closed: {
      display: 'none',
      transition: {delay: .6, type: 'spring'},
    }
  }

  return (
    <motion.div variants={variants} animate={open ? 'open' : 'closed'} onClick={() => setOpen(prev => !prev)} className={`overlay w-[100vw] hidden h-[100vh] fixed top-0 left-0 bg-[#77777738] backdrop-blur-sm`}></motion.div>
  );
}

export default Overlay;
