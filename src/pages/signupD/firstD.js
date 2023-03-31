export default function Index({ state, handleSubmit,handleInputChange,error }) {
    console.log(state)

    return (
        <>
            <form onSubmit = {handleSubmit} >
                <div style={{textAlign: "center" ,padding: "4%"}}>

                    <h1 className="display-6" style={{fontFamily: "Lucida Console, Courier New, monospace"}}>Join eClinic</h1>
                    <hr/>
                    <div style={{textAlign:"right"}}>
                        <footer className="blockquote-footer">Are you a patient? <cite
                            title="Source Title"><a href="/signup/patient">Register here</a></cite></footer>

                    </div>
                </div>
                <div className="row mb-4">

                    <div className="col-2">
                        <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                    </div>
                    <div className="col-10">
                        <input name="number" type="tel" id="form3Example1c" className="form-control" value={state.number}
                               onChange={handleInputChange} placeholder="Phone Number"/>
                        {error.number && <p className="text-danger" style={{margin:"0"}}>{error.number}</p>}

                    </div>
                </div>

                <div className="row mb-4">
                    <div className="col-2">
                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                    </div>
                    <div className="col-10">
                        <input name="password" type="password" id="form3Example4c"
                               className="form-control" value={state.password}
                               onChange={handleInputChange} placeholder="Password"/>
                        {error.password && <p className="text-danger" style={{margin:"0"}}>{error.password}</p>}
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="col-2">
                        <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                    </div>
                    <div className="col-10">
                        <input name="passwordr" type="password" id="form3Example4cd"
                               className="form-control"  value={state.passwordr}
                               onChange={handleInputChange}  placeholder="Repeat
                                                                               your password"/>
                        {error.passwordr && <p className="text-danger" style={{margin:"0"}}>{error.passwordr}</p>}

                    </div>
                </div>
                <div style={{textAlign:"right"}} >
                    <footer className="blockquote-footer">Do you already have an account? <br/> Please <cite
                        title="Source Title"><a href="/signin">log in</a></cite> here. </footer>

                </div>
                <div className="form-check d-flex justify-content-center " >

                    <label className="form-check-label" >
                        <input className="form-check-input me-2" type="checkbox" name="check"   onChange={handleInputChange}
                               id="form2Example3c"/>
                        I agree all statements in <a href="#!">Terms of service</a>
                        <br/>
                        {error.check && <p className="text-danger" style={{margin:"0"}}>{error.check}</p>}
                    </label>

                </div>



                <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4" style={{paddingTop:"9%"}}>
                    <button type="submit" className="btn btn-dark btn-lg">Get OTP
                    </button>
                </div>

            </form>

        </>

    );
}