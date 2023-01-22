
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

const AddProgram = () => {

    const [data, setData] = useState([]);
    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [searchProgram, setSearchProgram] = useState('')
    const [loadUpdate, setLoadUpdate] = useState(false);

    const [programData, setProgramData] = useState([]);
    const [getProgramName, setGetProgramName] = useState("");
    const [getProgramPathName, setGetProgramPathName] = useState("");
    const [getProgramId, setGetProgramId] = useState("");


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
            fetch('/ords/hrm/module_app/')
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


    let categoryOptionsModule = moduleData.map(data => {
        let optionsItem = {};
        optionsItem.value = data.module_id;
        optionsItem.label = data.module_app;
        return optionsItem;
    })
    // GET module DATA 
    // submodules Category 

    const [subModuleData, setSubModuleData] = useState([]);
    const [subModuleCategory, setSubModuleCategory] = useState();

    useEffect(() => {
        const getUsers = () => {
            fetch(`/ords/hrm/submod_app/by_mod/${moduleCategory}`)
                .then(res => {
                    if (res.status >= 400) {
                        throw new Error("Server responds with error!")
                    }
                    return res.json()
                })
                .then(data => {
                    setSubModuleData(data.items)
                    setIsLoading(true);
                },
                    err => {
                        const mute = err
                        setHasError(true);
                        setIsLoading(true);
                    })
        };
        getUsers()
    }, [moduleCategory])
    const handleSubModuleCategory = selectedOption => {
        setSubModuleCategory(selectedOption.value);
    }

    let categoryOptionsSubModule = subModuleData.map(data => {
        let optionsItem = {};
        optionsItem.value = data.submodule_id;
        optionsItem.label = data.submodule_app;
        return optionsItem;
    })
    // GET module DATA 


    // post Method 
    const handleProgramSubmit = e => {
        let data = {}
        data.PROGRAM_ID = parseInt(getProgramId);
        data.PROGRAM = getProgramName;
        data.PROGRAM_PATH = getProgramPathName;
        data.MODULE_ID = parseInt(moduleCategory);
        data.SUBMODULE_ID = parseInt(subModuleCategory);
        // post data
        axios({
            method: 'post',
            url: '/ords/hrm/program/',
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

                window.$("#add_Program").modal("hide");

            })

        e.preventDefault();
    }
    // // PUT METHOD 
    const [getProgram, setGetProgram] = useState([]);
    const [getId, setGetId] = useState(null);

    const onSubmitUpdate = data1 => {

        if (data1.program) {
            data1.program = data1.program;
        }
        else {
            data1.program = getProgram.program;
        }
        if (data1.program_path) {
            data1.program_path = data1.program_path;
        }
        else {
            data1.program_path = getProgram.program_path;
        }
        if (data1.program_id) {
            data1.program_id = data1.program_id;
        }
        else {
            data1.program_id = getProgram.program_id;
        }
        // PUT METHOD 
        axios({
            method: 'put',
            url: `/ords/hrm/program/${getId}`,
            data: {
                PROGRAM_ID: data1.program_id,
                MODULE_ID: getProgram.module_id,
                PROGRAM: data1.program,
                PROGRAM_PATH: data1.program_path,
                SUBMODULE_ID: getProgram.submodule_id
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


                    window.$("#edit_program").modal("hide");


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
            fetch(`/ords/hrm/program/${getId}`)
                .then(res => {

                    // You have to send it, as I have done below
                    if (res.status >= 400) {
                        throw new Error("Server responds with error!")
                    }
                    return res.json()
                })
                .then(users => {
                    setGetProgram(users);
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
                    const url = `/ords/hrm/program/${Id}`
                    fetch(url,
                        {
                            method: 'DELETE',
                            headers: {
                                'PROGRAM_ID': Id
                            }
                        })
                        .then(item => {
                            const remainingUsers = data.filter(user => user.program_id !== Id);
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
            fetch(`/ords/hrm/program/?limit=10000&&q={"$orderby":{"program_id":"asc"}}`)
                .then(res => {

                    // You have to send it, as I have done below
                    if (res.status >= 400) {
                        throw new Error("Server responds with error!")
                    }
                    return res.json()
                })
                .then(users => {
                    let programData = users.items;
                    const searchProgramData = programData.filter(user => {
                        let programSearchData = user.program;
                        if (searchProgram == '') {
                            return user;
                        }
                        else if (programSearchData.toLowerCase().includes(searchProgram.toLocaleLowerCase()) || '') {
                            return user;
                        }
                    })
                    setData(searchProgramData);
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
    }, [searchProgram, loadUpdate])


    const columns = [
        {
            title: 'Program ID',
            dataIndex: 'program_id',

        },
        {
            title: 'Program',
            dataIndex: 'program',

        },
        {
            title: 'Program Path',
            dataIndex: 'program_path',

        },


        {
            title: 'Action',
            render: (text, record) => (
                <div className="dropdown dropdown-action text-right">
                    <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                    <div className="dropdown-menu dropdown-menu-right">
                        <a className="dropdown-item" href="#" data-toggle="modal" data-target="#edit_program" onClick={() => { handleUpdate(record.program_id) }}><i className="fa fa-pencil m-r-5" /> Edit</a>
                        <a className="dropdown-item" href="#" onClick={() => { deleteButtonHandler(record.program_id) }}><i className="fa fa-trash-o m-r-5" /> Delete</a>
                    </div>
                </div>
            ),
        },
    ]



    return (
        <div>
            <div className="page-wrapper">
                <Helmet>
                    <title>Program - HR</title>
                    <meta name="description" content="Login page" />
                </Helmet>
                {/* Page Content */}
                <div className="content container-fluid">
                    {/* Page Header */}
                    <div className="page-header">
                        <div className="row align-items-center">
                            <div className="col">
                                <h3 className="page-title">Program</h3>
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item"><Link to="/app/main/dashboard">Dashboard</Link></li>
                                    <li className="breadcrumb-item active">Program</li>
                                </ul>
                            </div>
                            <div className="col-auto float-right ml-auto">
                                <a href="#" className="btn bgColor text-white add-btn" data-toggle="modal" data-target="#add_Program"><i className="fa fa-plus" /> Add New Program</a>
                            </div>
                        </div>
                    </div>
                    {/* /Page Header */}


                    {/* Search Filter */}
                    <div className="row  mb-4 ps-2">

                        <input onChange={e => { setSearchProgram(e.target.value) }} className="form-control w-25 shadow py-4" type="text" placeholder="Search Program" />


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
                {/* Add Program Modal */}


                <div id="add_Program" className="modal custom-modal fade" role="dialog">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add Program</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleProgramSubmit}>
                                    <div className="form-group smart-text text-start">
                                        <div className="mb-3">
                                            <label htmlFor="inputGroupSelect12" className="form-label model-text">Module</label>

                                            <Select
                                                options={categoryOptionsModule}
                                                onChange={handleModuleCategory}

                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="inputGroupSelect12" className="form-label model-text">Submodule</label>

                                            <Select
                                                options={categoryOptionsSubModule}
                                                onChange={handleSubModuleCategory}

                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className='model-text'>Program Name <span className="text-danger">*</span></label>
                                            <input onChange={e => setGetProgramName(e.target.value)} className="form-control" type="text" />
                                        </div>
                                        <div className="mb-3">
                                            <label className='model-text'>Program Path <span className="text-danger">*</span></label>
                                            <input onChange={e => setGetProgramPathName(e.target.value)} placeholder="Path Name" className="form-control" type="text" />
                                        </div>
                                        <div className="mb-3">
                                            <label className='model-text'>Program Id <span className="text-danger">*</span></label>
                                            <input onChange={e => setGetProgramId(e.target.value)} className="form-control" type="text" />
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




                {/* Edit  Program */}

                <div id="edit_program" className="modal custom-modal fade" role="dialog">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Program</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body text-start">
                                <form onSubmit={handleSubmit1(onSubmitUpdate)}>
                                    <div className="mb-3">
                                        <label>Program Name </label>
                                        <input type="text" className="form-control" id="exampleFormControlInput14" defaultValue={getProgram.program} {...register1("program")} />
                                    </div>
                                    <div className="mb-3">
                                        <label>Program Path </label>
                                        <input type="text" className="form-control" id="exampleFormControlInput14" defaultValue={getProgram.program_path} {...register1("program_path")} />
                                    </div>
                                    <div className="mb-3">
                                        <label>Program Id </label>
                                        <input type="number" className="form-control" id="exampleFormControlInput14" defaultValue={getProgram.program_id} {...register1("program_id")} />
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

export default AddProgram;