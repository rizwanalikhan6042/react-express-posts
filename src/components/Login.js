import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";

const Login = ({ setUser }) => {
    const navigateTo = useNavigate();
    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [userDetails, setUserDetails] = useState({
        emailAddress: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetails({
            ...userDetails,
            [name]: value,
        });
    };

    const validateForm = (values) => {
        const validationErrors = {};
        const emailRegex = /^[^\s+@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!values.emailAddress) {
            validationErrors.emailAddress = "Email is required";
        } else if (!emailRegex.test(values.emailAddress)) {
            validationErrors.emailAddress = "Please enter a valid email address";
        }
        if (!values.password) {
            validationErrors.password = "Password is required";
        }
        return validationErrors;
    };

    const handleLogin = (e) => {
        e.preventDefault();
        setErrors(validateForm(userDetails));
        setIsSubmitted(true);
    };

    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmitted) {
            axios.post("http://example.com/login", userDetails).then((response) => {
                alert(response.data.message);
                setUser(response.data.user);
                navigateTo("/", { replace: true });
            });
        }
    }, [errors]);

    return (
        <div className="flex justify-center items-center h-screen">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
                <h1 className="text-2xl text-center mb-4">Login</h1>
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



