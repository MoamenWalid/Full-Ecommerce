import { motion } from 'framer-motion';

// eslint-disable-next-line react/prop-types
const Button = ({ className, text, onClick, type }) => {

  return (
    <motion.button type={type} onClick={onClick} className={`rounded bg-button2 text-white ${className}`} whileHover={{ scale: 1.01 }} whileTap={{ scale: .92 }}>{text}</motion.button>
  );
}

export default Button;
