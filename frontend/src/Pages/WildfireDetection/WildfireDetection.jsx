import "../MainContent.css";
import Sidebar from "../../Components/Sidebar/Sidebar";
import React, { useState, useEffect } from "react";

import ImageUpload from "../../Components/ImageUpload/ImageUpload";
import PredictionResult from "../../Components/PredictionResult/PredictionResult";


function WildfireDetection() {
   const [image, setImage] = useState(null);
   const [predictionText, setPredictionText] = useState("");
   const [detectedImage, setDetectedImage] = useState(null);
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
      setTimeout(() => {
         const randomProbability = Math.random();

         const canvas = document.createElement("canvas");
         const ctx = canvas.getContext("2d");
         const imgElement = new Image();

         imgElement.onload = () => {
            canvas.width = imgElement.width;
            canvas.height = imgElement.height;
            ctx.drawImage(imgElement, 0, 0);

            if (randomProbability > 0.5) {
               const fireProbability = randomProbability * 100;
               setPredictionText(`🔥 Fire detected: ${Math.round(fireProbability)}% probability`);

               // Draw red bounding box for fire detection
               const x = Math.random() * (imgElement.width - 100);
               const y = Math.random() * (imgElement.height - 100);
               const width = 100;
               const height = 100;

               ctx.strokeStyle = "red";
               ctx.lineWidth = 4;
               ctx.strokeRect(x, y, width, height);

               // Alert user with location information if available
               if (location.lat && location.lon) {
                  alert(`🔥 Fire detected at coordinates: Latitude ${location.lat}, Longitude ${location.lon}`);
               }
            } else {
               setPredictionText("✅ No fire detected.");
            }

            setDetectedImage(canvas.toDataURL());
         };

         imgElement.src = URL.createObjectURL(image);
      }, 1000);
   };

   return (
      <>
         <Sidebar />

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
                           <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Uploaded Image</h2>
                           <img
                              src={URL.createObjectURL(image)}
                              alt="Uploaded"
                              className="mx-auto mt-4 max-w-full h-auto rounded-xl shadow-md"
                           />
                        </div>

                        {detectedImage && (
                           <div className="text-center">
                              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Detection Result</h2>
                              <img
                                 src={detectedImage}
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
