

export default function Index({ state, handleSubmit,handleInputChange,error })
{
    return(
        <>
            <form onSubmit = {handleSubmit}>
                <div style={{textAlign: "center" ,padding: "4%"}}>

                    <h1 className="display-6" style={{fontFamily: "Lucida Console, Courier New, monospace"}}>Your Details</h1>


                    <hr/>

                </div>
                <div className="form-group">
                    <div className="row">
                        <div className="col-1">
                            <i className="bi bi-person-fill"></i>
                        </div>
                        <div className="col-10">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Name"
                                name="name"
                                value={state.name}
                                onChange={handleInputChange}

                            ></input>
                            {error.name && <p className="text-danger" style={{margin:"0"}}>{error.name}</p>}
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="row">
                        <div className="col-1">
                            <i className="fas fa-envelope ic "></i>
                        </div>
                        <div className="col-10">
                            <input
                                type="email"
                                className="form-control signupi"
                                id="email"
                                name="email"
                                placeholder="Enter Your Email Address"
                                value={state.email}
                                onChange={handleInputChange}

                            />
                            {error.email && <p className="text-danger" style={{margin:"0"}}>{error.email}</p>}
                        </div>
                    </div>
                </div>



                <div className="form-group">
                    <div className="row">
                        <div className="col-1">
                            <i className="bi bi-calendar-date-fill "></i>
                        </div>
                        <div className="col-10">
                            <input
                                type="date"

                                className="form-control"
                                placeholder="D.O.B"
                                name="dob"
                                value={state.dob}
                                onChange={handleInputChange}
                            ></input>
                            {error.dob && <p className="text-danger" style={{margin:"0"}}>{error.dob}</p>}
                        </div>
                    </div>
                </div>


                <div className="form-row">
                    <div className="form-group col-md-7">
                        <label >City
                        <input type="text" className="form-control" id="inputCity" value={state.city}
                               onChange={handleInputChange} name="city"/>
                            {error.city && <p className="text-danger" style={{margin:"0"}}>{error.city}</p>}
                        </label>
                    </div>
                    <div className="form-group col-md-5">
                        <label >State
                        <select id="inputState" className="form-control" value={state.state}
                                onChange={handleInputChange} name="state">

                            <option value="">Select state</option>
                            <option value="AN">Andaman and Nicobar Islands</option>
                            <option value="AP">Andhra Pradesh</option>
                            <option value="AR">Arunachal Pradesh</option>
                            <option value="AS">Assam</option>
                            <option value="BR">Bihar</option>
                            <option value="CH">Chandigarh</option>
                            <option value="CT">Chhattisgarh</option>
                            <option value="DN">Dadra and Nagar Haveli</option>
                            <option value="DD">Daman and Diu</option>
                            <option value="DL">Delhi</option>
                            <option value="GA">Goa</option>
                            <option value="GJ">Gujarat</option>
                            <option value="HR">Haryana</option>
                            <option value="HP">Himachal Pradesh</option>
                            <option value="JK">Jammu and Kashmir</option>
                            <option value="JH">Jharkhand</option>
                            <option value="KA">Karnataka</option>
                            <option value="KL">Kerala</option>
                            <option value="LA">Ladakh</option>
                            <option value="LD">Lakshadweep</option>
                            <option value="MP">Madhya Pradesh</option>
                            <option value="MH">Maharashtra</option>
                            <option value="MN">Manipur</option>
                            <option value="ML">Meghalaya</option>
                            <option value="MZ">Mizoram</option>
                            <option value="NL">Nagaland</option>
                            <option value="OR">Odisha</option>
                            <option value="PY">Puducherry</option>
                            <option value="PB">Punjab</option>
                            <option value="RJ">Rajasthan</option>
                            <option value="SK">Sikkim</option>
                            <option value="TN">Tamil Nadu</option>
                            <option value="TG">Telangana</option>
                            <option value="TR">Tripura</option>
                            <option value="UP">Uttar Pradesh</option>
                            <option value="UT">Uttarakhand</option>
                            <option value="WB">West Bengal</option>
                        </select>
                            {error.state && <p className="text-danger" style={{margin:"0"}}>{error.state}</p>}
                        </label>
                    </div>

                </div>
                <div className="form-group">
                    <div className="row">
                        <div className="col-1">
                            <i className="bi bi-people-fill "></i>
                        </div>
                        <div className="col-10">
                            <select className="form-control" value={state.gender}
                                    onChange={handleInputChange} name="gender">
                                <option value="none"  selected>Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                            {error.gender && <p className="text-danger" style={{margin:"0"}}>{error.gender}</p>}
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="row">
                        <div className="col-1">
                            <i className="fa-solid fa-book-medical"></i>
                        </div>
                        <div className="col-10">
                  <textarea
                      className="form-control"

                      style={{ width: "100%", height: "70px" }}
                      placeholder="Past Medical History we should know"
                      value={state.history}
                      onChange={handleInputChange} name="history"
                  ></textarea>
                        </div>
                    </div>
                </div>

                <div style={{textAlign:"center"}}>
                    <button type="submit" className="btn btn-dark btn-lg">Register</button>
                </div>

            </form>
        </>

    )
}