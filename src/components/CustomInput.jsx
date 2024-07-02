const CustomInput = ({
  name,
  label,
  type,
  required,
  value,
  onHandleChange,
}) => {
  return (
    <div className="flex flex-col mb-4">
      <label
        htmlFor={name}
        className="capitalize block text-black-400 font-bold mb-2"
      >
        {label}
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        required={required}
        type={type}
        name={name}
        value={value}
        onChange={onHandleChange}
      />
    </div>
  );
};

export default CustomInput;
