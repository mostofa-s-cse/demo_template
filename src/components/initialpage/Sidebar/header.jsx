/**
 * App Header
 **/
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
import useServer from "../hooks/useServer";
const Header = () => {
  const location = useLocation();
  const {user} = useServer();
  console.log(user);
  const navigate = useNavigate();
  let logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    // localStorage.removeItem('CardAccountID');
    navigate("/login");
    window.location.reload();
  };
  let pathname = location.pathname;
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
            <h3>Projmantech</h3>
          </div>
          {/* /Header Title */}
          <a id="mobile_btn" className="mobile_btn" href="#sidebar">
            <i className="fa fa-bars" />
          </a>
          {/* Header Menu */}
          <ul className="nav user-menu">
            {/* Search */}
            <li className="nav-item">
              <div className="top-nav-search">
                <a href="" className="responsive-search">
                  <i className="fa fa-search" />
                </a>
                <form>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Search here"
                  />
                  <button className="btn" type="submit">
                    <i className="fa fa-search" />
                  </button>
                </form>
              </div>
            </li>
            {/* /Search */}
            {/* devoloper notification */}
            <li className="nav-item dropdown me-2">
              <a
                href="#"
                className="dropdown-toggle nav-link project-tooltip"
                data-toggle="dropdown"
              >
                <div class="blink">
                  <i class="fa fa-telegram fs-4" aria-hidden="true"></i>
                </div>

                <span class="project-tooltiptext"> Software Requisition</span>
              </a>
            </li>

            <li className="nav-item dropdown me-2">
              <a
                href="#"
                className="dropdown-toggle nav-link project-tooltip"
                data-toggle="dropdown"
              >
                <i class="fa fa-lightbulb-o" aria-hidden="true"></i>{" "}
                <span class="project-tooltiptext"> D.Notification</span>
                <span className="badge badge-pill">0</span>
              </a>

              <div className="dropdown-menu notifications">
                <div className="topnav-dropdown-header">
                  <span className="notification-title">Notifications</span>
                </div>
              </div>
            </li>

            {/* /Notifications */}
            <li className="nav-item dropdown">
              <a
                href="#"
                className="dropdown-toggle nav-link project-tooltip"
                data-toggle="dropdown"
              >
                <i className="fa fa-bell-o" />{" "}
                <span class="project-tooltiptext">Notification</span>
                <span className="badge badge-pill">0</span>
              </a>

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
                    <li className="notification-message">
                      <div>
                        <u className="fs-6 ps-3 text-muted">Leave</u>
                        <i className="fa fs-6 ps-2 fa-bell-o" />{" "}
                        <span className="text-danger fs-6 ">0</span>
                      </div>

                      <Link to="/leave">
                        <div className="media border ps-2">
                          <div className="media-body">
                            <p className="noti-details">
                              <span className="noti-title">leave</span> new
                              Leave Request{" "}
                            </p>
                          </div>
                        </div>
                      </Link>

                      <div>
                        <u className="fs-6 ps-3 text-muted">Loan</u>
                        <i className="fa fs-6 ps-2 fa-bell-o" />{" "}
                        <span className="text-danger fs-6 ">0</span>
                      </div>

                      <Link to="/loan">
                        <div className="media border ps-2">
                          <div className="media-body">
                            <p className="noti-details">
                              <span className="noti-title">admin</span> new Loan
                              Request{" "}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="topnav-dropdown-footer">
                  View all Notifications
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
                  <div className="header-img avatar">
                    <img src={placeholderImg} />
                  </div>
                </span>
                <span>{user.User_Name}</span>
              </a>
              <div className="dropdown-menu">
                <Link className="dropdown-item" to="/profile">
                  My Profile
                </Link>
                <Link className="dropdown-item" to="/changepassword">
                  Change Password
                </Link>
                <a className="dropdown-item" onClick={logout}>Logout</a>
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
              <Link className="dropdown-item" to="/profile">
                My Profile
              </Link>
              <a className="dropdown-item" onClick={logout}>Logout</a>
            </div>
          </div>
          {/* /Mobile Menu */}
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Header;
