import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

function Admin() {
  const [eventRequests, setEventRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [approving, setApproving] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchPendingEvents = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/pending_events');

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to fetch pending events: ${errorText}`);
        }

        const data = await response.json();
        console.log('Fetched events data:', data); // Log the fetched data
        setEventRequests(data);
      } catch (err) {
        setError(`Error: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchPendingEvents();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const handleApprove = async (id) => {
    setApproving(id);
    try {
      const response = await fetch(`http://localhost:5000/api/pending_events/${id}/approve`, {
        method: 'PATCH',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to approve event');
      }

      setEventRequests(eventRequests.filter(event => event.id !== id));
    } catch (err) {
      setError(`Error approving event: ${err.message}`);
    } finally {
      setApproving(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/');
  };

  const handleViewDetails = (event) => {
    setSelectedEvent(event);
  };

  const closeModal = () => {
    setSelectedEvent(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 relative">
      <button
        onClick={handleLogout}
        className="absolute top-4 right-4 p-2 bg-red-500 text-white font-bold rounded-md hover:bg-red-600 transition-colors"
      >
        Log Out
      </button>
      <h2 className="text-4xl font-bold mb-6">Pending Event Requests</h2>
      {loading && <p className="text-yellow-400 text-xl">Loading...</p>}
      {error && <p className="text-red-500 text-xl">{error}</p>}
      {eventRequests.length === 0 ? (
        <p className="text-gray-400 text-xl">No pending event requests.</p>
      ) : (
        <ul className="space-y-4">
          {eventRequests.map((event) => (
            <li key={event.id} className="p-4 bg-gray-800 rounded-lg shadow-lg flex justify-between items-center">
              <div>
                <h3 className="text-xl font-semibold mb-1">{event.name}</h3>
                <p className="text-gray-400">{event.location}</p>
              </div>
              <button
                onClick={() => handleViewDetails(event)}
                className="px-4 py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 transition-colors"
              >
                View Details
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Modal for Event Details */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg w-full relative max-h-screen overflow-y-auto">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white text-xl font-bold"
            >
              &times;
            </button>
            <div className="mb-4">
              {selectedEvent.image && (
                <img
                  src={selectedEvent.image}
                  alt={selectedEvent.name}
                  className="w-full h-48 object-cover mb-4 rounded-md"
                />
              )}
              <h3 className="text-3xl font-bold mb-2">{selectedEvent.name}</h3>
              <p className="mb-2"><strong>About:</strong> {selectedEvent.about}</p>
              <p className="mb-2"><strong>Terms:</strong> {selectedEvent.terms}</p>
              <p className="mb-2"><strong>Location:</strong> {selectedEvent.location}</p>
              <p className="mb-2"><strong>Date:</strong> {formatDate(selectedEvent.date)}</p>
              <p className="mb-2"><strong>Time:</strong> {formatTime(selectedEvent.date)}</p>
              <p className="mb-2"><strong>Category:</strong> {selectedEvent.category}</p>
              <p className="mb-2"><strong>Price:</strong> ${selectedEvent.price}</p>
              <p className="mb-2"><strong>Total Tickets:</strong> {selectedEvent.total_tickets}</p>
              <p className="mb-4"><strong>Remaining Tickets:</strong> {selectedEvent.remaining_tickets}</p>
              <p className="mb-4"><strong>Created At:</strong> {formatDate(selectedEvent.created_at)}</p>
              <p className="mb-4"><strong>Approval Status:</strong> {selectedEvent.approval_status}</p>
            </div>
            <button
              onClick={() => handleApprove(selectedEvent.id)}
              className={`px-4 py-2 text-white font-bold rounded-md transition-colors duration-300 ${approving === selectedEvent.id ? 'bg-green-700' : 'bg-green-500 hover:bg-green-600'}`}
              disabled={approving === selectedEvent.id}
            >
              {approving === selectedEvent.id ? 'Approving...' : 'Approve Event'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;
