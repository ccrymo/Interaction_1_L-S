"use client";
const SubmitButton = ({ onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full mt-4 text-2xl font-bold py-3 px-6 ${
        disabled
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-blue-600 hover:bg-sky-600"
      }`}>
      Submit
    </button>
  );
};

export default SubmitButton;
