import Upcoming from "./upcoming"
import Book from "./booking"
import Cancel from "./cancel"
import Past from "./Past"
import Profile from "./Profile"
import Message from "./message"

export default function Display(props){

    if(props.level === "Upcoming_Appointments"){
        return <Upcoming/>
    }
    else if(props.level === "Info"){
        return <Profile/>
    }
    else if(props.level === "Booking"){
        return <Book/>
    }
    else if(props.level === "Cancel_Appointment"){
        return <Cancel/>
    }
    else if(props.level === "Past_Appointment"){
        return <Past/>
    }
    else{
        return <Message/>
    }
}