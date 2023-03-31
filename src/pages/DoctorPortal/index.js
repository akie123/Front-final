import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import Display from "./display";
import './doctor.css'
import axios from "axios";
import ErrPage from '../404page'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const DoctorContext = React.createContext()

export default function Doctor(){
    const [flags,setFlags] = useState({
        upflag : "doctor-list active",
        infoflag : "doctor-list",
        schflag : "doctor-list",
        canflag : "doctor-list",
        msgflag : "doctor-list",
        pastflag : "doctor-list",
    })
    const {setData} = useContext(UserContext)
    const [level,setLevel] = useState("Upcoming_Appointments")
    const [width,setWidth] = useState("300px")
    const [marginLeft,setMarginLeft] = useState("340px")
    const [upcoming, setUpcoming] = useState([]);
    const [past,setPast] = useState([])
    const [msgs,setMsgs] = useState([])
    const [Schedule,setSchedule] = useState([])
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const validauth = useSelector((state) => state.validauth);
    
     function helperfun() {
      const items = JSON.parse(localStorage.getItem('items'))
       axios
         .get(`http://localhost:5000/doctors?email=${items.email}`)
         .then((res) => {
           setData(res.data[0]);
           setMsgs(res.data[0].messages)
           let initial_list = res.data[0].appointments;
           let slots = res.data[0].timeslots
           setSchedule(slots)
           let final_list = [];
           let final_list_1 = [];
           let d = new Date();
           let td =
             d.getFullYear() +
             "-" +
             (((d.getMonth() + 1).toString().length === 1 ? "0" : "") +
               (d.getMonth() + 1).toString()) +
             "-" +
             (d.getDate().toString().length === 1 ? `0${d.getDate()}` : `${d.getDate()}`)
           let temptime = d.getHours() + ":" + d.getMinutes();
           temptime = (temptime.length === 4 ? "0" : "") + temptime;
           //console.log(temptime+" "+td)
           for (let i = 0; i < initial_list.length; i++) {
             let tempdate = initial_list[i].date.substring(0, 10);
             //console.log(tempdate)
             if (tempdate === td) {
               if (
                 temptime > initial_list[i].time.substring(0, 5) &&
                 initial_list[i].time.substring(6, 11) > temptime
               ) {
                 final_list.push({
                   ...initial_list[i],
                   status: "active",
                   id: final_list.length + 1,
                 });
               } else if (initial_list[i].time.substring(0, 5) > temptime) {
                 final_list.push({
                   ...initial_list[i],
                   status: "upcoming",
                   id: final_list.length + 1,
                 });
               }
               else{
                final_list_1.push({
                  ...initial_list[i],
                  status : "past",
                  id : final_list_1.length + 1
                })
               }
             } else if (tempdate > td) {
               final_list.push({
                 ...initial_list[i],
                 status: "upcoming",
                 id: final_list.length + 1,
               });
             }
             else{
                final_list_1.push({
                  ...initial_list[i],
                  status : "past",
                  id : final_list_1.length+1,
                })
             }
           }
           setUpcoming(final_list);
           setPast(final_list_1);
         });
     }

    useEffect(() => {
      const items = JSON.parse(localStorage.getItem('items'));
      if(items){
        if (items.user === "doctor"){
          dispatch({ type: "setTrue" });
          helperfun();
        }  
      }
    },[])

    return validauth === true ? (
      <DoctorContext.Provider
        value={{
          upcoming,
          setUpcoming,
          past,
          msgs,
          setMsgs,
          Schedule,
          setSchedule,
        }}
      >
        <div className="doctor-navigation" style={{ width: width }}>
          <ul>
            <li className={flags.upflag}>
              <div
                className="doctor-list-div"
                onClick={() => {
                  setFlags({
                    upflag: "doctor-list active",
                    infoflag: "doctor-list",
                    schflag: "doctor-list",
                    canflag: "doctor-list",
                    msgflag: "doctor-list",
                    pastflag: "doctor-list",
                  });
                  setLevel("Upcoming_Appointments");
                }}
              >
                <span className="doctor-icon">
                  <i className="fas fa-angle-double-right fa-fw"></i>
                </span>
                <span className="doctor-title">Upcoming Appointments</span>
              </div>
            </li>

            <li className={flags.infoflag}>
              <div
                className="doctor-list-div"
                onClick={() => {
                  setFlags({
                    upflag: "doctor-list",
                    infoflag: "doctor-list active",
                    schflag: "doctor-list",
                    canflag: "doctor-list",
                    msgflag: "doctor-list",
                    pastflag: "doctor-list",
                  });
                  setLevel("Info");
                }}
              >
                <span className="doctor-icon">
                  <i className="fa-solid fa-info fa-fw"></i>
                </span>
                <span className="doctor-title">Info</span>
              </div>
            </li>

            <li className={flags.schflag}>
              <div
                className="doctor-list-div"
                onClick={() => {
                  setFlags({
                    upflag: "doctor-list",
                    infoflag: "doctor-list",
                    schflag: "doctor-list active",
                    canflag: "doctor-list",
                    msgflag: "doctor-list",
                    pastflag: "doctor-list",
                  });
                  setLevel("Schedule_Manager");
                }}
              >
                <span className="doctor-icon">
                  <i className="fa-solid fa-calendar-check fa-fw"></i>
                </span>
                <span className="doctor-title">Schedule Manager</span>
              </div>
            </li>

            <li className={flags.canflag}>
              <div
                className="doctor-list-div"
                onClick={() => {
                  setFlags({
                    upflag: "doctor-list",
                    infoflag: "doctor-list",
                    schflag: "doctor-list",
                    canflag: "doctor-list active",
                    msgflag: "doctor-list",
                    pastflag: "doctor-list",
                  });
                  setLevel("Cancel_Appointment");
                }}
              >
                <span className="doctor-icon">
                  <i className="fa-solid fa-calendar-check fa-fw"></i>
                </span>
                <span className="doctor-title">Cancel Appointments</span>
              </div>
            </li>

            <li className={flags.msgflag}>
              <div
                className="doctor-list-div"
                onClick={() => {
                  setFlags({
                    upflag: "doctor-list",
                    infoflag: "doctor-list",
                    schflag: "doctor-list",
                    canflag: "doctor-list",
                    msgflag: "doctor-list active",
                    pastflag: "doctor-list",
                  });
                  setLevel("Messages");
                }}
              >
                <span className="doctor-icon">
                  <i className="fas fa-envelope fa-fw"></i>
                </span>
                <span className="doctor-title">Messages</span>
              </div>
            </li>

            <li className={flags.pastflag}>
              <div
                className="doctor-list-div"
                onClick={() => {
                  setFlags({
                    upflag: "doctor-list",
                    infoflag: "doctor-list",
                    schflag: "doctor-list",
                    canflag: "doctor-list",
                    msgflag: "doctor-list",
                    pastflag: "doctor-list active",
                  });
                  setLevel("Past_Appointment");
                }}
              >
                <span className="doctor-icon">
                  <i className="fa-solid fa-clock-rotate-left fa-fw"></i>
                </span>
                <span className="doctor-title">Past Appointments</span>
              </div>
            </li>

            <li>
              <div
                className="doctor-list-div"
                onClick={() => {
                  navigate("/");
                }}
              >
                <span className="doctor-icon">
                  <i className="fa-solid fa-house"></i>
                </span>
                <span className="doctor-title">Home</span>
              </div>
            </li>

            <li>
              <div
                className="doctor-list-div"
                onClick={() => {
                  navigate("/");
                  setData({});
                  localStorage.clear();
                  dispatch({ type: "setFalse" });
                }}
              >
                <span className="doctor-icon">
                  <i className="fas fa-sign-out-alt fa-fw"></i>
                </span>
                <span className="doctor-title">Logout</span>
              </div>
            </li>
          </ul>
        </div>

        <div
          style={{
            transition: "0.5s",
            marginLeft: marginLeft,
            marginTop: "20px",
          }}
        >
          <Display level={level} />
        </div>

        <div
          className="doctor-toggle"
          onClick={() => {
            if (width === "300px") {
              setWidth("74px");
              setMarginLeft("110px");
            } else {
              setWidth("300px");
              setMarginLeft("340px");
            }
          }}
        >
          <i
            className="fa-solid fa-bars"
            style={{
              color: "white",
              position: "fixed",
              top: "35px",
              right: "38px",
              fontSize: "1.2rem",
            }}
          ></i>
        </div>
      </DoctorContext.Provider>
    ) : (
      <ErrPage />
    );
}