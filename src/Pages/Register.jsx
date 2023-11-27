import React, { useState } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar";
import { Navigate, useNavigate } from "react-router-dom";
import { message } from "antd";
function Register() {
  //const navigate = new Navigate();
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    contactNo: "",
  });

  const [errors, setErrors] = useState({
    password: "",
    contactNo: "",
    email: "",
  });

  const validatePassword = (value) => {
    const alphanumericRegex = /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/;
    return alphanumericRegex.test(value);
  };

  const validateContactNo = (value) => {
    const contactNoRegex = /^\d{10}$/;
    return contactNoRegex.test(value);
  };

  const validateEmail = (value) => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Perform validation on each change
    if (name === "password") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: validatePassword(value) ? "" : "Password should be alphanumeric and at least 6 characters long.",
      }));
    } else if (name === "contactNo") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        contactNo: validateContactNo(value) ? "" : "Contact number should be 10 digits long.",
      }));
    } else if (name === "email") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: validateEmail(value) ? "" : "Invalid email address.",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for validation errors before submitting
    if (errors.password || errors.contactNo || errors.email) {
      console.log("Validation failed. Please fix the errors before submitting.");
      return;
    }

    try {
      const apiUrl = "https://localhost:44397/api/User"; // Replace with your actual API endpoint

      const response = await axios.post(apiUrl, formData);

      console.log("Registration successful:", response.data);
      message.success("register successfully")

      setFormData({
        userName: "",
        email: "",
        password: "",
        contactNo: "",
      });
    //  navigate('/login');
   

      // Optionally, redirect the user after successful registration
      // history.push('/login');
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div style={{ background: "linear-gradient(to right, #4e54c8, #8f94fb)", minHeight: "100vh" }}>
      <Navbar />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card p-4" style={{ backgroundColor: "#f7f1e3" }}>
              <h2 className="text-center mb-4">Register for Hotel Booking</h2>
              <form onSubmit={handleSubmit}>
              <div className="mb-3">
                  <label htmlFor="fullName" className="form-label">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="userName"
                    name="userName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>
              
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className={`form-control ${errors.password ? "is-invalid" : ""}`}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                </div>
                <div className="mb-3">
                  <label htmlFor="contactNo" className="form-label">
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    className={`form-control ${errors.contactNo ? "is-invalid" : ""}`}
                    id="contactNo"
                    name="contactNo"
                    value={formData.contactNo}
                    onChange={handleChange}
                    required
                  />
                  {errors.contactNo && <div className="invalid-feedback">{errors.contactNo}</div>}
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>
                {/* ... existing form inputs ... */}
                <button type="submit" className="btn btn-primary">
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
