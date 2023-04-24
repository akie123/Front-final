import axios from "axios";
import { React, useEffect, useState } from "react";
import emailjs from "emailjs-com"
import { SERVER_URL } from "../../constants";
import img1 from './person.png';


export default function TableOne() {
  function deleteQuery(id) {
    console.log("this is id",id);
    let { jwtToken } = JSON.parse(localStorage.getItem("items"));
    axios.get(`${SERVER_URL}/admin/queries/${id}`,{
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }).then(resp => {
      console.log(resp.data);
      const solutionTextarea = document.getElementById(`solution${id}`);
      if (solutionTextarea !== null) {
        resp.data.solution = solutionTextarea.value;
      } else {
        console.error(`Textarea with ID 'solution${id}' not found`);
      }
      console.log(resp.data)
      emailjs.send('service_qdk26kq', 'template_e03mhe9', resp.data, 'S3FizJZT73PoNz-yc')
          .then((result) => {
            console.log(result);
            console.log(result.text);
            console.log("Called delete function",id)
            axios.delete(`${SERVER_URL}/admin/queries/${id}`,{
              headers: {
                Authorization: `Bearer ${jwtToken}`,
              },
            })
                .then(response => {
                  console.log(response);
                  setRes(prevRes => prevRes.filter(query => query._id !== id));
                })
                .catch(error => {
                  console.log(error);
                });
          }, (error) => {
            console.log(error.text);
          });
    });
  }

  // function deleteQuery(id) {
  //   const solutionTextarea = document.getElementById(`solution${id}`);
  //   if (solutionTextarea === null) {
  //     console.error(`Textarea with ID 'solution${id}' not found`);
  //     return;
  //   }
  //   const solution = solutionTextarea.value;

  //   const { jwtToken } = JSON.parse(localStorage.getItem('items'));

  //   axios
  //     .post(
  //       `http://localhost:5000/admin/queries/${id}/send-email`,
  //       { solution },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${jwtToken}`,
  //         },
  //       }
  //     )
  //     .then(() => {
  //       console.log('Email sent and object deleted');
  //       setRes((prevRes) => prevRes.filter((query) => query._id !== id));
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }


  const [res, setRes] = useState([]);

  useEffect(() => {
    getQueries();
  }, []);

  function getQueries() {
    const { jwtToken } = JSON.parse(localStorage.getItem("items"));
    console.log(jwtToken)
    axios.get(`${SERVER_URL}/admin/queries`,{
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }).then((res) => {
      setRes(res.data.queries);
    });
  }

  if (res !== "default") {
    return (
        <div className="removePatientquery" id="tb1">
          <div className="q">
            <h1>Queries</h1>
          </div>
          <br />
          <br />
          <table className="table">
            <tbody>
            { res.length>0 && res.map((queri, index) => {
              return (
                  <tr  key={index}>
                    <td>
                      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <img src={img1} style={{ width: "150px",marginRight:'100px',marginLeft:'100px' }} alt="Logo" />
                        <div>
                          <p style={{ fontSize: "20px", color: "black",fontStyle:'bold' }}>{queri.name}</p>
                          <div style={{ display: 'flex' }}>
                            <i class="bi bi-envelope-fill" style={{marginRight:'10px'}}></i>
                            <p style={{ fontSize: "15px", color: "black" }}>{queri.email}</p><br/>
                          </div>

                          <div style={{ display: 'flex' }}>
                            <i class="bi bi-question-diamond-fill" style={{marginRight:'10px'}}></i>
                            <p style={{ fontSize: "15px", color: "black" }}>{queri.query}</p><br/>
                          </div>


                          <textarea id={`solution${queri._id}`} rows="3" cols="100" placeholder='write solution'/><br/>

                          <button onClick={() => deleteQuery(queri._id)} style={{fontSize: '20px', padding: '8px',color: 'white', borderRadius: '10px',backgroundColor:'#6f42c1'}}>
                            send mail
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
              );
            })}
            </tbody>

          </table>

          <br /> <br />
        </div>
    );
  } else {
    return <>h</>;
  }
}