import React from "react";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import {
  Avatar_02,
  Avatar_05,
  Avatar_09,
  Avatar_10,
  Avatar_03,
  Avatar_08,
  Avatar_15,
  Avatar_20,
  Avatar_25,
  Avatar_24,
} from "../../../Entryfile/imagepath";
import { Table } from "antd";
import "antd/dist/antd.css";
import { itemRender, onShowSizeChange } from "../../paginationfunction";
import "../../antdstyle.css";
import { useForm } from "react-hook-form";
import Select from "react-select";
import DateTimePicker from "react-datetime-picker";
import axios from "axios";
import { HashLink } from "react-router-hash-link";
import swal from "sweetalert";
const Promotions = () => {
  const [loadUpdate, setLoadUpdate] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data1) => {
    data1.employe_id = employeeNameCategory;
    data1.designation = designationCategory;
    data1.date_from = `${data1.date_from}T00:00:00Z`;
    data1.date_to = `${data1.date_to}T00:00:00Z`;
    data1.promotion_date = `${data1.promotion_date}T00:00:00Z`;
    // data1.date_from = fromDate.toISOString();
    // data1.date_to = toDate.toISOString();
    // data1.promotion_date = promotionDate.toISOString();

    //
    axios({
      method: "post",
      url: "/ords/hrm/emp_pro/crud",
      data: {
        EMPLOYE_ID: data1.employe_id,
        DESIGNATION_ID: data1.designation,
        TYPE_PROMOTION: data1.type_promotion,
        ORGANIZATION: data1.organization,
        TYPE_POSTING: data1.type_posting,
        LOCATION: data1.location,
        DATE_FROM: data1.date_from,
        DATE_TO: data1.date_to,
        PROMOTION_DATE: data1.promotion_date,
      },
      headers: { Authorization: "Bearer ..." },
    }).then((res) => {
      if (!res.data) {
        setLoadUpdate(true);
        swal({
          title: "Good job!",
          text: "Successfully Added",
          icon: "success",
          button: "Ok",
        });
        reset();

        window.$("#add_promotion").modal("hide");
      }
    });
  };

  const [employeeData, setEmployeeData] = useState([]);
  const [employeeNameCategory, setEmployeeNameCategory] = useState();
  const [designationData, setDesignationData] = useState([]);
  const [designationCategory, setDesignationCategory] = useState();
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [gradeId, setGradeId] = useState(null);
  const [gradeData, setGradeData] = useState({});
  const [designationId, setDesignationId] = useState(null);
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [promotionDate, setPromotionDate] = useState(new Date());

  const [searchPromotion, setSearchPromotion] = useState("");
  useEffect(() => {
    const getUsers = () => {
      setIsLoading(true);
      fetch(
        `/ords/hrm/emp_pro/v_emp_pro?q={"name_english":{"$like":"%25${searchPromotion.toLocaleUpperCase()}%25"},"$orderby":{"employe_promotion_id":"desc"}}`
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
  }, [searchPromotion, loadUpdate]);

  useEffect(() => {
    const getUsers = () => {
      fetch("/ords/hrm/employees/crud?limit=10000")
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

  useEffect(() => {
    const getUsers = () => {
      fetch("/ords/hrm/des/crud")
        .then((res) => {
          if (res.status >= 400) {
            throw new Error("Server responds with error!");
          }
          return res.json();
        })
        .then(
          (data) => {
            setDesignationData(data.items);
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

  const handleEmployeeNameCategory = (selectedOption) => {
    setEmployeeNameCategory(selectedOption.value);
  };

  const handleDesignationSelectCategory = (selectedOption) => {
    setDesignationCategory(selectedOption.value);
    setDesignationId(selectedOption.value);
  };
  useEffect(() => {
    const getUsers = () => {
      fetch(`/ords/hrm/des/${designationId}`)
        .then((res) => {
          if (res.status >= 400) {
            throw new Error("Server responds with error!");
          }
          return res.json();
        })
        .then(
          (data) => {
            setGradeId(data.grade_id);
            setIsLoading(true);
          },
          (err) => {
            const mute = err;
            setHasError(true);
            setIsLoading(true);
          }
        );
    };
    if (designationId) {
      getUsers();
    }
  }, [designationId]);
  // get Grade table data
  useEffect(() => {
    const getUsers = () => {
      fetch(`/ords/hrm/gra/${gradeId}`)
        .then((res) => {
          if (res.status >= 400) {
            throw new Error("Server responds with error!");
          }
          return res.json();
        })
        .then(
          (data) => {
            setGradeData(data);
            setIsLoading(true);
          },
          (err) => {
            const mute = err;
            setHasError(true);
            setIsLoading(true);
          }
        );
    };
    if (gradeId) {
      getUsers();
    }
  }, [gradeId]);

  let categoryOptions = employeeData.map((data) => {
    let optionsItem = {};
    optionsItem.value = data.employe_id;
    optionsItem.label = `${data.name_english} (${data.employe_registration_number})`;
    return optionsItem;
  });
  let categoryOptions1 = designationData.map((data) => {
    let optionsItem = {};
    optionsItem.value = data.designation_id;
    optionsItem.label = data.designation;
    return optionsItem;
  });

  const columns = [
    {
      title: "Name",
      dataIndex: "name_english",
    },

    {
      title: "Type",
      dataIndex: "type_promotion",
    },
    {
      title: "Designation",
      dataIndex: "designation",
    },

    {
      title: "Organization",
      dataIndex: "organization",
    },

    {
      title: "Posting Type",
      dataIndex: "type_posting",
    },
    {
      title: "Location",
      dataIndex: "location",
    },
    {
      title: "Promotion/Charge Date",
      dataIndex: "promotion_date",
    },
    {
      title: "Date From",
      dataIndex: "date_from",
    },
    {
      title: "Date To",
      dataIndex: "date_to",
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
            <Link to={`/allemployees/employeeprofile/${record.employe_id}`}>
              <HashLink
                to={`/allemployees/employeeprofile/${record.employe_id}#promotionHash`}
              >
                {" "}
                <a className="dropdown-item" href="#" data-toggle="modal">
                  <i className="fa fa-pencil m-r-5" /> Edit
                </a>
              </HashLink>
            </Link>
            <a
              className="dropdown-item"
              href="#"
              data-toggle="modal"
              onClick={() => {
                deleteButtonHandler(record.employe_promotion_id);
              }}
            >
              <i className="fa fa-trash-o m-r-5" /> Delete
            </a>
          </div>
        </div>
      ),
    },
  ];
  const deleteButtonHandler = (promotionId) => {
    //
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const url = `/ords/hrm/emp_pro/crud`;
        fetch(url, {
          method: "DELETE",
          headers: {
            EMPLOYE_PROMOTION_ID: promotionId,
          },
        }).then((item) => {
          const remainingUsers = data.filter(
            (user) => user.employe_promotion_id !== promotionId
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
    <div className="page-wrapper">
      <Helmet>
        <title>Promotion/Charge - HR</title>
        <meta name="description" content="Login page" />
      </Helmet>
      {/* Page Content */}
      <div className="content container-fluid">
        {/* Page Header */}
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col">
              <h3 className="page-title">Promotion/Charge List</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/app/main/dashboard">Dashboard</Link>
                </li>
                <li className="breadcrumb-item active">Promotion</li>
              </ul>
            </div>
            <div className="col-auto float-right ml-auto">
              <a
                href="#"
                className="btn add-btn bgColor text-white"
                data-toggle="modal"
                data-target="#add_promotion"
              >
                <i className="fa fa-plus" /> Add Promotion/Charge
              </a>
            </div>
          </div>
        </div>
        <div className="row  mb-4 ps-2">
          <input
            onChange={(e) => {
              setSearchPromotion(e.target.value);
            }}
            className="form-control w-25 shadow py-4"
            type="text"
            placeholder="Employee Name"
          />
        </div>
        {/* /Leave Statistics */}
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
      {/* Add Promotion Modal */}

      <div id="add_promotion" className="modal custom-modal fade" role="dialog">
        <div
          className="modal-dialog modal-lg modal-dialog-centered"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add new Promotion/Charge</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="modal-body text-start">
                <div className="mb-3">
                  <label
                    htmlFor="inputGroupSelect12"
                    className="form-label fw-bold small"
                  >
                    Employee
                  </label>
                  <Select
                    options={categoryOptions}
                    onChange={handleEmployeeNameCategory}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="inputGroupSelect12"
                    className="form-label fw-bold small"
                  >
                    Type
                  </label>
                  <select
                    className="form-select"
                    id="inputGroupSelect12"
                    {...register("type_promotion")}
                  >
                    <option selected>Choose a type</option>
                    <option value="Promotion">Promotion</option>
                    <option value="Charge">Charge</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="inputGroupSelect12"
                    className="form-label fw-bold small"
                  >
                    Designation
                  </label>
                  <Select
                    options={categoryOptions1}
                    onChange={handleDesignationSelectCategory}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput14"
                    className="form-label fw-bold small"
                  >
                    Grade
                  </label>
                  <input
                    value={gradeData.grade || 0}
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput14"
                    placeholder=""
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput14"
                    className="form-label fw-bold small"
                  >
                    Payscale
                  </label>
                  <input
                    type="text"
                    value={`${gradeData.pay_scale_from || 0} -${gradeData.pay_scale_to || 0
                      }`}
                    className="form-control"
                    id="exampleFormControlInput14"
                    placeholder=""
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput14"
                    className="form-label fw-bold small"
                  >
                    Organization
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput14"
                    placeholder="Enter Organization"
                    {...register("organization")}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="inputGroupSelect12"
                    className="form-label fw-bold small"
                  >
                    PostingType
                  </label>
                  <select
                    className="form-select"
                    id="inputGroupSelect12"
                    {...register("type_posting")}
                  >
                    <option selected>Choose a type</option>
                    <option value="Regular">Regular</option>
                    <option value="Deputation">Deputation</option>
                    <option value="Lien">Lien</option>
                    <option value="4">others</option>
                  </select>
                  <div className="mb-3">
                    <label
                      htmlFor="exampleFormControlInput14"
                      className="form-label fw-bold small"
                    >
                      Location
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleFormControlInput14"
                      placeholder="Enter Location"
                      {...register("location")}
                    />
                  </div>

                  <div className="mb-3">
                    <label
                      htmlFor="exampleFormControlInput17"
                      className="form-label fw-bold small"
                    >
                      From Date
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="exampleFormControlInput17"
                      {...register("date_from")}
                    />

                    {/* <DateTimePicker
                      format={`dd/MM/yyyy 00:00`}
                      className="w-100"
                      onChange={setFromDate}
                      value={fromDate}
                    /> */}
                    {/* <input type="date" className="form-control" id="exampleFormControlInput17" {...register("date_from")} /> */}
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="exampleFormControlInput17"
                      className="form-label fw-bold small"
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
                      htmlFor="exampleFormControlInput17"
                      className="form-label fw-bold small"
                    >
                      Promotion Date
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="exampleFormControlInput14"
                      {...register("promotion_date")}
                    />
                    {/* <DateTimePicker
                      format={`dd/MM/yyyy 00:00`}
                      className="w-100"
                      onChange={setPromotionDate}
                      value={promotionDate}
                    /> */}
                    {/* <input type="date" className="form-control" id="exampleFormControlInput17"   {...register("promotion_date")} /> */}
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
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* /Add Promotion Modal */}
      {/* Edit Promotion Modal */}
      <div id="edit_leave" className="modal custom-modal fade" role="dialog">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Leave</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label>
                    Leave Type <span className="text-danger">*</span>
                  </label>
                  <select className="select">
                    <option>Select Leave Type</option>
                    <option>Casual Leave 12 Days</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>
                    From <span className="text-danger">*</span>
                  </label>
                  <div>
                    <input
                      className="form-control datetimepicker"
                      defaultValue="01-01-2019"
                      type="date"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>
                    To <span className="text-danger">*</span>
                  </label>
                  <div>
                    <input
                      className="form-control datetimepicker"
                      defaultValue="01-01-2019"
                      type="date"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>
                    Number of days <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control"
                    readOnly
                    type="text"
                    defaultValue={2}
                  />
                </div>
                <div className="form-group">
                  <label>
                    Remaining Leaves <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control"
                    readOnly
                    defaultValue={12}
                    type="text"
                  />
                </div>
                <div className="form-group">
                  <label>
                    Leave Reason <span className="text-danger">*</span>
                  </label>
                  <textarea
                    rows={4}
                    className="form-control"
                    defaultValue={"Going to hospital"}
                  />
                </div>
                <div className="submit-section">
                  <button className="btn btn-primary submit-btn">Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* /Edit Leave Modal */}
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
                <p>Are you sure want to Cancel this leave?</p>
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
  );
};

export default Promotions;
