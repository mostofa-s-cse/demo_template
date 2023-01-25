
import React, { useEffect, useState } from 'react';
import { Route, Routes } from "react-router-dom";
import './App.css';
// import { serverError } from './components/Entryfile/imagepath'

import LandingPage from './components/initialpage/LandingPage/LandingPage';
import LogInHeader from './components/initialpage/LogInHeader';

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
