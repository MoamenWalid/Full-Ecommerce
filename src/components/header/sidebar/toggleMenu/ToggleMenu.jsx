
import { motion } from 'framer-motion';
import Links from "../links/Links";

// eslint-disable-next-line react/prop-types
const ToggleMenu = ({ open }) => {

  const variants = {
    open: {
      clipPath: 'circle(1200px at 50px 50px)',
      transition: {type: 'spring', stiffness: 20}
    },
    closed: {
      clipPath: 'circle(0px at 5px 5px)',
      transition: {delay: .5, type: 'spring', stiffness: 400, damping: 40}
    }
  }

  return (
    <motion.div variants={variants} animate={open ? 'open' : 'closed'} className= {`toggle-menu z-20 flex md:hidden justify-center pt-40 bg-secondary w-[70%] sm:w-[50%] h-[100vh] fixed top-0 left-0`}>
      <Links open={open} show='flex md:hidden flex-col text-3xl'/>
    </motion.div>
  );
}

export default ToggleMenu;
