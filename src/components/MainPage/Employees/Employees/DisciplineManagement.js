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
import axios from "axios";
import DateTimePicker from "react-datetime-picker";
import { HashLink } from "react-router-hash-link";
import swal from "sweetalert";
import Api from "../../../initialpage/hooks/Api";

const DisciplineManagement = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [value, onChange] = useState(new Date());
  const [releaseDate, setReleaseDate] = useState(new Date());
  const [punishementMemoPath, setPunishementMemoPath] = useState("");
  const [releaseMemoPath, setReleaseMemoPath] = useState("");
  const [loadUpdate, setLoadUpdate] = useState(false);

  const [closeModal, setCloseModal] = useState(false);

  function handleCloseModal(getModalId) {
    document.getElementById(getModalId).classList.remove("show", "d-block");
    document
      .querySelectorAll(".modal-backdrop")
      .forEach((el) => el.classList.remove("modal-backdrop"));
  }

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
      setPunishementMemoPath(data.data);
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
      setReleaseMemoPath(data.data);
    });
  };

  const onSubmit = (data1) => {
    const employeeId = employeeNameCategory;
    const punishmentId = parseInt(data1.punishment_id);
    data1.punishment_id = punishmentId;
    data1.employe_id = employeeId;

    data1.file_punishement_memo = baseImage1;
    data1.file_release_memo = baseImage2;
    // const date = value.toISOString();
    // const getReleaseDate = releaseDate.toISOString();
    if (data1.release_memo_date) {
      data1.release_memo_date = `${data1.release_memo_date}T00:00:00Z`;
    }
    if (data1.punishement_memo_date) {
      data1.punishement_memo_date = `${data1.punishement_memo_date}T00:00:00Z`;
    }

    // data1.punishement_memo_date = value.toISOString();
    // data1.release_memo_date = releaseDate.toISOString();



    // POST DISCIPLINE API

    axios({
      method: "post",
      url: "/ords/hrm/emp_dis/crud",
      data: {
        EMPLOYE_ID: data1.employe_id,
        NAME_PUNISHEMENT: data1.name_punishement,
        PUNISHEMENT_MEMO_DATE: data1.punishement_memo_date,
        PUNISHEMENT_MEMO_N: data1.punishement_memo_n,
        PUNISHEMENT_MEMO_PATH: punishementMemoPath,
        RELEASE_MEMO_PATH: releaseMemoPath,
        RELEASE_MEMO_N: data1.release_memo_n,
        RELEASE_MEMO_DATE: data1.release_memo_date,
        // FILE_RELEASE_MEMO: data1.file_release_memo,
        OFFENCE_DESCRIPTION: data1.offence_description,
        PUNISHMENT_ID: data1.punishment_id,
        APPEAL: data1.appeal,
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

        window.$("#add_leave").modal("hide");
      }
    });
  };

  const [employeeData, setEmployeeData] = useState([]);

  const [data, setData] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const [punishmentTypeCategory, setPunishmentTypeCategory] = useState();
  const [punishmentType, setPunishmentType] = useState([]);
  const [employeeNameCategory, setEmployeeNameCategory] = useState();
  const [baseImage1, setBaseImage1] = useState();
  const [baseImage2, setBaseImage2] = useState();
  const [click, setClick] = useState(false);

  const handleClick = (e) => {
    setClick(e.target.checked);
  };
  const handleEmployeeNameCategory = (selectedOption) => {
    setEmployeeNameCategory(selectedOption.value);
  };

  let categoryOptions = employeeData.map((data) => {
    let optionsItem = {};
    optionsItem.value = data.employe_id;
    optionsItem.label = `${data.name_english} (${data.employe_registration_number})`;
    return optionsItem;
  });

  // GET PUNISHMENT_TYPE DATA
  useEffect(() => {
    const getUsers = () => {
      setIsLoading(true);
      fetch(`/ords/hrm/pun_typ/crud`)
        .then((res) => {
          // You have to send it, as I have done below
          if (res.status >= 400) {
            throw new Error("Server responds with error!");
          }
          return res.json();
        })
        .then(
          (users) => {
            setPunishmentType(users.items);
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

  const [searchDiscipline, setSearchDiscipline] = useState("");
  // GET DISCIPLINE  DATA

  useEffect(() => {
    const getUsers = () => {
      setIsLoading(true);
      fetch(
        `/ords/hrm/emp_dis/v_emp_dis?q={"name_english":{"$like":"%25${searchDiscipline.toLocaleUpperCase()}%25"},"$orderby":{"employee_discipline_id":"desc"}}`
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
  }, [searchDiscipline, loadUpdate]);

  // GET EMPLOYEE DATA... SHOW NAME
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
      title: "Discipline ID",
      dataIndex: "employee_discipline_id",
    },
    {
      title: "Employee Name",
      dataIndex: "name_english",
    },

    {
      title: "Offence Description",
      dataIndex: "offence_description",
    },
    {
      title: "Punishment Name",
      dataIndex: "name_punishement",
    },

    {
      title: "Punishment Memo Date",
      dataIndex: "punishement_memo_date",
    },
    {
      title: "Punishment Memo N",
      dataIndex: "punishement_memo_n",
    },
    {
      title: "Appeal",
      dataIndex: "appeal",
    },
    {
      title: "Release Memo N",
      dataIndex: "release_memo_n",
    },
    {
      title: "Release Memo Date",
      dataIndex: "release_memo_date",
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
                to={`/allemployees/employeeprofile/${record.employe_id}#disciplineHash`}
              >
                {" "}
                <a className="dropdown-item" href="#">
                  <i className="fa fa-pencil m-r-5" /> Edit
                </a>
              </HashLink>
            </Link>
            <a
              className="dropdown-item"
              href="#"
              data-toggle="modal"
              onClick={() => {
                deleteButtonHandler(record.employee_discipline_id);
              }}
            >
              <i className="fa fa-trash-o m-r-5" /> Delete
            </a>
          </div>
        </div>
      ),
    },
  ];

  const deleteButtonHandler = (disciplineId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const url = `/ords/hrm/emp_dis/crud`;
        fetch(url, {
          method: "DELETE",
          headers: {
            EMPLOYEE_DISCIPLINE_ID: disciplineId,
          },
        }).then((item) => {
          const remainingUsers = data.filter(
            (user) => user.employee_discipline_id !== disciplineId
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
          <title>Disciplines - HR</title>
          <meta name="description" content="Login page" />
        </Helmet>
        {/* Page Content */}
        <div className="content container-fluid">
          {/* Page Header */}
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col">
                <h3 className="page-title">Disciplines</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/app/main/dashboard">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">Discipline</li>
                </ul>
              </div>
              <div className="col-auto float-right ml-auto">
                <a
                  href="#"
                  className="btn add-btn bgColor"
                  data-toggle="modal"
                  data-target="#add_leave"
                >
                  <i className="fa fa-plus" /> Add new discipline
                </a>
              </div>
            </div>
          </div>

          {/* Search Filter */}
          <div className="row  mb-4 ps-2">
            <input
              onChange={(e) => {
                setSearchDiscipline(e.target.value);
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
                  onChange={console.log("chnage")}
                />
              </div>
            </div>
          </div>
        </div>
        {/* /Page Content */}
        {/* Add Discipline Modal */}

        <div
          id="add_leave"
          className="modal bs-example-modal-lg"
          role="dialog"
          aria-labelledby="myLargeModalLabel"
          aria-hidden="true"
          style={{ display: "none", overflowY: "auto" }}
        >
          <div
            className="modal-dialog modal-dialog-centered modal-lg"
            role="document"
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add new discipline</h5>
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

                      <div className="mb-2 mt-3">
                        <h5>Punishment</h5>
                        <hr />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput14"
                          className="form-label fw-bold small"
                        >
                          Name Of Punishment
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="exampleFormControlInput14"
                          placeholder="Name Of Punishment"
                          {...register("name_punishement")}
                        />
                      </div>

                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput14"
                          className="form-label fw-bold small"
                        >
                          Punishment Memo No
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="exampleFormControlInput14"
                          placeholder="Enter Punishment Memo No"
                          {...register("punishement_memo_n")}
                        />
                      </div>

                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput50"
                          className="form-label fw-bold small me-2"
                        >
                          Punishment Memo Scan
                        </label>
                        {/* <input type="file" className="form-control" id="exampleFormControlInput51" {...register("punishement_memo_file")} /> */}
                        <input
                          onChange={(e) => {
                            uploadImage1(e);
                          }}
                          type="file"
                          name="picture"
                        />
                      </div>

                      <div className="form-check ps-1 pt-5 mt-5">
                        <label
                          className="form-check-label  fw-bold"
                          htmlFor="flexCheckDefault"
                        >
                          Release From Charge
                        </label>
                        <input
                          className="form-check-input ms-5"
                          type="checkbox"
                          id="flexCheckDefault"
                          onChange={handleClick}
                        />
                      </div>

                      {/* radio click  */}

                      {click ? (
                        <div>
                          <div className="mb-3">
                            <label
                              htmlFor="exampleFormControlInput14"
                              className="form-label fw-bold small"
                            >
                              Memo No
                            </label>

                            <input
                              type="text"
                              className="form-control"
                              id="exampleFormControlInput14"
                              placeholder="Enter Memo No"
                              {...register("release_memo_n")}
                            />
                          </div>

                          <div className="mb-3">
                            <label
                              htmlFor="exampleFormControlInput17"
                              className="form-label fw-bold"
                            >
                              Memo Date
                            </label>
                            <input type="date"
                              placeholder="dd-mm-yyyy"
                              className="form-control"
                              id="exampleFormControlInput17"
                              {...register("release_memo_date")}
                            />
                            {/* <DateTimePicker
                              format={`dd/MM/yyyy 00:00`}
                              className="w-100"
                              onChange={setReleaseDate}
                              value={releaseDate}
                            /> */}
                          </div>

                          <div className="mb-3">
                            <label
                              htmlFor="exampleFormControlInput50"
                              className="form-label fw-bold me-2"
                            >
                              Memo Scan
                            </label>

                            <input
                              onChange={(e) => {
                                uploadImage2(e);
                              }}
                              type="file"
                              name="picture"
                            />
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="mb-3">
                            <label
                              htmlFor="exampleFormControlInput14"
                              className="form-label fw-bold small"
                            >
                              Memo No
                            </label>

                            <input
                              type="text"
                              className="form-control"
                              id="exampleFormControlInput14"
                              placeholder="Enter Memo No"
                              disabled
                            />
                          </div>

                          <div className="mb-3">
                            <label
                              htmlFor="exampleFormControlInput17"
                              className="form-label fw-bold"
                            >
                              Memo Date
                            </label>
                            <input type="date"
                              placeholder="dd-mm-yyyy"
                              className="form-control"
                              id="exampleFormControlInput17"
                              {...register("release_memo_date")}
                              disabled
                            />
                            {/* <DateTimePicker
                              format={`dd/MM/yyyy 00:00`}
                              className="w-100"
                              onChange={onChange}
                              value={value}
                              disabled
                            /> */}
                          </div>

                          <div className="mb-3">
                            <label
                              htmlFor="exampleFormControlInput50"
                              className="form-label fw-bold"
                            >
                              Memo Scan
                            </label>
                            <input
                              type="file"
                              className="form-control"
                              id="exampleFormControlInput51"
                              disabled
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="col-sm-6">
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput14"
                          className="form-label fw-bold small"
                        >
                          Description Of Offence
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="exampleFormControlInput14"
                          placeholder="Description Of Offence"
                          {...register("offence_description")}
                        />
                      </div>

                      <div className="mb-3 mt-5 pt-3">
                        <label
                          htmlFor="inputGroupSelect12"
                          className="form-label fw-bold small"
                        >
                          Type Of Punishment
                        </label>

                        <select
                          className="form-select"
                          id="inputGroupSelect12"
                          {...register("punishment_id")}
                        >
                          <option value="">Please Select</option>
                          {punishmentType.map((data) => (
                            <option value={data.punishment_id}>
                              {data.punishment_type}
                            </option>
                          ))}
                          ;
                        </select>
                      </div>

                      <div className="mb-3 ">
                        <label
                          htmlFor="exampleFormControlInput17"
                          className="form-label fw-bold"
                        >
                          Punishment Memo Date
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          id="exampleFormControlInput17"
                          {...register("punishement_memo_date")}
                        />
                        {/* <DateTimePicker
                          format={`dd/MM/yyyy 00:00`}
                          className="w-100"
                          onChange={onChange}
                          value={value}
                        /> */}
                        {/* <input type="date" className="form-control" id="exampleFormControlInput17" {...register("punishement_memo_date")} /> */}
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlTextarea1"
                          className="form-label fw-bold small"
                        >
                          Appeal
                        </label>
                        <textarea
                          className="form-control"
                          id="exampleFormControlTextarea1"
                          rows="5"
                          placeholder="Enter Appeal"
                          {...register("appeal")}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="submit"
                      className="btn bgColor text-white px-5 py-2 rounded"
                      id=""
                    >
                      <i className="fa fa-plus" /> Add
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

export default DisciplineManagement;
