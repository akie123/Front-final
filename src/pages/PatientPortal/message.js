import { useContext } from "react";
import { PatientContext } from ".";


export default function Message() {

  const {msgs,setMsgs} = useContext(PatientContext)  

  const markasread = (id) => {
    let temp = msgs.filter((msg) => msg.id !== id)
    setMsgs(temp)
  }

  return (
    <div
      style={{ backgroundColor: "#eee", height: "100vh", paddingTop: "50px" }}
      className="container-fluid"
    >
      {msgs.map((msg) => {
        return (
          <div
            className="container"
            style={{
              paddingTop: "20px",
              backgroundColor: "white",
              borderRadius: "10px",
              width: "70%",
              marginLeft: "0px",
              paddingBottom: "20px",
              marginBottom: "35px",
            }}
            key={msg.id}
          >
            <p style={{ padding: "1%", color: "black" }}>{msg.message}</p>

            <div className="row">
              <div className="col-8"></div>
              <div className="col-2">
                <button
                  style={{
                    color: "white",
                    marginLeft: "70%",
                    width: "110px",
                    borderRadius: "5px",
                    border: "0px",
                    paddingTop: "7px",
                    backgroundColor: "#4BB543",
                    height: "35px",
                  }}
                  onClick={() => markasread(msg.id)}
                >
                  <p style={{ color: "white", fontSize: "15px" }}>
                    Mark as Read
                  </p>
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}