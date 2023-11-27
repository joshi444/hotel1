import React, { useState } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar";
import { Navigate, useNavigate } from "react-router-dom";
import { message } from "antd";
function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
 const Navigate = useNavigate();
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };
  const openAdmin = () => {
    Navigate("/ahotel", { replace: false });
  };
  const mainpage= () =>{
    Navigate('/hotel',{ replace: false })
  }
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginApiUrl = "https://localhost:44397/api/Login"; // Replace with your actual API endpoint for login

      const loginResponse = await axios.get(`https://localhost:44397/api/User/${loginData.email},${loginData.password}`);

      localStorage.setItem("user", JSON.stringify(loginResponse.data));
      console.log("Login successful:", loginResponse.data);
      if (loginData.email === "admin@gmail.com" && loginData.password === "Admin@123") {
        message.success("login successfully");
        openAdmin();
       
      } else {
        message.success("login successfully");
        mainpage();
        
        
      }
  

      // Handle successful login
    } catch (error) {
      message.error("login failed");
      console.error("Login failed:", error);
    }
  };

  return (
    <div style={{ background: "linear-gradient(to right, #4e54c8, #8f94fb)", minHeight: "100vh" }}>
      <Navbar />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card p-4" style={{ backgroundColor: "#f7f1e3" }}>
              <h2 className="text-center mb-4">Login</h2>
              <form onSubmit={handleLoginSubmit}>
                {/* Login Form */}
                <div className="mb-3">
                  <label htmlFor="loginEmail" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="loginEmail"
                    name="email"
                    value={loginData.email}
                    onChange={handleLoginChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="loginPassword" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="loginPassword"
                    name="password"
                    value={loginData.password}
                    onChange={handleLoginChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
