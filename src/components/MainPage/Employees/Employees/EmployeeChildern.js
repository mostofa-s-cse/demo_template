import React from "react";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Table } from "antd";
import "antd/dist/antd.css";
import { itemRender, onShowSizeChange } from "../../paginationfunction";
import "../../antdstyle.css";
import { useForm } from "react-hook-form";
import Select from "react-select";
import { placeholderImg } from "../../../Entryfile/imagepath";
import { HashLink } from "react-router-hash-link";
import axios from "axios";
import swal from "sweetalert";
import Api from "../../../initialpage/hooks/Api";
const EmployeeChildren = () => {
  const [eduInsertOutput, setEduInsertOutput] = useState("");
  const [certificateFilePath, setCertificateFilePath] = useState(null);
  const [childFilePath, setChildFilePath] = useState(null);
  const [childBirthDate, setChildBirthDate] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [data, setData] = useState([]);
  const [employeeData, setEmployeeData] = useState([]);
  const [employeeNameCategory, setEmployeeNameCategory] = useState();
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadUpdate, setLoadUpdate] = useState(false);

  const uploadCertificateImage = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();

    formData.append("image", file);

    axios({
      method: "post",
      url: `http://${Api}/addChildImages`,
      data: formData,
      headers: { Authorization: "Bearer ..." },
    }).then((data) => {
      setCertificateFilePath(data.data);
    });
  };
  const uploadChildImage = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();

    formData.append("image", file);

    axios({
      method: "post",
      url: `http://${Api}/addChildImages`,
      data: formData,
      headers: { Authorization: "Bearer ..." },
    }).then((data) => {
      setChildFilePath(data.data);
    });
  };

  const onSubmit = (data1) => {
    if (childFilePath) {
      data1.CHILD_PHOTO_PATH = childFilePath;
    } else {
      data1.child_image = "";
    }
    if (certificateFilePath) {
      data1.CERTIFICATE_PATH = certificateFilePath;
    } else {
      data1.CERTIFICATE_PATH = "";
    }
    data1.date_birth = `${data1.date_birth}T00: 00: 00Z`;

    axios({
      method: "post",
      url: "/ords/hrm/emp_chi/crud",
      data: {
        EMPLOYE_ID: employeeNameCategory,
        CHILD_NAME: data1.child_name,
        GENDER: data1.gender,
        DATE_BIRTH: data1.date_birth,
        SCHOOL: data1.school,
        CHILD_CLASS: data1.child_class,
        CERTIFICATE_PATH: data1.CERTIFICATE_PATH,
        CHILD_PHOTO_FILE: null,
        CHILD_PHOTO_PATH: data1.CHILD_PHOTO_PATH,
        CHILD_CERTIFICATE_FILE: null,
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

        window.$("#add_children").modal("hide");
      }
    });
  };

  useEffect(() => {
    const getUsers = () => {
      setIsLoading(true);
      fetch(`/ords/hrm/emp_chi/crud?limit=10000`)
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
  }, [loadUpdate]);

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
          },
          (err) => {
            const mute = err;
            setHasError(true);
          }
        );
    };
    getUsers();
  }, []);

  const handleEmployeeNameCategory = (selectedOption) => {
    setEmployeeNameCategory(selectedOption.value);
  };

  let categoryOptions = employeeData.map((data) => {
    let optionsItem = {};
    optionsItem.value = data.employe_id;
    optionsItem.label = `${data.name_english} (${data.employe_registration_number})`;
    return optionsItem;
  });

  const columns = [
    {
      title: "Name",
      dataIndex: "child_name",
      render: (text, record) => (
        <h2 className="table-avatar">
          <Link to={`employeeprofile/${record.employe_id}`}>
            {" "}
            {record.child_photo_path ? (
              <div>
                <img
                  className="avatar"
                  src={`http://${Api}/static${record.child_photo_path}`}
                />
              </div>
            ) : (
              <div>
                <img className="avatar" src={placeholderImg} />
              </div>
            )}
          </Link>
          <Link to={`employeeprofile/${record.employe_id}`}>
            {text} <span>{record.designation}</span>
          </Link>
        </h2>
      ),
    },
    {
      title: "Gender",
      dataIndex: "gender",
    },

    {
      title: "Birth Date",
      dataIndex: "date_birth",
    },

    {
      title: "Institute",
      dataIndex: "school",
    },
    {
      title: "Class",
      dataIndex: "child_class",
    },
    {
      title: "Certificate",
      dataIndex: "certificate_path",
    },

    {
      title: "Action",
      render: (text, record) => (
        <Link to={`/allemployees/employeeprofile/${record.employe_id}`}>
          <HashLink
            to={`/allemployees/employeeprofile/${record.employe_id}#childrenHash`}
          >
            {" "}
            <a href="#" className="action-icon" aria-expanded="false">
              <i className="material-icons">more_vert</i>
            </a>
          </HashLink>
        </Link>
      ),
    },
  ];
  return (
    <div className="page-wrapper">
      {isLoading &&
        <div className="spinner-border text-info spiner-margin" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      }
      {!isLoading &&
        < div className="mt-5">
          <Helmet>
            <title>Child - HR</title>
            <meta name="description" content="Login page" />
          </Helmet>
          {/* Page Content */}
          <div className="content container-fluid">
            {/* Page Header */}
            <div className="page-header">
              <div className="row align-items-center">
                <div className="col">
                  <h3 className="page-title">Child List</h3>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/app/main/dashboard">Dashboard</Link>
                    </li>
                    <li className="breadcrumb-item active">Child</li>
                  </ul>
                </div>
                <div className="col-auto float-right ml-auto">
                  <a
                    href="#"
                    className="btn add-btn"
                    data-toggle="modal"
                    data-target="#add_children"
                  >
                    <i className="fa fa-plus" /> Add Child
                  </a>
                </div>
              </div>
            </div>
            {/* /Page Header */}

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

          <div id="add_children" className="modal custom-modal fade" role="dialog">
            <div
              className="modal-dialog modal-lg modal-dialog-centered"
              role="document"
            >
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Add Child</h5>
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
                        options={categoryOptions}
                        onChange={handleEmployeeNameCategory}
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="exampleFormControlInput44"
                        className="form-label small fw-bold"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleFormControlInput44"
                        placeholder="Name"
                        {...register("child_name", { required: true })}
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="exampleFormControlInput45"
                        className="form-label small fw-bold"
                      >
                        Date of birth
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        id="exampleFormControlInput45"
                        {...register("date_birth")}
                      />

                      {/* <DateTimePicker
                      format={`dd/MM/yyyy 00:00`}
                      className="w-100"
                      onChange={setChildBirthDate}
                      value={childBirthDate}
                    /> */}
                    </div>

                    <div className="mb-3">
                      <label
                        htmlFor="inputGroupSelect46"
                        className="form-label small fw-bold"
                      >
                        Gender
                      </label>
                      <select
                        className="form-select"
                        id="inputGroupSelect46"
                        {...register("gender")}
                      >
                        <option value="">Please Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Others">Others</option>
                      </select>
                    </div>

                    <div className="mb-3">
                      <label
                        htmlFor="exampleFormControlInput47"
                        className="form-label small fw-bold"
                      >
                        Institute
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleFormControlInput47"
                        placeholder="Institute"
                        {...register("school")}
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="exampleFormControlInput48"
                        className="form-label small fw-bold"
                      >
                        Class
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleFormControlInput48"
                        placeholder="Class"
                        {...register("child_class")}
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="exampleFormControlInput49"
                        className="form-label small fw-bold"
                      >
                        Certificate
                      </label>
                      <input
                        onChange={(e) => {
                          uploadCertificateImage(e);
                        }}
                        type="file"
                        id="files"
                        className="ms-2 "
                        name="picture"
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="exampleFormControlInput50"
                        className="form-label small fw-bold"
                      >
                        Photo
                      </label>

                      <input
                        onChange={(e) => {
                          uploadChildImage(e);
                        }}
                        type="file"
                        id="files"
                        className="ms-2"
                        name="picture"
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
      }
    </div >
  );
};

export default EmployeeChildren;
