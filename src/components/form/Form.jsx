
// eslint-disable-next-line react/prop-types
const Form = ({ className, children, onSubmit }) => {
  return (
    <>
      <form onSubmit={onSubmit} action="#" className={`flex flex-col pt-11 pb-10 ${className}`}>
        {children}
      </form>
    </>
  );
}

export default Form;