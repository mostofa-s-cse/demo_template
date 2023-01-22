import AOS from 'aos';
import 'aos/dist/aos.css';
import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { landingIcon1, landingIcon3, landingIcon4, landingIcon6, landingIcon7, logImg } from '../../Entryfile/imagepath';
import useAuth from '../hooks/useAuth';
import "./LandingPage.css";
const LandingPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const getSecretToken = sessionStorage.getItem("secretToken")
  const { logoutAction, user, setUser } = useAuth();
  const navigate = useNavigate()

  const [userLoginData, setUserLoginData] = useState(user);
  const logOutBtnHandler = () => {
    logoutAction();
    setUser({})
    setUserLoginData({})
    navigate("/");

  }


  // useEffect(() => {
  //   axios.get(`http://${baseApi}/auth/getLoginUser`)
  //     .then(data => {
  //       setUserLoginData(data.data.user)

  //     })
  //     .catch(error => {

  //     })
  // }, [])


  AOS.init();
  let secretId = userLoginData.user_id;
  let rollId = userLoginData.role_id;;
  const emp_id = userLoginData.employe_id;
  const [hasError, setHasError] = useState(false);

  const [userName, setUserName] = useState('');


  // finance ip
  // const [apiData, setApiData] = useState({})
  // useEffect(() => {
  //   const getUsers = () => {
  //     fetch(`/ords/accounts/all_ip`)
  //       .then(res => {
  //         if (res.status >= 400) {
  //           throw new Error("Server responds with error!")
  //         }
  //         return res.json()
  //       })
  //       .then(data => {
  //         setApiData(data.items[0].ipaddress)

  //       },
  //         err => {
  //           const mute = err
  //           setHasError(true);

  //         })
  //   };

  //   getUsers()

  // }, [])

  useEffect(() => {
    setIsLoading(true);
    const getUsers = () => {
      fetch(`/ords/hrm/employees/${emp_id}`)
        .then(res => {
          if (res.status >= 400) {
            throw new Error("Server responds with error!")
          }
          return res.json()
        })
        .then(data => {
          setUserName(data.items[0].name_english)
          setIsLoading(false);
        },
          err => {
            const mute = err
            setHasError(true);
            setIsLoading(true);
          })
    };
    if (emp_id) {
      getUsers()
    }
  }, [emp_id])
  // end
  window.sessionStorage.setItem("user_name", userName);
  const adminCardHandle = () => {
    sessionStorage.setItem("moduleId", 1);
    navigate('/administrationlandingpage');
    // navigate('/d');
  }
  const PAndDCardHandle = () => {
    if (rollId !== 21 && rollId !== 12 && rollId !== 1) {
      swal({
        title: "You do not have permission to access",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
    }

  }

  const fAndACardHandle = () => {
    if (rollId !== 21 && rollId !== 14 && rollId !== 17 && rollId !== 99 && rollId !== 98 && rollId !== 97 && rollId !== 96) {
      swal({
        title: "You do not have permission to access",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
    }
    else {
      if (getSecretToken) {
        window.location.href = `http://192.168.3.8:8081/fa/authorization?token=${getSecretToken}`;
      }
    }

  }

  const nameClickHandle = () => {
    sessionStorage.setItem("moduleId", 1);
    sessionStorage.setItem("adSubModule", 1);
  }

  return (
    <div>


      <div className='mt-1 pt-2'>
        <div className='text-end me-4'><i onClick={logOutBtnHandler} style={{ cursor: 'pointer' }} className='la la-power-off fs-4 bg-danger shadow text-white rounded-circle p-2' data-bs-toggle="tooltip" data-bs-placement="bottom" title="Logout"></i></div>


        <div className='container mb-5'>
          <div className="row ">
            <div className="col d-flex justify-content-start">
              <img src={landingIcon1} className='header-logo1' alt="" />
            </div>
            <div className="col d-flex justify-content-center">
              <h4 className='text-center my-5'>Welcome Back <br /><a onClick={nameClickHandle} href='/hr/singleprofile' className='text-primary fs-5 fw-bold'> {userName} </a></h4>
            </div>
            <div className="col d-flex justify-content-end">
              <img src={logImg} alt="" className='header-logo2' />
            </div>
          </div>
          <div className="text-start landing-box shadow border p-lg-5 pt-3 p-md-3  rounded-3 mb-5">

            {/* -------------------------1st row-------------------- */}

            <div className="row pt-lg-5 mb-4 res-card ">

              <div className="col-sm-1 col-md-3 col-lg-4">
              </div>
              <div className="col-sm-8 w-75 col-md-5 col-lg-4">
                <div className='row'>
                  <div data-aos="fade-down"
                    data-aos-easing="linear"
                    data-aos-duration="1000" onClick={adminCardHandle} className="wing1 pointer cardHover">
                    <div className='d-flex justify-content-start ps-5'>
                      <div className='pt-2'>
                        <img src={landingIcon3} alt="" className='icon-size' />
                      </div>
                      <h4 className='ms-3 pt-3 text-white '> Administration <br />

                      </h4>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-2 col-md-3 col-lg-4">
              </div>

            </div>
            {/*------------------------------ 2nd row ---------------------*/}
            <div className="row res-card mb-4 g-3 pe-md-4">

              <div className="col-md col-lg-1 col-sm-1">
              </div>
              <div className="col-sm-8 w-75 col-md-5 col-lg-4">
                <div className='row '>
                  {/*  */}
                  <a {...rollId === 21 || rollId === 12 || rollId === 1 ? { href: '/p&d' } : {}} className='wing2'>
                    <div data-aos="fade-right"
                      data-aos-easing="linear"
                      data-aos-duration="1000" onClick={PAndDCardHandle} className=" pointer cardHover">

                      <div className='d-flex justify-content-start ps-5'>
                        <div className=''>
                          <img src={landingIcon4} alt="" className='icon-size' />
                        </div>
                        <h4 className='ms-3 text-white '>Planning &
                          <br />  Development
                        </h4>
                      </div>

                    </div>
                  </a>
                </div>
              </div>
              <div className="col-sm-2 col-md-1 ms-md-4 col-lg-2">
              </div>

              <div className="col-sm-8 w-75 col-md-5 col-lg-4">
                <div className='row  '>
                  <a className='wing4' onClick={fAndACardHandle} >
                    <div data-aos="fade-left"
                      data-aos-easing="linear"
                      data-aos-duration="1000" className=" pointer cardHover ">
                      <div className='d-flex justify-content-start ps-5'>
                        <div className=''>
                          <img src={landingIcon6} alt="" className='icon-size' />
                        </div>
                        <h4 className='ms-3 text-white '>Finance & <br /> Accounts</h4>
                      </div>
                    </div>
                  </a>
                </div>
              </div>

              <div className="col-sm-1 col-md col-lg-1"></div>
            </div>
            {/* 3rd row */}
            <div className="row pb-lg-5 res-card">

              <div className="col-sm-1 col-md-3 col-lg-4">
              </div>
              <div className="col-sm-8 w-75 col-md-5 col-lg-4">
                <div className='row  '>
                  <div data-aos="zoom-in"
                    data-aos-easing="linear"
                    data-aos-duration="1000" className="wing5 pointer cardHover">
                    <div className='d-flex justify-content-start ps-5'>
                      <div className=''>
                        <img src={landingIcon7} alt="" className='icon-size' />
                      </div>
                      <h4 className='ms-3 text-white '>Bridge <br /> Health Monitoring </h4>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-2 col-md-3 col-lg-4">
              </div>

            </div>
          </div>

        </div>
        <Outlet />
      </div>

    </div>
  );
};
export default LandingPage;









