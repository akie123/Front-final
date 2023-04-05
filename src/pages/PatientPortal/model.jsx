import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useEffect, useState } from "react";
import { SERVER_URL } from "../../constants";
import Swal from "sweetalert2";
import axios from "axios";

// const Slots = {
//   26: [
//     "7:00 AM",
//     "8:00 AM",
//     "9:00 AM",
//     "10:00 AM",
//     "11:00 AM",
//     "12:00 AM",
//     "1:00 PM",
//   ],
//   27: [
//     "7:00 AM",
//     "8:00 AM",
//     "9:00 AM",
//     "10:00 AM",
//     "11:00 AM",
//     "12:00 AM",
//     "1:00 PM",
//   ],
//   28: [
//     "7:00 AM",
//     "8:00 AM",
//     "9:00 AM",
//     "10:00 AM",
//     "11:00 AM",
//     "12:00 AM",
//     "1:00 PM",
//   ],
// };

const Modal = (props) => {
    const [date, setDate] = useState(new Date());
    const Slots = props.slots
    console.log(Slots)
    const [Slot, setSlot] = useState();
    const maxDate = new Date();
    const bookSlot = () => {
        const { id, jwtToken } = JSON.parse(localStorage.getItem("items"));
        axios.post(
            `${SERVER_URL}/patient/appointment`,
            {
                time: Slot,
                date: date.getDate(),
                idD: props.doctor_id,
                idP: id
            },
            {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            }
        ).
        then(resp => {
            if(resp.data.status === "ok"){

                Swal.fire({
                    title: "Success",
                    text: "Appointment Booked",
                    icon: "success",
                });
            }
        })
    }
    useEffect(() => {
        setSlot("");
    }, [date]);
    return (
        <>
            <div style={{ paddingTop: "2rem" }} className="col-5">
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-evenly",
                        width: "250px",
                    }}
                >

                </div>
                <button
                    style={{ width: "250px", marginTop: "1rem" }}
                    className="btn btn-success"
                    data-toggle="modal"
                    data-target={"#book"+ props.doctor_id}
                    onClick={() => {
                        setSlot("");
                    }}
                >
                    Book Appointment
                </button>
            </div>
            <div
                className="modal fade"
                id={"book"+props.doctor_id}
                tabindex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div
                    className="modal-dialog modal-lg modal-dialog-centered"
                    role="document"
                >
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                                Video Consult
                            </h5>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <div className="calendar-container">
                                    <Calendar
                                        // onChange={setDate}
                                        value={date}
                                        maxDate={new Date()}
                                        minDate={new Date()}
                                        maxDetail="month"
                                    />
                                </div>
                                <div
                                    className="slots-cont"
                                    style={{
                                        width: "350px",
                                        border: "1px solid #a0a096",
                                        borderRadius: "8px",
                                        display: "grid",
                                        justifyItems: "center",
                                        alignItems: "center",
                                        gridTemplateColumns: "repeat(2, 1fr)",
                                        gap: "5px",
                                    }}
                                >
                                    {Slots.map((slot) => {
                                        return (
                                            <button
                                                disabled={!slot.avb ? true : false}
                                                className={
                                                    "btn slot " +
                                                    (slot.time === Slot
                                                        ? "active-slot"
                                                        : "nonactive-slot")
                                                }
                                                style={{ width: "150px", height: "40px",fontWeight: "bold" }}
                                                onClick={() => {
                                                    setSlot(slot.time);
                                                }}
                                            >
                                                {slot.time}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-primary"
                                data-dismiss="modal"
                                disabled={Slot === "" ? true : false}
                                onClick={bookSlot}
                            >
                                Book Appointment
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>
                {`
          .react-calendar {
            width: 400px;
            max-width: 100%;
            background-color: #fff;
            color: #222;
            border-radius: 8px;
            box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
            font-family: Arial, Helvetica, sans-serif;
            line-height: 1.125em;
          }
          .react-calendar__navigation button {
            color: #6f48eb;
            min-width: 44px;
            background: none;
            font-size: 16px;
            margin-top: 8px;
          }
          .react-calendar__navigation button:enabled:hover,
          .react-calendar__navigation button:enabled:focus {
            background-color: #f8f8fa;
          }
          .react-calendar__navigation button[disabled] {
            background-color: #f0f0f0;
          }
          abbr[title] {
            text-decoration: none;
          }
          .react-calendar__tile:enabled:hover,
          .react-calendar__tile:enabled:focus {
            background: #f8f8fa;
            color: #6f48eb;
            border-radius: 6px;
          }
          .react-calendar__tile--now {
            background: white;
            border-radius: 6px;
          }
          .react-calendar__tile--now:enabled:hover,
          .react-calendar__tile--now:enabled:focus {
            background: #6f48eb33;
            border-radius: 6px;
            font-weight: bold;
            color: #6f48eb;
          }
          .react-calendar__tile--hasActive:enabled:hover,
          .react-calendar__tile--hasActive:enabled:focus {
            background: #f8f8fa;
          }
          .react-calendar__tile--active {
            background: #6f48eb;
            border-radius: 6px;
            font-weight: bold;
            color: white !important;
            font-weight: bold !important;
          }
          .react-calendar__tile--active:enabled:hover,
          .react-calendar__tile--active:enabled:focus {
            background: #6f48eb;
            color: white;
            font-weight: bold;
          }
          .react-calendar--selectRange .react-calendar__tile--hover {
            background-color: #f8f8fa;
          }
          .react-calendar_navigation_arrow {
            display: none;
          }
          .react-calendar_month-viewdays_day--weekend {
            color: rgba(16, 16, 16, 0.3);
          }
          .slot {
            outline: none;
          }
          .btn:focus {
            box-shadow: 0 0 0;
          }
          .active-slot {
            background-color: #6f48eb;
            color: white;
            font-weight: bold;
          }
          .nonactive-slot {
            background-color: #f0f0f0;
          }
        `}
            </style>
        </>
    );
};

export default Modal;