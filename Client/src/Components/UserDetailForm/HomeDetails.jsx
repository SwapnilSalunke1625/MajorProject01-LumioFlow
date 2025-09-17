import React, { useState } from "react";
import hallImage from "../../assets/ImagesCatagory/HomeLivingRoom.jpeg";
import KitchenImage from "../../assets/ImagesCatagory/HomeKitchen.jpg";
import GuestImage from "../../assets/ImagesCatagory/HomeGuestRoom.jpg";
import bedroomImage from "../../assets/ImagesCatagory/HomeBedroom.jpg";
import StoreImage from "../../assets/ImagesCatagory/HomeStoreRoom.jpg";

export default function HomeDetails({ goNext, goBack, selectedService }) {
  const [HallCount, setHallCount] = useState(0);
  const [KitcheCount, setKitchenCount] = useState(0);
  const [bedCount, setbedCount] = useState(0);
  const [storeCount, setstoreCount] = useState(0);
  const [guestCount, setguestCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  React.useEffect(() => {
    const total =
      Number(HallCount) +
      Number(KitcheCount) +
      Number(bedCount) +
      Number(storeCount) +
      Number(guestCount);

    setTotalCount(total);
  }, [HallCount, KitcheCount, bedCount, storeCount, guestCount]);

  const handleNext = () => {
    if (totalCount === 0) {
      alert("⚠️ Please select at least one room before proceeding.");
      return;
    }

    const roomObject = {
      roomCounts: {
        Hall: Number(HallCount),
        Kitchen: Number(KitcheCount),
        Bedroom: Number(bedCount),
        StoreRoom: Number(storeCount),
        GuestRoom: Number(guestCount),
        Total: totalCount,
      },
      SelectedService: selectedService,
    };

    if (goNext) {
      goNext(roomObject);
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-lg font-bold text-gray-800">
        Select Rooms & Provide Details
      </h2>

      {/* Room blocks */}
      {[
        {
          label: "Hall",
          image: hallImage,
          value: HallCount,
          onChange: (e) => setHallCount(Number(e.target.value)),
        },
        {
          label: "Kitchen",
          image: KitchenImage,
          value: KitcheCount,
          onChange: (e) => setKitchenCount(Number(e.target.value)),
        },
        {
          label: "Bedroom",
          image: bedroomImage,
          value: bedCount,
          onChange: (e) => setbedCount(Number(e.target.value)),
        },
        {
          label: "Store room",
          image: StoreImage,
          value: storeCount,
          onChange: (e) => setstoreCount(Number(e.target.value)),
        },
        {
          label: "Guest room",
          image: GuestImage,
          value: guestCount,
          onChange: (e) => setguestCount(Number(e.target.value)),
        },
      ].map((room, idx) => (
        <div
          key={idx}
          className="flex gap-6 bg-gradient-to-r from-green-100 via-pink-50 to-yellow-100 p-5 rounded-xl border border-gray-300 shadow-md"
        >
          <div className="w-50 h-40 flex items-center justify-center rounded-lg overflow-hidden bg-white">
            <img
              src={room.image}
              alt={room.label}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col flex-wrap items-start gap-4">
            <div className="flex w-[220px]">
              <label className="text-lg font-semibold text-gray-600">
                Room Name :
              </label>
              <p className="text-lg font-semibold text-gray-600 ml-1">
                {room.label}
              </p>
            </div>

            <div className="flex flex-col">
              <label className="text-lg font-semibold text-gray-600 mb-1">
                Room Count :
              </label>
              <input
                type="number"
                value={room.value}
                onChange={room.onChange}
                min={0}
                className="pl-5 text-lg font-semibold text-gray-600 border border-gray-600 focus:border-green-500 focus:ring-2 focus:ring-green-200 shadow-sm bg-white h-[30px] w-[70px] rounded transition duration-150 ease-in-out"
              />
            </div>
          </div>
        </div>
      ))}

      {/* Bottom Navigation Buttons */}
      <div className="flex justify-end mt-6 gap-4">
        <button
          onClick={goBack}
          className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg shadow"
        >
          Back
        </button>
        <button
          className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow"
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
}
