import React, { useState, useEffect } from "react";
import axios from "axios";
import AdNavbar from "../Components/AdminNavbar";
import { useParams } from "react-router-dom";

function AUpdateHotel() {
    const [hotelName, setHotelName] = useState('');
    const [location, setLocation] = useState('');
    const [rating, setRating] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const { hotelId } = useParams();

    useEffect(() => {
        axios
            .get(`https://localhost:44397/api/Hotel/${hotelId}`)
            .then((response) => {
                const hotelData = response.data;
                if (hotelData) {
                    const { HotelName, Location, Rating, ImageUrl } = hotelData;
                    setHotelName(HotelName || '');
                    setLocation(Location || '');
                    setRating(Rating !== null ? Rating.toString() : '');
                    setImageUrl(ImageUrl || '');
                } else {
                    console.error(`Hotel with ID ${hotelId} not found`);
                }
            })
            .catch((error) => {
                console.error("Error fetching hotel data: ", error);
            });
    }, [hotelId]);

    const handleNameChange = (value) => {
        setHotelName(value);
    };

    const handleLocationChange = (value) => {
        setLocation(value);
    };

    const handleRatingChange = (value) => {
        setRating(value);
    };

    const handleImageUrlChange = (value) => {
        setImageUrl(value);
    };

    const handleSave = () => {
        const data = {
            HotelId: hotelId,
            HotelName: hotelName,
            Location: location,
            Rating: parseInt(rating),
            ImageUrl: imageUrl
        };

        axios.put(`https://localhost:44397/api/Hotel`, data)
            .then(() => {
                alert("Hotel updated");
                
            })
            .catch((error) => {
                alert("Error updating hotel: " + error);
            });
    };

    return (
        <div>
            <AdNavbar/>
        <div style={{ background: "#6e43c4", color: "#fff", minHeight: "100vh", padding: "20px" }}>
            
            <h2>Update Hotel</h2>
            <div className="form-group">
                <label>Hotel Name</label>
                <input
                    type="text"
                    name="HotelName"
                    className="form-control"
                    placeholder="Enter the hotel Name"
                    value={hotelName}
                    onChange={(e) => handleNameChange(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Location</label>
                <input
                    type="text"
                    name="Location"
                    className="form-control"
                    placeholder="Enter the location"
                    value={location}
                    onChange={(e) => handleLocationChange(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Rating</label>
                <input
                    type="text"
                    name="Rating"
                    className="form-control"
                    placeholder="Enter rating"
                    value={rating}
                    onChange={(e) => handleRatingChange(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>ImageUrl</label>
                <input
                    type="text"
                    name="ImageUrl"
                    className="form-control"
                    placeholder="Enter image URL"
                    value={imageUrl}
                    onChange={(e) => handleImageUrlChange(e.target.value)}
                />
            </div>
            <button className="btn btn-primary" onClick={handleSave}>
                Save
            </button>
        </div>
        </div>
    );
}

export default AUpdateHotel;
