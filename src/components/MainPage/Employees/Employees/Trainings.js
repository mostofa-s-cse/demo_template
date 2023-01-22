import React from "react";
import { useState, useEffect, useRef } from "react";
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
import { useReactToPrint } from "react-to-print";
import DateTimePicker from "react-datetime-picker";
import axios from "axios";
import { HashLink } from "react-router-hash-link";
import swal from "sweetalert";
const Trainings = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [loadUpdate, setLoadUpdate] = useState(false);
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const onSubmit = (data1) => {
    data1.employe_id = employeeNameCategory;
    data1.date_from = `${data1.date_from}T00:00:00Z`;
    data1.date_to = `${data1.date_to}T00:00:00Z`;

    //

    axios({
      method: "post",
      url: "/ords/hrm/emp_tra/crud",
      data: {
        EMPLOYE_ID: data1.employe_id,
        TRAINING_TYPE: data1.training_type,
        COURSE_TITLE: data1.course_title,
        INSTITUTION: data1.institution,
        LOCATION: data1.location,
        DATE_FROM: data1.date_from,
        DATE_TO: data1.date_to,
        POSITION: data1.position,
      },
      headers: { Authorization: "Bearer ..." },
    }).then((res) => {
      if (!res.data) {
        setLoadUpdate(true);
        swal({
          title: "Good !",
          text: "Successfully Added",
          icon: "success",
          button: "Ok",
        });
        reset();

        window.$("#add_training").modal("hide");
      }
    });
  };

  const [employeeData, setEmployeeData] = useState([]);
  const [employeeNameCategory, setEmployeeNameCategory] = useState();
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());

  const [searchTraining, setSearchTraining] = useState("");

  useEffect(() => {
    const getUsers = () => {
      setIsLoading(true);
      fetch(
        `/ords/hrm/emp_tra/v_emp_tra?q={"name_english":{"$like":"%25${searchTraining.toLocaleUpperCase()}%25"},"$orderby":{"employee_training_id":"desc"}}`
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
  }, [searchTraining, loadUpdate]);

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

  const handleEmployeeNameCategory = (selectedOption) => {
    setEmployeeNameCategory(selectedOption.value);
  };

  let categoryOptions4 = employeeData.map((data) => {
    let optionsItem = {};
    optionsItem.value = data.employe_id;
    optionsItem.label = `${data.name_english} (${data.employe_registration_number})`;
    return optionsItem;
  });

  const columns = [
    {
      title: "Name",
      dataIndex: "name_english",
    },

    {
      title: "Course Title",
      dataIndex: "course_title",
    },
    {
      title: "Training Type",
      dataIndex: "training_type",
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
      title: "Position",
      dataIndex: "position",
    },
    {
      title: "Institution",
      dataIndex: "institution",
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
                to={`/allemployees/employeeprofile/${record.employe_id}#trainingHash`}
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
                deleteButtonHandler(record.employee_training_id);
              }}
            >
              <i className="fa fa-trash-o m-r-5" /> Delete
            </a>
          </div>
        </div>
      ),
    },
  ];

  const deleteButtonHandler = (trainingId) => {
    //
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const url = `/ords/hrm/emp_tra/crud`;
        fetch(url, {
          method: "DELETE",
          headers: {
            EMPLOYEE_TRAINING_ID: trainingId,
          },
        }).then((item) => {
          const remainingUsers = data.filter(
            (user) => user.employee_training_id !== trainingId
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
        <title>Training Info - HR</title>
        <meta name="description" content="Login page" />
      </Helmet>
      {/* Page Content */}
      <div className="content container-fluid">
        {/* Page Header */}
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col">
              <h3 className="page-title">Training Info</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/app/main/dashboard">Dashboard</Link>
                </li>
                <li className="breadcrumb-item active">Training</li>
              </ul>
            </div>
            <div className="col-auto float-right ml-auto">
              <a
                href="#"
                className="btn add-btn bgColor text-white"
                data-toggle="modal"
                data-target="#add_training"
              >
                <i className="fa fa-plus" /> Add Training
              </a>
            </div>
            <div className="col-auto float-right ml-auto">
              <Link to="/trainingPdfReport">
                <button className="btn btn-primary text-end me-3">
                  {" "}
                  Report!
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="row  mb-4 ps-2">
          <div className="col-sm-4">
            <input
              onChange={(e) => {
                setSearchTraining(e.target.value);
              }}
              className="form-control w-100 shadow py-4"
              type="text"
              placeholder="Employee Name"
            />
          </div>
          {/* <div className='col-sm-4'>
                         <select onChange={(e) => {
                            setFilterTraining(e.target.value)
                        }} className="form-select form-select-lg mb-3" aria-label=".form-select-lg example">
                         <option value="All Training">All Training</option>
                         <option value="Local">Local</option>
                        <option value="Foreign">Foreign</option>
                       
                        </select>
                    </div> */}
          {/* <div className='col-sm-4'>

                       
                         
                    </div> */}
        </div>

        {/* /Leave Statistics */}
        <div ref={componentRef} className="row ">
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
      {/* Add training Modal */}

      <div id="add_training" className="modal custom-modal fade" role="dialog">
        <div
          className="modal-dialog modal-lg modal-dialog-centered"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Training</h5>
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
                    Choose an Employee
                  </label>

                  <Select
                    options={categoryOptions4}
                    onChange={handleEmployeeNameCategory}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="inputGroupSelect12"
                    className="form-label fw-bold small"
                  >
                    Local/Foreign
                  </label>
                  <select
                    className="form-select"
                    id="inputGroupSelect12"
                    {...register("training_type")}
                  >
                    <option selected>Choose a type</option>
                    <option value="Local">Local</option>
                    <option value="Foreign">Foreign</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput14"
                    className="form-label fw-bold small"
                  >
                    Course Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput14"
                    placeholder="Enter Course Title"
                    {...register("course_title")}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput14"
                    className="form-label fw-bold small"
                  >
                    Institution
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput14"
                    placeholder="Enter Institution"
                    {...register("institution")}
                  />
                </div>
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
                    id="exampleFormControlInput14"
                    placeholder="Enter Location"
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
                    placeholder="Enter Location"
                    {...register("date_to")}
                  />
                  {/* <DateTimePicker
                    format={`dd/MM/yyyy 00:00`}
                    className="w-100"
                    onChange={setToDate}
                    value={toDate}
                  />{" "} */}
                  {/* <input type="date" className="form-control" id="exampleFormControlInput17" {...register("date_to")} /> */}
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput17"
                    className="form-label fw-bold small"
                  >
                    Position
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput17"
                    placeholder="Enter Position"
                    {...register("position")}
                  />
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput17"
                    className="form-label fw-bold small"
                  >
                    Training Material
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="exampleFormControlInput17"
                    {...register("material_file")}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput17"
                    className="form-label fw-bold small"
                  >
                    Training Certificate
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="exampleFormControlInput17"
                    placeholder="Enter Position"
                    {...register("certificate_file")}
                  />
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
    </div>
  );
};

export default Trainings;
