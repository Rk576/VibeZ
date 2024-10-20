import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EventCard = ({ event }) => {
  const [isExploring, setIsExploring] = useState(false);
  const navigate = useNavigate();

  const handleDiscoverMore = () => {
    setIsExploring(true);
    setTimeout(() => {
      setIsExploring(false);
      navigate(`/event/${event.id}`);
    }, 2000);
  };

  return (
    <div className="bg-gray-900 rounded-lg shadow-md p-4 w-64 h-96 flex flex-col justify-between hover:shadow-lg hover:scale-105 transition duration-300">
      <img src={event.image} alt={event.name} className="h-48 w-full object-cover rounded-lg" />
      <h2 className="text-lg font-bold text-white">{event.name}</h2>
      <p className="text-gray-400">{event.category}</p>
      <p className="text-gray-400">{event.location}</p>
      <p className="text-gray-400">
        {new Date(event.date).toLocaleDateString()}
      </p>
      <p className="text-lg font-bold text-green-500">${event.price}</p>
      <button
        className={`bg-purple-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded ${isExploring ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={handleDiscoverMore}
        disabled={isExploring}
      >
        {isExploring ? 'Discovering...' : 'Discover More'}
      </button>
    </div>
  );
};

export default EventCard;
