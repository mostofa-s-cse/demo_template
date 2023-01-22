import React from 'react';
import { useForm } from "react-hook-form";
import Select from 'react-select'
import { useState, useEffect } from 'react';
const EducationDetails = ({ parentCallbackF }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [count, setCount] = useState(1);
    const [employeeData, setEmployeeData] = useState([]);
    const [employeeNameCategory, setEmployeeNameCategory] = useState();
    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const dataEdu = JSON.parse(window.sessionStorage.getItem('education_information'));

    let edusData = []
    if (dataEdu) {
        edusData = [...dataEdu]
    }
    const [theArray, setTheArray] = useState([...edusData]);


    useEffect(() => {
        const getUsers = () => {
            fetch('/ords/hrm/employees/crud')
                .then(res => {
                    if (res.status >= 400) {
                        throw new Error("Server responds with error!")
                    }
                    return res.json()
                })
                .then(data => {
                    setEmployeeData(data.items)
                    setIsLoading(true);
                },
                    err => {
                        const mute = err
                        setHasError(true);
                        setIsLoading(true);
                    })
        };
        getUsers()
    }, [])



    const handleEmployeeNameCategory = selectedOption => {
        setEmployeeNameCategory(selectedOption.value);

    }

    let categoryOptions = employeeData.map(data => {
        let optionsItem = {};
        optionsItem.value = data.name_english;
        optionsItem.label = `${data.name_english} (${data.employe_registration_number})`;
        return optionsItem;
    })

    const onSubmit = data => {
        // data.name_english = employeeNameCategory;

        const postDataEdu = {
            NAME_INSTITUTION: data.name_institution,
            PRINCIPAL_SUBJECT: data.principal_subject,
            DEGREE_DIPLOMA: data.degree_diploma,
            PASSIGNE_YEAR: parseInt(data.passigne_year),
            EDUCATION_RESULT: data.education_result,
            DISTINCTION: data.distinction
        }
        setTheArray([...theArray, postDataEdu]);
        reset();

    };
    const handleNextButton = () => {
        window.sessionStorage.setItem("education_information", JSON.stringify(theArray))
        setCount((count) => count + 1);
        parentCallbackF(count);
    }
    return (
        <div>

            {/* ------------------------------------------Education  Details-------------------------------------- */}


            {/* <input type="datetime" placeholder="date" {...register("date", {})} /> */}
            <form onSubmit={handleSubmit(onSubmit)}>

                <div className='row gx-5 text-start mb-3 border shadow p-3 mt-3 bg-white rounded-3'>
                    <h4 className='text-center bgColor rounded py-1 text-white  mb-3 '>Education Details</h4>
                    <div className='d-flex justify-content-between'>
                        <h5 ></h5>

                    </div>
                    {/* <div className="mb-3">
                        <label htmlFor="inputGroupSelect12" className="form-label fw-bold small">Choose an Employee</label>

                        <Select
                            options={categoryOptions}
                            onChange={handleEmployeeNameCategory}

                        />
                    </div> */}
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput14" className="form-label fw-bold small">Institution Name</label>
                        <input type="text" className="form-control" id="exampleFormControlInput14" placeholder="Institution Name" {...register("name_institution")} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput14" className="form-label fw-bold small">Principal Subject</label>
                        <input type="text" className="form-control" id="exampleFormControlInput14" placeholder="Principal Subject" {...register("principal_subject")} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput14" className="form-label fw-bold small">Degree/Diploma</label>
                        <input type="text" className="form-control" id="exampleFormControlInput14" placeholder="Degree/Diploma" {...register("degree_diploma")} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput14" className="form-label fw-bold small">Passing Year</label>
                        <input type="text" className="form-control" id="exampleFormControlInput14" placeholder="Passing Year" {...register("passigne_year")} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput14" className="form-label fw-bold small">Result</label>
                        <input type="text" className="form-control" id="exampleFormControlInput14" placeholder="Result" {...register("education_result")} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput14" className="form-label fw-bold small">Distinction</label>
                        <input type="text" className="form-control" id="exampleFormControlInput14" placeholder="Distinction" {...register("distinction")} />
                    </div>
                    <div className='text-end p-3'>
                        <input className='submit-Btn-style' type="submit" value="+ Save Education" />
                    </div>

                </div>



            </form>
            <div className="row  text-start mb-3 border shadow p-3 mt-3 bg-white rounded-3">

                <div className="col-md-12">
                    <div>
                        <div className="table-responsive">
                            <table className="table table-nowrap">
                                <thead>
                                    <tr>
                                        <th>Institution Name</th>
                                        <th>Principal Subject</th>
                                        <th>Degree</th>
                                        <th>Passing Year</th>
                                        <th>Education Result</th>
                                        <th>Distinction</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        theArray.map(eduItem => <tr>
                                            <td>{eduItem.NAME_INSTITUTION}</td>
                                            <td>{eduItem.PRINCIPAL_SUBJECT}</td>
                                            <td>{eduItem.DEGREE_DIPLOMA}</td>
                                            <td>{eduItem.PASSIGNE_YEAR}</td>
                                            <td>{eduItem.EDUCATION_RESULT}</td>
                                            <td>{eduItem.DISTINCTION}</td>




                                        </tr>)
                                    }

                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
                <div className='text-end p-3'>
                    <button onClick={handleNextButton} className='submit-Btn-style'> Next Page </button>
                </div>
            </div>
        </div>
    );
};

export default EducationDetails;