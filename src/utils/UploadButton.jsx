import ClipLoader from "react-spinners/ClipLoader";

export default function UploadButton({ isVisible, onClick, isUploading }) {
  if (!isVisible) return null;

  return (
    <div className="pt-4 flex justify-center">
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white px-8 font-bold py-3 rounded-lg transition-colors shadow-lg flex items-center justify-center space-x-2"
        onClick={onClick}
        disabled={isUploading} 
      >
        {isUploading ? (
          <>
            <ClipLoader color="#fff" size={20} />
          </>
        ) : (
          <span>Submit for Verification</span>
        )}
      </button>
    </div>
  );
}
