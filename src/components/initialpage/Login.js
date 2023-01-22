import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Outlet, useNavigate } from 'react-router-dom';
import { logImg2 } from '../Entryfile/imagepath';
import useAuth from "./hooks/useAuth";
import LogInHeader from "./LogInHeader";

const Login = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState(null);

  const [passwordShown, setPasswordShown] = useState(false);


  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };


  const { loginAction, user } = useAuth()


  const onSubmit = data => {
    sessionStorage.setItem("redirect", true)
    data.user = userData;
    data.password = password;
    loginAction({ user: data.user, password: data.password })
    setUserData('')
    setPassword('')
    // navigate('/')

  }

  //
  return (
    <>

      <div >
        {
          <div className="mb-5">
            <LogInHeader></LogInHeader>
            <div >
              <div className="row  page-size my-5">

                <div className="col-lg-3 col-sm-3 col-md-12 bg-primary d-flex justify-content-center  align-items-center">
                  <div className='text-center p-lg-0 p-5'>
                    <img src={logImg2} className="image-size" alt="" />
                    <h3 className='text-white fw-bold mt-2' >BANGLADESH BRIDGE
                      AUTHORITY</h3>

                  </div>

                </div>
                <div className="col-sm-2 col-md-2 col-lg-2 me-5">

                </div>


                <div className="col-sm-4 col-12 col-md-8 col-lg-4 text-start mt-lg-5 pt-lg-5">

                  <div className='py-lg-5 border shadow login-style'>
                    <h2 className='fw-bold text-center mt-5'>LOG IN</h2>
                    <form className="px-5 pb-5" onSubmit={handleSubmit(onSubmit)} action="">
                      <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label text-start">Username</label>
                        <input value={userData} onChange={e => setUserData(e.target.value)} type="text" placeholder="User Name" className="form-control w-100" id="exampleFormControlInput1" required />
                        <div className="mb-3">
                          <label htmlFor="exampleFormControlInput2" className="form-label text-start pt-2">Password</label>
                          <div className="pass-wrapper d-flex input-group mb-3">
                            <input
                              value={password}
                              className="form-control"
                              placeholder="Password"
                              name="password"
                              type={passwordShown ? "text" : "password"}
                              aria-describedby="basic-addon2"
                              onChange={e => setPassword(e.target.value)}
                              required
                            />

                            <span class="input-group-text btn-eye " id="basic-addon2"><i onClick={togglePasswordVisiblity} class={passwordShown ? "fa fa-eye" : "fa fa-eye-slash"} aria-hidden="true"></i></span>
                          </div>



                          {/* <input onChange={e => setPassword(e.target.value)} type="password" className="form-control w-100" id="exampleFormControlInput2" /> */}
                        </div>

                        <br />
                        <button type="submit" className="btn btn-primary fs-5 w-100">Log In &rarr;</button>
                      </div>
                    </form>

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
