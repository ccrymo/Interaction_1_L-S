const SubmitButton = ({ onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full mt-4 text-2xl font-bold py-3 px-6 rounded-lg ${
        disabled ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-700"
      }`}
    >
      Submit
    </button>
  );
};

export default SubmitButton;