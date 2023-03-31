import "./signup.css";

import Pat1 from "./firstP"
import Pat2 from "./secondP"
import Pat3 from "./thirdP"
import Pat4 from "./forthP"
import axios from 'axios';
import { userSchema} from "../../Validations/firstP";
import userSchema1 from "../../Validations/thirdP";
import React, { useState } from "react";
import Swal from 'sweetalert2'
import {SERVER_URL} from "../../constants"


export default function Index() {




    const [state, setState] = useState({
        password: "",
        passwordr: "",
        number: "",
        check: false,
        name: "",
        email:"",
        address:"",
        dob:"",
        city:"",
        state:"",
        gender:"",
        history:"",
        otp:""
    });
    const [page,setPage]= useState({
        page1 : "1",
        page2 :"0",
        page3:"0",
        page4:"0"

    })

    const pageChange = (number) => {

        setPage((prevProps) => ({
            ...prevProps,
            [`page${number}`]: "0",
            [`page${number+1}`]: "1"

        }));
    }

    const [error,setError]= useState({
        password:"",
        passwordr:"",
        number:"",
        check: "",
        name: "",
        email:"",
        address:"",
        dob:"",
        city:"",
        state:"",
        gender:""
    })




    const handleInputChange = (event) => {
        const { name, value } = event.target;
        console.log(state)
        if(name=="check")
        {
            setState((prevProps) => ({
                ...prevProps,
                ["check"]: event.target.checked
            }));
        }
        else {
            setState((prevProps) => ({
                ...prevProps,
                [name]: value
            }));
        }
        setError((prevProps) => ({
            ...prevProps,
            [name]: ""
        }));
    };

    const change = (path,message)=>{
        setError((prevProps) => ({
            ...prevProps,
            [path]: message
        }));
    }

    const handleSubmit2 = async (event) => {
        event.preventDefault();

        await userSchema1.validate({
            name: state.name,
            email:state.email,
            dob:state.dob,
            city:state.city,
            state:state.state,
            gender:state.gender
        },{ abortEarly: false }).then(async() => {
            axios.get(`http://localhost:5000/register/email/${state.email}`)
                .then(response => {
                    if (response.data.check=="notfound") {
                        axios.post('http://localhost:5000/register/signP',state)
                            .then((res) => {
                                console.log(res.data)
                                pageChange(3)
                            }).catch((err)=>{
                            console.log(err)
                        })

                    } else {
                        setError((prevProps) => ({
                            ...prevProps,
                            ["email"]: "Email already exist"
                        }));

                    }
                })
                .catch(error => {
                    console.log(error);
                });


        }).catch(function (err) {
            console.log(err)
            err.inner.forEach(e => {
                change(e.path,e.message)
                console.log(e.message, e.path)
            });
        })

    };
    const handleSubmit1 = async (event) => {
        event.preventDefault();
        axios.post("http://localhost:5000/verify/verifycode", {
                number: state.number,
                code:state.otp
            }
        ).then((data) => {

            if(data.data.check=="approved")
            {
                Swal.fire({
                    icon: 'success',
                    text: 'Number Verified Successfully',

                })
                pageChange(2)
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Invalid Otp',


                })
            }


        })




    };
    const handleSubmit = async (event) => {
        event.preventDefault();

        await userSchema.validate({
            password:state.password,
            passwordr:state.passwordr,
            number:state.number,
            check:state.check
        },{ abortEarly: false }).then(async() => {

            axios.get(`http://localhost:5000/register/number/${state.number}`)
                .then(response => {

                    if (response.data.check=="notfound") {
                        axios.post("http://localhost:5000/verify/getcode", {
                                number: state.number,
                                channel: 'sms'
                            }
                        ).then((data) => {
                            Swal.fire({
                                icon: 'success',
                                text: 'Otp Send Successfully',

                            })
                            pageChange(1)

                        })
                            .catch((err) =>{
                                console.log(err)
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Oops...',
                                    text: 'Error in sending otp',

                                })
                            } );
                    } else {
                        setError((prevProps) => ({
                            ...prevProps,
                            ["number"]: "Number Already exist"
                        }));

                    }
                })
                .catch(error => {
                    console.log(error);
                });

        }).catch(function (err) {
            console.log(err)
            err.inner.forEach(e => {
                change(e.path,e.message)
                console.log(e.message, e.path)
            });
        })

    };



    return (
        // <div style={{ height: "100%" }} className="container-fluid">

        <section className="vh-100" style={{backgroundColor: "#eee",height: "100vh"}}>
            <div className="container h-100">
                <div id="okay"></div>
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-lg-12 col-xl-11">
                        <div className="card text-black" style={{borderRadius: "35x"}}>
                            <div className="row">
                                <div className="col-5 col-md-5" style={{padding:"3%"}}>
                                    <div className="card card-body">

                                        {page.page1=="1" &&  <Pat1 state={state} handleSubmit={handleSubmit}  handleInputChange={ handleInputChange} error={error}   /> }
                                        {page.page2=="1" &&  <Pat2 state={state} handleSubmit={handleSubmit1}  handleInputChange={ handleInputChange}/> }
                                        {page.page3=="1" &&   <Pat3 state={state} handleSubmit={handleSubmit2}  handleInputChange={ handleInputChange} error={error}   /> }
                                        { page.page4=="1" && <Pat4 /> }

                                        {/*<Pat2 state={state} handleSubmit={handleSubmit1}  handleInputChange={ handleInputChange}/>*/}

                                    </div>
                                </div>
                                <div className="col-md-7 col-lg-7 col-xl-7 d-flex align-items-center order-1 order-lg-2 ">
                                    {page.page4=="1" && <img src=" https://media.istockphoto.com/id/1271311350/vector/thank-you-ink-brush-vector-lettering-thank-you-modern-phrase-handwritten-vector-calligraphy.jpg?s=612x612&w=0&k=20&c=k50bI-VIGLno48xtby-RWr4TcFNUp-K38VMkn59_Cfw=" className="img-fluid" alt="Sample image"/>}
                                    {page.page4=="0" && <img src="https://cdn.pixabay.com/photo/2021/11/20/03/16/doctor-6810750_960_720.png" className="img-fluid" alt="Sample image"/>}
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>

        // </div>
    );
}
