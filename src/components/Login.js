import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [userDetails, setUserDetails] = useState({
    emailAddress: '',
    password: '',
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { emailAddress, password } = userDetails;
    try {
      const result = axios.post('http://localhost:3200/login', {

        emailAddress,
        password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then((response) => {
          const result = response.data;
          console.log(result);
         
          localStorage.setItem('token', JSON.stringify(result.token));
          navigate('/posts'); 
    }
    catch (error) {
      if (error.response.status === 401) {
        setErrors({ login: 'Invalid email or password' });
      } else {
        console.error('Error during login:', error);
      }
    }
  }



return (
  <div className="flex justify-center items-center h-screen">
    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
      <h1 className="text-2xl text-center mb-4">Login</h1>
      {errors.login && <p className="text-red-500 text-xs italic">{errors.login}</p>}
      <div className="mb-4">
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="email"
          name="emailAddress"
          id="emailAddress"
          placeholder="Email"
          onChange={handleChange}
          value={userDetails.emailAddress}
        />
        <p className="text-red-500 text-xs italic">{errors.emailAddress}</p>
      </div>
      <div className="mb-4">
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          onChange={handleChange}
          value={userDetails.password}
        />
        <p className="text-red-500 text-xs italic">{errors.password}</p>
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={handleLogin}
        >
          Login
        </button>

      </div>
    </form>
    <NavLink to="/signup" className="text-center block mt-4 ml-4 text-blue-500 hover:text-blue-700">
      Not yet registered? Register Now
    </NavLink>
  </div>
);
};

export default Login;


