
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


const Grade = () => {

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
            url: '/ords/hrm/gra/crud',
            data: {
                GRADE: data1.grade,
                PAY_SCALE_FROM: data1.pay_scale_from,
                PAY_SCALE_TO: data1.pay_scale_to,
                PAY_SCALE_FULL: `${data1.pay_scale_full}`,
                EXTRA_DATA: `${data1.extra_data}`
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

                    window.$("#add_grade").modal("hide");


                }
            })



    }


    // PUT METHOD 
    const [getGrade, setGetGrade] = useState([]);
    const [getId, setGetId] = useState(null);

    const onSubmitUpdate = data1 => {

        if (data1.grade) {
            data1.grade = data1.grade;
        }
        else {
            data1.grade = getGrade.grade;
        }

        if (data1.pay_scale_from) {
            data1.pay_scale_from = data1.pay_scale_from;
        }
        else {
            data1.pay_scale_from = getGrade.pay_scale_from;
        }

        if (data1.pay_scale_to) {
            data1.pay_scale_to = data1.pay_scale_to;
        }
        else {
            data1.pay_scale_to = getGrade.pay_scale_to;
        }
        if (data1.pay_scale_full) {
            data1.pay_scale_full = data1.pay_scale_full;
        }
        else {
            data1.pay_scale_full = getGrade.pay_scale_full;
        }
        if (data1.extra_data) {
            data1.extra_data = data1.extra_data;
        }
        else {
            data1.extra_data = getGrade.extra_data;
        }


        // PUT METHOD 
        axios({
            method: 'put',
            url: `/ords/hrm/gra/crud`,

            headers: {
                'grade_id': getId
            },

            data: {
                GRADE: data1.grade,
                PAY_SCALE_FROM: data1.pay_scale_from,
                PAY_SCALE_TO: data1.pay_scale_to,
                PAY_SCALE_FULL: data1.pay_scale_full,
                EXTRA_DATA: data1.extra_data

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
                    window.$("#edit_grade").modal("hide");
                }
            })



    }

    const handleUpdate = updateId => {
        //
        setGetId(updateId);
    }
    //

    // GET Grade DATA 
    useEffect(() => {
        const getUsers = () => {
            setIsLoading(true);
            fetch(`/ords/hrm/gra/${getId}`)
                .then(res => {

                    // You have to send it, as I have done below
                    if (res.status >= 400) {
                        throw new Error("Server responds with error!")
                    }
                    return res.json()
                })
                .then(users => {
                    setGetGrade(users);
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
    const deleteButtonHandler = (gradeId) => {
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
                    const url = `/ords/hrm/gra/crud`
                    fetch(url,
                        {
                            method: 'DELETE',
                            headers: {
                                'GRADE_ID': gradeId
                            }
                        })
                        .then(item => {
                            const remainingUsers = data.filter(user => user.grade_id !== gradeId);
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

    const [searchGrade, setSearchGrade] = useState('')
    // GET Grade DATA 
    // ?q={"grade":{"$like":"%25${searchGrade}%25"},"$orderby":{"grade_id":"desc"}}?limit=10000
    useEffect(() => {
        const getUsers = () => {
            setIsLoading(true);
            fetch(`/ords/hrm/gra?limit=10000&&q={"$orderby":{"pay_scale_from":"desc"}}`)
                .then(res => {

                    // You have to send it, as I have done below
                    if (res.status >= 400) {
                        throw new Error("Server responds with error!")
                    }
                    return res.json()
                })
                .then(users => {
                    let desData = users.items;
                    const searchGradeData = desData.filter(user => {
                        let gradeSearchData = user.grade;
                        if (searchGrade == '') {
                            return user;
                        }
                        else if (gradeSearchData.toLowerCase().includes(searchGrade.toLocaleLowerCase()) || '') {
                            return user;
                        }
                    })
                    setData(searchGradeData);
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
    }, [searchGrade, loadUpdate])
    const columns = [
        {
            title: 'GRADE ID',
            dataIndex: 'grade_id',

        },
        {
            title: 'GRADE',
            dataIndex: 'grade',

        },
        {
            title: 'PAY SCALE FROM',
            dataIndex: 'pay_scale_from',

        },
        {
            title: 'PAY SCALE TO',
            dataIndex: 'pay_scale_to',

        },
        {
            className: 'dataBreak',
            title: 'Full Scale 2015(New)',
            dataIndex: 'pay_scale_full',

        },
        {
            className: "dataBreak",
            title: 'Full Scale 2009(Old)',
            dataIndex: 'extra_data',

        },


        {
            title: 'Action',
            render: (text, record) => (
                <div className="dropdown dropdown-action text-right">
                    <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                    <div className="dropdown-menu dropdown-menu-right">
                        <a className="dropdown-item" href="#" data-toggle="modal" data-target="#edit_grade" onClick={() => { handleUpdate(record.grade_id) }}><i className="fa fa-pencil m-r-5" /> Edit</a>
                        <a className="dropdown-item" href="#" onClick={() => { deleteButtonHandler(record.grade_id) }}><i className="fa fa-trash-o m-r-5" /> Delete</a>
                    </div>
                </div>
            ),
        },
    ]



    return (
        <div>
            <div className="page-wrapper">
                <Helmet>
                    <title>Grade - HR</title>
                    <meta name="description" content="Login page" />
                </Helmet>
                {/* Page Content */}
                <div className="content container-fluid">
                    {/* Page Header */}
                    <div className="page-header">
                        <div className="row align-items-center">
                            <div className="col">
                                <h3 className="page-title">National Grades / Pay scales</h3>
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item"><Link to="/app/main/dashboard">Dashboard</Link></li>
                                    <li className="breadcrumb-item active">Grade</li>
                                </ul>
                            </div>
                            <div className="col-auto float-right ml-auto">
                                <a href="#" className="btn bgColor text-white add-btn" data-toggle="modal" data-target="#add_grade"><i className="fa fa-plus" /> Add New Grade</a>
                            </div>
                        </div>
                    </div>
                    {/* /Page Header */}


                    {/* Search Filter */}
                    <div className="row  mb-4 ps-2">

                        <input onChange={e => { setSearchGrade(e.target.value) }} className="form-control w-25 shadow py-4" type="text" placeholder="Search Grade" />


                    </div>
                    {/* /Search Filter */}
                    <div className="row">
                        <div className="col-md-12">
                            <div className="">

                                <Table className="table-striped table-hover"
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
                {/* Add Grade Modal */}


                <div id="add_grade" className="modal custom-modal fade" role="dialog">
                    <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add new grade</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body text-start">
                                <form onSubmit={handleSubmit(onSubmitPost)}>
                                    <div className="row">

                                        <div className="mb-3">
                                            <label htmlFor="exampleFormControlInput14" className="form-label fw-bold small" >Grade</label>
                                            <input type="text" className="form-control" id="exampleFormControlInput14" placeholder="Grade" {...register("grade")} />
                                        </div>
                                        <div className="row">
                                            <div className="mb-3 col-sm-6">
                                                <label htmlFor="exampleFormControlInput14" className="form-label fw-bold small" >Pay scale from</label>
                                                <input type="number" className="form-control" id="exampleFormControlInput14" placeholder="0"  {...register("pay_scale_from")} />
                                            </div>
                                            <div className="mb-3 col-sm-6">
                                                <label htmlFor="exampleFormControlInput14" className="form-label fw-bold small" >Pay scale to</label>
                                                <input type="number" className="form-control" id="exampleFormControlInput14" placeholder="0" {...register("pay_scale_to")} />
                                            </div></div>
                                        <div className="mb-3">
                                            <label htmlFor="exampleFormControlTextarea1" className="form-label fw-bold small">National Salary Scale 2015(New)</label>
                                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="2" placeholder='National Salary Scale 2015(New)'{...register("pay_scale_full")}></textarea>
                                        </div>

                                        <div className="">
                                            <label htmlFor="exampleFormControlTextarea1" className="form-label fw-bold small">National Salary Scale 2009(Old)</label>
                                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="2" placeholder='National Salary Scale 2009(Old)'{...register("extra_data")}></textarea>
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



                {/* Edit Grade Modal */}

                <div id="edit_grade" className="modal custom-modal fade" role="dialog">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Grade</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body text-start">
                                <form onSubmit={handleSubmit1(onSubmitUpdate)}>
                                    <div className="row">

                                        <div className="mb-3">
                                            <label htmlFor="exampleFormControlInput14" className="form-label fw-bold small" >Grade</label>
                                            <input type="text" className="form-control" id="exampleFormControlInput14" defaultValue={getGrade.grade} {...register1("grade")} />
                                        </div>
                                        <div className="row">
                                            <div className="mb-3 col-sm-6">
                                                <label htmlFor="exampleFormControlInput14" className="form-label fw-bold small" >Pay scale from</label>
                                                <input type="number" className="form-control" id="exampleFormControlInput14" defaultValue={getGrade.pay_scale_from} {...register1("pay_scale_from")} />
                                            </div>
                                            <div className="mb-3 col-sm-6">
                                                <label htmlFor="exampleFormControlInput14" className="form-label fw-bold small" >Pay scale to</label>
                                                <input type="number" className="form-control" id="exampleFormControlInput14" defaultValue={getGrade.pay_scale_to} {...register1("pay_scale_to")} />
                                            </div></div>
                                        <div className="mb-3">
                                            <label htmlFor="exampleFormControlTextarea1" className="form-label fw-bold small">National Salary Scale 2015(New)</label>
                                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="2" defaultValue={getGrade.pay_scale_full} {...register1("pay_scale_full")}></textarea>
                                        </div>

                                        <div className="">
                                            <label htmlFor="exampleFormControlTextarea1" className="form-label fw-bold small">National Salary Scale 2009(Old)</label>
                                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="2" defaultValue={getGrade.extra_data}  {...register1("extra_data")}></textarea>
                                        </div>








                                        {/* <div className="mb-3">
                                            <label htmlFor="exampleFormControlInput14" className="form-label fw-bold small" >Pay scale from</label>
                                            <input type="number" className="form-control" id="exampleFormControlInput14" defaultValue={getGrade.pay_scale_from} {...register1("pay_scale_from")} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="exampleFormControlInput14" className="form-label fw-bold small" >Pay scale to</label>
                                            <input type="number" className="form-control" id="exampleFormControlInput14" defaultValue={getGrade.pay_scale_to} {...register1("pay_scale_to")} />
                                        </div> */}




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

export default Grade;