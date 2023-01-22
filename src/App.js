
import React, { useEffect, useState } from 'react';
import { Route, Routes } from "react-router-dom";
import './App.css';
// import { serverError } from './components/Entryfile/imagepath'

import LandingPage from './components/initialpage/LandingPage/LandingPage';
import Login from './components/initialpage/Login';
import LogInHeader from './components/initialpage/LogInHeader';


//------------------------------- transport section start----------------------------------------




// -------------------------------------- end --------------------------------------------


import Cookies from 'js-cookie';
import swal from 'sweetalert';
import useAuth from './components/initialpage/hooks/useAuth';
import AdministrationLandingPage from './components/initialpage/LandingPage/AdministrationLandingPage';
import Logout from './components/initialpage/Logout';
import NotFound from './components/initialpage/NotFound';
import ServerError from './components/initialpage/ServerError/ServerError';
// import AccountLandingPage from './components/MainPage/F&A/AccountLandingPage/AccountLandingPage';



function App(props) {
  const { user, hasError } = useAuth();


  let logId = user ? user.user_id : '';

  let rollId = user ? user.role_id : '';
  const [roleProgramData, setRoleProgramData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const pathName = window.location.pathname;
  const [serverStatus, setServerStatus] = useState(null);



  useEffect(() => {
    const getUsers = () => {
      fetch('/ords/hrm/rol_per_pro/get')
        .then(res => {

          // You have to send it, as I have done below
          if (res.status >= 400) {
            throw new Error("Server responds with error!")
          }
          return res.json()
        })
        .then(users => {
          setRoleProgramData(users.items);
          setIsLoading(true);
        },

          err => {
            const mute = err
            setIsLoading(true);
          })
    };
    if (logId) {
      getUsers()
    }

  }, [])
  const programsAccess = roleProgramData.filter(item => item.role_id === rollId);
  const program_1 = programsAccess.filter(item => item.program_id == 1)


  // search name keep limitation
  if (pathName !== '/allemployees/employeeprofile/') {
    sessionStorage.removeItem('search_name');
  }
  // import Cookies from 'js-cookie'

  const oldStatus = sessionStorage.getItem('statusId')
  const redirectStatus = sessionStorage.getItem('redirect')
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

  //console.log = console.warn = console.error = console.dirxml = console.trace = console.info = console.dir = () => { };

  // vehicle redirect

  if (user && user.role_id === 10 && redirectStatus === "true") {
    sessionStorage.setItem("redirect", false)
    sessionStorage.setItem("adSubModule", 2);
    window.location.href = '/hr/leasedashboard'
  }
  if (user && user.role_id !== 10 && redirectStatus === "true") {
    sessionStorage.setItem("redirect", false)
    window.location.reload()
  }
  return (
    <div className="App">

      <Routes>

        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/administrationlandingpage" element={<AdministrationLandingPage />} />
        <Route path="/logout" element={<Logout></Logout>} />
        {/* {
          (!pathName.includes("/hr/") && !pathName.includes("/vehicle/") && !pathName.includes("/p&d/") && !pathName.includes("/store/") && pathName !== "/vehicle" && pathName !== "/hr" && pathName !== "/p&d" && pathName !== "/store" && pathName !== "/library" && !pathName.includes("/library/")) &&
          <Route path="*" element={<NotFound></NotFound>} />
        } */}


      </Routes >
    </div >
  );
}

export default App;
