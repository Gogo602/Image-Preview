import ImagePreview from "./ImagePreview";

export default function ImageGrid({ images, onDelete }) {
  if (images.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xxl:grid-cols-3 gap-4">
      {images.map((imageObject, index) => (
        <ImagePreview
          key={imageObject.url}
          imageObject={imageObject}
          index={index}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
