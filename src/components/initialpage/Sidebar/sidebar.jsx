/**
 * App Header
 */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

import "../../assets/js/app";

import { useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import baseApi from "../hooks/baseApi";

const Sidebar = (props) => {
  const logId = parseInt(Cookies.get("Role"));
  const {
    program_1,
    program_2,
    program_3,
    program_4,
    program_5,
    program_6,
    program_7,
    program_8,
    program_9,
    program_10,
    program_11,
    program_12,
    program_13,
    program_14,
    program_15,
    program_16,
    program_17,
    tipsoi_18,
    logAudit,
    eventAccess,
    employeeAccess,
    roleProgramData
  } = useAuth();
  const [userLoginData, setUserLoginData] = useState({});
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`http://${baseApi}/auth/getLoginUser`)
      .then((data) => {
        setUserLoginData(data.data.user);
      })
      .catch((error) => { })
      .finally(() => setIsLoading(false));
  }, []);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // if (userLoginData) {
  //   logId = userLoginData.user_id;
  // }

  let moduleId = parseInt(window.sessionStorage.getItem("moduleId"));
  let adSubModule = parseInt(window.sessionStorage.getItem("adSubModule"));
  const location = useLocation();
  let pathname = location.pathname;
  let secretId = userLoginData.user_id;
  const fAndACardHandle = () => {
    window.sessionStorage.clear();
  };
  // const homeBtnHandler = () => {
  //   sessionStorage.setItem("homeLoad", 1);
  // }
  // finance ip
  const [apiData, setApiData] = useState({});
  useEffect(() => {
    const getUsers = () => {
      fetch(`/ords/accounts/all_ip`)
        .then((res) => {
          if (res.status >= 400) {
            throw new Error("Server responds with error!");
          }
          return res.json();
        })
        .then(
          (data) => {
            setApiData(data.items[0].ipaddress);
            // setIsLoading(true);
          },
          (err) => {
            setHasError(true);
            // setIsLoading(true);
          }
        );
    };

    getUsers();
  }, []);

  const [notiActive, setNotiActive] = useState(false);
  const hrNotidotHandler = () => {
    // logId = userLoginData.user_id;
    setNotiActive(true);
  };
  const allEmployeeHandler = () => {
    if (pathname === "/allemployees") {
      window.location.reload();
      window.sessionStorage.removeItem("search_All");
      window.sessionStorage.removeItem("user_name");
    }
  };

  return (
    <div className="sidebar" id="sidebar">


      <div className="sidebar-inner overflow-auto">
        <div id="sidebar-menu" className={`sidebar-menu `}>
          <ul>
            <li className="menu-title">
              <a href="/administrationLandingpage">
                <h4 className="text-white text-start me-5">
                  <u>Administration</u>
                </h4>
              </a>
            </li>
            <li className={pathname.includes("/") ? "" : ""}>
              <a href="/">
                <i className="la la-home" /> <span>Home</span>
              </a>
            </li>



            <>
              {!program_1.length ?
                <li>
                  <Link
                    className={
                      pathname.includes("/employeedashboard")
                        ? ""
                        : ""
                    }
                    to="/employeedashboard"
                  >
                    <i className="la la-dashboard me-3" />{" "}
                    Dashboard
                  </Link>
                </li>

                :
                <li className={`submenu text-start`}>
                  <a href="#">
                    <i className="la la-dashboard" /> <span> Dashboard</span>{" "}
                    <span className="menu-arrow" />
                  </a>
                  <ul style={{ display: "none" }}>

                    <li>
                      <Link
                        className={
                          pathname.includes("/admindashboard") ? "" : ""
                        }
                        to="/admindashboard"
                      >
                        Admin Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={
                          pathname.includes("/employeedashboard") ? "" : ""
                        }
                        to="/employeedashboard"
                      >
                        Employee Dashboard
                      </Link>
                    </li>


                  </ul>
                </li>




              }

            </>




            <>
              <li className="submenu text-start">
                <a
                  href="#"
                  onClick={hrNotidotHandler}
                  className={
                    pathname.includes("/hr")
                      ? "active noti-dot"
                      : ""
                  }
                >
                  <i className="la la-user" /> <span> HR</span>{" "}
                  <span className="menu-arrow" />
                </a>
                <ul style={{ display: "none" }}>
                  {employeeAccess === 1 ? (
                    <li className="submenu text-start">

                      <a href="#" className={
                        pathname.includes("/")
                          ? "noti-dot"
                          : ""
                      }>
                        <i className="la la-user me-2 fs-6" />{" "}
                        <span> Employees</span>{" "}
                        <span className="menu-arrow" />
                      </a>

                      <ul style={{ display: "none" }}>

                        <li>
                          <Link
                            className={
                              pathname.includes("allemployees")
                                ? "active noti-dot"
                                : ""
                            }
                            to="/allemployees"
                          >
                            <span onClick={allEmployeeHandler}>
                              All Employees
                            </span>
                          </Link>
                        </li>


                        <li>
                          <Link
                            className={
                              pathname.includes("organogramReport")
                                ? "active noti-dot"
                                : ""
                            }
                            to="/organogramReport"
                          >
                            <span >
                              Organogram report
                            </span>
                          </Link>
                        </li>


                        <li>
                          <Link
                            className={
                              pathname.includes("education")
                                ? "active noti-dot"
                                : ""
                            }
                            to="/education"
                          >
                            Education
                          </Link>
                        </li>


                        <li>
                          <Link
                            className={
                              pathname.includes("employeechildren")
                                ? "active noti-dot"
                                : ""
                            }
                            to="/employeechildren"
                          >
                            Children
                          </Link>
                        </li>



                        <li>
                          <Link
                            className={
                              pathname.includes("promotion")
                                ? "active noti-dot"
                                : pathname.includes("employees-list")
                                  ? "active noti-dot"
                                  : ""
                            }
                            to="/promotion"
                          >
                            Promotion/ <br />
                            Charge
                          </Link>
                        </li>



                        <li>
                          <Link
                            className={
                              pathname.includes("posting")
                                ? "active noti-dot"
                                : pathname.includes("employees-list")
                                  ? "active noti-dot"
                                  : ""
                            }
                            to="/posting"
                          >
                            Posting
                          </Link>
                        </li>



                        <li>
                          <Link
                            className={
                              pathname.includes("training")
                                ? "active noti-dot"
                                : pathname.includes("employees-list")
                                  ? "active noti-dot"
                                  : ""
                            }
                            to="/training"
                          >
                            Training
                          </Link>
                        </li>


                      </ul>
                    </li>
                  ) : (
                    ""
                  )}


                  <li>
                    <Link
                      to="/loan"
                      className={
                        pathname.includes("loan") ? "active noti-dot" : ""
                      }
                    >
                      <i className="la la-landmark me-2 fs-6" />{" "}
                      <span>Loan</span>
                    </Link>
                  </li>


                  <li>
                    <Link
                      to="/leave"
                      className={
                        pathname.includes("leave") ? "active noti-dot" : ""
                      }
                    >
                      <i className="la la-sign-out-alt me-2 fs-6" />{" "}
                      <span>Leave </span>
                    </Link>
                  </li>


                  <li>
                    <Link
                      to="/health"
                      className={
                        pathname.includes("health") ? "active noti-dot" : ""
                      }
                    >
                      <i className="la la-medkit me-2 fs-6" />{" "}
                      <span>Health</span>
                    </Link>
                  </li>


                  <li>
                    <Link
                      to="/discipline"
                      className={
                        pathname.includes("discipline")
                          ? "active noti-dot"
                          : ""
                      }
                    >
                      <i className="la la-paint-roller me-2 fs-6" />{" "}
                      <span>Discipline</span>
                    </Link>
                  </li>





                  <li className="submenu text-start">
                    <a href="#">
                      <i className="la la-cog me-2 fs-6" />
                      <span> Settings </span>{" "}
                      <span className="menu-arrow" />
                    </a>

                    <ul style={{ display: "none" }}>
                      <>
                        <li>
                          <Link
                            className={
                              pathname.includes("/rolespermission")
                                ? "active noti-dot"
                                : ""
                            }
                            to="/rolespermission"
                          >
                            Roles & <br />
                            Permissions
                          </Link>
                        </li>
                        <li>
                          <Link
                            className={
                              pathname.includes("/allrole")
                                ? "active noti-dot"
                                : ""
                            }
                            to="/allrole"
                          >
                            Roles
                          </Link>
                        </li>
                        <li>
                          <Link
                            className={
                              pathname.includes("users")
                                ? "active noti-dot"
                                : ""
                            }
                            to="/usersadd"
                          >
                            Users
                          </Link>
                        </li>
                        <li>
                          <Link
                            className={
                              pathname.includes("signature")
                                ? "active noti-dot"
                                : ""
                            }
                            to="/signature"
                          >
                            Signature
                          </Link>
                        </li>
                        <li>
                          <Link
                            className={
                              pathname.includes("loantype")
                                ? "active noti-dot"
                                : ""
                            }
                            to="/loantype"
                          >
                            Loan Types
                          </Link>
                        </li>
                        <li>
                          <Link
                            className={
                              pathname.includes("documenttype")
                                ? "active noti-dot"
                                : ""
                            }
                            to="/documenttype"
                          >
                            Document <br /> type
                          </Link>
                        </li>

                        <li>
                          <Link
                            className={
                              pathname.includes("healthinfo")
                                ? "active noti-dot"
                                : ""
                            }
                            to="/healthinfo"
                          >
                            Health <br />
                            information
                          </Link>
                        </li>
                        <li>
                          <Link
                            className={
                              pathname.includes("punishment")
                                ? "active noti-dot"
                                : ""
                            }
                            to="/punishment"
                          >
                            Punishment
                          </Link>
                        </li>
                        <li>
                          <Link
                            className={
                              pathname.includes("department")
                                ? "active noti-dot"
                                : ""
                            }
                            to="/department"
                          >
                            Departments
                          </Link>
                        </li>
                        <li>
                          <Link
                            className={
                              pathname.includes("designation")
                                ? "active noti-dot"
                                : ""
                            }
                            to="/designation"
                          >
                            Designation
                          </Link>
                        </li>
                        <li>
                          <Link
                            className={
                              pathname.includes("district")
                                ? "active noti-dot"
                                : ""
                            }
                            to="/district"
                          >
                            District
                          </Link>
                        </li>
                        <li>
                          <Link
                            className={
                              pathname.includes("loanfund")
                                ? "active noti-dot"
                                : ""
                            }
                            to="/loanfund"
                          >
                            Loan Funds
                          </Link>
                        </li>
                        <li>
                          <Link
                            className={
                              pathname.includes("leavetype")
                                ? "active noti-dot"
                                : ""
                            }
                            to="/leavetype"
                          >
                            Leave Types
                          </Link>
                        </li>
                        <li>
                          <Link
                            className={
                              pathname.includes("grade")
                                ? "active noti-dot"
                                : ""
                            }
                            to="/grade"
                          >
                            Grades
                          </Link>
                        </li>
                        <li>
                          <Link
                            className={
                              pathname.includes("acrclass")
                                ? "active noti-dot"
                                : ""
                            }
                            to="/acrclass"
                          >
                            ACRClass
                          </Link>
                        </li>
                        <li>
                          <Link
                            className={
                              pathname.includes("acrtype")
                                ? "active noti-dot"
                                : ""
                            }
                            to="/acrtype"
                          >
                            ACRType
                          </Link>
                        </li>

                        {/* <li><Link className={pathname.includes('trainer') ? "active" : ""} to="/app/training/trainer"> Trainers</Link></li>
                  <li><Link className={pathname.includes('training-type') ? "active" : ""} to="/app/training/training-type"> Training Type </Link></li> */}
                      </>
                    </ul>
                  </li>


                </ul>
              </li>
            </>


            {/* <li className={pathname.includes('administrator/users') ? "active" : ""}>
                <Link to="/app/administrator/users"><i className="la la-user-plus" /> <span>Users</span></Link>
              </li> */}


          </ul>

          {/* Tipsoi  */}
















          {/* log audit */}


          {/* Vehicle start  */}


        </div>
      </div>



      <Outlet />
    </div>
  );
};

export default Sidebar;
