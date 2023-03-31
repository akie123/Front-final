import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { PatientContext } from ".";
import Modal from "./model";
import Swal from "sweetalert2";
import { SERVER_URL } from "../../constants";

const Book = () => {
    const [slot, setSlot] = useState(0);
    const [enable, setEnable] = useState([]);
    const [re, setV] = useState(0);
    const [doctors,setDoctors] = useState([])
    const [search, setSearch] = useState("");

    const helperfun = () => {
        const { id, jwtToken } = JSON.parse(localStorage.getItem("items"));
        axios
            .get(`${SERVER_URL}/patient/getdoctors`, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            })
            .then((resp) => {
                console.log(resp.data);
                setDoctors(resp.data);
            });
    }

    useEffect(() => {
        helperfun()
    },[])

    return (
        <div className="booking" id="booking">
            <h1 style={{ marginTop: "30px" }}> Book Doctor Now! </h1>

            <br />
            <br />
            <input
                className="form-control"
                id="Input2"
                type="text"
                placeholder="Search.."
                style={{ width: "30%", border: "1px solid black" }}
            />
            <br />
            <div className="tab1">
                <div className="container-fluid" style={{paddingLeft:"0"}}>
                    {doctors.map((item,indx) => (
                        <div className="border border-secondary"

                            key={indx}
                            id={item.id}
                        >
                            <div className="row" style={{ width: "100%", margin:"2%" }}>
                                <div className="col-3">
                                    <div className="row"> <img
                                        id="im"
                                        style={{ width: "130px" }}
                                        src={
                                            item.profilePic  }
                                    /></div>
                                    {/*<div className="row" style={{textAlign:'center',padding:"5%"}}>*/}
                                    {/*    <h2 style={{fontFamily: "Delicious Handrawn, cursive"}}>{item.name}</h2>*/}
                                    {/*</div>*/}


                                </div>
                                <div
                                    className="col-4 container-fluid"
                                    style={{
                                        padding: "10px",
                                        textAlign: "left",
                                        lineHeight: "30px",
                                    }}
                                >
                                    <h5 style={{ paddingRight: "10px" }}>{item.name}</h5>
                                    <h6>
                                        {item.qualification}
                                    </h6>
                                    <h6>
                                        {item.spec}
                                    </h6>
                                    <span>₹ {item.fees}/- per session </span>
                                </div>
                                {item ? <Modal slots={item.appointment} doctor_id={item._id} /> : <></>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Book;