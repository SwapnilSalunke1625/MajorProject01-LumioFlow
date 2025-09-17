import React, { useState, useRef, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faUserGear,
  faSignOutAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

// Light solid color palette
const solidColors = [
  "bg-blue-100 text-blue-800",
  "bg-green-100 text-green-800",
  "bg-yellow-100 text-yellow-800",
  "bg-purple-100 text-purple-800",
  "bg-pink-100 text-pink-800",
  "bg-cyan-100 text-cyan-800",
];

const getRandomColor = () => {
  return solidColors[Math.floor(Math.random() * solidColors.length)];
};

export default function UserToggle({ user }) {
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState(getRandomColor());
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setOpen(false);
      navigate("/signin");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const firstLetter = user?.fullName?.charAt(0)?.toUpperCase() || "U";

  return (
    <div className="relative" ref={menuRef}>
      {/* Profile icon */}
      <div
        onClick={() => setOpen(!open)}
        className={`w-10 h-10 flex items-center justify-center font-bold rounded-full cursor-pointer shadow-md hover:scale-105 transition duration-300 ${color}`}
      >
        {firstLetter}
      </div>

      {open && (
        <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-2xl ring-1 ring-green-200 z-50 overflow-hidden animate-fadeIn">
          {/* Dropdown Header */}
          <div className={`h-20 flex items-center justify-center ${color}`}>
            <div className="text-2xl font-bold">{firstLetter}</div>
          </div>

          <div className="pt-6 pb-4 px-4">
            <p className="text-center text-lg text-gray-800 font-semibold mb-1">
              {user?.fullName || "Guest"}
            </p>
            <p className="text-center text-sm text-gray-500">{user?.email}</p>
            <p className="text-center text-sm text-gray-500 mb-3">{user?.phone}</p>

            <div className="flex flex-col space-y-2">
              <Link to="/Energy-dashboard" className="flex items-center gap-2 px-3 py-2 text-md font-semibold text-gray-700 hover:bg-green-100 rounded-lg">
                <FontAwesomeIcon icon={faTachometerAlt} />
                Energy-Dashboard
              </Link>

              <Link to="/dashboard" className="flex items-center gap-2 px-3 py-2 text-md font-semibold text-gray-700 hover:bg-green-100 rounded-lg">
                <FontAwesomeIcon icon={faUser} />
                Manage Account
              </Link>

              <Link to="/settings" className="flex items-center gap-2 px-3 py-2 text-md font-semibold text-gray-700 hover:bg-green-100 rounded-lg">
                <FontAwesomeIcon icon={faUserGear} />
                Help & Support
              </Link>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2 text-md font-semibold text-red-600 hover:bg-red-100 rounded-lg"
              >
                <FontAwesomeIcon icon={faSignOutAlt} />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
