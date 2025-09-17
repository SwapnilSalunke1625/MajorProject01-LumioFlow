import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthContext } from "../Context/AuthContext"; // ✅ import context
import UserToggle from "./UserToggle";
import logo from "../assets/icons/logo.png";

const Navbar = () => {
  const { user } = useContext(AuthContext); // ✅ get user from context

  return (
    <nav className="fixed w-full z-50 bg-gray-900 border-b border-gray-800 shadow-sm transition-all duration-300">
      <div className="px-4 sm:px-6 lg:px-15">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <motion.img
              src={logo}
              alt="LumioFlow Logo"
              className="h-10 w-10"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            />
            <span className="ml-2 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-blue-500 to-purple-500">
              LumioFlow
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-white hover:text-green-500 transition-colors">Home</Link>
            <Link to="/products" className="text-white hover:text-green-500 transition-colors">Products</Link>
            <Link to="/energy-management" className="text-white hover:text-green-500 transition-colors">Energy Management</Link>
            <Link to="/resources" className="text-white hover:text-green-500 transition-colors">Resources</Link>
            <Link to="/about" className="text-white hover:text-green-500 transition-colors">About</Link>
            <Link to="/contact" className="text-white hover:text-green-500 transition-colors">Contact</Link>
          </div>

          {/* Profile / Auth Section */}
          <div className="flex items-center space-x-4">
            {user ? (
              <UserToggle user={user} />
            ) : (
              <Link to="/signup">
                <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
                  Sign In
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
