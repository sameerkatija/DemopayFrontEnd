const CustomButton = ({ type, text, clazz, ...otherProps }) => {
  return (
    <div className="my-10 block">
      <button
        type={type ?? "submit"}
        className={`capitalize w-full bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${clazz}`}
        {...otherProps}
      >
        {text}
      </button>
    </div>
  );
};

export default CustomButton;
