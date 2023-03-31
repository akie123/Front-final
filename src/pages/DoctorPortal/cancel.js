import {
    MDBBadge,
    MDBTable,
    MDBTableHead,
    MDBTableBody,
} from "mdb-react-ui-kit";
import { useEffect } from "react";
import axios from "axios";
import { SERVER_URL } from "../../constants";
import { useState } from "react";
import Swal from "sweetalert2";

export default function Cancel(){

    const [data, setData] = useState([]);

    const cancelAppointment = (appointment) => {
        const { jwtToken } = JSON.parse(localStorage.getItem("items"));
        axios
            .post(
                `${SERVER_URL}/cancel`,
                {
                    idP: appointment.idP,
                    idD: appointment.idD,
                    time: appointment.time,
                },
                {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`,
                    },
                }
            )
            .then((resp) => {
                if(resp.data.status === "success"){
                    Swal.fire({
                        title: "Success",
                        text: "Cancelled successfully",
                        icon: "success",
                    });
                }
                helperfun()
            });
    };

    const helperfun = () => {
        const { id, jwtToken } = JSON.parse(localStorage.getItem("items"));
        axios
            .get(`${SERVER_URL}/doctor/${id}/upcoming`, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            })
            .then((resp) => {
                setData(resp.data.upcoming);
            });
    };

    useEffect(() => {
        helperfun()
    })

    return (
        <div style={{ width: "90%" }}>
            <h1
                style={{
                    marginBottom: "50px",
                    marginTop: "40px",
                }}
            >
                Cancel Appointments
            </h1>
            <MDBTable align="middle">
                <MDBTableHead>
                    <tr>
                        <th scope="col">Patient's Name</th>
                        <th scope="col">Time</th>
                        <th scope="col">Status</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    {data?.map((appointment) => {
                        return (
                            <tr key={appointment.id}>
                                <td>
                                    <div className="ms-3">
                                        <p
                                            className="fw-bold mb-1"
                                            style={{ fontWeight: "600", color: "black" }}
                                        >
                                            {appointment.name}
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
                                            backgroundColor: "#D2042D",
                                            color: "white",
                                        }}
                                        onClick={() => {
                                            cancelAppointment(appointment);
                                        }}
                                    >
                                        Cancel
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