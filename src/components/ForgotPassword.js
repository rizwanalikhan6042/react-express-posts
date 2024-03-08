import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [emailAddress, setEmailAddress] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [token, setToken] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3200/forgot-password', {
        emailAddress,
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('An error occurred. Please try again later.');
      console.error('Error initiating password reset:', error);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:3200/reset-password/${token}`, {
        newPassword,
      });
      setMessage(response.data.message);
      
    } catch (error) {
      setMessage('An error occurred. Please try again later.');
      console.error('Error resetting password:', error);
    }
    
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
        <h1 className="text-2xl text-center mb-4">Forgot Password</h1>
        {message && <p className="font-bold text-green-500 text-xl italic">{message}</p>}
        <div className="mb-4">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            name="emailAddress"
            id="emailAddress"
            placeholder="Email"
            onChange={(e) => setEmailAddress(e.target.value)}
            value={emailAddress}
          />
        </div>
        <div className="mb-4">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="token"
            id="token"
            placeholder="Paste Reset Token"
            onChange={(e) => setToken(e.target.value)}
            value={token}
          />
        </div>
        <div className="mb-4">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            name="newPassword"
            id="newPassword"
            placeholder="New Password"
            onChange={(e) => setNewPassword(e.target.value)}
            value={newPassword}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleForgotPassword}
          >
            Send Reset Link
          </button>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleResetPassword}
          >
            Reset Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
