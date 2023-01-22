import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Select from 'react-select'
import DateTimePicker from 'react-datetime-picker';
const JobDetails = ({ parentCallbackA }) => {

    const { register, handleSubmit, formState: { errors } } = useForm();


    const [count, setCount] = useState(1);
    const [designationData, setDesignationData] = useState([]);
    const [designationCategory, setDesignationCategory] = useState();
    const [departmentData, setDepartmentData] = useState([]);
    const [departmentCategory, setDepartmentCategory] = useState();
    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const employeeData = JSON.parse(window.sessionStorage.getItem('job_details'));
    const [joinDate, setJoinDate] = useState(employeeData ? employeeData.joining_date : '')
    const [lrpDate, setLrpDate] = useState(employeeData ? employeeData.lrp_date : '')
    const [confirmDate, setConfirmDate] = useState(employeeData ? employeeData.date_confirmation : '')
    useEffect(() => {
        const getUsers = () => {
            fetch('/ords/hrm/des/crud')
                .then(res => {
                    if (res.status >= 400) {
                        throw new Error("Server responds with error!")
                    }
                    return res.json()
                })
                .then(data => {
                    setDesignationData(data.items)
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

    useEffect(() => {
        const getUsers = () => {
            fetch('/ords/hrm/dept/crud')
                .then(res => {
                    if (res.status >= 400) {
                        throw new Error("Server responds with error!")
                    }
                    return res.json()
                })
                .then(data => {
                    setDepartmentData(data.items)
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

    const handleDesignationSelectCategory = selectedOption => {
        setDesignationCategory(selectedOption.value);

    }
    const handleDepartmentSelectCategory = selectedOption => {
        setDepartmentCategory(selectedOption.value);

    }


    let categoryOptions = designationData.map(data => {
        let optionsItem = {};
        optionsItem.value = data.designation_id;
        optionsItem.label = data.designation;
        return optionsItem;
    })
    let categoryOptions1 = departmentData.map(data => {
        let optionsItem = {};
        optionsItem.value = data.departement_id;
        optionsItem.label = data.departement;
        return optionsItem;
    })
    // submit button handler
    const onSubmit = data => {
        if (employeeData && joinDate === employeeData.joining_date) {
            data.joining_date = joinDate;
        }
        else if (joinDate) {
            data.joining_date = joinDate.toISOString();
        }
        if (employeeData && lrpDate === employeeData.lrp_date) {
            data.lrp_date = lrpDate;
        }
        else if (lrpDate) {
            data.lrp_date = lrpDate.toISOString();
        }
        if (employeeData && confirmDate === employeeData.date_confirmation) {
            data.date_confirmation = confirmDate;
        }
        else if (confirmDate) {
            data.date_confirmation = confirmDate.toISOString();
        }
        if (!designationCategory) {
            data.designation = empData.designation;
        }
        else {
            data.designation = designationCategory;
        }
        if (!departmentCategory) {
            data.departement = empData.departement;
        }
        else {
            data.departement = departmentCategory;
        }
        window.sessionStorage.setItem("job_details", JSON.stringify(data))
        setCount((count) => count + 1);
        parentCallbackA(count);

    };
    let empData = {};
    if (employeeData) {
        empData = { ...employeeData };
    }

    return (
        <div>


            {/* ------------------------------------------Job Details-------------------------------------- */}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='row gx-5 text-start mb-3 border shadow p-3 mt-3 bg-white rounded-3'>
                    <h4 className='text-center bgColor rounded py-1 text-white  mb-3 '>Job Details</h4>
                    {/*  <input defaultValue={empData.employe_id} type="datetime" placeholder="date" {...register("date", {})} /> */}

                    <div className="col-sm-6">
                        <div className="mb-3">
                            <label htmlFor="inputGroupSelect12" className="form-label small fw-bold">Designation <span className="text-danger">*</span></label>
                            <Select
                                defaultValue={{ label: `${empData.designation ? empData.designation : 'select..'}`, value: `${empData.designation}` }}
                                options={categoryOptions}
                                onChange={handleDesignationSelectCategory}
                            />
                            <input
                                tabIndex={-1}
                                autoComplete="off"
                                style={{ opacity: 0, height: 0 }}
                                value={designationCategory || empData.designation}
                                required
                            />

                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputGroupSelect13" className="form-label small fw-bold">Department <span className="text-danger">*</span></label>
                            <Select
                                defaultValue={{ label: `${empData.departement ? empData.departement : 'select..'}`, value: empData.departement }}
                                options={categoryOptions1}
                                onChange={handleDepartmentSelectCategory}

                            />
                            <input
                                tabIndex={-1}
                                autoComplete="off"
                                style={{ opacity: 0, height: 0 }}
                                value={departmentCategory || empData.departement}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInput14" className="form-label small fw-bold">Cadre</label>
                            <input defaultValue={empData.cadre} type="text" className="form-control" id="exampleFormControlInput14" placeholder="Cadre" {...register("cadre")} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInput15" className="form-label small fw-bold">Email Address</label>
                            <input defaultValue={empData.email_adress} type="email" className="form-control" id="exampleFormControlInput15" placeholder='Enter Email' {...register("email_adress")} />
                        </div>


                    </div>
                    <div className="col-sm-6">
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInput16" className="form-label small fw-bold">Phone</label>
                            <input defaultValue={empData.telephone_number} type="number" className="form-control" id="exampleFormControlInput16" placeholder="Phone" {...register("telephone_number")} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInput17" className="form-label small fw-bold">Joining Date</label>
                            <DateTimePicker format={`dd/MM/yyyy 00:00`}
                                className="w-100"
                                onChange={setJoinDate}
                                value={joinDate}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInput18" className="form-label small fw-bold">PRL Date</label>
                            <DateTimePicker format={`dd/MM/yyyy 00:00`}
                                className="w-100"
                                onChange={setLrpDate}
                                value={lrpDate}
                            />

                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInput19" className="form-label small fw-bold">Date of Confirmation</label>

                            <DateTimePicker format={`dd/MM/yyyy 00:00`}
                                className="w-100"
                                onChange={setConfirmDate}
                                value={confirmDate}
                            />
                        </div>


                    </div>
                    <div className='text-end'>
                        <input className=' submit-Btn-style' type="submit" value="Next Page" />
                    </div>
                </div>

            </form>
        </div>
    );
};

export default JobDetails;