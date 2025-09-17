import React from "react";

// 📦 Import your images here
import HomeFan from "../../assets/ImagesCatagory/HomeObjects/HomeFan.jpg";
import HomeLED from "../../assets/ImagesCatagory/HomeObjects/HomeLED.jpg";
import HomeTV from "../../assets/ImagesCatagory/HomeObjects/HomeTV.jpeg";
import HomeAC from "../../assets/ImagesCatagory/HomeObjects/HomeAC.jpg";
import HomePC from "../../assets/ImagesCatagory/HomeObjects/BedroomPC.jpeg";
import Fridge from "../../assets/ImagesCatagory/HomeObjects/KitchenFredge.jpg";
import Oven from "../../assets/ImagesCatagory/HomeObjects/KitchenOven.jpg";
import RO from "../../assets/ImagesCatagory/HomeObjects/kitchenRO.jpeg";

const applianceImages = {
  fan: HomeFan,
  tv: HomeTV,
  ac: HomeAC,
  led: HomeLED,
  bfan: HomeFan,
  bComputer: HomePC,
  bac: HomeAC,
  bled: HomeLED,
  gled: HomeLED,
  gac: HomeAC,
  gfan: HomeFan,
  sled: HomeLED,
  sac: HomeAC,
  sfan: HomeFan,
  fridge: Fridge,
  oven: Oven,
  ro: RO,
  kled: HomeLED,
  kfan: HomeFan,
};

export default function ReviewStep({ roomData, goBack, handleSubmit }) {
  const { roomCounts = {}, roomApplianceData = {}, customItems = {}, otherItems = [] } = roomData;

  const renderAppliances = (roomName) => {
    const roomAppliances = roomApplianceData[roomName] || {};

    return Object.entries(roomAppliances)
      .filter(([_, qty]) => qty > 0)
      .map(([key, qty]) => (
        <div key={key} className="flex items-center gap-4 border p-2 rounded-lg shadow-sm bg-gray-50">
          <img
            src={applianceImages[key]}
            alt={key}
            className="w-16 h-16 object-cover rounded-md border"
          />
          <div>
            <p className="text-sm font-medium capitalize">{key}</p>
            <p className="text-xs text-gray-600">Quantity: {qty}</p>
          </div>
        </div>
      ));
  };

  const renderCustomItems = () =>
    Object.entries(customItems)
      .filter(([_, val]) => val.selected && val.quantity > 0)
      .map(([key, val]) => (
        <li key={key} className="text-sm text-gray-700">
          {val.label} — Quantity: {val.quantity}
        </li>
      ));

  const renderManualItems = () =>
    otherItems.map((entry, index) => (
      <li key={index} className="text-sm text-gray-700">
        {entry.item} — Quantity: {entry.quantity}
      </li>
    ));

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-800">📝 Review Your Selections</h2>

      {/* Room wise appliances */}
      {Object.entries(roomCounts)
        .filter(([room, count]) => room !== "Total" && count > 0)
        .map(([roomName, count]) => (
          <div
            key={roomName}
            className="border border-gray-300 p-4 rounded-lg bg-white shadow-sm"
          >
            <h3 className="text-lg font-semibold text-green-700 mb-2">
              {roomName} (x{count})
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {renderAppliances(roomName)}
            </div>
          </div>
        ))}

      {/* Custom Items */}
      {Object.values(customItems).some((val) => val.selected) && (
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
          <h3 className="text-md font-semibold text-blue-700 mb-2">Other Selected Appliances</h3>
          <ul className="list-disc pl-5">{renderCustomItems()}</ul>
        </div>
      )}

      {/* Manual Entry */}
      {otherItems.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-300 p-4 rounded-lg">
          <h3 className="text-md font-semibold text-yellow-800 mb-2">Manual Additions</h3>
          <ul className="list-disc pl-5">{renderManualItems()}</ul>
        </div>
      )}

      {/* Buttons */}
      <div className="flex justify-between pt-4">
        <button
          onClick={goBack}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
        >
          ← Back
        </button>
        <button
          onClick={handleSubmit}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          ✅ Confirm & Submit
        </button>
      </div>
    </div>
  );
}
