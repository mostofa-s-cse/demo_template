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

const LoanType = () => {

    const [data, setData] = useState([]);
    const [hasError, setHasError] = useState(false);
    const [loadUpdate, setLoadUpdate] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

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
            url: '/ords/hrm/loa_typ/crud',
            data: {
                LOAN_TYPE: data1.loan_type
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

                    window.$("#add_loan_type").modal("hide");
                }
            })


    }

    // PUT METHOD 
    const [loanType, setLoanType] = useState([]);
    const [getId, setGetId] = useState(null);

    const onSubmitUpdate = data1 => {

        if (data1.loan_type) {
            data1.loan_type = data1.loan_type;
        }
        else {
            data1.loan_type = loanType.loan_type;
        }


        // PUT METHOD 
        axios({
            method: 'put',

            headers: {
                'LOAN_ID': getId
            },
            url: `/ords/hrm/loa_typ/crud`,
            data: {
                LOAN_TYPE: data1.loan_type


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

                    window.$("#edit_loan_type").modal("hide");
                }
            })


    }

    const handleUpdate = updateId => {
        //
        setGetId(updateId);
    }
    // GET Loan Type DATA 
    useEffect(() => {
        const getUsers = () => {
            setIsLoading(true);
            fetch(`/ords/hrm/loa_typ/${getId}`)
                .then(res => {

                    // You have to send it, as I have done below
                    if (res.status >= 400) {
                        throw new Error("Server responds with error!")
                    }
                    return res.json()
                })
                .then(users => {
                    setLoanType(users);
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




    // Delete Loan Type
    const deleteButtonHandler = (loanId) => {
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
                    const url = `/ords/hrm/loa_typ/crud`
                    fetch(url,
                        {
                            method: 'DELETE',
                            headers: {
                                'LOAN_ID': loanId
                            }
                        })
                        .then(item => {
                            const remainingUsers = data.filter(user => user.loan_id !== loanId);
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


    const [searchLoanType, setSearchLoanType] = useState('')
    // GET Loan Type DATA 
    useEffect(() => {
        const getUsers = () => {
            setIsLoading(true);
            fetch(`/ords/hrm/loa_typ/crud?limit=10000&&q={"$orderby":{"loan_id":"desc"}}`)
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
    }, [searchLoanType, loadUpdate])
    const columns = [
        {
            title: 'LOAN ID',
            dataIndex: 'loan_id',

        },
        {
            title: 'LOAN TYPE',
            dataIndex: 'loan_type',

        },


        {
            title: 'Action',
            render: (text, record) => (
                <div className="dropdown dropdown-action text-right">
                    <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                    <div className="dropdown-menu dropdown-menu-right">
                        <a className="dropdown-item" href="#" data-toggle="modal" data-target="#edit_loan_type" onClick={() => { handleUpdate(record.loan_id) }}><i className="fa fa-pencil m-r-5" /> Edit</a>
                        <a className="dropdown-item" href="#" onClick={() => { deleteButtonHandler(record.loan_id) }}><i className="fa fa-trash-o m-r-5" /> Delete</a>
                    </div>
                </div>
            ),
        },
    ]







    return (
        <div>
            <div className="page-wrapper">
                <Helmet>
                    <title>Loan Types - HR</title>
                    <meta name="description" content="Login page" />
                </Helmet>
                {/* Page Content */}
                <div className="content container-fluid">
                    {/* Page Header */}
                    <div className="page-header">
                        <div className="row align-items-center">
                            <div className="col">
                                <h3 className="page-title">Loan types</h3>
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item"><Link to="/app/main/dashboard">Dashboard</Link></li>
                                    <li className="breadcrumb-item active">Loan types</li>
                                </ul>
                            </div>
                            <div className="col-auto float-right ml-auto">
                                <a href="#" className="btn bgColor text-white add-btn" data-toggle="modal" data-target="#add_loan_type"><i className="fa fa-plus" /> Add Loan type</a>
                            </div>
                        </div>
                    </div>
                    {/* /Page Header */}

                    {/* /Leave Statistics */}
                    {/* Search Filter */}
                    <div className="row  mb-4 ps-2">

                        <input onChange={e => { setSearchLoanType(e.target.value) }} className="form-control w-25 shadow py-4" type="text" placeholder="Search Loan Type" />


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
                {/* Add Loan Type Modal */}

                <div id="add_loan_type" className="modal custom-modal fade" role="dialog">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add Loan type</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body text-start">
                                <form onSubmit={handleSubmit(onSubmitPost)}>
                                    <div className="row">

                                        <div className="mb-3">
                                            <label htmlFor="exampleFormControlInput14" className="form-label fw-bold small" >Loan Type</label>
                                            <input type="text" className="form-control" id="exampleFormControlInput14" placeholder="Loan Type" {...register("loan_type")} />
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




                {/* Edit Loan Type Modal */}

                <div id="edit_loan_type" className="modal custom-modal fade" role="dialog">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Loan Type</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body text-start">
                                <form onSubmit={handleSubmit1(onSubmitUpdate)}>
                                    <div className="row">

                                        <div className="mb-3">
                                            <label htmlFor="exampleFormControlInput14" className="form-label fw-bold small" >Loan Type</label>
                                            <input type="text" className="form-control" id="exampleFormControlInput14" defaultValue={loanType.loan_type} {...register1("loan_type")} />
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

export default LoanType;