import { useState, useEffect } from 'react';
import axios from "axios";
import Swal from "sweetalert2";

export default function Index({ state, handleSubmit, handleInputChange }) {
    const [timer, setTimer] = useState(60);
    const [disableResend, setDisableResend] = useState(true);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (isLoaded) {
            const intervalId = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);

            return () => clearInterval(intervalId);
        }
    }, [isLoaded]);

    useEffect(() => {
        if (timer === 0) {
            setDisableResend(false);
        }
    }, [timer]);

    const handleResendClick = () => {
        setDisableResend(true);
        setTimer(60);
        axios.post("http://localhost:5000/verify/getcode", {
                number: state.number,
                channel: 'sms'
            }
        ).then((data) => {
            Swal.fire({
                icon: 'success',
                text: 'Otp Send Successfully',

            })


        })
            .catch((err) =>{
                console.log(err)
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Error in sending otp',

                })
            } );
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div style={{ textAlign: 'center', padding: '4%' }}>
                    <h1
                        className='display-6'
                        style={{ fontFamily: 'Lucida Console, Courier New, monospace' }}
                    >
                        Verify Mobile
                    </h1>
                    <hr />

                    <div style={{ padding: '5%' }}>
                        <h5 className='display-8' style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>
                            We have sent you an OTP on
                            <br />
                            <br /> <cite title='Source Title'>{`+91 ${state.number}`}</cite>
                        </h5>
                    </div>
                </div>

                <div className='row mb-4'>
                    <div className='col-2'>
                        <i className='fa-solid fa-unlock-keyhole fa-lg me-3 fa-fw'></i>
                    </div>
                    <div className='col-10'>
                        <input
                            type='text'
                            className='form-control'
                            id='validationTooltip01'
                            placeholder='Please enter 6 digit otp'
                            required
                            name='otp'
                            onChange={handleInputChange}
                            value={state.otp}
                        />
                        <div id='but123'></div>
                        <div style={{ textAlign: 'right', padding: '2%' }}>
                            {disableResend ? (
                                <footer className='blockquote-footer'>
                                    Resend OTP in {timer} seconds
                                </footer>
                            ) : (
                                <footer className='blockquote-footer'>
                                    Still not received OTP?{' '}
                                    <cite title='Source Title'>
                                        <button
                                            type='button'
                                            className='btn btn-link'
                                            onClick={handleResendClick}
                                            disabled={!isLoaded}
                                        >
                                            Resend OTP
                                        </button>
                                    </cite>
                                </footer>
                            )}
                        </div>
                    </div>
                </div>
                <div className='d-flex justify-content-center mx-4 mb-3 mb-lg-4'>
                    <button type='submit' className='btn btn-dark btn-lg'>
                        Next
                    </button>
                </div>
            </form>
        </>
    );
}