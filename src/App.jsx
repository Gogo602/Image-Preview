import useImageUpload from "./hooks/useImageUpload";
import FileUpload from "./components/FileUpload";
import UploadButton from "./utils/UploadButton";
import ImageGrid from "./components/ImageGrid";

export default function App() {
  const MAX_IMAGES = 5;
  const acceptedFormats = "image/jpeg, image/png";
  const {
    selectedImages,
    errorMessage,
    onSelectFile,
    deleteHandler,
    handleUpload,
  } = useImageUpload(MAX_IMAGES);

  return (
    <section className="flex items-center justify-center py-10 bg-gray-600 min-h-[90vh] w-full">
      <div className="w-full px-2 sm:px-5 space-y-5 ">
        <h2 className="text-2xl font-extrabold text-white mb-8 text-center">
          Product Verification ({selectedImages.length}/{MAX_IMAGES})
        </h2>
        <div className="border border-blue-600 w-full mx-auto p-5 rounded-lg md:w-1/2 lg:w-1/3">
          <FileUpload
            onSelectFile={onSelectFile}
            selectedImagesCount={selectedImages.length}
            maxImages={MAX_IMAGES}
            acceptedFormats={acceptedFormats}
          />
          <UploadButton
            title="Submit for Verification"
            isVisible={selectedImages.length > 0}
            onClick={handleUpload}
          />
        </div>

        {errorMessage && (
          <p className="bg-red-800 text-white font-medium p-2 rounded text-sm text-center">
            {errorMessage}
          </p>
        )}

        <ImageGrid images={selectedImages} onDelete={deleteHandler} />
      </div>
    </section>
  );
};