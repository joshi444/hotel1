import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdNavbar from "../Components/AdminNavbar";

function AddHotel() {
  const [hotelName, setHotelName] = useState("");
  const [location, setLocation] = useState("");
  const [rating, setRating] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const Navigate = useNavigate();

  const handleNameChange = (value) => {
    setHotelName(value);
  };
  
  const handleLocationChange = (value) => {
    setLocation(value);
  };
  
  const handleRoomChange = (value) => {
    setRating(parseInt(value));
  };
  
  const handleImage = (value) => {
    setImageUrl(value)
  }

  const handleSave = () => {
    const data = {
      HotelName: hotelName,
      Location: location,
      Rating: rating,
      ImageUrl: imageUrl
    };

    axios
      .post("https://localhost:44397/api/Hotel", data)
      .then((result) => {
        alert("Hotel added successfully");
        // Redirect or navigate to another page after successful addition
        Navigate('/ahotel'); // Replace '/hotels' with your desired route
      })
      .catch((error) => {
        alert("An error occurred while adding the hotel");
      });
  };

  return (
    <>
      <AdNavbar />
      <div style={{ background: "#6e43c4", color: "#fff", minHeight: "100vh", padding: "20px" }}>
        <h2>Add Hotel</h2>
        <div className="form-group">
          <label htmlFor="HotelName">Hotel Name</label>
          <input
            type="text"
            name="HotelName"
            className="form-control"
            id="HotelName"
            placeholder="Enter the hotel Name"
            onChange={(e) => handleNameChange(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="Location">Location</label>
          <input
            type="text"
            name="Location"
            className="form-control"
            id="Location"
            placeholder="Enter the location"
            onChange={(e) => handleLocationChange(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="ImageUrl">Image URL</label>
          <input
            type="text"
            name="ImageUrl"
            className="form-control"
            id="ImageUrl"
            placeholder="Image URL"
            onChange={(e) => handleImage(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="Rating">Rating</label>
          <input
            type="text"
            name="Rating"
            className="form-control"
            id="Rating"
            placeholder="Enter rating"
            onChange={(e) => handleRoomChange(e.target.value)}
          />
        </div>
       <br></br>
        <button className="btn btn-primary" onClick={() => handleSave()}>
          Save
        </button>
      </div>
    </>
  );
}

export default AddHotel;
