import React from "react";

const PredictionResult = ({ text }) => {
  return (
    <div className="mt-6 text-center">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">{text}</h2>
    </div>
  );
};

export default PredictionResult;
