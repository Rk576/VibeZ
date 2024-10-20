import React, { useState } from 'react';
import { account } from './AppwriteConfig'; // Ensure this path is correct
import { ID } from 'appwrite';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


function VerifyMobile() {
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [countryCode, setCountryCode] = useState('+91'); // Default country code
  const [verificationId, setVerificationId] = useState(''); // Store verification ID
  const navigate = useNavigate();
  const location = useLocation(); // Call useLocation here
  const uId = location.state?.uId;  // Get uId from location state

  const handleSendOtp = async () => {
    const fullPhoneNumber = `${countryCode}${mobileNumber}`;
    try {
      const token = await account.createPhoneToken(ID.unique(), fullPhoneNumber);
      setVerificationId(token.userId); // Store verification ID
      setOtpSent(true); // Show OTP input
      setError('');
    } catch (error) {
      setError(`Error sending OTP: ${error.message}`);
      console.error('Error sending OTP:', error);
    }
  };


  const handleVerifyOtp = async () => {
  
    try {
      await account.createSession(verificationId, otp); // Verify OTP
  
      if (!uId) {
        throw new Error('User ID not found');
      }
  
      // Send phone number to backend
      const response = await fetch(`http://localhost:5000/api/users/${uId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mobile: `${countryCode}${mobileNumber}` }),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        setError(`Error updating phone number: ${errorText}`);
        console.error('Error updating phone number:', errorText);
        return;
      }
  
      setSuccess('OTP verified and phone number updated successfully!');
      setError('');
      setTimeout(() => navigate('/'), 2000); // Redirect to landing page after 2 seconds
    } catch (error) {
      setError(`Invalid OTP or Error updating phone number: ${error.message}`);
      console.error('Error verifying OTP or updating phone number:', error);
    }
  };
  

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <h2 className="text-3xl font-bold mb-4">Verify Mobile Number</h2>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      {success && <p className="text-green-600 mb-4">{success}</p>}
      {!otpSent ? (
        <div className="flex flex-col items-center">
          <input
            type="text"
            placeholder="Enter your country code"
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            className="p-2 border border-neutral-300 rounded-[18px] mb-4"
          />
          <input
            type="text"
            placeholder="Enter your mobile number"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            className="p-2 border border-neutral-300 rounded-[18px] mb-4"
          />
          <button
            onClick={handleSendOtp}
            className="p-4 text-white bg-black rounded-[18px]"
          >
            Send OTP
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="p-2 border border-neutral-300 rounded-[18px] mb-4"
          />
          <button
            onClick={handleVerifyOtp}
            className="p-4 text-white bg-black rounded-[18px]"
          >
            Verify OTP
          </button>
        </div>
      )}
    </div>
  );
}

export default VerifyMobile;
