
// eslint-disable-next-line react/prop-types
const InputAccount = ({ type, className, name, placeholder, onChange, onBlur, refelement, value, id, disabled }) => {
  return (
    <input type={type} disabled={disabled} className={className} name={name} placeholder={placeholder} onChange={onChange} onBlur={onBlur} ref={refelement} value={value} id={id} autoComplete="off" />
  );
}

export default InputAccount;
