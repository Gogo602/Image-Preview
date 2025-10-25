

export default function UploadButton({ isVisible, onClick, title }) {
  if (!isVisible) return null;

  return (
    <div className="pt-4 flex justify-center">
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white px-8 font-bold py-3 rounded-lg transition-colors shadow-lg"
        onClick={onClick}
      >
        {title}
      </button>
    </div>
  );
}
