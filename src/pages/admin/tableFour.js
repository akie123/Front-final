import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const TableFour = () => {
  const [docdata, setdocData] = useState([]);
  const [patdata, setpatData] = useState([]);
  const [querydata,setQueryData]=useState([]);

  useEffect(() => {
    const { jwtToken } = JSON.parse(localStorage.getItem("items"));

    fetch('http://localhost:5000/admin/doctors')
      .then(response => response.json())
      .then(docdata => setdocData(docdata))
      // .then(console.log(docdata))
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    const { jwtToken } = JSON.parse(localStorage.getItem("items"));

    fetch('http://localhost:5000/admin/patients')
      .then(response => response.json())
      .then(patdata => setpatData(patdata))
      // .then(console.log(patdata))
      .catch(error => console.error(error));
  }, []);
  useEffect(() => {
    const { jwtToken } = JSON.parse(localStorage.getItem("items"));

    fetch('http://localhost:5000/admin/queries')
      .then(response => response.json())
      .then(querydata => setQueryData(querydata))
      // .then(console.log(querydata))
      .catch(error => console.error(error));
  }, []);

  // console.log(docdata.length);
  // console.log(patdata.length);

  var numberOfApp=0
  var numOfQueries=0
  var totaldoctors = 0
  var totalPatients=0
  for (const key in docdata) {
    if (docdata[key].appointmet!= "") {
    numberOfApp=+1;
    }
  }
  for (const key in querydata) {
    if (querydata[key]!= "") {
    numOfQueries=+1;
    }
  }
  for (const key in docdata) {
    if (docdata[key]!= "") {
      totaldoctors=+1;
    }
  }

  const patientsArray=patdata.patients
  console.log(patientsArray);
  for (const key in patientsArray) {
    if (patientsArray[key]!= "") {
      totalPatients=totalPatients+1;
    }
  }
  console.log(totalPatients);
 
  const data = {
    labels: ['Doctors', 'Patients'],
    datasets: [
      {
        label: 'Number of doctors and Patients',
        data: [totaldoctors, totalPatients],
        backgroundColor: 'orange',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };
  
  const options = {
    animation: false,
    scales: {
      y: {
        beginAtZero: true,
      },
      x: {
        category: true,
      },
    },
    maintainAspectRatio: false,
    responsive: false,
    barThickness: 18
  };

  return(
    <>
    <h1 style={{marginLeft:'100px'}}>Statistics</h1>
    <div style={{marginTop:'100px'}}>
    <p style={{marginLeft:'200px',marginTop:'50px'}}>Number of Appointments:{numberOfApp}</p>
    <p style={{marginLeft:'200px',marginTop:'50px'}}>Number of Queries:{numOfQueries}</p>
    <p style={{marginLeft:'200px',marginTop:'50px'}}>Number of Bookings:{totalPatients}</p>
    </div>

    <Bar data={data} options={options} style={{ height: '350px', width: '400px',marginLeft:'850px',marginBottom:'300px'}}/>
    
    </>
    
  ) ;
};


export default TableFour;
