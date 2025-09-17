import React, { useState, useEffect } from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Zap, TrendingUp, AlertTriangle, Lightbulb, Leaf, DollarSign, Power, Activity, Eye, EyeOff, BarChart2, PieChart as PieChartIcon, Plus, Trash2, Edit2, Home, Settings, Menu, X } from 'lucide-react';

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
    <div className="bg-white rounded-2xl p-6 shadow border border-slate-100">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Device & Room Setup</h2>
      {/* Room Management */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-slate-700 mb-3">Rooms</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {rooms.map((room, idx) => (
            <div
              key={room.name}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer ${
                selectedRoomIdx === idx ? 'bg-emerald-100 border-emerald-400' : 'bg-slate-100 border-slate-200'
              }`}
              onClick={() => setSelectedRoomIdx(idx)}
            >
              <span>{room.name}</span>
              {rooms.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeRoom(idx);
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="New room name"
            value={newRoomName}
            onChange={(e) => setNewRoomName(e.target.value)}
            className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
          <button
            onClick={addRoom}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Room
          </button>
        </div>
      </div>
      {/* Device Management */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-slate-700 mb-3">
          Add Device to {rooms[selectedRoomIdx]?.name}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <input
            type="text"
            placeholder="Device name"
            value={deviceName}
            onChange={(e) => setDeviceName(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
          <input
            type="number"
            placeholder="Power (W)"
            value={devicePower}
            onChange={(e) => setDevicePower(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
          <input
            type="number"
            placeholder="Quantity"
            value={deviceQuantity}
            onChange={(e) => setDeviceQuantity(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
          <input
            type="number"
            placeholder="Hours/day"
            value={deviceHours}
            onChange={(e) => setDeviceHours(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
        </div>
        <button
          onClick={addDevice}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Device
        </button>
      </div>
      {/* Current Room Devices */}
      <div>
        <h3 className="text-lg font-semibold text-slate-700 mb-3">
          Devices in {rooms[selectedRoomIdx]?.name}
        </h3>
        {rooms[selectedRoomIdx]?.devices.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-100">
                  <th className="py-2 px-3 text-left">Device</th>
                  <th className="py-2 px-3 text-left">Power (W)</th>
                  <th className="py-2 px-3 text-left">Quantity</th>
                  <th className="py-2 px-3 text-left">Hours/day</th>
                  <th className="py-2 px-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {rooms[selectedRoomIdx].devices.map((device, idx) => (
                  <tr key={idx} className="border-b border-slate-100">
                    <td className="py-2 px-3">{device.name}</td>
                    <td className="py-2 px-3">{device.power}</td>
                    <td className="py-2 px-3">{device.quantity}</td>
                    <td className="py-2 px-3">{device.hours}</td>
                    <td className="py-2 px-3">
                      <button
                        onClick={() => removeDevice(idx)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-slate-500">No devices added to this room yet.</p>
        )}
      </div>
    </div>
  );
};

// Sidebar Component
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={`bg-white shadow-lg transition-all duration-300 ${isOpen ? 'w-64' : 'w-16'}`}>
      <div className="p-4">
        <div className="flex items-center justify-between">
          {isOpen && <h2 className="text-xl font-bold text-slate-800">Energy Monitor</h2>}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg hover:bg-slate-100"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
      <nav className="mt-8">
        <div className="px-4 space-y-2">
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-emerald-100 text-emerald-700">
            <Home className="w-5 h-5" />
            {isOpen && <span>Dashboard</span>}
          </div>
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-100">
            <BarChart2 className="w-5 h-5" />
            {isOpen && <span>Analytics</span>}
          </div>
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-100">
            <Settings className="w-5 h-5" />
            {isOpen && <span>Settings</span>}
          </div>
        </div>
      </nav>
    </div>
  );
};

// Topbar Component
const Topbar = () => {
  return (
    <div className="bg-white shadow-sm border-b border-slate-200 px-8 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-slate-800">Energy Dashboard</h1>
          <p className="text-sm text-slate-600">Monitor your power consumption in real-time</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-slate-600">Live Monitoring</span>
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
      icon: <Leaf className="w-8 h-8 text-emerald-400" />,
      title: "Optimize AC Usage",
      description: "Set your AC to 24°C for optimal comfort and energy efficiency",
      color: "emerald"
    },
    {
      icon: <Lightbulb className="w-8 h-8 text-amber-400" />,
      title: "Use LED Lighting",
      description: "Switch to LED bulbs to reduce lighting energy consumption by up to 80%",
      color: "amber"
    },
    {
      icon: <Zap className="w-8 h-8 text-blue-400" />,
      title: "Unplug Devices",
      description: "Unplug devices when not in use to prevent phantom power consumption",
      color: "blue"
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-purple-400" />,
      title: "Smart Scheduling",
      description: "Schedule high-power devices to run during off-peak hours",
      color: "purple"
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
      const response = await fetch('http://192.168.211.50:8000/api/power');
      
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
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-full max-w-4xl">
          <DeviceRoomEnergyForm
            rooms={rooms}
            setRooms={setRooms}
            selectedRoomIdx={selectedRoomIdx}
            setSelectedRoomIdx={setSelectedRoomIdx}
          />
          <div className="flex justify-end mt-6">
            <button
              className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-emerald-700 transition"
              onClick={() => setSetupComplete(true)}
            >
              Continue to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="flex-1 p-8 overflow-y-auto">
          {/* Connection Status */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-slate-800">Energy Dashboard</h1>
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
              <span className="text-sm text-slate-600">
                {isConnected ? 'Connected to API' : 'Using Mock Data'}
              </span>
            </div>
          </div>

          {/* Current Reading Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-2xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-100 text-sm">Voltage</p>
                  <p className="text-3xl font-bold">{readings.length > 0 ? readings[0].voltage.toFixed(2) : '0.00'} V</p>
                </div>
                <Zap className="w-8 h-8 text-emerald-200" />
              </div>
            </div>
            <div className="bg-gradient-to-r from-blue-400 to-blue-600 rounded-2xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Current</p>
                  <p className="text-3xl font-bold">{readings.length > 0 ? readings[0].current.toFixed(2) : '0.00'} A</p>
                </div>
                <Activity className="w-8 h-8 text-blue-200" />
              </div>
            </div>
            <div className="bg-gradient-to-r from-purple-400 to-purple-600 rounded-2xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Power</p>
                  <p className="text-3xl font-bold">{readings.length > 0 ? readings[0].power.toFixed(2) : '0.00'} W</p>
                </div>
                <Power className="w-8 h-8 text-purple-200" />
              </div>
            </div>
          </div>

          {/* Rooms Overview */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-slate-800">Rooms Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {rooms.map((room, idx) => (
                <div
                  key={room.name}
                  className={`cursor-pointer bg-white rounded-2xl p-6 shadow border transition-all ${
                    selectedRoomIdx === idx ? 'ring-2 ring-emerald-400 border-emerald-200' : 'border-slate-100 hover:border-slate-200'
                  }`}
                  onClick={() => setSelectedRoomIdx(idx)}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Home className="w-6 h-6 text-emerald-500" />
                    <span className="text-lg font-semibold text-slate-800">{room.name}</span>
                  </div>
                  <div className="space-y-1 text-sm text-slate-600">
                    <div>Devices: {room.devices.length}</div>
                    <div>Total Power: {room.devices.reduce((sum, d) => sum + (Number(d.power) || 0) * (Number(d.quantity) || 1), 0)} W</div>
                    <div>Daily Energy: {room.devices.reduce((sum, d) => sum + ((Number(d.power) || 0) * (Number(d.hours) || 0) * (Number(d.quantity) || 1)) / 1000, 0).toFixed(2)} kWh</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Selected Room Details */}
          <div className="bg-white rounded-2xl p-6 shadow border border-slate-100 mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Power className="w-6 h-6 text-blue-500" />
                <h2 className="text-xl font-bold text-slate-800">{selectedRoom.name} - Device Details</h2>
              </div>
            </div>
            {selectedRoom.devices.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                  <thead>
                    <tr className="text-gray-400">
                      <th className="py-2 px-4">Device</th>
                      <th className="py-2 px-4">Power (W)</th>
                      <th className="py-2 px-4">Quantity</th>
                      <th className="py-2 px-4">Hours/Day</th>
                      <th className="py-2 px-4">Daily (kWh)</th>
                      <th className="py-2 px-4">Monthly (kWh)</th>
                      <th className="py-2 px-4">Status</th>
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
                        <tr key={idx} className={deviceStatus[idx] ? 'text-green-600' : 'text-red-400'}>
                          <td className="py-2 px-4">{device.name}</td>
                          <td className="py-2 px-4">{power}</td>
                          <td className="py-2 px-4">{qty}</td>
                          <td className="py-2 px-4">{hours}</td>
                          <td className="py-2 px-4">{daily}</td>
                          <td className="py-2 px-4">{monthly}</td>
                          <td className="py-2 px-4 font-bold">
                            {deviceStatus[idx] ? (
                              <span className="flex items-center text-green-600">
                                <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span> ON
                              </span>
                            ) : (
                              <span className="flex items-center text-red-500">
                                <span className="w-3 h-3 rounded-full bg-red-500 mr-2"></span> OFF
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-slate-500">No devices added to this room yet.</p>
            )}
          </div>

          {/* Overall Summary */}
          <div className="bg-white rounded-2xl p-6 shadow border border-slate-100 mb-8">
            <h2 className="text-xl font-bold mb-4 text-slate-800">Overall Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-emerald-100 rounded-xl p-4 text-emerald-800">
                <div className="font-semibold">Total Rooms</div>
                <div className="text-2xl font-bold">{rooms.length}</div>
              </div>
              <div className="bg-blue-100 rounded-xl p-4 text-blue-800">
                <div className="font-semibold">Total Devices</div>
                <div className="text-2xl font-bold">{totalDevices}</div>
              </div>
              <div className="bg-purple-100 rounded-xl p-4 text-purple-800">
                <div className="font-semibold">Total Daily Energy</div>
                <div className="text-2xl font-bold">{totalConsumption.toFixed(2)} kWh</div>
              </div>
            </div>
          </div>

          {/* Charts & Analytics */}
          <div className="bg-white rounded-2xl p-6 shadow border border-slate-100 mb-8">
            <h2 className="text-xl font-bold mb-4 text-slate-800">Analytics & Charts</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={getChartData()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="power" stroke="#10b981" name="Power (W)" />
                  <Line type="monotone" dataKey="voltage" stroke="#3b82f6" name="Voltage (V)" />
                  <Line type="monotone" dataKey="current" stroke="#8b5cf6" name="Current (A)" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Energy Saving Tips */}
          <div className="bg-white rounded-2xl p-6 shadow border border-slate-100 mb-8">
            <h2 className="text-xl font-bold mb-4 text-slate-800">Energy Saving Tips</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {energyTips.map((tip, idx) => (
                <div key={idx} className="bg-emerald-50 rounded-xl p-4 text-emerald-800">
                  <div className="mb-2">{tip.icon}</div>
                  <div className="font-semibold mb-1">{tip.title}</div>
                  <div className="text-sm">{tip.description}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Alerts */}
          {powerAlerts.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4 text-slate-800">Alerts</h2>
              <div className="grid gap-4">
                {powerAlerts.map((alert, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl border transition-all duration-300 hover:scale-[1.01] ${
                      alert.type === 'warning'
                        ? 'bg-red-100 border-red-300 text-red-700'
                        : alert.type === 'alert'
                        ? 'bg-amber-100 border-amber-300 text-amber-700'
                        : 'bg-blue-100 border-blue-300 text-blue-700'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      {alert.icon}
                      <p className="font-medium">{alert.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;