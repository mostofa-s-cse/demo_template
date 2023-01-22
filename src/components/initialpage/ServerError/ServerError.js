import React from 'react';
import { serverError } from "../../Entryfile/imagepath"
const ServerError = () => {
    return (
        <div className='py-5 mt-5 bg-error'>
            <img className="pb-3" src={serverError} alt="" />
            <h5 className='text-white lh-lg mb-5 pb-5'>Sorry, we are unable to serve you due to service interruption. <br /> Please try again after a while. <br /> If the problem persists, contact support team.</h5>

        </div>
    );
};

export default ServerError;