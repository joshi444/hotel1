// Navbar.js

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faSignOutAlt, faAddressBook } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import {useDispatch,useSelector} from "react-redux"

import { authactions } from "../Store";
function Navbar() {
  const user = JSON.parse(localStorage.getItem('user'));

// const user = useSelector(state => state.isauthenticated)
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const mainpage = () => {
    Navigate("/login", { replace: false });
  };
  const handleLogout = () => {
    dispatch(authactions.logout())
    localStorage.removeItem('user');
    mainpage();
    window.location.reload();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{ height: "80px" }}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">BookMyRoom</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/hotel">Hotels</Link>
            </li>
            {user && (
              <>
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/userprofile">My Profile</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/userbooking">My Booking</Link>
                </li>
                <li className="nav-item">
                  <button className="nav-link" onClick={handleLogout}>
                    <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                  </button>
                </li>
              </>
            )}
          </ul>
          <ul className="navbar-nav">
            {!user && (
              <>
                <li className="nav-item">
                  <Link className="nav-link active" to="/register">
                    <FontAwesomeIcon icon={faAddressBook} /> Register
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" to="/login">
                    <FontAwesomeIcon icon={faSignInAlt} /> Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
