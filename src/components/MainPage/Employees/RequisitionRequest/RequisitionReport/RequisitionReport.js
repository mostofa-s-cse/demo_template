import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { landingIcon1, logImg2 } from '../../../../Entryfile/imagepath';
import { Markup } from 'interweave';
import Api from '../../../../initialpage/hooks/Api';
const RequisitionReport = () => {
    const { req_id } = useParams();
    const [item, setItem] = useState({});
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    const [data, setData] = useState([])
    useEffect(() => {
        const getUsers = () => {
            fetch(`/ords/hrm/software_requisition/v_soft_req/${req_id}`)
                .then(res => {
                    // You have to send it, as I have done below
                    if (res.status >= 400) {
                        throw new Error("Server responds with error!")
                    }
                    return res.json()
                })
                .then(users => {

                    setData(users.items[0]);
                },
                    err => {
                    })
        };
        getUsers()
    }, [req_id])
    return (
        <div className='page-wrapper'>
            <div className='text-end me-5'>
                <button className="btn-clr px-3  my-2 rounded  bgColor fs-6 text-white" onClick={handlePrint}>Print !</button>
            </div>
            <div ref={componentRef} className="my-5">
                <div className="my-5 text-start font-size py-3 bg-white mx-4  ">
                    <div className="row text-center mb-5" >
                        <div className="col-3">
                            {/* <img className="img-fluid" width="80" src={landingIcon1} alt="" /> */}
                        </div>
                        <div className="col-6">
                            <h4>গণপ্রজাতন্ত্রী বাংলাদেশ  সরকার </h4>
                            <h5 className='lh-base'>বাংলাদেশ সেতু কর্তৃপক্ষ <br /> সেতু ভবন,বনানী,ঢাকা-১২১২</h5>
                        </div>
                        <div className="col-3">
                            {/* <img className="img-fluid" width="160" src={logImg2} alt="" /> */}
                        </div>
                    </div>
                    <div className='row px-3'>
                        <div className='col-sm-9 col-9 col-md-9 col-lg-9'>
                            <h5 className='mb-5'>Requisitioner: {data.name_english}</h5>
                            <h5>Module: {data.module_app}</h5>
                            <h5>Sub Module: {data.submodule_app}</h5>
                        </div>
                        <div className='col-sm-3 col-3 col-md-3 col-lg-3'>
                            <h5>Requisition Date: {data.requsition_date}</h5>
                        </div>
                    </div>
                    <hr />
                    <div className=' px-3'>
                        <div className='row mb-2'>
                            <div className='col-sm-1 col-1 col-md-1 col-lg-1 mb-3'>
                                <h5>Subject:</h5>
                            </div>
                            <div className='col-sm-11 col-11 col-md-11 col-lg-11'>
                                {data.title}
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm-1 col-1 col-md-1 col-lg-1 mb-3'>
                                <h5>Details:</h5>
                            </div>
                            <div className='col-sm-11 col-11 col-md-11 col-lg-11'>
                                <Markup content={data.details} />
                            </div>
                        </div>
                        <div>
                            <h5 className='mb-3'> Screenshot:</h5>
                            {
                                data.file_path ?
                                    <img
                                        className='w-75'
                                        src={`http://${Api}/static${data.file_path}`}
                                    /> :
                                    ""
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default RequisitionReport;







