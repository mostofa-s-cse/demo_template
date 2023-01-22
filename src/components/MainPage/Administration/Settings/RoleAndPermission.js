
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

const RoleAndPermission = () => {

    const [rolePermissionData, setRolePermissionData] = useState([]);
    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [searchRoleAccess, setSearchRoleAccess] = useState('')
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




    // modules Category 

    const [roleData, setRoleData] = useState([]);
    const [roleCategory, setRoleCategory] = useState();


    useEffect(() => {
        const getRoleData = () => {
            fetch('/ords/hrm/ass_pre/crud')
                .then(res => {
                    if (res.status >= 400) {
                        throw new Error("Server responds with error!")
                    }
                    return res.json()
                })
                .then(data => {
                    setRoleData(data.items)
                    setIsLoading(true);
                },
                    err => {
                        const mute = err
                        setHasError(true);
                        setIsLoading(true);
                    })
        };
        getRoleData()
    }, [])
    const handleRoleCategory = selectedOption => {
        setRoleCategory(selectedOption.value);

    }


    let categoryOptionsRole = roleData.map(data => {
        let optionsItem = {};
        optionsItem.value = data.role_id;
        optionsItem.label = data.role;
        return optionsItem;
    })
    // GET module DATA 
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
        if (moduleCategory) {
            getUsers()
        }
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
    // Progrma Category 

    const [programData, setProgramData] = useState([]);
    const [programCategory, setProgramCategory] = useState();
    const [theArray, setTheArray] = useState([]);
    const [rolePermissionDataLoad, setRolePermissionDataLoad] = useState(false);
    useEffect(() => {
        const getUsers = () => {
            fetch(`/ords/hrm/pro/by_sub_mod/${subModuleCategory}`)
                .then(res => {
                    if (res.status >= 400) {
                        throw new Error("Server responds with error!")
                    }
                    return res.json()
                })
                .then(data => {
                    const allProgram = data.items;
                    const filterProgram = allProgram.filter(a => !roleProgramData.map(b => b.program_id).includes(a.program_id))
                    setProgramData(filterProgram)
                    setIsLoading(true);
                },
                    err => {
                        const mute = err
                        setHasError(true);
                        setIsLoading(true);
                    })
        };
        if (subModuleCategory) {
            getUsers()
        }
    }, [subModuleCategory])
    const handleProgramCategory = selectedOption => {
        let roleProgramData = selectedOption.value;
        const result = theArray.filter(item => item === roleProgramData);
        if (result.length) {
            swal({
                title: "This program already exists",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
        }
        else {
            setTheArray([...theArray, roleProgramData]);
        }
        setSubModuleCategory(selectedOption.value);
    }

    let categoryOptionsProgram = programData.map(data => {
        let optionsItem = {};
        optionsItem.value = `${data.program_id}|${data.program}`;
        optionsItem.label = data.program;
        return optionsItem;
    })
    const sliceProgramName = (data) => {
        const myArray = data.split("|");
        return myArray[1];
    }
    const deleteAssignProgramHandler = (pId) => {
        const result = theArray.filter(item => item !== pId);
        setTheArray(result)
    }


    const addRolePermissionHandler = () => {
        const ids = rolePermissionData.map(object => {
            return object.role_access_id;
        });
        let max = Math.max(...ids);
        try {
            theArray.map(async item => {
                const myArray = item.split("|");
                max = max + 1;
                const data = {
                    ROLE_ACCESS_ID: max,
                    PROGRAM_ID: parseInt(myArray[0]),
                    ROLE_ID: roleCategory
                }
                await axios({
                    method: 'post',
                    url: '/ords/hrm/role_access/',
                    data,

                    headers: { 'Authorization': 'Bearer ...' }
                })
                    .then(res => {
                    }).catch(function (error) {

                    });

            })
        }
        catch (e) {

        }
        setTheArray([])
        swal({
            title: "Good job!",
            text: "Successfully Added",
            icon: "success",
            button: "Ok",
        });
        setRolePermissionDataLoad(true);
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
                    const url = `/ords/hrm/role_access/${Id}`
                    fetch(url,
                        {
                            method: 'DELETE',
                            headers: {
                                'ROLE_ACCESS_ID': Id
                            }
                        })
                        .then(item => {
                            const remainingUsers = roleProgramData.filter(user => user.role_access_id !== Id);
                            setRoleProgramData(remainingUsers)

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
            fetch(`/ords/hrm/rol_acc/v_role_acc?limit=10000&&q={"$orderby":{"role_access_id":"asc"}}`)
                .then(res => {

                    // You have to send it, as I have done below
                    if (res.status >= 400) {
                        throw new Error("Server responds with error!")
                    }
                    return res.json()
                })
                .then(users => {
                    let roleAccessData = users.items;
                    const searchRoleAccessData = roleAccessData.filter(user => {
                        const searchRole = user.role;
                        const searchProgram = user.program;
                        const searchModule = user.module_app;
                        const searchSubmodule = user.submodule_app;
                        if (searchRoleAccess == '') {
                            return user;
                        }
                        else if (searchRole.toLowerCase().includes(searchRoleAccess.toLocaleLowerCase()) || searchProgram.toLowerCase().includes(searchRoleAccess.toLocaleLowerCase()) || searchModule.toLowerCase().includes(searchRoleAccess.toLocaleLowerCase()) || searchSubmodule.toLowerCase().includes(searchRoleAccess.toLocaleLowerCase()) || '') {
                            return user;
                        }

                    })
                    setRolePermissionData(searchRoleAccessData);
                    setIsLoading(false);
                    setLoadUpdate(false);
                    setRolePermissionDataLoad(false);
                },

                    err => {
                        setHasError(true);
                        setIsLoading(true);
                    })
        };
        getUsers()
    }, [searchRoleAccess, loadUpdate, rolePermissionDataLoad])

    const [roleProgramData, setRoleProgramData] = useState([])
    useEffect(() => {
        const getUsers = () => {
            setIsLoading(true);
            fetch(`/ords/hrm/rol_acc/role_acc_by_role/${roleCategory}?limit=10000&&{"$orderby":{"role_access_id":"asc"}}`)
                .then(res => {

                    // You have to send it, as I have done below
                    if (res.status >= 400) {
                        throw new Error("Server responds with error!")
                    }
                    return res.json()
                })
                .then(users => {
                    let programData = users.items;
                    setRoleProgramData(programData);
                    setIsLoading(false);
                    setRolePermissionDataLoad(false);
                },

                    err => {
                        setHasError(true);
                        setIsLoading(true);
                    })
        };
        if (roleCategory) {
            getUsers()
        }

    }, [rolePermissionDataLoad, roleCategory])


    const columns = [
        {
            title: 'Permission ID',
            dataIndex: 'role_access_id',

        },
        {
            title: 'Module',
            dataIndex: 'module_app',

        },
        {
            title: 'Submodule',
            dataIndex: 'submodule_app',

        },
        {
            title: 'Role',
            dataIndex: 'role',

        },
        {
            title: 'Program',
            dataIndex: 'program',

        },

        {
            title: 'Action',
            render: (text, record) => (
                <div className="dropdown dropdown-action text-right">
                    <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                    <div className="dropdown-menu dropdown-menu-right">

                        <a className="dropdown-item" href="#" onClick={() => { deleteButtonHandler(record.role_access_id) }}><i className="fa fa-trash-o m-r-5" /> Delete</a>
                    </div>
                </div>
            ),
        },
    ]
    const columnsRoleProgram = [
        {
            title: 'Permission ID',
            dataIndex: 'role_access_id',

        },
        {
            title: 'Program',
            dataIndex: 'program',

        },

        {
            title: 'Action',
            render: (text, record) => (
                <div className="dropdown dropdown-action text-right">
                    <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                    <div className="dropdown-menu dropdown-menu-right">
                        <a className="dropdown-item" href="#" onClick={() => { deleteButtonHandler(record.role_access_id) }}><i className="fa fa-trash-o m-r-5" /> Delete</a>
                    </div>
                </div>
            ),
        },
    ]



    return (
        <div>
            <div className="page-wrapper">
                <Helmet>
                    <title>Role & Permission - HR</title>
                    <meta name="description" content="Login page" />
                </Helmet>
                {/* Page Content */}
                <div className="content container-fluid">
                    {/* Page Header */}
                    <div className="page-header">
                        <div className="row align-items-center">
                            <div className="col">
                                <h3 className="page-title">Role & Permission</h3>
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item"><Link to="/app/main/dashboard">Dashboard</Link></li>
                                    <li className="breadcrumb-item active">Role & Permission</li>
                                </ul>
                            </div>
                            <div className="col-auto float-right ml-auto">
                                <a href="#" className="btn bgColor text-white add-btn" data-toggle="modal" data-target="#add_RolePermission"><i className="fa fa-plus" /> Add Role & Permission</a>
                            </div>
                        </div>
                    </div>
                    {/* /Page Header */}


                    {/* Search Filter */}
                    <div className="row  mb-4 ps-2">

                        <input onChange={e => { setSearchRoleAccess(e.target.value) }} className="form-control w-25 shadow py-4" type="text" placeholder="Search Program" />


                    </div>
                    {/* /Search Filter */}
                    <div className="row">
                        <div className="col-md-12">
                            <div className="table-responsive">

                                <Table className="table-striped"
                                    pagination={{
                                        total: rolePermissionData.length,
                                        showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                                        showSizeChanger: true, onShowSizeChange: onShowSizeChange, itemRender: itemRender
                                    }}
                                    style={{ overflowX: 'auto' }}
                                    columns={columns}
                                    // bordered
                                    dataSource={rolePermissionData}
                                    rowKey={record => record.id}

                                />
                            </div>
                        </div>
                    </div>
                </div>
                {/* /Page Content */}
                {/* Add Program Modal */}



                {/* Assign Role Program Modal  */}
                <div id="add_RolePermission" className="modal custom-modal fade" role="dialog">
                    <div className="modal-dialog modal-dialog-centered modal-xl" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">ASSIGN PROGRAM</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body text-start bg-light">
                                <form >
                                    <div className="row">
                                        <div className='col-sm-6'>
                                            <div className="mb-3">
                                                <label htmlFor="inputGroupSelect12" className="form-label model-text">Role</label>

                                                <Select
                                                    options={categoryOptionsRole}
                                                    onChange={handleRoleCategory}

                                                />
                                            </div>
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
                                                <label htmlFor="inputGroupSelect12" className="form-label model-text">Program</label>

                                                <Select
                                                    options={categoryOptionsProgram}
                                                    onChange={handleProgramCategory}

                                                />
                                            </div>



                                            <div className="mb-3 row">
                                                <div className="col-sm-12">
                                                    {/* <Select
                                                        options={categoryOptions}
                                                        onChange={handleEmployeeNameCategory}

                                                    /> */}
                                                </div>
                                            </div>

                                            <div className='mb-3 row ms-1'>
                                                <div className="col-sm-12  border rounded p-3 ">
                                                    {theArray.map(data =>
                                                        <span className='mb-2 d-inline-block me-2'>
                                                            <span className='bg-primary ps-2 pe-1 py-1 text-white rounded-3'>{sliceProgramName(data)} <span className="badge bg-secondary " style={{ cursor: "pointer" }} onClick={() => { deleteAssignProgramHandler(data) }} >X</span> </span>
                                                        </span>

                                                    )}
                                                </div>
                                            </div>


                                        </div>
                                        <div className='col-sm-6 '>

                                            <div className='ms-3'>


                                                <div className="row">

                                                    <div className="row mb-1 ">

                                                        {/* <input onChange={e => { setSearchEmpName(e.target.value) }} className="form-control ms-3 w-100 shadow " type="text" placeholder="Search Name" /> */}


                                                    </div>
                                                    <div className="col-md-12">
                                                        <div className="table-responsive">

                                                            <Table className="table-striped"
                                                                pagination={{
                                                                    total: roleProgramData.length,
                                                                    showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                                                                    showSizeChanger: true, onShowSizeChange: onShowSizeChange, itemRender: itemRender
                                                                }}
                                                                style={{ overflowX: 'auto' }}
                                                                columns={columnsRoleProgram}
                                                                // bordered
                                                                dataSource={roleProgramData}
                                                                rowKey={record => record.id}

                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>





                                        </div>

                                        <div className="submit-section text-end">
                                            <button type="button" className="btn bgColor text-white px-5 ms-1 py-2 rounded" data-dismiss="modal">Close</button>
                                        </div>
                                    </div>
                                </form>
                                <div className='mb-3 row  ms-1' >
                                    <button className='w-25 bgColor text-white py-1 rounded' onClick={() => { addRolePermissionHandler() }} >Submit </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                {/* end role permission modal */}




            </div>
        </div>
    );
};

export default RoleAndPermission;