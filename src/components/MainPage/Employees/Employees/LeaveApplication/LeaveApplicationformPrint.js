import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import useAuth from '../../../../initialpage/hooks/useAuth';
const LeaveApplicationformPrint = () => {
  let navigate = useNavigate();
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const { dateConvert, toBn } = useAuth()

  const [singleLeaveData, setSingleLeaveData] = useState({})
  const { l_id } = useParams()
  // Get Leave Data
  useEffect(() => {
    const getUsers = () => {
      fetch(`/ords/hrm/emp_lea/v_emp_lea/${l_id}`)
        .then((res) => {
          // You have to send it, as I have done below
          if (res.status >= 400) {
            throw new Error("Server responds with error!");
          }
          return res.json();
        })
        .then(
          (users) => {
            setSingleLeaveData(users);

          },
        );
    };
    if (l_id) {
      getUsers();
    }
  }, [l_id]);
  const requestData = singleLeaveData.leave_req_date ? dateConvert(singleLeaveData?.leave_req_date, 6) : "___ / ____ /_____"
  const getFromData = singleLeaveData.date_from ? dateConvert(singleLeaveData?.date_from, 7) : "";
  const toData = singleLeaveData.date_to ? dateConvert(singleLeaveData?.date_to, 7) : ""

  return (
    <div>
      <style>
        {" @media print{body{margin-left: 10%}} "}
      </style>
      <div className='page-wrapper'>
        <div>

          <div className='mt-5 d-flex justify-content-between'>
            <button className='btn btn-primary  ms-4' onClick={() => navigate(-1)}><i class="fa fa-arrow-left" aria-hidden="true"></i> Back </button>
            <button className='btn btn-primary me-4' onClick={handlePrint}><i className='la la-file-pdf-o'></i> Print!</button>


          </div>

        </div>



        <div className="container">
          <div ref={componentRef} className="my-3">

            {Object.keys(singleLeaveData).length &&
              <div style={{ wordSpacing: "3px" }} className="container leaveFrom ms-lg-5 ps-lg-5 text-start my-5 py-5">

                <p>তারিখঃ {requestData}</p>
                <p className='mt-1'>বরাবর</p>
                <p>অতিরিক্ত পরিচালক (প্রশাসন) </p>
                <p>বাংলাদেশ সেতু কর্তৃপক্ষ</p>
                <p>সেতু ভবন, বনানী, ঢাকা।</p>

                <p className='mt-4 fw-bold'>বিষয়ঃ {toBn(singleLeaveData?.duration)} দিনের {singleLeaveData?.leave_type_bangla} ও কর্মস্থল ত্যাগের অনুমতি চেয়ে আবেদন । </p>
                <p className='mt-4 '>জনাব, </p>
                <p className='mt-4 lh-lg application-data-break'>যথাবিহিত সম্মান প্রদর্শনপূর্বক সবিনয় বিনীত নিবেদন এই যে, আমি বর্তমানে বাংলাদেশ সেতু  কর্তৃপক্ষের {singleLeaveData?.designation_bn}  পদে কর্মরত আছি। {singleLeaveData?.cause} আগামী {getFromData} - {toData} তারিখ আমার {toBn(singleLeaveData?.duration)} দিনের নৈমিত্তিক ছুটি ও কর্মস্থল  ত্যাগের অনুমতি প্রয়োজন। </p>

                <p className='mt-4 lh-lg application-data-break'>অতএব, সবিনয় বিনীত নিবেদন এই যে, আমাকে উক্ত {toBn(singleLeaveData?.duration)} দিনের নৈমিত্তিক ছুটি মঞ্জুর করে কর্মস্থল ত্যাগের অনুমতি দানে বাধিত করবেন। </p>

                <p className='mt-3'>ছুটিকালীন যোগাযোগঃ {toBn(singleLeaveData?.mobile)}</p>
                <p>বিনীত নিবেদক </p>
                <p className="fw-bold mt-5"> {singleLeaveData?.emp_name_bn}  </p>
                <p> {singleLeaveData?.designation_bn}  </p>
                <p>বাংলাদেশ সেতু কর্তৃপক্ষ </p>
                <p >সেতু ভবন, বনানী, ঢাকা। </p>



              </div>
            }

          </div>
          <br />
          <br />
          <br />
          <br />
        </div>
      </div>
    </div>
  );
};

export default LeaveApplicationformPrint;