import { useState } from "react";
import TableOne from "./tableOne";
import TableTwo from "./tableTwo";
import TableThree from "./tableThree";
import TableFour from "./tableFour";
import { useNavigate } from "react-router-dom";

import "./admin.css"
import { useDispatch } from "react-redux";
export default function Sidebar() {
  const [status,setStatus] = useState("default")
  if(status === "default"){
    return <>
    <SideBarr status={status} setStatus={setStatus}/>
    <TableOne/>
    </>
  }
  else{
    return <Status status={status} setStatus={setStatus}/>
  }
}

function SideBarr(props) {
     const navigate = useNavigate();
     const dispatch = useDispatch()
    console.log(props);
    return (
      <>
        <div className="sidebar" >
          <ul className="nav-list" >
            <li id="qu">
              <div onClick={() => props.setStatus("default")}>
                <i className="bi bi-question-circle-fill"></i>
                <span className="links_name">Queries</span>
              </div>
              <span className="tooltip">Queries</span>
            </li>
            <br />
            <li id="ad">
              <div onClick={() => props.setStatus("successful")}>
                <i className="fa fa-stethoscope"></i>
                <span className="links_name">
                  Accept
                  <br />
                  doctor
                </span>
              </div>
              <span className="tooltip">Accept doctor</span>
            </li>
            <br />
            <li id="removeDoc">
              <div onClick={() => props.setStatus("successfultwo")}>
                <i className="fa fa-user-md"></i>
                <span className="links_name">
                  Remove
                  <br />
                  doctor
                </span>
              </div>
              <span className="tooltip">Remove doctor</span>
            </li>

            <br />
            <li id="removePat">
              <div onClick={() => props.setStatus("successfulthree")}>
                <i className="fa fa-wheelchair"></i>
                <span className="links_name">
                  Remove
                  <br />
                  patient
                </span>
              </div>
              <span className="tooltip">Remove patient</span>
            </li>
            <br />
            {/* <li id="home">
              <div
                onClick={() => {
                  navigate("/");
                }}
              >
                <i className="fa-solid fa-house"></i>
                <span className="links_name">Home</span>
              </div>
              <span className="tooltip">Home</span>
            </li> */}
            <br/>
            <li id="logout">
              <div
                onClick={() => {
                  localStorage.clear();
                  navigate("/");
                  dispatch({ type: "setFalse" });
                }}
              >
                <i className="fas fa-sign-out-alt fa-fw"></i>
                <span className="links_name">
                  Remove
                  <br />
                  patient
                </span>
              </div>
              <span className="tooltip">Logout</span>
            </li>
          </ul>
        </div>
      </>
    );
}

function Status(props) {
    if(props.status === "successful"){
     return <>
     <SideBarr status={props.status} setStatus={props.setStatus}/>
     <TableTwo/>
     </>
   
    }
    else if(props.status === "successfultwo"){
    
     return <>
     <SideBarr status={props.status} setStatus={props.setStatus}/>
     <TableThree/>
     </>
    }
    else if(props.status === "successfulthree"){
         return <>
         <SideBarr status={props.status} setStatus={props.setStatus}/>
         <TableFour/>
         </>
        }
}
 