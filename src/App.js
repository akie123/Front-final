import Home from './pages/home/index'
import Signin from './pages/signin/index'
import Patient from './pages/PatientPortal'
import Doctor from './pages/DoctorPortal'
import Admin from "./pages/admin/index"
import Signup1 from './pages/signup1'
import SignupD from './pages/signupD'
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export const UserContext = React.createContext()

function App() {
  const [data,setData] = useState({})
  return (
      <UserContext.Provider value={{data,setData}}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<Signin />}  />
            <Route path="/signup/patient" element={<Signup1 />} />
            <Route path="/signup/doctor" element={<SignupD />} />
            <Route path='/patientportal' element={<Patient/>}/>
            <Route path='/doctorportal' element={<Doctor/>}></Route>
            <Route path='/admin' element={<Admin/>}></Route>
            {/*<Route path='/forget' element={<ForgotPassword/>}></Route>*/}
          </Routes>
        </Router>
      </UserContext.Provider>
  );
}

export default App;