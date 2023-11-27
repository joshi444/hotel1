import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import { useParams } from 'react-router-dom';
import { message } from 'antd';

function BookingForm() {
  const { hotelid, roomid } = useParams();
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date());
  const [numberOfPeople, setNumberOfPeople] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingError, setBookingError] = useState(null);
  const user = localStorage.getItem('user');
  const userId = JSON.parse(user).userId;

  const handleSubmit = async (e) => {
    e.preventDefault();

    setBookingError(null);
    console.log(checkInDate);
    console.log(checkOutDate);
    console.log(numberOfPeople);

    try {
      const response = await axios.post('https://localhost:44397/api/Booking', {
        userId,
        roomid,
        hotelid,
        checkInDate,
        checkOutDate,
        noOfPeople: parseInt(numberOfPeople),
      });

      console.log('Booking successful:', response.data);
      message.success("Booking successful")
      // Additional logic after successful booking (e.g., redirect, display confirmation message)
    } catch (error) {
      setBookingError('Failed to book. Please try again.'); // Set a better error message based on the error response
      console.error('Booking failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Navbar/>
    <div style={{ background: '#6e43c4', color: '#fff', minHeight: '100vh', padding: '20px' }}>
     
      <div style={{ marginTop: '20px' }}> {/* Adjust the margin-top to create space */}
        <div className="card" style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
          <h2 className="card-title">Booking Form</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="checkInDate" className="form-label">Check-in Date:</label>
              <input
                type="date"
                id="checkInDate"
                name="checkInDate"
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="checkOutDate" className="form-label">Check-out Date:</label>
              <input
                type="date"
                id="checkOutDate"
                name="checkOutDate"
                value={checkOutDate}
                onChange={(e) => setCheckOutDate(e.target.value)}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="numberOfPeople" className="form-label">Number of People:</label>
              <input
                type="number"
                id="numberOfPeople"
                name="numberOfPeople"
                value={numberOfPeople}
                onChange={(e) => setNumberOfPeople(e.target.value)}
                className="form-control"
                required
              />
            </div>
            {bookingError && <p style={{ color: 'red' }}>{bookingError}</p>}
            <button type="submit" className="btn btn-primary">Book</button>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
}

export default BookingForm;
