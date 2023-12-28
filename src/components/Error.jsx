
// eslint-disable-next-line react/prop-types
const Error = ({ error }) => {
  return (
    <div className="sticky top-0 left-0 w-full border-b-red-500 border-b-4 font-inter font-medium text-lg text-red-600 p-3">
      {error}
    </div>
  );
}

export default Error;
