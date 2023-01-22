import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import {
  Avatar_09,
  Avatar_02,
  Avatar_03,
  Avatar_05,
  Avatar_08,
  Avatar_10,
  Avatar_15,
  Avatar_20,
  Avatar_24,
  Avatar_25,
} from "../../../Entryfile/imagepath";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Table } from "antd";
import "antd/dist/antd.css";
import { itemRender, onShowSizeChange } from "../../paginationfunction";
import "../../antdstyle.css";
import swal from "sweetalert";
const DocumentType = () => {
  const [data, setData] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadUpdate, setLoadUpdate] = useState(false);

  // React Hook Form
  const {
    register: register,
    reset: reset,
    formState: { errors: errors },
    handleSubmit: handleSubmit,
  } = useForm();
  const {
    register: register1,
    reset: reset1,
    formState: { errors: errors1 },
    handleSubmit: handleSubmit1,
  } = useForm();

  // post Method
  const onSubmitPost = (data1) => {

    axios({
      method: "post",
      url: "/ords/hrm/doc_typ/crud",
      data: {
        DOCUMENT_TYPE: data1.document_type,
        DOCUMENT_CATEGORIE: data1.document_categorie,
      },
      headers: { Authorization: "Bearer ..." },
    }).then((res) => {
      if (!res.data) {
        setLoadUpdate(true);
        swal({
          title: "Good job!",
          text: "Successfully Added",
          icon: "success",
          button: "Ok",
        });
        reset();

        window.$("#add_document_type").modal("hide");
      }
    });
  };

  // PUT METHOD
  const [getDocumentType, setGetDocumentType] = useState([]);
  const [getId, setGetId] = useState(null);

  const onSubmitUpdate = (data1) => {
    if (data1.document_type) {
      data1.document_type = data1.document_type;
    } else {
      data1.document_type = getDocumentType.document_type;
    }
    if (data1.document_categorie) {
      data1.document_categorie = data1.document_categorie;
    } else {
      data1.document_categorie = getDocumentType.document_categorie;
    }

    // PUT METHOD
    axios({
      method: "put",

      headers: {
        DOCUMENT_TYPE_ID: getId,
      },
      url: `/ords/hrm/doc_typ/crud`,
      data: {
        DOCUMENT_TYPE: data1.document_type,
        DOCUMENT_CATEGORIE: data1.document_categorie,
      },
    }).then((res) => {
      if (!res.data) {
        setLoadUpdate(true);
        swal({
          title: "Good job!",
          text: "Successfully Updated",
          icon: "success",
          button: "Ok",
        });
        reset1();

        window.$("#edit_document_type").modal("hide");
      }
    });
  };

  const handleUpdate = (updateId) => {
    //
    setGetId(updateId);
  };
  //

  // GET Document type DATA
  useEffect(() => {
    const getUsers = () => {
      setIsLoading(true);
      fetch(`/ords/hrm/doc_typ/${getId}`)
        .then((res) => {
          // You have to send it, as I have done below
          if (res.status >= 400) {
            throw new Error("Server responds with error!");
          }
          return res.json();
        })
        .then(
          (users) => {
            setGetDocumentType(users);
            setIsLoading(false);
          },

          (err) => {
            const mute = err;
            setHasError(true);
            setIsLoading(true);
          }
        );
    };
    if (getId) { getUsers() }
  }, [getId]);

  // Delete API
  const deleteButtonHandler = (Id) => {
    //
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const url = `/ords/hrm/doc_typ/crud`;
        fetch(url, {
          method: "DELETE",
          headers: {
            DOCUMENT_TYPE_ID: Id,
          },
        }).then((item) => {
          const remainingUsers = data.filter(
            (user) => user.document_type_id !== Id
          );
          setData(remainingUsers);
        });
        swal("Poof! Your imaginary file has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  };

  const [searchDocument, setSearchDocument] = useState("");
  // GET Document Type DATA
  useEffect(() => {
    const getUsers = () => {
      setIsLoading(true);
      fetch(
        `/ords/hrm/doc_typ/crud?q={"document_type":{"$like":"%25${searchDocument}%25"},"$orderby":{"document_type_id":"desc"}}`
      )
        .then((res) => {
          // You have to send it, as I have done below
          if (res.status >= 400) {
            throw new Error("Server responds with error!");
          }
          return res.json();
        })
        .then(
          (users) => {
            setData(users.items);
            setIsLoading(false);
            setLoadUpdate(false);
          },

          (err) => {
            const mute = err;
            setHasError(true);
            setIsLoading(true);
          }
        );
    };
    getUsers();
  }, [searchDocument, loadUpdate]);
  const columns = [
    {
      title: "Document Type ID",
      dataIndex: "document_type_id",
    },
    {
      title: "Document Type",
      dataIndex: "document_type",
    },
    {
      title: "Document Category",
      dataIndex: "document_categorie",
    },

    {
      title: "Action",
      render: (text, record) => (
        <div className="dropdown dropdown-action text-right">
          <a
            href="#"
            className="action-icon dropdown-toggle"
            data-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="material-icons">more_vert</i>
          </a>
          <div className="dropdown-menu dropdown-menu-right">
            <a
              className="dropdown-item"
              href="#"
              data-toggle="modal"
              data-target="#edit_document_type"
              onClick={() => {
                handleUpdate(record.document_type_id);
              }}
            >
              <i className="fa fa-pencil m-r-5" /> Edit
            </a>
            <a
              className="dropdown-item"
              href="#"
              onClick={() => {
                deleteButtonHandler(record.document_type_id);
              }}
            >
              <i className="fa fa-trash-o m-r-5" /> Delete
            </a>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="page-wrapper">
        <Helmet>
          <title>Document type - HR</title>
          <meta name="description" content="Login page" />
        </Helmet>
        {/* Page Content */}
        <div className="content container-fluid">
          {/* Page Header */}
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col">
                <h3 className="page-title">Document type</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/app/main/dashboard">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">DocumentType</li>
                </ul>
              </div>
              <div className="col-auto float-right ml-auto">
                <a
                  href="#"
                  className="btn bgColor text-white add-btn"
                  data-toggle="modal"
                  data-target="#add_document_type"
                >
                  <i className="fa fa-plus" /> Add new Document type
                </a>
              </div>
            </div>
          </div>
          {/* /Page Header */}

          {/* Search Filter */}
          <div className="row  mb-4 ps-2">
            <input
              onChange={(e) => {
                setSearchDocument(e.target.value);
              }}
              className="form-control w-25 shadow py-4"
              type="text"
              placeholder="Search Document Type"
            />
          </div>
          {/* /Search Filter */}
          <div className="row">
            <div className="col-md-12">
              <div className="table-responsive">
                <Table
                  className="table-striped"
                  pagination={{
                    total: data.length,
                    showTotal: (total, range) =>
                      `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                    showSizeChanger: true,
                    onShowSizeChange: onShowSizeChange,
                    itemRender: itemRender,
                  }}
                  style={{ overflowX: "auto" }}
                  columns={columns}
                  // bordered
                  dataSource={data}
                  rowKey={(record) => record.id}

                />
              </div>
            </div>
          </div>
        </div>
        {/* /Page Content */}
        {/* Add Document Type Modal */}

        <div
          id="add_document_type"
          className="modal custom-modal fade"
          role="dialog"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add new Document type</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body text-start">
                <form onSubmit={handleSubmit(onSubmitPost)}>
                  <div className="row">
                    <div className="mb-3">
                      <label
                        htmlFor="exampleFormControlInput14"
                        className="form-label fw-bold small"
                      >
                        Document type
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleFormControlInput14"
                        placeholder="Enter Document type"
                        {...register("document_type")}
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="inputGroupSelect12"
                        className="form-label fw-bold small"
                      >
                        Document
                      </label>
                      <select
                        className="form-select"
                        id="inputGroupSelect12"
                        {...register("document_categorie")}
                      >
                        <option value="">Please Select</option>
                        <option value="Employee">Employee</option>
                        <option value="Project">Project</option>
                        <option value="Vehicle">Vehicle</option>
                        <option value="Client">Client</option>
                      </select>
                    </div>
                  </div>

                  <div className="submit-section">
                    <button
                      type="submit"
                      className="btn bgColor text-white px-5 py-2 rounded"
                    >
                      Add
                    </button>

                    <button
                      type="button"
                      className="btn bgColor text-white px-5 ms-1 py-2 rounded"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Edit document Type Modal */}

        <div
          id="edit_document_type"
          className="modal custom-modal fade"
          role="dialog"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Document Type</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body text-start">
                <form onSubmit={handleSubmit1(onSubmitUpdate)}>
                  <div className="row">
                    <div className="mb-3">
                      <label
                        htmlFor="exampleFormControlInput14"
                        className="form-label fw-bold small"
                      >
                        Document type
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleFormControlInput14"
                        defaultValue={getDocumentType.document_type}
                        {...register1("document_type")}
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="inputGroupSelect12"
                        className="form-label fw-bold small"
                      >
                        Document
                      </label>
                      <select
                        className="form-select"
                        id="inputGroupSelect12"
                        {...register1("document_categorie")}
                      >
                        <option value="">
                          {getDocumentType.document_categorie}
                        </option>
                        <option value="Employee">Employee</option>
                        <option value="Project">Project</option>
                        <option value="Vehicle">Vehicle</option>
                        <option value="Client">Client</option>
                      </select>
                    </div>
                  </div>

                  <div className="submit-section">
                    <button
                      type="submit"
                      className="btn bgColor text-white px-5 py-2 rounded"
                    >
                      Add
                    </button>

                    <button
                      type="button"
                      className="btn bgColor text-white px-5 ms-1 py-2 rounded"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentType;
