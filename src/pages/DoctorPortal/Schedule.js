import {useContext, useEffect, useState} from "react";
import {SERVER_URL} from "../../constants"
import {
  MDBBadge,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import axios from "axios";

import Swal from "sweetalert2"

export default function Schedule(){

    const [data,setData]=useState([])
    function helperfun() {

        const { id, jwtToken } = JSON.parse(localStorage.getItem("items"));

        axios.get(`${SERVER_URL}/doctor/${id}/getschedule`,{
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            }})
            .then((res) => {
                setData(res.data.array.appointment);
            });
    }
    useEffect(() => {
        helperfun();
    },[])

    const select = (avb,time) => {

        const { id, jwtToken } = JSON.parse(localStorage.getItem("items"));
      if(avb === false){

          for (let i = 0; i < data.length; i++) {
              if (data[i].time == time) {
                  if(data[i].patientId!="")
                  {
                      Swal.fire({
                          title: "Failed",
                          text: "Patient have already booking for particular slot,please cancel appointment and edit slot",
                          icon: "error",
                      });
                      break;
                  }
                  let arr=[...data]
                  arr[i].avb=true
                  setData(arr);
                  axios.post(`${SERVER_URL}/doctor/${id}/updateschedule`,data,{
                      headers: {
                          Authorization: `Bearer ${jwtToken}`,
                      }})
                      .then((res) => {
                          console.log("success")

                      }).catch((err)=>{
                      console.log(err)
                      let arr=[...data]
                      arr[i].avb=false
                      setData(arr);

                  })
                  break;
              }
          }
      }
      else{
          for (let i = 0; i < data.length; i++) {
              if (data[i].time == time) {
                  if(data[i].patientId!="")
                  {
                      Swal.fire({
                          title: "Failed",
                          text: "Patient have already booking for particular slot,please cancel appointment and edit slot",
                          icon: "error",
                      });
                      break;
                  }
                  let arr=[...data]
                  arr[i].avb=false
                  setData(arr);
                  axios.post(`http://localhost:5000/doctor/${id}/updateschedule`,data,{
                      headers: {
                          Authorization: `Bearer ${jwtToken}`,
                      }})
                      .then((res) => {
                          console.log("success")

                      }).catch((err)=>{
                      console.log(err)
                      let arr=[...data]
                      arr[i].avb=true
                      setData(arr);

                  })
                  break;
              }
          }
      }

    }


    return (
      <div style={{ width: "90%" }}>
        <h1 style={{ marginBottom: "40px", marginTop: "40px",marginLeft : "4%" }}>
          Scheduler Manager
        </h1>
        <div style={{paddingRight : "10%",marginLeft : "4%"}}>
          <MDBTable align="middle">
            <MDBTableHead>
              <tr>
                <th scope="col">Time Slot</th>
                <th scope="col">Status</th>
                <th scope="col">Add/Delete Slot</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
                {data && data.map((sch) => {
                        return (
                            <tr >
                                <td>
                                    <div className="ms-3">
                                        <p
                                            className="fw-bold mb-1"
                                            style={{ fontWeight: "450", color: "black" }}
                                        >
                                            {sch.time}
                                        </p>
                                    </div>
                                </td>
                                <td>
                                    <p
                                        className="fw-formal mb-1"
                                        style={{ fontWeight: "450", color: "black" }}
                                    >
                                        {sch.avb === true
                                            ? "Available"
                                            : "Not Available"}
                                    </p>
                                </td>
                                <td>
                                    <div style={{ marginLeft: "10%" }}>
                                        <button
                                            className={`btn btn-${
                                                sch.avb === true ? "danger" : "success"
                                            }`}
                                            style={{ padding: "1%", marginLeft: "10px" }}
                                            onClick={() => select(sch.avb,sch.time)}
                                        >
                                            <i
                                                className={
                                                    sch.avb === "true"
                                                        ? "fa-solid fa-trash"
                                                        : "fa-solid fa-plus"
                                                }
                                            ></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}

            </MDBTableBody>
          </MDBTable>
        </div>
      </div>
    );
}
// import React from 'react';
// import { ScheduleMeeting } from 'react-schedule-meeting';
//
// export default function Example() {
//     // this generates basic available timeslots for the next 6 days
//     const availableTimeslots = [0, 1, 2, 3, 4, 5].map((id) => {
//         return {
//             id,
//             startTime: new Date(new Date(new Date().setDate(new Date().getDate() + id)).setHours(9, 0, 0, 0)),
//             endTime: new Date(new Date(new Date().setDate(new Date().getDate() + id)).setHours(17, 0, 0, 0)),
//         };
//     });
//     const handleTimeslotClicked = (startTimeEventEmit) => {
//         startTimeEventEmit.resetDate();
//         startTimeEventEmit.resetSelectedTimeState();
//         alert(`Time selected: ${format(startTimeEventEmit.startTime, 'cccc, LLLL do h:mm a')}`);
//     };
//
//     return (
//         <ScheduleMeeting
//             borderRadius={10}
//             primaryColor="#3f5b85"
//             onStartTimeSelect={handleTimeslotClicked}
//             eventDurationInMinutes={30}
//             availableTimeslots={availableTimeslots}
//
//         />
//     );
// }