

// eslint-disable-next-line react/prop-types
const Cat = ({ text }) => {
  return (
    <div className="flex items-center gap-3">
      <span className="block w-[20px] h-[40px] bg-button2 rounded"></span>
      <p className="text-button2 font-inter font-semibold">{text}</p>
    </div>
  );
}

export default Cat;
