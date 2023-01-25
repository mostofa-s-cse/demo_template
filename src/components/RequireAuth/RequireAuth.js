import { Navigate, useLocation } from "react-router-dom";

const RequireAuth = ({ children }) => {
  // const [user, loading] = useAuthState(auth);
  const location = useLocation();

  // if(loading){
  //     return <Loading></Loading>
  // }

  if (!localStorage.getItem("token")) {
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
  }
  return children;
};

export default RequireAuth;
