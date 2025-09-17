import React, { useState } from "react";
import logo from "../../assets/icons/logo.png";
import SchoolImage from "../../assets/ImagesCatagory/SchoolCat.png";
import HostelImage from "../../assets/ImagesCatagory/HostelCat.png";
import HomeImage from "../../assets/ImagesCatagory/Homecat.png";
import HomeDetails from "./HomeDetails";
import RoomDetails from "./RoomDetails";
import ReviewStep from "./ReviewStep";
import FinalStep from "./FinalStep"
import { Link } from "react-router-dom";

export default function MainFormWrapper() {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState("");
  const [roomData, setRoomData] = useState({});
  const [applianceData, setApplianceData] = useState({});
  const totalSteps = 5;


  // when user choose service and go to next

  const handleSelect = (service) => {
    setSelectedService(service);
    setStep(2);
  };



  // back as it is

  const goBack = () => {
    if (step === 2) {
      setSelectedService("");
      setStep(1);
    } else if (step === 3) {
      setStep(2);
    } else if (step === 4) {
      setStep(3);
    }
  };

  // merge data from child

  const goNext = (dataFromChild = null) => {
    if (dataFromChild) {
      setRoomData((prevData) => ({
        ...prevData,
        ...dataFromChild,
      }));
      console.log("Merged Data from Child:", dataFromChild);
    }
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const progressSteps = [
    { step: 1, label: "Select Purpose" },
    { step: 2, label: " home section" },
    { step: 3, label: "Room Details" },
    { step: 4, label: "Review" },
    { step: 5, label: "Completed" },
  ];

  return (
    <div className="flex justify-center items-center min-h-screen px-4 bg-gray-100 z-20 relative">
      <div className="w-full max-w-5xl h-[560px] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-green-200 via-green-100 to-green-50 p-4 md:p-6 flex justify-between items-center relative">
          <img
            src={logo}
            alt="LumioFlow Logo"
            className="w-10 h-10 md:w-12 md:h-12"
          />
          <h1 className="text-center text-xl md:text-2xl font-semibold text-green-800 absolute left-1/2 transform -translate-x-1/2">
            LumioFlow
          </h1>
          <p className="text-sm text-green-700 font-medium">{`${step} of ${totalSteps}`}</p>
        </div>

        {/* Progress Bar */}
        <div className="flex justify-between px-10 py-4 bg-gray-100 border-b">
          {progressSteps.map(({ step: s, label }, index) => (
            <div key={index} className="flex-1 text-center relative">
              <div
                className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center font-semibold 
                 ${
                   step >= s
                     ? "bg-green-500 text-white"
                     : "bg-gray-300 text-gray-700"
                 }`}
              >
                {s}
              </div>
              <p className="text-xs mt-1 text-gray-700">{label}</p>
              {index < progressSteps.length - 1 && (
                <div
                  className={`absolute top-4 left-1/2 w-full h-1 z-[-1] ${
                    step > s ? "bg-green-500" : "bg-gray-300"
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 md:p-8 overflow-y-auto">
          
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Would you like to use LumioFlow for what purpose?
              </h2>
              <div className="flex justify-center gap-6">
                <Card img={HomeImage} label="Home" onClick={() => handleSelect("home")} bg="green-100" />
                <Card img={SchoolImage} label="School" onClick={() => handleSelect("school")} bg="pink-100" />
                <Card img={HostelImage} label="Hostel" onClick={() => handleSelect("hostel")} bg="yellow-100" />
              </div>
            </div>
          )}

          {step === 2 && selectedService === "home" && (
            <HomeDetails
              goNext={goNext}
              goBack={goBack}
              selectedService={selectedService}
            />
          )}

          {step === 3 && selectedService === "home" && (
            <RoomDetails
              goBack={goBack}
              goNext={goNext}
              selectedService={selectedService}
              roomCounts={roomData.roomCounts}
            />
          )}

          {step === 4 && (
            <ReviewStep
              goBack={goBack}
              roomData={roomData}
              finalData={[roomData]}
              handleSubmit={() => alert("✅ Submitted Successfully")}
            />
          )}
        </div>
      </div>
    </div>
  );
}

// 🔹 Reusable card component
function Card({ img, label, onClick, bg }) {
  return (
    <div onClick={onClick} className="cursor-pointer">
      <div className={`p-2 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300 bg-${bg}`}>
        <div className="bg-white w-44 h-44 rounded-lg overflow-hidden">
          <img src={img} alt={label} className="w-full h-full object-cover" />
        </div>
      </div>
      <p className="text-center mt-2 font-medium text-gray-700">{label}</p>
    </div>
  );
}
