/**
 * Signin Firebase
 */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import {
  Avatar_02,
  Avatar_05,
  Avatar_09,
  Avatar_10,
  Avatar_16,
  placeholderImg,
} from "../../../Entryfile/imagepath";
import baseApi from "../../../initialpage/hooks/baseApi";
import Api from "../../../initialpage/hooks/Api";
import "../../index.css";
const EmployeeDashboard = () => {
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
  // const reloadCount = Number(sessionStorage.getItem('reloadCount')) || 0;
  // useEffect(() => {
  //   if (reloadCount < 1) {
  //     sessionStorage.setItem('reloadCount', String(reloadCount + 1));
  //     window.location.reload();
  //   } else {
  //     sessionStorage.removeItem('reloadCount');
  //   }
  // }, []);
  const userName = userLoginData.name_english;
  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth() + 1
    }/${current.getFullYear()}`;
  const emp_id = userLoginData.employe_id;
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [employeeData, setEmployeeData] = useState({});
  const [totalEmpLoanArray, setTotalEmpLoanArray] = useState([]);
  const [totalEmpLeaveArray, setTotalEmpLeaveArray] = useState([]);
  const [totalEmpPromotionArray, setTotalEmpPromotionArray] = useState([]);

  // GET EMPLOYEE DATA USING EMPLOYEE ID

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
    if (emp_id) {
      getUsers();
    }

  }, [emp_id]);
  //  total single employee loan
  useEffect(() => {
    const getUsers = () => {
      setIsLoading(true);
      fetch(`/ords/hrm/emp_loa/v_emp_loa/e/${emp_id}`)
        .then((res) => {
          // You have to send it, as I have done below
          if (res.status >= 400) {
            throw new Error("Server responds with error!");
          }
          return res.json();
        })
        .then(
          (users) => {
            setTotalEmpLoanArray(users.items);
            setIsLoading(false);
          },

          (err) => {
            const mute = err;
            setHasError(true);
            setIsLoading(true);
          }
        );
    };
    if (emp_id) {
      getUsers();
    }
  }, [emp_id]);

  //  total leave
  useEffect(() => {
    const getUsers = () => {
      setIsLoading(true);
      fetch(`/ords/hrm/emp_lea/v_emp_lea/e/${emp_id}`)
        .then((res) => {
          // You have to send it, as I have done below
          if (res.status >= 400) {
            throw new Error("Server responds with error!");
          }
          return res.json();
        })
        .then(
          (users) => {
            setTotalEmpLeaveArray(users.items);
            setIsLoading(false);
          },

          (err) => {
            const mute = err;
            setHasError(true);
            setIsLoading(true);
          }
        );
    };
    if (emp_id) {
      getUsers();
    }
  }, [emp_id]);

  //  total single employee Promotion
  useEffect(() => {
    const getUsers = () => {
      setIsLoading(true);
      fetch(`/ords/hrm/emp_pro/v_emp_pro/e/${emp_id}`)
        .then((res) => {
          // You have to send it, as I have done below
          if (res.status >= 400) {
            throw new Error("Server responds with error!");
          }
          return res.json();
        })
        .then(
          (users) => {
            setTotalEmpPromotionArray(users.items);
            setIsLoading(false);
          },

          (err) => {
            const mute = err;
            setHasError(true);
            setIsLoading(true);
          }
        );
    };
    if (emp_id) {
      getUsers();
    }
  }, [emp_id]);

  const remainingApprovedUsers = totalEmpLoanArray.filter(
    (user) => user.status === "Approved"
  );
  const remainingPendingUsers = totalEmpLoanArray.filter(
    (user) => user.status === "New"
  );
  const remainingCancelledUsers = totalEmpLoanArray.filter(
    (user) => user.status === "Declined"
  );

  const remainingLeaveApprovedUsers = totalEmpLeaveArray.filter(
    (user) => user.status === "Approved"
  );
  const remainingLeavePendingUsers = totalEmpLeaveArray.filter(
    (user) => user.status === "New"
  );
  const remainingLeaveCancelledUsers = totalEmpLeaveArray.filter(
    (user) => user.status === "Declined"
  );

  const remainingPromotionPromotionsUsers = totalEmpPromotionArray.filter(
    (user) => user.type_promotion === "Promotion"
  );
  const remainingPromotionPendingUsers = totalEmpPromotionArray.filter(
    (user) => user.status === "New"
  );
  const remainingPromotionChargedUsers = totalEmpPromotionArray.filter(
    (user) => user.type_promotion === "Charge"
  );

  return (
    <div className="page-wrapper">
      <Helmet>
        <title>Dashboard - HR</title>
        <meta name="description" content="Dashboard" />
      </Helmet>
      {/* Page Content */}
      <div className="content container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="welcome-box">
              <div className="welcome-img">
                {employeeData.photo_path ? (
                  <div className="welcome-img">
                    <img
                      src={` http://${Api}/static${employeeData.photo_path}`}
                    />
                  </div>
                ) : (
                  <div className="welcome-img">
                    <img src={placeholderImg} />
                  </div>
                )}
              </div>
              <div className="welcome-det ">
                <h2>{userName}</h2>
                <p className="text-start">{date}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 col-sm-6 col-lg-6 col-xl-4 ">
            <div className="card dash-widget bg-gradient-purple text-white">
              <div className="card-header bg-gradient-purple">
                <span className="dash-widget-icon text-white">
                  <i className="fa fa-usd"></i>
                </span>
                <div className="dash-widget-info">
                  <h3 className="text-white">{totalEmpLoanArray.length}</h3>
                  <span>Loan</span>
                </div>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-4 border-end border-2 border-primary">
                    <h3 className="text-white">
                      {remainingPendingUsers.length}
                    </h3>
                    <span className="text-white">PENDING</span>
                  </div>
                  <div className="col-sm-4 border-end border-2 border-primary">
                    <h3 className="text-white">
                      {remainingApprovedUsers.length}
                    </h3>
                    <span className="text-white">APPROVED</span>
                  </div>
                  <div className="col-sm-4">
                    <h3 className="text-white">
                      {remainingCancelledUsers.length}
                    </h3>
                    <span className="text-white">CANCELLED</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-sm-6 col-lg-6 col-xl-4 ">
            <div className="card dash-widget bg-gradient-primary text-white">
              <div className="card-header bg-gradient-primary">
                <span className="dash-widget-icon text-white">
                  <i className="fa fa-minus-square" aria-hidden="true"></i>
                </span>
                <div className="dash-widget-info">
                  <h3 className="text-white">{totalEmpLeaveArray.length}</h3>
                  <span>Leave</span>
                </div>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-4 border-end border-2 border-primary">
                    <h3 className="text-white">
                      {remainingLeavePendingUsers.length}
                    </h3>
                    <span className="text-white">PENDING</span>
                  </div>
                  <div className="col-sm-4 border-end border-2 border-primary">
                    <h3 className="text-white">
                      {remainingLeaveApprovedUsers.length}
                    </h3>
                    <span className="text-white">APPROVED</span>
                  </div>
                  <div className="col-sm-4">
                    <h3 className="text-white">
                      {remainingLeaveCancelledUsers.length}
                    </h3>
                    <span className="text-white">CANCELLED</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-sm-6 col-lg-6 col-xl-4">
            <div className="card dash-widget bg-project">
              <div className="card-header bg-project text-white">
                <span className="dash-widget-icon text-white">
                  <i className="fa fa-arrow-circle-o-up" aria-hidden="true"></i>
                </span>
                <div className="dash-widget-info">
                  <h3 className="text-white">
                    {totalEmpPromotionArray.length}
                  </h3>
                  <span> Promotions </span>
                </div>
              </div>
              <div className="card-body ">
                <div className="row">
                  <div className="col-sm-6 border-end border-2  border-primary">
                    <h3 className="text-white">
                      {remainingPromotionPromotionsUsers.length}
                    </h3>
                    <span className=" text-white">PROMOTIONS</span>
                  </div>
                  <div className="col-sm-6">
                    <h3 className="text-white">
                      {remainingPromotionChargedUsers.length}
                    </h3>
                    <span className=" text-white">CHARGED</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="row">
          <div className="col-lg-8 col-md-8">
            <section className="dash-section">
              <h1 className="dash-sec-title">Today</h1>
              <div className="dash-sec-content">
                <div className="dash-info-list">
                  <a href="#" className="dash-card text-danger">
                    <div className="dash-card-container">
                      <div className="dash-card-icon">
                        <i className="fa fa-hourglass-o" />
                      </div>
                      <div className="dash-card-content">
                        <p>Richard Miles is off sick today</p>
                      </div>
                      <div className="dash-card-avatars">
                        <div className="e-avatar"><img src={Avatar_09} alt="" /></div>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="dash-info-list">
                  <a href="#" className="dash-card">
                    <div className="dash-card-container">
                      <div className="dash-card-icon">
                        <i className="fa fa-suitcase" />
                      </div>
                      <div className="dash-card-content">
                        <p>You are away today</p>
                      </div>
                      <div className="dash-card-avatars">
                        <div className="e-avatar"><img src={Avatar_02} alt="" /></div>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="dash-info-list">
                  <a href="#" className="dash-card">
                    <div className="dash-card-container">
                      <div className="dash-card-icon">
                        <i className="fa fa-building-o" />
                      </div>
                      <div className="dash-card-content">
                        <p>You are working from home today</p>
                      </div>
                      <div className="dash-card-avatars">
                        <div className="e-avatar"><img src={Avatar_02} alt="" /></div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </section>
            <section className="dash-section">
              <h1 className="dash-sec-title">Tomorrow</h1>
              <div className="dash-sec-content">
                <div className="dash-info-list">
                  <div className="dash-card">
                    <div className="dash-card-container">
                      <div className="dash-card-icon">
                        <i className="fa fa-suitcase" />
                      </div>
                      <div className="dash-card-content">
                        <p>2 people will be away tomorrow</p>
                      </div>
                      <div className="dash-card-avatars">
                        <a href="#" className="e-avatar"><img src={Avatar_04} alt="" /></a>
                        <a href="#" className="e-avatar"><img src={Avatar_08} alt="" /></a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="dash-section">
              <h1 className="dash-sec-title">Next seven days</h1>
              <div className="dash-sec-content">
                <div className="dash-info-list">
                  <div className="dash-card">
                    <div className="dash-card-container">
                      <div className="dash-card-icon">
                        <i className="fa fa-suitcase" />
                      </div>
                      <div className="dash-card-content">
                        <p>2 people are going to be away</p>
                      </div>
                      <div className="dash-card-avatars">
                        <a href="#" className="e-avatar"><img src={Avatar_05} alt="" /></a>
                        <a href="#" className="e-avatar"><img src={Avatar_07} alt="" /></a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="dash-info-list">
                  <div className="dash-card">
                    <div className="dash-card-container">
                      <div className="dash-card-icon">
                        <i className="fa fa-user-plus" />
                      </div>
                      <div className="dash-card-content">
                        <p>Your first day is going to be  on Thursday</p>
                      </div>
                      <div className="dash-card-avatars">
                        <div className="e-avatar"><img src={Avatar_02} alt="" /></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="dash-info-list">
                  <a href="" className="dash-card">
                    <div className="dash-card-container">
                      <div className="dash-card-icon">
                        <i className="fa fa-calendar" />
                      </div>
                      <div className="dash-card-content">
                        <p>It's Spring Bank Holiday  on Monday</p>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </section>
          </div>
          <div className="col-lg-4 col-md-4">
            <div className="dash-sidebar">
              <section>
                <h5 className="dash-title">Projects</h5>
                <div className="card">
                  <div className="card-body">
                    <div className="time-list">
                      <div className="dash-stats-list">
                        <h4>71</h4>
                        <p>Total Tasks</p>
                      </div>
                      <div className="dash-stats-list">
                        <h4>14</h4>
                        <p>Pending Tasks</p>
                      </div>
                    </div>
                    <div className="request-btn">
                      <div className="dash-stats-list">
                        <h4>2</h4>
                        <p>Total Projects</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <section>
                <h5 className="dash-title">Your Leave</h5>
                <div className="card">
                  <div className="card-body">
                    <div className="time-list">
                      <div className="dash-stats-list">
                        <h4>4.5</h4>
                        <p>Leave Taken</p>
                      </div>
                      <div className="dash-stats-list">
                        <h4>12</h4>
                        <p>Remaining</p>
                      </div>
                    </div>
                    <div className="request-btn">
                      <a className="btn btn-primary" href="#">Apply Leave</a>
                    </div>
                  </div>
                </div>
              </section>
              <section>
                <h5 className="dash-title">Your time off allowance</h5>
                <div className="card">
                  <div className="card-body">
                    <div className="time-list">
                      <div className="dash-stats-list">
                        <h4>5.0 Hours</h4>
                        <p>Approved</p>
                      </div>
                      <div className="dash-stats-list">
                        <h4>15 Hours</h4>
                        <p>Remaining</p>
                      </div>
                    </div>
                    <div className="request-btn">
                      <a className="btn btn-primary" href="#">Apply Time Off</a>
                    </div>
                  </div>
                </div>
              </section>
              <section>
                <h5 className="dash-title">Upcoming Holiday</h5>
                <div className="card">
                  <div className="card-body text-center">
                    <h4 className="holiday-title mb-0">Mon 20 May 2019 - Ramzan</h4>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div> */}
      </div>
      {/* /Page Content */}
    </div>
  );
};

export default EmployeeDashboard;
