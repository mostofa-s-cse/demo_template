import AOS from "aos";
import "aos/dist/aos.css";
import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import {
  estateImg, itImg, landingIcon1, landingIcon3, logImg, storeIcon, transportImg
} from "../../Entryfile/imagepath";
import useAuth from "../hooks/useAuth";
import "./LandingPage.css";

const AdministrationLandingPage = () => {
  const getSecretToken = sessionStorage.getItem("secretToken")
  const { logoutAction, leaseAdmin, user, setUser } = useAuth();
  const navigate = useNavigate()

  console.log(user)
  const roleId = user?.role_id;

  const [userLoginData, setUserLoginData] = useState(user);


  const logOutBtnHandler = () => {
    const statusLog = logoutAction();
    if (statusLog === 1) {
      setUser({});
      navigate('/')
    }
  };



  // useEffect(() => {
  //   setIsLoading(true);
  //   axios
  //     .get(`http://${baseApi}/auth/getLoginUser`)
  //     .then((data) => {
  //       setUserLoginData(data.data.user);
  //     })
  //     .catch((error) => { })
  //     .finally(() => setIsLoading(false));
  // }, []);

  AOS.init();

  let secretId = userLoginData.user_id;

  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // finance ip
  // const [apiData, setApiData] = useState({});
  const [storeApiData, setStoreApiData] = useState({});
  // useEffect(() => {
  //   const getUsers = () => {
  //     setIsLoading(true);
  //     fetch(`/ords/accounts/all_ip`)
  //       .then((res) => {
  //         if (res.status >= 400) {
  //           throw new Error("Server responds with error!");
  //         }
  //         return res.json();
  //       })
  //       .then(
  //         (data) => {
  //           setApiData(data.items[2].ipaddress);
  //           setStoreApiData(data.items[3].ipaddress);
  //           setIsLoading(false)

  //         },
  //         (err) => {
  //           const mute = err;
  //           setHasError(true);
  //           setIsLoading(true);
  //         }
  //       );
  //   };

  //   getUsers();
  // }, []);
  // end
  const hrCardHandle = () => {
    sessionStorage.setItem("adSubModule", 1);
    window.location.href = '/hr/'
  };
  const estateCardHandle = () => {
    if (leaseAdmin.length) {
      sessionStorage.setItem("adSubModule", 2);
      window.location.href = '/hr/lease/leasedashboard'
    }
    else {
      swal({
        title: "You do not have permission to access",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
    }

  };

  const transportCardHandle = () => {
    sessionStorage.setItem("adSubModule", 3);
    window.location.href = '/vehicle/'

  };
  const StoreCardHandle = () => {
    sessionStorage.setItem("adSubModule", 5);
    window.location.href = 'http://192.168.3.7:8081/'
  };
  const bbaArchiveHandler = () => {
    sessionStorage.setItem("adSubModule", 6);
    window.location.href = '/hr/docs'
  }
  const libraryCardHandler = () => {
    if (roleId === 6) {
      window.location.href = 'library/admin'
    }
    else {
      window.location.href = 'library/user/dashboard'
    }

  };
  const itBtnHandler = () => {
    if (getSecretToken) {
      window.location.href = `http://192.168.3.8:8081/itstore/authorization?token=${getSecretToken}`;
    }

  };

  return (
    <div>


      <div className="mt-4 pt-2">
        <div className="text-end me-4">
          <i
            onClick={logOutBtnHandler}
            style={{ cursor: "pointer" }}
            className="la la-power-off fs-4 bg-danger shadow text-white rounded-circle p-2"
            data-bs-toggle="tooltip"
            data-bs-placement="bottom"
            title="Logout"
          ></i>
        </div>
        <div className="container">
          <div className="row superAdmin-page">
            <div className="col-12 ">
              <div>
                <div className="row ">
                  <div className="col d-flex justify-content-start">
                    <img src={landingIcon1} className="header-logo" alt="" />
                  </div>
                  <div className="col d-flex justify-content-center">
                    <h3 className="text-center my-5">
                      <br /> <br />
                      <span className="text-muted fs-3 fw-bold">
                        {" "}
                        Administration Module{" "}
                      </span>
                    </h3>
                  </div>
                  <div className="col d-flex justify-content-end">
                    <img src={logImg} alt="" className="header-logo4" />
                  </div>
                </div>

                <div className="border text-start shadow p-5 rounded-3 mb-5">
                  <div className="row g-lg-5 g-3">
                    <div className="col-sm-2">
                      <div></div>
                    </div>
                    <div className="col-sm-4">
                      <div>
                        <div className="row  ">
                          <div className="col-1"></div>
                          <div
                            onClick={hrCardHandle}
                            className="col-10 wing1 pointer cardHover"
                          >
                            <div className="d-flex justify-content-start ps-4">
                              <div className="">
                                <img
                                  src={landingIcon3}
                                  alt=""
                                  className="icon-size"
                                />
                              </div>
                              <h4 className="ms-3 pt-3 text-white ">
                                Human Resource
                                <br />
                              </h4>
                            </div>
                          </div>
                          <div className="col-1"></div>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div>
                        <div className="row  ">
                          <div className="col-1"></div>
                          <div onClick={bbaArchiveHandler}
                            className="col-10 wing1 pointer cardHover"
                          >
                            <div className="d-flex justify-content-start ps-4">
                              <div className="">
                                <img
                                  src={landingIcon3}
                                  alt=""
                                  className="icon-size"
                                />
                              </div>
                              <h4 className="ms-3 pt-3 text-white ">
                                BBA Archive
                                <br />
                              </h4>
                            </div>
                          </div>
                          <div className="col-1"></div>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-2">
                      <div></div>
                    </div>
                    <div className="col-sm-4">
                      <div>
                        <div className="row  ">
                          <div className="col-1"></div>
                          <div
                            onClick={estateCardHandle}
                            className="col-10 wing4 pointer cardHover "
                          >

                            <div className="d-flex justify-content-start ps-4">
                              <div className="">
                                <img
                                  src={estateImg}
                                  alt=""
                                  className="icon-size"
                                />
                              </div>
                              <h4 className="ms-3 pt-3 text-white ">
                                Estate
                                <br />{" "}
                              </h4>
                            </div>
                          </div>
                          <div className="col-1"></div>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div>
                        <div className="row">
                          <div className="col-1"></div>
                          <div
                            onClick={transportCardHandle}
                            className="col-10 wing3 pointer cardHover"
                          >
                            <div className="d-flex ps-4 justify-content-start">
                              <div className="">
                                <img
                                  src={transportImg}
                                  alt=""
                                  className="icon-size"
                                />
                              </div>
                              <h4 className="ms-3 pt-3 text-white ">
                                Transport <br />
                              </h4>
                            </div>
                          </div>
                          <div className="col-1"></div>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div>
                        <div className="row ">
                          <div className="col-1"></div>

                          <div className="col-10 wing2 pointer cardHover ">
                            <a
                              onClick={itBtnHandler}

                            >
                              <div className="d-flex justify-content-start ps-4">
                                <div className="">
                                  <img src={itImg} alt="" className="icon-size" />
                                </div>
                                <h4 className="ms-3 pt-3 text-white ">
                                  IT
                                  <br />
                                </h4>
                              </div>
                            </a>
                          </div>

                          <div className="col-1"></div>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-2">
                      <div></div>
                    </div>
                    <div className="col-sm-4">
                      <div>
                        <div className="row  ">
                          <div className="col-1"></div>
                          <div
                            onClick={libraryCardHandler}
                            className="col-10 wing3 pointer cardHover"
                          >
                            <a>
                              <div className="d-flex ps-4 justify-content-start">
                                <div className="">
                                  <img
                                    src={storeIcon}
                                    alt=""
                                    className="icon-size"
                                  />
                                </div>
                                <h4 className="ms-3 pt-3 text-white ">
                                  Library <br />
                                </h4>
                              </div>
                            </a>
                          </div>
                          <div className="col-1"></div>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div>
                        <div className="row  ">
                          <div className="col-1"></div>
                          <div
                            onClick={StoreCardHandle}
                            className="col-10 wing3 pointer cardHover"
                          >
                            <a>
                              <div className="d-flex ps-4 justify-content-start">
                                <div className="">
                                  <img
                                    src={storeIcon}
                                    alt=""
                                    className="icon-size"
                                  />
                                </div>
                                <h4 className="ms-3 pt-3 text-white ">
                                  Store <br />
                                </h4>
                              </div>
                            </a>
                          </div>
                          <div className="col-1"></div>
                        </div>
                      </div>
                    </div>
                    {/* <div className="col-sm-4">
                        <div>
                          <a href={`http://192.168.3.8:8081`}>
                            <div className="row  ">
                              <div className="col-1"></div>
                              <div className="col-10 wing5 pointer cardHover">
                                <div className="d-flex justify-content-start ps-4">
                                  <div className="">
                                    <img
                                      src={storeIcon}
                                      alt=""
                                      className="icon-size"
                                    />
                                  </div>
                                  <h4 className="ms-3 pt-3 text-white ">
                                    Store <br />
                                  </h4>
                                </div>
                              </div>
                              <div className="col-1"></div>
                            </div>
                          </a>
                        </div>
                      </div> */}

                    <div className="col-sm-2">
                      <div></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Outlet />
      </div>

    </div>
  );
};
export default AdministrationLandingPage;
