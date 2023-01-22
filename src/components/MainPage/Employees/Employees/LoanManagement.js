import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import {
  Avatar_09,
  Avatar_02,
  Avatar_03,
  Avatar_05,
  Avatar_08,
  Avatar_10,
  Avatar_15,
  Avatar_20,
  Avatar_24,
  Avatar_25,
} from "../../../Entryfile/imagepath";
import { Table } from "antd";
import "antd/dist/antd.css";
import { itemRender, onShowSizeChange } from "../../paginationfunction";
import "../../antdstyle.css";
import Select from "react-select";
import { useForm } from "react-hook-form";
import DateTimePicker from "react-datetime-picker";
import axios from "axios";
import { HashLink } from "react-router-hash-link";
import swal from "sweetalert";
const LoanManagement = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const {
    register: register2,
    handleSubmit: handleSubmit2,
    formState: { errors: errors2 },
  } = useForm();
  const [employeeData, setEmployeeData] = useState([]);
  const [data, setData] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [employeeNameCategory, setEmployeeNameCategory] = useState();
  const [loanType, setLoanType] = useState([]);
  const [loanFunds, setLoanFunds] = useState([]);
  const [terminationDate, setTerminationDate] = useState(new Date());
  const [paidDate, setPaidDate] = useState(new Date());
  const [sanctionDate, setSanctionDate] = useState(new Date());
  const [getLoanId, setGetLoanId] = useState(null);
  const [getLoanData, setGetLoanData] = useState({});
  const [loadUpdate, setLoadUpdate] = useState(false);

  const onSubmit = (data1) => {
    const creatDate = new Date();
    data1.ltype_id = parseInt(data1.ltype_id);
    data1.amount = parseInt(data1.amount);
    data1.installno = parseInt(data1.installno);
    axios({
      method: "post",
      url: "/ords/accounts/fanotifications/",
      data: {
        NOTIBY: employeeNameCategory,
        NOTITYPE: "loan",
        NOTIFOR: data1.ltype_id,
        NOTIAMOUNT: data1.amount,
        NOTIAMTWORD: data1.amount_word,
        NOTINUMTEXT: data1.approval_letter_no,
        NOTIREMARK: data1.remark,
        NOTINUMBER: data1.installno,
        NOTIDATE: data1.request_date,
        NOTISTATUS: 1,
        CREATED_AT: `${creatDate.toLocaleDateString("es-CL")}, ${creatDate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}`
      },
      headers: { Authorization: "Bearer ..." },
    }).then((res) => {
      console.log(res)
      if (res.data) {
        setLoadUpdate(true);
        swal({
          title: "Good job!",
          text: "Successfully Added",
          icon: "success",
          button: "Ok",
        });
        reset();

        window.$("#add_loan").modal("hide");
      }
    });
  };

  const handleEmployeeNameCategory = (selectedOption) => {
    setEmployeeNameCategory(selectedOption.value);
  };

  let categoryOptions = employeeData.map((data) => {
    let optionsItem = {};
    optionsItem.value = data.employe_id;
    optionsItem.label = `${data.name_english} (${data.designation})`;
    return optionsItem;
  });

  // GET LOAN_TYPE DATA
  useEffect(() => {
    const getUsers = () => {
      setIsLoading(true);
      fetch(`/ords/accounts/loantypes/`)
        .then((res) => {
          // You have to send it, as I have done below
          if (res.status >= 400) {
            throw new Error("Server responds with error!");
          }
          return res.json();
        })
        .then(
          (users) => {
            setLoanType(users.items);
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



  const [searchLoan, setSearchLoan] = useState("");

  useEffect(() => {
    const getUsers = () => {
      setIsLoading(true);
      fetch(
        `/ords/accounts/fa_noty_view/`
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
  }, [searchLoan, loadUpdate]);

  useEffect(() => {
    const getUsers = () => {
      fetch("/ords/hrm/employees/v_all_emp_grade?limit=3000")
        .then((res) => {
          if (res.status >= 400) {
            throw new Error("Server responds with error!");
          }
          return res.json();
        })
        .then(
          (data) => {
            setEmployeeData(data.items);
            setIsLoading(true);
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

  const columns = [
    {
      title: "ID",
      dataIndex: "notiid",
    },
    {
      title: "Employee Name",
      render: (text, record) => (
        <div
        >
          <p>{record?.empname} </p>
          <p>{record?.empdes} </p>
          <p>{record?.empdept} </p>
        </div>
      ),
    },
    {
      title: "Loan Type",
      render: (text, record) => (
        <div
        >
          <span>{record.type} {record?.interest}% </span>
        </div>
      ),
    },
    {
      title: "Amount",
      dataIndex: "notiamount",
    },
    {
      title: "Amount in Word",
      dataIndex: "notiamtword",
    },
    {
      title: "Installment No",
      dataIndex: "notinumber",
    },
    {
      title: "Approval letter no",
      dataIndex: "notinumtext",
    },
    {
      title: "Request date",
      dataIndex: "notidate",
    },
    {
      title: "Entry date",
      dataIndex: "created_at",
    },
    {
      title: "Remark",
      dataIndex: "notiremark",
    },

    {
      title: "Status",
      className: "status-data-break",
      render: (text, record) => (
        <div
        >
          {record?.notistatus === 1 &&
            <span>
              <i className="fa fa-dot-circle-o text-danger" /> Pending
            </span>

          }
          {record?.notistatus === 2 &&
            <span>
              <i className="fa fa-dot-circle-o text-success" /> Approved
            </span>

          }
        </div>
      ),
    },
    // <i className="fa fa-dot-circle-o text-success" /> Approved
    {
      title: "Action",
      render: (text, record) => (
        <div className="dropdown dropdown-action text-right">
          <a
            className="action-icon dropdown-toggle"
            data-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="material-icons">more_vert</i>
          </a>
          <div className="dropdown-menu dropdown-menu-right">
            {" "}
            <a onClick={() => {
              setGetLoanId(record.notiid)
              console.log(record.notiid)
            }} className="dropdown-item" data-toggle="modal" data-target="#edit_loan">
              <i className="fa fa-pencil m-r-5" /> Edit
            </a>
            <a
              className="dropdown-item"
              href="#"
              data-toggle="modal"
              onClick={() => {
                deleteButtonHandler(record.notiid);
              }}
            >
              <i className="fa fa-trash-o m-r-5" /> Delete
            </a>
          </div>
        </div>
      ),
    },
  ];

  const [singleLoanData, setSingleLoanData] = useState({})
  // GET Singel Loan DATA
  useEffect(() => {
    const getUsers = () => {
      fetch(`/ords/accounts/fa_noty_view/?q={"notiid":"${getLoanId}"}`)
        .then((res) => {
          // You have to send it, as I have done below
          if (res.status >= 400) {
            throw new Error("Server responds with error!");
          }
          return res.json();
        })
        .then(

          (users) => {
            setSingleLoanData(users.items[0]);
          },

          (err) => {
            const mute = err;
            setHasError(true);
          }
        );
    };
    getUsers();
  }, [getLoanId]);

  const onUpdate = (updateData) => {
    // NOTIBY: employeeNameCategory,
    //     NOTITYPE: "loan",
    //     NOTIFOR: data1.ltype_id,
    //     NOTIAMOUNT: data1.amount,
    //     NOTIAMTWORD: data1.amount_word,
    //     NOTINUMTEXT: data1.approval_letter_no,
    //     NOTIREMARK: data1.remark,
    //     NOTINUMBER: data1.installno,
    //     NOTIDATE: data1.request_date,
    //     NOTISTATUS: 1,
    //     CREATED_AT: `${creatDate.toLocaleDateString("es-CL")}, ${creatDate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}`

    if (Object.keys(singleLoanData).length !== 0) {
      if (employeeNameCategory) {
        singleLoanData.notiby = parseInt(employeeNameCategory)
      }
      if (updateData.ltype_id) {
        singleLoanData.notifor = parseInt(updateData.ltype_id)
      }
      if (updateData.amount) {
        console.log('hitting')
        singleLoanData.notiamount = parseInt(updateData.amount)
      }
      if (updateData.amount_word) {
        singleLoanData.notiamtword = updateData.amount_word
      }
      if (updateData.approval_letter_no) {
        singleLoanData.notinumtext = updateData.approval_letter_no
      }
      if (updateData.remark) {
        singleLoanData.notiremark = updateData.remark
      }
      if (updateData.installno) {
        singleLoanData.notinumber = parseInt(updateData.installno)
      }
      if (updateData.request_date) {
        singleLoanData.notidate = updateData.request_date
      }
      const data = {
        NOTIBY: singleLoanData.notiby,
        NOTITYPE: singleLoanData.notitype,
        NOTIFOR: singleLoanData.ltype_id,
        NOTIAMOUNT: singleLoanData.amount,
        NOTIAMTWORD: singleLoanData.amount_word,
        NOTINUMTEXT: singleLoanData.approval_letter_no,
        NOTIREMARK: singleLoanData.remark,
        NOTINUMBER: singleLoanData.installno,
        NOTIDATE: singleLoanData.request_date,
        NOTISTATUS: singleLoanData.notistatus,
        CREATED_AT: singleLoanData.created_at
      }

      console.log(updateData)
      console.log(singleLoanData)
      console.log(data)
      // axios({
      //   method: "put",
      //   url: `/ords/accounts/fanotifications/${getLoanId}`,
      //   data,
      // }).then((res) => {
      //   console.log(res.data)
      //   if (res.data) {
      //     setLoadUpdate(true);
      //     swal({
      //       title: "Good job!",
      //       text: "Successfully Updated",
      //       icon: "success",
      //       button: "Ok",
      //     });
      //     reset();
      //     window.$("#edit_loan").modal("hide");
      //   }
      // });
    }
  };

  useEffect(() => {
    const getUsers = () => {
      setIsLoading(true);
      fetch(`/ords/hrm/emp_loa/${getLoanId}`)
        .then((res) => {
          // You have to send it, as I have done below
          if (res.status >= 400) {
            throw new Error("Server responds with error!");
          }
          return res.json();
        })
        .then(
          (users) => {
            setGetLoanData(users);
            setIsLoading(false);
          },

          (err) => {
            const mute = err;
            setHasError(true);
            setIsLoading(true);
          }
        );
    };
    if (getLoanId) {
      getUsers();
    }

  }, [getLoanId]);

  const deleteButtonHandler = (loanId) => {
    //
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const url = `/ords/accounts/fanotifications/${loanId}`;
        fetch(url, {
          method: "DELETE",
        }).then((item) => {
          const remainingUsers = data.filter(
            (user) => user.notiid !== loanId
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
          <title>Loans - HR</title>
          <meta name="description" content="Login page" />
        </Helmet>
        {/* Page Content */}
        <div className="content container-fluid">
          {/* Page Header */}
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col">
                <h3 className="page-title ">Employee Loan Request</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/app/main/dashboard">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">Loan</li>
                </ul>
              </div>
              <div className="col-auto float-right ml-auto">
                <a
                  href="#"
                  className="btn add-btn bgColor text-white"
                  data-toggle="modal"
                  data-target="#add_loan"
                >
                  <i className="fa fa-plus" /> Add new Loan Request
                </a>
              </div>
            </div>
          </div>
          {/* /Search Filter */}
          <div className="row  mb-4 ps-2">
            <input
              onChange={(e) => {
                setSearchLoan(e.target.value);
              }}
              className="form-control w-25 shadow py-4"
              type="text"
              placeholder="Employee Name"
            />
          </div>
          {/* /Search Filter */}
          <div className="row">
            <div className="col-md-12">
              <div className="table">
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
        {/* Add Loan Modal */}

        <div id="add_loan" className="modal custom-modal fade" role="dialog">
          <div
            className="modal-dialog modal-dialog-centered modal-lg"
            role="document"
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add new Loan Request</h5>
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
                    <div className="col-sm-6">
                      <div className="mb-3">
                        <label
                          htmlFor="inputGroupSelect12"
                          className="form-label fw-bold "
                        >
                          Choose an Employee
                        </label>

                        <Select
                          options={categoryOptions}
                          onChange={handleEmployeeNameCategory}
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="inputGroupSelect12"
                          className="form-label fw-bold "
                        >
                          Loan Type
                        </label>
                        <select
                          className="form-select"
                          id="inputGroupSelect12"
                          {...register("ltype_id")}
                        >
                          <option value="">Choose loan type</option>
                          {loanType.map((data) => (
                            <option value={data.id}>
                              {`${data.type} (${data?.interest}%)`}
                            </option>
                          ))}
                          ;
                        </select>
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput14"
                          className="form-label fw-bold "
                        >
                          Total Loan Amount
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          id="exampleFormControlInput14"
                          placeholder="Total Loan Amount"
                          {...register("amount")}
                        />
                      </div>

                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput14"
                          className="form-label fw-bold"
                        >
                          Loan Amount in Words
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="exampleFormControlInput14"
                          placeholder="Loan Amount in Words"
                          {...register("amount_word")}
                        />
                      </div>

                    </div>
                    <div className="col-sm-6">
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput17"
                          className="form-label fw-bold"
                        >
                          Request Date
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          id="exampleFormControlInput17"
                          {...register("request_date")}
                        />
                        {/* <DateTimePicker
                          format={`dd/MM/yyyy 00:00`}
                          className="w-100"
                          onChange={setSanctionDate}
                          value={sanctionDate}
                        /> */}
                        {/* <input type="date" className="form-control" id="exampleFormControlInput17" {...register("sanction_date")} /> */}
                      </div>



                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput14"
                          className="form-label fw-bold"
                        >
                          Approval letter no
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="exampleFormControlInput14"
                          placeholder="Approval letter no"
                          {...register("approval_letter_no")}
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput14"
                          className="form-label fw-bold small"
                        >
                          Installment
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          id="exampleFormControlInput14"
                          placeholder="Installment"
                          {...register("installno")}
                        />
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
                          id="exampleFormControlTextarea1"
                          rows="5"
                          placeholder="Remark"
                          {...register("remark")}
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

        {/* /Add Leave Modal */}
        {/* Edit Loan Modal */}
        {/*Update Loan Informations  */}

        <div
          id="edit_loan"
          className="modal custom-modal fade"
          role="dialog"
        >
          <div
            className="modal-dialog modal-dialog-centered modal-lg"
            role="document"
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Loan</h5>
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
                <form onSubmit={handleSubmit2(onUpdate)}>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="mb-3">
                        <label
                          htmlFor="inputGroupSelect12"
                          className="form-label fw-bold "
                        >
                          Choose an Employee
                        </label>

                        <Select
                          options={categoryOptions}
                          onChange={handleEmployeeNameCategory}
                          placeholder={`${singleLoanData?.empname}`}
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="inputGroupSelect12"
                          className="form-label fw-bold "
                        >
                          Loan Type
                        </label>
                        <select
                          className="form-select"
                          id="inputGroupSelect12"
                          {...register2("ltype_id")}
                        >
                          <option value="">{singleLoanData?.notitype} {singleLoanData?.interest}%</option>
                          {loanType.map((data) => (
                            <option value={data.id}>
                              {`${data.type} (${data?.interest}%)`}
                            </option>
                          ))}
                          ;
                        </select>
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput14"
                          className="form-label fw-bold "
                        >
                          Total Loan Amount
                        </label>
                        <input
                          defaultValue={singleLoanData?.notiamount}
                          type="number"
                          className="form-control"
                          id="exampleFormControlInput14"
                          placeholder="Total Loan Amount"
                          {...register2("amount")}
                        />
                      </div>

                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput14"
                          className="form-label fw-bold"
                        >
                          Loan Amount in Words
                        </label>
                        <input
                          defaultValue={singleLoanData?.notiamtword}
                          type="text"
                          className="form-control"
                          id="exampleFormControlInput14"
                          placeholder="Loan Amount in Words"
                          {...register2("amount_word")}
                        />
                      </div>

                    </div>
                    <div className="col-sm-6">
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput17"
                          className="form-label fw-bold"
                        >
                          Request Date
                        </label>
                        <input
                          defaultValue={singleLoanData?.notidate}
                          type="date"
                          className="form-control"
                          id="exampleFormControlInput17"
                          {...register2("request_date")}
                        />
                        {/* <DateTimePicker
                          format={`dd/MM/yyyy 00:00`}
                          className="w-100"
                          onChange={setSanctionDate}
                          value={sanctionDate}
                        /> */}
                        {/* <input type="date" className="form-control" id="exampleFormControlInput17" {...register("sanction_date")} /> */}
                      </div>



                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput14"
                          className="form-label fw-bold"
                        >
                          Approval letter no
                        </label>
                        <input
                          defaultValue={singleLoanData?.notinumtext}
                          type="text"
                          className="form-control"
                          id="exampleFormControlInput14"
                          placeholder="Approval letter no"
                          {...register2("approval_letter_no")}
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput14"
                          className="form-label fw-bold small"
                        >
                          Installment
                        </label>
                        <input
                          defaultValue={singleLoanData?.notinumber}
                          type="number"
                          className="form-control"
                          id="exampleFormControlInput14"
                          placeholder="Installment"
                          {...register2("installno")}
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlTextarea1"
                          className="form-label fw-bold small"
                        >
                          Remark
                        </label>
                        <textarea
                          defaultValue={singleLoanData?.notiremark}
                          className="form-control"
                          id="exampleFormControlTextarea1"
                          rows="5"
                          placeholder="Remark"
                          {...register2("remark")}
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
        {/* /Edit Loan Modal */}
        {/* Approve Leave Modal */}
        <div
          className="modal custom-modal fade"
          id="approve_leave"
          role="dialog"
        >
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
                      <a href="" className="btn btn-primary continue-btn">
                        Approve
                      </a>
                    </div>
                    <div className="col-6">
                      <a
                        href=""
                        data-dismiss="modal"
                        className="btn btn-primary cancel-btn"
                      >
                        Decline
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /Approve Leave Modal */}
        {/* Delete Leave Modal */}
        <div
          className="modal custom-modal fade"
          id="delete_approve"
          role="dialog"
        >
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
                      <a href="" className="btn btn-primary continue-btn">
                        Delete
                      </a>
                    </div>
                    <div className="col-6">
                      <a
                        href=""
                        data-dismiss="modal"
                        className="btn btn-primary cancel-btn"
                      >
                        Cancel
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /Delete Leave Modal */}
      </div>
    </div>
  );
};

export default LoanManagement;
