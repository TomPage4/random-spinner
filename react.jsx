import React, { useState, useEffect } from 'react';
import { Plus, Loader2 } from 'lucide-react';

const WheelSpinner = () => {
  const [names, setNames] = useState([]);
  const [newName, setNewName] = useState('');
  const [spinning, setSpinning] = useState(false);
  const [selectedName, setSelectedName] = useState(null);
  const [rotation, setRotation] = useState(0);

  const addName = (e) => {
    e.preventDefault();
    if (newName.trim()) {
      setNames([...names, newName.trim()]);
      setNewName('');
    }
  };

  const spinWheel = () => {
    if (names.length === 0 || spinning) return;

    setSpinning(true);
    setSelectedName(null);

    // Check for Javi first
    const javiIndex = names.findIndex(name => name.toLowerCase() === 'javi');
    if (javiIndex !== -1) {
      // Simulate spin but always land on Javi
      const newRotation = rotation + 1800 + (360 / names.length * javiIndex);
      setRotation(newRotation);
      
      setTimeout(() => {
        setSelectedName('Javi');
        setSpinning(false);
        setNames(names.filter(name => name !== 'Javi'));
      }, 3000);
      
      return;
    }

    // Regular random selection
    const randomIndex = Math.floor(Math.random() * names.length);
    const selectedName = names[randomIndex];
    const newRotation = rotation + 1800 + (360 / names.length * randomIndex);
    setRotation(newRotation);

    setTimeout(() => {
      setSelectedName(selectedName);
      setSpinning(false);
      setNames(names.filter(name => name !== selectedName));
    }, 3000);
  };

  return (
    <div className="flex flex-col items-center gap-8 p-8 max-w-2xl mx-auto">
      <form onSubmit={addName} className="flex gap-2 w-full">
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Enter a name"
          className="flex-1 p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 flex items-center gap-2"
        >
          <Plus size={20} /> Add Name
        </button>
      </form>

      <div className="relative w-64 h-64">
        <div
          className="absolute w-full h-full rounded-full border-4 border-gray-200 transition-transform duration-3000"
          style={{
            transform: `rotate(${rotation}deg)`,
            backgroundColor: '#f8f9fa',
          }}
        >
          {names.map((name, index) => (
            <div
              key={index}
              className="absolute w-full h-full text-center"
              style={{
                transform: `rotate(${(360 / names.length) * index}deg)`,
              }}
            >
              <span
                className="inline-block"
                style={{
                  transform: 'translateY(-50%)',
                }}
              >
                {name}
              </span>
            </div>
          ))}
        </div>
        <div className="absolute top-0 left-1/2 w-0 h-0 -ml-2">
          <div className="w-4 h-4 bg-red-500 transform rotate-45"></div>
        </div>
      </div>

      <button
        onClick={spinWheel}
        disabled={names.length === 0 || spinning}
        className="bg-green-500 text-white p-3 rounded hover:bg-green-600 disabled:bg-gray-400 flex items-center gap-2"
      >
        {spinning ? (
          <Loader2 className="animate-spin" size={20} />
        ) : null}
        {spinning ? 'Spinning...' : 'Spin Wheel'}
      </button>

      {selectedName && (
        <div className="text-xl font-bold text-center">
          Selected: {selectedName}
        </div>
      )}

      <div className="text-sm text-gray-600">
        Names remaining: {names.length}
      </div>

      <div className="flex flex-wrap gap-2">
        {names.map((name, index) => (
          <span
            key={index}
            className="bg-gray-100 px-3 py-1 rounded"
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default WheelSpinner;