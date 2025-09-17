import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaBolt, FaLightbulb, FaFan, FaTv, FaPlug, FaPlus, FaTrash, FaCalculator, FaDoorOpen } from 'react-icons/fa';

const defaultAppliance = () => ({
  id: Date.now() + Math.random(),
  name: '',
  power: '',
  hours: '',
});

const EnergyDisaggregation = ({ onComplete }) => {
  const [rooms, setRooms] = useState([
    { id: 1, name: '', appliances: [defaultAppliance()] }
  ]);
  const [showForm, setShowForm] = useState(true);
  const [results, setResults] = useState(null);

  // Add a new room
  const addRoom = () => {
    setRooms([...rooms, { id: Date.now(), name: '', appliances: [defaultAppliance()] }]);
  };

  // Remove a room
  const removeRoom = (roomId) => {
    if (rooms.length > 1) {
      setRooms(rooms.filter(room => room.id !== roomId));
    }
  };

  // Update room name
  const updateRoomName = (roomId, value) => {
    setRooms(rooms.map(room => room.id === roomId ? { ...room, name: value } : room));
  };

  // Add appliance to a room
  const addAppliance = (roomId) => {
    setRooms(rooms.map(room =>
      room.id === roomId
        ? { ...room, appliances: [...room.appliances, defaultAppliance()] }
        : room
    ));
  };

  // Remove appliance from a room
  const removeAppliance = (roomId, applianceId) => {
    setRooms(rooms.map(room =>
      room.id === roomId
        ? { ...room, appliances: room.appliances.length > 1 ? room.appliances.filter(a => a.id !== applianceId) : room.appliances }
        : room
    ));
  };

  // Update appliance field
  const updateAppliance = (roomId, applianceId, field, value) => {
    setRooms(rooms.map(room =>
      room.id === roomId
        ? {
            ...room,
            appliances: room.appliances.map(appliance =>
              appliance.id === applianceId ? { ...appliance, [field]: value } : appliance
            )
          }
        : room
    ));
  };

  // Calculate results
  const calculateResults = () => {
    // Calculate per room and overall
    let overallTotal = 0;
    const roomResults = rooms.map(room => {
      let roomTotal = 0;
      const appliances = room.appliances.map(appliance => {
        const power = parseFloat(appliance.power) || 0;
        const hours = parseFloat(appliance.hours) || 0;
        const monthlyConsumption = (power * hours * 30) / 1000; // kWh
        roomTotal += monthlyConsumption;
        return {
          ...appliance,
          monthlyConsumption: monthlyConsumption.toFixed(2),
          status: hours > 0 ? 'ON' : 'OFF',
        };
      });
      overallTotal += roomTotal;
      return {
        name: room.name || 'Room',
        appliances,
        roomTotal: roomTotal.toFixed(2),
      };
    });
    setResults({
      roomResults,
      overallTotal: overallTotal.toFixed(2),
    });
    setShowForm(false);
  };

  const resetForm = () => {
    setRooms([{ id: 1, name: '', appliances: [defaultAppliance()] }]);
    setResults(null);
    setShowForm(true);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
            Appliance Registration & Roomwise Disaggregation
          </h1>
          <p className="text-gray-400">
            Input all your appliances, grouped by room. See roomwise and overall energy breakdown, and which appliances are ON/OFF.
          </p>
        </motion.div>

        {showForm ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-8 border border-green-500/20"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold flex items-center gap-2"><FaDoorOpen /> Rooms</h2>
              <button
                onClick={addRoom}
                className="flex items-center space-x-2 px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg transition-all duration-300"
              >
                <FaPlus className="text-sm" />
                <span>Add Room</span>
              </button>
            </div>
            <div className="space-y-10">
              {rooms.map((room, roomIdx) => (
                <div key={room.id} className="bg-gray-800/30 rounded-lg p-6 border border-gray-700">
                  <div className="flex items-center gap-4 mb-4">
                    <input
                      type="text"
                      value={room.name}
                      onChange={e => updateRoomName(room.id, e.target.value)}
                      className="w-64 px-3 py-2 bg-gray-700/50 rounded-lg border border-gray-600 focus:border-green-500 focus:outline-none transition-all duration-300"
                      placeholder={`Room ${roomIdx + 1} Name`}
                    />
                    {rooms.length > 1 && (
                      <button
                        onClick={() => removeRoom(room.id)}
                        className="px-3 py-2 bg-red-500 hover:bg-red-600 rounded-lg transition-all duration-300"
                      >
                        <FaTrash className="text-sm" />
                      </button>
                    )}
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold">Appliances</h3>
                    <button
                      onClick={() => addAppliance(room.id)}
                      className="flex items-center space-x-2 px-3 py-1 bg-blue-500 hover:bg-blue-600 rounded-lg transition-all duration-300"
                    >
                      <FaPlus className="text-sm" />
                      <span>Add Appliance</span>
                    </button>
                  </div>
                  <div className="space-y-4">
                    {room.appliances.map((appliance, appIdx) => (
                      <div key={appliance.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end bg-gray-700/30 rounded-lg p-4 border border-gray-600">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Name/Type</label>
                          <input
                            type="text"
                            value={appliance.name}
                            onChange={e => updateAppliance(room.id, appliance.id, 'name', e.target.value)}
                            className="w-full px-3 py-2 bg-gray-800/50 rounded-lg border border-gray-600 focus:border-green-500 focus:outline-none transition-all duration-300"
                            placeholder="e.g., Fan, TV, AC"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Power (Watts)</label>
                          <input
                            type="number"
                            value={appliance.power}
                            onChange={e => updateAppliance(room.id, appliance.id, 'power', e.target.value)}
                            className="w-full px-3 py-2 bg-gray-800/50 rounded-lg border border-gray-600 focus:border-green-500 focus:outline-none transition-all duration-300"
                            placeholder="e.g., 100"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Hours ON/Day</label>
                          <input
                            type="number"
                            value={appliance.hours}
                            onChange={e => updateAppliance(room.id, appliance.id, 'hours', e.target.value)}
                            className="w-full px-3 py-2 bg-gray-800/50 rounded-lg border border-gray-600 focus:border-green-500 focus:outline-none transition-all duration-300"
                            placeholder="e.g., 5"
                          />
                        </div>
                        <div className="flex items-end">
                          {room.appliances.length > 1 && (
                            <button
                              onClick={() => removeAppliance(room.id, appliance.id)}
                              className="px-3 py-2 bg-red-500 hover:bg-red-600 rounded-lg transition-all duration-300"
                            >
                              <FaTrash className="text-sm" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <button
                onClick={calculateResults}
                className="flex items-center space-x-2 mx-auto px-8 py-3 bg-green-500 hover:bg-green-600 rounded-lg transition-all duration-300 font-semibold"
              >
                <FaCalculator />
                <span>Calculate</span>
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-green-500/20">
              <h2 className="text-2xl font-bold mb-4 text-center">Roomwise Energy Breakdown</h2>
              <div className="space-y-8">
                {results.roomResults.map((room, idx) => (
                  <div key={idx} className="bg-gray-800/30 rounded-lg p-4 border border-gray-700">
                    <h3 className="text-xl font-bold mb-2 flex items-center gap-2"><FaDoorOpen /> {room.name}</h3>
                    <div className="overflow-x-auto">
                      <table className="min-w-full text-left text-sm">
                        <thead>
                          <tr className="text-gray-400">
                            <th className="py-2 px-4">Appliance</th>
                            <th className="py-2 px-4">Power (W)</th>
                            <th className="py-2 px-4">Hours ON/Day</th>
                            <th className="py-2 px-4">Monthly (kWh)</th>
                            <th className="py-2 px-4">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {room.appliances.map((appliance, aidx) => (
                            <tr key={aidx} className={appliance.status === 'ON' ? 'text-green-400' : 'text-red-400'}>
                              <td className="py-2 px-4">{appliance.name || `Appliance ${aidx + 1}`}</td>
                              <td className="py-2 px-4">{appliance.power}</td>
                              <td className="py-2 px-4">{appliance.hours}</td>
                              <td className="py-2 px-4">{appliance.monthlyConsumption}</td>
                              <td className="py-2 px-4 font-bold">{appliance.status}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="mt-2 text-right text-lg font-semibold text-blue-400">
                      Room Total: {room.roomTotal} kWh
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 text-center text-2xl font-bold text-emerald-400">
                Overall Total: {results.overallTotal} kWh
              </div>
            </div>
            <div className="text-center flex flex-col md:flex-row gap-4 justify-center items-center">
              <button
                onClick={resetForm}
                className="px-6 py-3 bg-gray-600 hover:bg-gray-700 rounded-lg transition-all duration-300 font-semibold"
              >
                Start Over
              </button>
              <button
                onClick={onComplete}
                className="px-6 py-3 bg-green-500 hover:bg-green-600 rounded-lg transition-all duration-300 font-semibold"
              >
                Continue to Dashboard
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default EnergyDisaggregation; 