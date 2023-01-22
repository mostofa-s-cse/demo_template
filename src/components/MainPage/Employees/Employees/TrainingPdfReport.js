import React from "react";
import { useReactToPrint } from 'react-to-print';
import { useState, useEffect, useRef } from 'react';
import { landingIcon1, landingIcon2, landingIcon3, landingIcon4, landingIcon5, landingIcon6, landingIcon7, logImg2 } from '../../../Entryfile/imagepath';
const TrainingPdfReport = () => {
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    let counter = 1;
    const [data, setData] = useState([]);
    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [filterTraining, setFilterTraining] = useState('');

    useEffect(() => {
        const getUsers = () => {
            setIsLoading(true);
            fetch(`/ords/hrm/emp_tra/v_emp_tra`)
                .then(res => {

                    // You have to send it, as I have done below
                    if (res.status >= 400) {
                        throw new Error("Server responds with error!")
                    }
                    return res.json()
                })
                .then(users => {
                    if (filterTraining === "Local" || filterTraining === "Foreign") {
                        const data = users.items
                        const remainingUsers = data.filter(user => user.training_type === filterTraining);
                        setData(remainingUsers)
                    }
                    else if (filterTraining === "All Training") {
                        setData(users.items);
                        setIsLoading(false);


                    }
                    else {
                        setData(users.items);
                        setIsLoading(false);


                    }

                },

                    err => {
                        const mute = err
                        setHasError(true);
                        setIsLoading(true);
                    })
        };
        getUsers()
    }, [filterTraining])


    return (
        <div>
            <div className='page-wrapper'>

                <div className='row bg-project p-3 mb-3'>

                    <div className="container col-sm-3 text-start mb-3">
                        <label htmlFor="inputGroupSelect13" className="form-label text-light fs-6 fw-bold">Training</label>
                        <select onChange={(e) => {
                            setFilterTraining(e.target.value)
                        }} className="form-select form-select-lg mb-3" aria-label=".form-select-lg example">
                            <option value="All Training">All Training</option>
                            <option value="Local">Local</option>
                            <option value="Foreign">Foreign</option>

                        </select>
                    </div>


                </div>
                <div className='text-end mt-4 me-4'>
                    <button className='btn btn-primary text-end me-3' onClick={handlePrint}><i className='la la-file-pdf-o'></i> PDF!</button>

                </div>



                <div ref={componentRef} style={{ width: '100%', minHeight: '100vh' }} className="my-4">
                    <div className="bg-light mt-1 p-4 mx-auto container">
                        <div className="row text-center" >
                            <div className="col-3">
                                <img className="img-fluid" width="80" src={landingIcon1} alt="" />
                            </div>
                            <div className="col-6">
                                <h4>গণপ্রজাতন্ত্রী বাংলাদেশ  সরকার </h4>
                                <h5 className='lh-base'>বাংলাদেশ সেতু কর্তৃপক্ষ	<br /> সেতু ভবন,বনানী,ঢাকা-১২১২</h5>
                            </div>
                            <div className="col-3">
                                <img className="img-fluid" width="160" src={logImg2} alt="" />
                            </div>
                        </div>
                        <h3 className="mb-3 text-center mt-4">All Employees</h3>
                        <hr className="border-bottom border-2 border-dark mb-4" />

                        <table className="table table-striped my-5 text-start">
                            <thead>
                                <tr>
                                    <th scope="col">S/N</th>

                                    <th scope="col">Name</th>
                                    <th scope="col">Course Title</th>
                                    <th scope="col">Training Type</th>
                                    <th scope="col">From Date</th>

                                    <th scope="col">To Date</th>

                                    <th scope="col">Position</th>
                                    <th scope="col">Institution</th>

                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.map(reports => <tr
                                        key={counter}
                                    >

                                        <th scope="row">{counter++}</th>
                                        <td>{reports.name_english}</td>
                                        <td>{reports.course_title}</td>
                                        <td>{reports.training_type}</td>
                                        <td>{reports.date_from}</td>
                                        <td>{reports.date_to}</td>
                                        <td>{reports.position}</td>
                                        <td>{reports.institution}</td>


                                    </tr>
                                    )
                                }


                            </tbody>
                        </table>







                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrainingPdfReport;
