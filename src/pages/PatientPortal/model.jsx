import Calendar from "react-calendar";
import "./calendar.css"
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
            <div
                className="modal fade"
                id={"book" + props.doctor_id}
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
                            <div
                                style={{ display: "flex", justifyContent: "space-between" }}
                            >
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
                                                style={{
                                                    width: "150px",
                                                    height: "40px",
                                                    fontWeight: "bold",
                                                }}
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
        </>
    );
};

export default Modal;