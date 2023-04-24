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
    MDBTypography,
} from "mdb-react-ui-kit";
import {
    MDBDropdown,
    MDBDropdownMenu,
    MDBDropdownToggle,
    MDBDropdownItem,
} from "mdb-react-ui-kit";
import { SERVER_URL } from "../../constants";

const Book = () => {
    const [doctors, setDoctors] = useState([]);
    const [orgDoctors, setOrgDoctors] = useState([]);
    const [change, setChange] = useState("");
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState({
        fees: "default",
        exp: "default",
        rating: "default",
    });

    const helperfun = () => {
        const { id, jwtToken } = JSON.parse(localStorage.getItem("items"));
        axios
            .get(`${SERVER_URL}/patient/getdoctors?department=${change}`, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            })
            .then((resp) => {
                setDoctors(resp.data);
                setOrgDoctors(resp.data);
            });
    };

    useEffect(() => {
        if (change !== "") {
            helperfun();
        }
    }, [change]);

    // search useEffect
    useEffect(() => {
        setSort({
            fees: "default",
            exp: "default",
            rating: "default",
        });
        if (search === "") setDoctors(orgDoctors);
        else
            setDoctors(
                doctors.filter((doc) => doc.name.toLowerCase().includes(search))
            );
    }, [search]);

    // sort useEffect
    useEffect(() => {
        let sortAttr = Object.keys(sort).find((key) => {
            return sort[key] !== "default";
        });
        if (sortAttr !== undefined) {
            console.log(sortAttr)
            let temp_arr = [...doctors];
            if (sort[sortAttr] === "asc")
                temp_arr.sort((doc1, doc2) =>
                    doc1[sortAttr] > doc2[sortAttr] ? 1 : -1
                );
            else
                temp_arr.sort((doc1, doc2) =>
                    doc1[sortAttr] > doc2[sortAttr] ? -1 : 1
                );
            setDoctors(temp_arr);
        }
    }, [sort]);

    const handleSubmit2 = (event) => {
        event.preventDefault();
        setChange(event.target.name);
    };

    const handleSubmit1 = (event) => {
        event.preventDefault();
        setChange("");
    };

    const sortHandler = (name) => {
        let val = sort[name];
        if (val === "default") val = "asc";
        else if (val === "asc") val = "desc";
        else val = "asc";
        setSort({
            fees: "default",
            exp: "default",
            rating: "default",
            [name]: val,
        });
    };

    return (
        <div className="booking" id="booking">
            {change == "" && (
                <div>
                    <h1 style={{ margin: "20px" }} className="display-4 font-weight-bold">
                        Specialties {change}
                    </h1>
                    <div className="container-fluid" style={{ paddingLeft: "20px" }}>
                        <MDBRow>
                            <MDBCol sm="6">
                                <MDBCard>
                                    <MDBCardBody>
                                        <MDBCardTitle>Cardiology</MDBCardTitle>
                                        <MDBCardText className="text-muted">
                                            <MDBTypography className="lead mb-0" variant="h6">
                                                For heart and blood pressure problems
                                            </MDBTypography>
                                        </MDBCardText>
                                        <hr />
                                        <MDBCardText className="font-weight-italic text-dark">
                                            Chest pain, Heart Failure, Cholesterol
                                        </MDBCardText>
                                        <button
                                            type="button"
                                            onClick={handleSubmit2}
                                            className="btn btn-outline-success"
                                            name="Cardiology"
                                        >
                                            Find Experts
                                        </button>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                            <MDBCol sm="6">
                                <MDBCard>
                                    <MDBCardBody>
                                        <MDBCardTitle>Anesthesiology</MDBCardTitle>
                                        <MDBCardText className="text-muted">
                                            <MDBTypography className="lead mb-0" variant="h6">
                                                For pain management and anesthesia
                                            </MDBTypography>
                                        </MDBCardText>
                                        <hr />
                                        <MDBCardText className="font-weight-italic text-dark">
                                            General Anesthesia, Regional Anesthesia
                                        </MDBCardText>
                                        <button
                                            type="button"
                                            onClick={handleSubmit2}
                                            className="btn btn-outline-success"
                                            name="Anesthesiology"
                                        >
                                            Find Experts
                                        </button>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                        </MDBRow>
                        <MDBRow style={{ paddingTop: "2%" }}>
                            <MDBCol sm="6">
                                <MDBCard>
                                    <MDBCardBody>
                                        <MDBCardTitle>Dermatology</MDBCardTitle>
                                        <MDBCardText className="text-muted">
                                            <MDBTypography className="lead mb-0" variant="h6">
                                                For skin, hair, and nail problems
                                            </MDBTypography>
                                        </MDBCardText>
                                        <hr />
                                        <MDBCardText className="font-weight-italic text-dark">
                                            Acne, Eczema, Psoriasis, Hair Loss
                                        </MDBCardText>
                                        <button
                                            type="button"
                                            onClick={handleSubmit2}
                                            className="btn btn-outline-success"
                                            name="Dermatology"
                                        >
                                            Find Experts
                                        </button>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                            <MDBCol sm="6">
                                <MDBCard>
                                    <MDBCardBody>
                                        <MDBCardTitle>Endocrinology</MDBCardTitle>
                                        <MDBCardText className="text-muted">
                                            <MDBTypography className="lead mb-0" variant="h6">
                                                For hormone-related disorders
                                            </MDBTypography>
                                        </MDBCardText>
                                        <hr />
                                        <MDBCardText className="font-weight-italic text-dark">
                                            Diabetes, Thyroid Problems, Hormonal Imbalance
                                        </MDBCardText>
                                        <button
                                            type="button"
                                            onClick={handleSubmit2}
                                            className="btn btn-outline-success"
                                            name="Endocrinology"
                                        >
                                            Find Experts
                                        </button>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                        </MDBRow>
                        <MDBRow style={{ paddingTop: "2%" }}>
                            <MDBCol sm="6">
                                <MDBCard>
                                    <MDBCardBody>
                                        <MDBCardTitle>Gastroenterology</MDBCardTitle>
                                        <MDBCardText className="text-muted">
                                            <MDBTypography className="lead mb-0" variant="h6">
                                                For digestive system disorders
                                            </MDBTypography>
                                        </MDBCardText>
                                        <hr />
                                        <MDBCardText className="font-weight-italic text-dark">
                                            Acid Reflux, Irritable Bowel Syndrome, Ulcer, Hepatitis
                                        </MDBCardText>
                                        <button
                                            type="button"
                                            onClick={handleSubmit2}
                                            className="btn btn-outline-success"
                                            name="Gastroenterology"
                                        >
                                            Find Experts
                                        </button>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                            <MDBCol sm="6">
                                <MDBCard>
                                    <MDBCardBody>
                                        <MDBCardTitle>Hematology</MDBCardTitle>
                                        <MDBCardText className="text-muted">
                                            <MDBTypography className="lead mb-0" variant="h6">
                                                For blood disorders
                                            </MDBTypography>
                                        </MDBCardText>
                                        <hr />
                                        <MDBCardText className="font-weight-italic text-dark">
                                            Anemia, Hemophilia, Blood Cancer, Clotting Disorders
                                        </MDBCardText>
                                        <button
                                            type="button"
                                            onClick={handleSubmit2}
                                            className="btn btn-outline-success"
                                            name="Hematology"
                                        >
                                            Find Experts
                                        </button>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                        </MDBRow>
                        <MDBRow style={{ paddingTop: "2%" }}>
                            <MDBCol sm="6">
                                <MDBCard>
                                    <MDBCardBody>
                                        <MDBCardTitle>Infectious Diseases</MDBCardTitle>
                                        <MDBCardText className="text-muted">
                                            <MDBTypography className="lead mb-0" variant="h6">
                                                For infections caused by bacteria, viruses, and
                                                parasites
                                            </MDBTypography>
                                        </MDBCardText>
                                        <hr />
                                        <MDBCardText className="font-weight-italic text-dark">
                                            COVID-19, Malaria, Pneumonia, Tuberculosis
                                        </MDBCardText>
                                        <button
                                            type="button"
                                            onClick={handleSubmit2}
                                            className="btn btn-outline-success"
                                            name="Infectious Diseases"
                                        >
                                            Find Experts
                                        </button>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                            <MDBCol sm="6">
                                <MDBCard>
                                    <MDBCardBody>
                                        <MDBCardTitle>Neurology</MDBCardTitle>
                                        <MDBCardText className="text-muted">
                                            <MDBTypography className="lead mb-0" variant="h6">
                                                For disorders of the nervous system
                                            </MDBTypography>
                                        </MDBCardText>
                                        <hr />
                                        <MDBCardText className="font-weight-italic text-dark">
                                            Stroke, Epilepsy, Multiple Sclerosis, Parkinson's Disease
                                        </MDBCardText>
                                        <button
                                            type="button"
                                            onClick={handleSubmit2}
                                            className="btn btn-outline-success"
                                            name="Neurology"
                                        >
                                            Find Experts
                                        </button>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                        </MDBRow>
                        <MDBRow style={{ paddingTop: "2%" }}>
                            <MDBCol sm="6">
                                <MDBCard>
                                    <MDBCardBody>
                                        <MDBCardTitle>Oncology</MDBCardTitle>
                                        <MDBCardText className="text-muted">
                                            <MDBTypography className="lead mb-0" variant="h6">
                                                For cancer treatment and management
                                            </MDBTypography>
                                        </MDBCardText>
                                        <hr />
                                        <MDBCardText className="font-weight-italic text-dark">
                                            Breast Cancer, Lung Cancer, Colon Cancer, Leukemia
                                        </MDBCardText>
                                        <button
                                            type="button"
                                            onClick={handleSubmit2}
                                            className="btn btn-outline-success"
                                            name="Oncology"
                                        >
                                            Find Experts
                                        </button>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                            <MDBCol sm="6">
                                <MDBCard>
                                    <MDBCardBody>
                                        <MDBCardTitle>Orthopedics</MDBCardTitle>
                                        <MDBCardText className="text-muted">
                                            <MDBTypography className="lead mb-0" variant="h6">
                                                For bone and joint-related disorders
                                            </MDBTypography>
                                        </MDBCardText>
                                        <hr />
                                        <MDBCardText className="font-weight-italic text-dark">
                                            Arthritis, Fractures, Sports Injuries, Back Pain
                                        </MDBCardText>
                                        <button
                                            type="button"
                                            onClick={handleSubmit2}
                                            className="btn btn-outline-success"
                                            name="Orthopedics"
                                        >
                                            Find Experts
                                        </button>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                        </MDBRow>
                        <MDBRow style={{ paddingTop: "2%" }}>
                            <MDBCol sm="6">
                                <MDBCard>
                                    <MDBCardBody>
                                        <MDBCardTitle>Pediatrics</MDBCardTitle>
                                        <MDBCardText className="text-muted">
                                            <MDBTypography className="lead mb-0" variant="h6">
                                                For child health and development
                                            </MDBTypography>
                                        </MDBCardText>
                                        <hr />
                                        <MDBCardText className="font-weight-italic text-dark">
                                            Vaccinations, Growth and Development, Childhood Diseases
                                        </MDBCardText>
                                        <button
                                            type="button"
                                            onClick={handleSubmit2}
                                            className="btn btn-outline-success"
                                            name="Pediatrics"
                                        >
                                            Find Experts
                                        </button>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                            <MDBCol sm="6">
                                <MDBCard>
                                    <MDBCardBody>
                                        <MDBCardTitle>Psychiatry</MDBCardTitle>
                                        <MDBCardText className="text-muted">
                                            <MDBTypography className="lead mb-0" variant="h6">
                                                For mental health disorders
                                            </MDBTypography>
                                        </MDBCardText>
                                        <hr />
                                        <MDBCardText className="font-weight-italic text-dark">
                                            Depression, Anxiety, Bipolar Disorder, Schizophrenia
                                        </MDBCardText>
                                        <button
                                            type="button"
                                            onClick={handleSubmit2}
                                            className="btn btn-outline-success"
                                            name="Psychiatry"
                                        >
                                            Find Experts
                                        </button>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                        </MDBRow>
                        <MDBRow style={{ paddingTop: "2%" }}>
                            <MDBCol sm="6">
                                <MDBCard>
                                    <MDBCardBody>
                                        <MDBCardTitle>Surgery</MDBCardTitle>
                                        <MDBCardText className="text-muted">
                                            <MDBTypography className="lead mb-0" variant="h6">
                                                For surgical treatments
                                            </MDBTypography>
                                        </MDBCardText>
                                        <hr />
                                        <MDBCardText className="font-weight-italic text-dark">
                                            Appendectomy, Hernia Repair, Gallbladder Removal, Cancer
                                            Surgery
                                        </MDBCardText>
                                        <button
                                            type="button"
                                            onClick={handleSubmit2}
                                            className="btn btn-outline-success"
                                            name="Surgery"
                                        >
                                            Find Experts
                                        </button>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                            <MDBCol sm="6">
                                <MDBCard>
                                    <MDBCardBody>
                                        <MDBCardTitle>Urology</MDBCardTitle>
                                        <MDBCardText className="text-muted">
                                            <MDBTypography className="lead mb-0" variant="h6">
                                                For urinary tract and reproductive system disorders
                                            </MDBTypography>
                                        </MDBCardText>
                                        <hr />
                                        <MDBCardText className="font-weight-italic text-dark">
                                            Kidney Stones, Prostate Problems, Erectile Dysfunction
                                        </MDBCardText>
                                        <button
                                            type="button"
                                            onClick={handleSubmit2}
                                            className="btn btn-outline-success"
                                            name="Urology"
                                        >
                                            Find Experts
                                        </button>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                        </MDBRow>
                        <MDBRow style={{ paddingTop: "2%" }}>
                            <MDBCol sm="6">
                                <MDBCard>
                                    <MDBCardBody>
                                        <MDBCardTitle>Otolaryngology (ENT)</MDBCardTitle>
                                        <MDBCardText className="text-muted">
                                            <MDBTypography className="lead mb-0" variant="h6">
                                                For ear, nose, and throat-related disorders
                                            </MDBTypography>
                                        </MDBCardText>
                                        <hr />
                                        <MDBCardText className="font-weight-italic text-dark">
                                            For ear, nose, and throat-related disorders
                                        </MDBCardText>
                                        <button
                                            type="button"
                                            onClick={handleSubmit2}
                                            className="btn btn-outline-success"
                                            name="ENT"
                                        >
                                            Find Experts
                                        </button>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                            <MDBCol sm="6">
                                <MDBCard>
                                    <MDBCardBody>
                                        <MDBCardTitle>Ophthalmology</MDBCardTitle>
                                        <MDBCardText className="text-muted">
                                            <MDBTypography className="lead mb-0" variant="h6">
                                                For eye-related disorders
                                            </MDBTypography>
                                        </MDBCardText>
                                        <hr />
                                        <MDBCardText className="font-weight-italic text-dark">
                                            Cataracts, Glaucoma, Conjunctivitis, Retinal Disorders
                                        </MDBCardText>
                                        <button
                                            type="button"
                                            onClick={handleSubmit2}
                                            className="btn btn-outline-success"
                                            name="Ophthalmology"
                                        >
                                            Find Experts
                                        </button>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                        </MDBRow>
                    </div>
                </div>
            )}
            {change != "" && (
                <div className="container-fluid" style={{ paddingLeft: "2%" }}>
                    <div className="row">
                        <div className="col-1">
                            <button
                                type="button"
                                className="btn text-white btn-lg btn-floating"
                                onClick={handleSubmit1}
                                style={{ backgroundColor: "#655D8A" }}
                            >
                                <i className="bi bi-arrow-return-left"></i>
                            </button>
                        </div>
                        <div className="col">
                            {" "}
                            <p
                                className="h4"
                                style={{
                                    fontFamily: "Noto Sans , sans-serif",
                                    textAlign: "center",
                                }}
                            >
                                Consult Best {change} Online{" "}
                            </p>
                        </div>
                    </div>

                    <hr />

                    <div className="row">
                        <div className="form-outline col-6">
                            <input
                                type="search"
                                id="form1"
                                className="form-control"
                                placeholder="Search doctor!"
                                aria-label="Search"
                                name="search"
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                }}
                            />
                        </div>
                        <div className="col-5" style={{ textAlign: "center" }}></div>
                        <div className="col-1" style={{ textAlign: "center" }}>
                            <div className="dropdown">
                                <button
                                    className="btn btn-outline dropdown-toggle"
                                    style={{
                                        color: "#fff",
                                        backgroundColor: "#655D8A",
                                        borderColor: "#655D8A",
                                    }}
                                    type="button"
                                    id="dropdownMenuButton"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    <i className="bi bi-sort-up"></i> Sort
                                </button>
                                <div
                                    className="dropdown-menu"
                                    aria-labelledby="dropdownMenuButton"
                                >
                                    <div
                                        className="dropdown-item"
                                        onClick={() => sortHandler("exp")}
                                    >
                                        Experience
                                        {sort.exp === "default" ? (
                                            <></>
                                        ) : sort.exp === "asc" ? (
                                            <i className="bi bi-arrow-up"></i>
                                        ) : (
                                            <i className="bi bi-arrow-down"></i>
                                        )}
                                    </div>
                                    <div
                                        className="dropdown-item"
                                        onClick={() => sortHandler("fees")}
                                    >
                                        Fees
                                        {sort.fees === "default" ? (
                                            <></>
                                        ) : sort.fees === "asc" ? (
                                            <i className="bi bi-arrow-up"></i>
                                        ) : (
                                            <i className="bi bi-arrow-down"></i>
                                        )}
                                    </div>
                                    <div
                                        className="dropdown-item"
                                        onClick={() => sortHandler("rating")}
                                    >
                                        rating
                                        {sort.rating === "default" ? (
                                            <></>
                                        ) : sort.rating === "asc" ? (
                                            <i className="bi bi-arrow-up"></i>
                                        ) : (
                                            <i className="bi bi-arrow-down"></i>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{ padding: "2%" }}>
                        <div className="row">
                            {doctors.map((doctor, indx) => {
                                return (
                                    <div className="col-xl-6 mb-4" key={indx}>
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div className="d-flex align-items-center">
                                                        <img
                                                            src={doctor.profilePic}
                                                            alt=""
                                                            style={{
                                                                width: "100px",
                                                                height: "100px",
                                                                padding: "5%",
                                                            }}
                                                            className="rounded-circle"
                                                        />
                                                        <div className="ms-3">
                                                            <p
                                                                className="mb-1 font-weight-bold text-info"
                                                                style={{
                                                                    fontFamily: "Noto Sans, sans-serif",
                                                                    fontSize: "20px",
                                                                }}
                                                            >
                                                                {doctor.name}
                                                            </p>
                                                            <p
                                                                className="font-weight-normal text-dark mb-0"
                                                                style={{
                                                                    fontFamily: "Noto Sans, sans-serif",
                                                                    fontSize: "12px",
                                                                }}
                                                            >
                                                                {doctor.spec}
                                                            </p>
                                                            <p
                                                                className="font-weight-normal text-dark mb-0"
                                                                style={{
                                                                    fontFamily: "Noto Sans, sans-serif",
                                                                    fontSize: "12px",
                                                                }}
                                                            >
                                                                {doctor.exp} years Experience
                                                            </p>
                                                            <p
                                                                className="font-weight-normal text-muted mb-0"
                                                                style={{
                                                                    fontFamily: "Noto Sans, sans-serif",
                                                                    fontSize: "12px",
                                                                }}
                                                            >
                                                                {doctor.qualification}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <span className="badge rounded-pill badge-success">
                            Fess ₹{doctor.fees}/-
                          </span>
                                                </div>
                                            </div>
                                            <div className="card-footer border-0 bg-light p-2 d-flex justify-content-around">
                                                <div className="row">
                                                    <div className="col-12">
                                                        <button
                                                            type="button"
                                                            className="btn btn-secondary btn-lg btn-block"
                                                            data-toggle="modal"
                                                            data-target={"#book" + doctor._id}
                                                            style={{
                                                                fontFamily: "Noto Sans, sans-serif",
                                                                fontSize: "14px",
                                                            }}
                                                        >
                                                            <i className="bi bi-camera-video-fill"></i> Book
                                                            Video Consult
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <Modal slots={doctor.appointment} doctor_id={doctor._id} />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}

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