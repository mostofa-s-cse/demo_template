import React, { useState, useEffect } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';

import { Table } from 'antd';
import 'antd/dist/antd.css';
import { itemRender, onShowSizeChange } from "../../../../../MainPage/paginationfunction.jsx"
import "../../../../../MainPage/antdstyle.css"
import { useForm } from 'react-hook-form';
import axios from 'axios';
import swal from 'sweetalert';
const Organization = () => {

    const [data, setData] = useState([]);
    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [loadUpdate, setLoadUpdate] = useState(false);

    // React Hook Form 
    const {
        register: register2,
        reset: reset2,
        formState: { errors: errors },
        handleSubmit: handleSubmit2,
    } = useForm();
    const {
        register: register1,
        reset: reset1,
        formState: { errors: errors1 },
        handleSubmit: handleSubmit1,
    } = useForm();


    // post Method 
    const onSubmitPost = data => {



        axios({
            method: 'post',
            url: '/ords/eve/org/crud',
            data,
            headers: { 'Authorization': 'Bearer ...' }
        })
            .then(res => {
                if (!res.data) {
                    setLoadUpdate(true)
                    swal({
                        title: "Good!",
                        text: "Successfully Added",
                        icon: "success",
                        button: "Ok",
                    });
                    reset2();
                    window.$("#add_organization").modal("hide");
                }
            })


    }

    // PUT METHOD 

    const [getId, setGetId] = useState(null);

    const onSubmitUpdate = data1 => {

        // if (data1.leave_type) {
        //     data1.leave_type = data1.leave_type;
        // }
        // else {
        //     data1.leave_type = leaveType.leave_type;
        // }

        // if (data1.days_per_year) {
        //     data1.days_per_year = data1.days_per_year;
        // }
        // else {
        //     data1.days_per_year = leaveType.days_per_year;
        // }






        // PUT METHOD 
        axios({
            method: 'put',

            headers: {
                'LEAVE_ID': getId
            },
            url: `/ords/hrm/lea_typ/crud`,
            data: {
                LEAVE_TYPE: data1.leave_type,
                DAYS_PER_YEAR: data1.days_per_year



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

                    window.$("#edit_organization").modal("hide");
                }
            })


    }

    const handleUpdate = updateId => {
        //
        setGetId(updateId);
    }







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
                    const url = `/ords/eve/org/crud`
                    fetch(url,
                        {
                            method: 'DELETE',
                            headers: {
                                'organizer_id': Id
                            }
                        })
                        .then(item => {
                            const remainingUsers = data.filter(user => user.organizer_id !== Id);
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


    const [searchOrganization, setSearchOrganization] = useState('')
    // GET Organization DATA 
    useEffect(() => {
        const getUsers = () => {
            setIsLoading(true);

            fetch(`/ords/eve/org/crud?q={"organizer_name":{"$like":"%25${searchOrganization}%25"},"$orderby":{"organizer_id":"desc"}}`)
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
    }, [searchOrganization, loadUpdate])
    // get single organization 
    useEffect(() => {
        const getUsers = () => {
            setIsLoading(true);

            fetch(`/ords/eve/org/crud?q={"organizer_name":{"$like":"%25${searchOrganization}%25"},"$orderby":{"organizer_id":"desc"}}`)
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
    }, [searchOrganization, loadUpdate])
    const columns = [
        {
            title: 'Organizer ID',
            dataIndex: 'organizer_id',

        },
        {
            title: 'Organizer Name',
            dataIndex: 'organizer_name',

        },



        {
            title: 'Action',
            render: (text, record) => (
                <div className="dropdown dropdown-action text-right">
                    <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                    <div className="dropdown-menu dropdown-menu-right">
                        <a className="dropdown-item" href="#" data-toggle="modal" data-target="#edit_organization" onClick={() => { handleUpdate(record.organizer_id) }} ><i className="fa fa-pencil m-r-5" /> Edit</a>
                        <a className="dropdown-item" href="#" onClick={() => { deleteButtonHandler(record.organizer_id) }}><i className="fa fa-trash-o m-r-5" /> Delete</a>
                    </div>
                </div>
            ),
        },
    ]




    return (
        <div>
            <div className="page-wrapper">
                <Helmet>
                    <title>Organization - HR</title>
                    <meta name="description" content="Login page" />
                </Helmet>
                {/* Page Content */}
                <div className="content container-fluid">
                    {/* Page Header */}
                    <div className="page-header">
                        <div className="row align-items-center">
                            <div className="col">
                                <h3 className="page-title">Organization</h3>
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item"><Link to="/app/main/dashboard">Dashboard</Link></li>
                                    <li className="breadcrumb-item active">Organization</li>
                                </ul>
                            </div>
                            <div className="col-auto float-right ml-auto">
                                <a href="#" className="btn bgColor text-white add-btn" data-toggle="modal" data-target="#add_organization"><i className="fa fa-plus" /> Add New Organization</a>
                            </div>
                        </div>
                    </div>
                    {/* /Page Header */}


                    {/* Search Filter */}
                    <div className="row  mb-4 ps-2">

                        <input onChange={e => { setSearchOrganization(e.target.value) }} className="form-control w-25 shadow py-4" type="text" placeholder="Search Organization" />
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
                {/* Add organization Modal */}

                <div id="add_organization" className="modal custom-modal fade" role="dialog">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add new Organization</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body text-start">
                                <form onSubmit={handleSubmit2(onSubmitPost)}>
                                    <div className="row">

                                        <div className="mb-3">
                                            <label htmlFor="exampleFormControlInput14" className="form-label fw-bold small" >Organization Name</label>
                                            <input type="text" className="form-control" id="exampleFormControlInput14" placeholder="Organization Name" {...register2("ORGANIZER_NAME")} />
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





                {/* Edit organization Modal */}

                <div id="edit_organization" className="modal custom-modal fade" role="dialog">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Organization</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body text-start">
                                <form onSubmit={handleSubmit1(onSubmitUpdate)}>
                                    <div className="row">
                                        {/* defaultValue={leaveType.leave_type} */}
                                        <div className="mb-3">
                                            <label htmlFor="exampleFormControlInput14" className="form-label fw-bold small" >Organization Name</label>
                                            <input type="text" className="form-control" id="exampleFormControlInput14" placeholder="Organization Name" {...register1("ORGANIZER_NAME")} />
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

export default Organization;