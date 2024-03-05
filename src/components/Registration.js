import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";

const Registration = () => {
  const navigate = useNavigate();

  const [formErrors, setFormErrors] = useState({});
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [pageNum, setPageNum] = useState(1);
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    password: "",
    confirmPassword: "",
    profilePicture: null, 
  });

  const handleInputChange = (event) => {
    const { name, value, type } = event.target;

    if (type === "file") {
      const file = event.target.files[0];
      setUserDetails({
        ...userDetails,
        [name]: file,
      });
    } else {
      setUserDetails({
        ...userDetails,
        [name]: value,
      });
    }
  };

  const validateForm = (values) => {
    const errors = {};
    const emailRegex = /^[^\s+@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.firstName) {
      errors.firstName = "First Name is required";
    }
    if (!values.lastName) {
      errors.lastName = "Last Name is required";
    }
    if (!values.emailAddress) {
      errors.emailAddress = "Email is required";
    } else if (!emailRegex.test(values.emailAddress)) {
      errors.emailAddress = "Invalid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 3) {
      errors.password = "Password must be at least 3 characters long";
    } else if (values.password.length > 18) {
      errors.password = "Password cannot exceed 18 characters";
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = "Confirm Password is required";
    } else if (values.confirmPassword !== values.password) {
      errors.confirmPassword = "Passwords do not match";
    }
    return errors;
  };

  const handleSignup = (event) => {
    event.preventDefault();
    setFormErrors(validateForm(userDetails));
    setIsFormSubmitted(true);
  };
  const fetchData = async (e) => {
    e.preventDefault();
    
    // Validate form
    const errors = validateForm(userDetails);
    setFormErrors(errors);
    
    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios.post('http://localhost:3200/register', userDetails);
        
        console.log(response.data);
        navigate('/posts');
      } catch (error) {
        console.error('Error:', error);
        // Handle error as needed
      }
    } else {
      // Form has errors, do not proceed with submission
      console.log('Form has errors:', errors);
    }
  };
  
  
  // useEffect(() => {
  //   fetchData();
  // }, [formErrors, isFormSubmitted]);
    
  // useEffect(() => {
  //   if (Object.keys(formErrors).length === 0 && isFormSubmitted) {
  //     axios.post('http://localhost:3200/register/', userDetails).then((response) => {
  //       // alert(response.data.message);
  //       // navigateTo("/login", { replace: true });
  //       console.log(response.data);
  //      navigate('/posts')
  //     });
  //   }
  // }, [formErrors , pageNum]);

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <form onSubmit={fetchData} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
          <h1 className="text-2xl text-center mb-4">Create an Account</h1>
          <div className="mb-4">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="firstName"
              placeholder="First Name"
              onChange={handleInputChange}
              value={userDetails.firstName}
            />
            <p className="text-red-500 text-xs italic">{formErrors.firstName}</p>
          </div>
          <div className="mb-4">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="lastName"
              placeholder="Last Name"
              onChange={handleInputChange}
              value={userDetails.lastName}
            />
            <p className="text-red-500 text-xs italic">{formErrors.lastName}</p>
          </div>
          <div className="mb-4">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              name="emailAddress"
              placeholder="Email Address"
              onChange={handleInputChange}
              value={userDetails.emailAddress}
            />
            <p className="text-red-500 text-xs italic">{formErrors.emailAddress}</p>
          </div>
          <div className="mb-4">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleInputChange}
              value={userDetails.password}
            />
            <p className="text-red-500 text-xs italic">{formErrors.password}</p>
          </div>
          <div className="mb-2">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={handleInputChange}
              value={userDetails.confirmPassword}
            />
            <p className="text-red-500 text-xs italic">{formErrors.confirmPassword}</p>
          </div>
          <div className="mb-4">
          <p htmlFor="profilePicture" className="block text-gray-700 text-sm mb-2 mr-10">
              Profile Picture
              <img src="https://png.pngtree.com/png-vector/20191110/ourmid/pngtree-avatar-icon-profile-icon-member-login-vector-isolated-png-image_1978396.jpg" alt="Profile Picture" className="inline-block w-5 h-5 " />
            </p>
           
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="file"
              name="profilePicture"
              accept="image/*"
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type = 'submit'
              // onClick={fetchData}
            >
              Register
            </button>
          </div>
        </form>
        <NavLink to="/login" className="text-center block mt-4 ml-4 text-blue-500 hover:text-blue-700">
          Already have an account? Sign in
        </NavLink>
      </div>
    </>
  );
};

export default Registration;
