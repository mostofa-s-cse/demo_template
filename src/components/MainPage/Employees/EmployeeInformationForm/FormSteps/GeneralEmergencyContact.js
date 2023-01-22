import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
const GeneralEmergencyContact = ({ parentCallbackB }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [count, setCount] = useState(1);
    const onSubmit = data => {
        if (data.freedom_fighter === "yes") {
            data.freedom_fighter = 1;
        }
        else {
            data.freedom_fighter = 0
        }
        if (data.grandchild_ff === "yes") {
            data.grandchild_ff = 1;
        }
        else {
            data.grandchild_ff = 0
        }
        if (data.tribal === "yes") {
            data.tribal = 1;
        }
        else {
            data.tribal = 0
        }
        window.sessionStorage.setItem("general_Em_details", JSON.stringify(data))
        setCount((count) => count + 1);
        parentCallbackB(count);



    }
    let empData = {};
    const employeeData = JSON.parse(window.sessionStorage.getItem('general_Em_details'));
    if (employeeData) {
        empData = { ...employeeData };
    }





    return (
        <div>

            {/* ------------------------General AND Emergency Contact------------------------------------- */}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='row gx-5 text-start mb-3 border shadow p-3 mt-3 bg-white rounded-3'>

                    {/* --------------------------------------------------------General----------------------------------------------- */}

                    <div className="col-sm-6 border-end  mb-5 ">
                        <h4 className='text-center bgColor py-1 rounded text-white '>General</h4>

                        <div className="mb-3">
                            <label htmlFor="inputGroupSelect20" className="form-label small fw-bold">Employee Blood</label>
                            <select defaultValue={empData.blood_group} className="form-select" id="inputGroupSelect20"  {...register("blood_group")}>
                                <option value=''>Please Select Option</option>
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputGroupSelect21" className="form-label small fw-bold">Religion</label>
                            <select defaultValue={empData.religion} className="form-select" id="inputGroupSelect21" {...register("religion")}>
                                <option value="">Please Select Option</option>
                                <option value="Islam">Islam</option>
                                <option value="Hinduism">Hinduism</option>
                                <option value="Buddhism">Buddhism</option>
                                <option value="Christianity">Christianity</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="inputGroupSelect22" className="form-label small fw-bold">Gender</label>
                            <select defaultValue={empData.gender} className="form-select" id="inputGroupSelect22" {...register("gender")} >
                                <option value="">Please Select Option</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Others">Others</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputGroupSelect23" className="form-label small fw-bold me-5">Quota</label>
                            <div className="form-check" id="inputGroupSelect23">
                                <div className="form-check">
                                    <input defaultChecked={empData.freedom_fighter} className="form-check-input" type="checkbox" id="flexCheck1" value="yes" {...register("freedom_fighter")} />
                                    <label className="form-check-label" htmlFor="flexCheck1">
                                        Freedom Fighter
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input defaultChecked={empData.grandchild_ff} className="form-check-input" type="checkbox" id="flexCheck2" value="yes" {...register("grandchild_ff")} />
                                    <label className="form-check-label" htmlFor="flexCheck2">
                                        Child/Grandchild of Freedom fighter
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input defaultChecked={empData.tribal} className="form-check-input" type="checkbox" id="flexCheck3" value="yes" {...register("tribal")} />
                                    <label className="
form-check-label" htmlFor="flexCheck3">
                                        Tribal
                                    </label>
                                </div>


                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputGroupSelect24" className="form-label small fw-bold">Nationality</label>
                            <select defaultValue={empData.nationality} className="form-select" id="inputGroupSelect24" {...register("nationality")} >
                                <option value="">Please Select Option</option>
                                <option value="Bangladeshi">Bangladeshi</option>
                                <option value="Others">Others</option>

                            </select>
                        </div>


                    </div>

                    {/* --------------------------------------Emergency Contact-------------------------------- */}
                    <div className=" col-sm-6">
                        <h4 className='text-center bgColor py-1 text-white rounded  mb-3'>Emergency Contact</h4>

                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInput25" className="form-label small fw-bold">Name</label>
                            <input defaultValue={empData.emergency_contact} type="text" className="form-control" id="exampleFormControlInput25" placeholder="Emergency Contact" {...register("emergency_contact")} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInput26" className="form-label small fw-bold">Relation</label>
                            <input defaultValue={empData.emergency_relation} type="text" className="form-control" id="exampleFormControlInput26" placeholder="Emergency Relation" {...register("emergency_relation")} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInput27" className="form-label small fw-bold">Phone No</label>
                            <input defaultValue={empData.emergency_phone} type="number" className="form-control" id="exampleFormControlInput27" placeholder="Phone No"  {...register("emergency_phone")} />
                        </div>


                    </div>
                    <div className='text-end'>
                        <input className=' submit-Btn-style' type="submit" value="Next Page" />
                    </div>
                </div>

            </form >

        </div >
    );
};

export default GeneralEmergencyContact;