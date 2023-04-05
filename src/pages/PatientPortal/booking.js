import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { PatientContext } from ".";
import Modal from "./model";
import Swal from "sweetalert2";
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBRow,
    MDBCol,
    MDBBtn,
    MDBTypography
} from 'mdb-react-ui-kit';
import { SERVER_URL } from "../../constants";

const Book = () => {

    const [doctors,setDoctors] = useState([])


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
            <h1 style={{ margin: "20px" }} className="display-4">Specialties</h1>
            {/*<h1 style={{ marginTop: "30px" }}> SPECIALTIES </h1>*/}



            <div className="container-fluid" style={{paddingLeft:'20px'}}>
                <MDBRow>
                    <MDBCol sm='6'>
                        <MDBCard>
                            <MDBCardBody>
                                <MDBCardTitle>Cardiology</MDBCardTitle>
                                <MDBCardText className="text-muted">
                                    <MDBTypography className='lead mb-0' variant='h6'>
                                        For heart and blood pressure problems
                                    </MDBTypography>
                                </MDBCardText>
                                <hr/>
                                <MDBCardText className="font-weight-italic text-dark">
                                    Chest pain, Heart Failure, Cholesterol
                                </MDBCardText>
                                <MDBBtn href='#'>Find Experts</MDBBtn>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol sm='6'>
                        <MDBCard>
                            <MDBCardBody>
                                <MDBCardTitle>Special title treatment</MDBCardTitle>
                                <MDBCardText>
                                    With supporting text below as a natural lead-in to additional content.
                                </MDBCardText>
                                <MDBBtn href='#'>Go somewhere</MDBBtn>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
                <MDBRow style={{paddingTop:"2%"}}>
                    <MDBCol sm='6'>
                        <MDBCard>
                            <MDBCardBody>
                                <MDBCardTitle>Special title treatment</MDBCardTitle>
                                <MDBCardText>
                                    With supporting text below as a natural lead-in to additional content.
                                </MDBCardText>
                                <MDBBtn href='#'>Go somewhere</MDBBtn>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol sm='6' >
                        <MDBCard>
                            <MDBCardBody>
                                <MDBCardTitle>Special title treatment</MDBCardTitle>
                                <MDBCardText>
                                    With supporting text below as a natural lead-in to additional content.
                                </MDBCardText>
                                <MDBBtn href='#'>Go somewhere</MDBBtn>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </div>

            {/*<div className="tab1">*/}
            {/*    <div className="container-fluid" style={{paddingLeft:"0"}}>*/}
            {/*        {doctors.map((item,indx) => (*/}
            {/*            <div className="border border-secondary"*/}

            {/*                key={indx}*/}
            {/*                id={item.id}*/}
            {/*            >*/}
            {/*                <div className="row" style={{ width: "100%", margin:"2%" }}>*/}
            {/*                    <div className="col-3">*/}
            {/*                        <div className="row"> <img*/}
            {/*                            id="im"*/}
            {/*                            style={{ width: "130px" }}*/}
            {/*                            src={*/}
            {/*                                item.profilePic  }*/}
            {/*                        /></div>*/}
            {/*                        /!*<div className="row" style={{textAlign:'center',padding:"5%"}}>*!/*/}
            {/*                        /!*    <h2 style={{fontFamily: "Delicious Handrawn, cursive"}}>{item.name}</h2>*!/*/}
            {/*                        /!*</div>*!/*/}


            {/*                    </div>*/}
            {/*                    <div*/}
            {/*                        className="col-4 container-fluid"*/}
            {/*                        style={{*/}
            {/*                            padding: "10px",*/}
            {/*                            textAlign: "left",*/}
            {/*                            lineHeight: "30px",*/}
            {/*                        }}*/}
            {/*                    >*/}
            {/*                        <h5 style={{ paddingRight: "10px" }}>{item.name}</h5>*/}
            {/*                        <h6>*/}
            {/*                            {item.qualification}*/}
            {/*                        </h6>*/}
            {/*                        <h6>*/}
            {/*                            {item.spec}*/}
            {/*                        </h6>*/}
            {/*                        <span>₹ {item.fees}/- per session </span>*/}
            {/*                    </div>*/}
            {/*                    {item ? <Modal slots={item.appointment} doctor_id={item._id} /> : <></>}*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        ))}*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    );
};

export default Book;