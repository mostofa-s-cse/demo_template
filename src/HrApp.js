import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Header from "./components/initialpage/Sidebar/header.jsx";
import Sidebar from "./components/initialpage/Sidebar/sidebar";
import AcrClass from "./components/MainPage/Administration/Settings/AcrClass";
import AcrType from "./components/MainPage/Administration/Settings/AcrType";
import ChangePassword from "./components/MainPage/Administration/Settings/ChangePassword";
import Department from "./components/MainPage/Administration/Settings/Department";
import Designation from "./components/MainPage/Administration/Settings/Designation";
import District from "./components/MainPage/Administration/Settings/District";
import DocumentType from "./components/MainPage/Administration/Settings/DocumentType";
import Grade from "./components/MainPage/Administration/Settings/Grade";
import HealthInfo from "./components/MainPage/Administration/Settings/HealthInfo";
import LeaveType from "./components/MainPage/Administration/Settings/LeaveType";
import LoanFund from "./components/MainPage/Administration/Settings/LoanFund";
import LoanType from "./components/MainPage/Administration/Settings/LoanType";
import Punishment from "./components/MainPage/Administration/Settings/Punishment";
import Rolespermission from "./components/MainPage/Administration/Settings/rolespermission";
import UserAdd from "./components/MainPage/Administration/Settings/UserAdd";
import EmployeeInformationForm from "./components/MainPage/Employees/EmployeeInformationForm/EmployeeInformationForm";
import AllEmployees from "./components/MainPage/Employees/Employees/Allemployees";
import DisciplineManagement from "./components/MainPage/Employees/Employees/DisciplineManagement";
import Educations from "./components/MainPage/Employees/Employees/Educations";
import EmployeeChildren from "./components/MainPage/Employees/Employees/EmployeeChildern";
import EmployeeProfile from "./components/MainPage/Employees/Employees/employeeprofile";
import Employeeslist from "./components/MainPage/Employees/Employees/employeeslist";
import HealthManagement from "./components/MainPage/Employees/Employees/HealthManagement";
import LeaveEmployee from "./components/MainPage/Employees/Employees/leaveemployee";
import LeaveManagement from "./components/MainPage/Employees/Employees/LeaveManagement";
import LoanManagement from "./components/MainPage/Employees/Employees/LoanManagement";
import Profile from "./components/MainPage/Employees/Employees/Profile";
import Promotions from "./components/MainPage/Employees/Employees/Promotions";
import Singleprofile from "./components/MainPage/Employees/Employees/SingleProfile";
import Trainings from "./components/MainPage/Employees/Employees/Trainings";
import Admindashboard from "./components/MainPage/Main/Dashboard/Admindashboard";
import EmployeeDashboard from "./components/MainPage/Main/Dashboard/employeedashboard";
import Test from "./Test";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//------------------------------- transport section start----------------------------------------

// -------------------------------------- end --------------------------------------------
import Cookies from "js-cookie";
import Calendar from "./components/MainPage/Employees/Employees/Events/calender/calendar";
import EventCalender from "./components/MainPage/Employees/Employees/Events/EventCalender/EventCalender";
import EventCreate from "./components/MainPage/Employees/Employees/Events/EventCreate/EventCreate";
import EventDashboard from "./components/MainPage/Employees/Employees/Events/EventDashboard/EventDashboard";

import swal from "sweetalert";
import useAuth from "./components/initialpage/hooks/useAuth";
import NotFound from "./components/initialpage/NotFound.js";
import AddModule from "./components/MainPage/Administration/Settings/AddModule";
import AddProgram from "./components/MainPage/Administration/Settings/AddProgram";
import AddSignature from "./components/MainPage/Administration/Settings/AddSingnature";
import AddSubModule from "./components/MainPage/Administration/Settings/AddSubModule";
import Role from "./components/MainPage/Administration/Settings/Role";
import RoleAndPermission from "./components/MainPage/Administration/Settings/RoleAndPermission";
import Organization from "./components/MainPage/Employees/Employees/Events/EventSetting/Organization";
import LeaveApplicationformPrint from './components/MainPage/Employees/Employees/LeaveApplication/LeaveApplicationformPrint';
import Posting from "./components/MainPage/Employees/Employees/Posting";
import TrainingPdfReport from "./components/MainPage/Employees/Employees/TrainingPdfReport";
import RequisitionReport from "./components/MainPage/Employees/RequisitionRequest/RequisitionReport/RequisitionReport";
import RequisitionRequest from "./components/MainPage/Employees/RequisitionRequest/RequisitionRequest";
import AddleaveRequest from "./components/MainPage/Employees/Employees/LeaveApplication/AddLeaveRequest";
import axios from "axios";
import baseApi from "./components/initialpage/hooks/baseApi";
import Login from "./components/initialpage/Login";
import RequireAuth from "./components/RequireAuth/RequireAuth";
import useServer from "./components/initialpage/hooks/useServer";

function HrApp(props) {
  useEffect(()=>{},[])
  const { user } = useServer();
  console.log('userinfo', user.role)
  //console.log = console.warn = console.error = console.dirxml = console.trace = console.info = console.dir = () => { };
  const token = localStorage.getItem("token");
  return (
    <div className="App">
      <>
        {/* {user.role ? (
          <>
            <Sidebar></Sidebar>
            <Header></Header>
          </>
        ) : ""} */}
        <Sidebar></Sidebar>
            <Header></Header>
        <Routes>
          <Route path="/calendar" element={<Calendar />} />

          <Route exact path="/" element={<RequireAuth><EmployeeDashboard /></RequireAuth>} />
          <Route exact path="/login" element={<Login />} />
          <Route
            exact
            path="/admindashboard"
            element={<RequireAuth><Admindashboard /></RequireAuth>}
          />
          <Route
            path="/employeedashboard"
            element={<RequireAuth><EmployeeDashboard /></RequireAuth>}
          />
          <Route
            path="/allemployees"
            element={<RequireAuth><AllEmployees /></RequireAuth>}
          />
          <Route
            path="/employeeslist"
            element={<RequireAuth><Employeeslist /></RequireAuth>}
          />
          <Route
            path="/profile"
            element={<RequireAuth><Profile /></RequireAuth>}
          />
          {/* <Route
            path="/employeeslist/employeeprofile/:emp_id/profile/:emp_id"
            element={<Profile />}
          /> */}
          <Route
            path="/employeeinformationform"
            element={<RequireAuth><EmployeeInformationForm /></RequireAuth>}
          />
          <Route path="/education" element={<RequireAuth><Educations /></RequireAuth>} />
          <Route
            path="/employeechildren"
            element={<RequireAuth><EmployeeChildren /></RequireAuth>}
          />
          {/* <Route path="/promotion" element={<Promotions />} />
          <Route path="/posting" element={<Posting />} />
          <Route path="/training" element={<Trainings />} />
          <Route
            path="/trainingPdfReport"
            element={<TrainingPdfReport />}
          /> */}


          <>


            {/* <Route path="/loan" element={<LoanManagement />} /> */}


            <Route path="/leave" element={<RequireAuth><LeaveManagement /></RequireAuth>} />






            {/* <Route
              path="/health"
              element={<HealthManagement />}
            /> */}

            {/* <Route
              path="/discipline"
              element={<DisciplineManagement />}
            /> */}

            {/* <Route
              path="/eventdashboard"
              element={<EventDashboard />}
            /> */}

            {/* <Route
              path="/eventcalender"
              element={<EventCalender />}
            /> */}

            {/* <Route
              exact path="/eventcreate"
              element={<EventCreate />}
            /> */}

            {/* <Route
              path="/eventorganization"
              element={<Organization />}
            /> */}

            <>
              {/* <Route path="/usersadd" element={<UserAdd />} />
              <Route path="/loantype" element={<LoanType />} />
              <Route path="/grade" element={<Grade />} /> */}
              {/* <Route path="/acrclass" element={<AcrClass />} />
              <Route path="/acrtype" element={<AcrType />} />
              <Route path="/district" element={<District />} />
              <Route
                path="/designation"
                element={<Designation />}
              />
              <Route
                path="/department"
                element={<Department />}
              />
              <Route
                path="/punishment"
                element={<Punishment />}
              />
              <Route
                path="/signature"
                element={<AddSignature />}
              />
              <Route
                path="/healthinfo"
                element={<HealthInfo />}
              />
              <Route
                path="/documenttype"
                element={<DocumentType />}
              />
              <Route path="/loanfund" element={<LoanFund />} /> */}
              {/* <Route path="/leavetype" element={<LeaveType />} /> */}
              {/* <Route
                path="/leavelist"
                element={<LeaveEmployee />}
              />
              <Route path="/allrole" element={<Role />} />
              <Route
                path="/rolespermission"
                element={<RoleAndPermission />}
              /> */}
            </>


            {/* <Route path="/rolesper" element={<Rolespermission />} />

            <Route path="/test" element={<Test />} /> */}
          </>


          {/* <Route path="/addmodule" element={<AddModule />} />
          <Route path="/addsubmodule" element={<AddSubModule />} />
          <Route path="/addprogram" element={<AddProgram />} /> */}





          {/* <Route
            path="/allemployees/employeeprofile/:emp_id"
            element={<EmployeeProfile />}
          />
          <Route
            path="/singleprofile/profile/:emp_id"
            element={<Profile />}
          />
          <Route path="/singleprofile" element={<Singleprofile />} />
          <Route path="/changepassword" element={<ChangePassword />} />
          <Route path="/softRequisition" element={<RequisitionRequest />} />
          <Route path="/softRequisitionReport/:req_id" element={<RequisitionReport />} /> */}
          {/* leave request */}
          {/* <Route path="/leaveApplicationformPrint/:l_id" element={<LeaveApplicationformPrint />} />
          <Route path="/leaverequest" element={<AddleaveRequest />} /> */}



          <Route path="*" exact={true} element={<NotFound />} />




        </Routes>
      </>
      <ToastContainer />
    </div>
  );
}

export default HrApp;
