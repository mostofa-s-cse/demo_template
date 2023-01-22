
import React, { useState, useEffect } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import { Table } from 'antd';
import 'antd/dist/antd.css';
import { itemRender, onShowSizeChange } from "../../paginationfunction"
import "../../antdstyle.css"
import Select from 'react-select'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import swal from 'sweetalert';

const Designation = () => {

    const [data, setData] = useState([]);
    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [searchDesignation, setSearchDesignation] = useState('')
    const [loadUpdate, setLoadUpdate] = useState(false);

    // React Hook Form 
    const {
        register: register,
        reset: reset,
        formState: { errors: errors },
        handleSubmit: handleSubmit,
    } = useForm();
    const {
        register: register1,
        reset: reset1,
        formState: { errors: errors1 },
        handleSubmit: handleSubmit1,
    } = useForm();

    // post Method 
    const onSubmitPost = data1 => {

        data1.grade_id = gradeCategory
        axios({
            method: 'post',
            url: '/ords/hrm/des/crud',
            data: {
                GRADE_ID: data1.grade_id,
                DESIGNATION: data1.designation
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

                    window.$("#add_designation").modal("hide");


                }
            })

    }

    // // PUT METHOD 
    const [getDesignation, setGetDesignation] = useState([]);
    const [getId, setGetId] = useState(null);

    const onSubmitUpdate = data1 => {

        if (data1.designation) {
            data1.designation = data1.designation;
        }
        else {
            data1.designation = getDesignation.designation;
        }
        if (gradeCategory) {
            data1.grade_id = gradeCategory;
        }
        else {
            data1.grade_id = getDesignation.grade_id;
        }


        // PUT METHOD 
        axios({
            method: 'put',

            headers: {
                'DESIGNATION_ID': getId
            },
            url: `/ords/hrm/des/crud`,
            data: {
                // DISTRICT: data1.district
                GRADE_ID: data1.grade_id,
                DESIGNATION: data1.designation


            },
        })
            .then(res => {
                if (!res.data) {
                    setLoadUpdate(true)
                    swal({
                        title: "Good job!",
                        text: "Successfully Updated",
                        icon: "success",
                        button: "Ok",
                    });
                    reset1();


                    window.$("#edit_designation").modal("hide");


                }
            })



    }

    const handleUpdate = updateId => {
        //
        setGetId(updateId);
    }
    //

    // GET Designation DATA 
    useEffect(() => {
        const getUsers = () => {
            setIsLoading(true);
            fetch(`/ords/hrm/des/${getId}`)
                .then(res => {

                    // You have to send it, as I have done below
                    if (res.status >= 400) {
                        throw new Error("Server responds with error!")
                    }
                    return res.json()
                })
                .then(users => {
                    setGetDesignation(users);
                    setIsLoading(false);
                },

                    err => {
                        const mute = err
                        setHasError(true);
                        setIsLoading(true);
                    })
        };
        if (getId) { getUsers() }
    }, [getId])




    // Delete API
    const deleteButtonHandler = (Id) => {
        //
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    const url = `/ords/hrm/des/crud`
                    fetch(url,
                        {
                            method: 'DELETE',
                            headers: {
                                'DESIGNATION_ID': Id
                            }
                        })
                        .then(item => {
                            const remainingUsers = data.filter(user => user.designation_id !== Id);
                            setData(remainingUsers)

                        })
                    swal("Poof! Your imaginary file has been deleted!", {
                        icon: "success",
                    });
                } else {
                    swal("Your imaginary file is safe!");
                }
            });

    }

    // searchDesignation

    // GET Designation DATA 
    useEffect(() => {
        const getUsers = () => {
            setIsLoading(true);
            fetch(`/ords/hrm/des/v_des?limit=10000`)
                .then(res => {

                    // You have to send it, as I have done below
                    if (res.status >= 400) {
                        throw new Error("Server responds with error!")
                    }
                    return res.json()
                })
                .then(users => {
                    let desData = users.items;
                    const searchDesData = desData.filter(user => {
                        let desSearchData = user.designation;
                        if (searchDesignation == '') {
                            return user;
                        }
                        else if (desSearchData.toLowerCase().includes(searchDesignation.toLocaleLowerCase()) || '') {
                            return user;
                        }
                    })
                    setData(searchDesData);
                    setIsLoading(false);
                    setLoadUpdate(false);;
                },

                    err => {
                        const mute = err
                        setHasError(true);
                        setIsLoading(true);
                    })
        };
        getUsers()
    }, [searchDesignation, loadUpdate])
    const columns = [
        {
            title: 'DESIGNATION ID',
            dataIndex: 'designation_id',

        },
        {
            title: 'DESIGNATION',
            dataIndex: 'designation',

        },
        {
            title: 'GRADE',
            dataIndex: 'grade',

        },


        {
            title: 'Action',
            render: (text, record) => (
                <div className="dropdown dropdown-action text-right">
                    <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                    <div className="dropdown-menu dropdown-menu-right">
                        <a className="dropdown-item" href="#" data-toggle="modal" data-target="#edit_designation" onClick={() => { handleUpdate(record.designation_id) }}><i className="fa fa-pencil m-r-5" /> Edit</a>
                        <a className="dropdown-item" href="#" onClick={() => { deleteButtonHandler(record.designation_id) }}><i className="fa fa-trash-o m-r-5" /> Delete</a>
                    </div>
                </div>
            ),
        },
    ]

    // Grades Category 

    const [gradeData, setGradeData] = useState([]);
    const [gradeCategory, setGradeCategory] = useState();
    const handleGradeCategory = selectedOption => {
        setGradeCategory(selectedOption.value);
    }
    //

    let categoryOptionsGrade = gradeData.map(data => {
        let optionsItem = {};
        optionsItem.value = data.grade_id;
        optionsItem.label = data.grade;
        return optionsItem;
    })
    // GET GRADE DATA 
    useEffect(() => {
        const getUsers = () => {
            fetch('/ords/hrm/gra/crud')
                .then(res => {
                    if (res.status >= 400) {
                        throw new Error("Server responds with error!")
                    }
                    return res.json()
                })
                .then(data => {
                    setGradeData(data.items)
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
    return (
        <div>
            <div className="page-wrapper">
                <Helmet>
                    <title>Designations - HR</title>
                    <meta name="description" content="Login page" />
                </Helmet>
                {/* Page Content */}
                <div className="content container-fluid">
                    {/* Page Header */}
                    <div className="page-header">
                        <div className="row align-items-center">
                            <div className="col">
                                <h3 className="page-title">Designations</h3>
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item"><Link to="/app/main/dashboard">Dashboard</Link></li>
                                    <li className="breadcrumb-item active">Designations</li>
                                </ul>
                            </div>
                            <div className="col-auto float-right ml-auto">
                                <a href="#" className="btn bgColor text-white add-btn" data-toggle="modal" data-target="#add_designation"><i className="fa fa-plus" /> Add New Designation</a>
                            </div>
                        </div>
                    </div>
                    {/* /Page Header */}


                    {/* Search Filter */}
                    <div className="row  mb-4 ps-2">

                        <input onChange={e => { setSearchDesignation(e.target.value) }} className="form-control w-25 shadow py-4" type="text" placeholder="Search Designation" />


                    </div>
                    {/* /Search Filter */}
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
                {/* Add Designation Modal */}


                <div id="add_designation" className="modal custom-modal fade" role="dialog">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add new Designation</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body text-start">
                                <form onSubmit={handleSubmit(onSubmitPost)}>
                                    <div className="row">

                                        <div className="mb-3">
                                            <label htmlFor="exampleFormControlInput14" className="form-label fw-bold small" >Designation title</label>
                                            <input type="text" className="form-control" id="exampleFormControlInput14" placeholder="Enter Designation title"  {...register("designation")} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="inputGroupSelect12" className="form-label fw-bold small">grade</label>

                                            <Select
                                                options={categoryOptionsGrade}
                                                onChange={handleGradeCategory}

                                            />
                                        </div>
                                    </div>

                                    <div className="submit-section">
                                        <button type="submit" className="btn bgColor text-white px-5 py-2 rounded" >Add</button>

                                        <button type="button" className="btn bgColor text-white px-5 ms-1 py-2 rounded" data-dismiss="modal">Close</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>




                {/* Edit Designation Modal */}

                <div id="edit_designation" className="modal custom-modal fade" role="dialog">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Designation</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body text-start">
                                <form onSubmit={handleSubmit1(onSubmitUpdate)}>
                                    <div className="row">

                                        <div className="mb-3">
                                            <label htmlFor="exampleFormControlInput14" className="form-label fw-bold small" >Designation title</label>
                                            <input type="text" className="form-control" id="exampleFormControlInput14" defaultValue={getDesignation.designation} {...register1("designation")} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="inputGroupSelect12" className="form-label fw-bold small">grade</label>

                                            <Select
                                                options={categoryOptionsGrade}
                                                onChange={handleGradeCategory}

                                            />
                                        </div>





                                    </div>

                                    <div className="submit-section">
                                        <button type="submit" className="btn bgColor text-white px-5 py-2 rounded" >Add</button>

                                        <button type="button" className="btn bgColor text-white px-5 ms-1 py-2 rounded" data-dismiss="modal">Close</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>




            </div>
        </div>
    );
};

export default Designation;