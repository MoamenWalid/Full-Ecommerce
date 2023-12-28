import { BarLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="w-[100vw] h-[100vh] fixed top-0 left-0 bg-[#0000007d] z-50">
      <BarLoader color="#48ace2" width={'100vw'} height={6} />
    </div>
  );
}

export default Loading;
