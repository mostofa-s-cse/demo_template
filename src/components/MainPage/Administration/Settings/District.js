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
const District = () => {
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
            url: '/ords/hrm/dist/crud',
            data: {
                DISTRICT: data1.district
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

                    window.$("#add_district").modal("hide");

                }
            })
    }

    // PUT METHOD 
    const [getDistrict, setGetDistrict] = useState([]);
    const [getId, setGetId] = useState(null);

    const onSubmitUpdate = data1 => {

        if (data1.district) {
            data1.district = data1.district;
        }
        else {
            data1.district = getDistrict.district;
        }



        // PUT METHOD 
        axios({
            method: 'put',

            headers: {
                'DISTRICT_ID': getId
            },
            url: `/ords/hrm/dist/crud`,
            data: {
                DISTRICT: data1.district



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


                    window.$("#edit_district").modal("hide");

                }
            })


    }

    const handleUpdate = updateId => {
        //
        setGetId(updateId);
    }
    //

    // GET District DATA 
    useEffect(() => {
        const getUsers = () => {
            setIsLoading(true);
            fetch(`/ords/hrm/dist/${getId}`)
                .then(res => {

                    // You have to send it, as I have done below
                    if (res.status >= 400) {
                        throw new Error("Server responds with error!")
                    }
                    return res.json()
                })
                .then(users => {
                    setGetDistrict(users);
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
                    const url = `/ords/hrm/dist/crud`
                    fetch(url,
                        {
                            method: 'DELETE',
                            headers: {
                                'DISTRICT_ID': Id
                            }
                        })
                        .then(item => {
                            const remainingUsers = data.filter(user => user.district_id !== Id);
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



    const [searchDistrict, setSearchDistrict] = useState('')
    // GET District DATA 
    useEffect(() => {
        const getUsers = () => {
            setIsLoading(true);
            fetch(`/ords/hrm/dist/crud?q={"$orderby":{"district":"asc"}}`)
                .then(res => {

                    // You have to send it, as I have done below
                    if (res.status >= 400) {
                        throw new Error("Server responds with error!")
                    }
                    return res.json()
                })
                .then(users => {
                    let disData = users.items;
                    const searchDisData = disData.filter(user => {
                        let disSearchData = user.district;
                        if (searchDistrict == '') {
                            return user;
                        }
                        else if (disSearchData.toLowerCase().includes(searchDistrict.toLocaleLowerCase()) || '') {
                            return user;
                        }
                    })
                    setData(searchDisData);
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
    }, [searchDistrict, loadUpdate])
    const columns = [
        {
            title: 'DISTRICT ID',
            dataIndex: 'district_id',

        },
        {
            title: 'DISTRICT',
            dataIndex: 'district',

        },



        {
            title: 'Action',
            render: (text, record) => (
                <div className="dropdown dropdown-action text-right">
                    <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                    <div className="dropdown-menu dropdown-menu-right">
                        <a className="dropdown-item" href="#" data-toggle="modal" data-target="#edit_district" onClick={() => { handleUpdate(record.district_id) }}><i className="fa fa-pencil m-r-5" /> Edit</a>
                        <a className="dropdown-item" href="#" onClick={() => { deleteButtonHandler(record.district_id) }}><i className="fa fa-trash-o m-r-5" /> Delete</a>
                    </div>
                </div>
            ),
        },
    ]

    return (
        <div>
            <div className="page-wrapper">
                <Helmet>
                    <title>District - HR</title>
                    <meta name="description" content="Login page" />
                </Helmet>
                {/* Page Content */}
                <div className="content container-fluid">
                    {/* Page Header */}
                    <div className="page-header">
                        <div className="row align-items-center">
                            <div className="col">
                                <h3 className="page-title">District</h3>
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item"><Link to="/app/main/dashboard">Dashboard</Link></li>
                                    <li className="breadcrumb-item active">District</li>
                                </ul>
                            </div>
                            <div className="col-auto float-right ml-auto">
                                <a href="#" className="btn bgColor text-white add-btn" data-toggle="modal" data-target="#add_district"><i className="fa fa-plus" /> Add New District</a>
                            </div>
                        </div>
                    </div>
                    {/* /Page Header */}


                    {/* Search Filter */}
                    <div className="row  mb-4 ps-2">

                        <input onChange={e => { setSearchDistrict(e.target.value) }} className="form-control w-25 shadow py-4" type="text" placeholder="Search District" />


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
                {/* Add District Modal */}

                <div id="add_district" className="modal custom-modal fade" role="dialog">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add new District</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body text-start">
                                <form onSubmit={handleSubmit(onSubmitPost)}>
                                    <div className="row">

                                        <div className="mb-3">
                                            <label htmlFor="exampleFormControlInput14" className="form-label fw-bold small" >District Name</label>
                                            <input type="text" className="form-control" id="exampleFormControlInput14" placeholder="Enter District Name" {...register("district")} />
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




                {/* Edit District Modal */}

                <div id="edit_district" className="modal custom-modal fade" role="dialog">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit District</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body text-start">
                                <form onSubmit={handleSubmit1(onSubmitUpdate)}>
                                    <div className="row">

                                        <div className="mb-3">
                                            <label htmlFor="exampleFormControlInput14" className="form-label fw-bold small" >District Name</label>
                                            <input type="text" className="form-control" id="exampleFormControlInput14" defaultValue={getDistrict.district} {...register1("district")} />
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



                {/* /Edit Leave Modal */}
                {/* Approve Leave Modal */}
                {/* <div className="modal custom-modal fade" id="approve_leave" role="dialog">
    <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
            <div className="modal-body">
                <div className="form-header">
                    <h3>Leave Approve</h3>
                    <p>Are you sure want to approve for this leave?</p>
                </div>
                <div className="modal-btn delete-action">
                    <div className="row">
                        <div className="col-6">
                            <a href="" className="btn btn-primary continue-btn">Approve</a>
                        </div>
                        <div className="col-6">
                            <a href="" data-dismiss="modal" className="btn btn-primary cancel-btn">Decline</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div> */}
                {/* /Approve Leave Modal */}
                {/* Delete Leave Modal */}
                {/* <div className="modal custom-modal fade" id="delete_approve" role="dialog">
    <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
            <div className="modal-body">
                <div className="form-header">
                    <h3>Delete Leave</h3>
                    <p>Are you sure want to delete this leave?</p>
                </div>
                <div className="modal-btn delete-action">
                    <div className="row">
                        <div className="col-6">
                            <a href="" className="btn btn-primary continue-btn">Delete</a>
                        </div>
                        <div className="col-6">
                            <a href="" data-dismiss="modal" className="btn btn-primary cancel-btn">Cancel</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div> */}
                {/* /Delete Leave Modal */}
            </div>
        </div>
    );
};

export default District;