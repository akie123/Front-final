import Upcoming from "./upcoming";
import Cancel from "./cancel";
import Past from "./Past";
import Profile from "./Profile";
import Message from "./message";
import Schedule from "./Schedule";

export default function Display(props) {
  if (props.level === "Upcoming_Appointments") {
    return <Upcoming />;
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
