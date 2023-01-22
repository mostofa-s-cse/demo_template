import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Api from "../../../../initialpage/hooks/Api";

const Documents = ({ parentCallbackE }) => {
  const [startDate, setStartDate] = useState(new Date());
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [count, setCount] = useState(1);
  const [docTypeData, setDocTypeData] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [documentImagePath, setDocumentImagePath] = useState(null);
  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();

    formData.append("image", file);

    axios({
      method: "post",
      url: `http://${Api}/addImages`,
      data: formData,
      headers: { Authorization: "Bearer ..." },
    }).then((data) => {
      setDocumentImagePath(data.data);
    });
  };

  // get document type data

  useEffect(() => {
    const getUsers = () => {
      fetch("/ords/hrm/doc_typ/crud")
        .then((res) => {
          if (res.status >= 400) {
            throw new Error("Server responds with error!");
          }
          return res.json();
        })
        .then(
          (data) => {
            setDocTypeData(data.items);
            setIsLoading(true);
          },
          (err) => {
            const mute = err;
            setHasError(true);
            setIsLoading(true);
          }
        );
    };
    getUsers();
  }, []);

  const onSubmit = (data) => {
    if (documentImagePath) {
      data.EMPLOYEE_DOC = documentImagePath;
    } else if (
      employeeData &&
      employeeData.EMPLOYEE_DOC &&
      !documentImagePath
    ) {
      data.EMPLOYEE_DOC = employeeData.EMPLOYEE_DOC;
    } else {
      data.EMPLOYEE_DOC = "";
    }

    let today = new Date().toISOString();
    const postDocuData = {
      DOCUMENT_TYPE_ID: parseInt(data.document_type),
      MEMO: data.memo,
      DATE_CREATION: today,
      FILE_NAME: null,
      EMPLOYEE_DOC: data.EMPLOYEE_DOC,
    };

    window.sessionStorage.setItem("documents", JSON.stringify(postDocuData));
    setCount((count) => count + 1);
    parentCallbackE(count);
  };
  let empData = {};
  const employeeData = JSON.parse(window.sessionStorage.getItem("documents"));

  if (employeeData) {
    empData = { ...employeeData };
  }
  return (
    <div>
      {/* -------------------------------------Documents  ------------------------------*/}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row gx-5 border text-start mb-3 shadow p-3 mt-3 bg-white rounded-3">
          <h4 className="text-center bgColor rounded py-1 text-white  mb-3">
            Documents
          </h4>

          <div className=" col-sm-12">
            <div className="mb-3">
              <label
                htmlFor="exampleFormControlInput44"
                className="form-label small fw-bold"
              >
                Document Name
              </label>
              <input
                defaultValue={empData.MEMO}
                type="text"
                className="form-control"
                id="exampleFormControlInput44"
                placeholder="Name"
                {...register("memo")}
              />
            </div>

            <div className="mb-3">
              <label
                htmlFor="inputGroupSelect46"
                className="form-label small fw-bold"
              >
                {" "}
                Document type
              </label>
              <select
                defaultValue={empData.DOCUMENT_TYPE_ID}
                className="form-select"
                id="inputGroupSelect46"
                {...register("document_type")}
              >
                <option value="">Please Select type</option>
                {docTypeData.map((item) => (
                  <option value={item.document_type_id}>
                    {" "}
                    {item.document_type}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label
                htmlFor="exampleFormControlInput49"
                className="form-label small fw-bold"
              >
                Upload document
              </label>
              <input
                onChange={(e) => {
                  uploadImage(e);
                }}
                type="file"
                id="files"
                className="ms-2 w-25"
                name="picture"
                style={{ color: "transparent" }}
              />
              {!empData.EMPLOYEE_DOC && !documentImagePath ? (
                <span className="small">No file chosen</span>
              ) : (
                <span className="small">1 file selected</span>
              )}
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

export default Documents;
