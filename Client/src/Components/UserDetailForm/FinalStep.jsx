import React from "react";

export default function FinalStep() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
      <h1 className="text-3xl font-bold text-green-700">
        🎉 Congratulations!
      </h1>

      <p className="text-lg text-gray-700 max-w-xl">
        You’ve successfully completed all the steps. Thank you for submitting your home appliance details. 🎯
      </p>

      <p className="text-sm text-gray-500">
        We will review your submission and get back to you shortly.
      </p>

      {/* Optional button */}
      {/* <button className="mt-4 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700">
        Go to Dashboard
      </button> */}
    </div>
  );
}
