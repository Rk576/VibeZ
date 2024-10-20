import React, { useState } from 'react';
import { Menu } from 'lucide-react';

function AddEventForm() {
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    about: '',
    terms: '',
    location: '',
    latitude: '',
    longitude: '',
    date: '',
    time: '',
    category: '',
    price: '',
    totalTickets: '', 
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const eventData = {
      name: formData.name,
      image: formData.image,
      about: formData.about,
      terms: formData.terms,
      location: formData.location,
      latitude: formData.latitude,
      longitude: formData.longitude,
      date: formData.date,
      time: formData.time,
      category: formData.category,
      price: formData.price,
      totalTickets: formData.totalTickets, 
    };

    try {
      const response = await fetch('http://localhost:5000/api/pending_events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error adding event:', errorText);
        setError(`Error adding event: ${errorText}`);
        return;
      }

      setSuccess('Event submitted successfully. Awaiting approval.');
      setFormData({
        name: '',
        image: '',
        about: '',
        terms: '',
        location: '',
        latitude: '',
        longitude: '',
        date: '',
        time: '',
        category: '',
        price: '',
        totalTickets: '',
      });
    } catch (error) {
      console.error('Error adding event:', error);
      setError(`Error adding event: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
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

      <div className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-xl bg-gray-900 p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-6">Add Your Event</h2>

          {error && (
            <div className="mb-4 p-4 bg-red-600 text-white rounded-md">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-4 bg-green-600 text-white rounded-md">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col">
              <label className="text-sm mb-2">Event Name</label>
              <input
                type="text"
                name="name"
                placeholder="Comedy Night"
                value={formData.name}
                onChange={handleInputChange}
                className="p-3 bg-gray-800 rounded-md border border-gray-700 focus:outline-none focus:border-gray-500"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm mb-2">Event Image URL</label>
              <input
                type="text"
                name="image"
                placeholder="https://example.com/image.jpg"
                value={formData.image}
                onChange={handleInputChange}
                className="p-3 bg-gray-800 rounded-md border border-gray-700 focus:outline-none focus:border-gray-500"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm mb-2">About the Event</label>
              <textarea
                name="about"
                placeholder="This is a comedy night..."
                value={formData.about}
                onChange={handleInputChange}
                className="p-3 bg-gray-800 rounded-md border border-gray-700 focus:outline-none focus:border-gray-500"
                rows="3"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm mb-2">Terms & Conditions</label>
              <textarea
                name="terms"
                placeholder="No refunds..."
                value={formData.terms}
                onChange={handleInputChange}
                className="p-3 bg-gray-800 rounded-md border border-gray-700 focus:outline-none focus:border-gray-500"
                rows="2"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm mb-2">Location</label>
              <input
                type="text"
                name="location"
                placeholder="Comedy Club"
                value={formData.location}
                onChange={handleInputChange}
                className="p-3 bg-gray-800 rounded-md border border-gray-700 focus:outline-none focus:border-gray-500"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm mb-2">Latitude</label>
              <input
                type="number"
                name="latitude"
                placeholder="34.1015"
                value={formData.latitude}
                onChange={handleInputChange}
                className="p-3 bg-gray-800 rounded-md border border-gray-700 focus:outline-none focus:border-gray-500"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm mb-2">Longitude</label>
              <input
                type="number"
                name="longitude"
                placeholder="-118.3264"
                value={formData.longitude}
                onChange={handleInputChange}
                className="p-3 bg-gray-800 rounded-md border border-gray-700 focus:outline-none focus:border-gray-500"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm mb-2">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="p-3 bg-gray-800 rounded-md border border-gray-700 focus:outline-none focus:border-gray-500"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm mb-2">Time</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                className="p-3 bg-gray-800 rounded-md border border-gray-700 focus:outline-none focus:border-gray-500"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm mb-2">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="p-3 bg-gray-800 rounded-md border border-gray-700 focus:outline-none focus:border-gray-500"
              >
                <option value="" disabled>Select a category</option>
                <option value="Comedy">Comedy</option>
                <option value="Music">Music</option>
                <option value="Sports">Sports</option>
                <option value="Art">Art</option>
                <option value="Theater">Theater</option>
                <option value="Technology">Technology</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-sm mb-2">Price</label>
              <input
                type="number"
                name="price"
                placeholder="40"
                value={formData.price}
                onChange={handleInputChange}
                className="p-3 bg-gray-800 rounded-md border border-gray-700 focus:outline-none focus:border-gray-500"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm mb-2">Total Tickets</label>
              <input
                type="number"
                name="totalTickets"
                placeholder="100"
                value={formData.totalTickets}
                onChange={handleInputChange}
                className="p-3 bg-gray-800 rounded-md border border-gray-700 focus:outline-none focus:border-gray-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-500 rounded-md text-white font-bold hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-400 transition duration-300"
            >
              Submit Event
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddEventForm;
