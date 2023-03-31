import "./admin.css"
import axios from 'axios'
import { React, useEffect, useState } from 'react'
import { SERVER_URL } from "../../constants"
import file from './docc.jfif';
const handleDownloadPNG = () => {
  const link = document.createElement('a');
  link.href = file;
  link.download = 'my-image.png';
  link.click();
};
export default function TableThree() {
  function deleteDoctor(id) {
    console.log("Called delete function",id)
    const { jwtToken } = JSON.parse(localStorage.getItem("items"));

    axios.delete(`http://localhost:5000/admin/verifieddoctors/${id}`,{
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    })
    .then(response => {
      console.log(response);
      getogDoctors()
    })
    .catch(error => {
      console.log(error);
    });
     
  }
  function deletePatient(id) {
    console.log("Called delete function",id)
    const { jwtToken } = JSON.parse(localStorage.getItem("items"));

    axios.delete(`http://localhost:5000/admin/patients/${id}`,{
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    })
    .then(response => {
      console.log(response);
      getPatients()
    })
    .catch(error => {
      console.log(error);
    });
     
  }
  let [res, setRes] = useState([])
  let [patientres, setpatientRes] = useState([])
  useEffect(() => {
    getogDoctors()
    getPatients()

  }, [])
  
  function getogDoctors() {
    const { jwtToken } = JSON.parse(localStorage.getItem("items"));
    axios.get(SERVER_URL +"/admin/verifieddoctors",{
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }).then(res => {
      setRes(res.data.doctors)
      console.log(res.data.doctors);
    })
  }
  function getPatients() {
    const { jwtToken } = JSON.parse(localStorage.getItem("items"));
    axios.get(SERVER_URL +"/admin/patients",{
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }).then(res => {
      setpatientRes(res.data.patients)
      console.log(res.data.patients);
    })
  }

  if (res !== "default") {
    return (
      <div className="removeDoctor" id="tb3">
        <div className="rem">
          <h1>Remove Doctors and Patients</h1>
        </div>
        <br />
        <table className="table" id="table3">
          <tbody>
            {
                res.map((doctor, index) => {
                return (
                  <tr key={index}>
                <td>
                <div class="row">
                  <div class="column">
                  <img 
                   src={doctor.profilePic}
                  style={{ width: "150px",marginRight:'100px',marginLeft:'40px' }}/>
                  
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
                      <button onClick={() => deleteDoctor(doctor._id)} style={{fontSize: '20px', padding: '8px',color: 'white', borderRadius: '10px',backgroundColor:'red'}}>
                       Remove Doctor
                      </button>
                  </div>
                  <div class="column">
                     <div style={{ display: 'flex',marginTop:'50px',marginLeft:'100px' }}>
                         <i class="bi bi-patch-check-fill" style={{marginRight:'10px'}}></i>
                          <p style={{ fontSize: "15px", color: "black" }}>Verified</p><br/>
                      </div>
                      <div style={{ display: 'flex',marginTop:'08px',marginLeft:'100px' }}>
                         <i class='fas fa-address-book' style={{marginRight:'10px'}}></i>
                          <p style={{ fontSize: "15px", color: "black" }}>{doctor.reg}</p>
                      </div>
                  </div>
                </div>
                <br/>
                </td>
                </tr>
                )
              })
            }
            <br/>
              {
                patientres.map((patient, index) => {
                  return (
                    <tr key={index}>
                  <td>
                  <div class="row">
                    <div class="column">
                    <img 
                     src={patient.profilePic}
                    style={{ width: "150px",marginRight:'100px',marginLeft:'40px' }}/>
                    
                    </div>
                    <div class="column">
                      
                      <div style={{ display: 'flex' }}>
                             <i class="bi bi-person-fill" style={{marginRight:'10px'}}></i>
                             <p style={{ fontSize: "20px", color: "black" }}>{patient.name}</p>
                      </div>
                      <div style={{ display: 'flex' }}>
                             <i class="bi bi-envelope-fill" style={{marginRight:'10px'}}></i>
                             <p style={{ fontSize: "15px", color: "black" }}>{patient.email}</p><br/>
                      </div>
                      <div style={{ display: 'flex' }}>
                           <i class="bi bi-telephone-fill" style={{marginRight:'10px'}}></i>  
                            <p style={{ fontSize: "15px", color: "black" }}>{patient.number}</p><br/>
                        </div>
                        <button onClick={() => deletePatient(patient._id)} style={{fontSize: '20px', padding: '8px',color: 'white', borderRadius: '10px',backgroundColor:'red'}}>
                         Remove patient
                        </button>
                    </div>
                    <div class="column">
                       <div style={{ display: 'flex',marginTop:'50px',marginLeft:'100px' }}>
                            <span class="bi bi-clock-history" style={{marginRight:'10px'}}></span>            
                            <p style={{ fontSize: "15px", color: "black" }}>{patient.history}</p><br/>
                        </div>
                        <div style={{ display: 'flex',marginTop:'08px',marginLeft:'100px' }}>
                            <i class="bi bi-geo-alt-fill" style={{marginRight:'10px'}}></i>
                            
                            <p style={{ fontSize: "15px", color: "black" }}>{patient.city}</p>
                        </div>
                    </div>
                  </div>
                  <br/>
                  </td>
                  </tr>
                  )
                })
              }
            
          </tbody>
        </table>

        <br /> <br />
      </div>
    )
  } else {
    return <p>hh</p>
  }
}