import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import axios from "axios";
import { message } from "antd";
import jsPDF from "jspdf";

function UserBooking() {
  const user = localStorage.getItem("user");
  const user1 = JSON.parse(user);
  const id = JSON.parse(user).userId;
  const [bookings, setBookings] = useState([]);
  const [hotels, setHotels] = useState({});
  const [rooms, setRooms] = useState({});

  useEffect(() => {
    axios.get(`https://localhost:44397/api/Booking/${id}`)
      .then((response) => {
        const bookingData = response.data;
        setBookings(bookingData);

        const hotelIds = bookingData.map((booking) => booking.hotelId);
        const roomIds = bookingData.map((booking) => booking.roomId);

        axios.get(`https://localhost:44397/api/Hotel?ids=${hotelIds.join(",")}`)
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

        axios.get(`https://localhost:44397/api/Room?ids=${roomIds.join(",")}`)
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
      })
      .catch((error) => {
        console.error("Error fetching booking data:", error);
      });
  }, [id]);

  const calculateNumberOfDays = (checkInDate, checkOutDate) => {
    const startDate = new Date(checkInDate);
    const endDate = new Date(checkOutDate);
    const timeDifference = endDate.getTime() - startDate.getTime();
    const numberOfDays = Math.ceil(timeDifference / (1000 * 3600 * 24));
    return numberOfDays;
  };

  const calculateTotalCost = (booking) => {
    const numberOfDays = calculateNumberOfDays(booking.checkInDate, booking.checkOutDate);
    return numberOfDays * booking.costPerNight;
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      axios.delete(`https://localhost:44397/api/Booking/${id}`)
        .then((result) => {
          if (result.status === 200) {
            message.success(`Booking cancelled successfully`);
          }
        })
        .catch((error) => {
          message.error(error);
        });
    }
    window.location.reload();
  };

  const downloadBill = (booking) => {
    // Code to generate and download bill
    // ... (code for generating PDF)
    try {
        // Create a new jsPDF instance
        const pdf = new jsPDF();
    
        // Set font and text size
        pdf.setFont("Helvetica");
        pdf.setFontSize(12);
    
        // Add a header with your company name
        pdf.text("Your Company Name", 105, 15, "center");
    
        // Add a border and background color to the header
        pdf.setDrawColor(0);
        pdf.setFillColor(200, 200, 200);
        pdf.rect(10, 10, 190, 10, "F");
    
        // Add content to the PDF
        pdf.text("Invoice", 10, 30);
        pdf.text(`Booking ID: ${booking.bookingId}`, 10, 40);
        pdf.text(`Room Type: ${rooms[booking.roomId]?.roomType || "N/A"}`, 10, 50);
        pdf.text(`Hotel Name: ${hotels[booking.hotelId]?.hotelName || "N/A"}`, 10, 60);
        pdf.text(`Location: ${hotels[booking.hotelId]?.location || "N/A"}`, 10, 70);
        pdf.text(`Check-In Date: ${formatDate(booking.checkInDate)}`, 10, 80);
        pdf.text(`Check-Out Date: ${formatDate(booking.checkOutDate)}`, 10, 90);
        pdf.text(`No of People: ${booking.noOfPeople}`, 10, 100);
    
        const numberOfDays = calculateNumberOfDays(booking.checkInDate, booking.checkOutDate);
        pdf.text(`No of Days: ${numberOfDays} day(s)`, 10, 110);
        pdf.text(`Cost per day: ${rooms[booking.roomId]?.price.toFixed(2) || "N/A"}`, 10, 120);
    
        // Calculate and display the total cost (assuming you have cost data)
        const totalCost = numberOfDays * rooms[booking.roomId]?.price;
        pdf.text(`Total Cost: ${totalCost.toFixed(2)}`, 10, 130);
    
        // Add a footer with the page number
        const pageCount = pdf.internal.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
          pdf.setPage(i);
          pdf.text(`Page ${i} of ${pageCount}`, 190, pdf.internal.pageSize.height - 10);
        }
    
        // Save the PDF as a file with a specified filename
        pdf.save(`bill_${booking.bookingId}.pdf`);
      } catch (error) {
        console.error("Error generating or downloading the bill:", error);
      }
  };

  return (
    <div style={{ background: "#6e43c4", color: "#fff", minHeight: "100vh" }}>
      <Navbar />
      <br></br>
      <div className="tbhead">
        <table className="table table-striped ">
          <thead className="tbl">
            <tr>
              <th scope="col">Room Type</th>
              <th scope="col">Hotel Name</th>
              <th scope="col">Check-In Date</th>
              <th scope="col">Check-Out Date</th>
              <th scope="col">No of People</th>
              <th scope="col">Cost per day</th>
              <th scope="col">Download Bill</th>
              <th scope="col">Cancel</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={index}>
                <td>{rooms[booking.roomId]?.roomType || "N/A"}</td>
                <td>{hotels[booking.hotelId]?.hotelName || "N/A"}</td>
                <td>{formatDate(booking.checkInDate)}</td>
                <td>{formatDate(booking.checkOutDate)}</td>
                <td>{booking.noOfPeople}</td>
                <td>{rooms[booking.roomId]?.price || "N/A"}</td>
                <td>
                  <button className="btn btn-primary" onClick={() => downloadBill(booking)}>
                    Download Bill
                  </button>
                </td>
                <td>
                  <button className="btn btn-danger" onClick={() => handleDelete(booking.bookingId)}>
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserBooking;
