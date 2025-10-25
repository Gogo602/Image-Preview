import { AiOutlineCloseCircle } from "react-icons/ai";

export default function ImagePreview({ imageObject, index, onDelete }) {
  return (
    <div className="relative group overflow-hidden rounded-lg shadow-md border-2 border-gray-600">
      <img
        src={imageObject.url}
        alt={`Product Preview ${index + 1}`}
        className="w-full h-full object-cover"
      />
      <p className="absolute top-0 left-0 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-br-lg">
        {index + 1}
      </p>
      <button
        onClick={() => onDelete(imageObject)}
        className="absolute top-1 right-1 text-white bg-black bg-opacity-50 hover:bg-opacity-75 transition-all rounded-full p-1 cursor-pointer"
        title="Delete Image"
      >
        <AiOutlineCloseCircle size={30} className="text-blue-500" />
      </button>
    </div>
  );
}
