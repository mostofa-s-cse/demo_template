import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Table } from "antd";
import "antd/dist/antd.css";
import { itemRender, onShowSizeChange } from "../../../paginationfunction";
import "../../../antdstyle.css";
import Select from "react-select";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import axios from "axios";
import { HashLink } from "react-router-hash-link";
import swal from "sweetalert";
import useAuth from "../../../../initialpage/hooks/useAuth";
const AddleaveRequest = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const {
        register: register1,
        reset: reset1,
        formState: { errors: errors1 },
        handleSubmit: handleSubmit1,
    } = useForm();
    const [employeeData, setEmployeeData] = useState([]);
    const [data, setData] = useState([]);
    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [employeeNameCategory, setEmployeeNameCategory] = useState();
    const [leaveType, setLeaveType] = useState([]);
    const [getLeaveId, setGetLeaveId] = useState(null);
    const [singleLeaveData, setSingleLeaveData] = useState({})
    const [leaveSingleData, setLeaveSingleData] = useState({})
    const [loadUpdate, setLoadUpdate] = useState(false)
    const { dateConvert, user } = useAuth()
    const [getId, setGetId] = useState(0);
    const [leaveReqDate, setLeaveReqDate] = useState(null)
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null)
    const employe_id = user?.employe_id;
    // get single leave data
    useEffect(() => {
        const getUsers = () => {
            fetch(`/ords/hrm/emp_lea/v_emp_lea/${getId}`)
                .then((res) => {
                    // You have to send it, as I have done below
                    if (res.status >= 400) {
                        throw new Error("Server responds with error!");
                    }
                    return res.json();
                })
                .then(
                    (users) => {
                        setSingleLeaveData(users);

                    },
                );
        };
        if (getId) {
            getUsers();
        }
    }, [getId]);

    // get single leave data for put
    useEffect(() => {
        const getUsers = () => {
            fetch(`/ords/hrm/emp_lea/${getId}`)
                .then((res) => {
                    // You have to send it, as I have done below
                    if (res.status >= 400) {
                        throw new Error("Server responds with error!");
                    }
                    return res.json();
                })
                .then(
                    (users) => {
                        setLeaveSingleData(users);

                    },
                );
        };
        if (getId) {
            getUsers();
        }
    }, [getId]);


    const onSubmit = (data1) => {

        data1.date_from = `${data1.date_from}T00:00:00Z`;
        data1.date_to = `${data1.date_to}T00:00:00Z`;
        data1.leave_req_date = `${data1.leave_req_date}T00:00:00Z`;

        // data1.date_from = fromDate.toISOString();
        // data1.date_to = toDate.toISOString();
        data1.leave_id = parseInt(data1.leave_id);
        data1.duration = parseInt(data1.duration);


        axios({
            method: "post",
            url: "/ords/hrm/emp_lea/crud",
            data: {
                EMPLOYE_ID: employe_id,
                LEAVE_ID: data1.leave_id,
                CAUSE: data1.cause,
                // VALIDATOR_ID: NULL,
                DATE_FROM: data1.date_from,
                DATE_TO: data1.date_to,
                EMPLOYEE_MEMO: data1.employee_memo,
                DURATION: data1.duration,
                MEMO_VALIDATOR: data1.memo_validator,
                STATUS: "New",
                LEAVE_REQ_DATE: data1.leave_req_date,
            },
            headers: { Authorization: "Bearer ..." }
        }).then((res) => {
            if (!res.data) {
                setLoadUpdate(true);
                swal({
                    title: "Thank you!",
                    text: "Successfully Added",
                    icon: "success",
                    button: "Ok",
                });

                reset();
                window.$("#add_leave").modal("hide");
            }
        });
    };

    // Date Update


    const onSubmitEdit = (data1) => {
        if (data1.date_from) {
            data1.date_from = `${data1.date_from}T00:00:00Z`;
        } else {
            data1.date_from = singleLeaveData.date_from;
        }
        if (data1.date_to) {
            data1.date_to = `${data1.date_to}T00:00:00Z`;
        } else {
            data1.date_to = singleLeaveData.date_to;
        }


        axios({
            method: "put",

            headers: {
                EMPLOYEE_LEAVE_ID: getId,
            },
            url: `/ords/hrm/emp_lea/crud`,
            data: {
                EMPLOYEE_LEAVE_ID: singleLeaveData.employee_leave_id,
                EMPLOYE_ID: singleLeaveData.employe_id,
                LEAVE_ID: singleLeaveData.leave_id,
                CAUSE: singleLeaveData.cause,
                // VALIDATOR_ID: NULL,
                DATE_FROM: data1.date_from,
                DATE_TO: data1.date_to,
                EMPLOYEE_MEMO: singleLeaveData.employee_memo,
                DURATION: singleLeaveData.duration,
                STATUS: singleLeaveData.status,
            },
        }).then((res) => {
            if (!res.data) {
                setLoadUpdate(true);
                swal({
                    title: "Good!",
                    text: "Successfully Update",
                    icon: "success",
                    button: "Ok",
                });

                reset();
                window.$("#edit_leave_date").modal("hide");
            }
        });
    };





    // GET LeaveType data
    useEffect(() => {
        const getUsers = () => {
            setIsLoading(true);
            fetch(`/ords/hrm/lea_typ/crud`)
                .then((res) => {
                    // You have to send it, as I have done below
                    if (res.status >= 400) {
                        throw new Error("Server responds with error!");
                    }
                    return res.json();
                })
                .then(
                    (users) => {
                        setLeaveType(users.items);
                        setIsLoading(false);
                    },

                    (err) => {
                        const mute = err;
                        setHasError(true);
                        setIsLoading(true);
                    }
                );
        };
        getUsers();
    }, []);

    const [searchLeave, setSearchLeave] = useState("");
    useEffect(() => {
        const getUsers = () => {
            setIsLoading(true);
            fetch(
                `/ords/hrm/emp_lea/v_emp_lea/e/${employe_id}`
            )
                .then((res) => {
                    // You have to send it, as I have done below
                    if (res.status >= 400) {
                        throw new Error("Server responds with error!");
                    }
                    return res.json();
                })
                .then(
                    (users) => {
                        setData(users.items);
                        setIsLoading(false);
                        setLoadUpdate(false);
                    },

                    (err) => {
                        const mute = err;
                        setHasError(true);
                        setIsLoading(true);
                    }
                );
        };
        getUsers();
    }, [searchLeave, loadUpdate, employe_id]);


    const columns = [
        {
            title: "ID",
            dataIndex: "employee_leave_id",
        },
        {
            title: "Employee Name",
            dataIndex: "emp_name",
        },

        {
            title: "Leave",
            dataIndex: "leave_type",
        },
        {
            title: "Cause",
            dataIndex: "cause",
        },
        {
            title: "Request Date",
            render: (text, record) => (
                <div>
                    {record?.leave_req_date ?
                        <span> {dateConvert(record?.leave_req_date, 1)}</span>
                        : ""
                    }

                </div>



            )
        },

        {
            title: "From Date",
            dataIndex: "date_from",
        },

        {
            title: "To Date",
            dataIndex: "date_to",
        },
        {
            title: "Status",
            dataIndex: "status",
            render: (text, record) => (
                <div
                    className="dropdown action-label text-center"
                >
                    <a
                        className="btn btn-white btn-sm btn-rounded dropdown-toggle"
                        href="#"
                        data-toggle="dropdown"
                        aria-expanded="false"
                    >
                        <i
                            className={
                                text === "New"
                                    ? "fa fa-dot-circle-o text-purple"
                                    : text === "Pending"
                                        ? "fa fa-dot-circle-o text-info"
                                        : text === "Approved"
                                            ? "fa fa-dot-circle-o text-success"
                                            : "fa fa-dot-circle-o text-danger"
                            }
                        />{" "}
                        {text}
                    </a>

                </div>
            ),
        },
        {
            title: "Action",
            render: (text, record) => (
                <div className="dropdown dropdown-action text-right">
                    <a
                        href="#"
                        className="action-icon dropdown-toggle"
                        data-toggle="dropdown"
                        aria-expanded="false"
                    >
                        <i className="material-icons">more_vert</i>
                    </a>
                    <div className="dropdown-menu dropdown-menu-right">


                        <Link className="dropdown-item" to={`/leaveApplicationformPrint/${record.employee_leave_id}`}><i class="fa fa-eye me-1" aria-hidden="true"></i> view</Link>

                        <a className="dropdown-item"
                            href="#"
                            data-toggle="modal"
                            data-target="#leave_info_modal"
                            onClick={() => {
                                setGetId(record.employee_leave_id);
                            }}
                        >
                            <i className="fa fa-pencil m-r-5" /> Edit
                        </a>

                        <a
                            className="dropdown-item"
                            href="#"
                            data-toggle="modal"
                            onClick={() => {
                                deleteButtonHandler(record.employee_leave_id);
                            }}
                        >
                            <i className="fa fa-trash-o m-r-5" /> Delete
                        </a>
                    </div >
                </div >
            ),
        },
    ];

    const handleApproved = (putLeaveId) => {

        axios({
            method: "put",

            headers: {
                EMPLOYEE_LEAVE_ID: putLeaveId,
            },
            url: `/ords/hrm/emp_lea/crud`,
            data: {
                EMPLOYEE_LEAVE_ID: leaveSingleData.employee_leave_id,
                EMPLOYE_ID: leaveSingleData.employe_id,
                LEAVE_ID: leaveSingleData.leave_id,
                CAUSE: leaveSingleData.cause,
                // VALIDATOR_ID: NULL,
                DATE_FROM: leaveSingleData.date_from,
                DATE_TO: leaveSingleData.date_to,
                LEAVE_REQ_DATE: leaveSingleData.leave_req_date,
                EMPLOYEE_MEMO: leaveSingleData.employee_memo,
                DURATION: leaveSingleData.duration,
                STATUS: "Approved",
            },
        }).then((res) => {
            if (!res.data) {
                setLoadUpdate(true);
                swal({
                    title: "Good job!",
                    text: "Successfully Updated",
                    icon: "success",
                    button: "Ok",
                });
                reset();
            }
        });
    };
    // update leave Request
    const onSubmitLeave = (data1) => {

        if (fromDate) {
            leaveSingleData.date_from = dateConvert(fromDate, 4);
        }
        if (toDate) {
            leaveSingleData.date_to = dateConvert(toDate, 4);
        }
        if (leaveReqDate) {
            leaveSingleData.leave_req_date = dateConvert(leaveReqDate, 4);
        }
        if (data1.cause) {
            leaveSingleData.cause = data1.cause;
        }
        if (data1.duration) {
            leaveSingleData.duration = parseInt(data1.duration);
        }
        if (data1.leave_id) {
            leaveSingleData.leave_id = parseInt(data1.leave_id);
        }
        if (data1.leave_id) {
            leaveSingleData.leave_id = parseInt(data1.leave_id);
        }
        if (data1.employee_memo) {
            leaveSingleData.employee_memo = data1.employee_memo;
        }
        axios({
            method: "put",
            headers: {
                EMPLOYEE_LEAVE_ID: getId,
            },
            url: `/ords/hrm/emp_lea/crud`,
            data: {
                EMPLOYEE_LEAVE_ID: getId,
                EMPLOYE_ID: leaveSingleData.employe_id,
                LEAVE_ID: leaveSingleData.leave_id,
                CAUSE: leaveSingleData.cause,
                DATE_FROM: leaveSingleData.date_from,
                DATE_TO: leaveSingleData.date_to,
                LEAVE_REQ_DATE: leaveSingleData.leave_req_date,
                EMPLOYEE_MEMO: leaveSingleData.employee_memo,
                STATUS: leaveSingleData.status,
                DURATION: leaveSingleData.duration,
            },
        }).then((res) => {
            console.log(res)
            if (!res.data) {
                setLoadUpdate(true);
                swal({
                    title: "Good job!",
                    text: "Successfully Updated",
                    icon: "success",
                    button: "Ok",
                });

                window.$("#leave_info_modal").modal("hide");
            }
        });
    };


    const handleDeclined = (putLeaveId) => {

        axios({
            method: "put",

            headers: {
                EMPLOYEE_LEAVE_ID: putLeaveId,
            },
            url: `/ords/hrm/emp_lea/crud`,
            data: {
                EMPLOYEE_LEAVE_ID: leaveSingleData.employee_leave_id,
                EMPLOYE_ID: leaveSingleData.employe_id,
                LEAVE_ID: leaveSingleData.leave_id,
                CAUSE: leaveSingleData.cause,
                LEAVE_REQ_DATE: leaveSingleData.leave_req_date,
                // VALIDATOR_ID: NULL,
                DATE_FROM: leaveSingleData.date_from,
                DATE_TO: leaveSingleData.date_to,
                EMPLOYEE_MEMO: leaveSingleData.employee_memo,
                DURATION: leaveSingleData.duration,
                STATUS: "Declined",
            },
        }).then((res) => {
            if (!res.data) {
                setLoadUpdate(true);
                swal({
                    title: "Good job!",
                    text: "Successfully Updated",
                    icon: "success",
                    button: "Ok",
                });
                reset();
            }
        });
    };


    const deleteButtonHandler = (leaveId) => {
        //
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                const url = `/ords/hrm/emp_lea/crud`;
                fetch(url, {
                    method: "DELETE",
                    headers: {
                        EMPLOYEE_LEAVE_ID: leaveId,
                    },
                }).then((item) => {
                    const remainingUsers = data.filter(
                        (user) => user.employee_leave_id !== leaveId
                    );
                    setData(remainingUsers);
                });
                swal("Poof! Your imaginary file has been deleted!", {
                    icon: "success",
                });
            } else {
                swal("Your imaginary file is safe!");
            }
        });
    };

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
                                <h3 className="page-title">Leave Request</h3>
                                <h4 className="smart-text"><u> {user?.name_english} </u></h4>
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <Link to="/app/main/dashboard">Dashboard</Link>
                                    </li>
                                    <li className="breadcrumb-item active">Leave</li>
                                </ul>
                            </div>
                            <div className="col-auto float-right ml-auto">
                                <a
                                    href="#"
                                    className="btn add-btn bgColor text-white"
                                    data-toggle="modal"
                                    data-target="#add_leave"
                                >
                                    <i className="fa fa-plus" /> Add new Leave Request
                                </a>
                            </div>

                        </div>
                    </div>

                    {/* /Leave Statistics */}
                    {/* Search Filter */}
                    <div className="row  mb-4 ps-2">
                        <input
                            onChange={(e) => {
                                setSearchLeave(e.target.value);
                            }}
                            className="form-control w-25 shadow py-4"
                            type="text"
                            placeholder="Employee Name"
                        />

                    </div>

                    {/* /Search Filter */}
                    <div className="row">
                        <div className="col-md-12">
                            <div className="table-responsive">
                                <Table
                                    className="table-striped"
                                    pagination={{
                                        total: data.length,
                                        showTotal: (total, range) =>
                                            `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                                        showSizeChanger: true,
                                        onShowSizeChange: onShowSizeChange,
                                        itemRender: itemRender,
                                    }}
                                    style={{ overflowX: "auto" }}
                                    columns={columns}
                                    // bordered
                                    dataSource={data}
                                    rowKey={(record) => record.id}

                                />
                            </div>
                        </div>
                    </div>
                </div>
                {/* /Page Content */}
                {/* Add Leave Modal */}

                <div id="add_leave" className="modal custom-modal fade" role="dialog">
                    <div
                        className="modal-dialog modal-dialog-centered modal-lg"
                        role="document"
                    >
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Leave request form</h5>
                                <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                >
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body text-start">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="row">
                                        <div className="mb-3">
                                            <h4 className="text-center smart-text"><u>{user?.name_english}</u></h4>

                                        </div>
                                        <div className="col-sm-6">

                                            <div className="mb-3">
                                                <label
                                                    htmlFor="exampleFormControlInput17"
                                                    className="form-label small fw-bold"
                                                >
                                                    From Date
                                                </label>
                                                <input
                                                    type="date"
                                                    className="form-control"
                                                    id="exampleFormControlInput14"
                                                    {...register("date_from")}
                                                />
                                                {/* <DateTimePicker format={`dd/MM/yyyy 00:00`}
                                                    className="w-100"
                                                    onChange={setFromDate}
                                                    value={fromDate}
                                                /> */}
                                                {/* <input type="date" className="form-control" id="exampleFormControlInput17" {...register("date_from")} /> */}
                                            </div>

                                            <div className="mb-3">
                                                <label
                                                    htmlFor="exampleFormControlInput17"
                                                    className="form-label small fw-bold"
                                                >
                                                    To Date
                                                </label>
                                                <input
                                                    type="date"
                                                    className="form-control"
                                                    id="exampleFormControlInput14"
                                                    {...register("date_to")}
                                                />
                                                {/* <DateTimePicker
                            format={`dd/MM/yyyy 00:00`}
                            className="w-100"
                            onChange={setToDate}
                            value={toDate}
                          /> */}
                                                {/* <input type="date" className="form-control" id="exampleFormControlInput17"  {...register("date_to")} /> */}
                                            </div>

                                            <div className="mb-3">
                                                <label
                                                    htmlFor="exampleFormControlInput14"
                                                    className="form-label fw-bold small"
                                                >
                                                    Duration
                                                </label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    id="exampleFormControlInput14"
                                                    placeholder="Duration"
                                                    {...register("duration")}
                                                />
                                            </div>

                                            <div className="mb-3">
                                                <label
                                                    htmlFor="inputGroupSelect12"
                                                    className="form-label fw-bold small"
                                                >
                                                    Name of Leave
                                                </label>
                                                <select
                                                    className="form-select"
                                                    id="inputGroupSelect12"
                                                    {...register("leave_id")}
                                                >
                                                    <option value="">Please Select</option>
                                                    {leaveType.map((data) => (
                                                        <option value={data.leave_id}>
                                                            {data.leave_type}
                                                        </option>
                                                    ))}
                                                    ;
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="mb-3">
                                                <label
                                                    htmlFor="exampleFormControlInput17"
                                                    className="form-label small fw-bold"
                                                >
                                                    Leave Request Date
                                                </label>
                                                <input
                                                    type="date"
                                                    className="form-control"
                                                    id="exampleFormControlInput14"
                                                    {...register("leave_req_date")}
                                                />

                                            </div>
                                            <div className="mb-3">
                                                <label
                                                    htmlFor="exampleFormControlInput14"
                                                    className="form-label fw-bold small"
                                                >
                                                    Cause
                                                </label>
                                                <textarea
                                                    className="form-control"
                                                    id="exampleFormControlTextarea1"
                                                    rows="5"
                                                    placeholder="Cause"
                                                    {...register("cause")}
                                                ></textarea>

                                            </div>

                                            <div className="mb-3">
                                                <label
                                                    htmlFor="exampleFormControlTextarea1"
                                                    className="form-label fw-bold small"
                                                >
                                                    Comments Employee
                                                </label>
                                                <textarea
                                                    className="form-control"
                                                    id="exampleFormControlTextarea1"
                                                    rows="5"
                                                    placeholder="Comments Employee"
                                                    {...register("employee_memo")}
                                                ></textarea>
                                            </div>


                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button
                                            type="submit"
                                            className="btn bgColor text-white px-5 py-2 rounded"
                                        >
                                            Add
                                        </button>
                                        <button
                                            type="button"
                                            className="btn bgColor text-white px-5 ms-1 py-2 rounded"
                                            data-dismiss="modal"
                                        >
                                            Close
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Date Edit Modal  */}

                <div
                    id="edit_leave_date"
                    className="modal custom-modal fade"
                    role="dialog"
                >
                    <div
                        className="modal-dialog modal modal-dialog-centered"
                        role="document"
                    >
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Leave Date</h5>
                                <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                >
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>

                        </div>
                    </div>
                </div>

                {/*update Leave Informations  */}

                <div
                    id="leave_info_modal"
                    className="modal custom-modal fade"
                    role="dialog"
                >
                    <div
                        className="modal-dialog modal-dialog-centered modal-lg"
                        role="document"
                    >
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Leave</h5>
                                <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                >
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body text-start">
                                <form onSubmit={handleSubmit1(onSubmitLeave)}>
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div className="mb-3">
                                                <label
                                                    htmlFor="inputGroupSelect12"
                                                    className="form-label fw-bold small"
                                                >
                                                    Choose an Employee
                                                </label>
                                                <select
                                                    className="form-select"
                                                    id="inputGroupSelect12"
                                                    {...register1("employe_id")}
                                                >
                                                    <option value={singleLeaveData.employe_id}>
                                                        {" "}
                                                        {singleLeaveData.emp_name}{" "}
                                                    </option>
                                                </select>
                                            </div>

                                            <div className="mb-3">
                                                <label
                                                    htmlFor="exampleFormControlInput17"
                                                    className="form-label small fw-bold"
                                                >
                                                    From Date <span className='fw-bold'> (dd/mm/yy) </span>
                                                </label>
                                                <DatePicker
                                                    selected={fromDate}
                                                    onChange={(date) => setFromDate(date)}
                                                    dateFormat="dd-MM-yyyy"
                                                    className="field-style-hr w-100"
                                                    placeholderText={dateConvert(singleLeaveData.date_from, 8)}
                                                />


                                            </div>

                                            <div className="mb-3">
                                                <label
                                                    htmlFor="exampleFormControlInput17"
                                                    className="form-label small fw-bold"
                                                >
                                                    To Date <span className='fw-bold'> (dd/mm/yy) </span>
                                                </label>
                                                <DatePicker
                                                    selected={toDate}
                                                    onChange={(date) => setToDate(date)}
                                                    dateFormat="dd-MM-yyyy"
                                                    className="field-style-hr w-100"
                                                    placeholderText={dateConvert(singleLeaveData.date_to, 8)}
                                                />

                                            </div>

                                            <div className="mb-3">
                                                <label
                                                    htmlFor="exampleFormControlInput14"
                                                    className="form-label fw-bold small"
                                                >
                                                    Duration
                                                </label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    id="exampleFormControlInput14"
                                                    defaultValue={singleLeaveData.duration}
                                                    {...register1("duration")}
                                                />
                                            </div>

                                            <div className="mb-3">
                                                <label
                                                    htmlFor="inputGroupSelect12"
                                                    className="form-label fw-bold small"
                                                >
                                                    Name of Leave
                                                </label>
                                                <select
                                                    className="form-select"
                                                    id="inputGroupSelect12"
                                                    {...register1("leave_id")}
                                                >
                                                    <option value={singleLeaveData.leave_id}>
                                                        {singleLeaveData.leave_type}
                                                    </option>
                                                    {leaveType.map((data) => (
                                                        <option value={data.leave_id}>
                                                            {data.leave_type}
                                                        </option>
                                                    ))}
                                                    ;
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="mb-3">
                                                <label
                                                    htmlFor="exampleFormControlInput17"
                                                    className="form-label small fw-bold"
                                                >
                                                    Leave Request Date <span className='fw-bold'> (dd/mm/yy) </span>
                                                </label>
                                                <DatePicker
                                                    selected={leaveReqDate}
                                                    onChange={(date) => setLeaveReqDate(date)}
                                                    dateFormat="dd-MM-yyyy"
                                                    className="field-style-hr w-100"
                                                    placeholderText={singleLeaveData.leave_req_date ? dateConvert(singleLeaveData.leave_req_date, 5) : "dd-mm-yyyy"}
                                                />


                                            </div>
                                            <div className="mb-3">
                                                <label
                                                    htmlFor="exampleFormControlInput14"
                                                    className="form-label fw-bold small"
                                                >
                                                    Cause
                                                </label>
                                                <textarea
                                                    className="form-control"
                                                    rows="5"
                                                    defaultValue={singleLeaveData.cause}
                                                    {...register1("cause")}
                                                ></textarea>

                                            </div>

                                            <div className="mb-3">
                                                <label
                                                    htmlFor="exampleFormControlTextarea1"
                                                    className="form-label fw-bold small"
                                                >
                                                    Remark
                                                </label>
                                                <textarea
                                                    className="form-control"
                                                    rows="5"
                                                    defaultValue={singleLeaveData.employee_memo}
                                                    {...register1("employee_memo")}
                                                ></textarea>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button
                                            type="submit"
                                            className="btn bgColor text-white px-5 py-2 rounded"
                                        >
                                            Update
                                        </button>
                                        <button
                                            type="button"
                                            className="btn bgColor text-white px-5 ms-1 py-2 rounded"
                                            data-dismiss="modal"
                                        >
                                            Close
                                        </button>
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

export default AddleaveRequest;
