import axios from "axios";
import { React, useEffect, useState } from "react";
import { SERVER_URL } from "../../constants";
import file from './docc.jfif';
// const handleDownloadPNG = () => {
//   const link = document.createElement('a');
//   link.href = file;
//   link.download = 'my-image.png';
//   link.click();
// };
export default function TableTwo() {
  
  const handleVerifyClick = (id) => {
    const { jwtToken } = JSON.parse(localStorage.getItem("items"));

    axios
      .put(`http://localhost:5000/admin/doctors/${id}`, { verified: true },{
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((response) => {
        console.log(response);
       // update the state of isVerified to true
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  let [res, setRes] = useState([]);
  useEffect(() => {
    getDoctors();
  }, []);
  function getDoctors() {
    const { jwtToken } = JSON.parse(localStorage.getItem("items"));
    axios.get(SERVER_URL+"/admin/doctors",{
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }).then((res) => {
      setRes(res.data.doctors);
    });
  }

  if (res !== "default") {
    return (
      <div className="accept" id="tb2">
        <div className="acc">
          <h1>Verify doctor</h1>
        </div>
        <br />
        <br />

        <table className="table">
          <tbody>
            {res.map((doctor, index) => {
              return (
                <tr key={index}>
                <td>
                <div class="row">
                  <div class="column">
                  <img 
                  src={doctor.profilePic}
                  style={{ width: "150px",marginRight:'100px',marginLeft:'100px' }}/>
                  
                  </div>
                  <div class="column">
                    
                    <div style={{ display: 'flex' }}>
                           <i class="bi bi-person-fill" style={{marginRight:'10px'}}></i>
                           <p style={{ fontSize: "20px", color: "black" }}>{doctor.name}</p>
                    </div>
                    <div style={{ display: 'flex' }}>
                           <i class="bi bi-envelope-fill" style={{marginRight:'10px'}}></i>
                           <p style={{ fontSize: "15px", color: "black" }}>{doctor.email}</p><br/>
                    </div>
                    <div style={{ display: 'flex' }}>
                          <i class="bi bi-telephone-fill" style={{marginRight:'10px'}}></i>      
                          <p style={{ fontSize: "15px", color: "black" }}>{doctor.number}</p><br/>
                      </div>
                      <button onClick={() => handleVerifyClick(doctor._id)} style={{fontSize: '20px', padding: '8px',color: 'white', borderRadius: '10px',backgroundColor:'#6610f2'}}>
                       Accept Doctor
                      </button>
                  </div>
                  <div class="column">
                     <div style={{ display: 'flex',marginTop:'50px',marginLeft:'60px' }}>
                          <i class='fas fa-ban' style={{marginRight:'10px'}}></i>
                          <p style={{ fontSize: "15px", color: "black" }}>Not Verified</p><br/>
                      </div>
                      <div style={{ display: 'flex',marginTop:'08px',marginLeft:'60px' }}>
                          <i class='fas fa-address-book' style={{marginRight:'10px'}}></i>
                          <p style={{ fontSize: "15px", color: "black" }}>{doctor.reg}</p>
                      </div>
                  </div>
                </div>
                </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  } else {
    return <>h</>;
  }
}
