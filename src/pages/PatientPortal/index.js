import "./patient.css";
import React, { useEffect, useState, useContext } from "react";
import Display from "./display";
import { UserContext } from "../../App";
import axios from "axios";
import ErrPage from "../404page";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const PatientContext = React.createContext()

function Patient() {
  const [flags, setFlags] = useState({
    upflag: "patient-list  active",
    infoFlag: "patient-list",
    bkflag: "patient-list",
    capflag: "patient-list",
    papflag: "patient-list",
    msgflag: "patient-list",
  });
  const [level, setLevel] = useState("Upcoming_Appointments");
  const [width, setWidth] = useState("300px");
  const [marginLeft, setMarginLeft] = useState("340px");
  const { setData } = useContext(UserContext);
  const [upcoming, setUpcoming] = useState([]);
  const [taken,setTaken] = useState(0)
  const [past,setPast] = useState([])
  const [doctor_data, setDData] = useState([]);
  const [msgs,setMsgs] = useState([])
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const validauth = useSelector((state) => state.validauth);

  function helperfun() {
    const items = JSON.parse(localStorage.getItem('items'))
    axios
      .get(`http://localhost:5000/patients?email=${items.email}`)
      .then((res) => {
        setData(res.data[0]);
        setMsgs(res.data[0].messages)
        let initial_list = res.data[0].appointments
        let final_list = [];
        let final_list_1 = [];
        let d = new Date();
        let td =
          d.getFullYear() +
          "-" +
          (((d.getMonth() + 1).toString().length === 1 ? "0" : "") +
            (d.getMonth() + 1).toString()) +
          "-" +
          d.getDate();
        let temptime = d.getHours() + ":" + d.getMinutes();
        temptime = (temptime.length === 4 ? "0" : "") + temptime;
        console.log(temptime+" "+td)
        for (let i = 0; i < initial_list.length; i++) {
          let tempdate = initial_list[i].date.substring(0, 10);
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
          }
          else if(tempdate > td){
            final_list.push({
              ...initial_list[i],
              status : "upcoming",
              id : final_list.length + 1,
            })
          }
          else{
            final_list_1.push({
              ...initial_list[i],
              status: "past",
              id: final_list_1.length + 1,
            });
          }
        }
        setUpcoming(final_list);
        setPast(final_list_1);
      })
    axios.get("http://localhost:5000/doctors").then((resp) => {
      setDData(resp.data)
    })
  }

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('items'));
    if(items){
      if(items.user === "patient"){
        dispatch({type : "setTrue"})
        // helperfun();
      }
    }
  }, []);

  return validauth === true ? (
    <PatientContext.Provider
      value={{
        upcoming,
        setUpcoming,
        doctor_data,
        setDData,
        past,
        setPast,
        taken,
        setTaken,
        msgs,
        setMsgs,
      }}
    >
      <div
        className="patient-navigation"
        style={{ width: width }}
      >
        <ul>
          <li className={flags.upflag}>
            <div
              className="patient-list-div"
              onClick={() => {
                setFlags({
                  upflag: "patient-list  active",
                  infoFlag: "patient-list",
                  bkflag: "patient-list",
                  capflag: "patient-list",
                  papflag: "patient-list",
                  msgflag: "patient-list",
                });
                setLevel("Upcoming_Appointments");
              }}
            >
              <span className="patient-icon">
                <i className="fas fa-angle-double-right fa-fw"></i>
              </span>
              <span className="patient-title">Upcoming Appointments</span>
            </div>
          </li>
          <li className={flags.infoFlag}>
            <div
              className="patient-list-div"
              onClick={() => {
                setFlags({
                  upflag: "patient-list",
                  infoFlag: "patient-list active",
                  bkflag: "patient-list",
                  capflag: "patient-list",
                  papflag: "patient-list",
                  msgflag: "patient-list",
                });
                setLevel("Info");
              }}
            >
              <span className="patient-icon">
                <i className="fa-solid fa-info fa-fw"></i>
              </span>
              <span className="patient-title">Info</span>
            </div>
          </li>
          <li className={flags.bkflag}>
            <div
              className="patient-list-div"
              onClick={() => {
                setFlags({
                  upflag: "patient-list",
                  infoFlag: "patient-list",
                  bkflag: "patient-list active",
                  capflag: "patient-list",
                  papflag: "patient-list",
                  msgflag: "patient-list",
                });
                setLevel("Booking");
              }}
            >
              <span className="patient-icon">
                <i className="fa-solid fa-calendar-check fa-fw"></i>
              </span>
              <span className="patient-title">Book Appointments</span>
            </div>
          </li>

          <li className={flags.capflag}>
            <div
              className="patient-list-div"
              onClick={() => {
                setFlags({
                  upflag: "patient-list",
                  infoFlag: "patient-list",
                  bkflag: "patient-list",
                  capflag: "patient-list active",
                  papflag: "patient-list",
                  msgflag: "patient-list",
                });
                setLevel("Cancel_Appointment");
              }}
            >
              <span className="patient-icon">
                <i className="fa-solid fa-calendar-check fa-fw"></i>
              </span>
              <span className="patient-title">Cancel Appointments</span>
            </div>
          </li>

          <li className={flags.papflag}>
            <div
              className="patient-list-div"
              onClick={() => {
                setFlags({
                  upflag: "patient-list",
                  infoFlag: "patient-list",
                  bkflag: "patient-list",
                  capflag: "patient-list",
                  papflag: "patient-list active",
                  msgflag: "patient-list",
                });
                setLevel("Past_Appointment");
              }}
            >
              <span className="patient-icon">
                <i className="fa-solid fa-clock-rotate-left fa-fw"></i>
              </span>
              <span className="patient-title">Past Appointments</span>
            </div>
          </li>

          <li className={flags.msgflag}>
            <div
              className="patient-list-div"
              onClick={() => {
                setFlags({
                  upflag: "patient-list",
                  infoFlag: "patient-list",
                  bkflag: "patient-list",
                  capflag: "patient-list",
                  papflag: "patient-list",
                  msgflag: "patient-list active",
                });
                setLevel("Messages");
              }}
            >
              <span className="patient-icon">
                <i className="fas fa-envelope fa-fw"></i>
              </span>
              <span className="patient-title">Messages</span>
            </div>
          </li>

          <li className="patient-list">
            <div
              className="patient-list-div"
              onClick={() => {
                navigate("/");
              }}
            >
              <span className="patient-icon">
                <i className="fa-solid fa-house"></i>
              </span>
              <span className="patient-title">Home</span>
            </div>
          </li>

          <li className="patient-list">
            <div
              className="patient-list-div"
              onClick={() => {
                navigate("/");
                setData({});
                localStorage.clear();
                dispatch({ type: "setFalse" });
              }}
            >
              <span className="patient-icon">
                <i className="fas fa-sign-out-alt fa-fw"></i>
              </span>
              <span className="patient-title">Logout</span>
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
        className="patient-toggle"
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
    </PatientContext.Provider>
  ) : (
    <ErrPage />
  );
}

export default Patient