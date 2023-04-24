import { useRef } from "react";
import { useReactToPrint } from 'react-to-print';
const PrescriptionModal = (props) => {
    const { doctorName, prescription, id } = props;
    let date = new Date();
    if(prescription && prescription.date){
        date = new Date(prescription.date)
    }
    const print = useRef()

    const handlePrint = useReactToPrint({
        content: () => print.current,
    })

    return (
        <>
            <button
                type="button"
                className="btn btn-outline-secondary btn-sm"
                data-toggle="modal"
                data-target={`#exampleModal${id}`}
            >
                View
            </button>

            <div
                className="modal fade"
                id={`exampleModal${id}`}
                tabindex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        {prescription ? (
                            <>
                                <div className="prescription" ref={print}>
                                    <div className="pres-head">
                                        <h2>E-Clinic</h2>
                                        <div className="pres-info">
                                            <h6>
                                                Date :{" "}
                                                {date.getDate() +
                                                    "/" +
                                                    (date.getMonth() + 1) +
                                                    "/" +
                                                    date.getFullYear()}
                                            </h6>
                                            <h6>Prescribed by : Dr {doctorName}</h6>
                                        </div>
                                    </div>

                                    <div className="pres-body">
                                        <table className="table">
                                            <thead>
                                            <tr>
                                                <th scope="col">Medicine</th>
                                                <th scope="col">Dosage</th>
                                                <th scope="col">Duration</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {prescription.medicines.map((med) => {
                                                return (
                                                    <tr key={med.key}>
                                                        <td>
                                                            <h6>{med.name}</h6>
                                                        </td>
                                                        <td>
                                                            <h6>{med.dosage}</h6>
                                                        </td>
                                                        <td
                                                            style={{
                                                                display: "flex",
                                                                justifyContent: "space-between",
                                                            }}
                                                        >
                                                            <h6>{med.duration}</h6>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={handlePrint}
                                    >
                                        Download
                                        <i
                                            style={{ marginLeft: "10px" }}
                                            className="bi bi-download"
                                        ></i>
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <div
                                    style={{
                                        height: "200px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <h3 style={{ fontSize: "20px" }}>
                                        Unable to find Prescription.Try after sometime
                                    </h3>
                                </div>
                                <div style={{paddingBottom: "30px",display: "flex",justifyContent: "center"}}>
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        data-dismiss="modal"
                                    >
                                        Close
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <style jsx>
                {`
                  .pres-head {
                    display: flex;
                    justify-content: space-between;
                  }

                  .prescription {
                    padding: 2rem 2rem;
                  }

                  .pres-body {
                    margin-top: 2rem;
                  }
                `}
            </style>
        </>
    );
};

export default PrescriptionModal;