import React, { useState } from "react";
import { GrUpload } from "react-icons/gr";
import { AiOutlineCloseCircle } from "react-icons/ai"; 
import { toast } from "react-toastify";

export default function App (){
  const [selectedImages, setSelectedImages] = useState([]);
  const acceptedFormats = "image/jpeg, image/png";
  const [errorMessage, setErrorMessage] = useState(null); 

  const MAX_IMAGES = 5;

  const onSelectFile = (event) => {
    const newFilesArray = Array.from(event.target.files);
    
    setErrorMessage(null);

    // Check limit
    const remainingSlots = MAX_IMAGES - selectedImages.length;
    
    if (remainingSlots <= 0) {
        setErrorMessage(`Error: You've reached the maximum of ${MAX_IMAGES} images.`);
        event.target.value = ""; 
        return;
    }
    
    const filesToAdd = newFilesArray.slice(0, remainingSlots);

    // Check if any files were dropped due to the limit and set error message
    if (newFilesArray.length > filesToAdd.length) {
        setErrorMessage(`Only ${filesToAdd.length} image(s) were added. Max limit is ${MAX_IMAGES}.`);
    }

    // Create the new image objects (File and URL)
    const imageObjects = filesToAdd.map((file) => ({
      file: file,
      url: URL.createObjectURL(file),
    }));

    setSelectedImages((prev) => prev.concat(imageObjects));

    event.target.value = ""; 
  };

  // Accepts the object to delete
  function deleteHandler(imageObject) {
    setSelectedImages((prev) => {
        const newLength = prev.length - 1;

        if (newLength < MAX_IMAGES) {
            setErrorMessage(null);
        }
        
        return prev.filter((e) => e.url !== imageObject.url);
    });
    URL.revokeObjectURL(imageObject.url);
  }
  
  // upload
  const handleUpload = () => {
      const filesToUpload = selectedImages.map(item => item.file);
      
      //Logs all selected files to the console
      console.log(`Ready to upload ${filesToUpload.length} files:`, filesToUpload);
      
      toast.success(`Simulating upload of ${filesToUpload.length} image(s). Check the console for File objects.`);
      
      selectedImages.forEach(imageObject => URL.revokeObjectURL(imageObject.url)); 
      
      setSelectedImages([]);
      setErrorMessage(null);
      
  };

  return (
    <section className="flex items-center justify-center py-10 bg-gray-600 min-h-screen w-full">
      <div className="w-full px-2 sm:px-5 space-y-5">
          <h2 className="text-2xl font-extrabold text-white mb-8 text-center">
            Product Verification  ({selectedImages.length}/{MAX_IMAGES})
          </h2>
         
              <div 
                  className="border border-blue-600 w-full mx-auto p-5 rounded-lg md:w-1/2 lg:w-1/3">
                  <label className="text-white flex flex-col items-center space-y-2 cursor-pointer">
                    <GrUpload size={32} className="text-blue-500 font-bold"/> 
                    <span className="font-semibold text-lg">
                        {selectedImages.length < MAX_IMAGES ? "Click to Select Images" : "Maximum Images Uploaded"}
                    </span>
                    <span className="text-sm text-gray-400">
                        JPEG or PNG only, up to {MAX_IMAGES} images.
                    </span>
                    <input
                      type="file"
                      name="images"
                      onChange={onSelectFile}
                      multiple
                      accept={acceptedFormats}
                      className="hidden"
                      disabled={selectedImages.length >= MAX_IMAGES}
                    />
                  </label>
                  
                  {/*upload */}
                  {selectedImages.length > 0 && selectedImages.length <= MAX_IMAGES && (
                      <div className="pt-4 flex justify-center">
                          <button 
                            className="bg-blue-600 hover:bg-blue-700 text-white px-8 font-bold py-3 rounded-lg transition-colors shadow-lg" 
                            onClick={handleUpload}
                          >
                            Submit for Verification 
                          </button>
                      </div>
                  )}
              </div>

              {/* error message */}
              {errorMessage && (
                  <p className="bg-red-800 text-white font-medium p-2 rounded text-sm text-center">
                      {errorMessage}
                  </p>
              )}
       
              <div className="grid grid-cols-1 md:grid-cols-2 xxl:grid-cols-3 gap-4">
                  {selectedImages.map((imageObject, index) => (
                      <div key={imageObject.url} className="relative group overflow-hidden rounded-lg shadow-md border-2 border-gray-600">
                          {/* Image Preview */}
                          <img 
                            src={imageObject.url} 
                            alt={`Product Preview ${index + 1}`} 
                            className="w-full h-full object-cover" 
                          /> 
                          
                          {/* Image Index */}
                          <p className="absolute top-0 left-0 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-br-lg">
                            {index + 1}
                          </p>

                          {/* Delete*/}
                          <button 
                            onClick={() => deleteHandler(imageObject)}
                            className="absolute top-1 right-1 text-white bg-black bg-opacity-50 hover:bg-opacity-75 transition-all rounded-full p-1 cursor-pointer"
                            title="Delete Image"
                          >
                            <AiOutlineCloseCircle size={30} className="text-blue-500"/>
                          </button>
                      </div>
                  ))}
              </div>


      </div>
    </section>
  );
}