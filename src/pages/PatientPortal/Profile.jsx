import axios from "axios";
import { useState, React,useEffect } from "react";
import { UserContext } from "../../App";
import Swal from "sweetalert2";
import { SERVER_URL } from "../../constants";

const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

export default function Profile() {
  const [viewPassword, setViewPassword] = useState(false);
  const [state, setState] = useState({
    name: "",
    email: "",
    number: "",
    dob: "",
    city: "",
    state: "",
    history: "",
  });
  const [passState, setPassState] = useState({
    password: "",
    repassword: "",
  });
  const [ProfiePic, setProfilePic] = useState({
    profilePic:
        "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg",
  });

  const TogglePassword = () => {
    setViewPassword(!viewPassword);
  };

  const handler = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const passhandler = (e) => {
    setPassState({ ...state, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const { id, jwtToken } = JSON.parse(localStorage.getItem("items"));
    axios
        .get(`${SERVER_URL}/patient/${id}/getinfo`, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        })
        .then((resp) => {
          console.log(resp)
          setState({
            name: resp.data.name,
            email: resp.data.email,
            number: resp.data.number,
            dob: resp.data.dob,
            city: resp.data.city,
            state: resp.data.state,
            history: resp.data.history,
          })
          setProfilePic({
            profilePic: resp.data.profilePic
          })
        });
  }, []);

  const uploadPhoto = () => {
    const { id, jwtToken } = JSON.parse(localStorage.getItem("items"));
    axios
        .post(`${SERVER_URL}/patient/${id}/updatedp`, ProfiePic, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        })
        .then((resp) => {
          Swal.fire({
            title: "Success",
            text: "Profile Pic Updated",
            icon: "success",
          });
        });
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const Image = await convertToBase64(file);
    setProfilePic({ profilePic: Image });
  };

  const Submithandler = () => {
    const { id, jwtToken } = JSON.parse(localStorage.getItem("items"));
    console.log(state);
    axios
        .post(`${SERVER_URL}/patient/${id}/update`, state, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        })
        .then((resp) => {
          Swal.fire({
            title: "Success",
            text: "Info updated",
            icon: "success",
          });
        });
  };

  const PassSubmithandler = () => {
    const { id, jwtToken } = JSON.parse(localStorage.getItem("items"));
    axios
        .post(`${SERVER_URL}/patient/${id}/update`, state, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        })
        .then((resp) => {
          setPassState({
            password: "",
            repassword: "",
          });
          Swal.fire({
            title: "Success",
            text: "Password Updated",
            icon: "success",
          });
        });
  };

  return (
      <>
        <div style={{ width: "90%" }}>
          <div
              className="container-fluid rounded mt-5 mb-5"
              style={{ backgroundColor: "#F8F8F8", border: "1px solid black" }}
          >
            <div className="row">
              <div className="col-md-3 border-right">
                <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                  <label
                      className="mt-5"
                      htmlFor="img-upload"
                      style={{ cursor: "pointer" }}
                  >
                    <img
                        className="rounded-circle"
                        width="150px"
                        height="200px"
                        src={ProfiePic.profilePic}
                    />
                  </label>
                  <input
                      type="file"
                      label="Image"
                      id="img-upload"
                      name="profilePic"
                      accept=" .jpeg, .png, .jpg"
                      onChange={(e) => handleFileUpload(e)}
                  />
                  <span className="font-weight-bold">{state.name}</span>
                  <button
                      className="btn btn-primary profile-button"
                      style={{ marginTop: "1rem" }}
                      onClick={uploadPhoto}
                  >
                    Update Photo
                  </button>
                  <span> </span>
                </div>
              </div>
              <div className="col-md-5 border-right">
                <div className="p-3 py-5">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="text-right">Profile Settings</h4>
                  </div>
                  <div className="row mt-2">
                    <div className="col-md-12">
                      <label className="labels">Name</label>
                      <input
                          type="text"
                          className="form-control"
                          placeholder="name"
                          name="name"
                          value={state.name}
                          onChange={(e) => handler(e)}
                      />
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-12">
                      <label className="labels">Mobile Number</label>
                      <input
                          type="text"
                          className="form-control"
                          placeholder="phone number"
                          name="number"
                          value={state.number}
                          onChange={(e) => handler(e)}
                      />
                    </div>
                    <br />
                    <div className="col-md-12">
                      <label className="labels">State</label>
                      <select
                          className="form-control"
                          name="state"
                          value={state.state}
                          onChange={(e) => handler(e)}
                      >
                        <option value="Andhra Pradesh">Andhra Pradesh</option>
                        <option value="Andaman and Nicobar Islands">
                          Andaman and Nicobar Islands
                        </option>
                        <option value="Arunachal Pradesh">
                          Arunachal Pradesh
                        </option>
                        <option value="Assam">Assam</option>
                        <option value="Bihar">Bihar</option>
                        <option value="Chandigarh">Chandigarh</option>
                        <option value="Chhattisgarh">Chhattisgarh</option>
                        <option value="Dadar and Nagar Haveli">
                          Dadar and Nagar Haveli
                        </option>
                        <option value="Daman and Diu">Daman and Diu</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Lakshadweep">Lakshadweep</option>
                        <option value="Puducherry">Puducherry</option>
                        <option value="Goa">Goa</option>
                        <option value="Gujarat">Gujarat</option>
                        <option value="Haryana">Haryana</option>
                        <option value="Himachal Pradesh">Himachal Pradesh</option>
                        <option value="Jammu and Kashmir">
                          Jammu and Kashmir
                        </option>
                        <option value="Jharkhand">Jharkhand</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="Kerala">Kerala</option>
                        <option value="Madhya Pradesh">Madhya Pradesh</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Manipur">Manipur</option>
                        <option value="Meghalaya">Meghalaya</option>
                        <option value="Mizoram">Mizoram</option>
                        <option value="Nagaland">Nagaland</option>
                        <option value="Odisha">Odisha</option>
                        <option value="Punjab">Punjab</option>
                        <option value="Rajasthan">Rajasthan</option>
                        <option value="Sikkim">Sikkim</option>
                        <option value="Tamil Nadu">Tamil Nadu</option>
                        <option value="Telangana">Telangana</option>
                        <option value="Tripura">Tripura</option>
                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                        <option value="Uttarakhand">Uttarakhand</option>
                        <option value="West Bengal">West Bengal</option>
                      </select>
                    </div>
                    <br />
                    <div className="col-md-12">
                      <label className="labels">City</label>
                      <input
                          type="text"
                          className="form-control"
                          placeholder="city"
                          name="city"
                          value={state.city}
                          onChange={(e) => handler(e)}
                      />
                    </div>
                    <br />
                    <div className="col-md-12">
                      <label className="labels">D.O.B</label>
                      <input
                          type="date"
                          className="form-control"
                          placeholder="D.O.B"
                          name="dob"
                          value={state.dob}
                          onChange={(e) => handler(e)}
                      />
                    </div>
                    <br />
                    <div className="col-md-12">
                      <label className="labels">Email ID</label>
                      <input
                          type="text"
                          className="form-control"
                          placeholder="email id"
                          name="email"
                          value={state.email}
                          onChange={(e) => handler(e)}
                          readOnly={true}
                      />
                    </div>
                    <br />
                    <div className="col-md-12">
                      <label className="labels">Past Medical History</label>
                      <textarea className="form-control" rows={3}
                                name="history"
                                value={state.history}
                                onChange={(e)=>handler(e)}
                      />
                    </div>
                  </div>
                  <div className="mt-5 text-center">
                    <button
                        className="btn btn-primary profile-button"
                        type="button"
                        onClick={() => Submithandler()}
                    >
                      Save Profile
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="p-3 py-5">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="text-right">Change Password</h4>
                  </div>
                  <div className="col-md-12">
                    <label className="labels">Password</label>
                    <input
                        type={viewPassword ? "text" : "password"}
                        className="form-control"
                        placeholder="Password"
                        name="password"
                        onChange={(e) => passhandler(e)}
                        value={passState.password}
                    />
                  </div>{" "}
                  <br />
                  <div className="col-md-12">
                    <label className="labels">Confirm Password</label>
                    <input
                        type={viewPassword ? "text" : "password"}
                        className="form-control"
                        placeholder="Confirm Password"
                        name="repassword"
                        onChange={(e) => passhandler(e)}
                        value={passState.repassword}
                    />
                  </div>
                  <div className="form-check mt-4 text-center">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id="flexCheckDefault"
                        onChange={TogglePassword}
                    />
                    <label
                        className="form-check-label"
                        htmlFor="flexCheckDefault"
                    >
                      Show Password
                    </label>
                  </div>
                  <div className="mt-5 text-center">
                    <button
                        className="btn btn-primary profile-button"
                        type="button"
                        onClick={()=>PassSubmithandler()}
                    >
                      Change Password
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <style jsx>
          {`
          .form-control:focus {
            box-shadow: none;
            border-color: #ba68c8;
          }

          .profile-button {
            background: rgb(99, 39, 120);
            box-shadow: none;
            border: none;
          }

          .profile-button:hover {
            background: #682773;
          }

          .profile-button:focus {
            background: #682773;
            box-shadow: none;
          }

          .profile-button:active {
            background: #682773;
            box-shadow: none;
          }

          .back:hover {
            color: #682773;
            cursor: pointer;
          }

          .labels {
            font-size: 11px;
          }

          .add-experience:hover {
            background: #ba68c8;
            color: #fff;
            cursor: pointer;
            border: solid 1px #ba68c8;
          }
        `}
        </style>
      </>
  );
}