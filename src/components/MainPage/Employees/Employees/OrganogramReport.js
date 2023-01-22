import React from 'react';
import { useState, useEffect } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import { Avatar_02, Avatar_05, Avatar_09, Avatar_10, Avatar_03, Avatar_08, Avatar_15, Avatar_20, Avatar_25, Avatar_24, placeholderImg } from "../../../Entryfile/imagepath"
import { Table, Input } from 'antd';
import { SearchOutlined } from "@ant-design/icons";
import 'antd/dist/antd.css';
import { itemRender, onShowSizeChange } from "../../paginationfunction"
import "../../antdstyle.css"
import { useForm } from "react-hook-form";
import Select from 'react-select'
import axios from 'axios';
import { HashLink } from 'react-router-hash-link';
import swal from 'sweetalert';
import HrApi from '../../../initialpage/hooks/HrApi';
import Api from '../../../initialpage/hooks/Api';
const OrganogramReport = () => {
    const [loadUpdate, setLoadUpdate] = useState(false);
    const [data, setData] = useState([]);
    const [employeeData, setEmployeeData] = useState([]);
    const [employeeNameCategory, setEmployeeNameCategory] = useState();
    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [oneClass, setOneClass] = useState(0)
    const [twoClass, setTwoClass] = useState(0)
    const [threeClass, setThreeClass] = useState(0)
    const [fourClass, setFourClass] = useState(0)
    const [totalEmp, setTotalEmp] = useState(0)
    const [getSingleDesData, setGetSingleDesData] = useState('');
    // useEffect(() => {
    //     const getUsers = () => {
    //         setIsLoading(true);
    //         fetch(`/ords/hrm/emp_edu/v_emp_edu?q={"name_english":{"$like":"%25${searchEducation.toLocaleUpperCase()}%25"},"$orderby":{"employe_id":"desc"}}`)
    //             .then(res => {

    //                 // You have to send it, as I have done below
    //                 if (res.status >= 400) {
    //                     throw new Error("Server responds with error!")
    //                 }
    //                 return res.json()
    //             })
    //             .then(users => {
    //                 setData(users.items);
    //                 setIsLoading(false);
    //                 setLoadUpdate(false);
    //             },

    //                 err => {
    //                     const mute = err
    //                     setHasError(true);
    //                     setIsLoading(true);
    //                 })
    //     };
    //     getUsers()
    // }, [searchEducation, loadUpdate])


    useEffect(() => {
        const getUsers = () => {
            fetch(`${HrApi}/hr/report/getDesignationReport`)
                .then(res => {
                    if (res.status >= 400) {
                        throw new Error("Server responds with error!")
                    }
                    return res.json()
                })
                .then(item => {
                    let oneClassTotal = 0;
                    let twoClassTotal = 0;
                    let threeClassTotal = 0;
                    let fourClassTotal = 0;
                    let empTotal = 0;
                    const getReportdata = Object.keys(item.data);
                    let categoryOptions = getReportdata.map(data => {
                        let optionsItem = {};
                        optionsItem.emp_des = data;
                        optionsItem.employee_number = item.data[data].length;
                        optionsItem.grade_class = item.data[data][0].GRADE_CLASS;
                        console.log(item.data[data][0].GRADE_CLASS, item.data[data].length)
                        if (item.data[data][0].GRADE_CLASS === '1st Class') {
                            oneClassTotal = oneClassTotal + item.data[data].length
                        }
                        if (item.data[data][0].GRADE_CLASS === '2nd Class') {
                            twoClassTotal = twoClassTotal + item.data[data].length
                        }
                        if (item.data[data][0].GRADE_CLASS === '3rd Class') {
                            threeClassTotal = threeClassTotal + item.data[data].length
                        }
                        if (item.data[data][0].GRADE_CLASS === '4th Class') {
                            fourClassTotal = fourClassTotal + item.data[data].length
                        }
                        empTotal = empTotal + item.data[data].length;
                        return optionsItem;
                    })
                    setOneClass(oneClassTotal)
                    setTwoClass(twoClassTotal)
                    setThreeClass(threeClassTotal)
                    setFourClass(fourClassTotal)
                    setTotalEmp(empTotal)
                    setData(categoryOptions)
                    setEmployeeData(item?.data)
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







    const columns = [

        {
            title: 'Designation',
            dataIndex: 'emp_des',
            filterDropdown: ({
                setSelectedKeys,
                selectedKeys,
                confirm,
                clearFilters,
            }) => {
                return (
                    <div style={{ display: "flex", flex: 1, justifyContent: "center" }}>
                        <Input
                            autoFocus
                            placeholder="Type Designation name here"
                            value={selectedKeys[0]}
                            onChange={(e) => {
                                setSelectedKeys(e.target.value ? [e.target.value] : []);
                                confirm({ closeDropdown: false });
                            }}
                            onPressEnter={() => {
                                confirm();
                            }}
                            onBlur={() => {
                                confirm();
                            }}
                        ></Input>
                    </div>
                );
            },
            filterIcon: () => {
                return (
                    <SearchOutlined className="text-black bg-white fs-6 rounded-pill p-1" />
                );
            },
            onFilter: (value, record) => {
                return record.emp_des.toLowerCase().includes(value.toLowerCase());
            },
        },

        {
            title: 'Number of Employees',
            dataIndex: 'employee_number',

        },
        {
            title: 'Class',
            dataIndex: 'grade_class',
            filterDropdown: ({
                setSelectedKeys,
                selectedKeys,
                confirm,
                clearFilters,
            }) => {
                return (
                    <div style={{ display: "flex", flex: 1, justifyContent: "center" }}>
                        <Input
                            autoFocus
                            placeholder="Type Designation name here"
                            value={selectedKeys[0]}
                            onChange={(e) => {
                                setSelectedKeys(e.target.value ? [e.target.value] : []);
                                confirm({ closeDropdown: false });
                            }}
                            onPressEnter={() => {
                                confirm();
                            }}
                            onBlur={() => {
                                confirm();
                            }}
                        ></Input>
                    </div>
                );
            },
            filterIcon: () => {
                return (
                    <SearchOutlined className="text-black bg-white fs-6 rounded-pill p-1" />
                );
            },
            onFilter: (value, record) => {
                return record.grade_class.toLowerCase().includes(value.toLowerCase());
            },
        },
        {
            title: 'Action',
            render: (text, record) => (
                <div onClick={e => { setGetSingleDesData(record?.emp_des) }}>
                    <a href="#" className="action-icon" aria-expanded="false"><i class="fa-solid fa-eye"></i></a>
                </div >
            ),


        },


    ]
    const employeColumns = [
        {
            title: 'Name',
            dataIndex: "NAME_ENGLISH",
            render: (text, record) => (
                <div className="">
                    <h2 className="table-avatar">
                        <a href={`allemployees/employeeprofile/${record.EMPLOYE_ID}`}>
                            {" "}
                            {record.PHOTO_PATH ? (
                                <div>
                                    <img
                                        className="avatar"
                                        src={`http://${Api}/static${record.PHOTO_PATH}`}
                                    />
                                </div>
                            ) : (
                                <div>
                                    <img className="avatar" src={placeholderImg} />
                                </div>
                            )}
                        </a>
                        <a href={`allemployees/employeeprofile/${record.EMPLOYE_ID}`}>
                            {text} <span>{record.DESIGNATION}</span>
                        </a>
                    </h2>
                </div >
            ),


        },

        {
            title: 'Department',
            dataIndex: 'DEPARTEMENT',

        },
        {
            title: 'Grade',
            dataIndex: 'GRADE',

        },
        {
            title: 'Phone',
            dataIndex: 'MOBILE_PHONE',

        },


    ]
    return (
        <div className="page-wrapper">
            <Helmet>
                <title>Organogram - HR</title>
                <meta name="description" content="Login page" />
            </Helmet>
            {/* Page Content */}
            <div className="content container-fluid">
                {/* Page Header */}
                <div className="page-header">
                    <div className="row align-items-center">
                        <div className="col">
                            <h3 className="page-title">Organogram List</h3>
                            <ul className="breadcrumb">
                                <li className="breadcrumb-item"><Link to="/app/main/dashboard">Dashboard</Link></li>
                                <li className="breadcrumb-item active">Organogram</li>
                            </ul>
                        </div>
                        {/* <div className="col-auto float-right ml-auto">
                            <a href="#" className="btn add-btn" data-toggle="modal" data-target="#add_education"><i className="fa fa-plus" /> Add Education</a>
                        </div> */}
                    </div>
                </div>
                <div className="row  mb-4 ps-2">

                    {/* <input onChange={e => { setSearchEducation(e.target.value) }} className="form-control w-25 shadow py-4" type="text" placeholder="Employee Name" /> */}


                </div>
                <div className=' mb-3'>
                    <table class="table table-bordered">

                        <tbody>
                            <tr>
                                <td className='text-start ps-3'> 1st Class : <span className='ps-2 text-bold'> {oneClass} </span></td>
                                <td className='text-start ps-3'> 2nd Class : <span className='ps-2'> {twoClass} </span></td>
                                <td className='text-start ps-3'> 3rd Class : <span className='ps-2'> {threeClass} </span></td>
                                <td className='text-start ps-3'> 4th Class : <span className='ps-2'> {fourClass} </span></td>
                                <td className='text-start ps-3'> Total : <span className='ps-2'> {totalEmp} </span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* /Leave Statistics */}
                <div className="row">
                    <div className="col-sm-6">
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
                    <div className="col-sm-6">
                        {employeeData[getSingleDesData]?.length &&
                            <div className="table-responsive">
                                <h4 className='mb-3 smart-text'> <u>{getSingleDesData}</u> </h4>
                                <Table className="table-striped"
                                    pagination={{
                                        total: employeeData[getSingleDesData]?.length,
                                        showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                                        showSizeChanger: true, onShowSizeChange: onShowSizeChange, itemRender: itemRender
                                    }}
                                    style={{ overflowX: 'auto' }}
                                    columns={employeColumns}
                                    // bordered
                                    dataSource={employeeData[getSingleDesData]}
                                    rowKey={record => record.EMPLOYE_ID}

                                />
                            </div>
                        }

                    </div>
                </div>
            </div>
            {/* /Page Content */}
            {/* Add Education Modal */}


            {/* <div id="add_education" className="modal custom-modal fade" role="dialog">
                <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Add Education</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>

                    </div>
                </div>
            </div> */}





        </div >
    );
};

export default OrganogramReport;