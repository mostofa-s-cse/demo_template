/**
 * App Header
 */

import React, { useEffect, useState } from "react";
import { Outlet, withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";

import "../../assets/css/font-awesome.min.css";
import "../../assets/css/line-awesome.min.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "../../assets/css/bootstrap.min.css";

//  Custom Style File
//  import '../../assets/js/bootstrap';
import "../../assets/css/select2.min.css";

//  import '../../assets/js/popper.min.js';
import "../../assets/js/app";
//  import '../../assets/js/select2.min.js';
//  import '../../assets/js/jquery-3.2.1.min.js'
// import '../../assets/js/jquery.slimscroll.js';
// import '../../assets/js/jquery.slimscroll.min.js';

//  import "../../assets/js/bootstrap-datetimepicker.min.js";
//  import "../../assets/js/jquery-ui.min.js";
//  import "../../assets/js/task.js";
//  import "../../assets/js/multiselect.min.js";
import "../../assets/plugins/bootstrap-tagsinput/bootstrap-tagsinput.css";
import "../../assets/css/bootstrap-datetimepicker.min.css";
import "../../assets/css/style.css";
import { useLocation } from "react-router-dom";
import Cookies from 'js-cookie'
import swal from "sweetalert";
// import { ProSidebar } from 'react-pro-sidebar';
// // import 'react-pro-sidebar/dist/css/styles.css';
const Pndsidebar = (props) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  let logId = window.sessionStorage.getItem("u_id");
  let moduleId = parseInt(window.sessionStorage.getItem("moduleId"));
  let adSubModule = parseInt(window.sessionStorage.getItem("adSubModule"));
  const location = useLocation();
  let pathname = location.pathname;
  let secretId = window.sessionStorage.getItem("u_id");
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
            setIsLoading(true);
          },
          (err) => {
            setHasError(true);
            setIsLoading(true);
          }
        );
    };

    getUsers();
  }, []);
  const oldStatus = sessionStorage.getItem('statusId')
  const logInStatus = Cookies.get('Role')

  if (!logInStatus && oldStatus) {
    swal({
      title: "Your session has expired, please login",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          window.location.reload();
        } else {
          window.location.reload();
        }
      });
    sessionStorage.removeItem('statusId');
  }


  return (
    <div className="sidebar" id="sidebar">
      <div className="sidebar-inner overflow-auto">
        <div id="sidebar-menu" className="sidebar-menu">
          <ul>
            <li className={pathname.includes("/") ? "active" : ""}>
              <a href="/">
                <i className="la la-home" /> <span>Home</span>
              </a>
            </li>
            <li className={pathname.includes("/") ? "active" : ""}>
              <Link to="/">
                <i className="la la-home" /> <span> Dashboard</span>
              </Link>
            </li>

            {/* <li className={pathname.includes("/store") ? "active" : ""}>
              <Link to="/newRequision">
                <i className="la la-newspaper" /> <span>Requisition</span>
              </Link>
            </li> */}

            {/* <li className={pathname.includes("/store") ? "active" : ""}>
              <Link to="/feasibilityStudy">
                <i className="la la-newspaper" />
                <span>Feasibility Study</span>
              </Link>
            </li> */}

            {/* Feasibility Study Menu */}
            <li className="submenu text-start">
              <a href="#">
                <i className="la la-newspaper" />{" "}
                <span> Feasibility Study</span> <span className="menu-arrow" />
              </a>
              <ul style={{ display: "none" }}>
                <li>
                  <Link
                    className={
                      pathname.includes("/feasibilityCreate") ? "active" : ""
                    }
                    to="/feasibilityCreate"
                  >
                    Create
                  </Link>
                </li>

                <li>
                  <Link
                    className={
                      pathname.includes("/feasibilityManage") ? "active" : ""
                    }
                    to="/feasibilityManage"
                  >
                    Manage
                  </Link>
                </li>
              </ul>
            </li>

            {/* Constructions Menu */}
            <li className="submenu text-start">
              <a href="#">
                <i className="la la-newspaper" />{" "}
                <span> On Going Projects</span> <span className="menu-arrow" />
              </a>
              <ul style={{ display: "none" }}>
                <li>
                  <Link
                    className={
                      pathname.includes("/constructionsCreate") ? "active" : ""
                    }
                    to="/constructionsCreate"
                  >
                    Create
                  </Link>
                </li>

                <li>
                  <Link
                    className={
                      pathname.includes("/constructionsManage") ? "active" : ""
                    }
                    to="/constructionsManage"
                  >
                    Manage
                  </Link>
                </li>
              </ul>
            </li>

            {/* PipeLine Menu */}
            <li className="submenu text-start">
              <a href="#">
                <i className="la la-newspaper" /> <span> Pipeline</span>{" "}
                <span className="menu-arrow" />
              </a>
              <ul style={{ display: "none" }}>
                <li>
                  <Link
                    className={
                      pathname.includes("/PipelineCreate") ? "active" : ""
                    }
                    to="/PipelineCreate"
                  >
                    Create
                  </Link>
                </li>

                <li>
                  <Link
                    className={
                      pathname.includes("/pipelineManage") ? "active" : ""
                    }
                    to="/pipelineManage"
                  >
                    Manage
                  </Link>
                </li>
              </ul>
            </li>

            {/* Project Progress Menu */}
            <li className="submenu text-start">
              <a href="#">
                <i className="la la-newspaper" /> <span> Project Progress</span>{" "}
                <span className="menu-arrow" />
              </a>
              <ul style={{ display: "none" }}>
                <li>
                  <Link
                    className={
                      pathname.includes("/projectProgressCreate")
                        ? "active"
                        : ""
                    }
                    to="/projectProgressCreate"
                  >
                    Create
                  </Link>
                </li>

                <li>
                  <Link
                    className={
                      pathname.includes("/projectProgressManage")
                        ? "active"
                        : ""
                    }
                    to="/projectProgressManage"
                  >
                    Manage
                  </Link>
                </li>

                <li>
                  <Link
                    className={
                      pathname.includes("/projectProgressGallery")
                        ? "active"
                        : ""
                    }
                    to="/projectProgressGallery"
                  >
                    Photo Gallery
                  </Link>
                </li>
              </ul>
            </li>

            {/* Operations Menu */}
            <li className="submenu text-start">
              <a href="#">
                <i className="la la-newspaper" /> <span> O & M</span>{" "}
                <span className="menu-arrow" />
              </a>
              <ul style={{ display: "none" }}>
                <li>
                  <Link
                    className={
                      pathname.includes("/operationsCreate") ? "active" : ""
                    }
                    to="/operationsCreate"
                  >
                    Create
                  </Link>
                </li>

                <li>
                  <Link
                    className={
                      pathname.includes("/operationsManage") ? "active" : ""
                    }
                    to="/operationsManage"
                  >
                    Manage
                  </Link>
                </li>
              </ul>
            </li>

            {/* PPP Cell Menu */}
            <li className="submenu text-start">
              <a href="javascript:void(0);">
                <i className="la la-share-alt"></i> <span>PPP Cell</span>{" "}
                <span className="menu-arrow"></span>
              </a>
              <ul>
                <li>
                  <Link
                    className={
                      pathname.includes("/pppcell/about") ? "active" : ""
                    }
                    to="/pppcell/about"
                  >
                    About <br /> PPP Cell
                  </Link>
                </li>
                <li className="submenu">
                  <a href="javascript:void(0);">
                    {" "}
                    <span>Upcoming <br />PPP Project</span>{" "}
                    <span className="menu-arrow"></span>
                  </a>
                  <ul>
                    <li>
                      <Link
                        className={
                          pathname.includes("/UpComingPPPCell/create")
                            ? "active"
                            : ""
                        }
                        to="/UpComingPPPCell/create"
                      >
                        Create
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={
                          pathname.includes("/UpComingPPPCell/manage")
                            ? "active"
                            : ""
                        }
                        to="/UpComingPPPCell/manage"
                      >
                        Manage
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="submenu">
                  <a href="javascript:void(0);">
                    {" "}
                    <span>On Going <br />PPP Project</span>{" "}
                    <span className="menu-arrow"></span>
                  </a>
                  <ul>
                    <li>
                      <Link
                        className={
                          pathname.includes("/OnGoingPPPCell/create")
                            ? "active"
                            : ""
                        }
                        to="/OnGoingPPPCell/create"
                      >
                        Create
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={
                          pathname.includes("/OnGoingPPPCell/manage")
                            ? "active"
                            : ""
                        }
                        to="/OnGoingPPPCell/manage"
                      >
                        Manage
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>

            {/* FAQ Menu */}
            <li className="submenu text-start">
              <a href="#">
                <i className="la la-newspaper" /> <span> FAQ</span>{" "}
                <span className="menu-arrow" />
              </a>
              <ul style={{ display: "none" }}>
                <li>
                  <Link
                    className={pathname.includes("/faq") ? "active" : ""}
                    to="/faq"
                  >
                    Create
                  </Link>
                </li>
              </ul>
            </li>

            {/* Settings Menu */}
            <li className="submenu text-start">
              <a href="#">
                <i className="la la-cog" /> <span> Settings</span>{" "}
                <span className="menu-arrow" />
              </a>
              <ul style={{ display: "none" }}>
                <li>
                  <Link
                    className={
                      pathname.includes("/pndSinglePage") ? "active" : ""
                    }
                    to="/pndSinglePage"
                  >
                    FCP
                  </Link>
                </li>

                <li>
                  <Link
                    className={
                      pathname.includes("/componentData") ? "active" : ""
                    }
                    to="/componentData"
                  >
                    Component Data
                  </Link>
                </li>

                <li>
                  <Link
                    className={
                      pathname.includes("/projectData") ? "active" : ""
                    }
                    to="/projectData"
                  >
                    Project Data
                  </Link>
                </li>
              </ul>
            </li>

            {/* Product Menu */}
            {/* <li className="submenu text-start">
              <a href="#">
                <i className="la la-gift" /> <span> Products</span>{" "}
                <span className="menu-arrow" />
              </a>
              <ul style={{ display: "none" }}>
                <li>
                  <Link
                    className={
                      pathname.includes("/admindashboard") ? "active" : ""
                    }
                    to="/product/new"
                  >
                    New Entry
                  </Link>
                </li>

                <li>
                  <Link
                    className={
                      pathname.includes("/admindashboard") ? "active" : ""
                    }
                    to="/product/existing"
                  >
                    Existing Entry
                  </Link>
                </li>

                <li>
                  <Link
                    className={
                      pathname.includes("/admindashboard") ? "active" : ""
                    }
                    to="/product/manage"
                  >
                    List
                  </Link>
                </li>

                <li>
                  <Link
                    className={
                      pathname.includes("/admindashboard") ? "active" : ""
                    }
                    to="/manageSupplier"
                  >
                    MMR
                  </Link>
                </li>
              </ul>
            </li> */}

            {/* Reports Menu */}
            {/* <li className="submenu text-start">
              <a href="#">
                <i className="la la-line-chart" /> <span> Reports</span>{" "}
                <span className="menu-arrow" />
              </a>
              <ul style={{ display: "none" }}>
                <li>
                  <Link
                    className={
                      pathname.includes("/admindashboard") ? "active" : ""
                    }
                    to="/report/products"
                  >
                    Products
                  </Link>
                </li>

                <li>
                  <Link
                    className={
                      pathname.includes("/admindashboard") ? "active" : ""
                    }
                    to="/report/requisitions"
                  >
                    Requistions
                  </Link>
                </li>
              </ul>
            </li> */}

            {/* Settings Menu */}
            {/* <li className="submenu text-start">
              <a href="#">
                <i className="la la-cog" /> <span> Settings</span>{" "}
                <span className="menu-arrow" />
              </a>
              <ul style={{ display: "none" }}>
                <li>
                  <Link
                    className={
                      pathname.includes("/admindashboard") ? "active" : ""
                    }
                    to="/setting/categories"
                  >
                    Categories
                  </Link>
                </li>

                <li>
                  <Link
                    className={
                      pathname.includes("/admindashboard") ? "active" : ""
                    }
                    to="/setting/productList"
                  >
                    Product List
                  </Link>
                </li>

                <li>
                  <Link
                    className={
                      pathname.includes("/admindashboard") ? "active" : ""
                    }
                    to="/setting/unit"
                  >
                    Unit
                  </Link>
                </li>

                <li>
                  <Link
                    className={
                      pathname.includes("/admindashboard") ? "active" : ""
                    }
                    to="/setting/suppliers"
                  >
                    Suppliers
                  </Link>
                </li>
              </ul>
            </li> */}
          </ul>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Pndsidebar;
