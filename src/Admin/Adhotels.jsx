import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import "../Pages/Hotels.css"
import AdNavbar from "../Components/AdminNavbar";
import { useNavigate } from "react-router-dom";

function AHotels() {
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
const user = localStorage.getItem('user')
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
  const handleUpdate =(id) =>{
    navigate(`/aupdatehotel/${id}`,{ replace: false });
}
const handleAdd = () => {
    navigate('/addhotels', { replace: false });
};
const handleAddRoom = (hotelId) => {
  navigate(`/addrooms/${hotelId}`, { replace: false });
}
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this hotel?")) {
        axios.delete(`https://localhost:44397/api/Hotel/${id}`)
            .then((result) => {
                if (result.status === 200) {
                    alert(`Hotel ${id} is deleted successfully`);
                    // Optionally, you can remove the deleted item from the state.
                    // This will re-render the component without the deleted item.
                    setHotels((prevData) => prevData.filter((item) => item.hotelId !== id));
                }
            })
            .catch((error) => {
                alert(`Error deleting hotel ${id}: ${error.message}`);
            });
    }
};
if (!user) {
  return (
    <div>
      <Navbar />
      <div>Login to continue</div>
    </div>
  );
}

  return (
    <div>
        
    <div className="hotels-container" style={{ background: "#6e43c4", color: "#fff", minHeight: "100vh" }}>
    <AdNavbar/>
   
      <div className="container-fluid">
      <div className="row">
            <div className="col-lg-9 mt-5">
              <div className="d-flex justify-content-between align-items-center mb-3">
                
                <input
                  type="text"
                  placeholder="Search by location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="form-control mr-2" // Added margin to create space between elements
                  style={{ background: "#fff", color: "#000", width: "250px" }}
                />
                
                <button className="btn btn-primary" onClick={handleAdd}>
                  AddHotel
                </button>
              </div>
            
            <div className="row row-cols-1 row-cols-md-3 g-4">
              {filteredHotels.map((data, index) => (
                <div key={index} className={`col mb-4`}>
                  <div className={`card hotel-card ${selectedHotel === data.hotelId ? 'selected-card' : ''}`} onClick={() => handleHotelSelect(data.hotelId)}>
                    <img src={data.imageUrl} className="card-img-top" alt="Hotel" style={{ height: "200px", objectFit: "cover" }} />
                    <div className="card-body">
                      <h5 className="card-title">Name: {data.hotelName}</h5>
                      <p className="card-text">Location: {data.location}</p>
                      <p className="card-text">Rating: {data.rating}</p>
                      <Link to={`/arooms/${data.hotelId}`} className="btn btn-primary">
                        Rooms
                      </Link>
                      
                      <button className="btn btn-primary ml-auto" onClick={() => handleAddRoom(data.hotelId)}>Add Room</button>
                      <div>
                      <br></br>
                            <button className="btn btn-danger" onClick={() => handleDelete(data.hotelId)}>
                                Delete
                            </button>
                            </div>
                            <br></br>
                            <button
                    className="btn btn-primary"
                    onClick={() =>
                      handleUpdate(
                        data.hotelId
                      )
                    }
                  >
                    Update
                  </button>
            
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default AHotels;
