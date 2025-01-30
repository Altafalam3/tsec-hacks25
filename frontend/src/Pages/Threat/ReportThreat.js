import { useState } from "react";
import "./ReportThreat.css";

const ReportThreat = () => {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Threat reported successfully!");
    setImage(null);
    setDescription("");
  };

  return (
    <div className="report-container">
      <h2>Report a Threat</h2>
      <form onSubmit={handleSubmit}>
        <label className="upload-label">
          Upload Image:
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </label>
        {image && <img src={image} alt="Uploaded preview" className="preview" />}
        <textarea
          placeholder="Describe the threat..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ReportThreat;
