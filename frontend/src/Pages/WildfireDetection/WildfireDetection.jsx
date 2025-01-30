import "../MainContent.css";
import Sidebar from "../../Components/Sidebar/Sidebar";
import React, { useState, useEffect } from "react";
import PredictionResult from "../../Components/PredictionResult/PredictionResult";

const WildfireDetection = () => {
   const [selectedFile, setSelectedFile] = useState(null);
   const [previewUrl, setPreviewUrl] = useState("");
   const [detectedImageUrl, setDetectedImageUrl] = useState("");
   const [detectedVideoUrl, setDetectedVideoUrl] = useState("");
   const [predictionText, setPredictionText] = useState("Upload an image or video to detect fire");

   // Handle File Selection
   const handleFileChange = (event) => {
       const file = event.target.files[0];
       if (file) {
           setSelectedFile(file);
           setPreviewUrl(URL.createObjectURL(file));
       }
   };

   // Handle File Upload & Fire Detection
   const handleUpload = () => {
       if (!selectedFile) {
           setPredictionText("❌ Please select a file first.");
           return;
       }

       const formData = new FormData();
       formData.append("file", selectedFile);

       const isVideo = selectedFile.type.startsWith("video");
       setPredictionText("🔍 Processing...");

       fetch(`http://localhost:5001/detect/${isVideo ? "video" : "image"}`, {
           method: "POST",
           body: formData,
       })
           .then((response) => response.json())
           .then((data) => {
               console.log(data);
               if (data.message === "Video processing completed" || data.message === "Detection completed") {
                   setPredictionText(
                       data.detected_objects && data.detected_objects !== "No fire / smoke detected"
                           ? `🔥 Detected: ${JSON.stringify(data.detected_objects)}`
                           : "✅ No fire detected."
                   );

                   if (isVideo) {
                       setDetectedVideoUrl(data.video_url); // Set processed video from Cloudinary
                       setDetectedImageUrl(""); // Clear image
                   } else {
                       setDetectedImageUrl(data.image_url); // Set processed image from Cloudinary
                       setDetectedVideoUrl(""); // Clear video
                   }
               } else {
                   setPredictionText("✅ No fire detected.");
               }
           })
           .catch((error) => {
               console.error("Error:", error);
               setPredictionText("❌ Error in detecting fire.");
           });
   };

   return (
       <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
           <h1 className="text-3xl font-bold text-gray-900 text-center mb-6">🔥 Wildfire Detection System</h1>

           {/* File Upload Input */}
           <input type="file" accept="image/*,video/*" onChange={handleFileChange} className="mb-4" />

           {/* Preview Selected Image/Video */}
           {previewUrl && (
               <div className="text-center">
                   <h2 className="text-xl font-semibold text-gray-800">Selected File Preview</h2>
                   {selectedFile.type.startsWith("video") ? (
                       <video controls className="mx-auto mt-2 w-full rounded-lg shadow-md">
                           <source src={previewUrl} type="video/mp4" />
                           Your browser does not support the video tag.
                       </video>
                   ) : (
                       <img src={previewUrl} alt="Selected Preview" className="mx-auto mt-2 rounded-lg shadow-md w-full h-auto" />
                   )}
               </div>
           )}

           {/* Upload & Detect Button */}
           <button
               onClick={handleUpload}
               className="w-full mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
           >
               🚀 Detect Fire
           </button>

           {/* Detection Result */}
           <p className="text-center mt-4 text-lg font-semibold">{predictionText}</p>

           {/* Display Processed Image */}
           {detectedImageUrl && (
               <div className="text-center mt-6">
                   <h2 className="text-2xl font-semibold text-gray-800">🔥 Fire Detection Result (Image)</h2>
                   <img src={detectedImageUrl} alt="Processed Detection" className="mx-auto mt-4 rounded-lg shadow-md w-full h-auto" />
               </div>
           )}

           {/* Display Processed Video */}
           {detectedVideoUrl && (
               <div className="text-center mt-6">
                   <h2 className="text-2xl font-semibold text-gray-800">🔥 Fire Detection Result (Video)</h2>
                   <video controls className="mx-auto mt-4 w-full rounded-lg shadow-md">
                       <source src={detectedVideoUrl} type="video/mp4" />
                       Your browser does not support the video tag.
                   </video>
               </div>
           )}
       </div>
   );
};

export default WildfireDetection;
