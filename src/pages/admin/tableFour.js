import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { queries } from '@testing-library/react';
import {SERVER_URL} from "../../constants"

const TableFour = () => {
  const [docdata, setdocdata] = useState([]);
  const [ogdocdata, setogdocdata] = useState([]);
  const [patdata, setpatData] = useState([]);
  const [querydata,setQueryData]=useState([]);

  useEffect(() => {
    const { jwtToken } = JSON.parse(localStorage.getItem("items"));
    fetch(`${SERVER_URL}/admin/doctors`,{
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    })
        .then(response => response.json())
        .then(docdata => setdocdata(docdata))
        .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    const { jwtToken } = JSON.parse(localStorage.getItem("items"));
    fetch(`${SERVER_URL}/admin/verifieddoctors`,{
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    })
        .then(response => response.json())
        .then(ogdocdata => setogdocdata(ogdocdata))
        .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    const { jwtToken } = JSON.parse(localStorage.getItem("items"));
    fetch(`${SERVER_URL}/admin/patients`,{
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    })
        .then(response => response.json())
        .then(patdata => setpatData(patdata))
        .catch(error => console.error(error));
  }, []);
  useEffect(() => {
    const { jwtToken } = JSON.parse(localStorage.getItem("items"));
    fetch(`${SERVER_URL}/admin/queries`,{
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    })
        .then(response => response.json())
        .then(querydata => setQueryData(querydata))
        .catch(error => console.error(error));
  }, []);


  var numOfQueries=0
  var totalogdoctors = 0
  var totalPatients=0
  var totaldoctors=0
  var numOfAppointments=0


  const patientsArray=patdata.patients
  for (const key in patientsArray) {
    if (patientsArray[key]!= "") {
      totalPatients=totalPatients+1;
    }
  }

  const queriesArray=querydata.queries
  for (const key in queriesArray) {
    if (queriesArray[key]!= "") {
      numOfQueries=numOfQueries+1;
    }
  }

  const ogdoctorsArray=ogdocdata.doctors
  for (const key in ogdoctorsArray) {
    if (ogdoctorsArray[key]!= "") {
      totalogdoctors=totalogdoctors+1;
    }
  }
  const doctorsArray=docdata.doctors
  for (const key in doctorsArray) {
    if (doctorsArray[key]!= "") {
      totaldoctors=totaldoctors+1;
    }
  }
  const appointmentsArray=ogdocdata.doctors
  for (const key in appointmentsArray) {
    if (appointmentsArray[key]!= "") {
      for(const key2 in appointmentsArray[key].appointment){
        if(appointmentsArray[key].appointment[key2]!= ""){
          numOfAppointments=numOfAppointments+1;
        }
      }

    }
  }
  const data = {
    labels: ['Doctors', 'Patients'],
    datasets: [
      {
        label: 'Number of doctors and Patients',
        data: [totalogdoctors, totalPatients],
        backgroundColor: 'violet',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const datatwo = {
    labels: ['Doctors', 'VerifiedDoctors'],
    datasets: [
      {
        label: 'Number of doctors signed in and verified',
        data: [totaldoctors, totalogdoctors],
        backgroundColor: 'violet',
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

  return (
      <>
        <h1 style={{ marginLeft: '100px' }}>Statistics</h1>
        <div style={{ marginTop: '100px' }}>
          <p style={{ marginLeft: '200px', marginTop: '50px' }}>Number of appointments: {numOfAppointments}</p>
          <p style={{ marginLeft: '200px', marginTop: '50px' }}>Number of doctors verified: {totalogdoctors}</p>
          <p style={{ marginLeft: '200px', marginTop: '50px' }}>Number of Queries: {numOfQueries}</p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap',marginLeft:'100px' }}>
          <Bar data={data} options={options} style={{ height: '350px', width: '400px', marginLeft: '100px' }} />
          <Bar data={datatwo} options={options} style={{ height: '350px', width: '400px', marginLeft: '200px' }} />
        </div>
      </>
  );

};


export default TableFour;