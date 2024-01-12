import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import "./Hotels.css";

function Hotels() {
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios
      .get("https://localhost:44397/api/Hotel")
      .then((response) => {
        setHotels(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleHotelSelect = (hotelId) => {
    setSelectedHotel(hotelId === selectedHotel ? null : hotelId);
  };

  const filteredHotels = hotels.filter((hotel) =>
    hotel.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="hotels-container" style={{ background: "#6e43c4", color: "#fff", minHeight: "100vh" }}>
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-1 mt-5">
          </div>
          <div className="col-lg-10 mt-5">
            <input
              type="text"
              placeholder="Search by location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-control mb-3 search-bar" // Added a class for styling
              style={{ background: "#fff", color: "#000", width: "200px" }} // Adjusted width here
            />


            <div className="row row-cols-1 row-cols-md-3 g-4">
              {filteredHotels.map((data, index) => (
                <div key={index} className={`col mb-4`}>
                  <div className={`card hotel-card ${selectedHotel === data.hotelId ? 'selected-card' : ''}`} onClick={() => handleHotelSelect(data.hotelId)}>
                    <img src={data.imageUrl} className="card-img-top" alt="Hotel" style={{ height: "200px", objectFit: "cover" }} />
                    <div className="card-body">
                      <h5 className="card-title">Name: {data.hotelName}</h5>
                      <p className="card-text">Location: {data.location}</p>
                      <p className="card-text">Rating: {data.rating}</p>
                      <Link to={`/rooms/${data.hotelId}`} className="btn btn-primary">
                        Rooms
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>


          </div>
          <div className="col-lg-1 mt-5">
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hotels;
