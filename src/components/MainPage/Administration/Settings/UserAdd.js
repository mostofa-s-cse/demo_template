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
import swal from "sweetalert";
import Api from "../../../initialpage/hooks/Api";

const UserAdd = () => {
  const [data, setData] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
  const {
    register: register3,
    reset: reset3,
    formState: { errors: errors3 },
    handleSubmit: handleSubmit3,
  } = useForm();

  // POST METHOD

  const onSubmitPost = (data1) => {
    data1.date_creation = new Date().toISOString();
    data1.employe_id = employeeNameCategory;
    data1.role_id = roleCategory;
    data1.blocked = 0;
    data1.enable = 1;
    data1.token = 11;
    axios({
      method: "post",
      url: "/ords/hrm/use/crud",
      data: {
        USER_ID: data1.user_id,
        ROLE_ID: data1.role_id,
        DATE_CREATION: data1.date_creation,
        ENABLE: data1.enable,
        BLOCKED: data1.blocked,
        TOKEN: data1.token,
        EMPLOYE_ID: data1.employe_id,
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

        window.$("#add_user").modal("hide");
      }
    });
  };

  // PUT METHOD
  const handleRolesUpdateCategory = (selectedOption) => {
    setRoleUpdateCategory(selectedOption.value);
  };
  const [roleUpdateCategory, setRoleUpdateCategory] = useState();

  const [getId, setGetId] = useState(null);
  const [getData, setGetData] = useState([]);

  const onSubmitUpdate = (data1) => {
    if (roleUpdateCategory) {
      data1.role_id = roleUpdateCategory;
    } else {
      data1.role_id = getData.role_id;
    }



    // PUT METHOD
    axios({
      method: "put",

      headers: {
        USER_ID: getId,
      },
      url: `/ords/hrm/use/crud`,
      data: {
        USER_ID: getData.user_id,
        ROLE_ID: data1.role_id,
        DATE_CREATION: getData.date_creation,
        PASSWORD: getData.password,
        BLOCKED: getData.blocked,
        ENABLE: getData.enable,
        EMPLOYE_ID: getData.employe_id,
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
        reset1();

        window.$("#edit_user").modal("hide");
      }
    });
  };

  const handleUpdate = (updateId) => {
    //
    setGetId(updateId);
  };

  //----------------------------------- change Password section

  const onSubmitPasswordUpdate = (passData) => {
    let matchedPass = "";
    if (passData.new_password === passData.confirm_new_password) {
      matchedPass = passData.confirm_new_password;
    } else {
      alert("Please make sure both passwords are matched");
    }
    if (matchedPass) {
      const info = { user: getId, password: matchedPass };
      axios
        .put(`http://${Api}/app/auth/user/admin`, info)

        .then((data) => {
          if (data.data === 200) {
            swal({
              title: "Good job!",
              text: "Successfully Updated",
              icon: "success",
              button: "Ok",
            });
          }
        })
        .catch((error) => {
          setHasError(error);
        });
    }
    reset3();
  };

  //

  // GET USER DATA
  useEffect(() => {
    const getUsers = () => {
      setIsLoading(true);
      fetch(`/ords/hrm/use/${getId}`)
        .then((res) => {
          // You have to send it, as I have done below
          if (res.status >= 400) {
            throw new Error("Server responds with error!");
          }
          return res.json();
        })
        .then(
          (users) => {
            setGetData(users);
            setIsLoading(false);
          },

          (err) => {
            const mute = err;
            setHasError(true);
            setIsLoading(true);
          }
        );
    };
    if (getId) { getUsers(); }
  }, [getId]);

  // Delete User  METHOD
  const deleteButtonHandler = (userId) => {
    //
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const url = `/ords/hrm/use/crud`;
        fetch(url, {
          method: "DELETE",
          headers: {
            USER_ID: userId,
          },
        }).then((item) => {
          const remainingUsers = data.filter((user) => user.user_id !== userId);
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

  const [searchUser, setSearchUser] = useState("");

  // GET USER DATA
  useEffect(() => {
    const getUsers = () => {
      setIsLoading(true);
      fetch(`/ords/hrm/use/v_use?limit=10000`)
        .then((res) => {
          // You have to send it, as I have done below
          if (res.status >= 400) {
            throw new Error("Server responds with error!");
          }
          return res.json();
        })
        .then(
          (users) => {
            let usersData = users.items;
            const searchUserData = usersData.filter((user) => {
              let userSearchData = user.user_id;
              let empName = user.name_english;
              let userRoll = user.role;
              if (searchUser === "") {
                return user;
              } else if (
                userSearchData
                  .toLowerCase()
                  .includes(searchUser.toLocaleLowerCase()) ||
                empName
                  .toLowerCase()
                  .includes(searchUser.toLocaleLowerCase()) ||
                userRoll
                  .toLowerCase()
                  .includes(searchUser.toLocaleLowerCase()) ||
                ""
              ) {
                return user;
              }
            });
            setData(searchUserData);
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
  }, [searchUser, loadUpdate]);

  const handleDeclined = (id) => {


    axios({
      method: "put",

      headers: {
        user_id: `${id}`,
      },
      url: `/ords/hrm/use/enable_user`,
      data: {
        ENABLE: 0,
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
      }
    });
  };

  const handleApproved = (id) => {


    axios({
      method: "put",

      headers: {
        user_id: `${id}`,
      },
      url: `/ords/hrm/use/enable_user`,
      data: {
        ENABLE: 1,
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

  const columns = [
    {
      title: "User Name",
      dataIndex: "user_id",
    },
    {
      title: "Employee Name",
      dataIndex: "name_english",
    },

    {
      title: "Role",
      dataIndex: "role",
    },
    {
      title: "Creation Date",
      dataIndex: "date_creation",
    },

    {
      title: "Enable",
      dataIndex: "enable",
      render: (text, record) => (
        <div className="dropdown action-label text-center">
          <a
            className="btn btn-white btn-sm btn-rounded dropdown-toggle"
            href="#"
            data-toggle="dropdown"
            aria-expanded="false"
          >
            <i
              className={
                text === 1
                  ? "fa fa-dot-circle-o text-success"
                  : text === 0
                    ? "fa fa-dot-circle-o  text-danger"
                    : "fa fa-dot-circle-o text-danger"
              }
            />{" "}
            {text === 1 ? (text = "Enable") : "Disabled"}
          </a>
          <div className="dropdown-menu dropdown-menu-right">
            <a
              className="dropdown-item"
              href="#"
              onClick={() => {
                handleApproved(record.user_id);
              }}
            >
              <i className="fa fa-dot-circle-o text-success" /> Enable
            </a>
            <a
              className="dropdown-item"
              href="#"
              onClick={() => {
                handleDeclined(record.user_id);
              }}
            >
              <i className="fa fa-dot-circle-o text-danger" /> Disabled
            </a>
          </div>
        </div>
      ),
    },
    {
      title: "Action",
      render: (text, record) => (
        <div className="dropdown dropdown-action text-right">
          <a
            href="#"
            onClick={() => {
              handleUpdate(record.user_id);
            }}
            className="action-icon dropdown-toggle"
            data-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="material-icons">more_vert</i>
          </a>
          <div className="dropdown-menu dropdown-menu-right">
            <a
              className="dropdown-item"
              href="#"
              data-toggle="modal"
              data-target="#edit_user"
            >
              <i className="fa fa-pencil m-r-5" /> Edit
            </a>
            <a
              className="dropdown-item"
              href="#"
              data-toggle="modal"
              data-target="#user_change_password"
            >
              <i className="fa fa-pencil m-r-5" /> Change Password
            </a>
            <a
              className="dropdown-item"
              href="#"
              onClick={() => {
                deleteButtonHandler(record.user_id);
              }}
            >
              <i className="fa fa-trash-o m-r-5" /> Delete
            </a>
          </div>
        </div>
      ),
    },
  ];

  // Select Employee search using Name
  const [employeeNameCategory, setEmployeeNameCategory] = useState();
  const [employeeData, setEmployeeData] = useState([]);

  const handleEmployeeNameCategory = (selectedOption) => {
    setEmployeeNameCategory(selectedOption.value);
  };

  let categoryOptions = employeeData.map((data) => {
    let optionsItem = {};
    optionsItem.value = data.employe_id;
    optionsItem.label = `${data.name_english} (${data.employe_registration_number})`;
    return optionsItem;
  });

  // GET EMPLOYEE DATA
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

  // Roles Category

  const [roleData, setRoleData] = useState([]);
  const [roleCategory, setRoleCategory] = useState();

  const handleRolesCategory = (selectedOption) => {
    setRoleCategory(selectedOption.value);
  };

  let categoryOptions1 = roleData.map((data) => {
    let optionsItem = {};
    optionsItem.value = data.role_id;
    optionsItem.label = data.role;
    return optionsItem;
  });

  // GET Role Data
  useEffect(() => {
    const getUsers = () => {
      fetch("/ords/hrm/ass_pre/crud")
        .then((res) => {
          if (res.status >= 400) {
            throw new Error("Server responds with error!");
          }
          return res.json();
        })
        .then(
          (data) => {
            setRoleData(data.items);
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

  return (
    <div>
      <div className="page-wrapper">
        <Helmet>
          <title>Users - HR</title>
          <meta name="description" content="Login page" />
        </Helmet>
        {/* Page Content */}
        <div className="content container-fluid">
          {/* Page Header */}
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col">
                <h3 className="page-title">Users</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/app/main/dashboard">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">Users</li>
                </ul>
              </div>
              <div className="col-auto float-right ml-auto">
                <a
                  href="#"
                  className="btn bgColor text-white add-btn"
                  data-toggle="modal"
                  data-target="#add_user"
                >
                  <i className="fa fa-plus" /> Add User
                </a>
              </div>
            </div>
          </div>
          {/* /Page Header */}

          {/* Search Filter */}
          <div className="row  mb-4 ps-2">
            <input
              onChange={(e) => {
                setSearchUser(e.target.value);
              }}
              className="form-control w-25 shadow py-4"
              type="text"
              placeholder="Search User Name"
            />
          </div>
          {/* /Search Filter */}
          <div className="row">
            <div className="col-md-12">
              <div className="table-responsive ">
                <Table
                  className="table-striped "
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
        {/* Add User Modal */}

        <div id="add_user" className="modal custom-modal fade" role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add User</h5>
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
                <form onSubmit={handleSubmit(onSubmitPost)}>
                  <div className="row">
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
                      <input
                        tabIndex={-1}
                        autoComplete="off"
                        style={{ opacity: 0, height: 0 }}
                        value={employeeNameCategory}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="exampleFormControlInput14"
                        className="form-label fw-bold small"
                      >
                        UserName
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleFormControlInput14"
                        placeholder="username"
                        {...register("user_id")}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label
                        htmlFor="inputGroupSelect12"
                        className="form-label fw-bold small"
                      >
                        Roles
                      </label>

                      <Select
                        options={categoryOptions1}
                        onChange={handleRolesCategory}
                      />
                      <input
                        tabIndex={-1}
                        autoComplete="off"
                        style={{ opacity: 0, height: 0 }}
                        value={roleCategory}
                        required
                      />
                    </div>
                  </div>

                  <div className="submit-section">
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

        {/* Edit User Add Modal */}

        <div id="edit_user" className="modal custom-modal fade" role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit User</h5>
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
                <form onSubmit={handleSubmit1(onSubmitUpdate)}>
                  <div className="row">
                    <div className="mb-3">
                      <label
                        htmlFor="inputGroupSelect12"
                        className="form-label fw-bold small"
                      >
                        Roles
                      </label>

                      <Select
                        options={categoryOptions1}
                        onChange={handleRolesUpdateCategory}
                      />
                    </div>
                  </div>

                  <div className="submit-section">
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

        {/* User Password change Modal */}

        <div
          id="user_change_password"
          className="modal custom-modal fade"
          role="dialog"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Change Password</h5>
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
                <form onSubmit={handleSubmit3(onSubmitPasswordUpdate)}>
                  <div className="row">
                    <div className="mb-3">
                      <label
                        htmlFor="inputGroupSelect21"
                        className="form-label fw-bold small"
                      >
                        New Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="exampleFormControlInput21"
                        placeholder="New Password"
                        {...register3("new_password")}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="inputGroupSelect22"
                        className="form-label fw-bold small"
                      >
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="exampleFormControlInput22"
                        placeholder="Confirm New Password"
                        {...register3("confirm_new_password")}
                        required
                      />
                    </div>
                  </div>

                  <div className="submit-section">
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

export default UserAdd;
