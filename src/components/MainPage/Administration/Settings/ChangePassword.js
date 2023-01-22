/**
 * Signin Firebase
 */

import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import axios from "axios";
import swal from "sweetalert";
import baseApi from "../../../initialpage/hooks/baseApi";
import Api from "../../../initialpage/hooks/Api";

const ChangePassword = () => {
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
  const [getData, setGetData] = useState([]);
  const [data, setData] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  let uId = userLoginData.user_id;
  //
  const {
    register: register3,
    formState: { errors: errors3 },
    handleSubmit: handleSubmit3,
    reset: reset3,
  } = useForm();

  // GET USER DATA
  useEffect(() => {
    const getUsers = () => {
      setIsLoading(true);
      fetch(`/ords/hrm/use/${uId}`)
        .then((res) => {
          // You have to send it, as I have done below
          if (res.status >= 400) {
            throw new Error("Server responds with error!");
          }
          return res.json();
        })
        .then(
          (users) => {
            setGetData(users);
            setIsLoading(false);
          },

          (err) => {
            const mute = err;
            setHasError(true);
            setIsLoading(true);
          }
        );
    };
    getUsers();
  }, [uId]);

  //  update password
  const onSubmitPasswordUpdate = (passData) => {
    let matchedPass = "";
    //
    // if (passData.old_password !== getData.password) {
    //   alert("The old password you have entered is incorrect")
    //   return;
    // }
    if (passData.new_password === passData.confirm_new_password) {
      matchedPass = passData.confirm_new_password;
    } else {
      swal({
        title: "Please make sure both passwords are matched",
        icon: "warning",
        button: "Ok!",
      });
      reset3();
      return;
    }
    if (matchedPass && uId) {
      const info = {
        user: uId,
        newPassword: matchedPass,
        oldPassword: passData.old_password,
      };
      axios
        .put(`http://${Api}/app/auth/user/singlePass`, info)
        .then((data) => {
          if (data.data === 200) {
            swal({
              title: "Good job!",
              text: "Successfully Updated",
              icon: "success",
              button: "Ok",
            });
          }
          if (data.data.status === 201) {
            swal({
              title: "The old password you have entered is incorrect",
              icon: "warning",
              button: "Ok!",
            });
          }
        })
        .catch((error) => {
          setHasError(error);
        });
      // window.location.reload();
    }
    reset3();
  };

  return (
    <div className="page-wrapper">
      <Helmet>
        <title>Change Password - HR</title>
        <meta name="description" content="Login page" />
      </Helmet>
      <div className="content container-fluid">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            {/* Page Header */}
            <div className="page-header">
              <div className="row">
                <div className="col-sm-12">
                  <h3 className="page-title">Change Password</h3>
                </div>
              </div>
            </div>
            {/* /Page Header */}
            <form
              onSubmit={handleSubmit3(onSubmitPasswordUpdate)}
              className="text-start"
            >
              <div className="form-group">
                <label>Old password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter Old password"
                  {...register3("old_password")}
                  required
                />
              </div>
              <div className="form-group">
                <label>New password</label>
                <input
                  placeholder="Enter New password"
                  type="password"
                  className="form-control"
                  {...register3("new_password")}
                  required
                />
              </div>
              <div className="form-group">
                <label>Confirm password</label>
                <input
                  placeholder="Enter Confirm password"
                  type="password"
                  className="form-control"
                  {...register3("confirm_new_password")}
                  required
                />
              </div>
              <div className="submit-section">
                <button className="btn bgColor text-white ">
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* /Page Content */}
    </div>
  );
};

export default ChangePassword;
