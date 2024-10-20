import React, { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import EventCard from "./EventCard";

const Explore = () => {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');

  
  useEffect(() => {
    const fetchEvents = async () => {
        try {
            const response = await fetch('http://localhost:5000/events');
            const data = await response.json();
            console.log('Fetched events:', data);  // Verify the structure here
            setEvents(data);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    fetchEvents();
}, []);


  const filteredEvents = events.filter((event) => {
    if (category === 'all') {
      return event.name.toLowerCase().includes(searchTerm.toLowerCase());
    } else {
      return event.category === category && event.name.toLowerCase().includes(searchTerm.toLowerCase());
    }
  });

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <nav className="bg-gray-900 text-white w-full text-sm shadow-md py-4">
        <div className="container mx-auto flex justify-between items-center">
          <a
            className="font-extrabold text-4xl tracking-wider ml-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500"
            href="/"
          >
            VibeZ
          </a>

          <div className="hidden lg:flex gap-8">
            <a className="hover:text-purple-400" href="/explore">
              Explore
            </a>
            <a className="hover:text-purple-400" href="/login">
              Login
            </a>
            <a className="hover:text-purple-400" href="/signup">
              Signup
            </a>
          </div>
          <div className="lg:hidden flex items-center">
            <button>
              <Menu color="white" size={24} />
            </button>
          </div>
        </div>
      </nav>
      <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12 xl:p-24">
        <h1 className="text-3xl font-bold text-white mb-4">Explore Events</h1>
        <div className="flex flex-wrap justify-between mb-4">
          <input
            type="search"
            className="bg-gray-700 text-white p-2 rounded-lg w-full md:w-1/2 lg:w-1/3 xl:w-1/4 focus:outline-none focus:ring focus:ring-purple-500"
            placeholder="Search events"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="bg-gray-700 text-white p-2 rounded-lg w-full md:w-1/2 lg:w-1/3 xl:w-1/4 focus:outline-none focus:ring focus:ring-purple-500"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="all">All</option>
            <option value="Music">Music</option>
            <option value="Food">Food</option>
            <option value="Sports">Sports</option>
            <option value="Art">Art</option>
            <option value="Comedy">Comedy</option>
            <option value="Comedy">Technology</option>
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} history={{ push: (path) => console.log(path) }} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Explore;
