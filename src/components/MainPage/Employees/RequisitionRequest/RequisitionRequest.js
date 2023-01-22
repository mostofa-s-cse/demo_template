import React, { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

import { Table } from "antd";
import "antd/dist/antd.css";
import { itemRender, onShowSizeChange } from "../../paginationfunction";
import "../../antdstyle.css";
import Select from "react-select";
import { useForm } from "react-hook-form";
import axios from "axios";
import swal from "sweetalert";
import useAuth from "../../../initialpage/hooks/useAuth";
import "./RequisitionRequest.css"
import { Markup } from 'interweave';
import JoditEditor from "jodit-react";
import { useDispatch, useSelector } from "react-redux";
import { program } from "../../../initialpage/hooks/userStore";
import Api from "../../../initialpage/hooks/Api";
const RequisitionRequest = () => {
  const { info } = useSelector((state) => state.userInfo);
  const [getReqId, setGetReqId] = useState(0)
  const dispatch = useDispatch();
  const pathName = window.location.pathname;
  const splitPathName = pathName.split('/')
  const singlePathName = splitPathName[splitPathName.length - 1];
  const infoProgram = { p_id: info.p_id ? info.p_id : "", path: singlePathName }

  useEffect(() => {
    dispatch(program(infoProgram))
  }, [pathName])

  const config = {
    buttons: ["bold", "italic", "link", "unlink", "underline"],
  };
  const editor = useRef(null)
  const [content, setContent] = useState('')





  const { user, singleRoleProData } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const {
    register: register1,
    reset: reset1,
    formState: { errors: errors1 },
    handleSubmit: handleSubmit1,
  } = useForm();

  const [softwareReq, setSoftwareReq] = useState("");


  const uploadImage1 = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    //
    formData.append("image", file);
    //
    axios({
      method: "post",
      url: `http://${Api}/addSoftReqFile`,
      data: formData,
      // headers: { Authorization: "Bearer ..." },
    }).then((data) => {

      setSoftwareReq(data.data);
    });
  };


  const onSubmit = (data1) => {

    data1.employe_id = user.employe_id;
    data1.details = content;
    data1.module_id = moduleCategory;
    data1.submodule_id = subModuleCategory;
    data1.file_path = softwareReq;
    axios({
      method: "post",
      url: "/ords/hrm/software_requisition/crud",
      data: {
        EMP_ID: data1.employe_id,
        MODULE_ID: data1.module_id,
        SUBMODULE_ID: data1.submodule_id,
        TITLE: data1.title,
        DETAILS: data1.details,
        FILE_PATH: data1.file_path,
        PRIORITY: data1.priority,
        COMMENTS: "",
        STATUS: "Pending",


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

        window.$("#add_new_requisition").modal("hide");
      }
    });
  };



  // udate software requisition
  const onSubmitUpdate = (data) => {

    if (getReqId) {
      axios({
        method: "put",
        url: `/ords/hrm/software_requisition/upd_sof_req_comm`,
        data: {
          REQUSITION_ID: parseInt(getReqId),
          COMMENTS: data.comments
        },
        headers: { Authorization: "Bearer ..." },
      }).then((res) => {
        if (res.status === 200) {
          setLoadUpdate(true);
          swal({
            title: "Good job!",
            text: "Successfully Update",
            icon: "success",
            button: "Ok",
          });
          window.$("#edit_requisition").modal("hide");
        }
      });
    }

  }






  const [data, setData] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadUpdate, setLoadUpdate] = useState(false);
  useEffect(() => {
    const getUsers = () => {
      let url = ''
      if (info.p_id === 19) {
        url = `/ords/hrm/software_requisition/v_soft_req`
      }
      else {
        url = `/ords/hrm/software_requisition/v_soft_req_by_emp/${user.employe_id}`
      }

      fetch(
        url
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
            setLoadUpdate(false)
            setData(users.items);

          },

          (err) => {
            const mute = err;

          }
        );
    };
    if (user.employe_id) {
      getUsers();
    }

  }, [user.employe_id, info.p_id, loadUpdate]);




  const [singleData, setSingleData] = useState({})
  useEffect(() => {
    const getUsers = () => {
      fetch(
        `/ords/hrm/sof_req/${getReqId}`
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
            setSingleData(users);

          },

          (err) => {
            const mute = err;

          }
        );
    };

    if (getReqId) {
      getUsers();
    }



  }, [getReqId]);










  // GET module DATA 
  // modules Category 

  const [moduleData, setModuleData] = useState([]);
  const [moduleCategory, setModuleCategory] = useState();


  useEffect(() => {
    const getUsers = () => {
      fetch('/ords/hrm/module_app/')
        .then(res => {
          if (res.status >= 400) {
            throw new Error("Server responds with error!")
          }
          return res.json()
        })
        .then(data => {
          setModuleData(data.items)
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
  const handleModuleCategory = selectedOption => {
    setModuleCategory(selectedOption.value);

  }


  let categoryOptionsModule = moduleData.map(data => {
    let optionsItem = {};
    optionsItem.value = data.module_id;
    optionsItem.label = data.module_app;
    return optionsItem;
  })
  // GET Submodule DATA 
  // submodules Category 

  const [subModuleData, setSubModuleData] = useState([]);
  const [subModuleCategory, setSubModuleCategory] = useState();

  useEffect(() => {
    const getUsers = () => {
      fetch(`/ords/hrm/submod_app/by_mod/${moduleCategory}`)
        .then(res => {
          if (res.status >= 400) {
            throw new Error("Server responds with error!")
          }
          return res.json()
        })
        .then(data => {
          setSubModuleData(data.items)
          setIsLoading(true);
        },
          err => {
            const mute = err
            setHasError(true);
            setIsLoading(true);
          })
    };
    if (moduleCategory) { getUsers() }
  }, [moduleCategory])
  const handleSubModuleCategory = selectedOption => {
    setSubModuleCategory(selectedOption.value);
  }

  let categoryOptionsSubModule = subModuleData.map(data => {
    let optionsItem = {};
    optionsItem.value = data.submodule_id;
    optionsItem.label = data.submodule_app;
    return optionsItem;
  })


  // -------------------------------------------------put section


  const reqProcessHandler = () => {

    axios({
      method: "put",
      url: `/ords/hrm/sof_req/${getReqId}`,
      data: {
        REQUITION_ID: parseInt(getReqId),
        EMP_ID: singleData.emp_id,
        MODULE_ID: singleData.module_id,
        SUBMODULE_ID: singleData.submodule_id,
        REQUSITION_DATE: singleData.requsition_date,
        TITLE: singleData.title,
        DETAILS: singleData.details,
        STATUS: "Processing",
        FILE_NAME: singleData.file_name,
        FILE_PATH: singleData.file_path,
        PRIORITY: singleData.priority,
        COMMENTS: singleData.comments
      },
      headers: { Authorization: "Bearer ..." },
    }).then((res) => {
      if (res.status === 200) {
        setLoadUpdate(true);
        swal({
          title: "Good job!",
          text: "Successfully Update",
          icon: "success",
          button: "Ok",
        });
      }
    });
  }

  const reqDoneHandler = () => {
    axios({
      method: "put",
      url: `/ords/hrm/sof_req/${getReqId}`,
      data: {
        REQUITION_ID: parseInt(getReqId),
        EMP_ID: singleData.emp_id,
        MODULE_ID: singleData.module_id,
        SUBMODULE_ID: singleData.submodule_id,
        REQUSITION_DATE: singleData.requsition_date,
        TITLE: singleData.title,
        DETAILS: singleData.details,
        STATUS: "Done",
        FILE_NAME: singleData.file_name,
        FILE_PATH: singleData.file_path,
        PRIORITY: singleData.priority,
        COMMENTS: singleData.comments
      },
      headers: { Authorization: "Bearer ..." },
    }).then((res) => {
      if (res.status === 200) {
        setLoadUpdate(true);
        swal({
          title: "Good job!",
          text: "Successfully Update",
          icon: "success",
          button: "Ok",
        });
      }
    });
  }

  // ----------------------------------------------------end


  const columns = [

    {
      title: "Requisition Date",
      dataIndex: "requsition_date",
    },

    {
      title: "Employee Name",
      dataIndex: "name_english",
    },

    // {
    //   title: "Module",
    //   dataIndex: "module_app",
    // },
    {
      title: "Sub Module",
      dataIndex: "submodule_app",
    },

    {

      title: "Subject",
      dataIndex: "title",
    },
    {

      title: "Priority",
      dataIndex: "priority",
    },
    {

      title: "Comments",
      dataIndex: "comments",
      className: "dataBreak"
    },
    {

      title: "Status",
      dataIndex: "status",
      render: (text, record) => (
        info.p_id === 19 ?
          <div className="dropdown action-label text-center">
            <a onClick={() => { setGetReqId(record.requsition_id) }} className="btn btn-white btn-sm btn-rounded dropdown-toggle" href="" data-toggle="dropdown" aria-expanded="false">
              <i className={text === "Pending" ? "fa fa-dot-circle-o text-danger" : text === "Processing" ? "fa fa-dot-circle-o text-purple" : text === "Done" ? "fa fa-dot-circle-o text-success" : ""} /> {text}
            </a>
            <div className="dropdown-menu dropdown-menu-right">

              <a onClick={reqProcessHandler} className="dropdown-item" data-toggle="modal" ><i className="fa fa-dot-circle-o  text-purple" />Processing </a>

              <a onClick={reqDoneHandler} className="dropdown-item" ><i className="fa fa-dot-circle-o text-success" />Done</a>
            </div>
          </div>
          :
          <div className="dropdown action-label text-center">
            <a className="btn btn-white btn-sm btn-rounded dropdown-toggle" aria-expanded="false">
              <i className={text === "Pending" ? "fa fa-dot-circle-o text-danger" : text === "Processing" ? "fa fa-dot-circle-o text-purple" : text === "Done" ? "fa fa-dot-circle-o text-success" : ""} /> {text}
            </a>
          </div>
      ),
    },


    {
      title: "Action",
      render: (text, record) => (
        <div className="dropdown dropdown-action text-right">
          <a
            onClick={() => { setGetReqId(record.requsition_id) }}
            href="#"
            className="action-icon dropdown-toggle"
            data-toggle="dropdown"
            aria-expanded="false"
          >
            <i class="las la-ellipsis-v fs-2"></i>
          </a>
          <div className="dropdown-menu dropdown-menu-right">
            <a className="dropdown-item" data-toggle="modal"
              data-target="#edit_requisition" ><i className="fa fa-pencil m-r-5" /> Edit</a>
            <Link to={`/softRequisitionReport/${record.requsition_id}`}>  <a className="dropdown-item" href="#" ><i className="
la la-clipboard m-r-5" />Report</a></Link>

          </div>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="page-wrapper">
        <Helmet>
          <title>Requisition - HR</title>
          <meta name="description" content="Login page" />
        </Helmet>
        {/* Page Content */}
        <div className="content container-fluid">
          {/* Page Header */}
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col">
                <h3 className="page-title">Software Requisition</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/app/main/dashboard">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">Requisition</li>
                </ul>
              </div>
              <div className="col-auto float-right ml-auto">
                <a
                  href="#"
                  className="btn add-btn bgColor"
                  data-toggle="modal"
                  data-target="#add_new_requisition"
                >
                  <i className="fa fa-plus" /> Add new Requisition
                </a>
              </div>
            </div>
          </div>


          <div className="row">
            <div className="col-md-12">
              <div className="table">
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

      </div>

      {/* add_new_requisition model  */}
      <div id="add_new_requisition" className="modal custom-modal fade" role="dialog">
        <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add New Requisition</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body text-start bg-light">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                  <div className='col-sm-12'>
                    <div className="mb-3">
                      <label htmlFor="inputGroupSelect12" className="form-label model-text">Module</label>

                      <Select
                        options={categoryOptionsModule}
                        onChange={handleModuleCategory}

                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="inputGroupSelect12" className="form-label model-text">Submodule</label>

                      <Select
                        options={categoryOptionsSubModule}
                        onChange={handleSubModuleCategory}

                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="inputGroupSelect12" className="form-label model-text">Priority</label>

                      <select className="form-select model-text" {...register("priority")}>
                        <option className="" value="Low">  Select Priority..</option>
                        <option value="Low"> Low</option>
                        <option value="Medium"> Medium</option>
                        <option value="High"> High</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="exampleFormControlTextarea1"
                        className="form-label fw-bold small"
                      >
                        Subject
                      </label>
                      <textarea
                        className="form-control"
                        id="exampleFormControlTextarea1"
                        rows="3"
                        {...register("title")}
                      ></textarea>
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="exampleFormControlTextarea1"
                        className="form-label fw-bold small"
                      >
                        Requisition Details
                      </label>

                      <div>
                        <JoditEditor
                          ref={editor}
                          value={content}
                          config={config}
                          tabIndex={1} // tabIndex of textarea
                          onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                          onChange={newContent => { }}
                        />
                      </div>

                    </div >
                    <div className="mb-3">
                      <label
                        htmlFor="exampleFormControlTextarea1"
                        className="form-label fw-bold small"
                      >
                        Screenshot
                      </label>
                      <input
                        onChange={(e) => {
                          uploadImage1(e);
                        }}
                        type="file"
                        id="files"
                        className="ms-2"
                        name="picture"
                      />
                    </div>
                    <div className="modal-footer">
                      <button

                        type="submit"
                        className="btn bgColor text-white px-5 py-2 rounded"
                        id=""
                      >
                        Submit
                      </button>
                      <button
                        type="button"
                        className="btn bgColor text-white px-5 ms-1 py-2 rounded"
                        data-dismiss="modal"
                      >
                        Close
                      </button>
                    </div>
                  </div >
                </div >

              </form >

            </div >
          </div >
        </div >
      </div >
      {/*  Update requisition model  */}
      <div id="edit_requisition" className="modal custom-modal fade" role="dialog">
        <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Update Requisition</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body text-start bg-light">
              <form onSubmit={handleSubmit1(onSubmitUpdate)}>
                <div className="row">
                  <div className='col-sm-12'>

                    <div className="mb-3">
                      <label
                        htmlFor="exampleFormControlTextarea1"
                        className="form-label fw-bold small"
                      >
                        Comments
                      </label>
                      <textarea
                        className="form-control"
                        id="exampleFormControlTextarea1"
                        rows="3"
                        {...register1("comments")}
                      ></textarea>
                    </div>

                    <div className="modal-footer">
                      <button

                        type="submit"
                        className="btn bgColor text-white px-5 py-2 rounded"
                        id=""
                      >
                        Submit
                      </button>
                      <button
                        type="button"
                        className="btn bgColor text-white px-5 ms-1 py-2 rounded"
                        data-dismiss="modal"
                      >
                        Close
                      </button>
                    </div>
                  </div >
                </div >

              </form >

            </div >
          </div >
        </div >
      </div >







    </div >
  );
};

export default RequisitionRequest;