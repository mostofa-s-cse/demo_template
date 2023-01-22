import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { placeholderImg } from "../../../Entryfile/imagepath";
import "font-awesome/css/font-awesome.min.css";
import "../../../assets/css/font-awesome.min.css";
import "../../../assets/css/line-awesome.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../../assets/css/bootstrap.min.css";
import "../../../assets/css/select2.min.css";
import "../../../assets/js/app";
import "../../../assets/plugins/bootstrap-tagsinput/bootstrap-tagsinput.css";
import "../../../assets/css/bootstrap-datetimepicker.min.css";
import "../../../assets/css/style.css";
import axios from "axios";
import swal from "sweetalert";
import Api from "../../../initialpage/hooks/Api";

const AllEmployees = () => {
  const [allEmployeeData, setAllEmployeeData] = useState([]);
  const [statusType, setStatusType] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [page, setPage] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [searchEmpName, setSearchEmpName] = useState("");
  const [loadUpdate, setLoadUpdate] = useState(false);
  const searchNameSe = sessionStorage.getItem("search_name") || "";
  const getSearchAll = sessionStorage.getItem("search_All") || "";

  const handleStatusType = (e) => {
    // e.preventDefault();
    let enable = parseInt(e.target.value);
    if (enable === 1) {
      setStatusType(true);
    }
    if (enable === 0) {
      setStatusType(false);
    }


  };

  const handlePagePre = () => {
    if (page > 23) {
      setPageNumber(pageNumber - 1);
      setPage(page - 24);

    }
  };
  const handlePageNext = () => {

    if (!searchNameSe) {
      setPageNumber(pageNumber + 1);
      setPage(page + 24);
    }
  };

  // SEARCH API
  const searchEmpNameHandler = (e) => {
    sessionStorage.setItem("search_All", "");
    setSearchEmpAll("");
    const getEmpSeName = e.target.value;
    const empSeName = getEmpSeName.replace(/[^\w ]/g, "");
    setSearchEmpName(empSeName);
    if (e.target.value) {
      setPage(0);
      setPageNumber(1);
    }
    sessionStorage.setItem("search_name", empSeName);
  };
  // -------------------------------------------All search
  const [searchEmpAll, setSearchEmpAll] = useState("");
  const searchEmpAllHandler = (e) => {
    sessionStorage.setItem("search_name", "");
    setSearchEmpName("");
    const getEmpSeAll = e.target.value;
    const empSeAll = getEmpSeAll.replace(/[^\w ]/g, "");
    setSearchEmpAll(empSeAll);
    if (e.target.value) {
      setPage(0);
      setPageNumber(1);
    }
    sessionStorage.setItem("search_All", empSeAll);
  };
  if (!searchEmpName && searchNameSe) {
    setSearchEmpName(searchNameSe);
    // searchEmpName = searchNameSe;
  }
  if (!searchEmpAll && getSearchAll) {
    setSearchEmpAll(getSearchAll);
    // searchEmpName = searchNameSe;
  }

  const handleEnable = (id, name) => {


    swal({
      title: "Are you sure?",
      text: "",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios({
          method: "put",

          headers: {
            EMPLOYE_ID: id,
          },
          url: `/ords/hrm/employees/upd_emp_active_status`,
          data: {
            ACTIVE: 1,
          },
        });
        swal(` ${name} is Enable Now`, {
          icon: "success",
        });
        setLoadUpdate(true);
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  };

  const handleDisable = (id, name) => {

    swal({
      title: "Are you sure?",
      text: "",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios({
          method: "put",

          headers: {
            EMPLOYE_ID: id,
          },
          url: `/ords/hrm/employees/upd_emp_active_status`,
          data: {
            ACTIVE: 0,
          },
        });
        swal(` ${name} is Disable Now`, {
          icon: "success",
        });
        setLoadUpdate(true);
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  };

  useEffect(() => {
    const getUsers = () => {
      setAllEmployeeData("");
      setIsLoading(true);
      const url = `/ords/hrm/employees/search_by_name?offset=${page}`;
      fetch(url, {
        method: "GET",
        headers: {
          search: `${searchEmpName}%`,
        },
      })
        .then((res) => {
          // You have to send it, as I have done below
          if (res.status >= 400) {
            throw new Error("Server responds with error!");
          }
          return res.json();
        })
        .then(
          (users) => {
            if (statusType === true) {
              setAllEmployeeData(users.items);
              setLoadUpdate(false);
            }
            setIsLoading(false);
          },
          (err) => {
            const mute = err;
            setHasError(true);
            setIsLoading(true);
          }
        );
    };
    if (searchEmpName) {
      getUsers();
    } else if (!searchEmpName && !searchEmpAll) {
      getUsers();
    }
  }, [searchEmpName, page, statusType, loadUpdate]);

  useEffect(() => {
    const getUsers = () => {
      setAllEmployeeData("");
      setIsLoading(true);
      const url = ` /ords/hrm/employees/search?offset=${page}`;
      fetch(url, {
        method: "GET",
        headers: {
          search: `%${searchEmpAll}%`,
        },
      })
        .then((res) => {
          // You have to send it, as I have done below
          if (res.status >= 400) {
            throw new Error("Server responds with error!");
          }
          return res.json();
        })
        .then(
          (users) => {
            if (statusType === true) {
              setAllEmployeeData(users.items);
              setLoadUpdate(false);
            }
            setIsLoading(false);
          },
          (err) => {
            const mute = err;
            setHasError(true);
            setIsLoading(true);
          }
        );
    };
    if (searchEmpAll) {
      getUsers();
    }
  }, [searchEmpAll, page, loadUpdate]);

  //
  useEffect(() => {
    const getUsers = () => {
      const url = `/ords/hrm/employees/search_by_emp_name_inactive?offset=${page}`;
      fetch(url, {
        method: "GET",
        headers: {
          search: `%${searchEmpAll}%`,
        },
      })
        .then((res) => {
          // You have to send it, as I have done below
          if (res.status >= 400) {
            throw new Error("Server responds with error!");
          }
          return res.json();
        })
        .then(
          (users) => {
            //

            if (statusType === false) {
              setAllEmployeeData(users.items);
              setLoadUpdate(false);
            }

            // setLo)
          },
          (err) => {
            const mute = err;
            setHasError(true);
          }
        );
    };

    getUsers();
  }, [searchEmpAll, page, statusType, loadUpdate]);

  //

  return (
    <div>
      <div>
        <div className="page-wrapper">
          <Helmet>
            <title>Employee - HR</title>
            <meta name="description" content="Login page" />
          </Helmet>
          {/* Page Content */}
          {/* Page Header */}
          <div className="m-0 page-header bg-project">
            <div className="row align-items-center ps-5 pt-4">
              <div className="col text-light ps-3">
                <h3 className="page-title text-light text-start">Employees</h3>
                <ul className="text-light breadcrumb">
                  <li className="breadcrumb-item text-light">HR</li>
                  <li className="breadcrumb-item active text-light">
                    Employee
                  </li>
                </ul>
              </div>
              <div className="col-auto float-right ml-auto">
                <Link to="/allemployeesreports" className="btn add-btn ms-2">
                  <i className="fa fa-table" aria-hidden="true"></i> Reports{" "}
                </Link>
                <Link
                  to="/employeeinformationform"
                  className="btn bgColor text-white add-btn"
                >
                  <i className="fa fa-plus" /> Add Employee
                </Link>
                <div className="view-icons">
                  <Link
                    to="/allemployees"
                    className="grid-view btn btn-link active"
                  >
                    <i className="fa fa-th" />
                  </Link>
                  <Link to="/employeeslist" className="list-view btn btn-link">
                    <i className="fa fa-bars" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* /Page Header */}
          {/* Search Filter */}
          <div className="row filter-row bgColor">
            {/* Search */}
            <div className="mb-5">
              <div className="row mt-4">
                <div className="col-sm-3"></div>
                <div className="col-sm-3">
                  {statusType === true && (
                    <div className="top-nav-search">
                      <input
                        defaultValue={searchNameSe}
                        onChange={searchEmpNameHandler}
                        className="form-control text-light bg-project shadow py-4"
                        type="text"
                        placeholder="Search Name"
                      />
                      <button className="btn me-3 mt-1" type="submit">
                        <i className="fa fa-search" />
                      </button>
                    </div>
                  )}
                  {statusType === false && (
                    <div className="top-nav-search">
                      <input
                        defaultValue={searchEmpAll}
                        onChange={searchEmpAllHandler}
                        className="form-control text-light bg-project shadow py-4"
                        type="text"
                        placeholder="Search here"
                      />
                      <button className="btn me-3 mt-1" type="submit">
                        <i className="fa fa-search" />
                      </button>
                    </div>
                  )}
                </div>
                <div className="col-sm-3">
                  {statusType === true && (
                    <div className="top-nav-search">
                      <input
                        defaultValue={searchEmpAll}
                        onChange={searchEmpAllHandler}
                        className="form-control text-light bg-project shadow py-4"
                        type="text"
                        placeholder="Search here"
                      />
                      <button className="btn me-3 mt-1" type="submit">
                        <i className="fa fa-search" />
                      </button>
                    </div>
                  )}
                </div>
                <div className="col-sm-2 ">
                  <select
                    className="form-select mb-3 text-center bg-primary text-white"
                    aria-label="Default select example"
                    onChange={handleStatusType}
                  >
                    <option value="1">Select Status ⬇</option>
                    <option value="1">Enable</option>
                    <option value="0">Disable</option>
                  </select>
                </div>
              </div>
            </div>
            {/* /Search */}
            {/* <div className="col-sm-6 col-md-3">
                <button onClick={searchBtnHandler} className="btn btn-success btn-block"> Search </button>
              </div> */}
          </div>
          <div className="content container-fluid">
            {/* Search Filter */}
            {isLoading ? (
              <div className="spinner-border text-info" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              <>
                <div className="row staff-grid-row">
                  {allEmployeeData &&
                    allEmployeeData.map((item) => (
                      <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3">
                        <div className="profile-widget">
                          <Link to={`employeeprofile/${item.employe_id}`}>
                            {item.photo_path ? (
                              <div className="profile-img">
                                <img
                                  className="avatar"
                                  src={` http://${Api}/static${item.photo_path}`}
                                />
                              </div>
                            ) : (
                              <div className="profile-img">
                                <img className="avatar" src={placeholderImg} />
                              </div>
                            )}
                            <h4 className="user-name m-t-10 mb-0 p-1 text-ellipsis">
                              {item.name_english}
                            </h4>
                            <div className=" p-1">{item.designation}</div>
                            <h6 className="pt-1 text-muted">
                              {item.employe_registration_number}
                            </h6>
                          </Link>
                          <div className="dropdown profile-action">
                            <a
                              href="#"
                              className="action-icon dropdown-toggle"
                              data-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <i className="material-icons">more_vert</i>
                            </a>
                            <div className="dropdown-menu dropdown-menu-right">
                              {statusType == false && (
                                <a
                                  className="dropdown-item"
                                  href="#"
                                  onClick={() => {
                                    handleEnable(
                                      item.employe_id,
                                      item.name_english
                                    );
                                  }}
                                >
                                  <i className="fa fa-pencil m-r-5" /> Enable
                                </a>
                              )}
                              {statusType == true && (
                                <a
                                  className="dropdown-item"
                                  href="#"
                                  onClick={() => {
                                    handleDisable(
                                      item.employe_id,
                                      item.name_english
                                    );
                                  }}
                                >
                                  <i className="fa fa-pencil m-r-5" /> Disable
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  <div className="text-center mt-5 d-flex justify-content-center">
                    <nav aria-label="Page  navigation example">
                      <ul className="pagination ">
                        <li
                          onClick={() => {
                            setPage(0);
                            setPageNumber(1);
                          }}
                          className="page-item text-white me-2"
                        >
                          <a className="bgColor page-link text-white" href="#">
                            First Page
                          </a>
                        </li>
                        <li className="page-item me-2">
                          <a
                            onClick={handlePagePre}
                            className="page-link bgColor text-white"
                            href="#"
                          >
                            Previous
                          </a>
                        </li>
                        <li className="page-item bgColor text-white me-2">
                          <a className="page-link" href="#">
                            {pageNumber}
                          </a>
                        </li>
                        <li
                          onClick={handlePageNext}
                          className="page-item text-white"
                        >
                          <a className=" bgColor page-link text-white" href="#">
                            Next
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </>
            )}
          </div>
          {/* /Page Content */}
          {/* /Edit Employee Modal */}
          {/* Delete Employee Modal */}
          {/* <div className="modal custom-modal fade" id="delete_employee" role="dialog">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-body">
                  <div className="form-header">
                    <h3>Delete Employee</h3>
                    <p>Are you sure want to delete?</p>
                  </div>
                  <div className="modal-btn delete-action">
                    <div className="row">
                      <div className="col-6">
                        <a href="" className="btn btn-primary continue-btn">Delete</a>
                      </div>
                      <div className="col-6">
                        <a href="" data-dismiss="modal" className="btn btn-primary cancel-btn">Cancel</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
          {/* /Delete Employee Modal */}
        </div>
      </div>
    </div>
  );
};
export default AllEmployees;
