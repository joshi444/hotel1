
import './App.css';
import Navbar from './Components/Navbar';
import Hotels from './Pages/Hotels';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Home from './Pages/Homepage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Rooms from './Pages/Rooms';
import BookingForm from './Pages/Booking';
import UserBooking from './Pages/UserBookings';
import UserProfile from './Pages/UserProfile';
import AHotels from './Admin/Adhotels';
import AddHotel from './Admin/AddHotel';
import AUpdateHotel from './Admin/AUpdateHotel';
import ARooms from './Admin/Adminrooms';
import AddRoom from './Admin/Addroom';
import ABooking from './Admin/AllBookings';
import Aupdate from './Admin/UpdateBooking';
import AUsers from './Admin/AllUsers';
import AUroom from './Admin/AupdateRoom';
function App() {
  const user = localStorage.getItem("user");
  return (
    <div className="App">
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="/register" element={<Register/>} />

        <Route path="/login" element={<Login/>} />
       <Route path="/hotel" element ={<Hotels/>} />
       <Route path='/rooms/:hotelId' element ={<Rooms/>} />
       <Route path='/booking/:hotelid/:roomid' element ={<BookingForm/>} />
       <Route path="/userbooking" element={<UserBooking/>} />
       <Route path='/userProfile' element={<UserProfile/>} />

        <Route path="/ahotel" element ={<AHotels/>} />
        <Route path="/addhotels" element ={<AddHotel/>} />
        <Route  path="/aupdatehotel/:hotelId" element={<AUpdateHotel/>}></Route>
        <Route  path="/arooms/:hotelId" element={<ARooms/>}></Route>
        <Route  path="/addrooms/:hotelId" element={<AddRoom/>}></Route>
        <Route  path="/allbookings" element={<ABooking/>}></Route>
        <Route  path="/adminupdatebooking/:id/:uid/:rid/:hid/:cid" element={<Aupdate/>}></Route>
        <Route  path="/allusers" element={<AUsers/>}></Route>
        <Route  path="/auroom/:hotelId/:roomId" element={<AUroom/>}></Route>
    
      </Routes>
      
    </Router>
    </div>
  );
}

export default App;
