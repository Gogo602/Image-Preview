import { GrUpload } from "react-icons/gr";


export default function FileUpload({
  onSelectFile,
  selectedImagesCount,
  maxImages,
  acceptedFormats,
}) {
    const isDisabled = selectedImagesCount >= maxImages;
    
  return (
    <label className="text-white flex flex-col items-center space-y-2 cursor-pointer">
      <GrUpload size={32} className="text-blue-500 font-bold" />
      <span className="font-semibold text-lg">
        {selectedImagesCount < maxImages
          ? "Click to Select Images"
          : "Maximum Images Uploaded"}
      </span>
      <span className="text-sm text-gray-400">
        JPEG or PNG only, up to {maxImages} images.
      </span>
      <input
        type="file"
        name="images"
        onChange={onSelectFile}
        multiple
        accept={acceptedFormats}
        className="hidden"
        disabled={isDisabled}
      />
    </label>
  );
}
