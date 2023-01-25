
import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import swal from 'sweetalert';
import baseApi, { public_api } from './baseApi';
import { program } from "./userStore";
axios.defaults.withCredentials = true;

const useServer = () => {
  const { info } = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const [loggedStatus, setLoggedStatus] = useState(null);
  const [secretToken, setSecretToken] = useState(null)
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [IsLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  // get cookies
  const token = Cookies.get('token');
  const uid = localStorage.getItem("uid");



  const getCurrentUser = async () => {
    const data = await public_api().get(`user/${uid}`);
    setUser(data.data.data);
  };
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      getCurrentUser();
    }
  }, []);




  // end

  return {
    user,
    setUser,
    error,
    loading,
    getCurrentUser,
    loggedStatus,
  }
}
export default useServer;
