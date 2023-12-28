import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="container text-center mx-auto mt-7 py-3 px-4">
      <h1 className="font-medium font-inter text-[110px]">404 Not Found</h1>
      <p>Your visited page not found. You may go home page.</p>
      <Link to='/'><button className="rounded-md mt-6 py-3 px-4 bg-button2 text-white">Back to home page</button></Link>
    </div>
  );
}

export default NotFound;
