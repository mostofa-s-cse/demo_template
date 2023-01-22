
import React, { useState, useEffect } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import { Table } from 'antd';
import 'antd/dist/antd.css';
import { itemRender, onShowSizeChange } from "../../paginationfunction"
import "../../antdstyle.css"
import { useForm } from 'react-hook-form';
import axios from 'axios';
import swal from 'sweetalert';

const AddModule = () => {

    const [data, setData] = useState([]);
    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [searchModule, setSearchModule] = useState('')
    const [loadUpdate, setLoadUpdate] = useState(false);

    const [moduleData, setModuleData] = useState([]);
    const [getModuleName, setGetModuleName] = useState("");
    const [getModuleId, setGetModuleId] = useState("");


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
    const handleModuleSubmit = e => {
        let data = {}
        data.MODULE_ID = parseInt(getModuleId);
        data.MODULE_APP = getModuleName;
        // post data
        axios({
            method: 'post',
            url: '/ords/hrm/module_app/crud',
            data,
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

                    window.$("#add_module").modal("hide");
                }
            })

        e.preventDefault();
    }
    // // PUT METHOD 
    const [getModule, setGetModule] = useState([]);
    const [getId, setGetId] = useState(null);

    const onSubmitUpdate = data1 => {

        if (data1.module) {
            data1.module = data1.module;
        }
        else {
            data1.module = getModule.module;
        }
        if (data1.module_id) {
            data1.module_id = data1.module_id;
        }
        else {
            data1.module_id = getModule.module_id;
        }
        // PUT METHOD 
        axios({
            method: 'put',
            headers: {
                'MODULE_ID': getId
            },
            url: `/ords/hrm/module_app/crud`,
            data: {
                MODULE_ID: data1.module_id,
                MODULE_APP: data1.module
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


                    window.$("#edit_module").modal("hide");


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
            fetch(`/ords/hrm/module_app/${getId}`)
                .then(res => {

                    // You have to send it, as I have done below
                    if (res.status >= 400) {
                        throw new Error("Server responds with error!")
                    }
                    return res.json()
                })
                .then(users => {
                    setGetModule(users);
                    setIsLoading(false);
                },

                    err => {
                        const mute = err
                        setHasError(true);
                        setIsLoading(true);
                    })
        };
        getUsers()
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
                    const url = `/ords/hrm/module_app/crud`
                    fetch(url,
                        {
                            method: 'DELETE',
                            headers: {
                                'MODULE_ID': Id
                            }
                        })
                        .then(item => {
                            const remainingUsers = data.filter(user => user.module_id !== Id);
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


    // GET Module DATA 
    useEffect(() => {
        const getUsers = () => {
            setIsLoading(true);
            fetch(`/ords/hrm/module_app/crud?limit=10000&&q={"$orderby":{"module_id":"asc"}}`)
                .then(res => {

                    // You have to send it, as I have done below
                    if (res.status >= 400) {
                        throw new Error("Server responds with error!")
                    }
                    return res.json()
                })
                .then(users => {
                    let moduleData = users.items;
                    const searchModuleData = moduleData.filter(user => {
                        let moduleSearchData = user.module;
                        if (searchModule == '') {
                            return user;
                        }
                        else if (moduleSearchData.toLowerCase().includes(searchModule.toLocaleLowerCase()) || '') {
                            return user;
                        }
                    })
                    setData(searchModuleData);
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
    }, [searchModule, loadUpdate])


    const columns = [
        {
            title: 'Module ID',
            dataIndex: 'module_id',

        },
        {
            title: 'Module',
            dataIndex: 'module_app',

        },


        {
            title: 'Action',
            render: (text, record) => (
                <div className="dropdown dropdown-action text-right">
                    <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                    <div className="dropdown-menu dropdown-menu-right">
                        <a className="dropdown-item" href="#" data-toggle="modal" data-target="#edit_module" onClick={() => { handleUpdate(record.module_id) }}><i className="fa fa-pencil m-r-5" /> Edit</a>
                        <a className="dropdown-item" href="#" onClick={() => { deleteButtonHandler(record.module_id) }}><i className="fa fa-trash-o m-r-5" /> Delete</a>
                    </div>
                </div>
            ),
        },
    ]



    return (
        <div>
            <div className="page-wrapper">
                <Helmet>
                    <title>Role - HR</title>
                    <meta name="description" content="Login page" />
                </Helmet>
                {/* Page Content */}
                <div className="content container-fluid">
                    {/* Page Header */}
                    <div className="page-header">
                        <div className="row align-items-center">
                            <div className="col">
                                <h3 className="page-title">Module</h3>
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item"><Link to="/app/main/dashboard">Dashboard</Link></li>
                                    <li className="breadcrumb-item active">Module</li>
                                </ul>
                            </div>
                            <div className="col-auto float-right ml-auto">
                                <a href="#" className="btn bgColor text-white add-btn" data-toggle="modal" data-target="#add_module"><i className="fa fa-plus" /> Add New Module</a>
                            </div>
                        </div>
                    </div>
                    {/* /Page Header */}


                    {/* Search Filter */}
                    <div className="row  mb-4 ps-2">

                        <input onChange={e => { setSearchModule(e.target.value) }} className="form-control w-25 shadow py-4" type="text" placeholder="Search Module" />


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
                {/* Add Module Modal */}


                <div id="add_module" className="modal custom-modal fade" role="dialog">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add Module</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleModuleSubmit}>
                                    <div className="form-group text-start">
                                        <label>Module Name <span className="text-danger">*</span></label>
                                        <input onChange={e => setGetModuleName(e.target.value)} className="form-control" type="text" />
                                        <label>Module Id <span className="text-danger">*</span></label>
                                        <input onChange={e => setGetModuleId(e.target.value)} className="form-control" type="text" />
                                    </div>
                                    <div className="submit-section">
                                        <button className="btn btn-primary submit-btn">Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>




                {/* Edit  module */}

                <div id="edit_module" className="modal custom-modal fade" role="dialog">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Module</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body text-start">
                                <form onSubmit={handleSubmit1(onSubmitUpdate)}>
                                    <div className="mb-3">
                                        <label>Module Name </label>
                                        <input type="text" className="form-control" id="exampleFormControlInput14" defaultValue={getModule.module_app} {...register1("module")} />
                                    </div>
                                    <div className="mb-3">
                                        <label>Module Id </label>
                                        <input type="number" className="form-control" id="exampleFormControlInput14" defaultValue={getModule.module_id} {...register1("module_id")} />
                                    </div>


                                    <div className="submit-section">
                                        <button type="submit" className="btn bgColor text-white px-5 py-2 rounded" >Update</button>

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

export default AddModule;