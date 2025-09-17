import React, { useState } from "react";
import HomeAC from "../../assets/ImagesCatagory/HomeObjects/HomeAC.jpg";
import HomeLED from "../../assets/ImagesCatagory/HomeObjects/HomeLED.jpg";
import HomeTV from "../../assets/ImagesCatagory/HomeObjects/HomeTV.jpeg";
import HomeFan from "../../assets/ImagesCatagory/HomeObjects/HomeFan.jpg";
import KitchenFredge from "../../assets/ImagesCatagory/HomeObjects/KitchenFredge.jpg";
import KitchenOven from "../../assets/ImagesCatagory/HomeObjects/KitchenOven.jpg";
import KitchenRO from "../../assets/ImagesCatagory/HomeObjects/kitchenRO.jpeg";
import bedromPC from "../../assets/ImagesCatagory/HomeObjects/BedroomPC.jpeg";

export default function RoomDetails({ goBack, goNext, selectedService, roomCounts = {} }) {
  const [otherItems, setOtherItems] = useState([]);
  const [manualEntry, setManualEntry] = useState("");
  const [customItems, setCustomItems] = useState({
    light: { label: "Bulb / Light", selected: false, quantity: 1 },
    router: { label: "Wi-Fi Router", selected: false, quantity: 1 },
    speaker: { label: "Speaker System", selected: false, quantity: 1 },
    tube: { label: "Tube Light", selected: false, quantity: 1 },
  });

  const [roomApplianceData, setRoomApplianceData] = useState({});

  const applianceMap = {
    Hall: [
      { key: "fan", label: "Ceiling Fan", image: HomeFan },
      { key: "tv", label: "LED TV", image: HomeTV },
      { key: "ac", label: "Air Conditioner", image: HomeAC },
      { key: "led", label: "LED Light", image: HomeLED },
    ],
    Kitchen: [
      { key: "kled", label: "LED Light", image: HomeLED },
      { key: "kfan", label: "Ceiling Fan", image: HomeFan },
      { key: "fridge", label: "Refrigerator", image: KitchenFredge },
      { key: "oven", label: "Oven", image: KitchenOven },
      { key: "ro", label: "Water- RO", image: KitchenRO },
    ],
    Bedroom: [
      { key: "bled", label: "LED Light", image: HomeLED },
      { key: "bac", label: "Air Conditioner", image: HomeAC },
      { key: "bfan", label: "Ceiling Fan", image: HomeFan },
      { key: "bComputer", label: "Computer", image: bedromPC },
    ],
    GuestRoom: [
      { key: "gled", label: "LED Light", image: HomeLED },
      { key: "gac", label: "Air Conditioner", image: HomeAC },
      { key: "gfan", label: "Ceiling Fan", image: HomeFan },
    ],
    StoreRoom: [
      { key: "sled", label: "LED Light", image: HomeLED },
      { key: "sac", label: "Air Conditioner", image: HomeAC },
      { key: "sfan", label: "Ceiling Fan", image: HomeFan },
    ],
  };

  const handleCheckboxChange = (key) => {
    setCustomItems((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        selected: !prev[key].selected,
      },
    }));
  };

  const handleQuantityChange = (key, value) => {
    setCustomItems((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        quantity: Math.max(1, parseInt(value)),
      },
    }));
  };

  const handleApplianceQuantityChange = (roomName, key, value) => {
    const parsed = parseInt(value);
    setRoomApplianceData((prev) => ({
      ...prev,
      [roomName]: {
        ...prev[roomName],
        [key]: isNaN(parsed) ? 0 : parsed,
      },
    }));
  };

  const handleManualEntryAdd = () => {
    const parts = manualEntry.split(":");
    if (parts.length === 2) {
      const item = parts[0].trim();
      const quantity = parseInt(parts[1].trim());
      if (item && !isNaN(quantity) && quantity > 0) {
        setOtherItems((prev) => [...prev, { item, quantity }]);
        setManualEntry("");
      }
    }
  };

  const removeOtherItem = (index) => {
    setOtherItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleNext = () => {
    goNext({
      selectedService,
      roomApplianceData,
      customItems,
      otherItems,
    });
  };

  const activeRooms = Object.entries(roomCounts).filter(
    ([room, count]) => room !== "Total" && count > 0
  );

  return (
    <div className="space-y-10">
      {activeRooms.map(([roomName]) => {
        const appliances = applianceMap[roomName] || [];

        return (
          <div key={roomName} className="entire-div">
            <h2 className="text-xl font-semibold text-gray-800">
              Select Electrical Appliances in <span className="text-green-600">{roomName}</span>
            </h2>

            {/* Appliance Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {appliances.map(({ key, label, image }) => (
                <div
                  key={key}
                  className="bg-gray-50 rounded-lg p-2 shadow-md flex flex-col items-center justify-between"
                >
                  <p className="text-sm font-medium text-gray-700 mb-1 text-center">{label}</p>
                  <img
                    src={image}
                    alt={label}
                    className="w-28 h-28 object-cover rounded-md mb-2"
                  />
                  <div className="flex gap-2 justify-center items-center">
                    <p className="text-md font-medium text-gray-700 mb-1">Count</p>
                    <input
                      type="number"
                      min="0"
                      value={roomApplianceData?.[roomName]?.[key] || ""}
                      onChange={(e) => handleApplianceQuantityChange(roomName, key, e.target.value)}
                      className="text-black w-16 border-gray-400 border text-center rounded"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Custom Items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              {Object.entries(customItems).map(([key, { label, selected, quantity }]) => (
                <div key={key} className="flex items-center gap-4 p-3 border rounded-lg">
                  <input
                    type="checkbox"
                    checked={selected}
                    onChange={() => handleCheckboxChange(key)}
                    className="w-5 h-5"
                  />
                  <label className="w-40 text-gray-800">{label}</label>
                  {selected && (
                    <input
                      type="number"
                      min={1}
                      value={quantity}
                      onChange={(e) => handleQuantityChange(key, e.target.value)}
                      className="w-16 border px-2 py-1 rounded-md"
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Manual Entry */}
            <div className="mt-4">
              <label className="text-gray-700 text-sm font-medium">
                Add other appliances (format: Item:Quantity)
              </label>
              <div className="flex gap-2 mt-2">
                <input
                  type="text"
                  value={manualEntry}
                  onChange={(e) => setManualEntry(e.target.value)}
                  placeholder="Eg: Fridge:1"
                  className="text-black w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
                />
                <button
                  onClick={handleManualEntryAdd}
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                >
                  Add
                </button>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {otherItems.map((entry, index) => (
                  <div
                    key={index}
                    className="bg-green-100 text-green-800 px-3 py-1 rounded-full flex items-center gap-2"
                  >
                    <span>
                      {entry.item}: {entry.quantity}
                    </span>
                    <button
                      onClick={() => removeOtherItem(index)}
                      className="text-red-600 hover:text-red-800 font-bold"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}

      {/* Footer Actions */}
      <div className="flex justify-between mt-6">
        <button
          onClick={goBack}
          className="bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300"
        >
          ← Back
        </button>
        <button
          onClick={handleNext}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
