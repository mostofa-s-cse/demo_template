import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Select from 'react-select'
const AddressInformation = ({ parentCallbackC }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [count, setCount] = useState(1);


    const [districtData, setDistrictData] = useState([]);
    const [presentCategory, setPresentCategory] = useState();
    const [permanentCategory, setPermanentCategory] = useState();
    const [officialCategory, setOfficialCategory] = useState();
    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        const getUsers = () => {
            fetch('/ords/hrm/dist/crud')
                .then(res => {
                    if (res.status >= 400) {
                        throw new Error("Server responds with error!")
                    }
                    return res.json()
                })
                .then(data => {
                    setDistrictData(data.items)
                    setIsLoading(true);
                },
                    err => {
                        const mute = err
                        setHasError(true);
                        setIsLoading(true);
                    })
        };
        getUsers()
    }, [])

    const handlePresentSelectCategory = selectedOption => {
        setPresentCategory(selectedOption.value);

    }
    const handlePermanentSelectCategory = selectedOption => {
        setPermanentCategory(selectedOption.value);

    }
    const handleOfficialSelectCategory = selectedOption => {
        setOfficialCategory(selectedOption.value);

    }
    let categoryOptions = districtData.map(data => {
        let optionsItem = {};
        optionsItem.value = data.district_id;
        optionsItem.label = data.district;
        return optionsItem;
    })

    const onSubmit = data => {
        if (!presentCategory) {
            data.present_adress_district = empData.present_adress_district;
        }
        else {
            data.present_adress_district = presentCategory;
        }
        if (!permanentCategory) {
            data.permanent_adress_district = empData.permanent_adress_district;
        }
        else {
            data.permanent_adress_district = permanentCategory;
        }
        if (!officialCategory) {
            data.official_adress_district = empData.official_adress_district;
        }
        else {
            data.official_adress_district = officialCategory;
        }
        window.sessionStorage.setItem("address_information", JSON.stringify(data))
        setCount((count) => count + 1);
        parentCallbackC(count);

    };
    let empData = {};
    const employeeData = JSON.parse(window.sessionStorage.getItem('address_information'));
    if (employeeData) {
        empData = { ...employeeData };
    }


    return (
        <div>
            {/* ---------------------------------Address Information-------------------------------------------------- */}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='row gx-5 border text-start mb-3 shadow p-3 mt-3 bg-white rounded-3'>
                    <h4 className='text-center bgColor py-1 text-white rounded mb-3'>Address Information</h4>

                    {/* -----------------------------------------Present Address----------------------------------------------- */}

                    <div className="col-sm-4 border-end ">
                        <h5 className='text-start  '>Present Address</h5>
                        <hr className='mb-4' />
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInput28" className="form-label small fw-bold">Village/House N°. Road</label>
                            <input defaultValue={empData.present_adress_adress} type="text" className="form-control" id="exampleFormControlInput28" placeholder="address"  {...register("present_adress_adress")} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInput29" className="form-label  small fw-bold">Post Office</label>
                            <input defaultValue={empData.present_adress_po} type="text" className="form-control" id="exampleFormControlInput29" placeholder="Post Office" {...register("present_adress_po")} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInput30" className="form-label  small fw-bold">Upazila</label>
                            <input defaultValue={empData.present_adress_upazilla} type="text" className="form-control" id="exampleFormControlInput30" placeholder="Upazila" {...register("present_adress_upazilla")} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="inputGroupSelect31" className="form-label  small fw-bold">District</label>

                            <Select
                                defaultValue={{ label: `${empData.present_adress_district ? empData.present_adress_district : "select.."}`, value: empData.present_adress_district }}
                                options={categoryOptions}
                                onChange={handlePresentSelectCategory}
                                placeholder={"select"}
                            />
                        </div>





                    </div>

                    {/* --------------------------------------Permanent Address-------------------------------- */}
                    <div className=" col-sm-4 border-end">
                        <h5 className='text-start  '>Permanent Address</h5>
                        <hr className='mb-4' />
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInput32" className="form-label  small fw-bold">Village/House N°. Road</label>
                            <input defaultValue={empData.permanent_adress_adress} type="text" className="form-control" id="exampleFormControlInput32" placeholder="address" {...register("permanent_adress_adress")} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInput33" className="form-label  small fw-bold">Post Office</label>
                            <input defaultValue={empData.permanent_adress_po} type="text" className="form-control" id="exampleFormControlInput33" placeholder="Post Office" {...register("permanent_adress_po")} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInput34" className="form-label  small fw-bold">Upazila</label>
                            <input defaultValue={empData.permanent_adress_upazilla} type="text" className="form-control" id="exampleFormControlInput34" placeholder="Upazila" {...register("permanent_adress_upazilla")} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="inputGroupSelect35" className="form-label  small fw-bold">District</label>
                            <Select
                                defaultValue={{ label: `${empData.permanent_adress_district ? empData.permanent_adress_district : 'select..'}`, value: empData.permanent_adress_district }}
                                options={categoryOptions}
                                onChange={handlePermanentSelectCategory}
                                placeholder={"select"}
                            />
                        </div>


                    </div>


                    {/* --------------------------------------Official Address-------------------------------- */}
                    <div className=" col-sm-4">
                        <h5 className='text-start  '>Official Address</h5>
                        <hr className='mb-4' />
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInput36" className="form-label  small fw-bold">Village/House N°. Road</label>
                            <input defaultValue={empData.official_adress_adress} type="text" className="form-control" id="exampleFormControlInput36" placeholder="address" {...register("official_adress_adress")} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInput37" className="form-label  small fw-bold">Post Office</label>
                            <input defaultValue={empData.official_adress_po} type="text" className="form-control" id="exampleFormControlInput37" placeholder="Post Office"  {...register("official_adress_po")} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInput38" className="form-label  small fw-bold">Upazila</label>
                            <input defaultValue={empData.official_adress_upazilla} type="text" className="form-control" id="exampleFormControlInput38" placeholder="Upazila"  {...register("official_adress_upazilla")} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="inputGroupSelect39" className="form-label  small fw-bold">District</label>
                            <Select
                                defaultValue={{
                                    label: `${empData.official_adress_district ?
                                        empData.official_adress_district
                                        : "select.."}`, value: empData.official_adress_district
                                }}
                                options={categoryOptions}
                                onChange={handleOfficialSelectCategory}

                            />
                        </div>

                    </div>
                    <div className='text-end'>
                        <input className=' submit-Btn-style' type="submit" value="Next Page" />
                    </div>
                </div>

            </form>

        </div>
    );
};

export default AddressInformation;