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



function HrApp(props) {
  const {
    program_1,
    program_2,
    program_3,
    program_4,
    program_5,
    program_6,
    program_7,
    program_8,
    program_9,
    program_10,
    program_11,
    program_12,
    program_13,
    program_14,
    program_15,
    program_16,
    program_17,
    tipsoi_18,
    logAudit,
    user,
    roleProgramData,
    hasError
  } = useAuth();
  const [userLoginData, setUserLoginData] = useState(user);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`http://${baseApi}/auth/getLoginUser`)
      .then((data) => {
        setUserLoginData(data.data.user);
      })
      .catch((error) => { })
  }, []);
  let logId = userLoginData?.user_id;
  // let logId = userLoginData ? userLoginData.user_id : "";
  let rollId = userLoginData?.role_id;
  let moduleId = parseInt(window.sessionStorage.getItem("moduleId"));
  let adSubModule = parseInt(window.sessionStorage.getItem("adSubModule"));
  const [isLoading, setIsLoading] = useState(false);
  let pathName = window.location.pathname;


  //  login status handeling
  const oldStatus = sessionStorage.getItem("statusId");
  const logInStatus = Cookies.get("Role");

  if (!logInStatus && oldStatus) {
    swal({
      title: "Your session has expired, please login",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        window.location.reload();
      } else {
        window.location.reload();
      }
    });
    sessionStorage.removeItem("statusId");
  }
  const navigate = useNavigate();

  // if (!logInStatus) {
  //   navigate('/')
  //   return
  // }
  // logId = "Tanusree"
  // search name keep limitation
  if (pathName !== "/allemployees/employeeprofile/") {
    sessionStorage.removeItem("search_name");
  }
  if (pathName.includes('hr/docs')) {
    sessionStorage.setItem("adSubModule", 6);
  }
  if (!pathName.includes('hr/docs') && !pathName.includes('hr/lease') && pathName.includes('hr/')) {
    sessionStorage.setItem("moduleId", 1);
    sessionStorage.setItem("adSubModule", 1);
  }


  //console.log = console.warn = console.error = console.dirxml = console.trace = console.info = console.dir = () => { };

  return (
    <div className="App">
      <>
        <Sidebar></Sidebar>
        <Header></Header>
        <Routes>


          <Route path="/calendar" element={<Calendar />} />


          <Route exact path="/" element={<EmployeeDashboard />} />

          {
            <>
              {moduleId === 1 && adSubModule === 1 && (
                <>
                  {program_1.length && (
                    <Route
                      exact
                      path="/admindashboard"
                      element={<Admindashboard />}
                    />
                  )}

                  {program_2.length && (
                    <Route
                      path="/employeedashboard"
                      element={<EmployeeDashboard />}
                    />
                  )}
                  {program_3.length && (
                    <>
                      <Route
                        path="/allemployees"
                        element={<AllEmployees />}
                      />
                      <Route
                        path="/employeeslist"
                        element={<Employeeslist />}
                      />
                      <Route
                        path="/allemployees/employeeprofile/:emp_id/profile/:emp_id"
                        element={<Profile />}
                      />
                      <Route
                        path="/employeeslist/employeeprofile/:emp_id/profile/:emp_id"
                        element={<Profile />}
                      />
                      <Route
                        path="/employeeinformationform"
                        element={<EmployeeInformationForm />}
                      />

                    </>
                  )}
                  {program_4.length && (
                    <Route path="/education" element={<Educations />} />
                  )}
                  {program_5.length && (
                    <Route
                      path="/employeechildren"
                      element={<EmployeeChildren />}
                    />
                  )}
                  {program_6.length && (
                    <Route path="/promotion" element={<Promotions />} />
                  )}
                  {program_7.length && (
                    <Route path="/posting" element={<Posting />} />
                  )}
                  {program_8.length && (
                    <>
                      <Route path="/training" element={<Trainings />} />
                      <Route
                        path="/trainingPdfReport"
                        element={<TrainingPdfReport />}
                      />
                    </>
                  )}
                  {program_9.length && (
                    <Route path="/loan" element={<LoanManagement />} />
                  )}
                  {program_10.length && (
                    <>
                      <Route path="/leave" element={<LeaveManagement />} />

                    </>


                  )}
                  {program_11.length && (
                    <Route
                      path="/health"
                      element={<HealthManagement />}
                    />
                  )}
                  {program_12.length && (
                    <Route
                      path="/discipline"
                      element={<DisciplineManagement />}
                    />
                  )}
                  {program_13.length && (
                    <Route
                      path="/eventdashboard"
                      element={<EventDashboard />}
                    />
                  )}
                  {program_14.length && (
                    <Route
                      path="/eventcalender"
                      element={<EventCalender />}
                    />
                  )}
                  {program_15.length && (
                    <Route
                      exact path="/eventcreate"
                      element={<EventCreate />}
                    />
                  )}
                  {program_16.length && (
                    <Route
                      path="/eventorganization"
                      element={<Organization />}
                    />
                  )}
                  {program_17.length && (
                    <>
                      <Route path="/usersadd" element={<UserAdd />} />
                      <Route path="/loantype" element={<LoanType />} />
                      <Route path="/grade" element={<Grade />} />
                      <Route path="/leavetype" element={<LeaveType />} />
                      <Route path="/acrclass" element={<AcrClass />} />
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
                      <Route path="/loanfund" element={<LoanFund />} />
                      <Route
                        path="/leavelist"
                        element={<LeaveEmployee />}
                      />
                      <Route path="/allrole" element={<Role />} />
                      <Route
                        path="/rolespermission"
                        element={<RoleAndPermission />}
                      />
                    </>
                  )}

                  <Route path="/rolesper" element={<Rolespermission />} />

                  <Route path="/test" element={<Test />} />
                </>
              )}

              <Route path="/addmodule" element={<AddModule />} />
              <Route path="/addsubmodule" element={<AddSubModule />} />
              <Route path="/addprogram" element={<AddProgram />} />
            </>
          }



          <Route
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
          <Route path="/softRequisitionReport/:req_id" element={<RequisitionReport />} />
          {/* leave request */}
          <Route path="/leaveApplicationformPrint/:l_id" element={<LeaveApplicationformPrint />} />
          <Route path="/leaverequest" element={<AddleaveRequest />} />


          {
            roleProgramData.length &&
            <Route path="*" exact={true} element={<NotFound />} />
          }



        </Routes>
      </>
    </div>
  );
}

export default HrApp;
