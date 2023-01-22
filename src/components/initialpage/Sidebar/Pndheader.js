/**
 * App Header
 */
import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  headerlogo,
  Avatar_13,
  placeholderImg,
} from "../../Entryfile/imagepath";
import { useLocation } from "react-router-dom";
import "../../assets/js/app";
import { notification } from "antd";
import useAuth from "../hooks/useAuth";
import Api from "../hooks/Api";
const Pndheader = () => {
  const { logoutAction, setUser, user } = useAuth();
  const [employeeData, setEmployeeData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const emp_id = user.employe_id;
  // GET EMPLOYEE DATA USING EMPLOYEE ID
  let logId = user.user_id;
  useEffect(() => {
    const getUsers = () => {
      fetch(`/ords/hrm/employees/v_emp_all/${emp_id}`)
        .then((res) => {
          // You have to send it, as I have done below
          if (res.status >= 400) {
            throw new Error("Server responds with error!");
          }
          return res.json();
        })
        .then(
          (users) => {
            setEmployeeData(users);
          },

          (err) => {
            const mute = err;
            setHasError(true);
          }
        );
    };
    getUsers();
  }, [emp_id]);

  //--------------------------- notification section start -------------------------------

  // ----get employee leave data
  const [getLeaveData, setGetLeaveData] = useState([]);
  useEffect(() => {
    const getUsers = () => {
      setIsLoading(true);
      fetch(`/ords/hrm/emp_lea/v_emp_lea`)
        .then((res) => {
          // You have to send it, as I have done below
          if (res.status >= 400) {
            throw new Error("Server responds with error!");
          }
          return res.json();
        })
        .then(
          (users) => {
            setGetLeaveData(users.items);
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

  // GET LOAN_TYPE DATA
  const [getLoanData, setGetLoanData] = useState([]);

  useEffect(() => {
    const getUsers = () => {
      setIsLoading(true);
      fetch(`/ords/hrm/emp_loa/v_emp_loa`)
        .then((res) => {
          // You have to send it, as I have done below
          if (res.status >= 400) {
            throw new Error("Server responds with error!");
          }
          return res.json();
        })
        .then(
          (users) => {
            setGetLoanData(users.items);
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

  let leaveNewData = getLeaveData.filter((item) => item.status === "New");
  let loanNewData = getLoanData.filter((item) => item.status === "New");
  let totalNotification = leaveNewData.length + loanNewData.length;

  //-------------------------------- notification end -------------------------------

  const userName = user.name_english;
  const location = useLocation();
  let pathname = location.pathname;
  const navigate = useNavigate();
  const logOutBtnHandler = () => {
    const statusLog = logoutAction();
    if (statusLog === 1) {
      window.location.href = "/";
    }
  };
  return (
    <div>
      <div>
        <div className="header" style={{ right: "0px" }}>
          {/* Logo */}
          <div className="header-left mt-2">
            <img src={headerlogo} width={40} height={40} alt="" />
          </div>
          {/* /Logo */}
          <a
            id="toggle_btn"
            href=""
            style={{
              display: pathname.includes("tasks")
                ? "none"
                : pathname.includes("compose")
                  ? "none"
                  : "",
            }}
          >
            <span className="bar-icon">
              <span />
              <span />
              <span />
            </span>
          </a>
          {/* Header Title */}
          <div className="page-title-box">
            <h3> Bangladesh Bridge Authority </h3>
          </div>
          {/* /Header Title */}
          <a id="mobile_btn" className="mobile_btn" href="#sidebar">
            <i className="fa fa-bars" />
          </a>
          {/* Header Menu */}
          <ul className="nav user-menu">
            {/* Search */}
            {/* <li className="nav-item">
               <div className="top-nav-search">
                 <a href="" className="responsive-search">
                   <i className="fa fa-search" />
                 </a>
                 <form>
                   <input className="form-control" type="text" placeholder="Search here" />
                   <button className="btn" type="submit"><i className="fa fa-search" /></button>
                 </form>
               </div>
             </li> */}
            {/* /Search */}
            {/* Flag */}
            {/* /Flag */}
            {/* Notifications */}
            <li className="nav-item dropdown">
              {logId === "Tanusree" ? (
                <a
                  href="#"
                  className="dropdown-toggle nav-link"
                  data-toggle="dropdown"
                >
                  <i className="fa fa-bell-o" />{" "}
                  <span className="badge badge-pill">{totalNotification}</span>
                </a>
              ) : (
                <a href="#" className="dropdown-toggle nav-link">
                  <i className="fa fa-bell-o" />{" "}
                  <span className="badge badge-pill">0</span>
                </a>
              )}

              <div className="dropdown-menu notifications">
                <div className="topnav-dropdown-header">
                  <span className="notification-title">Notifications</span>
                  <a href="" className="clear-noti">
                    {" "}
                    Clear All{" "}
                  </a>
                </div>
                <div className="noti-content">
                  <ul className="notification-list">
                    {/* <li className="notification-message">
                       <Link onClick={() => localStorage.setItem("minheight", "true")} to="/app/administrator/activities">
                         <div className="media">
                           <span className="avatar">
                             <img alt="" src={Avatar_02} />
                           </span>
                           <div className="media-body">
                             <p className="noti-details"><span className="noti-title">John Doe</span> added new task <span className="noti-title">Patient appointment booking</span></p>
                             <p className="noti-time"><span className="notification-time">4 mins ago</span></p>
                           </div>
                         </div>
                       </Link>
                     </li> */}
                    {/* <li className="notification-message">
                       <Link onClick={() => localStorage.setItem("minheight", "true")} to="/app/administrator/activities">
                         <div className="media">
                           <span className="avatar">
                             <img alt="" src={Avatar_03} />
                           </span>
                           <div className="media-body">
                             <p className="noti-details"><span className="noti-title">Tarah Shropshire</span> changed the task name <span className="noti-title">Appointment booking with payment gateway</span></p>
                             <p className="noti-time"><span className="notification-time">6 mins ago</span></p>
                           </div>
                         </div>
                       </Link>
                     </li> */}
                    {/* <li className="notification-message">
                       <Link onClick={() => localStorage.setItem("minheight", "true")} to="/app/administrator/activities">
                         <div className="media">
                           <span className="avatar">
                             <img alt="" src={Avatar_06} />
                           </span>
                           <div className="media-body">
                             <p className="noti-details"><span className="noti-title">Misty Tison</span> added <span className="noti-title">Domenic Houston</span> and <span className="noti-title">Claire Mapes</span> to project <span className="noti-title">Doctor available module</span></p>
                             <p className="noti-time"><span className="notification-time">8 mins ago</span></p>
                           </div>
                         </div>
                       </Link>
                     </li>
                     <li className="notification-message">
                       <Link onClick={() => localStorage.setItem("minheight", "true")} to="/app/administrator/activities">
                         <div className="media">
                           <span className="avatar">
                             <img alt="" src={Avatar_17} />
                           </span>
                           <div className="media-body">
                             <p className="noti-details"><span className="noti-title">Rolland Webber</span> completed task <span className="noti-title">Patient and Doctor video conferencing</span></p>
                             <p className="noti-time"><span className="notification-time">12 mins ago</span></p>
                           </div>
                         </div>
                       </Link>
                     </li> */}
                    <li className="notification-message">
                      <div>
                        <u className="fs-6 ps-3 text-muted">Leave</u>
                        <i className="fa fs-6 ps-2 fa-bell-o" />{" "}
                        <span className="text-danger fs-6 ">
                          ({leaveNewData.length})
                        </span>
                      </div>
                      {leaveNewData.map((item) => (
                        <Link to="/leave">
                          <div className="media border ps-2">
                            <div className="media-body">
                              <p className="noti-details">
                                <span className="noti-title">
                                  {item.emp_name}
                                </span>{" "}
                                new Leave Request{" "}
                              </p>
                            </div>
                          </div>
                        </Link>
                      ))}
                      <div>
                        <u className="fs-6 ps-3 text-muted">Loan</u>
                        <i className="fa fs-6 ps-2 fa-bell-o" />{" "}
                        <span className="text-danger fs-6 ">
                          ({loanNewData.length})
                        </span>
                      </div>
                      {loanNewData.map((item) => (
                        <Link to="/loan">
                          <div className="media border ps-2">
                            <div className="media-body">
                              <p className="noti-details">
                                <span className="noti-title">
                                  {item.name_english}
                                </span>{" "}
                                new Loan Request{" "}
                              </p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </li>
                  </ul>
                </div>
                <div className="topnav-dropdown-footer">
                  <Link
                    onClick={() => localStorage.setItem("minheight", "true")}
                    to="/app/administrator/activities"
                  >
                    View all Notifications
                  </Link>
                </div>
              </div>
            </li>
            {/* /Notifications */}
            {/* Message Notifications */}
            {/* <li className="nav-item dropdown">
               <a href="#" className="dropdown-toggle nav-link" data-toggle="dropdown">
                 <i className="fa fa-comment-o" /> <span className="badge badge-pill">8</span>
               </a>
               <div className="dropdown-menu notifications">
                 <div className="topnav-dropdown-header">
                   <span className="notification-title">Messages</span>
                   <a href="" className="clear-noti"> Clear All </a>
                 </div>
                 <div className="noti-content">
                   <ul className="notification-list">
                     <li className="notification-message">
                       <Link onClick={() => localStorage.setItem("minheight", "true")} to="/conversation/chat">
                         <div className="list-item">
                           <div className="list-left">
                             <span className="avatar">
                               <img alt="" src={Avatar_09} />
                             </span>
                           </div>
                           <div className="list-body">
                             <span className="message-author">Richard Miles </span>
                             <span className="message-time">12:28 AM</span>
                             <div className="clearfix" />
                             <span className="message-content">Lorem ipsum dolor sit amet, consectetur adipiscing</span>
                           </div>
                         </div>
                       </Link>
                     </li>
                     <li className="notification-message">
                       <Link onClick={() => localStorage.setItem("minheight", "true")} to="/conversation/chat">
                         <div className="list-item">
                           <div className="list-left">
                             <span className="avatar">
                               <img alt="" src={Avatar_02} />
                             </span>
                           </div>
                           <div className="list-body">
                             <span className="message-author">John Doe</span>
                             <span className="message-time">6 Mar</span>
                             <div className="clearfix" />
                             <span className="message-content">Lorem ipsum dolor sit amet, consectetur adipiscing</span>
                           </div>
                         </div>
                       </Link>
                     </li>
                     <li className="notification-message">
                       <Link onClick={() => localStorage.setItem("minheight", "true")} to="/conversation/chat">
                         <div className="list-item">
                           <div className="list-left">
                             <span className="avatar">
                               <img alt="" src={Avatar_03} />
                             </span>
                           </div>
                           <div className="list-body">
                             <span className="message-author"> Tarah Shropshire </span>
                             <span className="message-time">5 Mar</span>
                             <div className="clearfix" />
                             <span className="message-content">Lorem ipsum dolor sit amet, consectetur adipiscing</span>
                           </div>
                         </div>
                       </Link>
                     </li>
                     <li className="notification-message">
                       <Link onClick={() => localStorage.setItem("minheight", "true")} to="/conversation/chat">
                         <div className="list-item">
                           <div className="list-left">
                             <span className="avatar">
                               <img alt="" src={Avatar_05} />
                             </span>
                           </div>
                           <div className="list-body">
                             <span className="message-author">Mike Litorus</span>
                             <span className="message-time">3 Mar</span>
                             <div className="clearfix" />
                             <span className="message-content">Lorem ipsum dolor sit amet, consectetur adipiscing</span>
                           </div>
                         </div>
                       </Link>
                     </li>
                     <li className="notification-message">
                       <Link onClick={() => localStorage.setItem("minheight", "true")} to="/conversation/chat">
                         <div className="list-item">
                           <div className="list-left">
                             <span className="avatar">
                               <img alt="" src={Avatar_08} />
                             </span>
                           </div>
                           <div className="list-body">
                             <span className="message-author"> Catherine Manseau </span>
                             <span className="message-time">27 Feb</span>
                             <div className="clearfix" />
                             <span className="message-content">Lorem ipsum dolor sit amet, consectetur adipiscing</span>
                           </div>
                         </div>
                       </Link>
                     </li>
                   </ul>
                 </div>
                 <div className="topnav-dropdown-footer">
                   <Link onClick={() => localStorage.setItem("minheight", "true")} to="/conversation/chat">View all Messages</Link>
                 </div>
               </div>
             </li>
             {/* /Message Notifications */}
            <li className="nav-item dropdown has-arrow main-drop">
              <a
                href="#"
                className="dropdown-toggle nav-link"
                data-toggle="dropdown"
              >
                <span className="header-img">
                  {" "}
                  {employeeData.photo_path ? (
                    <div className="avatar">
                      <img
                        className="avatar"
                        src={`http://${Api}/static${employeeData.photo_path}`}
                      />
                    </div>
                  ) : (
                    <div className="header-img avatar">
                      <img src={placeholderImg} />
                    </div>
                  )}

                </span>
                <span>{userName}</span>
              </a>
              <div className="dropdown-menu">
                <a className="dropdown-item" href="hr/singleprofile">
                  My Profile
                </a>
                <a className="dropdown-item" href="hr/changepassword">
                  Change Password
                </a>
                <a
                  onClick={logOutBtnHandler}
                  className="dropdown-item"
                  href="/"
                >
                  Logout
                </a>
              </div>
            </li>
          </ul>
          {/* /Header Menu */}
          {/* Mobile Menu */}
          <div className="dropdown mobile-user-menu">
            <a
              href="#"
              className="nav-link dropdown-toggle"
              data-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="fa fa-ellipsis-v" />
            </a>
            <div className="dropdown-menu dropdown-menu-right">
              <Link className="dropdown-item" to="/singleprofile">
                My Profile
              </Link>
              <Link
                onClick={logOutBtnHandler}
                className="dropdown-item"
                to="/login"
              >
                Logout
              </Link>
            </div>
          </div>
          {/* /Mobile Menu */}
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Pndheader;
