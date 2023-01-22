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

            {adSubModule === 2 &&
              <li>
                <Link
                  className={
                    pathname.includes("/leasedashboard")
                      ? ""
                      : ""
                  }
                  to="/lease/leasedashboard"
                >
                  <i className="la la-dashboard me-3" />{" "}
                  Dashboard
                </Link>
              </li>
            }
            {adSubModule === 1 && (
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
            )}


            {adSubModule == 1 && (
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
                          <>
                            {program_3.length ? (
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
                            ) : (
                              ""
                            )}
                            {program_3.length ? (
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
                            ) : (
                              ""
                            )}
                            {program_4.length ? (
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
                            ) : (
                              ""
                            )}
                            {program_5.length ? (
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
                            ) : (
                              ""
                            )}

                            {program_6.length ? (
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
                            ) : (
                              ""
                            )}

                            {program_7.length ? (
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
                            ) : (
                              ""
                            )}

                            {program_8.length ? (
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
                            ) : (
                              ""
                            )}
                          </>
                        </ul>
                      </li>
                    ) : (
                      ""
                    )}

                    {program_9.length ? (
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
                    ) : (
                      ""
                    )}
                    {program_10.length ? (
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
                    ) : (
                      ""
                    )}
                    {program_11.length ? (
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
                    ) : (
                      ""
                    )}
                    {program_12.length ? (
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
                    ) : (
                      ""
                    )}

                    {adSubModule === 1 && (
                      <>
                        {eventAccess === 1 ? (
                          <li className="submenu text-start">
                            <a href="#">
                              <i className="la la-calendar-plus-o me-2 fs-6"></i>
                              <span> Events </span>{" "}
                              <span className="menu-arrow" />
                            </a>
                            <ul style={{ display: "none" }}>
                              <>
                                {program_13.length ? (
                                  <li>
                                    <Link
                                      className={
                                        pathname.includes("eventdashboard")
                                          ? "active noti-dot"
                                          : ""
                                      }
                                      to="/eventdashboard"
                                    >
                                      Dashboard
                                    </Link>
                                  </li>
                                ) : (
                                  ""
                                )}
                                {/* <li ><Link className={pathname.includes('eventsetup') ? "active noti-dot" : ""} to="/eventsetup">Setup</Link></li> */}
                                {program_14.length ? (
                                  <li>
                                    <Link
                                      className={
                                        pathname.includes("eventcalender")
                                          ? "active noti-dot"
                                          : ""
                                      }
                                      to="/eventcalender"
                                    >
                                      Calender
                                    </Link>
                                  </li>
                                ) : (
                                  ""
                                )}
                                {program_15.length ? (
                                  <li>
                                    <Link
                                      className={
                                        pathname.includes("eventcreate")
                                          ? "active noti-dot"
                                          : ""
                                      }
                                      to="/eventcreate"
                                    >
                                      Event
                                    </Link>
                                  </li>
                                ) : (
                                  ""
                                )}

                                <li className="submenu text-start">
                                  <a href="#">
                                    <i className="la la-cog me-2 fs-6"></i>
                                    <span> Settings </span>{" "}
                                    <span className="menu-arrow" />
                                  </a>
                                  {program_16.length ? (
                                    <ul style={{ display: "none" }}>
                                      <>
                                        <li>
                                          <Link
                                            className={
                                              pathname.includes(
                                                "eventorganization"
                                              )
                                                ? ""
                                                : ""
                                            }
                                            to="/eventorganization"
                                          >
                                            Organization
                                          </Link>
                                        </li>
                                      </>
                                    </ul>
                                  ) : (
                                    ""
                                  )}
                                </li>
                              </>
                            </ul>
                          </li>
                        ) : (
                          ""
                        )}
                      </>
                    )}
                    {adSubModule === 1 && (
                      <>
                        {program_17.length ? (
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
                        ) : (
                          ""
                        )}
                      </>
                    )}
                  </ul>
                </li>
              </>
            )}

            {/* <li className={pathname.includes('administrator/users') ? "active" : ""}>
                <Link to="/app/administrator/users"><i className="la la-user-plus" /> <span>Users</span></Link>
              </li> */}

            <>
              {adSubModule === 2 && (
                <>
                  <li className="submenu text-start">
                    <a href="#">
                      <i className="la la-user" /> <span> Estate</span>{" "}
                      <span className="menu-arrow" />
                    </a>
                    <ul style={{ display: "none" }}>
                      <li className="submenu text-start">
                        <a href="#">
                          <i className="la la-user" /> <span> Lease</span>{" "}
                          <span className="menu-arrow" />
                        </a>
                        <ul style={{ display: "none" }}>

                          <li>
                            <Link
                              className={
                                pathname.includes("addlease") ? "active" : ""
                              }
                              to="/lease/addlease"
                            >
                              Add Lease
                            </Link>
                          </li>
                          <li>
                            <Link
                              className={
                                pathname.includes("leasepayment") ? "active noti-dot" : ""
                              }
                              to="/lease/leasepayment"
                            >
                              Lease Payment
                            </Link>
                          </li>
                          {/* <li>
                            <Link
                              className={
                                pathname.includes("leasereport") ? "active" : ""
                              }
                              to="/lease/leasereport"
                            >
                              Single Report
                            </Link>
                          </li> */}
                          <li>
                            <Link
                              className={
                                pathname.includes("allleasereport") ? "active noti-dot" : ""
                              }
                              to="/lease/allleasereport"
                            >
                              All Report
                            </Link>
                          </li>
                          <li>
                            <Link
                              className={
                                pathname.includes("paymentreport") ? "active noti-dot" : ""
                              }
                              to="/lease/paymentreport"
                            >
                              Payment Report
                            </Link>
                          </li>

                          <li className="submenu text-start">
                            <a href="#">
                              <span> Settings </span>{" "}
                              <span className="menu-arrow" />
                            </a>
                            <ul style={{ display: "none" }}>
                              {/* <li><Link className={pathname.includes('addcategory') ? "active" : ""} to="/lease/addcategory">Add Category</Link></li> */}
                              <li>
                                <Link
                                  className={
                                    pathname.includes("addpond") ? "active" : ""
                                  }
                                  to="/lease/addpond"
                                >
                                  Add Pond
                                </Link>
                              </li>
                              <li>
                                <Link
                                  className={
                                    pathname.includes("addland") ? "active" : ""
                                  }
                                  to="/lease/addland"
                                >
                                  Add Agricultural land
                                </Link>
                              </li>
                              <li>
                                <Link
                                  className={
                                    pathname.includes("/addnonagreland")
                                      ? "active"
                                      : ""
                                  }
                                  to="/lease/addnonagreland"
                                >
                                  Add Non Agricultural Land
                                </Link>
                              </li>
                              <li>
                                <Link
                                  className={
                                    pathname.includes("addother")
                                      ? "active"
                                      : ""
                                  }
                                  to="/lease/addother"
                                >
                                  Add Others/Tariff
                                </Link>
                              </li>
                              <li>
                                <Link
                                  className={
                                    pathname.includes("addperson")
                                      ? "active"
                                      : ""
                                  }
                                  to="/lease/addperson"
                                >
                                  Add Person
                                </Link>
                              </li>
                              <li>
                                <Link
                                  className={
                                    pathname.includes("addinstitute")
                                      ? "active"
                                      : ""
                                  }
                                  to="/lease/addinstitute"
                                >
                                  Add Institute
                                </Link>
                              </li>
                              <li>
                                <Link
                                  className={
                                    pathname.includes("addgovt") ? "active" : ""
                                  }
                                  to="/lease/addgovt"
                                >
                                  Add Govt/others
                                </Link>
                              </li>
                              <li>
                                <Link
                                  className={
                                    pathname.includes("/updatevattax")
                                      ? "active"
                                      : ""
                                  }
                                  to="/lease/updatevattax"
                                >
                                  Update VAT Tax
                                </Link>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </li>

                      {/* <li className="submenu text-start">
                          <a href="#"><i className="la la-user" /> <span> Flat</span> <span className="menu-arrow" /></a>
                          <ul style={{ display: 'none' }}>
                            <li><Link className={pathname.includes('flatdashboard') ? "active" : ""}
                              to="/flatdashboard">Dashboard</Link></li>
  
                            <li>
                              <Link
                                className={
                                  pathname.includes("flatUserRegistraion")
                                    ? "active"
                                    : ""
                                }
                                to="/flatUserRegistraion"
                              >
                                User Registration
                              </Link>
                            </li>
                            <li>
                              <Link
                                className={
                                  pathname.includes("flatreport") ? "active" : ""
                                }
                                to="/flatreport"
                              >
                                Report
                              </Link>
                            </li>
                          </ul>
                        </li> */}
                    </ul>
                  </li>
                </>
              )}
            </>
          </ul>

          {/* Tipsoi  */}

          {adSubModule === 1 && (
            <ul>
              {tipsoi_18.length ? (
                <li className="submenu text-start">
                  <a href="#">
                    <i className="la la-dashboard" /> <span> Tipsoi</span>{" "}
                    <span className="menu-arrow" />
                  </a>

                  <ul style={{ display: "none" }}>
                    <li>
                      <Link
                        className={
                          pathname.includes("tipsoidashboard") ? "active" : ""
                        }
                        to="/tipsoidashboard"
                      >
                        Dashboard
                      </Link>
                    </li>

                    <li className="submenu text-start">
                      <a href="#">
                        <span> Report </span> <span className="menu-arrow" />
                      </a>
                      <ul style={{ display: "none" }}>
                        {/* <li><Link className={pathname.includes('addcategory') ? "active" : ""} to="/addcategory">Add Category</Link></li> */}
                        {/* <li><Link className={pathname.includes('individualreport') ? "active" : ""} to="/individualreport">Individual Attendance Report</Link></li> */}

                        <li>
                          <Link
                            className={
                              pathname.includes("departmentreport")
                                ? "active"
                                : ""
                            }
                            to="/departmentreport"
                          >
                            Department Report
                          </Link>
                        </li>
                        <li>
                          <Link
                            className={
                              pathname.includes("tipsoidailyreport")
                                ? "active"
                                : ""
                            }
                            to="/tipsoidailyreport"
                          >
                            Daily Report
                          </Link>
                        </li>
                        <li>
                          <Link
                            className={
                              pathname.includes("tipsoiIndividualMonthlyReport")
                                ? "active"
                                : ""
                            }
                            to="/tipsoiIndividualMonthlyReport"
                          >
                            Individual Monthly Report
                          </Link>
                        </li>
                        <li>
                          <Link
                            className={
                              pathname.includes("tipsoiAllEmpMonthlyReport")
                                ? "active"
                                : ""
                            }
                            to="/tipsoiAllEmpMonthlyReport"
                          >
                            All Employee Monthly Report
                          </Link>
                        </li>
                      </ul>
                    </li>
                    <li className="submenu text-start">
                      <a href="#">
                        <span> Employees </span> <span className="menu-arrow" />
                      </a>
                      <ul style={{ display: "none" }}>
                        {/* <li><Link className={pathname.includes('addcategory') ? "active" : ""} to="/addcategory">Add Category</Link></li> */}

                        <li>
                          <Link
                            className={
                              pathname.includes("tipsoiemployeereport")
                                ? "active"
                                : ""
                            }
                            to="/tipsoiemployeereport"
                          >
                            Employee Information Report
                          </Link>
                        </li>
                      </ul>
                    </li>

                    <li className="submenu text-start">
                      <a href="#">
                        <span> Shifts Management</span>{" "}
                        <span className="menu-arrow" />
                      </a>
                      <ul style={{ display: "none" }}>
                        {/* <li><Link className={pathname.includes('addcategory') ? "active" : ""} to="/addcategory">Add Category</Link></li> */}

                        <li>
                          <Link
                            className={
                              pathname.includes("tipsoishift") ? "active" : ""
                            }
                            to="/tipsoishift"
                          >
                            Shift
                          </Link>
                        </li>
                        <li>
                          <Link
                            className={
                              pathname.includes("tipsoisgroup") ? "active" : ""
                            }
                            to="/tipsoisgroup"
                          >
                            Shift Group
                          </Link>
                        </li>
                      </ul>
                    </li>
                    <li className="submenu text-start">
                      <a href="#">
                        <span> Devices</span> <span className="menu-arrow" />
                      </a>
                      <ul style={{ display: "none" }}>
                        {/* <li><Link className={pathname.includes('addcategory') ? "active" : ""} to="/addcategory">Add Category</Link></li> */}

                        <li>
                          <Link
                            className={
                              pathname.includes("tipsoidevicelist")
                                ? "active"
                                : ""
                            }
                            to="/tipsoidevicelist"
                          >
                            Device List
                          </Link>
                        </li>
                      </ul>
                    </li>

                    <li className="submenu text-start">
                      <a href="#" id="dropdownMenuButton1">
                        <span> Settings </span> <span className="menu-arrow" />
                      </a>
                      <ul
                        aria-labelledby="dropdownMenuButton1"
                        style={{ display: "none" }}
                      >
                        {/* <li><Link className={pathname.includes('addcategory') ? "active" : ""} to="/addcategory">Add Category</Link></li> */}
                        <li>
                          <Link
                            className={
                              pathname.includes("tipsoidesignation")
                                ? "active"
                                : ""
                            }
                            to="/tipsoidesignation"
                          >
                            Designations
                          </Link>
                        </li>
                        <li>
                          <Link
                            className={
                              pathname.includes("tipsoidepartment")
                                ? "active"
                                : ""
                            }
                            to="/tipsoidepartment"
                          >
                            Departments
                          </Link>
                        </li>
                        <li>
                          <Link
                            className={
                              pathname.includes("tipsoisubdepartment")
                                ? "active"
                                : ""
                            }
                            to="/tipsoisubdepartment"
                          >
                            Sub Departments
                          </Link>
                        </li>
                        <li>
                          <Link
                            className={
                              pathname.includes("tipsoiemploymentType")
                                ? "active"
                                : ""
                            }
                            to="/tipsoiemploymentType"
                          >
                            Employment Type
                          </Link>
                        </li>

                      </ul>
                    </li>
                  </ul>
                </li>
              ) : (
                ""
              )}
            </ul>
          )}

          {/* docs sidebar */}
          {adSubModule === 6 ?
            <ul>

              <li className="submenu text-start">
                <a href="#">
                  <i className="la la-gift" /> <span> Docs</span>{" "}
                  <span className="menu-arrow" />
                </a>

                <ul style={{ display: "none" }}>
                  <li>
                    <Link className={pathname.includes('/docs') ? "active" : ""} to="/docs"> <span> Dashboard</span></Link>
                  </li>

                  <li className="submenu text-start">
                    <a href="/docs"> <span> New Docs</span> <span className="menu-arrow" /></a>
                    <ul style={{ display: 'none' }}>
                      <li>
                        <Link className={pathname.includes('/docs/Add') ? "active" : ""} to="/docs/Add">
                          Add  New Docs
                        </Link>
                      </li>
                      <li>
                        <Link className={pathname.includes('/docs/category/Add') ? "active" : ""} to="/docs/category/Add">
                          Add New category
                        </Link>
                      </li>

                    </ul>
                  </li>
                  <li className="submenu text-start">
                    <a href="#"><span> Documents List</span> <span className="menu-arrow" /></a>
                    <ul style={{ display: 'none' }}>
                      <li>
                        <Link className={pathname.includes('/docs/list') ? "active" : ""} to="/docs/list">
                          View Documents
                        </Link>
                      </li>





                    </ul>
                  </li>
                  {/* <li className="submenu text-start">
                  <a href="#"> <span> Docuemnts Category</span> <span className="menu-arrow" /></a>
                  <ul style={{ display: 'none' }}>


                    <li>
                      <Link className={pathname.includes('/docs/cat/personal') ? "active" : ""} to="/docs/cat/personal">
                        BBA
                      </Link>
                    </li>

                    <li>
                      <Link className={pathname.includes('/docs/cat/others') ? "active" : ""} to="/docs/cat/others">
                        Others
                      </Link>
                    </li>




                  </ul>
                </li> */}

                </ul>
              </li>
            </ul>
            : ""
          }









          {/* add service */}
          {/* <li className="submenu text-start">
            <a href="#"><i className="la la-gift" /> <span> Docuemnts Category</span> <span className="menu-arrow" /></a>
            <ul style={{ display: 'none' }}>


              <li>
                <Link className={pathname.includes('/docs/cat/personal') ? "active" : ""} to="/docs/cat/personal">
                  BBA
                </Link>
              </li>

              <li>
                <Link className={pathname.includes('/docs/cat/others') ? "active" : ""} to="/docs/cat/others">
                  Others
                </Link>
              </li>




            </ul>
          </li> */}

          {adSubModule === 1 ?
            <ul>
              <li>
                <Link
                  className={
                    pathname.includes("softRequisition")
                      ? ""
                      : ""
                  }
                  to="/softRequisition"
                >
                  <i className="la la-sticky-note-o me-3" />
                  Software Requisition
                </Link>
              </li>
              <li>
                <a href="/vehicle/requisition/create">
                  <i className="la la-edit" /> <span> New Vehicle Requisition</span>
                </a>
              </li>
              <li>
                <Link
                  className={
                    pathname.includes("leaveRequest")
                      ? ""
                      : ""
                  }
                  to="/leaveRequest"
                >
                  <i className="la la-sticky-note-o me-3" />
                  New Leave Request
                </Link>
              </li>
            </ul>
            : ""
          }
          {/* log audit */}
          {adSubModule === 1 && logAudit.length ?
            <ul>
              <li>
                <Link
                  className={
                    pathname.includes("logAudit")
                      ? ""
                      : ""
                  }
                  to="/logAudit"
                >
                  <i className="la la-book me-3" />
                  Audit Log
                </Link>
              </li>
            </ul>
            : ""
          }

          {/* Vehicle start  */}

          {adSubModule === 4 && (
            <ul>
              <li>
                <a
                  onClick={fAndACardHandle}
                  href={`http://${apiData}/itstore/authorization?username=${secretId}`}
                >
                  <i className="la la-landmark" /> <span>IT</span>
                </a>

                {/* <Link to="/flat"></Link> */}
              </li>
            </ul>
          )}
        </div>
      </div>



      <Outlet />
    </div>
  );
};

export default Sidebar;
