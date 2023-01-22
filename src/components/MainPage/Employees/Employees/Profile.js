import React, { useEffect, useState, useRef } from "react";
import { Helmet } from "react-helmet";
import { Link, useParams } from "react-router-dom";
import {
  Avatar_02,
  Avatar_05,
  Avatar_09,
  Avatar_10,
  Avatar_16,
  placeholderImg,
} from "../../../Entryfile/imagepath";
import "font-awesome/css/font-awesome.min.css";
import { useReactToPrint } from "react-to-print";
import "../../../assets/css/font-awesome.min.css";
import "../../../assets/css/line-awesome.min.css";
import Select from "react-select";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../../assets/css/bootstrap.min.css";
import "../../../assets/css/select2.min.css";
import "../../../assets/js/app";
import "../../../assets/plugins/bootstrap-tagsinput/bootstrap-tagsinput.css";
import "../../../assets/css/bootstrap-datetimepicker.min.css";
import "../../../assets/css/style.css";
import { data } from "jquery";
import { useForm } from "react-hook-form";
import DateTimePicker from "react-datetime-picker";
import axios from "axios";
import { saveAs } from "file-saver";
import Api from "../../../initialpage/hooks/Api";
const Profile = () => {
  const [employeeData, setEmployeeData] = useState({});
  const [employeeDataDate, setEmployeeDataDate] = useState({});
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [employeeChildren, setEmployeeChildren] = useState([]);
  const [employeeDoc, setEmployeeDoc] = useState([]);
  const [employeeLeave, setEmployeeLeave] = useState([]);
  const [employeeLoan, setEmployeeLoan] = useState([]);
  const [employeeHealth, setEmployeeHealth] = useState([]);
  const [employeeDiscipline, setEmployeeDiscipline] = useState([]);
  const [employeePromotion, setEmployeePromotion] = useState([]);
  const [employeeTraining, setEmployeeTraining] = useState([]);
  const [employeeEducation, setEmployeeEducation] = useState([]);
  const [employeeBirthDate, setEmployeeBirthDate] = useState(null);
  const { emp_id } = useParams();

  // react print
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const downloadXrayImage = (imageSrc, empl_id) => {
    saveAs(`http://${Api}/static${imageSrc}`, `Xray_${empl_id}.jpg`); // Put your image url here.
  };
  const downloadEcgImage = (imageSrc2, empl_id2) => {
    saveAs(`http://${Api}/static${imageSrc2}`, `Ecg_${empl_id2}.jpg`); // Put your image url here.
  };

  //
  // GET EMPLOYEE DATA USING EMPLOYEE ID
  useEffect(() => {
    const getUsers = () => {
      fetch(`/ords/hrm/employees/${emp_id}`)
        .then((res) => {
          // You have to send it, as I have done below
          if (res.status >= 400) {
            throw new Error("Server responds with error!");
          }
          return res.json();
        })
        .then(
          (users) => {
            setEmployeeDataDate(users.items[0]);
          },

          (err) => {
            const mute = err;
            setHasError(true);
          }
        );
    };
    getUsers();
  }, [emp_id]);

  // Not Edit Here

  // Get POST Data
  const [employeePost, setEmployeePost] = useState([]);

  // GET EMPLOYEE POST DATA USING EMPLOYEE ID
  useEffect(() => {
    const getUsers = () => {
      fetch(
        `/ords/hrm/employee_posting/v_emp_posting/${emp_id}`
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
            setEmployeePost(users.items);
          },

          (err) => {
            const mute = err;
            setHasError(true);
          }
        );
    };
    getUsers();
  }, []);

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
    getUsers();
  }, []);

  // Get Employee Leave Data
  useEffect(() => {
    const getUsers = () => {
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
            setEmployeeLeave(users.items);
          },

          (err) => {
            const mute = err;
            setHasError(true);
          }
        );
    };
    getUsers();
  }, []);

  // Get Employee Loan Data
  useEffect(() => {
    const getUsers = () => {
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
            setEmployeeLoan(users.items);
          },

          (err) => {
            const mute = err;
            setHasError(true);
          }
        );
    };
    getUsers();
  }, []);
  // Get Employee Health Data
  useEffect(() => {
    const getUsers = () => {
      fetch(`/ords/hrm/emp_hea/v_hea_inf/e/${emp_id}`)
        .then((res) => {
          // You have to send it, as I have done below
          if (res.status >= 400) {
            throw new Error("Server responds with error!");
          }
          return res.json();
        })
        .then(
          (users) => {
            setEmployeeHealth(users.items);
          },

          (err) => {
            const mute = err;
            setHasError(true);
          }
        );
    };
    getUsers();
  }, []);

  // Get Employee Discipline Data
  useEffect(() => {
    const getUsers = () => {
      fetch(`/ords/hrm/emp_dis/v_emp_dis/e/${emp_id}`)
        .then((res) => {
          // You have to send it, as I have done below
          if (res.status >= 400) {
            throw new Error("Server responds with error!");
          }
          return res.json();
        })
        .then(
          (users) => {
            setEmployeeDiscipline(users.items);
          },

          (err) => {
            const mute = err;
            setHasError(true);
          }
        );
    };
    getUsers();
  }, []);

  // Get Employee Promotion Data
  useEffect(() => {
    const getUsers = () => {
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
            setEmployeePromotion(users.items);
          },

          (err) => {
            const mute = err;
            setHasError(true);
          }
        );
    };
    getUsers();
  }, []);

  // Get Employee Training Data
  useEffect(() => {
    const getUsers = () => {
      fetch(`/ords/hrm/emp_tra/v_emp_tra/e/${emp_id}`)
        .then((res) => {
          // You have to send it, as I have done below
          if (res.status >= 400) {
            throw new Error("Server responds with error!");
          }
          return res.json();
        })
        .then(
          (users) => {
            setEmployeeTraining(users.items);
          },

          (err) => {
            const mute = err;
            setHasError(true);
          }
        );
    };
    getUsers();
  }, []);

  // Get Employee Education Data
  useEffect(() => {
    const getUsers = () => {
      fetch(`/ords/hrm/emp_edu/${emp_id}`)
        .then((res) => {
          // You have to send it, as I have done below
          if (res.status >= 400) {
            throw new Error("Server responds with error!");
          }
          return res.json();
        })
        .then(
          (users) => {
            setEmployeeEducation(users.items);
          },

          (err) => {
            const mute = err;
            setHasError(true);
          }
        );
    };
    getUsers();
  }, []);

  // Get Employee Children Data
  useEffect(() => {
    const getUsers = () => {
      fetch(`/ords/hrm/emp_chi/e/${emp_id}`)
        .then((res) => {
          // You have to send it, as I have done below
          if (res.status >= 400) {
            throw new Error("Server responds with error!");
          }
          return res.json();
        })
        .then(
          (users) => {
            setEmployeeChildren(users.items);
          },

          (err) => {
            const mute = err;
            setHasError(true);
          }
        );
    };
    getUsers();
  }, []);

  // Get Employee Doc Data
  useEffect(() => {
    const getUsers = () => {
      fetch(`/ords/hrm/emp_doc/v_emp_doc/e/${emp_id}`)
        .then((res) => {
          // You have to send it, as I have done below
          if (res.status >= 400) {
            throw new Error("Server responds with error!");
          }
          return res.json();
        })
        .then(
          (users) => {
            setEmployeeDoc(users.items);
          },

          (err) => {
            const mute = err;
            setHasError(true);
          }
        );
    };
    getUsers();
  }, []);

  return (
    <div className="page-wrapper">
      <div className="text-end mt-4 me-5 mb-5">
        <button
          className="bgColor rounded py-1 px-2 text-white"
          onClick={handlePrint}
        >
          Print this out!
        </button>
      </div>
      <div>
        <Helmet>
          <title>Employee Profile - HR</title>
          <meta name="description" content="Reactify Blank Page" />
        </Helmet>
        {/* Page Content */}

        <div className="content text-start container-fluid">
          <div ref={componentRef}>
            <div className="m-5">
              {/* /Page Header */}
              <div className="card mb-0 ">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="profile-view">
                        <div className="profile-img-wrap">
                          {employeeData.photo_path ? (
                            <div className="profile-img">
                              <img
                                className="avatar"
                                src={` http://${Api}/static${employeeData.photo_path}`}
                              />
                            </div>
                          ) : (
                            <div className="profile-img">
                              <img className="avatar" src={placeholderImg} />
                            </div>
                          )}
                        </div>

                        <div className="profile-basic">
                          <div className="row row-cols-2 row-cols-lg-2">
                            <div className="col-md-5 ">
                              <div className="profile-info-left">
                                <h3 className="user-name m-t-0 mb-0">
                                  {employeeData.name_english}
                                </h3>
                                <h5 className="personal-title text-secondary">
                                  {employeeData.designation} ( {employeeData.departement} )
                                </h5>
                                {/* <h6 className="personal-title">
                              {employeeData.departement}
                            </h6> */}
                                <div className="smart-text">
                                  Employee ID :{" "}
                                  {employeeData.employe_registration_number}
                                  <span style={{ color: "transparent" }}>.</span>
                                </div>
                                <div className="smart-text">
                                  Cadre: {employeeData.cadre}{" "}
                                  <span style={{ color: "transparent" }}>.</span>
                                </div>
                                <div className="smart-text">
                                  Joining Date : {employeeData.joining_date}
                                  <span style={{ color: "transparent" }}>.</span>
                                </div>
                                <div className="smart-text">
                                  {" "}
                                  PRL Date : {employeeData.lrp_date}
                                  <span style={{ color: "transparent" }}>.</span>
                                </div>
                                <div className="smart-text">
                                  {" "}
                                  Date of Confirmation :{" "}
                                  {employeeData.date_confirmation}
                                  <span style={{ color: "transparent" }}>.</span>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-7 ">
                              <ul className="personal-info">
                                <li>
                                  <div className="title">Contact No :</div>
                                  <div className="text">

                                    {employeeData.mobile_phone}{" "}
                                    <span style={{ color: "transparent" }}>
                                      .
                                    </span>

                                  </div>
                                </li>
                                <li>
                                  <div className="title">Email Address:</div>
                                  <div className="text">

                                    {employeeData.email_adress}{" "}
                                    <span style={{ color: "transparent" }}>
                                      .
                                    </span>

                                  </div>
                                </li>
                                <li>
                                  <div className="title">NID Card ID:</div>
                                  <div className="text">
                                    {employeeData.card_id}{" "}
                                    <span style={{ color: "transparent" }}>
                                      .
                                    </span>
                                  </div>
                                </li>
                                <li>
                                  <div className="title">Official Address:</div>
                                  <div className="text">
                                    {employeeData.official_adress_adress}{" "}
                                    <span style={{ color: "transparent" }}>
                                      .
                                    </span>
                                  </div>
                                </li>
                                <li>
                                  <div className="title">Date of Birth:</div>
                                  <div className="text">
                                    {employeeData.date_birth}{" "}
                                    <span style={{ color: "transparent" }}>
                                      .
                                    </span>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="tab-content">
                {/* Profile Info Tab */}
                <div
                  id="emp_profile"
                  className="pro-overview tab-pane fade show active"
                >
                  <div className="row row-cols-2 row-cols-lg-2">
                    {/* ----------------------------------------------------Employee Information */}
                    <div className="col-md-6 d-flex">
                      <div className="card profile-box flex-fill">
                        <div className="card-body">
                          <h3 className="card-title">Employee Information </h3>
                          <ul className="personal-info">
                            <li>
                              <div className="title">Employee ID.</div>
                              <div className="text">
                                {employeeData.employe_registration_number}{" "}
                                <span style={{ color: "transparent" }}>.</span>
                              </div>
                            </li>
                            <li>
                              <div className="title">NID No</div>
                              <div className="text">
                                {employeeData.card_id}{" "}
                                <span style={{ color: "transparent" }}>.</span>
                              </div>
                            </li>
                            <li>
                              <div className="title">Name (English)</div>
                              <div className="text">
                                {employeeData.name_english}{" "}
                                <span style={{ color: "transparent" }}>.</span>
                              </div>
                            </li>
                            <li>
                              <div className="title">Name (Bangla)</div>
                              <div className="text">
                                {employeeData.name_bangla}{" "}
                                <span style={{ color: "transparent" }}>.</span>
                              </div>
                            </li>
                            <li>
                              <div className="title">
                                Father's Name (English)
                              </div>
                              <div className="text">
                                {employeeData.fater_englih}{" "}
                                <span style={{ color: "transparent" }}>.</span>
                              </div>
                            </li>
                            <li>
                              <div className="title">
                                Father's Name (Bangla)
                              </div>
                              <div className="text">
                                {" "}
                                {employeeData.father_bangla}{" "}
                                <span style={{ color: "transparent" }}>.</span>
                              </div>
                            </li>
                            <li>
                              <div className="title">
                                Mother's Name (English)
                              </div>
                              <div className="text">
                                {employeeData.mother_english}{" "}
                                <span style={{ color: "transparent" }}>.</span>
                              </div>
                            </li>
                            <li>
                              <div className="title">
                                Mother's Name (Bangla)
                              </div>
                              <div className="text">
                                {employeeData.mother_bangla}{" "}
                                <span style={{ color: "transparent" }}>.</span>
                              </div>
                            </li>
                            <li>
                              <div className="title">Mobile</div>
                              <div className="text">
                                {employeeData.mobile_phone}{" "}
                                <span style={{ color: "transparent" }}>.</span>
                              </div>
                            </li>
                            <li>
                              <div className="title">Date of Birth</div>
                              <div className="text">
                                {employeeData.date_birth}{" "}
                                <span style={{ color: "transparent" }}>.</span>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* ------------------------------------------------------Job Information */}
                    <div className="col-md-6 d-flex">
                      <div className="card profile-box flex-fill">
                        <div className="card-body">
                          <h3 className="card-title">Job Information </h3>

                          <ul className="personal-info">
                            <li>
                              <div className="title">Designation</div>
                              <div className="text">
                                {employeeData.designation}{" "}
                                <span style={{ color: "transparent" }}>.</span>
                              </div>
                            </li>
                            <li>
                              <div className="title">Department</div>
                              <div className="text">
                                {employeeData.departement}{" "}
                                <span style={{ color: "transparent" }}>.</span>
                              </div>
                            </li>
                            <li>
                              <div className="title">Cadre </div>
                              <div className="text">
                                {employeeData.cadre}{" "}
                                <span style={{ color: "transparent" }}>.</span>
                              </div>
                            </li>

                            <li>
                              <div className="title">Email Address</div>
                              <div className="text">
                                {employeeData.email_adress}{" "}
                                <span style={{ color: "transparent" }}>.</span>
                              </div>
                            </li>
                            <li>
                              <div className="title">Phone</div>
                              <div className="text">
                                {employeeData.telephone_number}
                                <span style={{ color: "transparent" }}>
                                  .
                                </span>
                              </div>
                            </li>
                            <li>
                              <div className="title">Joining Date </div>
                              <div className="text">
                                {employeeData.joining_date}{" "}
                                <span style={{ color: "transparent" }}>.</span>
                              </div>
                            </li>
                            <li>
                              <div className="title">PRL Date </div>
                              <div className="text">
                                {employeeData.lrp_date}{" "}
                                <span style={{ color: "transparent" }}>.</span>
                              </div>
                            </li>
                            <li>
                              <div className="title">Date of Confirmation </div>
                              <div className="text">
                                {employeeData.date_confirmation}{" "}
                                <span style={{ color: "transparent" }}>.</span>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row row-cols-2 row-cols-lg-2">
                    {/* ---------------------------------------------General Information */}

                    <div className="col-md-6 d-flex">
                      <div className="card profile-box flex-fill">
                        <div className="card-body">
                          <h3 className="card-title">General Information</h3>
                          <ul className="personal-info">
                            <li>
                              <div className="title">Employee Blood</div>
                              <div className="text">
                                {employeeData.blood_group}{" "}
                                <span style={{ color: "transparent" }}>.</span>
                              </div>
                            </li>
                            <li>
                              <div className="title">Religion</div>
                              <div className="text">
                                {employeeData.religion}{" "}
                                <span style={{ color: "transparent" }}>.</span>
                              </div>
                            </li>
                            <li>
                              <div className="title">Gender</div>
                              <div className="text">
                                {employeeData.gender}{" "}
                                <span style={{ color: "transparent" }}>.</span>
                              </div>
                            </li>
                            <li>
                              <div className="title">Quota</div>
                              <div className="text">
                                {employeeData.freedom_fighter === "Yes"
                                  ? "Freedom Fighter,"
                                  : ""}{" "}
                                {employeeData.grandchild_ff === "Yes"
                                  ? "Grand Child_FF,"
                                  : ""}{" "}
                                {employeeData.tribal === "Yes" ? "Tribal" : ""}{" "}
                                <span style={{ color: "transparent" }}>.</span>
                              </div>
                            </li>
                            <li>
                              <div className="title">Nationality</div>
                              <div className="text">
                                {employeeData.nationality}{" "}
                                <span style={{ color: "transparent" }}>.</span>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* -------------------------------------Emergency Contact */}
                    <div className="col-md-6 d-flex">
                      <div className="card profile-box flex-fill">
                        <div className="card-body">
                          <h3 className="card-title">Emergency Contact</h3>

                          <ul className="personal-info">
                            <li>
                              <div className="title">Name</div>
                              <div className="text">
                                {employeeData.emergency_contact}
                                <span style={{ color: "transparent" }}>
                                  .
                                </span>
                              </div>
                            </li>
                            <li>
                              <div className="title">Relation</div>
                              <div className="text">
                                {employeeData.emergency_relation}
                                <span style={{ color: "transparent" }}>
                                  .
                                </span>
                              </div>
                            </li>
                            <li>
                              <div className="title">Phone Number </div>
                              <div className="text">
                                {employeeData.emergency_phone}
                                <span style={{ color: "transparent" }}>
                                  .
                                </span>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Address Informations */}

                  <div className="row row-cols-3 row-cols-lg-3">
                    {/* --------------------------------------------Present Address */}

                    <div className="col-md-4 d-flex">
                      <div className="card profile-box flex-fill">
                        <div className="card-body">
                          <h3 className="card-title">Present Address </h3>
                          <ul className="personal-info">
                            <li>
                              <div className="title">
                                Village/House No. Road
                              </div>
                              <div className="text">
                                {employeeData.present_adress_adress}{" "}
                                <span style={{ color: "transparent" }}>.</span>
                              </div>
                            </li>
                            <li>
                              <div className="title">Post Office</div>
                              <div className="text">
                                {employeeData.present_adress_po}{" "}
                                <span style={{ color: "transparent" }}>.</span>
                              </div>
                            </li>
                            <li>
                              <div className="title">Upazila</div>
                              <div className="text">
                                {employeeData.present_adress_upazilla}{" "}
                                <span style={{ color: "transparent" }}>.</span>
                              </div>
                            </li>
                            <li>
                              <div className="title">District</div>
                              <div className="text">
                                {employeeData.pre_district_name}{" "}
                                <span style={{ color: "transparent" }}>.</span>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* -------------------------------------Permanent Address */}
                    <div className="col-md-4 d-flex">
                      <div className="card profile-box flex-fill">
                        <div className="card-body">
                          <h3 className="card-title">Permanent Address</h3>

                          <ul className="personal-info">
                            <li>
                              <div className="title">
                                Village/House No. Road
                              </div>
                              <div className="text">
                                {employeeData.permanent_adress_adress}{" "}
                                <span style={{ color: "transparent" }}>.</span>
                              </div>
                            </li>
                            <li>
                              <div className="title">Post Office</div>
                              <div className="text">
                                {employeeData.permanent_adress_po}{" "}
                                <span style={{ color: "transparent" }}>.</span>
                              </div>
                            </li>
                            <li>
                              <div className="title">Upazila</div>
                              <div className="text">
                                {employeeData.permanent_adress_upazilla}{" "}
                                <span style={{ color: "transparent" }}>.</span>
                              </div>
                            </li>
                            <li>
                              <div className="title">District</div>
                              <div className="text">
                                {employeeData.per_district_name}{" "}
                                <span style={{ color: "transparent" }}>.</span>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* ----------------------------------------Official Address */}
                    <div className="col-md-4 d-flex">
                      <div className="card profile-box flex-fill">
                        <div className="card-body">
                          <h3 className="card-title">Official Address</h3>

                          <ul className="personal-info">
                            <li>
                              <div className="title">
                                Village/House No. Road
                              </div>
                              <div className="text">
                                {employeeData.official_adress_adress}
                                <span style={{ color: "transparent" }}>
                                  .
                                </span>
                              </div>
                            </li>
                            <li>
                              <div className="title">Post Office</div>
                              <div className="text">
                                {employeeData.official_adress_po}
                                <span style={{ color: "transparent" }}>
                                  .
                                </span>
                              </div>
                            </li>
                            <li>
                              <div className="title">Upazila</div>
                              <div className="text">
                                {employeeData.official_adress_upazilla}
                                <span style={{ color: "transparent" }}>
                                  .
                                </span>
                              </div>
                            </li>
                            <li>
                              <div className="title">District</div>
                              <div className="text">
                                {employeeData.off_district_name}
                                <span style={{ color: "transparent" }}>
                                  .
                                </span>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/*Spouse Information and children information  */}
                  <div className="row row-cols-1 row-cols-lg-1">
                    {/* ---------------------------------------------Spouse Information */}

                    <div className="col-md-5 d-flex">
                      <div className="card profile-box flex-fill">
                        <div className="card-body">
                          <h3 className="card-title">Spouse Information </h3>

                          <h2 className=" text-start spouse-img mb-3">
                            {employeeData.spouse_photo ? (
                              <div>
                                <img
                                  className="avatar"
                                  src={`http://${Api}/static${employeeData.spouse_photo}`}
                                />
                              </div>
                            ) : (
                              <div>
                                <img
                                  className="profile-img"
                                  src={placeholderImg}
                                />
                              </div>
                            )}
                          </h2>
                          <ul className="personal-info">
                            <li>
                              <div className="title">Spoue Name</div>
                              <div className="text">
                                {employeeData.spouse_name}
                                <span style={{ color: "transparent" }}>
                                  .
                                </span>
                              </div>
                            </li>

                            <li>
                              <div className="title">Nationality</div>
                              <div className="text">
                                {employeeData.spouse_nationality}
                                <span style={{ color: "transparent" }}>
                                  .
                                </span>
                              </div>
                            </li>
                            <li>
                              <div className="title">National ID No</div>
                              <div className="text">
                                {employeeData.spouse_card_id}
                                <span style={{ color: "transparent" }}>
                                  .
                                </span>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="my-5">
                      <span style={{ color: "transparent" }}>.</span>
                    </div>

                    {/* -------------------------------------Children Information */}
                    <div className="col-md-7 d-flex">
                      <div className="card profile-box flex-fill">
                        <div className="card-body">
                          <h3 className="card-title">Children Information</h3>
                          <div className="col-auto float-right ml-auto"></div>
                          <div className=" ">
                            <table className="table  ">
                              <thead>
                                <tr>
                                  <th>Name</th>
                                  <th>Gender</th>
                                  <th>Birth Date</th>
                                  <th>School</th>
                                  <th>Class</th>
                                  <th>Certificate</th>
                                </tr>
                              </thead>
                              <tbody>
                                {employeeChildren.map((item) => (
                                  <tr>
                                    <td>
                                      <h2 className="table-avatar">
                                        {item.child_photo_path ? (
                                          <div className="table-img">
                                            <img
                                              className="avatar"
                                              src={`http://${Api}/static${item.child_photo_path}`}
                                            />
                                          </div>
                                        ) : (
                                          <div>
                                            <img
                                              className="avatar"
                                              src={placeholderImg}
                                            />
                                          </div>
                                        )}
                                        <p>
                                          <span className="fs-6">
                                            {item.child_name}
                                          </span>
                                        </p>
                                      </h2>
                                    </td>
                                    <td>{item.gender}</td>
                                    <td>{item.date_birth}</td>
                                    <td>{item.school}</td>
                                    <td>{item.child_class}</td>
                                    <td>{item.certificate_file}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* -------------------------------------Education */}
                  <div className="row">
                    <div className="col-md-12 d-flex">
                      <div className="card profile-box flex-fill">
                        <div className="card-body">
                          <div className="">
                            <h3 className="card-title">Education</h3>
                          </div>
                          <div className="">
                            <table className="table  ">
                              <thead>
                                <tr>
                                  <th>Institution Name</th>
                                  <th>Principal Subject</th>
                                  <th>Degree</th>
                                  <th>Passing Year</th>
                                  <th>Education Result</th>
                                  <th>Distinction</th>
                                </tr>
                              </thead>
                              <tbody>
                                {employeeEducation.map((item) => (
                                  <tr>
                                    <td>{item.name_institution}</td>
                                    <td>{item.principal_subject}</td>
                                    <td>{item.degree_diploma}</td>
                                    <td>{item.passigne_year}</td>
                                    <td>{item.education_result}</td>
                                    <td>{item.distinction}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* -------------------------------------Documents */}
                  <div className="row row-cols-1 row-cols-lg-1">
                    <div className="col-md-12 d-flex">
                      <div className="card profile-box flex-fill">
                        <div className="card-body">
                          <h3 className="card-title">Documents </h3>
                          <div className="">
                            <table className="table  ">
                              <thead>
                                <tr>
                                  <th>Doc ID</th>
                                  <th>Document Type</th>
                                  <th>File Name</th>
                                  <th>Creation Date</th>
                                  <th>MEMO</th>
                                </tr>
                              </thead>
                              <tbody>
                                {employeeDoc.map((item) => (
                                  <tr>
                                    <td>{item.employee_doc_id}</td>
                                    <td>{item.document_type}</td>
                                    <td>{item.employee_doc}</td>
                                    <td>{item.date_creation}</td>
                                    <td>{item.memo}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* -------------------------------------Discipline */}
                  <div className="row" id="disciplineHash">
                    <div className="col-md-12 d-flex">
                      <div className="card profile-box flex-fill">
                        <div className="card-body">
                          <h3 className="card-title">Discipline </h3>

                          <div className="">
                            <table className="table  ">
                              <thead>
                                <tr>
                                  <th>
                                    Offence <br /> Description
                                  </th>
                                  <th>
                                    Punishment <br /> Name
                                  </th>
                                  <th>
                                    Punishment <br /> Memo Date
                                  </th>
                                  <th>
                                    Punishment <br /> Memo N
                                  </th>
                                  <th>Appeal</th>
                                  <th>
                                    Release <br /> Memo N
                                  </th>
                                  <th>
                                    Release <br /> Memo Date
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {employeeDiscipline.map((item) => (
                                  <tr>
                                    <td> {item.offence_description}</td>
                                    <td>{item.name_punishement}</td>
                                    <td>{item.punishement_memo_date}</td>
                                    <td>{item.punishement_memo_n}</td>
                                    <td>{item.appeal}</td>
                                    <td>{item.release_memo_n}</td>
                                    <td>{item.release_memo_date}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* -------------------------------------Health */}
                  <div className="row" id="healthHash">
                    <div className="col-md-12 d-flex">
                      <div className="card profile-box flex-fill">
                        <div className="card-body">
                          <h3 className="card-title">Health</h3>

                          <div className=" ">
                            <table className="table ">
                              <thead>
                                <tr>
                                  <th>Health ID</th>
                                  <th>Health Info</th>
                                  <th>From Date</th>
                                  <th>To Date</th>
                                  <th>Height</th>
                                  <th>Weight</th>
                                  <th>Visual Power</th>
                                  <th>Blood Pressure</th>
                                  <th>Medical Classification</th>
                                  <th>Health Weakness</th>
                                </tr>
                              </thead>
                              <tbody>
                                {employeeHealth.map((item) => (
                                  <tr>
                                    <td> {item.employee_health_id}</td>
                                    <td>{item.health_info}</td>
                                    <td>{item.date_from}</td>
                                    <td>{item.date_to}</td>
                                    <td>{item.height}</td>
                                    <td>{item.weight}</td>
                                    <td>{item.visual_power}</td>
                                    <td>{item.blood_pressure}</td>
                                    <td>{item.medical_classification}</td>
                                    <td>{item.health_weakness}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="my-5">
                    <span style={{ color: "transparent" }}>.</span>
                  </div>
                  <div className="my-5">
                    <span style={{ color: "transparent" }}>.</span>
                  </div>
                  {/* -------------------------------------Promotion */}
                  <div className="row" id="promotionHash">
                    <div className="col-md-12 d-flex">
                      <div className="card profile-box flex-fill">
                        <div className="card-body">
                          <h3 className="card-title">Promotion</h3>
                          <div className="table-responsive">
                            <table className="table  ">
                              <thead>
                                <tr>
                                  <th>Type</th>
                                  <th>Designation</th>
                                  <th>Organization</th>
                                  <th>Posting Type</th>
                                  <th>Location</th>
                                  <th>Promotion/Charge Date</th>
                                  <th>Date From</th>
                                  <th>Date To</th>
                                </tr>
                              </thead>
                              <tbody>
                                {employeePromotion.map((item) => (
                                  <tr>
                                    <td> {item.type_promotion}</td>
                                    <td>{item.designation}</td>
                                    <td>{item.organization}</td>
                                    <td>{item.type_posting}</td>
                                    <td>{item.location}</td>
                                    <td>{item.promotion_date}</td>
                                    <td>{item.date_from}</td>
                                    <td>{item.date_to}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* -------------------------------------Post */}
                  <div className="row" id="postHash">
                    <div className="col-md-12 d-flex">
                      <div className="card profile-box flex-fill">
                        <div className="card-body">
                          <h3 className="card-title">Post </h3>
                          <div className="overflow-auto">
                            <table className="table table-nowrap">
                              <thead>
                                <tr>
                                  <th>Designation</th>
                                  <th>Post</th>
                                  <th>Institute Name</th>
                                  <th>Grade</th>
                                  <th>From</th>
                                  <th>To</th>
                                  <th>Place From</th>
                                  <th>Place To</th>
                                  <th>Detail</th>
                                </tr>
                              </thead>
                              <tbody>
                                {employeePost.map((item) => (
                                  <tr>
                                    <td> {item.designation}</td>
                                    <td>{item.post}</td>
                                    <td>{item.institute_name}</td>
                                    <td>{item.grade}</td>
                                    <td>{item.pos_from_date}</td>
                                    <td>{item.pos_to_date}</td>
                                    <td>{item.place_from}</td>
                                    <td>{item.place_to}</td>
                                    <td>{item.details}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* -------------------------------------Training */}
                  <div className="row" id="trainingHash">
                    <div className="col-md-12 d-flex">
                      <div className="card profile-box flex-fill">
                        <div className="card-body">
                          <h3 className="card-title">Training</h3>

                          <div className="">
                            <table className="table  ">
                              <thead>
                                <tr>
                                  <th>Course Title</th>
                                  <th>Training Type</th>
                                  <th>From Date</th>
                                  <th>To Date</th>
                                  <th>Position</th>
                                  <th>Institution</th>
                                </tr>
                              </thead>
                              <tbody>
                                {employeeTraining.map((item) => (
                                  <tr>
                                    <td>{item.course_title}</td>
                                    <td>{item.training_type}</td>
                                    <td>{item.date_from}</td>
                                    <td>{item.date_to}</td>
                                    <td>{item.position}</td>
                                    <td>{item.institution}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* -------------------------------------Leave */}
                  <div className="row" id="leaveHash">
                    <div className="col-md-12 d-flex">
                      <div className="card profile-box flex-fill">
                        <div className="card-body">
                          <div className="">
                            <h3 className="card-title">Leave </h3>
                          </div>
                          <div className="">
                            <table className="table  ">
                              <thead>
                                <tr>
                                  <th>ID</th>
                                  <th>Leave</th>
                                  <th>Cause</th>
                                  <th>From Date</th>
                                  <th>To Date</th>
                                  <th>Duration</th>
                                  <th>Status</th>
                                </tr>
                              </thead>
                              <tbody>
                                {employeeLeave.map((item) => (
                                  <tr>
                                    <td> {item.employee_leave_id}</td>
                                    <td>{item.leave_type}</td>
                                    <td>{item.cause}</td>
                                    <td>{item.date_from}</td>
                                    <td>{item.date_to}</td>
                                    <td>{item.duration}</td>
                                    <td>{item.status}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* -------------------------------------Loan */}
                  <div className="row" id="loanHash">
                    <div className="col-md-12 d-flex">
                      <div className="card profile-box flex-fill">
                        <div className="card-body">
                          <div className="">
                            <h3 className="card-title">Loan</h3>
                          </div>
                          <div className="">
                            <table className="table  ">
                              <thead>
                                <tr>
                                  <th>ID</th>
                                  <th>Request Date</th>
                                  <th>Loan Type</th>
                                  <th>Loan Funds</th>
                                  <th>Amount</th>
                                  <th>Sanction Date</th>
                                  <th>Status</th>
                                </tr>
                              </thead>
                              <tbody>
                                {employeeLoan.map((item) => (
                                  <tr>
                                    <td> {item.employe_loan_id}</td>
                                    <td>{item.date_status}</td>
                                    <td>{item.loan_type}</td>
                                    <td>{item.loan_funds}</td>
                                    <td>{item.loan_amount}</td>
                                    <td>{item.sanction_date}</td>
                                    <td>{item.status}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
