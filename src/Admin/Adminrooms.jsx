import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar";
import { useParams } from 'react-router-dom';
import '../Pages/Rooms.css'; // Import the CSS file for styling
import AdNavbar from "../Components/AdminNavbar";
import { useNavigate } from "react-router-dom";

function ARooms(props) {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();
  
  const { hotelId } = useParams();

  useEffect(() => {
    axios
      .get(`https://localhost:44397/api/Room/${hotelId}`)
      .then((response) => {
        setRooms(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleUpdate = (hotelId, roomId) => {
    navigate(`/auroom/${hotelId}/${roomId}`, { replace: false });
  }

  const handleAdd = (hotelId) => {
    navigate(`/addrooms/${hotelId}`, { replace: false });
  }

  const handleDelete = (id) => {
    if (window.confirm("Are you sure")) {
      axios.delete(`https://localhost:44397/api/Room/${id}`)
        .then((result) => {
          if (result.status === 200) {
            alert(`Room ${id} is deleted`);
            window.location.reload();
            // After successful deletion, you might want to refresh the room list.
            // You can do this by fetching the data again or using a state management library.
          }
        })
        .catch((error) => {
          alert(error);
        });
    }
  }

  return (
    <div className="rooms-container">
      <AdNavbar />
      <div className="mt-5 pt-5 container">
      
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {rooms.map((data, index) => (
            <div key={index} className="col">
              <div className="card h-100 room-card">
                <img src={data.imageUrl} className="card-img-top" alt="Room" style={{ height: "200px", objectFit: "cover" }} />
                <div className="card-body">
                  <h5 className="card-title">Type: {data.roomType}</h5>
                  <p className="card-text">Price: {data.price}</p>
                  <p className="card-text">Available Rooms: {data.avalaibleRooms}</p>
                  <button className="btn btn-danger" onClick={() => handleDelete(data.roomId)}>Delete</button>
                  <div>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleUpdate(hotelId, data.roomId)}
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ARooms;
