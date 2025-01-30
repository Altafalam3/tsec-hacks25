import "../MainContent.css";
import Sidebar from "../../Components/Sidebar/Sidebar";
import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./LiveAlertMap.css";

function LiveAlertMap() {
   const mapRef = useRef(null);

   useEffect(() => {
      // Initialize the map
      const map = L.map(mapRef.current).setView([37.7749, -122.4194], 10); // Initial view set to San Francisco

      // Add OpenStreetMap tile layer
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
         attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // Fetch data from JSON file
      fetch("/data.json")
         .then((response) => response.json())
         .then((data) => {
            // Loop through the data and add markers with circles
            data.forEach((request) => {
               const { requestName, latitude, longitude, concern, range } = request;

               // Determine circle radius and color based on concern
               let radius = 100; // Default radius
               let color = "blue"; // Default color

               if (concern === "wildfire") {
                  radius = range;
                  color = "red";
               } else if (concern === "animalActivity") {
                  radius = range;
                  color = "green";
               }

               // Add circle to the map
               L.circle([latitude, longitude], {
                  color: color,
                  fillColor: color,
                  fillOpacity: 0.5,
                  radius: radius,
               }).addTo(map);

               // Add marker with popup to the map
               L.marker([latitude, longitude])
                  .addTo(map)
                  .bindPopup(`<b>${requestName}</b><br>Concern: ${concern}`);
            });
         })
         .catch((error) => {
            console.error("Error fetching data:", error);
         });

      // Cleanup function to remove the map when the component unmounts
      return () => {
         map.remove();
      };
   },);

   return (
      <>
        
         <div className="main-content">
            <h1>Live Alert Map</h1>
            <div className="map-container">
               <div ref={mapRef} id="map" />
            </div>
         </div>
      </>

   );
}

export default LiveAlertMap;
