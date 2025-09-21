import React, { useState, useEffect } from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Zap, TrendingUp, AlertTriangle, Lightbulb, Leaf, DollarSign, Power, Activity, Eye, EyeOff, BarChart2, Plus, Trash2, Edit2, Home, Settings, Menu, X, Wind, Sun } from 'lucide-react';

const DEFAULT_ROOMS = [
  'Living Room',
  'Bedroom',
  'Kitchen',
  'Bathroom',
  'Dining Room',
  'Study Room',
];

// Device Form Component
const DeviceRoomEnergyForm = ({ rooms, setRooms, selectedRoomIdx, setSelectedRoomIdx }) => {
  const [deviceName, setDeviceName] = useState('');
  const [devicePower, setDevicePower] = useState('');
  const [deviceQuantity, setDeviceQuantity] = useState('1');
  const [deviceHours, setDeviceHours] = useState('8');
  const [newRoomName, setNewRoomName] = useState('');

  const addDevice = () => {
    if (!deviceName || !devicePower) return;
    
    const updatedRooms = [...rooms];
    updatedRooms[selectedRoomIdx].devices.push({
      name: deviceName,
      power: devicePower,
      quantity: deviceQuantity,
      hours: deviceHours
    });
    setRooms(updatedRooms);
    
    // Reset form
    setDeviceName('');
    setDevicePower('');
    setDeviceQuantity('1');
    setDeviceHours('8');
  };

  const removeDevice = (deviceIdx) => {
    const updatedRooms = [...rooms];
    updatedRooms[selectedRoomIdx].devices.splice(deviceIdx, 1);
    setRooms(updatedRooms);
  };

  const addRoom = () => {
    if (!newRoomName) return;
    setRooms([...rooms, { name: newRoomName, devices: [] }]);
    setNewRoomName('');
  };

  const removeRoom = (roomIdx) => {
    if (rooms.length <= 1) return;
    const updatedRooms = rooms.filter((_, idx) => idx !== roomIdx);
    setRooms(updatedRooms);
    if (selectedRoomIdx >= updatedRooms.length) {
      setSelectedRoomIdx(0);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <Leaf className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">LumioFlow Dashboard</h1>
          <p className="text-gray-600 text-lg">Set up your devices and rooms to start monitoring</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-green-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-3">
            <Settings className="w-7 h-7 text-green-600" />
            Device & Room Configuration
          </h2>
          
          {/* Room Management */}
          <div className="mb-10">
            <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <Home className="w-5 h-5 text-green-600" />
              Manage Rooms
            </h3>
            <div className="flex flex-wrap gap-3 mb-6">
              {rooms.map((room, idx) => (
                <div
                  key={room.name}
                  className={`flex items-center gap-3 px-5 py-3 rounded-2xl border-2 cursor-pointer transition-all duration-300 hover:shadow-md ${
                    selectedRoomIdx === idx 
                      ? 'bg-green-100 border-green-300 text-green-800' 
                      : 'bg-gray-50 border-gray-200 text-gray-700 hover:border-green-200'
                  }`}
                  onClick={() => setSelectedRoomIdx(idx)}
                >
                  <span className="font-medium">{room.name}</span>
                  {rooms.length > 1 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeRoom(idx);
                      }}
                      className="text-red-400 hover:text-red-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Enter new room name"
                value={newRoomName}
                onChange={(e) => setNewRoomName(e.target.value)}
                className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-green-400 transition-colors"
              />
              <button
                onClick={addRoom}
                className="px-6 py-3 bg-green-600 text-white rounded-2xl hover:bg-green-700 transition-colors flex items-center gap-2 font-medium"
              >
                <Plus className="w-5 h-5" />
                Add Room
              </button>
            </div>
          </div>

          {/* Device Management */}
          <div className="mb-10">
            <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <Zap className="w-5 h-5 text-green-600" />
              Add Device to {rooms[selectedRoomIdx]?.name}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <input
                type="text"
                placeholder="Device name"
                value={deviceName}
                onChange={(e) => setDeviceName(e.target.value)}
                className="px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-green-400 transition-colors"
              />
              <input
                type="number"
                placeholder="Power (W)"
                value={devicePower}
                onChange={(e) => setDevicePower(e.target.value)}
                className="px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-green-400 transition-colors"
              />
              <input
                type="number"
                placeholder="Quantity"
                value={deviceQuantity}
                onChange={(e) => setDeviceQuantity(e.target.value)}
                className="px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-green-400 transition-colors"
              />
              <input
                type="number"
                placeholder="Hours/day"
                value={deviceHours}
                onChange={(e) => setDeviceHours(e.target.value)}
                className="px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-green-400 transition-colors"
              />
            </div>
            <button
              onClick={addDevice}
              className="px-8 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-2xl hover:from-green-700 hover:to-green-800 transition-all duration-300 flex items-center gap-2 font-medium shadow-lg"
            >
              <Plus className="w-5 h-5" />
              Add Device
            </button>
          </div>

          {/* Current Room Devices */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              Devices in {rooms[selectedRoomIdx]?.name}
            </h3>
            {rooms[selectedRoomIdx]?.devices.length > 0 ? (
              <div className="overflow-hidden rounded-2xl border border-gray-200">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-green-50">
                        <th className="py-4 px-6 text-left font-semibold text-gray-800">Device</th>
                        <th className="py-4 px-6 text-left font-semibold text-gray-800">Power (W)</th>
                        <th className="py-4 px-6 text-left font-semibold text-gray-800">Quantity</th>
                        <th className="py-4 px-6 text-left font-semibold text-gray-800">Hours/day</th>
                        <th className="py-4 px-6 text-left font-semibold text-gray-800">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rooms[selectedRoomIdx].devices.map((device, idx) => (
                        <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                          <td className="py-4 px-6 font-medium text-gray-800">{device.name}</td>
                          <td className="py-4 px-6 text-gray-600">{device.power}</td>
                          <td className="py-4 px-6 text-gray-600">{device.quantity}</td>
                          <td className="py-4 px-6 text-gray-600">{device.hours}</td>
                          <td className="py-4 px-6">
                            <button
                              onClick={() => removeDevice(idx)}
                              className="text-red-400 hover:text-red-600 p-2 rounded-full hover:bg-red-50 transition-all"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <Power className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p className="text-lg">No devices added to this room yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Sidebar Component
const Sidebar = ({ isOpen, setIsOpen }) => {
  return (
    <div className={`fixed top-0 left-0 h-screen bg-white shadow-2xl transition-all duration-300 border-r border-green-100  ${
      isOpen ? 'w-72' : 'w-20'
    }`}>
      <div className="p-6">
        <div className="flex items-center justify-between">
          {isOpen && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <div>
                <br /><br /><br />
                <h2 className="text-xl font-bold text-gray-800">LumioFlow</h2>
                <p className="text-sm text-gray-500">Smart Monitor</p>
              </div>
            </div>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-3 rounded-2xl hover:bg-green-50 transition-colors"
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
      <nav className="mt-8 px-4">
        <div className="space-y-3">
          <div className="flex items-center gap-4 px-4 py-3 rounded-2xl bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg">
            <Home className="w-6 h-6 flex-shrink-0" />
            {isOpen && <span className="font-medium">Dashboard</span>}
          </div>
          <div className="flex items-center gap-4 px-4 py-3 rounded-2xl text-gray-600 hover:bg-green-50 hover:text-green-700 transition-all cursor-pointer">
            <BarChart2 className="w-6 h-6 flex-shrink-0" />
            {isOpen && <span className="font-medium">Analytics</span>}
          </div>
          <div className="flex items-center gap-4 px-4 py-3 rounded-2xl text-gray-600 hover:bg-green-50 hover:text-green-700 transition-all cursor-pointer">
            <Leaf className="w-6 h-6 flex-shrink-0" />
            {isOpen && <span className="font-medium">Eco Tips</span>}
          </div>
          <div className="flex items-center gap-4 px-4 py-3 rounded-2xl text-gray-600 hover:bg-green-50 hover:text-green-700 transition-all cursor-pointer">
            <Settings className="w-6 h-6 flex-shrink-0" />
            {isOpen && <span className="font-medium">Settings</span>}
          </div>
        </div>
      </nav>
    </div>
  );
};

// Topbar Component
const Topbar = ({ sidebarWidth }) => {
  return (
    <div 
      className="fixed top-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm border-b border-green-100 px-8 py-6 z-20"
      style={{ left: `${sidebarWidth}px` }}
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
              <Activity className="w-4 h-4 text-white" />
            </div>
            <br /><br /><br />
            Energy Dashboard
          </h1>
          <p className="text-gray-600 mt-1">Monitor your power consumption in real-time</p>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 bg-green-50 px-4 py-2 rounded-2xl">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-green-700">Live Monitoring</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [readings, setReadings] = useState([]);
  const [predictions, setPredictions] = useState({
    daily: 0,
    weekly: 0,
    monthly: 0
  });
  const [powerAlerts, setPowerAlerts] = useState([]);
  const [showTips, setShowTips] = useState(false);
  const [selectedTimeFrame, setSelectedTimeFrame] = useState('daily');
  const [isConnected, setIsConnected] = useState(false);
  const [rooms, setRooms] = useState(
    DEFAULT_ROOMS.map(room => ({ name: room, devices: [] }))
  );
  const [selectedRoomIdx, setSelectedRoomIdx] = useState(0);
  const [setupComplete, setSetupComplete] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Calculate sidebar width for proper spacing
  const sidebarWidth = sidebarOpen ? 288 : 80; // 72 * 4 = 288px, 20 * 4 = 80px

  // Calculate stat card values
  const totalRooms = rooms.length;
  const totalDevices = rooms.reduce((sum, room) => sum + room.devices.length, 0);
  const totalConsumption = rooms.reduce(
    (sum, room) => sum + room.devices.reduce((dSum, device) => {
      const hours = Number(device.hours) || 0;
      const qty = Number(device.quantity) || 1;
      const power = Number(device.power) || 0;
      return dSum + (power * hours * qty) / 1000;
    }, 0),
    0
  );

  // Energy saving tips
  const energyTips = [
    {
      icon: <Wind className="w-10 h-10 text-green-500" />,
      title: "Optimize AC Usage",
      description: "Set your AC to 24°C for optimal comfort and energy efficiency",
      color: "green"
    },
    {
      icon: <Lightbulb className="w-10 h-10 text-green-500" />,
      title: "Use LED Lighting",
      description: "Switch to LED bulbs to reduce lighting energy consumption by up to 80%",
      color: "green"
    },
    {
      icon: <Sun className="w-10 h-10 text-green-500" />,
      title: "Solar Power",
      description: "Consider solar panels to reduce dependency on grid electricity",
      color: "green"
    },
    {
      icon: <Leaf className="w-10 h-10 text-green-500" />,
      title: "Smart Scheduling",
      description: "Schedule high-power devices to run during off-peak hours",
      color: "green"
    }
  ];

  useEffect(() => {
    fetchReadings();
    const interval = setInterval(fetchReadings, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchReadings = async () => {
    try {
      // Try to fetch from API first
      const response = await fetch('http://10.198.15.50:8000/api/power');
      
      if (!response.ok) {
        throw new Error(`Failed to fetch readings: ${response.status}`);
      }

      const data = await response.json();
      
      if (!Array.isArray(data)) {
        throw new Error('Invalid data format: Expected an array');
      }

      const validData = data.filter(reading => {
        return reading && 
          typeof reading.voltage === 'number' && 
          typeof reading.current === 'number' && 
          typeof reading.power === 'number' &&
          reading.timestamp;
      });

      if (validData.length === 0) {
        throw new Error('No valid readings found');
      }

      const sortedData = validData.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      
      setReadings(sortedData);
      calculatePredictions(sortedData);
      checkPowerAlerts(sortedData);
      setIsConnected(true);
    } catch (error) {
      console.error('API fetch failed, using mock data:', error.message);
      setIsConnected(false);
      generateMockData();
    }
  };

  const generateMockData = () => {
    const now = Date.now();
    const mockData = Array.from({ length: 24 }, (_, i) => {
      const timestamp = new Date(now - (23 - i) * 60 * 60 * 1000);
      const hour = timestamp.getHours();
      
      const baseVoltage = 220;
      const baseCurrent = 8;
      
      const isDaytime = hour >= 6 && hour <= 18;
      const timeMultiplier = isDaytime ? 1.2 : 0.8;
      
      const voltage = baseVoltage + (Math.random() * 10 - 5);
      const current = (baseCurrent * timeMultiplier) + (Math.random() * 2 - 1);
      const power = voltage * current;

      const clampedVoltage = Math.min(Math.max(voltage, 200), 250);
      const clampedCurrent = Math.min(Math.max(current, 0), 15);
      const clampedPower = clampedVoltage * clampedCurrent;

      return {
        timestamp: timestamp.toISOString(),
        voltage: Number(clampedVoltage.toFixed(2)),
        current: Number(clampedCurrent.toFixed(2)),
        power: Number(clampedPower.toFixed(2))
      };
    });

    setReadings(mockData);
    calculatePredictions(mockData);
    checkPowerAlerts(mockData);
  };

  const calculatePredictions = (data) => {
    if (!data || data.length === 0) {
      setPredictions({ daily: 0, weekly: 0, monthly: 0 });
      return;
    }

    try {
      const latestReading = data[0];
      const ratePerKWh = 5; // ₹5 per kWh

      const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
      const recentReadings = data.filter(reading => new Date(reading.timestamp) >= oneHourAgo);
      
      let averagePower = 0;
      if (recentReadings.length > 0) {
        averagePower = recentReadings.reduce((sum, reading) => sum + reading.power, 0) / recentReadings.length;
      } else {
        averagePower = latestReading.power;
      }

      const powerInKW = averagePower / 1000;
      const dailyPrediction = powerInKW * 24 * ratePerKWh;
      const weeklyPrediction = dailyPrediction * 7;
      const monthlyPrediction = dailyPrediction * 30;

      setPredictions({
        daily: Number(dailyPrediction.toFixed(2)),
        weekly: Number(weeklyPrediction.toFixed(2)),
        monthly: Number(monthlyPrediction.toFixed(2))
      });
    } catch (error) {
      console.error('Error calculating predictions:', error);
      setPredictions({ daily: 0, weekly: 0, monthly: 0 });
    }
  };

  const checkPowerAlerts = (data) => {
    if (!data || data.length === 0) {
      setPowerAlerts([]);
      return;
    }

    try {
      const latestReading = data[0];
      const alerts = [];

      if (latestReading.voltage < 200) {
        alerts.push({
          type: 'warning',
          message: 'Low voltage detected. Please check your power supply.',
          icon: <AlertTriangle className="w-5 h-5" />
        });
      } else if (latestReading.voltage > 250) {
        alerts.push({
          type: 'warning',
          message: 'High voltage detected. Please check your power supply.',
          icon: <AlertTriangle className="w-5 h-5" />
        });
      }

      if (latestReading.power > 2000) {
        alerts.push({
          type: 'alert',
          message: 'High power consumption detected. Consider reducing load.',
          icon: <Zap className="w-5 h-5" />
        });
      } else if (latestReading.power > 1000 && latestReading.power <= 2000) {
        alerts.push({
          type: 'info',
          message: 'Moderate power consumption. Monitor your usage.',
          icon: <Activity className="w-5 h-5" />
        });
      }

      if (latestReading.current > 10) {
        alerts.push({
          type: 'warning',
          message: 'High current detected. Check for potential overload.',
          icon: <AlertTriangle className="w-5 h-5" />
        });
      }

      if (data.length >= 2) {
        const previousReading = data[1];
        const powerChange = Math.abs(latestReading.power - previousReading.power);
        if (powerChange > 500) {
          alerts.push({
            type: 'info',
            message: 'Sudden power change detected. Check your appliances.',
            icon: <Activity className="w-5 h-5" />
          });
        }
      }

      setPowerAlerts(alerts);
    } catch (error) {
      console.error('Error checking power alerts:', error);
      setPowerAlerts([]);
    }
  };

  const getChartData = () => {
    if (!readings || readings.length === 0) {
      return Array(24).fill(0).map((_, i) => ({
        time: `${String(i).padStart(2, '0')}:00`,
        power: 0,
        voltage: 0,
        current: 0
      }));
    }

    const recentReadings = readings.slice(0, 24);
    
    const formattedData = recentReadings.map(reading => {
      const timestamp = new Date(reading.timestamp);
      return {
        time: timestamp.toLocaleTimeString('en-IN', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: false,
          timeZone: 'Asia/Kolkata'
        }),
        power: Number(reading.power.toFixed(2)),
        voltage: Number(reading.voltage.toFixed(2)),
        current: Number(reading.current.toFixed(2)),
        timestamp: timestamp.getTime()
      };
    });

    return formattedData.sort((a, b) => a.timestamp - b.timestamp);
  };

  const currentOutputPower = readings.length > 0 ? readings[0].power : 0;
  const selectedRoom = rooms[selectedRoomIdx];
  const totalRoomPower = selectedRoom.devices.reduce(
    (sum, device) => sum + (Number(device.power) || 0) * (Number(device.quantity) || 1),
    0
  );

  // --- Original greedy ON/OFF detection ---
  const margin = 20;
  let remainingPower = currentOutputPower;
  const deviceStatus = selectedRoom.devices.map(device => {
    const deviceTotal = (Number(device.power) || 0) * (Number(device.quantity) || 1);
    if (Math.abs(remainingPower - deviceTotal) <= margin || (remainingPower >= deviceTotal && deviceTotal > 0)) {
      remainingPower -= deviceTotal;
      return true;
    }
    return false;
  });

  if (!setupComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100">
        <DeviceRoomEnergyForm
          rooms={rooms}
          setRooms={setRooms}
          selectedRoomIdx={selectedRoomIdx}
          setSelectedRoomIdx={setSelectedRoomIdx}
        />
        <div className="fixed bottom-8 right-8">
          <button
            className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-2xl font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-2xl flex items-center gap-3"
            onClick={() => setSetupComplete(true)}
          >
            <Activity className="w-5 h-5" />
            Continue to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <Topbar sidebarWidth={sidebarWidth} />
      
      {/* Main Content */}
      <main 
        className="pt-32 pb-8 px-8 min-h-screen transition-all duration-300"
        style={{ marginLeft: `${sidebarWidth}px` }}
      >
        {/* Connection Status */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Energy Dashboard</h1>
            <p className="text-gray-600">Real-time monitoring and analytics</p>
          </div>
          <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-2xl shadow-lg border border-green-100">
            <div className={`w-4 h-4 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className="text-sm font-medium text-gray-700">
              {isConnected ? 'Connected to API' : 'Using Mock Data'}
            </span>
          </div>
        </div>

        {/* Current Reading Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="group bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-green-100 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium mb-2">VOLTAGE</p>
                <p className="text-4xl font-bold text-gray-800 mb-1">
                  {readings.length > 0 ? readings[0].voltage.toFixed(2) : '0.00'}
                </p>
                <p className="text-gray-600">Volts</p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-700 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Activity className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
          <div className="group bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-green-100 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium mb-2">POWER</p>
                <p className="text-4xl font-bold text-gray-800 mb-1">
                  {readings.length > 0 ? readings[0].power.toFixed(2) : '0.00'}
                </p>
                <p className="text-gray-600">Watts</p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-800 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Power className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
          <div className="group bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-green-100 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium mb-2">CURRENT</p>
                <p className="text-4xl font-bold text-gray-800 mb-1">
                  {readings.length > 0 ? readings[0].current.toFixed(2) : '0.00'}
                </p>
                <p className="text-gray-600">Amperes</p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Rooms Overview */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-gray-800 flex items-center gap-3">
            <Home className="w-8 h-8 text-green-600" />
            Rooms Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map((room, idx) => (
              <div
                key={room.name}
                className={`cursor-pointer bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] ${
                  selectedRoomIdx === idx ? 'ring-2 ring-green-400 border-green-200' : 'border-green-100'
                }`}
                onClick={() => setSelectedRoomIdx(idx)}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center">
                    <Home className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xl font-bold text-gray-800">{room.name}</span>
                </div>
                <div className="space-y-3 text-gray-600">
                  <div className="flex justify-between">
                    <span>Devices:</span>
                    <span className="font-semibold text-gray-800">{room.devices.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Power:</span>
                    <span className="font-semibold text-gray-800">
                      {room.devices.reduce((sum, d) => sum + (Number(d.power) || 0) * (Number(d.quantity) || 1), 0)} W
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Daily Energy:</span>
                    <span className="font-semibold text-green-600">
                      {room.devices.reduce((sum, d) => sum + ((Number(d.power) || 0) * (Number(d.hours) || 0) * (Number(d.quantity) || 1)) / 1000, 0).toFixed(2)} kWh
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Room Details */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-green-100 mb-12">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-700 rounded-2xl flex items-center justify-center">
                <Power className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">{selectedRoom.name} - Device Status</h2>
            </div>
          </div>
          {selectedRoom.devices.length > 0 ? (
            <div className="overflow-hidden rounded-2xl border border-green-100">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-green-50">
                      <th className="py-4 px-6 text-left font-semibold text-gray-800">Device</th>
                      <th className="py-4 px-6 text-left font-semibold text-gray-800">Power (W)</th>
                      <th className="py-4 px-6 text-left font-semibold text-gray-800">Quantity</th>
                      <th className="py-4 px-6 text-left font-semibold text-gray-800">Hours/Day</th>
                      <th className="py-4 px-6 text-left font-semibold text-gray-800">Daily (kWh)</th>
                      <th className="py-4 px-6 text-left font-semibold text-gray-800">Monthly (kWh)</th>
                      <th className="py-4 px-6 text-left font-semibold text-gray-800">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedRoom.devices.map((device, idx) => {
                      const power = Number(device.power) || 0;
                      const qty = Number(device.quantity) || 1;
                      const hours = Number(device.hours) || 0;
                      const daily = ((power * hours * qty) / 1000).toFixed(2);
                      const monthly = (daily * 30).toFixed(2);
                      return (
                        <tr key={idx} className="border-b border-green-50 hover:bg-green-25 transition-colors">
                          <td className="py-4 px-6 font-medium text-gray-800">{device.name}</td>
                          <td className="py-4 px-6 text-gray-600">{power}</td>
                          <td className="py-4 px-6 text-gray-600">{qty}</td>
                          <td className="py-4 px-6 text-gray-600">{hours}</td>
                          <td className="py-4 px-6 text-gray-600">{daily}</td>
                          <td className="py-4 px-6 text-gray-600">{monthly}</td>
                          <td className="py-4 px-6 font-bold">
                            {deviceStatus[idx] ? (
                              <span className="flex items-center text-green-600">
                                <div className="w-3 h-3 rounded-full bg-green-500 mr-3 animate-pulse"></div> 
                                ON
                              </span>
                            ) : (
                              <span className="flex items-center text-gray-400">
                                <div className="w-3 h-3 rounded-full bg-gray-400 mr-3"></div> 
                                OFF
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="text-center py-16 text-gray-500">
              <Power className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-xl mb-2">No devices added to this room yet</p>
              <p className="text-gray-400">Add some devices to start monitoring</p>
            </div>
          )}
        </div>

        {/* Overall Summary */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-green-100 mb-12">
          <h2 className="text-2xl font-bold mb-8 text-gray-800 flex items-center gap-3">
            <BarChart2 className="w-7 h-7 text-green-600" />
            Overall Summary
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-2xl p-6 text-green-800">
              <div className="flex items-center justify-between mb-2">
                <div className="text-green-600 font-semibold">Total Rooms</div>
                <Home className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-3xl font-bold">{rooms.length}</div>
            </div>
            <div className="bg-gradient-to-br from-green-200 to-green-300 rounded-2xl p-6 text-green-900">
              <div className="flex items-center justify-between mb-2">
                <div className="text-green-700 font-semibold">Total Devices</div>
                <Power className="w-6 h-6 text-green-700" />
              </div>
              <div className="text-3xl font-bold">{totalDevices}</div>
            </div>
            <div className="bg-gradient-to-br from-green-300 to-green-400 rounded-2xl p-6 text-green-900">
              <div className="flex items-center justify-between mb-2">
                <div className="text-green-800 font-semibold">Total Daily Energy</div>
                <Activity className="w-6 h-6 text-green-800" />
              </div>
              <div className="text-3xl font-bold">{totalConsumption.toFixed(2)} kWh</div>
            </div>
          </div>
        </div>

        {/* Charts & Analytics */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-green-100 mb-12">
          <h2 className="text-2xl font-bold mb-8 text-gray-800 flex items-center gap-3">
            <TrendingUp className="w-7 h-7 text-green-600" />
            Power Analytics
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={getChartData()}>
                <defs>
                  <linearGradient id="powerGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="voltageGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#059669" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#059669" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                <XAxis dataKey="time" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: 'none',
                    borderRadius: '16px',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                  }}
                />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="power" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  fill="url(#powerGradient)" 
                  name="Power (W)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="voltage" 
                  stroke="#059669" 
                  strokeWidth={2}
                  fill="url(#voltageGradient)" 
                  name="Voltage (V)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Energy Saving Tips */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-green-100 mb-12">
          <h2 className="text-2xl font-bold mb-8 text-gray-800 flex items-center gap-3">
            <Leaf className="w-7 h-7 text-green-600" />
            Eco-Friendly Tips
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {energyTips.map((tip, idx) => (
              <div key={idx} className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 text-green-800 hover:shadow-lg transition-all duration-300 hover:scale-105">
                <div className="mb-4">{tip.icon}</div>
                <div className="font-bold mb-3 text-lg">{tip.title}</div>
                <div className="text-sm text-green-700">{tip.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Alerts */}
        {powerAlerts.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-8 text-gray-800 flex items-center gap-3">
              <AlertTriangle className="w-7 h-7 text-red-500" />
              System Alerts
            </h2>
            <div className="grid gap-4">
              {powerAlerts.map((alert, idx) => (
                <div
                  key={idx}
                  className={`p-6 rounded-2xl border-2 transition-all duration-300 hover:shadow-lg ${
                    alert.type === 'warning'
                      ? 'bg-red-50 border-red-200 text-red-800'
                      : alert.type === 'alert'
                      ? 'bg-orange-50 border-orange-200 text-orange-800'
                      : 'bg-blue-50 border-blue-200 text-blue-800'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">{alert.icon}</div>
                    <p className="font-medium text-lg">{alert.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;