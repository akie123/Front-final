import { useState } from "react";
import { SERVER_URL } from "../../constants";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Index() {
    const navigate = useNavigate()

    const [state,setState] = useState({
        number: "",
        password: ""
    })

    const [error,setError] = useState({
        number: "",
        password: "",
        login : ""
    })

    const handleInputChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(`${SERVER_URL}/login`,state)
            .then(resp => {
                localStorage.setItem(
                    "items",
                    JSON.stringify({...resp.data})
                )
                if(resp.data.user === "patient")
                    navigate("/patientportal");
                else if(resp.data.user === "doctor")
                    navigate("/doctorportal");
                else
                    navigate("/admin");

            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <>
            <section
                className="vh-100"
                style={{ backgroundColor: "#eee", height: "100vh" }}
            >
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-lg-12 col-xl-11">
                            <div
                                className="card text-black"
                                style={{ borderRadius: "35x" }}
                            >
                                <div className="row">
                                    <div className="col-5 col-md-5" style={{ padding: "3%" }}>
                                        <div className="card card-body">
                                            <form onSubmit={handleSubmit}>
                                                <div style={{ textAlign: "center", padding: "4%" }}>
                                                    <h1
                                                        className="display-6"
                                                        style={{
                                                            fontFamily:
                                                                "Lucida Console, Courier New, monospace",
                                                        }}
                                                    >
                                                        Login
                                                    </h1>
                                                    <hr />
                                                    <div style={{ textAlign: "right" }}>
                                                        <footer className="blockquote-footer">
                                                            Don't have an account?{" "}
                                                            <cite title="Source Title">
                                                                <a href="/signup/patient">Register here</a>
                                                            </cite>
                                                        </footer>
                                                    </div>
                                                </div>
                                                <div className="row mb-4">
                                                    <div className="col-2">
                                                        <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                    </div>
                                                    <div className="col-10">
                                                        <input
                                                            name="number"
                                                            type="tel"
                                                            id="form3Example1c"
                                                            className="form-control"
                                                            value={state.number}
                                                            onChange={handleInputChange}
                                                            placeholder="Phone Number"
                                                        />
                                                        {error.number && (
                                                            <p
                                                                className="text-danger"
                                                                style={{ margin: "0" }}
                                                            >
                                                                {error.number}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="row mb-4">
                                                    <div className="col-2">
                                                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                    </div>
                                                    <div className="col-10">
                                                        <input
                                                            name="password"
                                                            type="password"
                                                            id="form3Example4c"
                                                            className="form-control"
                                                            value={state.password}
                                                            onChange={handleInputChange}
                                                            placeholder="Password"
                                                        />
                                                        {error.password && (
                                                            <p
                                                                className="text-danger"
                                                                style={{ margin: "0" }}
                                                            >
                                                                {error.password}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                                <div
                                                    className="d-flex justify-content-center mx-4 mb-3 mb-lg-4"
                                                    style={{ paddingTop: "9%" }}
                                                >
                                                    {error.login && (
                                                        <p
                                                            className="text-danger"
                                                            style={{ margin: "0" }}
                                                        >
                                                            {error.login}
                                                        </p>
                                                    )}
                                                    <button
                                                        type="submit"
                                                        className="btn btn-dark btn-lg"
                                                    >
                                                        Signin
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <div className="col-md-7 col-lg-7 col-xl-7 d-flex align-items-center order-1 order-lg-2 ">
                                        <img
                                            src="https://cdn.pixabay.com/photo/2021/11/20/03/16/doctor-6810750_960_720.png"
                                            className="img-fluid"
                                            alt="Sample image"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}