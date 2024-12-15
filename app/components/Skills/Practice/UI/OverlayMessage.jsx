const OverlayMessage = ({ message, isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div
      className="bg-neutral-950/80 fixed inset-0 flex items-center justify-center z-50 drop-shadow-md"
      onClick={onClose}>
      <div
        className={`px-20 py-7 rounded-lg text-black text-4xl font-bold ${
          message === "Correct!👌"
            ? "bg-neutral-100 text-green-600"
            : "bg-neutral-100 text-red-600"
        }`}>
        {message}
      </div>
    </div>
  );
};

export default OverlayMessage;
