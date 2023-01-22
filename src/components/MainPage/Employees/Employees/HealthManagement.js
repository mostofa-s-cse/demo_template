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
import Api from "../../../initialpage/hooks/Api";
const HealthManagement = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [healthStartDate, setHealthStartDate] = useState(new Date());
  const [healthEndDate, setHealthEndDate] = useState(new Date());
  const [xRayReport, setXRayReport] = useState("");
  const [ecgReport, setEcgReport] = useState("");

  const uploadImage1 = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();

    formData.append("image", file);

    axios({
      method: "post",
      url: `http://${Api}/addImages`,
      data: formData,
      headers: { Authorization: "Bearer ..." },
    }).then((data) => {
      setXRayReport(data.data);
    });
  };
  const uploadImage2 = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();

    formData.append("image", file);

    axios({
      method: "post",
      url: `http://${Api}/addImages`,
      data: formData,
      headers: { Authorization: "Bearer ..." },
    }).then((data) => {
      setEcgReport(data.data);
    });
  };
  const [loadUpdate, setLoadUpdate] = useState(false);
  const onSubmit = (data1) => {
    const employeeId = employeeNameCategory;
    data1.employe_id = employeeId;

    data1.health_info_id = parseInt(data1.health_info_id);
    data1.date_from = `${data1.date_from}T00:00:00Z`;
    data1.date_to = `${data1.date_to}T00:00:00Z`;
    // data1.date_from = healthStartDate.toISOString();
    // data1.date_to = healthEndDate.toISOString();


    axios({
      method: "post",
      url: "/ords/hrm/emp_hea/crud",
      data: {
        EMPLOYE_ID: data1.employe_id,
        HEALTH_INFO_ID: data1.health_info_id,
        DATE_FROM: data1.date_from,
        DATE_TO: data1.date_to,
        HEIGHT: data1.height,
        WEIGHT: data1.weight,
        X_RAY_REPORT: xRayReport,
        ECG_REPORT: ecgReport,
        VISUAL_POWER: data1.visual_power,
        BLOOD_PRESSURE: data1.blood_pressure,
        MEDICAL_CLASSIFICATION: data1.medical_classification,
        HEALTH_WEAKNESS: data1.health_weakness,
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

        window.$("#add_health").modal("hide");
      }
    });
  };

  const [employeeData, setEmployeeData] = useState([]);
  const [data, setData] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [employeeNameCategory, setEmployeeNameCategory] = useState();
  const [healthInfo, setHealthInfo] = useState([]);

  const handleEmployeeNameCategory = (selectedOption) => {
    setEmployeeNameCategory(selectedOption.value);
  };

  let categoryOptions = employeeData.map((data) => {
    let optionsItem = {};
    optionsItem.value = data.employe_id;
    optionsItem.label = `${data.name_english} (${data.employe_registration_number})`;
    return optionsItem;
  });

  // Health Info GET API
  useEffect(() => {
    const getUsers = () => {
      setIsLoading(true);
      fetch(`/ords/hrm/hea_inf/crud`)
        .then((res) => {
          // You have to send it, as I have done below
          if (res.status >= 400) {
            throw new Error("Server responds with error!");
          }
          return res.json();
        })
        .then(
          (users) => {
            setHealthInfo(users.items);
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

  const [searchHealth, setSearchHealth] = useState("");
  // GET EMPLOYEE HEALTH DATA FOR REPORT
  useEffect(() => {
    const getUsers = () => {
      setIsLoading(true);
      fetch(
        `/ords/hrm/emp_hea/v_hea_inf?limit=10000&&q={"name_english":{"$like":"%25${searchHealth.toLocaleUpperCase()}%25"},"$orderby":{"employee_health_id":"desc"}}`
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
  }, [searchHealth, loadUpdate]);

  // GET EMPLOYEE DATA FOR SHOW NAME
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
  const columns = [
    {
      title: "Health ID",
      dataIndex: "employee_health_id",
    },
    {
      title: "Employee Name",
      dataIndex: "name_english",
    },

    {
      title: "Health Info",
      dataIndex: "health_info",
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
      title: "Height",
      dataIndex: "height",
    },
    {
      title: "Weight",
      dataIndex: "weight",
    },
    {
      title: "Visual Power",
      dataIndex: "visual_power",
    },
    {
      title: "Blood Pressure",
      dataIndex: "blood_pressure",
    },
    {
      title: "Medical Classification",
      dataIndex: "medical_classification",
    },
    {
      title: "Health Weakness",
      dataIndex: "health_weakness",
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
                to={`/allemployees/employeeprofile/${record.employe_id}#healthHash`}
              >
                {" "}
                <a className="dropdown-item" href="#" data-toggle="modal">
                  <i className="fa fa-pencil m-r-5" /> Edit
                </a>{" "}
              </HashLink>
            </Link>
            <a
              className="dropdown-item"
              href="#"
              data-toggle="modal"
              onClick={() => {
                deleteButtonHandler(record.employee_health_id);
              }}
            >
              <i className="fa fa-trash-o m-r-5" /> Delete
            </a>
          </div>
        </div>
      ),
    },
  ];

  const deleteButtonHandler = (healthId) => {
    //
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const url = `/ords/hrm/emp_hea/crud`;
        fetch(url, {
          method: "DELETE",
          headers: {
            EMPLOYEE_HEALTH_ID: healthId,
          },
        }).then((item) => {
          const remainingUsers = data.filter(
            (user) => user.employee_health_id !== healthId
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
          <title>Healths - HR</title>
          <meta name="description" content="Login page" />
        </Helmet>
        {/* Page Content */}
        <div className="content container-fluid">
          {/* Page Header */}
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col">
                <h3 className="page-title">Health Records</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/app/main/dashboard">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">Health</li>
                </ul>
              </div>
              <div className="col-auto float-right ml-auto">
                <a
                  href="#"
                  className="btn add-btn bgColor text-white"
                  data-toggle="modal"
                  data-target="#add_health"
                >
                  <i className="fa fa-plus" /> Add new Health Records
                </a>
              </div>
            </div>
          </div>

          <div className="row  mb-4 ps-2">
            <input
              onChange={(e) => {
                setSearchHealth(e.target.value);
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
        {/* Add Health Modal */}

        <div id="add_health" className="modal custom-modal fade" role="dialog">
          <div
            className="modal-dialog modal-dialog-centered modal-lg"
            role="document"
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Health Records</h5>
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
                          className="form-label fw-bold small"
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
                          htmlFor="exampleFormControlInput17"
                          className="form-label small fw-bold"
                        >
                          Start Date
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          id="exampleFormControlInput17"
                          {...register("date_from")}
                        />
                        {/* <DateTimePicker
                          format={`dd/MM/yyyy 00:00`}
                          className="w-100 "
                          onChange={setHealthStartDate}
                          value={healthStartDate}
                        /> */}
                        {/* <input type="date" className="form-control" id="exampleFormControlInput17" {...register("date_from")} /> */}
                      </div>

                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput17"
                          className="form-label fw-bold small"
                        >
                          End Date
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          id="exampleFormControlInput17"
                          {...register("date_to")}
                        />
                        {/* <DateTimePicker
                          format={`dd/MM/yyyy 00:00`}
                          className="w-100"
                          onChange={setHealthEndDate}
                          value={healthEndDate}
                        /> */}
                        {/* <input type="date" className="form-control" id="exampleFormControlInput17"  {...register("date_to")} /> */}
                      </div>

                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput14"
                          className="form-label fw-bold small"
                        >
                          Height
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="exampleFormControlInput14"
                          placeholder="Enter Height"
                          {...register("height")}
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput14"
                          className="form-label fw-bold small"
                        >
                          Weight
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="exampleFormControlInput14"
                          placeholder="Enter Weight"
                          {...register("weight")}
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput14"
                          className="form-label fw-bold small"
                        >
                          Visual power
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="exampleFormControlInput14"
                          placeholder="Enter Visual power"
                          {...register("visual_power")}
                        />
                      </div>

                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput50"
                          className="form-label fw-bold me-2 small"
                        >
                          X-ray Report
                        </label>
                        <input
                          onChange={(e) => {
                            uploadImage1(e);
                          }}
                          type="file"
                          id="files"
                          className="ms-2"
                          name="picture"
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="mb-3">
                        <label
                          htmlFor="inputGroupSelect12"
                          className="form-label fw-bold small"
                        >
                          Health Information
                        </label>
                        <select
                          className="form-select"
                          id="inputGroupSelect12"
                          {...register("health_info_id")}
                        >
                          <option value="">Please Select</option>
                          {healthInfo.map((data) => (
                            <option value={data.health_info_id}>
                              {data.health_info}
                            </option>
                          ))}
                          ;
                        </select>
                      </div>

                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput14"
                          className="form-label fw-bold small"
                        >
                          Blood Pressure
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="exampleFormControlInput14"
                          placeholder="Enter Blood Pressure"
                          {...register("blood_pressure")}
                        />
                      </div>

                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlTextarea1"
                          className="form-label fw-bold small"
                        >
                          Medical Classification
                        </label>
                        <textarea
                          className="form-control"
                          id="exampleFormControlTextarea1"
                          rows="5"
                          placeholder="Medical Classification"
                          {...register("medical_classification")}
                        ></textarea>
                      </div>

                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlTextarea1"
                          className="form-label fw-bold small"
                        >
                          Health Weakness/Incompetent Nature
                        </label>
                        <textarea
                          className="form-control"
                          id="exampleFormControlTextarea1"
                          rows="4"
                          placeholder="Health Weakness/Incompetent Nature"
                          {...register("health_weakness")}
                        ></textarea>
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput50"
                          className="form-label fw-bold me-2 small"
                        >
                          ECG Report
                        </label>

                        <input
                          onChange={(e) => {
                            uploadImage2(e);
                          }}
                          type="file"
                          id="files"
                          className="ms-2"
                          name="picture"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="modal-footer">
                    <button
                      type="submit"
                      className="btn bgColor text-white px-5 ms-1 py-2 rounded"
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
      </div>
    </div>
  );
};

export default HealthManagement;
