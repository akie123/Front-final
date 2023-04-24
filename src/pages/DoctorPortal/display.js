import Upcoming from "./upcoming";
import Cancel from "./cancel";
import Past from "./Past";
import Profile from "./Profile";
import Message from "./message";
import Schedule from "./Schedule";
import Peer from "simple-peer"

import io from "socket.io-client"
import {useRef, useState,useEffect} from "react";
import axios from "axios";
const socket = io.connect('http://localhost:2500')
export default function Display(props) {

  const [ me, setMe ] = useState("")


  useEffect(() => {

    const { id, jwtToken } = JSON.parse(localStorage.getItem("items"));
    socket.on("me", (id1) => {
      axios.post('http://localhost:5000/addIdD', {
        sid:id1,
        id:id

      })
          .then((res) => {
            console.log("ok")
            setMe(id1)

          }).catch((err)=>{
        console.log(err)
      })

    })


  }, [])




  if (props.level === "Upcoming_Appointments") {
    return <Upcoming Sid={me} />;
  } else if (props.level === "Info") {
    return <Profile />;
  } else if (props.level === "Schedule_Manager") {
    return <Schedule />;
  } else if (props.level === "Cancel_Appointment") {
    return <Cancel />;
  } else if (props.level === "Messages") {
    return <Message />;
  } else if (props.level === "Past_Appointment") {
    return <Past />;
  }
}
