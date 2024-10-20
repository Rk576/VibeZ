import React, { useState, useEffect } from 'react';
import { Menu } from "lucide-react";
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp, faTwitter } from '@fortawesome/free-brands-svg-icons';
import QRCode from 'qrcode';
import html2canvas from 'html2canvas';

const EventDetails = () => {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [tickets, setTickets] = useState(1);
    const [isBuying, setIsBuying] = useState(false);
    const [qrCodes, setQrCodes] = useState([]);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                console.log('Fetching event data...');
                const response = await fetch(`http://localhost:5000/api/events/${id}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch event: ${response.statusText}`);
                }
                const data = await response.json();
                console.log('Fetched event data:', data);
                setEvent(data);
            } catch (err) {
                console.error('Error fetching event:', err);
                alert('Failed to load event details.');
            }
        };

        fetchEvent();
    }, [id]);

    const handleBuyTicket = async () => {
        if (tickets > event.remaining_tickets) {
            alert('Not enough tickets available.');
            return;
        }

        setIsBuying(true);

        try {
            const response = await fetch(`http://localhost:5000/api/events/${event.id}/buy`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ticketsBought: tickets }),
            });

            if (response.ok) {
                setEvent(prevEvent => ({
                    ...prevEvent,
                    remaining_tickets: prevEvent.remaining_tickets - tickets,
                }));

                const newQrCodes = await Promise.all(
                    Array.from({ length: tickets }, (_, i) => {
                        const qrValue = `Ticket for ${event.name} - ${i + 1}`;
                        return QRCode.toDataURL(qrValue, { errorCorrectionLevel: 'H' }).then(url => ({
                            id: `${event.id}-${Date.now()}-${i + 1}`,
                            value: qrValue,
                            url,
                        }));
                    })
                );
                setQrCodes(newQrCodes);

                alert(`You have successfully bought ${tickets} ticket(s) for ${event.name}. Download your QR codes below.`);
            } else {
                alert('Failed to buy tickets. Please try again.');
            }
        } catch (err) {
            console.error('Error during ticket purchase:', err);
            alert('An error occurred. Please try again.');
        } finally {
            setIsBuying(false);
        }
    };

    const downloadQrCode = async (qrId, qrUrl) => {
        const link = document.createElement('a');
        link.href = qrUrl;
        link.download = `${qrId}.png`;
        link.click();
    };

    const incrementTickets = () => {
        if (tickets < event.remaining_tickets) {
            setTickets(tickets + 1);
        } else {
            alert('Not enough tickets available.');
        }
    };

    const decrementTickets = () => {
        if (tickets > 1) {
            setTickets(tickets - 1);
        }
    };

    const handleShare = (platform) => {
        const eventUrl = `http://localhost:3000/events/${id}`;
        let shareUrl = '';

        switch (platform) {
            case 'whatsapp':
                shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`Check out this event: ${eventUrl}`)}`;
                break;
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out this event: ${eventUrl}`)}`;
                break;
            default:
                return;
        }

        window.open(shareUrl, '_blank');
    };

    if (!event) return <div className="text-center text-gray-100">Loading...</div>;

    return (
        <div className="min-h-screen flex flex-col bg-black text-gray-100">
            <nav className="bg-gray-800 text-white w-full text-sm shadow-lg py-4">
                <div className="container mx-auto flex justify-between items-center">
                    <a
                        className="font-extrabold text-4xl tracking-wider ml-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600"
                        href="/"
                    >
                        VibeZ
                    </a>

                    <div className="hidden lg:flex gap-8">
                        <a className="hover:text-purple-400 transition-colors" href="/explore">
                            Explore
                        </a>
                        <a className="hover:text-purple-400 transition-colors" href="/login">
                            Login
                        </a>
                        <a className="hover:text-purple-400 transition-colors" href="/signup">
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
            <main className="flex-grow container mx-auto p-4 pt-6 mt-0 bg-black text-gray-100">
                <div className="flex flex-wrap justify-center -mx-4">
                    <div className="w-full lg:w-8/12 xl:w-8/12 p-6 text-lg">
                        <img src={event.image} alt={event.name} className="w-full h-64 object-cover mb-6 rounded-lg shadow-lg" />
                        <h1 className="text-4xl font-bold mb-4 text-orange-400">{event.name}</h1>
                        <p className="mb-6">{event.about}</p>
                        <h2 className="text-3xl font-bold mb-4 text-orange-400">Terms and Conditions</h2>
                        <p className="mb-6">{event.terms}</p>

                        <div className="flex space-x-4 mb-6">
                            <button onClick={() => handleShare('whatsapp')} className="text-green-500 hover:text-green-400">
                                <FontAwesomeIcon icon={faWhatsapp} size="2x" />
                            </button>

                            <button onClick={() => handleShare('twitter')} className="text-blue-500 hover:text-blue-400">
                                <FontAwesomeIcon icon={faTwitter} size="2x" />
                            </button>
                        </div>
                    </div>
                    <div className="w-full lg:w-4/12 xl:w-4/12 p-6 text-lg">
                        <div className="mb-6">
                            <h2 className="text-3xl font-bold mb-4 text-orange-400">Event Location</h2>
                            <a
                                href={`https://www.openstreetmap.org/?mlat=${encodeURIComponent(event.latitude)}&mlon=${encodeURIComponent(event.longitude)}&zoom=12`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block mb-4"
                            >
                                <iframe
                                    src={`https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(event.longitude)},${encodeURIComponent(event.latitude)},${encodeURIComponent(event.longitude)},${encodeURIComponent(event.latitude)}&layer=mapnik&marker=${encodeURIComponent(event.latitude)},${encodeURIComponent(event.longitude)}`}
                                    width="100%"
                                    height="250"
                                    frameBorder="0"
                                    allowFullScreen
                                    className="rounded-lg shadow-lg"
                                    title="Event Location Map"
                                />
                            </a>
                            <a
                                href={`https://www.openstreetmap.org/?mlat=${encodeURIComponent(event.latitude)}&mlon=${encodeURIComponent(event.longitude)}&zoom=12`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block text-orange-500 hover:text-orange-300 text-sm font-semibold mt-2"
                            >
                                View on OpenStreetMap
                            </a>
                        </div>
                        <div className="mb-6">
                            <h2 className="text-3xl font-bold mb-4 text-orange-400">Event Details</h2>
                            <p className="mb-2">Date: {new Date(event.date).toLocaleDateString()}</p>
                            <p className="mb-2">Time: {event.time}</p>
                            <p className="mb-2">Category: {event.category}</p>
                            <p className="mb-2">Price: ${event.price}</p>
                            <p className="mb-2">Remaining Tickets: {event.remaining_tickets}</p>
                        </div>
                        <div className="flex items-center mb-6">
                            <button
                                onClick={decrementTickets}
                                className="px-4 py-2 bg-orange-500 text-white rounded-l-lg hover:bg-orange-600"
                            >
                                -
                            </button>
                            <span className="px-4 py-2 bg-gray-200 text-black">{tickets}</span>
                            <button
                                onClick={incrementTickets}
                                className="px-4 py-2 bg-orange-500 text-white rounded-r-lg hover:bg-orange-600"
                            >
                                +
                            </button>
                        </div>
                        <button
                            onClick={handleBuyTicket}
                            className="block w-full bg-orange-500 text-white text-xl font-semibold py-4 rounded-lg hover:bg-orange-600 transition-colors"
                            disabled={isBuying}
                        >
                            {isBuying ? 'Processing...' : 'Buy Tickets'}
                        </button>
                    </div>
                </div>
                {qrCodes.length > 0 && (
                    <div className="mt-8">
                        <h2 className="text-3xl font-bold mb-4 text-orange-400 text-center">Your QR Codes</h2>
                        <div className="flex flex-wrap justify-center gap-6">
                            {qrCodes.map(qr => (
                                <div key={qr.id} className="bg-gray-800 p-4 rounded-lg shadow-lg text-center w-48">
                                    <img src={qr.url} alt={qr.value} className="mx-auto mb-2 w-40 h-40 object-contain rounded-md" />
                                    <p className="text-sm font-semibold text-gray-200 mb-2">{qr.value}</p>
                                    <button
                                        onClick={() => downloadQrCode(qr.id, qr.url)}
                                        className="mt-2 px-4 py-2 bg-orange-500 text-white text-sm font-semibold rounded-lg hover:bg-orange-600 transition-colors"
                                    >
                                        Download QR Code
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </main>
            <footer className="bg-gray-800 text-white py-4">
                <div className="container mx-auto text-center">
                    <p>&copy; 2024 VibeZ. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default EventDetails;
