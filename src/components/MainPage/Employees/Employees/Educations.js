import React from 'react';
import { useState, useEffect } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import { Avatar_02, Avatar_05, Avatar_09, Avatar_10, Avatar_03, Avatar_08, Avatar_15, Avatar_20, Avatar_25, Avatar_24 } from "../../../Entryfile/imagepath"
import { Table } from 'antd';
import 'antd/dist/antd.css';
import { itemRender, onShowSizeChange } from "../../paginationfunction"
import "../../antdstyle.css"
import { useForm } from "react-hook-form";
import Select from 'react-select'
import axios from 'axios';
import { HashLink } from 'react-router-hash-link';
import swal from 'sweetalert';
const Educations = () => {
    // const [eduInsertOutput, setEduInsertOutput] = useState('');
    const [loadUpdate, setLoadUpdate] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = data1 => {
        axios({
            method: 'post',
            url: '/ords/hrm/emp_edu/crud',
            data: {
                EMPLOYE_ID: employeeNameCategory,
                NAME_INSTITUTION: data1.name_institution,
                PRINCIPAL_SUBJECT: data1.principal_subject,
                DEGREE_DIPLOMA: data1.degree_diploma,
                PASSIGNE_YEAR: parseInt(data1.passigne_year),
                EDUCATION_RESULT: data1.education_result,
                DISTINCTION: data1.distinction
            },
            headers: { 'Authorization': 'Bearer ...' }
        })
            .then(res => {
                if (!res.data) {
                    setLoadUpdate(true)
                    swal({
                        title: "Good job!",
                        text: "Successfully Added",
                        icon: "success",
                        button: "Ok",
                    });
                    reset();

                    window.$("#add_education").modal("hide");
                }
            })
    };
    const [data, setData] = useState([]);
    const [employeeData, setEmployeeData] = useState([]);
    const [employeeNameCategory, setEmployeeNameCategory] = useState();
    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


    const [searchEducation, setSearchEducation] = useState('');
    useEffect(() => {
        const getUsers = () => {
            setIsLoading(true);
            fetch(`/ords/hrm/emp_edu/v_emp_edu?q={"name_english":{"$like":"%25${searchEducation.toLocaleUpperCase()}%25"},"$orderby":{"employe_id":"desc"}}`)
                .then(res => {

                    // You have to send it, as I have done below
                    if (res.status >= 400) {
                        throw new Error("Server responds with error!")
                    }
                    return res.json()
                })
                .then(users => {
                    setData(users.items);
                    setIsLoading(false);
                    setLoadUpdate(false);
                },

                    err => {
                        const mute = err
                        setHasError(true);
                        setIsLoading(true);
                    })
        };
        getUsers()
    }, [searchEducation, loadUpdate])


    useEffect(() => {
        const getUsers = () => {
            fetch('/ords/hrm/employees/crud?limit=10000')
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
        optionsItem.value = data.employe_id;
        optionsItem.label = `${data.name_english} (${data.employe_registration_number})`;
        return optionsItem;
    })







    const columns = [

        {
            title: 'Employee Name',
            dataIndex: 'name_english',

        },

        {
            title: 'Institution Name',
            dataIndex: 'name_institution',

        },
        {
            title: 'Principal Subject',
            dataIndex: 'principal_subject',

        },

        {
            title: 'Degree',
            dataIndex: 'degree_diploma',

        },

        {
            title: 'Passing Year',
            dataIndex: 'passigne_year',

        },
        {
            title: 'Result',
            dataIndex: 'education_result',

        },
        {
            title: 'Distinction',
            dataIndex: 'distinction',

        },

        {
            title: 'Action',
            render: (text, record) => (
                <div className="dropdown dropdown-action text-right">


                    <Link to={`/allemployees/employeeprofile/${record.employe_id}`}  >
                        <HashLink to={`/allemployees/employeeprofile/${record.employe_id}#EducationHash`}>   <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a></HashLink></Link>


                </div >
            ),


        },


    ]
    return (
        <div className="page-wrapper">
            <Helmet>
                <title>Education - HR</title>
                <meta name="description" content="Login page" />
            </Helmet>
            {/* Page Content */}
            <div className="content container-fluid">
                {/* Page Header */}
                <div className="page-header">
                    <div className="row align-items-center">
                        <div className="col">
                            <h3 className="page-title">Education List</h3>
                            <ul className="breadcrumb">
                                <li className="breadcrumb-item"><Link to="/app/main/dashboard">Dashboard</Link></li>
                                <li className="breadcrumb-item active">Education</li>
                            </ul>
                        </div>
                        <div className="col-auto float-right ml-auto">
                            <a href="#" className="btn add-btn" data-toggle="modal" data-target="#add_education"><i className="fa fa-plus" /> Add Education</a>
                        </div>
                    </div>
                </div>
                <div className="row  mb-4 ps-2">

                    <input onChange={e => { setSearchEducation(e.target.value) }} className="form-control w-25 shadow py-4" type="text" placeholder="Employee Name" />


                </div>

                {/* /Leave Statistics */}
                <div className="row">
                    <div className="col-md-12">
                        <div className="table-responsive">

                            <Table className="table-striped"
                                pagination={{
                                    total: data.length,
                                    showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                                    showSizeChanger: true, onShowSizeChange: onShowSizeChange, itemRender: itemRender
                                }}
                                style={{ overflowX: 'auto' }}
                                columns={columns}
                                // bordered
                                dataSource={data}
                                rowKey={record => record.id}

                            />
                        </div>
                    </div>
                </div>
            </div>
            {/* /Page Content */}
            {/* Add Education Modal */}


            <div id="add_education" className="modal custom-modal fade" role="dialog">
                <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Add Education</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="modal-body text-start">
                                <div className="mb-3">
                                    <label htmlFor="inputGroupSelect12" className="form-label fw-bold small">Choose an Employee</label>

                                    <Select
                                        options={categoryOptions}
                                        onChange={handleEmployeeNameCategory}

                                    />
                                </div>
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

                                <div className="modal-footer">
                                    <button type="submit" className="btn bgColor text-white px-5 py-2 rounded" >Add</button>
                                    <button type="button" className="btn bgColor text-white px-5 ms-1 py-2 rounded" data-dismiss="modal">Close</button>
                                </div>
                            </div>

                        </form>
                    </div>
                </div>
            </div>





        </div >
    );
};

export default Educations;