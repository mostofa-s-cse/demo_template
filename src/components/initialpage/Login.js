import React, { useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { public_api } from "./hooks/baseApi";
import LogInHeader from "./LogInHeader";

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const onSubmit = async (data) => {
    // console.log(data);
    try {
      const res = await public_api().post("user/login", {
        User_Email: data.User_Email,
        pass_word: data.pass_word,
      })
        .catch(function (error) {
          toast.error(error.response.data.message)
        });
      // console.log("Success", res.data.data.token)
      console.log("Success-------", res.data);

      if (res.data.status == "Success") {
        localStorage.setItem("role", res.data.data.user.role);
        localStorage.setItem("uid", res.data.data.user.User_ID);
        localStorage.setItem("email", res.data.data.user.User_Email);
        localStorage.setItem("token", res.data.data.token);
        console.log("Success-----222--", res.data.data.user);
        // return <Redirect to='/app/main/dashboard' />
        // <Navigate to="/dashboard" replace={true} />
        // <Navigate to="app/main/dashboard" />;
        // <Navigate to="/app/main/dashboard" replace={true} />;
        navigate("/");
        window.location.reload();
        toast.success(res.data.message);
      }
    } catch (err) {
      console.log(err.message);
    }

  };


  return (
    <>
      <div >
        {
          <div className="">
            <div >
              <div className="account-content mt-8">

                <div className="container">
                  {/* Account Logo */}
                  <div className="account-logo">
                    <Link to="/"><img src="" alt="Dreamguy's Technologies" /></Link>
                  </div>
                  {/* /Account Logo */}
                  <div className="account-box">
                    <div className="account-wrapper">
                      <h3 className="account-title">Login</h3>
                      <p className="account-subtitle">Access to our dashboard</p>
                      {/* Account Form */}
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                          <div className="form-group">
                            <label>Email Address</label>
                            <input className="form-control" type="email"
                              name="User_Email"
                              {...register("User_Email", {
                                required: "this field is required.",
                                pattern: {
                                  value:
                                    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
                                  message: "please enter a valid email address.",
                                },
                              })}
                            />
                            {errors.User_Email && (
                              <div className="text-danger">
                                {errors.User_Email.message}
                              </div>
                            )}
                          </div>
                          <div className="form-group">
                            <div className="row">
                              <div className="col">
                                <label>Password</label>
                              </div>
                              <div className="col-auto">
                                <Link className="text-muted" to="/forgotpassword">
                                  Forgot password?
                                </Link>
                              </div>
                            </div>
                            <input className="form-control" type="password"
                              name="pass_word"
                              {...register("pass_word", {
                                required: "this field is required.",
                                pattern: {
                                  value:
                                    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&^_-]{4,}$/,
                                  message: "please enter a valid password.",
                                },
                              })}
                            />
                            {errors.pass_word && (
                              <div className="text-danger">
                                {errors.pass_word.message}
                              </div>
                            )}
                          </div>
                          <div className="form-group text-center">
                            <button
                              type="submit"
                              className="btn btn-primary account-btn"
                            >
                              Login
                            </button>
                          </div>
                          <div className="account-footer">
                            <p>Don't have an account yet? <Link to="/register">Register</Link></p>
                          </div>
                        </div>
                      </form>
                      {/* /Account Form */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }

      </div>

    </>
  );
}
export default Login;
