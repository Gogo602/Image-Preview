import { useState } from "react";
import { toast } from "react-toastify";

// memory cleanup 
const revokeUrls = (imageObjects) => {
  imageObjects.forEach((imageObject) => URL.revokeObjectURL(imageObject.url));
};

export default function useImageUpload(MAX_IMAGES) {
  const [selectedImages, setSelectedImages] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  const onSelectFile = (event) => {
    const newFilesArray = Array.from(event.target.files);
    setErrorMessage(null);

    const remainingSlots = MAX_IMAGES - selectedImages.length;

    if (remainingSlots <= 0) {
      setErrorMessage(`Error: You've reached the maximum of ${MAX_IMAGES} images.`);
      event.target.value = "";
      return;
    }

    const filesToAdd = newFilesArray.slice(0, remainingSlots);

    if (newFilesArray.length > filesToAdd.length) {
      setErrorMessage(
        `Only ${filesToAdd.length} image(s) were added. Max limit is ${MAX_IMAGES}.`
      );
    }

    const imageObjects = filesToAdd.map((file) => ({
      file: file,
      url: URL.createObjectURL(file),
    }));

    setSelectedImages((prev) => prev.concat(imageObjects));
    event.target.value = "";
  };

  const deleteHandler = (imageObject) => {
    setSelectedImages((prev) => prev.filter((e) => e.url !== imageObject.url));
    revokeUrls([imageObject]);
  };

  const handleUpload = () => {
    const filesToUpload = selectedImages.map((item) => item.file);

    console.log(`Ready to upload ${filesToUpload.length} files:`, filesToUpload);

    toast.success(`Successfully logged ${filesToUpload.length} file(s) for verification.`);

    revokeUrls(selectedImages);
    setSelectedImages([]);
    setErrorMessage(null);
  };

  return {
    selectedImages,
    errorMessage,
    onSelectFile,
    deleteHandler,
    handleUpload,
  };
};