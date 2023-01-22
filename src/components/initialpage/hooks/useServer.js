
import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import swal from 'sweetalert';
import baseApi from './baseApi';
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

  // chack server
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`http://192.168.3.8:2001/app/auth/chackserver`)
      .then((data) => {
        if (data.data.status === 504) {
          setHasError(true)
        }
      })
      .catch((error) => { setHasError(true) })
  }, []);
  // get cookies
  const token = Cookies.get('token');

  // login action
  const loginAction = (data) => {
    const info = { user: data.user, password: data.password };
    axios.post(`http://${baseApi}/auth/login`, info)
      .then(data => {
        if (data) {
          const userData = data.data.user;
          console.log(userData)
          setUser(userData)
          if (data.data.status === 203) {
            swal({
              title: "User does not exist",
              icon: "warning",
              button: "Ok!",
            });
          }
          if (data.data.status === 201) {
            swal({
              title: "please Insert a valid pass!",
              icon: "warning",
              button: "Ok!",
            });
          }
          if (data.data.status === 202) {
            swal({
              title: "You are not authorized to access the system!",
              icon: "warning",
              button: "Ok!",
            });
          }
          sessionStorage.setItem("statusId", data.data.user.role_id)
          setLoggedStatus(data.data.status)
          sessionStorage.setItem("secretToken", data.data.token)
          setSecretToken(data.data.token)
        }
      })
      .catch(error => {
        setError(error.status);
      })
      .finally(() => setLoading(false));

  }
  // get all user
  useEffect(() => {
    setLoading(true);
    let userUrl = "";
    if (token) {
      userUrl = `http://${baseApi}/auth/getLoginUser`
    }
    axios.get(userUrl)
      .then(data => {
        setUser(data.data.user)
        setLoggedStatus(data.data.status)
      })
      .catch(error => {
        setError(error.status);
      })
      .finally(() => setLoading(false));
  }, [])


  const logoutAction = () => {
    axios.post(`http://${baseApi}/auth/logout`)
      .then(data => {
        if (data) {
          setUser({});
          return 1;
        }
      })
      .catch(error => {
        setError(error.message);
      })

    localStorage.clear();
    sessionStorage.clear();
    return 1;
  }
  // authentication
  const [roleProgramData, setRoleProgramData] = useState([]);

  const rollId = user ? user.role_id : "";
  useEffect(() => {
    setIsLoading(true);
    const getUsers = () => {
      fetch(`/ords/hrm/rol_acc/role_acc_by_role/${rollId}?limit=100000`)
        .then(res => {

          // You have to send it, as I have done below
          if (res.status >= 400) {
            throw new Error("Server responds with error!")
          }
          return res.json()
        })
        .then(users => {
          setRoleProgramData(users.items);
        },

          err => {
            setHasError(true);
          })
    };
    if (rollId) {
      getUsers()
    }

  }, [rollId])


  const [singleRoleProData, setSingleRoleProData] = useState('');
  useEffect(() => {
    setIsLoading(true);
    const getUsers = () => {
      fetch(`/ords/hrm/pro/program_by_path`,
        {
          headers: {
            program_path: `/${info.path}`,
            r_id: rollId

          }
        }
      )
        .then(res => {

          // You have to send it, as I have done below
          if (res.status >= 400) {
            throw new Error("Server responds with error!")
          }
          return res.json()
        })
        .then(users => {
          setSingleRoleProData(users);
        },

          err => {

          })
    };
    if (info.path && rollId) {
      getUsers()
    }

  }, [info.path, rollId])


  let program_1 = [{}]
  if (roleProgramData.length) {
    program_1 = roleProgramData.filter(item => item.program_id === 1)
  }
  const program_2 = roleProgramData.filter(item => item.program_id === 2)
  const program_3 = roleProgramData.filter(item => item.program_id === 3)
  const program_4 = roleProgramData.filter(item => item.program_id === 4)
  const program_5 = roleProgramData.filter(item => item.program_id === 5)
  const program_6 = roleProgramData.filter(item => item.program_id === 6)
  const program_7 = roleProgramData.filter(item => item.program_id === 7)
  const program_8 = roleProgramData.filter(item => item.program_id === 8)
  const program_9 = roleProgramData.filter(item => item.program_id === 9)
  const program_10 = roleProgramData.filter(item => item.program_id === 10)
  const program_11 = roleProgramData.filter(item => item.program_id === 11)
  const program_12 = roleProgramData.filter(item => item.program_id === 12)
  const program_13 = roleProgramData.filter(item => item.program_id === 13)
  const program_14 = roleProgramData.filter(item => item.program_id === 14)
  const program_15 = roleProgramData.filter(item => item.program_id === 15)
  const program_16 = roleProgramData.filter(item => item.program_id === 16)
  const leaseAdmin = roleProgramData.filter(item => item.program_id === 20)
  const logAudit = roleProgramData.filter(item => item.program_id === 21)
  let program_17 = [{}]
  if (roleProgramData.length) {
    program_17 = roleProgramData.filter(item => item.program_id === 17)
  }
  // else {
  //     program_17 = []
  // }
  let eventAccess = 1;
  // if (!roleProgramData.length) {
  //     eventAccess = 0;
  // }
  if (roleProgramData.length && !program_13.length && !program_14.length && !program_15.length && !program_16.length) {
    eventAccess = 0;
  }
  // else {
  //     eventAccess = 1
  // }
  let employeeAccess = 1;
  if (roleProgramData.length && !program_3.length && !program_4.length && !program_5.length && !program_6.length && !program_7.length && !program_8.length) {
    employeeAccess = 0;
  }
  // else if (!roleProgramData.length) {
  //     employeeAccess = 0
  //    
  // }
  else {
    employeeAccess = 1
  }
  let tipsoi_18 = [{}]
  if (roleProgramData.length) {
    tipsoi_18 = roleProgramData.filter(item => item.program_id === 18)
  }

  useEffect(() => {
    if (singleRoleProData) {
      dispatch(program({ p_id: singleRoleProData.program_id, path: info.path ? info.path : "" }))
    }

  }, [singleRoleProData])

  // english number to bangla number convert
  const toBn = n => {
    if (n) {
      return `${n}`.replace(/\d/g, d => "০১২৩৪৫৬৭৮৯"[d])
    } else {
      return "";
    }
  }

  // date convert function
  const dateConvert = (getInputDate, convertType) => {
    const getDate = `${getInputDate}`.slice(0, 10);
    if (convertType === 1) {
      const splitData = getDate.split('-')
      const ye = splitData[0]
      const mo = splitData[1]
      const da = splitData[2]
      return `${da}/${mo}/${ye}`
    }
    else if (convertType === 2) {
      const splitData = getDate.split('-')
      const ye = splitData[0]
      const mo = splitData[1]
      const da = splitData[2]
      return `${mo}/${da}/${ye}`
    }
    else if (convertType === 3) {
      const splitData = getDate.split('-')
      const ye = splitData[0]
      const mo = splitData[1]
      const da = splitData[2]
      return `${mo}-${da}-${ye}`
    }
    else if (convertType === 4) {
      const localDate = getInputDate.toLocaleDateString("es-CL")
      const splitData = localDate.split('-')
      const ye = splitData[2]
      const mo = splitData[1]
      const da = splitData[0]
      return `${ye}-${mo}-${da}T00:00:00Z`
    }
    else if (convertType === 5) {
      const splitData = getDate.split('-')
      const ye = splitData[0]
      const mo = splitData[1]
      const da = splitData[2]
      return `${da}-${mo}-${ye}`
    }
    else if (convertType === 6 && getDate.length) {
      const splitData = getDate.split('-')
      const ye = splitData[0]
      const mo = splitData[1]
      const da = splitData[2]
      return `${toBn(da)}/${toBn(mo)}/${toBn(ye)}`

    }
    else if (convertType === 7 && getDate.length) {
      const splitData = getDate.split('/')
      const ye = splitData[2]
      const mo = splitData[1]
      const da = splitData[0]
      return `${toBn(da)}/${toBn(mo)}/${toBn(ye)}`

    }
    else if (convertType === 8) {
      const splitData = getDate.split('/')
      const ye = splitData[2]
      const mo = splitData[1]
      const da = splitData[0]
      return `${da}-${mo}-${ye}`

    }
    else {
      const splitData = getDate.split('-')
      const ye = splitData[2]
      const mo = splitData[1]
      const da = splitData[0]
      return `${ye}-${mo}-${da}`
    }
  }


  // search function
  const searchFunction = (getData, getSearchData, getField1, getField2, getField3, getField4, getField5, getField6, getField7, getField8) => {

    const searchData = getData.filter(item => {
      if (getSearchData == '') {
        return item;
      }
      else if ((item[getField1] && item[getField1].toLowerCase().includes(getSearchData.toLocaleLowerCase())) || (item[getField2] && (item[getField2].toString()).toLowerCase().includes(getSearchData.toLocaleLowerCase())) || (item[getField3] && item[getField3].toLowerCase().includes(getSearchData.toLocaleLowerCase())) || (item[getField4] && item[getField4].toLowerCase().includes(getSearchData.toLocaleLowerCase())) || (item[getField5] && item[getField5].toLowerCase().includes(getSearchData.toLocaleLowerCase())) || (item[getField6] && item[getField6].toLowerCase().includes(getSearchData.toLocaleLowerCase())) || (item[getField7] && item[getField7].toLowerCase().includes(getSearchData.toLocaleLowerCase())) || (item[getField8] && item[getField8].toLowerCase().includes(getSearchData.toLocaleLowerCase())) || '') {
        return item;
      }

    })
    return searchData
  }
  // end

  return {
    user,
    setUser,
    error,
    loading,
    loginAction,
    logoutAction,
    loggedStatus,
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
    eventAccess,
    employeeAccess,
    leaseAdmin,
    secretToken,
    roleProgramData,
    singleRoleProData,
    hasError,
    dateConvert,
    searchFunction,
    toBn
  }
}
export default useServer;
