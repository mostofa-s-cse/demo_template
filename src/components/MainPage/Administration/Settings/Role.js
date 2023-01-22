
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

const Role = () => {

    const [data, setData] = useState([]);
    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [searchRole, setSearchRole] = useState('')
    const [loadUpdate, setLoadUpdate] = useState(false);

    const [roleData, setRoleData] = useState([]);
    const [getRoleName, setGetRoleName] = useState("");
    const [getRoleId, setGetRoleId] = useState("");


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
    const handleRoleSubmit = e => {
        let data = {}
        data.ROLE_ID = parseInt(getRoleId);
        data.ROLE = getRoleName;
        // post data
        axios({
            method: 'post',
            url: '/ords/hrm/ass_pre/add_rol',
            data,
            headers: { 'Authorization': 'Bearer ...' }
        })
            .then(({ data }) => {
                alert('Insert successfully')
                setGetRoleName("")
                setGetRoleId("")
            })

        e.preventDefault();
    }
    // // PUT METHOD 
    const [getRole, setGetRole] = useState([]);
    const [getId, setGetId] = useState(null);

    const onSubmitUpdate = data1 => {

        if (data1.role) {
            data1.role = data1.role;
        }
        else {
            data1.role = getRole.role;
        }
        if (data1.role_id) {
            data1.role_id = data1.role_id;
        }
        else {
            data1.role_id = getRole.role_id;
        }
        // PUT METHOD 
        axios({
            method: 'put',
            headers: {
                'ROLE_ID': getId
            },
            url: `/ords/hrm/ass_pre/crud`,
            data: {
                ROLE_ID: data1.role_id,
                ROLE: data1.role
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


                    window.$("#edit_role").modal("hide");


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
            fetch(`/ords/hrm/ass_pre/${getId}`)
                .then(res => {

                    // You have to send it, as I have done below
                    if (res.status >= 400) {
                        throw new Error("Server responds with error!")
                    }
                    return res.json()
                })
                .then(users => {
                    setGetRole(users);
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
                    const url = `/ords/hrm/ass_pre/crud`
                    fetch(url,
                        {
                            method: 'DELETE',
                            headers: {
                                'ROLE_ID': Id
                            }
                        })
                        .then(item => {
                            const remainingUsers = data.filter(user => user.role_id !== Id);
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


    // GET Role DATA 
    useEffect(() => {
        const getUsers = () => {
            setIsLoading(true);
            fetch(`/ords/hrm/ass_pre/crud?limit=10000&&q={"$orderby":{"role_id":"asc"}}`)
                .then(res => {

                    // You have to send it, as I have done below
                    if (res.status >= 400) {
                        throw new Error("Server responds with error!")
                    }
                    return res.json()
                })
                .then(users => {
                    let roleData = users.items;
                    const searchRoleData = roleData.filter(user => {
                        let roleSearchData = user.role;
                        if (searchRole == '') {
                            return user;
                        }
                        else if (roleSearchData.toLowerCase().includes(searchRole.toLocaleLowerCase()) || '') {
                            return user;
                        }
                    })
                    setData(searchRoleData);
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
    }, [searchRole, loadUpdate])


    const columns = [
        {
            title: 'Role ID',
            dataIndex: 'role_id',

        },
        {
            title: 'Role',
            dataIndex: 'role',

        },


        {
            title: 'Action',
            render: (text, record) => (
                <div className="dropdown dropdown-action text-right">
                    <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                    <div className="dropdown-menu dropdown-menu-right">
                        <a className="dropdown-item" href="#" data-toggle="modal" data-target="#edit_role" onClick={() => { handleUpdate(record.role_id) }}><i className="fa fa-pencil m-r-5" /> Edit</a>
                        <a className="dropdown-item" href="#" onClick={() => { deleteButtonHandler(record.role_id) }}><i className="fa fa-trash-o m-r-5" /> Delete</a>
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
                                <h3 className="page-title">Role</h3>
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item"><Link to="/app/main/dashboard">Dashboard</Link></li>
                                    <li className="breadcrumb-item active">Role</li>
                                </ul>
                            </div>
                            <div className="col-auto float-right ml-auto">
                                <a href="#" className="btn bgColor text-white add-btn" data-toggle="modal" data-target="#add_role"><i className="fa fa-plus" /> Add New Role</a>
                            </div>
                        </div>
                    </div>
                    {/* /Page Header */}


                    {/* Search Filter */}
                    <div className="row  mb-4 ps-2">

                        <input onChange={e => { setSearchRole(e.target.value) }} className="form-control w-25 shadow py-4" type="text" placeholder="Search Role" />


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
                {/* Add Role Modal */}


                <div id="add_role" className="modal custom-modal fade" role="dialog">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add Role</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleRoleSubmit}>
                                    <div className="form-group text-start">
                                        <label>Role Name <span className="text-danger">*</span></label>
                                        <input onChange={e => setGetRoleName(e.target.value)} className="form-control" type="text" />
                                        <label>Role Id <span className="text-danger">*</span></label>
                                        <input onChange={e => setGetRoleId(e.target.value)} className="form-control" type="text" />
                                    </div>
                                    <div className="submit-section">
                                        <button className="btn btn-primary submit-btn">Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>




                {/* Edit  role */}

                <div id="edit_role" className="modal custom-modal fade" role="dialog">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Role</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body text-start">
                                <form onSubmit={handleSubmit1(onSubmitUpdate)}>
                                    <div className="mb-3">
                                        <label>Role Name </label>
                                        <input type="text" className="form-control" id="exampleFormControlInput14" defaultValue={getRole.role} {...register1("role")} />
                                    </div>
                                    <div className="mb-3">
                                        <label>Role Id </label>
                                        <input type="number" className="form-control" id="exampleFormControlInput14" defaultValue={getRole.role_id} {...register1("role_id")} />
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

export default Role;