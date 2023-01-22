
import React, { useState, useEffect } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import { Table } from 'antd';
import 'antd/dist/antd.css';
import Select from 'react-select'
import { itemRender, onShowSizeChange } from "../../paginationfunction"
import "../../antdstyle.css"
import { useForm } from 'react-hook-form';
import axios from 'axios';
import swal from 'sweetalert';

const AddSubModule = () => {

    const [data, setData] = useState([]);
    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [searchSubModule, setSearchSubModule] = useState('')
    const [loadUpdate, setLoadUpdate] = useState(false);

    const [subModuleData, setSubModuleData] = useState([]);
    const [getSubModuleName, setGetSubModuleName] = useState("");
    const [getSubModuleId, setGetSubModuleId] = useState("");


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




    // modules Category 

    const [moduleData, setModuleData] = useState([]);
    const [moduleCategory, setModuleCategory] = useState();


    useEffect(() => {
        const getUsers = () => {
            fetch('/ords/hrm/module_app')
                .then(res => {
                    if (res.status >= 400) {
                        throw new Error("Server responds with error!")
                    }
                    return res.json()
                })
                .then(data => {
                    setModuleData(data.items)
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
    const handleModuleCategory = selectedOption => {
        setModuleCategory(selectedOption.value);
    }
    //

    let categoryOptionsModule = moduleData.map(data => {
        let optionsItem = {};
        optionsItem.value = data.module_id;
        optionsItem.label = data.module_app;
        return optionsItem;
    })
    // GET module DATA 


    // post Method 
    const handleSubModuleSubmit = e => {
        let data = {}
        data.SUBMODULE_ID = parseInt(getSubModuleId);
        data.SUBMODULE_APP = getSubModuleName;
        data.MODULE_ID = parseInt(moduleCategory);
        // post data
        axios({
            method: 'post',
            url: '/ords/hrm/submod_app/',
            data,
            headers: { 'Authorization': 'Bearer ...' }
        })
            .then(res => {
                setLoadUpdate(true)
                swal({
                    title: "Good job!",
                    text: "Successfully Added",
                    icon: "success",
                    button: "Ok",
                });
                reset();

                window.$("#add_SubModule").modal("hide");

            })

        e.preventDefault();
    }
    // // PUT METHOD 
    const [getSubModule, setGetSubModule] = useState([]);
    const [getId, setGetId] = useState(null);

    const onSubmitUpdate = data1 => {

        if (data1.submodule) {
            data1.submodule = data1.submodule;
        }
        else {
            data1.submodule = getSubModule.submodule;
        }
        if (data1.submodule_id) {
            data1.submodule_id = data1.submodule_id;
        }
        else {
            data1.submodule_id = getSubModule.submodule_id;
        }
        // PUT METHOD 
        axios({
            method: 'put',
            url: `/ords/hrm/submod_app/${getId}`,
            data: {
                SUBMODULE_ID: data1.submodule_id,
                SUBMODULE_APP: data1.submodule,
                MODULE_ID: data1.module_id
            },
        })
            .then(res => {
                if (res.data) {
                    setLoadUpdate(true)
                    swal({
                        title: "Good job!",
                        text: "Successfully Updated",
                        icon: "success",
                        button: "Ok",
                    });
                    reset1();


                    window.$("#edit_subModule").modal("hide");


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
            fetch(`/ords/hrm/submod_app/${getId}`)
                .then(res => {

                    // You have to send it, as I have done below
                    if (res.status >= 400) {
                        throw new Error("Server responds with error!")
                    }
                    return res.json()
                })
                .then(users => {
                    setGetSubModule(users);
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
                    const url = `/ords/hrm/submod_app/${Id}`
                    fetch(url,
                        {
                            method: 'DELETE',
                            headers: {
                                'SUBMODULE_ID': Id
                            }
                        })
                        .then(item => {
                            const remainingUsers = data.filter(user => user.submodule_id !== Id);
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
            fetch(`/ords/hrm/submod_app/?limit=10000&&q={"$orderby":{"submodule_id":"asc"}}`)
                .then(res => {

                    // You have to send it, as I have done below
                    if (res.status >= 400) {
                        throw new Error("Server responds with error!")
                    }
                    return res.json()
                })
                .then(users => {
                    let subModuleData = users.items;
                    const searchSubModuleData = subModuleData.filter(user => {
                        let subModuleSearchData = user.subModule;
                        if (searchSubModule == '') {
                            return user;
                        }
                        else if (subModuleSearchData.toLowerCase().includes(searchSubModule.toLocaleLowerCase()) || '') {
                            return user;
                        }
                    })
                    setData(searchSubModuleData);
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
    }, [searchSubModule, loadUpdate])


    const columns = [
        {
            title: 'Submodule ID',
            dataIndex: 'submodule_id',

        },
        {
            title: 'Submodule',
            dataIndex: 'submodule_app',

        },


        {
            title: 'Action',
            render: (text, record) => (
                <div className="dropdown dropdown-action text-right">
                    <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                    <div className="dropdown-menu dropdown-menu-right">
                        <a className="dropdown-item" href="#" data-toggle="modal" data-target="#edit_subModule" onClick={() => { handleUpdate(record.submodule_id) }}><i className="fa fa-pencil m-r-5" /> Edit</a>
                        <a className="dropdown-item" href="#" onClick={() => { deleteButtonHandler(record.submodule_id) }}><i className="fa fa-trash-o m-r-5" /> Delete</a>
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
                                <h3 className="page-title">Submodule</h3>
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item"><Link to="/app/main/dashboard">Dashboard</Link></li>
                                    <li className="breadcrumb-item active">Submodule</li>
                                </ul>
                            </div>
                            <div className="col-auto float-right ml-auto">
                                <a href="#" className="btn bgColor text-white add-btn" data-toggle="modal" data-target="#add_SubModule"><i className="fa fa-plus" /> Add New Submodule</a>
                            </div>
                        </div>
                    </div>
                    {/* /Page Header */}


                    {/* Search Filter */}
                    <div className="row  mb-4 ps-2">

                        <input onChange={e => { setSearchSubModule(e.target.value) }} className="form-control w-25 shadow py-4" type="text" placeholder="Search Submodule" />


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
                {/* Add SubModule Modal */}


                <div id="add_SubModule" className="modal custom-modal fade" role="dialog">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add Submodule</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSubModuleSubmit}>
                                    <div className="form-group smart-text text-start">
                                        <div className="mb-3">
                                            <label htmlFor="inputGroupSelect12" className="form-label model-text">Module</label>

                                            <Select
                                                options={categoryOptionsModule}
                                                onChange={handleModuleCategory}

                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className='model-text'>Submodule Name <span className="text-danger">*</span></label>
                                            <input onChange={e => setGetSubModuleName(e.target.value)} className="form-control" type="text" />
                                        </div>
                                        <div className="mb-3">
                                            <label className='model-text'>Submodule Id <span className="text-danger">*</span></label>
                                            <input onChange={e => setGetSubModuleId(e.target.value)} className="form-control" type="text" />
                                        </div>
                                    </div>
                                    <div className="submit-section">
                                        <button className="btn btn-primary submit-btn">Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>




                {/* Edit  SubModule */}

                <div id="edit_subModule" className="modal custom-modal fade" role="dialog">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Submodule</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body text-start">
                                <form onSubmit={handleSubmit1(onSubmitUpdate)}>
                                    <div className="mb-3">
                                        <label>Submodule Name </label>
                                        <input type="text" className="form-control" id="exampleFormControlInput14" defaultValue={getSubModule.submodule_app} {...register1("submodule")} />
                                    </div>
                                    <div className="mb-3">
                                        <label>Submodule Id </label>
                                        <input type="number" className="form-control" id="exampleFormControlInput14" defaultValue={getSubModule.submodule_id} {...register1("submodule_id")} />
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

export default AddSubModule;