import "../MainContent.css";
import "./WildfireDetection.css"
import React, { useState, useEffect } from "react";
import ImageUpload from "../../Components/ImageUpload/ImageUpload";
import PredictionResult from "../../Components/PredictionResult/PredictionResult";

function WildfireDetection() {
   const [image, setImage] = useState(null);
   const [predictionText, setPredictionText] = useState("");
   const [detectedImageUrl, setDetectedImageUrl] = useState(null);
   const [location, setLocation] = useState({ lat: null, lon: null });

   // Get user's location when the component mounts
   useEffect(() => {
      if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(
            (position) => {
               setLocation({
                  lat: position.coords.latitude,
                  lon: position.coords.longitude,
               });
            },
            (error) => {
               console.error("Error getting location:", error);
            }
         );
      } else {
         console.warn("Geolocation is not supported by this browser.");
      }
   }, []);

   // Handle image upload and processing
   const handleImageUpload = (img) => {
      setImage(img);
      processImage(img);
   };

   // Process the image and detect fire
   const processImage = (image) => {
      const formData = new FormData();
      formData.append("file", image);

      // Send the image to Flask API for processing
      fetch("http://localhost:5001/detect/image", {
         method: "POST",
         body: formData,
      })
         .then((response) => response.json())
         .then((data) => {
            console.log(data);
            if (data.message === "Detection completed") {
               setPredictionText(
                  data.detected_objects && data.detected_objects !== "No fire / smoke detected"
                     ? `🔥 Detected: ${JSON.stringify(data.detected_objects)} at coordinates: Latitude ${location.lat}, Longitude ${location.lon}`
                     : "✅ No fire detected."
               );

               setDetectedImageUrl(data.image_url); // Cloudinary URL for processed image
               // if (data.detected_objects && data.detected_objects !== "No fire / smoke detected") {
               //    alert(`🔥 Fire detected at coordinates: Latitude ${location.lat}, Longitude ${location.lon}`);
               // }
            } else {
               setPredictionText("✅ No fire detected.");
            }
         })
         .catch((error) => {
            console.error("Error during image processing:", error);
            setPredictionText("❌ Error in detecting fire");
         });
   };

   return (
      <>
         <div className="main-content">
            <div className="min-h-screen bg-gray-100 p-8 dark:bg-gray-900">
               <h1 className="text-4xl font-bold text-center text-blue-600 dark:text-white mb-8">
                  Wildfire Detection
               </h1>
               <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                  <div>
                     <ImageUpload onImageUpload={handleImageUpload} />
                  </div>
                  {image && (
                     <div className="mt-6 grid grid-cols-2 gap-6">
                        <div className="text-center">
                           <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                              Uploaded Image
                           </h2>
                           <img
                              src={URL.createObjectURL(image)}
                              alt="Uploaded"
                              className="mx-auto mt-4 max-w-full h-auto rounded-xl shadow-md"
                           />
                        </div>

                        {detectedImageUrl && (
                           <div className="text-center">
                              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                                 Detection Result
                              </h2>
                              <img
                                 src={detectedImageUrl} // Cloudinary URL
                                 alt="Detected"
                                 className="mx-auto mt-4 max-w-full h-auto rounded-xl shadow-md"
                              />
                           </div>
                        )}
                     </div>
                  )}

                  {predictionText && (
                     <div className="mt-6 text-center">
                        <PredictionResult text={predictionText} />
                     </div>
                  )}
               </div>
            </div>
         </div>
      </>
   );
}

export default WildfireDetection;
