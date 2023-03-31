import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import emailjs from "@emailjs/browser";
import axios from "axios";

function App() {

  const form = useRef() 
  const email_ref = useRef() 
  const [email,setemail] = useState("");
  const [password,setPassword] = useState(""); 
  
  function ValidateEmail(x) {
    let atposition = x.indexOf("@");
    let dotposition = x.lastIndexOf(".");
    if (
      atposition < 1 ||
      dotposition < atposition + 2 ||
      dotposition + 2 >= x.length
    ) {
      email_ref.current.focus();
      email_ref.current.style["box-shadow"] = "0 0 10px red";
      email_ref.current.style["background"] =
        "url(https://assets.digitalocean.com/labs/icons/exclamation-triangle-fill.svg) no-repeat 95% 50%";
      setTimeout(() => {
        email_ref.current.style["box-shadow"] = "";
        email_ref.current.style["background"] = "";
      }, 5000);
      return false;
    } else {
      return true;
    }
  }

  const sendEmail = async (e) => {
    e.preventDefault();
    console.log(e.target);

    if(ValidateEmail(email)){
        let resp = await axios.get(`http://localhost:5000/patients?email=${email}`)
        if(resp.data.length === 0)
            resp = await axios.get(`http://localhost:5000/doctors?email=${email}`);
        if(resp.data.length == 0){
            Swal.fire({
              icon: "error",
              title: "Oops.. Email Not found",
            });
            setemail("");
        }
        else{
            setPassword(resp.data[0].password)
        }
    }
  };

  useEffect(() => {
    if(password != ""){
      emailjs
        .sendForm(
          "service_yfkx7nc",
          "template_7z08u5g",
          form.current,
          "GLvxbVqjLKlm2S0Od"
        )
        .then(
          (result) => {
            console.log(form.current)
             Swal.fire({
               icon: "success",
               title: "Password sent to your mail",
             });
             setemail("");
          },
          (error) => {
             Swal.fire({
               icon: "error",
               title: "Oops.. Unable to send email",
             });
             setemail("");
          }
        );
    }
  },[password])

  return (
    <div
      className="container-fluid"
      style={{ backgroundColor: "#655D8A", height: "100vh", paddingTop: "12%" }}
    >
      <div
        style={{
          backgroundColor: "white",
          width: "700px",
          height: "400px",
          paddingTop: "2%",
          borderRadius: "10px",
        }}
        className="container"
      >
        <center>
          <i className="fa-solid fa-lock icon" style={{ fontSize: "50px" }}></i>
        </center>
        <h2 style={{ textAlign: "center", marginTop: "10px" }}>
          Forgot Password?
        </h2>
        <p style={{ textAlign: "center", marginTop: "0px" }}>
          No worries,we've got you covered
        </p>
        <br />
        <form ref={form} onSubmit={(e) => sendEmail(e)}>
          <div className="row">
            <div className="col-12">
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Enter Email"
                value={email}
                onChange = {(e) => {
                    setemail(e.target.value)
                }}
                ref={email_ref}
              ></input>
            </div>
          </div>
          <p style={{ color: "grey", fontSize: "12px", marginLeft: "10px" }}>
            New Password will be sent to your mail
          </p>
          <br />
          <input
            type="password"
            name="password"
            style={{ display: "none" }}
            value={password}
            className="form-control"
          ></input>
          <br />
          <button className="btn" type="submit" style={{ marginLeft: "42%" }}>
            submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;