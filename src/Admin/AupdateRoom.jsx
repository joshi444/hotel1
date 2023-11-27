import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import AdNavbar from "../Components/AdminNavbar";

function AUroom() {
    const [roomType, setRoomType] = useState('');
    const [price, setPrice] = useState('');
    const [availableRooms, setAvailableRooms] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const { hotelId, roomId } = useParams();
    const Navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`https://localhost:44397/api/Room/${roomId}`)
            .then((response) => {
                const roomData = response.data;
                if (roomData) {
                    const { RoomType, Price, AvailableRooms, ImageUrl } = roomData;
                    setRoomType(RoomType || '');
                    setPrice(Price !== null ? Price.toString() : '');
                    setAvailableRooms(AvailableRooms !== null ? AvailableRooms.toString() : '');
                    setImageUrl(ImageUrl || '');
                } else {
                    console.error(`Room with ID ${roomId} not found`);
                }
            })
            .catch((error) => {
                console.error("Error fetching room data: ", error);
            });
    }, [hotelId, roomId]);

    const handleTypeChange = (value) => {
        setRoomType(value);
    };

    const handlePriceChange = (value) => {
        setPrice(value);
    };

    const handleAvailChange = (value) => {
        setAvailableRooms(value);
    };

    const handleImageChange = (value) => {
        setImageUrl(value);
    };

    const handleSave = () => {
        const data = {
            HotelId: hotelId,
            RoomId: roomId,
            RoomType: roomType,
            Price: parseFloat(price),
            avalaibleRooms : parseInt(availableRooms),
            ImageUrl: imageUrl
        };

        axios.put('https://localhost:44397/api/Room', data)
            .then((result) => {
                alert("room  updated");
            

            }).catch((error) => {
                alert(error)
            })
    };

    return (
        <div>
            <AdNavbar/>
        <div style={{ background: "#6e43c4", color: "#fff", minHeight: "100vh", padding: "20px" }}>
            
            <h2>Update Room</h2>
            <div className="form-group">
                <label>Room Type</label>
                <input
                    type="text"
                    name="RoomType"
                    className="form-control"
                    placeholder="Enter the room type"
                    value={roomType}
                    onChange={(e) => handleTypeChange(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Price</label>
                <input
                    type="text"
                    name="Price"
                    className="form-control"
                    placeholder="Enter the price"
                    value={price}
                    onChange={(e) => handlePriceChange(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Available Rooms</label>
                <input
                    type="text"
                    name="AvailableRooms"
                    className="form-control"
                    placeholder="Enter the available rooms"
                    value={availableRooms}
                    onChange={(e) => handleAvailChange(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Image URL</label>
                <input
                    type="text"
                    name="ImageUrl"
                    className="form-control"
                    placeholder="Enter image URL"
                    value={imageUrl}
                    onChange={(e) => handleImageChange(e.target.value)}
                />
            </div>
            <br></br>
            <button className="btn btn-primary" onClick={handleSave}>
                Save
            </button>
        </div>
        </div>
    );
}

export default AUroom;
