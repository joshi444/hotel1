import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import AdNavbar from "../Components/AdminNavbar";

function AddRoom() {
    const [roomType, setRoomType] = useState('');
    const [price, setPrice] = useState('');
    const [availableRooms, setAvailableRooms] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const { hotelId } = useParams();
    const Navigate = useNavigate();

    const handleTypeChange = (value) => {
        setRoomType(value);
    };

    const handlePriceChange = (value) => {
        setPrice(parseFloat(value));
    };

    const handleImageChange = (value) => {
        setImageUrl(value);
    };

    const handleAvailChange = (value) => {
        setAvailableRooms(parseInt(value));
    };

    const handleSave = () => {
        const data = {
            HotelId: hotelId,
            RoomType: roomType,
            Price: price,
            AvalaibleRooms: availableRooms,
            ImageUrl: imageUrl
        };

        axios.post('https://localhost:44397/api/Room', data)
            .then((result) => {
                alert("Room added successfully");
               
            })
            .catch((error) => {
                alert("An error occurred while adding the room");
            });
    };

    return (
        <div>
            <AdNavbar/>
        <div style={{ background: "#6e43c4", color: "#fff", minHeight: "100vh", padding: "20px" }}>
            <h2>Add Room</h2>

            <div className="form-group">
                <label htmlFor="RoomType">Room Type</label>
                <input
                    type="text"
                    name="RoomType"
                    className="form-control"
                    id="RoomType"
                    placeholder="Enter the room type"
                    onChange={(e) => handleTypeChange(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label htmlFor="Price">Price</label>
                <input
                    type="text"
                    name="Price"
                    className="form-control"
                    id="Price"
                    placeholder="Enter the price"
                    onChange={(e) => handlePriceChange(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label htmlFor="AvailableRooms">Available Rooms</label>
                <input
                    type="text"
                    name="AvailableRooms"
                    className="form-control"
                    id="AvailableRooms"
                    placeholder="Enter the available rooms"
                    onChange={(e) => handleAvailChange(e.target.value)}
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
                    onChange={(e) => handleImageChange(e.target.value)}
                />
            </div>

            <button className="btn btn-primary" onClick={() => handleSave()}>Save</button>
        </div>
        </div>
    );
}

export default AddRoom;
