import React, { useEffect, useState } from 'react';
import axios from 'axios';
const EmployeeSubmit = () => {
    const addressData = JSON.parse(window.sessionStorage.getItem('address_information'));
    const documentsData = JSON.parse(window.sessionStorage.getItem('documents'));
    // const educationData = JSON.parse(window.sessionStorage.getItem('education_information'));
    const employeeData = JSON.parse(window.sessionStorage.getItem('emp_details'))
    // const childData = JSON.parse(window.sessionStorage.getItem('child_information'));
    const familyData = JSON.parse(window.sessionStorage.getItem('family_information'));
    const generalData = JSON.parse(window.sessionStorage.getItem('general_Em_details'));
    const jobData = JSON.parse(window.sessionStorage.getItem('job_details'));
    const [success, setSuccess] = useState(false)
    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [eIdData, seteIdData] = useState('');
    const [eduInsertOutput, setEduInsertOutput] = useState('');
    const [childInsertOutput, setChildInsertOutput] = useState('');
    const [docuInsertOutput, setDocuInsertOutput] = useState('');
    useEffect(() => {
        const getUsers = () => {
            fetch('/ords/hrm/employees/emp_max_id')
                .then(res => {
                    if (res.status >= 400) {
                        throw new Error("Server responds with error!")
                    }
                    return res.json()
                })
                .then(data => {
                    seteIdData(data.employee_id)
                    setIsLoading(true);
                },
                    err => {
                        const mute = err
                        setHasError(true);
                        setIsLoading(true);
                    })
        };
        getUsers()
        setTimeout(() => {

        }, 5000);
    }, [])



    const handleSubmitButton = () => {



        //  -----------  employeeData post

        axios({
            method: 'post',
            url: '/ords/hrm/employees/crud',
            data: {
                EMPLOYE_ID: eIdData,
                DESIGNATION_ID: jobData.designation,
                DEPARTEMENT_ID: jobData.departement,
                EMPLOYE_REGISTRATION_NUMBER: employeeData.EMPLOYE_REGISTRATION_NUMBER,
                CADRE: jobData.cadre,
                EMAIL_ADRESS: jobData.email_adress,
                MOBILE_PHONE: employeeData.mobile_phone,
                TELEPHONE_NUMBER: jobData.telephone_number,
                NAME_BANGLA: employeeData.name_bangla,
                NAME_ENGLISH: employeeData.name_english,
                FATHER_BANGLA: employeeData.father_bangla,
                FATER_ENGLIH: employeeData.fater_englih,
                MOTHER_BANGLA: employeeData.mother_bangla,
                MOTHER_ENGLISH: employeeData.mother_english,
                DATE_BIRTH: employeeData.date_birth ? employeeData.date_birth : null,
                JOINING_DATE: jobData.joining_date ? jobData.joining_date : null,
                LRP_DATE: jobData.lrp_date ? jobData.lrp_date : null,
                // this i want to see
                BLOOD_GROUP: generalData.blood_group,
                RELIGION: generalData.religion,
                GENDER: generalData.gender ? generalData.gender : null,
                FREEDOM_FIGHTER: generalData.freedom_fighter,
                GRANDCHILD_FF: generalData.grandchild_ff,
                TRIBAL: generalData.tribal,
                NATIONALITY: generalData.nationality,
                CARD_ID: employeeData.card_id,
                RETIREMENT_ID: null,
                DATE_CONFIRMATION: jobData.date_confirmation,
                SPOUSE_NAME: familyData.spouse_name,
                SPOUSE_CARD_ID: familyData.spouse_card_id,
                SPOUSE_NATIONALITY: familyData.spouse_nationality,
                PRESENT_ADRESS_ADRESS: addressData.present_adress_adress,
                PRESENT_ADRESS_PO: addressData.present_adress_po,
                PRESENT_ADRESS_UPAZILLA: addressData.present_adress_upazilla,
                PRESENT_ADRESS_DISTRICT: addressData.present_adress_district,
                PERMANENT_ADRESS_ADRESS: addressData.permanent_adress_adress,
                PERMANENT_ADRESS_PO: addressData.permanent_adress_po,
                PERMANENT_ADRESS_UPAZILLA: addressData.permanent_adress_upazilla,
                PERMANENT_ADRESS_DISTRICT: addressData.permanent_adress_district,
                OFFICIAL_ADRESS_ADRESS: addressData.official_adress_adress,
                OFFICIAL_ADRESS_PO: addressData.official_adress_po,
                OFFICIAL_ADRESS_UPAZILLA: addressData.official_adress_upazilla,
                OFFICIAL_ADRESS_DISTRICT: addressData.official_adress_district,
                DATE_LEAVE: null,
                INACTIVE_REASON: null,
                ACTIVE: 1,
                PHOTO: null,
                PHOTO_PATH: employeeData.photo_path,
                EMERGENCY_CONTACT: generalData.emergency_contact,
                EMERGENCY_RELATION: generalData.emergency_relation,
                EMERGENCY_PHONE: generalData.emergency_phone,
                // IMAGE: {}.employeeData.image,
                SPOUSE_PHOTO: familyData.SPOUSE_PHOTO
            },
            headers: { 'Authorization': 'Bearer ...' }
        })
            .then(res => {

                if (!res.data) {
                    setSuccess(true)
                }

            })


        // -------------------------------document post----------------------------
        setTimeout(() => {
            if (documentsData && documentsData.DOCUMENT_TYPE_ID) {
                let data = { ...documentsData }
                data.EMPLOYE_ID = eIdData;


                axios({
                    method: 'post',
                    url: '/ords/hrm/emp_doc/crud',
                    data,
                    headers: { 'Authorization': 'Bearer ...' }
                })
                    .then(res => {


                        setDocuInsertOutput(res.data)
                    })
            }
        }, 500);





        // -------------------------------child post -------------------

        // childData.forEach(function (arrayItem) {
        //     setTimeout(() => {
        //         axios({
        //             method: 'post',
        //             url: '/ords/hrm/emp_chi/crud',
        //             data: {
        //                 EMPLOYEE_CHILD_ID: null,
        //                 EMPLOYE_ID: eIdData,
        //                 CHILD_NAME: arrayItem.CHILD_NAME,
        //                 DATE_BIRTH: arrayItem.DATE_BIRTH,
        //                 GENDER: arrayItem.GENDER,
        //                 SCHOOL: arrayItem.SCHOOL,
        //                 CHILD_CLASS: arrayItem.CHILD_CLASS,
        //                 CERTIFICATE_PATH: arrayItem.CERTIFICATE_PATH,
        //                 CHILD_PHOTO_FILE: arrayItem.CHILD_PHOTO_FILE,
        //                 CHILD_CERTIFICATE_FILE: arrayItem.CHILD_CERTIFICATE_FILE

        //             },
        //             headers: { 'Authorization': 'Bearer ...' }
        //         })
        //             .then(res => {
        //                
        //                 setChildInsertOutput(res.data)
        //             })
        //     }, 500);
        // });

        // childData.map(postItem => {
        //    


        // }

        // )



        // // ---------------  Education post  ----------------

        // educationData.forEach(function (arrayItem) {
        //     let data = { ...arrayItem }
        //     data.EMPLOYE_ID = eIdData;
        //     data.EMPLOYEE_EDUC_ID = null;
        //     setTimeout(() => {
        //         axios({
        //             method: 'post',
        //             url: '/ords/hrm/emp_edu/crud',
        //             data,
        //             headers: { 'Authorization': 'Bearer ...' }
        //         })
        //             .then(res => {
        //                
        //                 setEduInsertOutput(res.data)
        //             })
        //     }, 10);

        // });



        // educationData.map(postItem => {
        //     let data = { ...postItem }
        //     data.EMPLOYE_ID = eIdData;
        //    
        //     setTimeout(() => {
        //         axios({
        //             method: 'post',
        //             url: '/ords/hrm/emp_edu/crud',
        //             data,
        //             headers: { 'Authorization': 'Bearer ...' }
        //         })
        //             .then(res => {
        //                
        //                 setEduInsertOutput(res.data)
        //             })
        //     }, 3000);



        // }

        // )









        window.sessionStorage.removeItem('address_information');
        window.sessionStorage.removeItem('documents');
        window.sessionStorage.removeItem('emp_details')
        window.sessionStorage.removeItem('family_information');
        window.sessionStorage.removeItem('general_Em_details');
        window.sessionStorage.removeItem('job_details');
    }
    return (
        <div className='my-5'>
            {!success &&
                <div className='text-center p-3'>
                    <button onClick={handleSubmitButton} className='submit-Btn-style'> Submit </button>
                </div>
            }
            {
                success && <>
                    <h3 className='text-success'>Employee Inserted</h3>
                    {/* {
                        eduInsertOutput ?
                            <h5 className='text-danger'>{eduInsertOutput}</h5>
                            :
                            <h5 className='text-success'>Education Inserted</h5>
                    }
                    {
                        childInsertOutput ?
                            <h5 className='text-danger'>{childInsertOutput}</h5>
                            :
                            <h5 className='text-success'>Child Inserted</h5>
                    } */}
                    {
                        docuInsertOutput && documentsData ?
                            <h5 className='text-danger'>{docuInsertOutput}</h5>
                            :
                            <h5 className='text-success'>Documents Inserted</h5>
                    }
                </>
            }

        </div>
    );
};

export default EmployeeSubmit;