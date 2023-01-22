import React from 'react';
import Cookies from 'js-cookie';
import swal from 'sweetalert';
const Logout = () => {
    const pathName = window.location.pathname;
    const logInStatus = Cookies.get("Role");

    swal({
        title: "Are you sure you want to log out?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (pathName === "/logout" && willDelete) {
                Cookies.remove("token");
                Cookies.remove("Role");
                Cookies.remove("userId");
                localStorage.clear();
                sessionStorage.clear();
            }
            if (!logInStatus) {
                window.location.reload();
            }
            else {
                window.location.href = '/'
            }
        });


    return (
        <div className='mt-5'>
            <div className="spinner-border text-info my-5" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
};

export default Logout;