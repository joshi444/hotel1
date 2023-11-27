// Rooms.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar";
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import './Rooms.css'; // Import the CSS file for styling

function Rooms(props) {
  const [rooms, setRooms] = useState([]);
  const [userData, setUserData] = useState(null);
  const { hotelId } = useParams();

  useEffect(() => {
    axios
      .get(`https://localhost:44397/api/Room/${hotelId}`)
      .then((response) => {
        setRooms(response.data);
      })
      .catch((error) => console.log(error));

    const storedUserData = JSON.parse(localStorage.getItem('user'));
    setUserData(storedUserData);
  }, [hotelId]);

  return (
    <div className="rooms-container">
      <Navbar />
      <div className="mt-5 pt-5">
        <div className="container">
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {rooms.map((data, index) => (
              <div key={index} className="col">
                <div className="card h-100 room-card">
                  <img src={data.imageUrl} className="card-img-top" alt="Room" style={{ height: "200px", objectFit: "cover" }} />
                  <div className="card-body">
                    <h5 className="card-title">Type: {data.roomType}</h5>
                    <p className="card-text">Price: {data.price}</p>
                    <p className="card-text">Available Rooms: {data.avalaibleRooms}</p>
                    {userData ? (
                      <Link to={`/booking/${hotelId}/${data.roomId}`} className="btn btn-primary">
                        Book
                      </Link>
                    ) : (
                      <Link to="/login" className="btn btn-primary">
                        Login to Book
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Rooms;
