import React, { useCallback, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import DateTimePicker from "react-datetime-picker";
import { timers } from "jquery";
import Api from "../../../../initialpage/hooks/Api";
const EmployeeDetails = ({ parentCallback }) => {
  let empData = {};
  let employeeData = {};
  employeeData = JSON.parse(window.sessionStorage.getItem("emp_details"));
  const [birthDate, setBirthDate] = useState(
    employeeData ? employeeData.date_birth : ""
  );
  const [count, setCount] = useState(1);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [employeeImage, setEmployeeImage] = useState("");
  const [photoPath, setPhotoPath] = useState(null);
  if (employeeData) {
    empData = { ...employeeData };
  }

  const employeeImageHandle = (e) => {
    setEmployeeImage(e.target.files[0]);
    const imageEmployee = e.target.files[0];

    const formData = new FormData();

    formData.append("image", imageEmployee);

    axios({
      method: "post",
      url: `http://${Api}/addImages`,
      data: formData,
      headers: { Authorization: "Bearer ..." },
    }).then((data) => {
      setPhotoPath(data.data);

    });
  };

  const onSubmit = (data) => {
    if (employeeImage) {
      data.photo_path = photoPath;
    }
    if (employeeData && employeeData.photo_path && !employeeImage) {
      data.photo_path = employeeData.photo_path;
    } else {
      data.photo_path = "";
    }

    if (employeeData && birthDate === employeeData.date_birth) {
      data.date_birth = birthDate;
    } else if (birthDate) {
      data.date_birth = birthDate.toISOString();
    } else {
      data.date_birth = "";
    }
    window.sessionStorage.setItem("emp_details", JSON.stringify(data));
    setCount((count) => count + 1);
    parentCallback(count);
  };


  return (
    <div>
      {/*------------------------------------ Employee Details------------------------------------------ */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row gx-5 text-start  mb-3 border shadow p-3  mt-3   bg-white rounded-3">
          <h4 className="text-center bgColor py-1 text-white rounded mb-3">
            Employee Details
          </h4>

          <div className="col-sm-6">
            <div className="mb-3">
              <label
                htmlFor="exampleFormControlInput1"
                className="form-label small fw-bold"
              >
                Employee ID <span className="text-danger">*</span>
              </label>
              <input
                defaultValue={empData.EMPLOYE_REGISTRATION_NUMBER}
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Employee ID"
                {...register("EMPLOYE_REGISTRATION_NUMBER")}
                required
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="exampleFormControlInput2"
                className="form-label small fw-bold"
              >
                Name (English) <span className="text-danger">*</span>
              </label>
              <input
                defaultValue={empData.name_english}
                type="text"
                className="form-control"
                id="exampleFormControlInput3"
                placeholder="Employee Name (English)"
                {...register("name_english")}
                required
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="exampleFormControlInput3"
                className="form-label small fw-bold"
              >
                Name (Bangla)
              </label>
              <input
                defaultValue={empData.name_bangla}
                type="text"
                className="form-control"
                id="exampleFormControlInput3"
                placeholder="Employee Name (Bangla)"
                {...register("name_bangla")}
              />
            </div>

            <div className="mb-3">
              <label
                htmlFor="exampleFormControlInput5"
                className="form-label small fw-bold"
              >
                NID
              </label>
              <input
                defaultValue={empData.card_id}
                type="number"
                className="form-control"
                id="exampleFormControlInput5"
                placeholder="NID"
                {...register("card_id")}
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="exampleFormControlInput6"
                className="form-label small fw-bold"
              >
                Upload Image
              </label>
              <input
                onChange={(e) => employeeImageHandle(e)}
                type="file"
                id="files"
                className="ms-2 w-25"
                name="picture"
                style={{ color: "transparent" }}
              />
              {!empData.photo_path && !employeeImage ? (
                <span className="small">No file chosen</span>
              ) : (
                <span className="small">1 file selected</span>
              )}
            </div>
            <div className="mb-3">
              <label
                htmlFor="exampleFormControlInput4"
                className="form-label small fw-bold"
              >
                Date of Birth
              </label>
              <div>
                <DateTimePicker
                  format={`dd/MM/yyyy 00:00`}
                  className="w-100"
                  onChange={setBirthDate}
                  value={birthDate}
                />
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="mb-3">
              <label
                htmlFor="exampleFormControlInput7"
                className="form-label small fw-bold"
              >
                Father's Name (English)
              </label>
              <input
                defaultValue={empData.fater_englih}
                type="text"
                className="form-control"
                id="exampleFormControlInput7"
                placeholder="Father's Name (English)"
                {...register("fater_englih")}
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="exampleFormControlInput8"
                className="form-label small fw-bold"
              >
                Father's Name (Bangla)
              </label>
              <input
                defaultValue={empData.father_bangla}
                type="text"
                className="form-control"
                id="exampleFormControlInput8"
                placeholder="Father's Name (Bangla)"
                {...register("father_bangla")}
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="exampleFormControlInput9"
                className="form-label small fw-bold"
              >
                Mother's Name (English)
              </label>
              <input
                defaultValue={empData.mother_english}
                type="text"
                className="form-control"
                id="exampleFormControlInput9"
                placeholder="Mother's Name (English)"
                {...register("mother_english")}
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="exampleFormControlInput10"
                className="form-label small fw-bold"
              >
                Mother's Name (Bangla)
              </label>
              <input
                defaultValue={empData.mother_bangla}
                type="text"
                className="form-control"
                id="exampleFormControlInput10"
                placeholder="Mother's Name (Bangla)"
                {...register("mother_bangla")}
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="exampleFormControlInput11"
                className="form-label small fw-bold"
              >
                Mobile
              </label>
              <input
                defaultValue={empData.mobile_phone}
                type="number"
                className="form-control"
                id="exampleFormControlInput11"
                placeholder="Mobile"
                {...register("mobile_phone")}
              />
            </div>
          </div>
          <div className="text-end">
            <input
              className="submit-Btn-style"
              type="submit"
              value="Next Page"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default EmployeeDetails;
