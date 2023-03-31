import axios from "axios";
import { useRef, useState } from "react";
import Typewriter from "typewriter-effect";
import {SERVER_URL} from "../../constants"

export default function ContactUs() {
  return <ContactForm />;
}

function ContactForm() {
  const [data, setData] = useState({
    name: "",
    email: "",
    phonenumber: "",
    query: "",
  });
  const [status, setStatus] = useState("default");
  const email = useRef()
  const phonenumber = useRef()
  const name = useRef()
  const query = useRef()

  function ValidateEmail(x) {
    let atposition = x.indexOf("@");
    let dotposition = x.lastIndexOf(".");
    if (
      atposition < 1 ||
      dotposition < atposition + 2 ||
      dotposition + 2 >= x.length
    ) {
      email.current.focus();
      email.current.style["box-shadow"] = "0 0 10px red";
      email.current.style["background"] =
        "url(https://assets.digitalocean.com/labs/icons/exclamation-triangle-fill.svg) no-repeat 95% 50%";
      setTimeout(() => {
        email.current.style["box-shadow"] = "";
        email.current.style["background"] = "";
      }, 5000);
      return false;
    } else {
      return true;
    }
  }

  const validatePhone = (x,num) => {
      if(x.length > 0  && x.length < num)
        return true
      if(x.length > 0){
         for (let i = 0; i < num; i++) {
           if (x[i] < "0" && x[i] > "9") 
            return true;
         }
         return false;
      }
      return true;
    }

  const submithandler = (e) => {
    e.preventDefault();
    let temp = validatePhone(data.phonenumber,10)

    if(data.name === ""){
      name.current.focus();
      name.current.style["box-shadow"] = "0 0 10px red";
      name.current.style["background"] =
        "url(https://assets.digitalocean.com/labs/icons/exclamation-triangle-fill.svg) no-repeat 95% 50%";
      setTimeout(() => {
          name.current.style["box-shadow"] = "";
          name.current.style["background"] = "";
      }, 5000);
    }

    if(data.query === ""){
       query.current.focus();
       query.current.style["box-shadow"] = "0 0 10px red";
       query.current.style["background"] =
         "url(https://assets.digitalocean.com/labs/icons/exclamation-triangle-fill.svg) no-repeat 95% 90%";
       setTimeout(() => {
         query.current.style["box-shadow"] = "";
         query.current.style["background"] = "";
       }, 5000);
    }

    if(temp === true){
      phonenumber.current.focus();
      phonenumber.current.style["box-shadow"] = "0 0 10px red";
      phonenumber.current.style["background"] =
        "url(https://assets.digitalocean.com/labs/icons/exclamation-triangle-fill.svg) no-repeat 95% 50%";
      setTimeout(() => {
        phonenumber.current.style["box-shadow"] = "";
        phonenumber.current.style["background"] = "";
      }, 5000);
    }
    if(ValidateEmail(data.email) &&  temp !== true && data.name !== "" && data.query !== ""){
       axios.post(`${SERVER_URL}/contact-us`,{...data}).then((resp) => {
        setStatus("Successful");
        setData({
          name: "",
          email: "",
          phonenumber: "",
          query: "",
        });
        setTimeout(() => {
          setStatus("default");
        }, 10000);
       })
    }
  };

  const handle = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  if (status === "default") {
    return (
      <section id="contact_us" style={{ backgroundColor: "white" }}>
        <div className="container-fluid cont">
          <h1 className="work">Drop Us a Message/Grievance</h1>

          <div className="row">
            <div className="col padd">
              <form onSubmit={(e) => submithandler(e)}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control contact-us-input"
                        placeholder="Your Email *"
                        name="email"
                        value={data.email}
                        onChange={(e) => handle(e)}
                        ref={email}
                      />
                    </div>

                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control contact-us-input"
                        placeholder="Your Name *"
                        value={data.name}
                        name="name"
                        onChange={(e) => handle(e)}
                        ref={name}
                      />
                    </div>

                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control contact-us-input"
                        placeholder="Your Phone Number *"
                        name="phonenumber"
                        value={data.phonenumber}
                        onChange={(e) => handle(e)}
                        ref={phonenumber}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <textarea
                        className="form-control contact-us-input"
                        placeholder="Feel free to drop us a suggestion/grievance"
                        style={{ width: "100%", height: "200px" }}
                        name="query"
                        value={data.query}
                        onChange={(e) => handle(e)}
                        ref={query}
                      ></textarea>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4"></div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <button className="btn contbtn" type="submit">
                        Send Message
                      </button>
                    </div>
                  </div>
                  <div className="col-md-4"></div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  } else {
    return (
      <div
        className="container"
        style={{
          fontFamily: "sans-serif",
          fontWeight: "500",
          paddingTop : "120px",
          marginBottom : "70px",
          fontSize: "40px",
          textAlign: "center",
        }}
      >
        <Typewriter
          onInit={(typewriter) => {
            typewriter
              .typeString("Message Received")
              .pauseFor(1000)
              .deleteAll()
              .typeString("We'll look into the Issue")
              .start();
          }}
        ></Typewriter>
      </div>
    );
  }
}
