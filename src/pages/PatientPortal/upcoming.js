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


import Counter from "./counter"
import Peer from "simple-peer";
import io from "socket.io-client";
import Swal from "sweetalert2";

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
        .get(`${SERVER_URL}/patient/${id}/upcoming`, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        })
        .then((resp) => {
          console.log(resp.data);
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
  const handleSubmit = async (event) => {
    event.preventDefault();

  };




  return (
      <div style={{ width: "90%" }}>
        <h1 style={{marginBottom : "50px",marginTop : "40px" }}>
          Hey <span style={{ color: "#655D8A" }}>{name}</span> ,Welcome
          Back!
        </h1>


        {data && <MDBCard>
          <MDBCardHeader>Upcoming Appointment</MDBCardHeader>
          <MDBCardBody>


            <div className="row">
              <div className="col-5">



                { data.length > 0 &&  <div className="d-flex text-black">
                  <div className="flex-shrink-0" style={{paddingRight:"4%"}}>
                    <MDBCardImage
                        style={{ width: '180px', borderRadius: '10px' }}
                        src={data[0].profilePic}
                        alt='Generic placeholder image'
                        fluid />
                  </div>
                  <div className="flex-grow-1 ms-3">
                    {data.length > 0 ? <MDBCardTitle>Dr.{data[0].name} ({data[0].spec}) </MDBCardTitle> : <></>}
                    <MDBCardText>{data[0].qualification} <br/> {data[0].exp} yrs</MDBCardText>


                    <div className="d-flex justify-content-start rounded-3  mb-2">

                      <span className="badge rounded-pill badge-success">scheduled</span>
                    </div>
                    <div className="d-flex pt-1">
                      <button type="button" onClick={handleSubmit} className="btn btn-outline-primary">Join Call</button>


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





            {/*<MDBCardText>{data[0].time}</MDBCardText>*/}

          </MDBCardBody>
        </MDBCard> }

          <br/>
          <br/>
        <MDBTable align="middle">
          <MDBTableHead>
            <tr>
              <th scope="col">Doctor's Name</th>
              <th scope="col">Specialist</th>
              <th scope="col">Time</th>
              <th scope="col">Status</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {data?.map((appointment,indx) => {
              return (
                  <tr key={indx}>
                    <td>
                      <div className="ms-3">
                        <p
                            className="fw-bold mb-1"
                            style={{ fontWeight: "600", color: "black" }}
                        >
                          Dr.{appointment.name}
                        </p>
                      </div>
                    </td>
                    <td>
                      <div className="ms-3">
                        <p
                            className="fw-bold mb-1"
                            style={{ fontWeight: "600", color: "black" }}
                        >
                          {appointment.spec}
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
                      >
                        Consult now
                      </button>
                    </td>
                  </tr>
              );
            })}
          </MDBTableBody>
        </MDBTable>
      </div>
  );
}