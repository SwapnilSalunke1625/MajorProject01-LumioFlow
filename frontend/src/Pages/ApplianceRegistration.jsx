import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const APPLIANCE_TYPES = [
  { type: 'Fan', defaultPower: 75, name: 'Ceiling Fan' },
  { type: 'LED Bulb', defaultPower: 10, name: 'LED Bulb' },
  { type: 'Tube Light', defaultPower: 40, name: 'Tube Light' },
  { type: 'AC', defaultPower: 1500, name: 'Air Conditioner' },
  { type: 'TV', defaultPower: 120, name: 'Television' },
  { type: 'Refrigerator', defaultPower: 200, name: 'Refrigerator' },
  { type: 'Washing Machine', defaultPower: 500, name: 'Washing Machine' },
  { type: 'Geyser', defaultPower: 2000, name: 'Geyser' },
  { type: 'Microwave', defaultPower: 1200, name: 'Microwave Oven' },
  { type: 'Other', defaultPower: '', name: '' },
];

const ApplianceRegistration = () => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState('');
  const [newRoom, setNewRoom] = useState('');
  const [appliances, setAppliances] = useState([]);
  const [form, setForm] = useState({ name: '', type: '', ratedPower: '' });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/appliances', { withCredentials: true }).then(res => {
      setAppliances(res.data.data || []);
      const uniqueRooms = [...new Set((res.data.data || []).map(a => a.room))];
      setRooms(uniqueRooms);
    });
  }, []);

  const handleRoomChange = (e) => {
    setSelectedRoom(e.target.value);
    setNewRoom('');
  };

  const handleAddRoom = () => {
    if (newRoom && !rooms.includes(newRoom)) {
      setRooms([...rooms, newRoom]);
      setSelectedRoom(newRoom);
      setNewRoom('');
    }
  };

  const handleTypeChange = (e) => {
    const selectedType = e.target.value;
    const preset = APPLIANCE_TYPES.find(a => a.type === selectedType);
    setForm({
      ...form,
      type: selectedType,
      name: preset?.name || '',
      ratedPower: preset?.defaultPower || '',
    });
  };

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddAppliance = async (e) => {
    e.preventDefault();
    const room = selectedRoom || newRoom;
    if (!room || !form.name || !form.type || !form.ratedPower) return;
    await axios.post('/api/appliances', { ...form, room }, { withCredentials: true });
    // Do not auto-redirect
    // navigate('/dashboard');
    // Optionally, refresh the appliance list
    axios.get('/api/appliances', { withCredentials: true }).then(res => {
      setAppliances(res.data.data || []);
      const uniqueRooms = [...new Set((res.data.data || []).map(a => a.room))];
      setRooms(uniqueRooms);
    });
  };

  const appliancesByRoom = (room) => appliances.filter(a => a.room === room);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Register Appliances</h2>
      <div className="mb-4 flex gap-2 items-end">
        <div>
          <label className="block text-sm font-medium">Select Room</label>
          <select value={selectedRoom} onChange={handleRoomChange} className="border rounded px-2 py-1">
            <option value="">--Choose--</option>
            {rooms.map(room => <option key={room} value={room}>{room}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Or Add Room</label>
          <input type="text" value={newRoom} onChange={e => setNewRoom(e.target.value)} className="border rounded px-2 py-1" placeholder="e.g. Bedroom" />
        </div>
        <button onClick={handleAddRoom} className="bg-blue-500 text-white px-3 py-1 rounded">Add Room</button>
      </div>
      <form onSubmit={handleAddAppliance} className="space-y-2 mb-6">
        <div className="flex gap-2">
          <select name="type" value={form.type} onChange={handleTypeChange} className="border rounded px-2 py-1 flex-1">
            <option value="">Select Appliance Type</option>
            {APPLIANCE_TYPES.map(a => <option key={a.type} value={a.type}>{a.type}</option>)}
          </select>
          <input name="name" value={form.name} onChange={handleInputChange} placeholder="Appliance Name" className="border rounded px-2 py-1 flex-1" />
          <input name="ratedPower" value={form.ratedPower} onChange={handleInputChange} placeholder="Rated Power (W)" type="number" className="border rounded px-2 py-1 w-32" />
        </div>
        <button type="submit" className="bg-green-600 text-white px-4 py-1 rounded">Add Appliance</button>
      </form>
      <div>
        <h3 className="font-semibold mb-2">Appliances by Room</h3>
        {rooms.map(room => (
          <div key={room} className="mb-4">
            <div className="font-bold text-lg">{room}</div>
            <ul className="pl-4 list-disc">
              {appliancesByRoom(room).map(a => (
                <li key={a._id}>{a.name} ({a.type}) - {a.ratedPower}W</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
        onClick={() => navigate('/dashboard')}
      >
        Continue to Dashboard
      </button>
    </div>
  );
};

export default ApplianceRegistration; 