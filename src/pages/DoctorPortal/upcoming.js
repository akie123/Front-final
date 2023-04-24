
import { useEffect, useState,useRef } from "react";
import axios from "axios";
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { SERVER_URL } from "../../constants";
import {
    MDBTable,
    MDBTableHead,
    MDBTableBody,
    MDBCard,
    MDBCardHeader,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBBtn,
    MDBCardImage,
    MDBTypography
} from "mdb-react-ui-kit";
import Peer from "simple-peer"
import Counter from "./../PatientPortal/counter"
import io from "socket.io-client"
import Swal from "sweetalert2";
import {userSchema} from "../../Validations/firstP";
const socket = io.connect('http://localhost:2500')
const minuteSeconds = 60;
const hourSeconds = 3600;
const daySeconds = 86400;

const renderTime = (dimension, time) => {
    return (
        <div className="time-wrapper">
            <div className="time">{time}</div>
            <div>{dimension}</div>
        </div>
    );
};

export default function Upcoming({Sid}) {

    const [data,setData] = useState([])
    const [name,setName] = useState("")
    const [remainingTime,setremainingTime] = useState(null)
    const [f1,setF1]= useState(1)
    const [f2,setF2]= useState(2)
    const [f3,setF3]= useState(3)

    function timeDiff(str) {
        let currentTime = new Date();

        let currentOffset = currentTime.getTimezoneOffset();

        let ISTOffset = 330; // IST offset UTC +5:30

        let ISTTime = new Date(
            currentTime.getTime() + (ISTOffset + currentOffset) * 60000
        );



        let hoursIST = ISTTime.getHours();
        let minutesIST = ISTTime.getMinutes();
        let hours = str.substring(0,2)
        let minutes = str.substring(3,5)
        console.log(hours-hoursIST)
        console.log(minutes-minutesIST)
        let num = hours-hoursIST
        num *= 60
        let num1 = minutes-minutesIST
        return (num+num1)*60



    }





    useEffect(() => {

        const { id, jwtToken } = JSON.parse(localStorage.getItem("items"));
        axios
            .get(`${SERVER_URL}/doctor/${id}/upcoming`, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            })
            .then((resp) => {

                setData(resp.data.upcoming)
                setremainingTime(timeDiff(resp.data.upcoming[0].time))
                setName(resp.data.name)

            });
    },[])

    const timerProps = {
        isPlaying: true,
        size: 120,
        strokeWidth: 6
    };



    return (
        <div style={{ width: "90%" }}>
            <h2 style={{marginBottom : "50px",marginTop : "40px" }}>
                Hey <span style={{ color: "#655D8A" }}>{name}</span> ,Welcome
                Back!
            </h2>



            {data && <MDBCard>
                <MDBCardHeader>Upcoming Appointment</MDBCardHeader>
                <MDBCardBody>


                    <div className="row">
                        <div className="col-5">
                            {/*<MDBCardTitle>Dr.{data[0].name} ({data[0].spec}) </MDBCardTitle>*/}


                            { data.length> 0 && <div className="d-flex text-black">
                                <div className="flex-shrink-0" style={{paddingRight:"4%"}}>
                                    <MDBCardImage
                                        style={{ width: '180px', borderRadius: '10px' }}
                                        src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp'
                                        alt='Generic placeholder image'
                                        fluid />
                                </div>
                                <div className="flex-grow-1 ms-3">
                                    <MDBCardTitle>{data[0].name}({data[0].gender})  </MDBCardTitle>

                                    <div className="d-flex justify-content-start rounded-3  mb-2">

                                        <span className="badge rounded-pill badge-success">scheduled</span>
                                    </div>
                                    <div className="d-flex pt-1">
                                        <button type="button"  className="btn btn-outline-primary">Join Call</button>
                                        {/*<MDBBtn outline onClick={handleSubmit} className="me-1 flex-grow-1">Join Call</MDBBtn>*/}

                                    </div>
                                </div>
                            </div>}
                        </div>
                        {<div className="col-6">
                            <div  style={{textAlign:'center',padding:"2%"}}><MDBTypography tag='div' className='display-5 pb-3 mb-3 border-bottom'>
                                Your appointment in
                            </MDBTypography></div>
                            {remainingTime!=null && < Counter remainingTime={remainingTime} setF1={setF1} setF2={setF2} setF3={setF3}/>}
                        </div>}



                    </div>


                </MDBCardBody>
            </MDBCard> }

            <br/>
            <br/>
            <MDBTable align="middle">
                <MDBTableHead>
                    <tr>
                        <th scope="col">Patient's Name</th>
                        <th scope="col">Time</th>
                        <th scope="col">Status</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    {data?.map((appointment) => {
                        return (
                            <tr key={appointment.id}>
                                <td>
                                    <div className="ms-3">
                                        <p
                                            className="fw-bold mb-1"
                                            style={{ fontWeight: "600", color: "black" }}
                                        >
                                            {appointment.name}
                                        </p>
                                    </div>
                                </td>
                                <td>
                                    <p
                                        className="fw-formal mb-1"
                                        style={{ fontWeight: "450", color: "black" }}
                                    >
                                        {appointment.time}
                                    </p>
                                </td>
                                <td>
                                    <button
                                        style={{
                                            outline: "none",
                                            border: "0px",
                                            padding: "0.6rem",
                                            borderRadius: "8px",
                                            cursor: "pointer",
                                        }}
                                    >Consult now</button>
                                </td>
                            </tr>
                        );
                    })}
                </MDBTableBody>
            </MDBTable>
        </div>
    );
}