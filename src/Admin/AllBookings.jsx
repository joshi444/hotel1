import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { message } from "antd";
import AdNavbar from "../Components/AdminNavbar";
import Navbar from "../Components/Navbar";
export default function ABooking() {
  const [data, setData] = useState([]);
  const [hotels, setHotels] = useState({});
  const [rooms, setRooms] = useState({});
  const [users, setUsers] = useState({});
  const Navigate = useNavigate();
  const user = localStorage.getItem('user')
  useEffect(() => {
    fetch("https://localhost:44397/api/Booking")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  const hotelIds = data.map((booking) => booking.hotelId);
  const roomIds = data.map((booking) => booking.roomId);
  const userIds = data.map((booking) => booking.userId);

  useEffect(() => {
    axios
      .get(`https://localhost:44397/api/Hotel?ids=${hotelIds.join(",")}`)
      .then((hotelResponse) => {
        const hotelData = hotelResponse.data.reduce((acc, hotel) => {
          acc[hotel.hotelId] = hotel;
          return acc;
        }, {});
        setHotels(hotelData);
      })
      .catch((error) => {
        console.error("Error fetching hotel data:", error);
      });

    axios
      .get(`https://localhost:44397/api/Room?ids=${roomIds.join(",")}`)
      .then((roomResponse) => {
        const roomData = roomResponse.data.reduce((acc, room) => {
          acc[room.roomId] = room;
          return acc;
        }, {});
        setRooms(roomData);
      })
      .catch((error) => {
        console.error("Error fetching room data:", error);
      });

    axios
      .get(`https://localhost:44397/api/User?ids=${userIds.join(",")}`)
      .then((userResponse) => {
        const userData = userResponse.data.reduce((acc, user) => {
          acc[user.userId] = user;
          return acc;
        }, {});
        setUsers(userData);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [hotelIds, roomIds, userIds]);

  const handleUpdate = (id, uid, rid, hid, cid) => {
    Navigate(
      `/adminupdatebooking/${id}/${uid}/${rid}/${hid}/${cid}`,
      { replace: false }
    );
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleDelete = (id, umail, name, room, hotel, cin, cout) => {
    if (window.confirm("Are you sure")) {
      axios
        .delete(`https://localhost:44397/api/Booking/${id}`)
        .then((result) => {
          if (result.status === 200) {
            message.success(`Booking ${id} is deleted`);
            arequest(umail, name, room, hotel, cin, cout, "booking cancelled");
          }
        })
        .catch((error) => {
          alert(error);
        });
    }
  };

  const arequest = async (umail,name,room,hotel,cin,cout,sub) => {
    try {
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: 'service_njlnn1m',
          template_id: 'template_5gr278q',
          user_id: 'eewg_aFnGSY-VV0Lj',
          template_params: {
            subject:sub,
            to_name:name,
            to_email: umail,
            message:"your booking for "+
             room +" room in hotel  "+ hotel+ " from "+ cin + " to " + cout + " is canceled by the bookmyroom for any queries contact the bookmyroom ",
            'g-recaptcha-response': '03AHJ_ASjnLA214KSNKFJAK12sfKASfehbmfd...',
          },
        }),
      });

      if (response.ok) {
      //  setStatus('success');
        message.success("email sent successfully");
      } else {
        const errorData = await response.json();
        //setStatus('error');
        message.error("Email sending failed: " + JSON.stringify(errorData))
        console.error(errorData);
      }
    } catch (error) {
     // setStatus('error');
      console.error(error);
    }
  };

  const crequest = async (umail,name,hname,rtype,sub) => {
    try {
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: 'service_njlnn1m',
          template_id: 'template_5gr278q',
          user_id: 'eewg_aFnGSY-VV0Lj',
          template_params: {
            subject:sub,
            to_name:name,
            to_email: umail,
            message:"your request for extened the check-out-date in the hotel "+hname+" room type "+rtype+" is rejected by the bookmyroom for any queries contact the bookmyroom",
            'g-recaptcha-response': '03AHJ_ASjnLA214KSNKFJAK12sfKASfehbmfd...',
          },
        }),
      });

      if (response.ok) {
      //  setStatus('success');
        message.success("email sent successfully");
      } else {
        const errorData = await response.json();
        //setStatus('error');
        message.error("Email sending failed: " + JSON.stringify(errorData))
        console.error(errorData);
      }
    } catch (error) {
     // setStatus('error');
      console.error(error);
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
    <div style={{ background: "#6e43c4", color: "#fff", minHeight: "100vh" }}>
      <AdNavbar />
      <div className="row" style={{ padding: "30px" }}>
        {data.map((item) => (
          <div className="col-md-3 mb-3" key={item.bookingId}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">
                  User: {users[item.userId]?.userName || "N/A"}
                </h5>
                <p className="card-text">
                  Room: {rooms[item.roomId]?.roomType || "N/A"}
                </p>
                <p className="card-text">
                  Hotel: {hotels[item.hotelId]?.hotelName || "N/A"}
                </p>
                <p className="card-text">
                  Check-In: {formatDate(item.checkInDate)}
                </p>
                <p className="card-text">
                  Check-Out: {formatDate(item.checkOutDate)}
                </p>
                <p className="card-text">No. of People: {item.noOfPeople}</p>
                <button
                  className="btn btn-danger"
                  onClick={() =>
                    handleDelete(
                      item.bookingId,
                      users[item.userId]?.email,
                      users[item.userId]?.userName,
                      rooms[item.roomId]?.roomType,
                      hotels[item.hotelId]?.hotelName,
                      formatDate(item.checkInDate),
                      formatDate(item.checkOutDate)
                    )
                  }
                >
                  Delete booking
                </button>
                <div className="mt-2">
                  <button
                    className="btn btn-primary"
                    onClick={() =>
                      handleUpdate(
                        item.bookingId,
                        item.userId,
                        item.roomId,
                        item.hotelId,
                        item.checkInDate
                      )
                    }
                  >
                    Update booking
                  </button>
                </div>
                <div className="mt-2">
                  <button
                    className="btn btn-primary"
                    onClick={() =>
                      crequest(
                        users[item.userId]?.email,
                        users[item.userId]?.userName,
                        hotels[item.hotelId]?.hotelName,
                        rooms[item.roomId]?.roomType,
                        "request rejected"
                      )
                    }
                  >
                    Cancel Request
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
