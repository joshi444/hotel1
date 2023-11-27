import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdNavbar from "../Components/AdminNavbar";

export default function AUsers() {
  const [data, setData] = useState([]);
  const Navigate = useNavigate();

  useEffect(() => {
    fetch("https://localhost:44397/api/User")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure")) {
      axios
        .delete(`https://localhost:44397/api/User/${id}`)
        .then((result) => {
          if (result.status === 200) {
            alert(`User with ID ${id} is deleted`);
            window.location.reload(); // Reloading the page after deletion
          }
        })
        .catch((error) => {
          alert(error);
        });
    }
  };

  return (
    <div>
        <AdNavbar/>
    <div style={{ background: "#6e43c4", color: "#fff", minHeight: "100vh", padding: "20px" }}>
      
      <div style={{ marginTop: "20px" }}>
        <table className="table table-bordered table-striped">
          <thead className="textc">
            <tr>
              <th>UserName</th>
              <th>Email</th>
             
              <th>ContactNo</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.userId} className="textc">
                <td>{item.userName}</td>
                <td>{item.email}</td>
                
                <td>{item.contactNo}</td>
                <td>
                  <button className="btn btn-primary" onClick={() => handleDelete(item.userId)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
}
