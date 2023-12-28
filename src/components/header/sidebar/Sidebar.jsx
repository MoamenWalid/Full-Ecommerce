import ToggleMenu from "./toggleMenu/ToggleMenu";
import ToggleButton from './toggleButton/ToggleButton';
import { useState } from "react";
import Overlay from "./overlay/Overlay";


const Sidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="block md:hidden w-[76px] relative z-[100]">
      <Overlay open={open} setOpen={setOpen}/>
      <ToggleButton setOpen={setOpen} open={open}/>
      <ToggleMenu open={open}/>
    </div>
  );
}

export default Sidebar;
