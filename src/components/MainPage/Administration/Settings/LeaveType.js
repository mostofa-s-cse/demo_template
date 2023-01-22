
import React, { useState, useEffect } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import { Avatar_09, Avatar_02, Avatar_03, Avatar_05, Avatar_08, Avatar_10, Avatar_15, Avatar_20, Avatar_24, Avatar_25 } from "../../../Entryfile/imagepath"

import { Table } from 'antd';
import 'antd/dist/antd.css';
import { itemRender, onShowSizeChange } from "../../paginationfunction"
import "../../antdstyle.css"
import { useForm } from 'react-hook-form';
import axios from 'axios';
import swal from 'sweetalert';
const LeaveType = () => {

    const [data, setData] = useState([]);
    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
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

        axios({
            method: 'post',
            url: '/ords/hrm/lea_typ/crud',
            data: {
                LEAVE_TYPE: data1.leave_type,
                DAYS_PER_YEAR: data1.days_per_year
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

                    window.$("#add_leave_type").modal("hide");
                }
            })


    }

    // PUT METHOD 
    const [leaveType, setLeaveType] = useState([]);
    const [getId, setGetId] = useState(null);

    const onSubmitUpdate = data1 => {

        if (data1.leave_type) {
            data1.leave_type = data1.leave_type;
        }
        else {
            data1.leave_type = leaveType.leave_type;
        }

        if (data1.days_per_year) {
            data1.days_per_year = data1.days_per_year;
        }
        else {
            data1.days_per_year = leaveType.days_per_year;
        }


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

                    window.$("#edit_leave_type").modal("hide");
                }
            })


    }

    const handleUpdate = updateId => {
        //
        setGetId(updateId);
    }

    // GET Leave Type DATA 
    useEffect(() => {
        const getUsers = () => {
            setIsLoading(true);
            fetch(`/ords/hrm/lea_typ/${getId}`)
                .then(res => {

                    // You have to send it, as I have done below
                    if (res.status >= 400) {
                        throw new Error("Server responds with error!")
                    }
                    return res.json()
                })
                .then(users => {
                    setLeaveType(users);
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
                    const url = `/ords/hrm/lea_typ/crud`
                    fetch(url,
                        {
                            method: 'DELETE',
                            headers: {
                                'LEAVE_ID': Id
                            }
                        })
                        .then(item => {
                            const remainingUsers = data.filter(user => user.leave_id !== Id);
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


    const [searchLeaveType, setSearchLeaveType] = useState('')
    // GET Leave Type DATA 
    useEffect(() => {
        const getUsers = () => {
            setIsLoading(true);
            fetch(`/ords/hrm/lea_typ/crud?q={"leave_type":{"$like":"%25${searchLeaveType}%25"},"$orderby":{"leave_id":"desc"}}`)
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
    }, [searchLeaveType, loadUpdate])
    const columns = [
        {
            title: 'LEAVE ID',
            dataIndex: 'leave_id',

        },
        {
            title: 'LEAVE TYPE',
            dataIndex: 'leave_type',

        },
        {
            title: 'DAYS PER YEAR',
            dataIndex: 'days_per_year',

        },


        {
            title: 'Action',
            render: (text, record) => (
                <div className="dropdown dropdown-action text-right">
                    <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                    <div className="dropdown-menu dropdown-menu-right">
                        <a className="dropdown-item" href="#" data-toggle="modal" data-target="#edit_leave_type" onClick={() => { handleUpdate(record.leave_id) }} ><i className="fa fa-pencil m-r-5" /> Edit</a>
                        <a className="dropdown-item" href="#" onClick={() => { deleteButtonHandler(record.leave_id) }}><i className="fa fa-trash-o m-r-5" /> Delete</a>
                    </div>
                </div>
            ),
        },
    ]




    return (
        <div>
            <div className="page-wrapper">
                <Helmet>
                    <title>Leaves - HR</title>
                    <meta name="description" content="Login page" />
                </Helmet>
                {/* Page Content */}
                <div className="content container-fluid">
                    {/* Page Header */}
                    <div className="page-header">
                        <div className="row align-items-center">
                            <div className="col">
                                <h3 className="page-title">Leaves & duration</h3>
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item"><Link to="/app/main/dashboard">Dashboard</Link></li>
                                    <li className="breadcrumb-item active">Leaves</li>
                                </ul>
                            </div>
                            <div className="col-auto float-right ml-auto">
                                <a href="#" className="btn bgColor text-white add-btn" data-toggle="modal" data-target="#add_leave_type"><i className="fa fa-plus" /> Add New Leave</a>
                            </div>
                        </div>
                    </div>
                    {/* /Page Header */}


                    {/* Search Filter */}
                    <div className="row  mb-4 ps-2">

                        <input onChange={e => { setSearchLeaveType(e.target.value) }} className="form-control w-25 shadow py-4" type="text" placeholder="Search Leave Type" />
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
                {/* Add Leave Type Modal */}

                <div id="add_leave_type" className="modal custom-modal fade" role="dialog">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add new Leaves</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body text-start">
                                <form onSubmit={handleSubmit(onSubmitPost)}>
                                    <div className="row">

                                        <div className="mb-3">
                                            <label htmlFor="exampleFormControlInput14" className="form-label fw-bold small" >Leave type</label>
                                            <input type="text" className="form-control" id="exampleFormControlInput14" placeholder="Leave type" {...register("leave_type")} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="exampleFormControlInput14" className="form-label fw-bold small" >Days per year</label>
                                            <input type="number" className="form-control" id="exampleFormControlInput14" placeholder="Days per year" {...register("days_per_year")} />
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





                {/* Edit Leave type Modal */}

                <div id="edit_leave_type" className="modal custom-modal fade" role="dialog">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Leave type</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body text-start">
                                <form onSubmit={handleSubmit1(onSubmitUpdate)}>
                                    <div className="row">

                                        <div className="mb-3">
                                            <label htmlFor="exampleFormControlInput14" className="form-label fw-bold small" >Leave type</label>
                                            <input type="text" className="form-control" id="exampleFormControlInput14" defaultValue={leaveType.leave_type} {...register1("leave_type")} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="exampleFormControlInput14" className="form-label fw-bold small" >Days per year</label>
                                            <input type="number" className="form-control" id="exampleFormControlInput14" defaultValue={leaveType.days_per_year} {...register1("days_per_year")} />
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

export default LeaveType;