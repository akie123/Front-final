import { useState,useEffect } from "react";
import axios from "axios";
import { SERVER_URL } from "../../constants";
import {
    MDBBadge,
    MDBTable,
    MDBTableHead,
    MDBTableBody,
} from "mdb-react-ui-kit";
import PrescriptionModal from "./prescriptionModal";


export default function Past(){

    const [past, setPast] = useState([]);

    useEffect(() => {
        const { id, jwtToken } = JSON.parse(localStorage.getItem("items"));
        axios
            .get(`${SERVER_URL}/patient/${id}/past`, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            })
            .then((resp) => {
                console.log("Hello")
                setPast(resp.data.past);
            });
    }, []);

    const fun = (str) => {
        let temp = new Date(str);
        return (
            temp.getDate() + "-" + (temp.getMonth() + 1) + "-" + temp.getFullYear()
        );
    };

    return (
        <div style={{width : "90%"}}>
            <h1 style={{marginTop : "30px",marginBottom : "40px"}}>Past Appointments</h1>
            <MDBTable align="middle" style={{ position: "" }}>
                <MDBTableHead>
                    <tr>
                        <th scope="col">Doctor's Name</th>
                        <th scope="col">Specialist</th>
                        <th scope="col">Date</th>
                        <th scope="col">Time</th>
                        <th scope="col">Prescription</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    {past.map((appointment) => {
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
                                        {appointment.spec}
                                    </p>
                                </td>
                                <td>
                                    <p
                                        className="fw-formal mb-1"
                                        style={{ fontWeight: "450", color: "black" }}
                                    >
                                        {fun(appointment.date)}
                                    </p>
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
                                    <>
                                        <PrescriptionModal
                                            doctorName={appointment.name}
                                            id={appointment.id}
                                            prescription={appointment.prescription}
                                        />
                                    </>
                                </td>
                            </tr>
                        );
                    })}
                </MDBTableBody>
            </MDBTable>
        </div>
    );
}