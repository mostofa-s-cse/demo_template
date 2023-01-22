import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Api from "../../../../initialpage/hooks/Api";
const FamilyInformation = ({ parentCallbackD }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // const dataChild = JSON.parse(window.sessionStorage.getItem('child_information'));
  // let childsData = []
  // if (dataChild) {
  //     childsData = [...dataChild]
  // }

  // const [theArray, setTheArray] = useState([...childsData]);
  // const [certificateFilePath, setCertificateFilePath] = useState(null)
  // const [childFilePath, setChildFilePath] = useState(null)
  const [spouseFilePath, setSpouseFilePath] = useState(null);
  const [childBirthDate, setChildBirthDate] = useState(null);

  // ----------------------------Convert image ---------

  // const uploadCertificateImage = async (e) => {
  //     const file = e.target.files[0];
  //     const formData = new FormData()

  //     formData.append('image', file)

  //     axios({
  //         method: 'post',
  //         url: ' http://${Api}/addImages',
  //         data: formData,
  //         headers: { 'Authorization': 'Bearer ...' }
  //     })
  //         .then((data) => {
  //             setCertificateFilePath(data.data);
  //         })
  // };
  // const uploadChildImage = async (e) => {
  //     const file = e.target.files[0];
  //     const formData = new FormData()

  //     formData.append('image', file)

  //     axios({
  //         method: 'post',
  //         url: ' http://${Api}/addImages',
  //         data: formData,
  //         headers: { 'Authorization': 'Bearer ...' }
  //     })
  //         .then((data) => {
  //             setChildFilePath(data.data);
  //         })
  // };
  const uploadSpouseImage = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();

    formData.append("image", file);

    axios({
      method: "post",
      url: `http://${Api}/addSpouseImages`,
      data: formData,
      headers: { Authorization: "Bearer ..." },
    }).then((data) => {
      setSpouseFilePath(data.data);
    });
  };

  // End image convert

  const {
    register: register2,
    formState: { errors: errors2 },
    handleSubmit: handleSubmit2,
  } = useForm();
  const [count, setCount] = useState(1);

  //------------------------------- spouse information
  const onSubmit = (data) => {
    if (spouseFilePath) {
      data.SPOUSE_PHOTO = spouseFilePath;
    } else if (employeeData && employeeData.SPOUSE_PHOTO && !spouseFilePath) {
      data.SPOUSE_PHOTO = employeeData.SPOUSE_PHOTO;
    } else {
      data.SPOUSE_PHOTO = "";
    }
    window.sessionStorage.setItem("family_information", JSON.stringify(data));
    setCount((count) => count + 1);
    parentCallbackD(count);
  };

  // if (dataChild) {
  //     setTheArray([...theArray, dataChild])
  // }
  //  ----------------------------------------  child data  date_birth
  // const onSubmitChild = childData => {
  //     if (childFilePath) {
  //         childData.CHILD_PHOTO_PATH = childFilePath;
  //     }
  //     else {
  //         childData.child_image = "";
  //     }
  //     if (certificateFilePath) {
  //         childData.CERTIFICATE_PATH = certificateFilePath;
  //     }
  //     else {
  //         childData.CERTIFICATE_PATH = ""
  //     }
  //     if (childBirthDate) {
  //         childData.date_birth = childBirthDate.toISOString();
  //     }
  //     const postChildData = {
  //         CHILD_NAME: childData.child_name,
  //         GENDER: childData.gender,
  //         DATE_BIRTH: childData.date_birth,
  //         SCHOOL: childData.school,
  //         CHILD_CLASS: childData.child_class,
  //         CERTIFICATE_PATH: childData.CERTIFICATE_PATH,
  //         CHILD_PHOTO_FILE: null,
  //         CHILD_PHOTO_PATH: childData.CHILD_PHOTO_PATH,
  //         CHILD_CERTIFICATE_FILE: null
  //     }

  //     setTheArray([...theArray, postChildData]);
  // }
  let empData = {};
  const employeeData = JSON.parse(
    window.sessionStorage.getItem("family_information")
  );

  if (employeeData) {
    empData = { ...employeeData };
  }
  return (
    <div>
      {/* --------------------------------------Children--------------------------------
       */}
      {/* <form key={2} onSubmit={handleSubmit2(onSubmitChild)}>
    <div className='row gx-5 text-start mb-3 border shadow p-3 mt-3 bg-white rounded-3'>
        <h4 className='text-center bgColor py-1 text-white  rounded mb-3'>Family Informations</h4>
        <div className=" col-sm-6 ">
            <div className='d-flex justify-content-between'>
                <h5 className='text-start mb-5 '>Children</h5>

            </div>

            <div className="mb-3">
                <label htmlFor="exampleFormControlInput44" className="form-label small fw-bold">Name</label>
                <input defaultValue={empData.child_name} type="text" className="form-control" id="exampleFormControlInput44" placeholder="Name" {...register2("child_name", { required: true })} />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleFormControlInput45" className="form-label small fw-bold">Date of birth</label>
                <DateTimePicker format={`dd/MM/yyyy 00:00`}
                    className="w-100"
                    onChange={setChildBirthDate}
                    value={childBirthDate}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="inputGroupSelect46" className="form-label small fw-bold">Gender</label>
                <select defaultValue={empData.gender} className="form-select" id="inputGroupSelect46" {...register2("gender")}  >
                    <option value="">Please Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Others">Others</option>
                </select>
            </div>

            <div className="mb-3">
                <label htmlFor="exampleFormControlInput47" className="form-label small fw-bold">School</label>
                <input defaultValue={empData.school} type="text" className="form-control" id="exampleFormControlInput47" placeholder="School"  {...register2("school")} />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleFormControlInput48" className="form-label small fw-bold">Class</label>
                <input defaultValue={empData.child_class} type="text" className="form-control" id="exampleFormControlInput48" placeholder="Class"  {...register2("child_class")} />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleFormControlInput49" className="form-label small fw-bold">Certificate</label>
                <input onChange={(e) => {
                    uploadCertificateImage(e);
                }} type="file" id="files" className="ms-2 " name="picture" />

            </div>
            <div className="mb-3">
                <label htmlFor="exampleFormControlInput50" className="form-label small fw-bold">Photo</label>

                <input onChange={(e) => {
                    uploadChildImage(e);
                }} type="file" id="files" className="ms-2" name="picture" />

            </div>


            <div className='text-end'> <button type="submit" className='rounded bgColor text-center fs-6 text-white'>+ Add Child</button></div>
        </div>


        {/* --------------------------------------children details show-------------------------------- */}
      {/*<div className=" col-sm-6">

            <table className="table table-hover">
                <thead className='bgColor text-white '>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Gender</th>
                        <th scope="col">Birth Date</th>
                        <th scope="col">School</th>
                        <th scope="col">Class</th>

                    </tr>
                </thead>
                <tbody>
                    {
                        theArray.map(childItem => <tr>

                            <td>{childItem.CHILD_NAME}</td>
                            <td>{childItem.GENDER}</td>
                            <td>{childItem.DATE_BIRTH}</td>
                            <td>{childItem.SCHOOL}</td>
                            <td>{childItem.CHILD_CLASS}</td>


                        </tr>)
                    }



                </tbody>
            </table>

        </div>




    </div>

</form> */}

      {/* ---------------------------Family Information------------------------ */}
      <form key={1} onSubmit={handleSubmit(onSubmit)}>
        <div className="row gx-5 text-start mb-3 border shadow p-3 mt-3 bg-white rounded-3">
          {/* -----------------------------------------Spouse----------------------------------------------- */}

          <div className="col-sm-12 mb-5">
            <h5 className="text-start mb-5 ">Spouse</h5>

            <div className="mb-3">
              <label
                htmlFor="exampleFormControlInput40"
                className="form-label small fw-bold"
              >
                Spouse Name
              </label>
              <input
                defaultValue={empData.spouse_name}
                type="text"
                className="form-control"
                id="exampleFormControlInput40"
                placeholder="Spouse Name"
                {...register("spouse_name")}
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="inputGroupSelect41"
                className="form-label small fw-bold"
              >
                Nationality
              </label>
              <select
                defaultValue={empData.spouse_nationality}
                className="form-select"
                id="inputGroupSelect41"
                {...register("spouse_nationality")}
              >
                <option value="">Please Select Nationality</option>
                <option value="Bangladeshi">Bangladeshi</option>
                <option value="Others">Others</option>
              </select>
            </div>

            <div className="mb-3">
              <label
                htmlFor="exampleFormControlInput42"
                className="form-label small fw-bold"
              >
                Photo
              </label>
              <input
                onChange={(e) => {
                  uploadSpouseImage(e);
                }}
                type="file"
                id="files"
                className="ms-2 w-25"
                name="picture"
                style={{ color: "transparent" }}
              />
              {!empData.SPOUSE_PHOTO && !spouseFilePath ? (
                <span className="small">No file chosen</span>
              ) : (
                <span className="small">1 file selected</span>
              )}
            </div>

            <div className="mb-3">
              <label
                htmlFor="exampleFormControlInput43"
                className="form-label small fw-bold"
              >
                National ID No
              </label>
              <input
                defaultValue={empData.spouse_card_id}
                type="number"
                className="form-control"
                id="exampleFormControlInput43"
                placeholder="National ID No"
                {...register("spouse_card_id")}
              />
            </div>
          </div>
          <div className="text-end">
            <input
              className=" submit-Btn-style"
              type="submit"
              value="Next Page"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default FamilyInformation;
