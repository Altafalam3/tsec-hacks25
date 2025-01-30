import React from "react";

const ImageUpload = ({ onImageUpload }) => {
  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onImageUpload(file);  // Automatically trigger detection when the file is uploaded
    }
  };

  return (
    <div className="mb-6">
      <label className="upload-text">Upload an image</label>
      <input type="file" onChange={handleChange} accept="image/*" className="file-input" />
    </div>
  );
};

export default ImageUpload;
