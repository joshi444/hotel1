import React, { Fragment, useState } from "react";
//import DatePicker from 'react-datepicker';
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import Navbar from "../Components/Navbar";
import AdNavbar from "../Components/AdminNavbar";
function Aupdate() {
   // /adminupdatebooking/:id/:uid/:rid/:hid/:cid
    const {id,uid,rid,hid,cid} = useParams();
    const [checkOutDate, setCheckOutDate] = useState(new Date());
    const [pass, setPass] = useState('');
    const[user,setUser] = useState({});
    const [dataa, setDataa] = useState([]);
    const [hotels, setHotels] = useState({});
    const [rooms, setRooms] = useState({});
    //const [users, setUsers] = useState({});
    //const id = JSON.parse(user).userId;


    
    const handleCheckOutDateChange = (value => {
        setCheckOutDate(value);
    })
    const handlepassChange = (value => {
        setPass(parseInt(value));
    })
    const Navigate = useNavigate();
    const handleBack=()=>{
        Navigate('/admin', { replace: false });
    }
     
    axios.get(`https://localhost:44397/api/User/${uid}`)
      .then((response) => {
        const userData = response.data;
        //console.log(userData)
        setUser(userData);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });

      axios.get(`https://localhost:44397/api/Hotel/${hid}`)
      .then((response) => {
        const userData = response.data;
        //console.log(userData)
        setHotels(userData);
      })
      .catch((error) => {
        console.error("Error fetching hotel data:", error);
      });

      axios.get(`https://localhost:44397/api/Room/${rid}`)
      .then((response) => {
        const userData = response.data;
        //console.log(userData)
        setRooms(userData);
      })
      .catch((error) => {
        console.error("Error fetching room data:", error);
      });
     // const roomIds = rooms.map((booking) => booking.roomId);
      const croom = rooms[rid]?.roomType
      console.log(croom)

    const hname = String(hotels.hotelName)
    console.log(hname)
     const umail = String(user.email);
    // const umail = String(user.email);
     const name = String(user.userName);
    // console.log(umail);
    const handleAdd = async () => {
        const data = {
            BookingId:id,
            UserId: uid,
            RoomId:rid,
            HotelId:hid,
            
            CheckInDate:cid,
            CheckOutDate:checkOutDate,
            NoOfPeople: pass,
          
        }
        console.log(data);


        axios.put('https://localhost:44397/api/Booking', data)
        .then(() => {
            message.success("booking details  updated");
            sendEmail("booking details  updated");
        })
        .catch((error) => {
            alert(error)
        })

    }
   


    const sendEmail = async (sub) => {
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
                message:"your request for extened the check-out-date is accepted and new  check-out-date is "+checkOutDate+
                "hotel"+hname +"enjoy your stay",
                'g-recaptcha-response': '03AHJ_ASjnLA214KSNKFJAK12sfKASfehbmfd...',
              },
            }),
          });
          
       

           if (response.ok) {
           // setStatus('success');
            message.success("email sent successfully");
           } else {
            const errorData = await response.json();
        //     //setStatus('error');
            message.error("Email sending failed: " + JSON.stringify(errorData))
            console.error(errorData);
         }
        }
         catch (error) {
         // setStatus('error');
          console.error(error);
        }
      };

    
    return (
        <div>
            <AdNavbar/>
        <section className="form_room ">
            <div className="bgimg">
            <div className="brdr" >
         
           

            <div className="form-group">
                <label><h6>CheckOutDate</h6></label>
                <input type="date" className="form-control" onChange={(e) => handleCheckOutDateChange(e.target.value)} /> <br></br>
            </div>

            <div className="form-group">
                <label><h6>Number of People</h6></label>
                <input type="text"name="pass" className="form-control" onChange={(e) => handlepassChange(e.target.value)} /> <br></br>
            </div>

    

            <button className='btn btn-primary' onClick={() => handleAdd()}>update</button>
            <br/>
           
            </div>
           
            </div>
        </section>
        </div>
    )
}

export default Aupdate;