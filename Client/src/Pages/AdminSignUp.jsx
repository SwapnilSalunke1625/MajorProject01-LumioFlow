import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Phone, MapPin, Shield, Eye, EyeOff, Zap, Check } from "lucide-react";
import logo from '../assets/icons/logo.png';
import axios from "axios";

// Sign-up page floating particles
const SignupParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-green-400 rounded-full opacity-20 animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 4}s`,
            animationDuration: `${4 + Math.random() * 4}s`
          }}
        />
      ))}
    </div>
  );
};

export default function AdminSignUp() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    state: "",
    city: "",
    userType: "",
    password: "",
    confirmPassword: "",
    preferredNotification: {
      whatsappnotify: false,
      emailnotify: false,
    },
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "whatsappnotify" || name === "emailnotify") {
      setFormData((prev) => ({
        ...prev,
        preferredNotification: {
          ...prev.preferredNotification,
          [name]: checked,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      setIsLoading(false);
      return;
    }

    // Convert preferredNotification object to array
    const selectedNotifications = [];
    if (formData.preferredNotification.whatsappnotify) {
      selectedNotifications.push("whatsapp");
    }
    if (formData.preferredNotification.emailnotify) {
      selectedNotifications.push("email");
    }

    try {
      const dataToSend = {
        ...formData,
        preferredNotification: selectedNotifications,
        signupDate: new Date().toISOString(),
      };

      const res = await axios.post("/api/v1/users/signup", dataToSend);
      console.log("Signup Success:", res.data);

      navigate("/signin");

      setFormData({
        fullName: "",
        email: "",
        phone: "",
        country: "",
        state: "",
        city: "",
        userType: "",
        password: "",
        confirmPassword: "",
        preferredNotification: {
          whatsappnotify: false,
          emailnotify: false,
        },
      });
    } catch (err) {
      console.error("Signup Error:", err.response?.data || err.message);
      alert("Signup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-green-50 py-8">
      <SignupParticles />
      
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full bg-[linear-gradient(to_right,#22c55e_1px,transparent_1px),linear-gradient(to_bottom,#22c55e_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      </div>

      {/* Radial glow effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.05)_0%,transparent_50%)]"></div>

      <div className="relative z-10 w-full max-w-2xl mx-4">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200/50 p-8 hover:shadow-3xl transition-all duration-300">
          
          {/* Header */}
          <div className="text-center mb-8">
            {/* LumioFlow Logo */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-green-500 rounded-2xl opacity-10 blur-xl animate-pulse"></div>
                <img 
                  src={logo} 
                  alt="LumioFlow Logo" 
                  className="relative w-32 h-auto object-contain drop-shadow-lg"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                {/* Fallback logo if image fails */}
                <div className="hidden w-32 h-16 bg-green-500 rounded-2xl items-center justify-center text-white text-2xl font-bold shadow-lg">
                  <Zap className="w-8 h-8 mr-2" />
                  <span>LumioFlow</span>
                </div>
              </div>
            </div>
            
            <h1 className="text-3xl font-light text-gray-900 mb-2">
              Join <span className="font-semibold text-green-500">LumioFlow</span>
            </h1>
            <p className="text-gray-600 font-light">Create your energy management account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Personal Information Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <User className="w-5 h-5 text-green-500" />
                Personal Information
              </h3>
              
              {/* Full Name */}
              <div className="space-y-2">
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>
            </div>

            {/* Location Information Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-green-500" />
                Location Details
              </h3>
              
              {/* Location Fields */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                    Country
                  </label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                    placeholder="Country"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                    State
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                    placeholder="State"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                    placeholder="City"
                  />
                </div>
              </div>

              {/* User Type */}
              <div className="space-y-2">
                <label htmlFor="userType" className="block text-sm font-medium text-gray-700">
                  User Type
                </label>
                <div className="relative">
                  <Shield className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select
                    id="userType"
                    name="userType"
                    value={formData.userType}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-gray-900"
                  >
                    <option value="">Select User Type</option>
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Industrial">Industrial</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Security Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-500" />
                Security
              </h3>
              
              {/* Password */}
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <Shield className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-12 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                    placeholder="Create a password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <div className="relative">
                  <Shield className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-12 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Notification Preferences */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Notification Preferences
              </h3>
              
              <div className="flex flex-wrap gap-4">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="whatsappnotify"
                    checked={formData.preferredNotification.whatsappnotify}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div className={`relative w-6 h-6 rounded-lg border-2 transition-all duration-200 ${
                    formData.preferredNotification.whatsappnotify
                      ? 'bg-green-500 border-green-500'
                      : 'bg-white border-gray-300 hover:border-green-300'
                  }`}>
                    {formData.preferredNotification.whatsappnotify && (
                      <Check className="w-4 h-4 text-white absolute top-0.5 left-0.5" />
                    )}
                  </div>
                  <span className="text-gray-700 font-medium">WhatsApp Notifications</span>
                </label>
                
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="emailnotify"
                    checked={formData.preferredNotification.emailnotify}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div className={`relative w-6 h-6 rounded-lg border-2 transition-all duration-200 ${
                    formData.preferredNotification.emailnotify
                      ? 'bg-green-500 border-green-500'
                      : 'bg-white border-gray-300 hover:border-green-300'
                  }`}>
                    {formData.preferredNotification.emailnotify && (
                      <Check className="w-4 h-4 text-white absolute top-0.5 left-0.5" />
                    )}
                  </div>
                  <span className="text-gray-700 font-medium">Email Notifications</span>
                </label>
              </div>
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-green-500 text-white font-medium rounded-2xl hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Creating Account...
                </div>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Sign In Link */}
          <div className="text-center mt-8">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link 
                to="/signin" 
                className="text-green-600 hover:text-green-700 font-semibold transition-colors duration-200"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Bottom decorative element */}
        <div className="flex justify-center mt-8">
          <div className="flex space-x-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 bg-green-500 rounded-full opacity-60 animate-pulse"
                style={{ animationDelay: `${i * 0.5}s` }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}