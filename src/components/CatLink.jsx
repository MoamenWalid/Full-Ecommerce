import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// eslint-disable-next-line react/prop-types
const CatLink = ({ img, catName }) => {
  const [isHovered, setHovered] = useState(false);

  const variants = {
    hidden: {y: '100%', opacity: 0},
    hover: {y: 0, opacity: 1},
    black: {color: '#000'},
    white: {color: '#fff', borderColor: '#fff'}
  }


  return (
    <Link to={`/products/${catName}`}>
      <motion.div variants={variants} animate={isHovered ? 'white' : 'black'} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} className="cat-link relative overflow-hidden flex justify-center items-center flex-col gap-[16px] pt-[25px] pr-[39px] pb-[24px] pl-[40px] rounded border">
        <motion.div variants={variants} animate={isHovered ? 'hover' : 'hidden'} className="overcolorhover absolute top-0 left-0 z-0 bg-button2 w-full h-full"></motion.div>
        <img className="max-w-[56px] relative z-10" src={img} alt="img" />
        <p className="capitalize relative z-10 text-[16px] font-normal leading-6">{catName}</p>
      </motion.div>
    </Link>
  );
}

export default CatLink;
