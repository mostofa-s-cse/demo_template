import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Table } from "antd";
import "antd/dist/antd.css";
import {
  itemRender,
  onShowSizeChange,
} from "../../../../../MainPage/paginationfunction.jsx";
import "../../../../../MainPage/antdstyle.css";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import axios from "axios";
import Select from "react-select";
import useAuth from "../../../../../initialpage/hooks/useAuth.js";
import Api from "../../../../../initialpage/hooks/Api.js";

const EventCreate = () => {
  const { user } = useAuth();
  //
  const [data, setData] = useState([]);
  const [assignId, setAssignId] = useState(null);
  // const [employeeNameCategory, setEmployeeNameCategory] = useState();
  const [getFloor, setGetFloor] = useState([]);
  const [getFloorId, setGetFloorId] = useState();
  const [getRoom, setGetRoom] = useState([]);

  const [getEventCategory, setGetEventCategory] = useState([]);
  const [getEventDepartment, setGetEventDepartment] = useState([]);
  const [getEventOrganization, setGetEventOrganization] = useState([]);
  const [assignDetailsData, setAssignDetailsData] = useState([]);
  const [editDetailsData, setEditDetailsData] = useState([]);
  const [assignEmployeeReportData, setAssignEmployeeReportData] = useState([]);
  const [assignEmployeeReportDataLoad, setAssignEmployeeReportDataLoad] =
    useState(false);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // chacking browser
  let userAgent = navigator.userAgent;
  let browserName;
  if (userAgent.match(/firefox|fxios/i)) {
    browserName = "firefox";
  } else {
    browserName = "Another browser";
  }

  //  end
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [allEmployeeName, setAllEmployeeName] = useState([]);
  const [loadUpdate, setLoadUpdate] = useState(false);
  const {
    register: register1,
    reset: reset1,
    formState: { errors: errors1 },
    handleSubmit: handleSubmit1,
  } = useForm();

  const [documentReport, setDocumentReport] = useState("");
  const [documentReport1, setDocumentReport1] = useState("");
  const uploadImage1 = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();

    formData.append("image", file);

    axios({
      method: "post",
      url: `http://${Api}/addeventfile`,
      data: formData,
      headers: { Authorization: "Bearer ..." },
    }).then((data) => {
      setDocumentReport(data.data);

    });
  };
  const uploadImage2 = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();

    formData.append("image", file);

    axios({
      method: "post",
      url: `http://${Api}/addeventfile`,
      data: formData,
      headers: { Authorization: "Bearer ..." },
    }).then((data) => {
      setDocumentReport1(data.data);

    });
  };

  const employeeId = user.employe_id;
  //

  // Post API
  const onSubmitAddEvent = (data1) => {
    data1.event_created_by = employeeId;
    data1.event_category_id = parseInt(data1.event_category_id);
    data1.departement_id = parseInt(data1.departement_id);
    data1.organizer_id = parseInt(data1.organizer_id);
    data1.place = parseInt(data1.place);
    data1.start_date_time = `${data1.start_date}T${data1.start_date_time}:00Z`;
    data1.end_date_time = `${data1.start_date}T${data1.end_date_time}:00Z`;
    data1.file_path = documentReport;

    axios({
      method: "post",
      url: "/ords/eve/events/crud",
      data: {
        EVENT_CATEGORY_ID: data1.event_category_id,
        EVENT_NAME: data1.event_name,
        DEPARTEMENT_ID: data1.departement_id,
        START_DATE_TIME: data1.start_date_time,
        END_DATE_TIME: data1.end_date_time,
        EVENT_DESCRIPTION: data1.event_description,
        EVENT_CREATED_BY: data1.event_created_by,
        ORGANIZER_ID: data1.organizer_id,
        PLACE: data1.place,
        EVENT_CHIEF_NAME: data1.event_chief_name,
        FILE_PATH: data1.file_path,
      },
      headers: { Authorization: "Bearer ..." },
    }).then((res) => {
      if (res) {
        setLoadUpdate(true);
        swal({
          title: "Thank you!",
          text: "Successfully Added",
          icon: "success",
          button: "Ok",
        });

        reset();

        window.$("#new_event").modal("hide");
      }
    });
  };

  // Event Update

  const onSubmitUpdateEvent = (data1) => {
    data1.event_created_by = employeeId;
    if (data1.event_category_id) {
      data1.event_category_id = parseInt(data1.event_category_id);
    } else {
      data1.event_category_id = editDetailsData.event_category_id;
    }
    if (data1.departement_id) {
      data1.departement_id = parseInt(data1.departement_id);
    } else {
      data1.departement_id = editDetailsData.departement_id;
    }
    if (data1.organizer_id) {
      data1.organizer_id = parseInt(data1.organizer_id);
    } else {
      data1.organizer_id = editDetailsData.organizer_id;
    }
    if (data1.place) {
      data1.place = parseInt(data1.place);
    } else {
      data1.place = editDetailsData.place;
    }
    if (data1.start_date_time) {
      data1.start_date_time = `${data1.start_date}T${data1.start_date_time}:00Z`;
    } else {
      data1.start_date_time = editDetailsData.start_date_time;
    }
    if (data1.end_date_time) {
      data1.end_date_time = `${data1.start_date}T${data1.end_date_time}:00Z`;
    } else {
      data1.end_date_time = editDetailsData.end_date_time;
    }
    if (data1.event_name) {
      data1.event_name = data1.event_name;
    } else {
      data1.event_name = editDetailsData.event_name;
    }
    if (data1.event_description) {
      data1.event_description = data1.event_description;
    } else {
      data1.event_description = editDetailsData.event_description;
    }
    if (data1.event_chief_name) {
      data1.event_chief_name = data1.event_chief_name;
    } else {
      data1.event_chief_name = editDetailsData.event_chief_name;
    }
    if (documentReport1) {
      data1.file_path = documentReport1;
    } else {
      data1.file_path = editDetailsData.file_path;
    }

    // editDetailsData

    axios({
      method: "put",

      headers: {
        event_id: assignId,
      },
      url: `/ords/eve/events/crud`,
      data: {
        EVENT_CATEGORY_ID: data1.event_category_id,
        EVENT_NAME: data1.event_name,
        DEPARTEMENT_ID: data1.departement_id,
        START_DATE_TIME: data1.start_date_time,
        END_DATE_TIME: data1.end_date_time,
        EVENT_DESCRIPTION: data1.event_description,
        EVENT_CREATED_BY: data1.event_created_by,
        ORGANIZER_ID: data1.organizer_id,
        PLACE: data1.place,
        EVENT_CHIEF_NAME: data1.event_chief_name,
        FILE_PATH: data1.file_path,
      },
    }).then((res) => {
      if (res) {
        swal({
          title: "Thank you!",
          text: "Successfully Update",
          icon: "success",
          button: "Ok",
        });

        reset1();

        window.$("#update_event").modal("hide");
      }
    });
  };

  const [searchEvent, setSearchEvent] = useState("");

  useEffect(() => {
    const getUsers = () => {
      setIsLoading(true);
      fetch(
        `/ords/eve/events/v_all_events?q={"event_name":{"$like":"%25${searchEvent}%25"},"$orderby":{"event_id":"desc"}}`
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
  }, [searchEvent, loadUpdate]);

  // floor Get API
  useEffect(() => {
    const getUsers = () => {
      setIsLoading(true);
      fetch(`/ords/eve/floor/crud`)
        .then((res) => {
          // You have to send it, as I have done below
          if (res.status >= 400) {
            throw new Error("Server responds with error!");
          }
          return res.json();
        })
        .then(
          (users) => {
            setGetFloor(users.items);
            setIsLoading(false);
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

  // room Get API
  useEffect(() => {
    const getUsers = () => {
      setIsLoading(true);
      fetch(`/ords/eve/room/room_by_floor/${getFloorId}`)
        .then((res) => {
          // You have to send it, as I have done below
          if (res.status >= 400) {
            throw new Error("Server responds with error!");
          }
          return res.json();
        })
        .then(
          (users) => {
            setGetRoom(users.items);
            setIsLoading(false);
          },

          (err) => {
            const mute = err;
            setHasError(true);
            setIsLoading(true);
          }
        );
    };
    if (getFloorId) {
      getUsers()
    }

  }, [getFloorId]);

  // Event Category Get API
  useEffect(() => {
    const getUsers = () => {
      setIsLoading(true);
      fetch(`/ords/eve/cat/crud`)
        .then((res) => {
          // You have to send it, as I have done below
          if (res.status >= 400) {
            throw new Error("Server responds with error!");
          }
          return res.json();
        })
        .then(
          (users) => {
            setGetEventCategory(users.items);
            setIsLoading(false);
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
  // Event Department Get API
  useEffect(() => {
    const getUsers = () => {
      setIsLoading(true);
      fetch(`/ords/eve/select_list/dept_list`)
        .then((res) => {
          // You have to send it, as I have done below
          if (res.status >= 400) {
            throw new Error("Server responds with error!");
          }
          return res.json();
        })
        .then(
          (users) => {
            setGetEventDepartment(users.items);
            setIsLoading(false);
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
  // Event Organization Get API
  useEffect(() => {
    const getUsers = () => {
      setIsLoading(true);
      fetch(`/ords/eve/org/crud`)
        .then((res) => {
          // You have to send it, as I have done below
          if (res.status >= 400) {
            throw new Error("Server responds with error!");
          }
          return res.json();
        })
        .then(
          (users) => {
            setGetEventOrganization(users.items);
            setIsLoading(false);
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

  const assignButtonHandler = (id) => {

    setAssignId(id);
  };

  // Event AssignDetails Data Get API
  useEffect(() => {
    const getUsers = () => {
      setIsLoading(true);
      fetch(
        `/ords/eve/events/events_details_on_assign/${assignId}`
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
            setAssignDetailsData(users);

            setIsLoading(false);
          },

          (err) => {
            const mute = err;
            setHasError(true);
            setIsLoading(true);
          }
        );
    };
    if (assignId) {
      getUsers()
    }
  }, [assignId]);

  // ASSIGN EMPLOYEE NAME SEARCH API
  //
  useEffect(() => {
    const getUsers = () => {
      const url = `/ords/eve/select_list/employee_list_except_assigned/${assignId}`;
      fetch(url, {
        method: "GET",
        headers: {
          search: `%`,
        },
      })
        .then((res) => {
          // You have to send it, as I have done below
          if (res.status >= 400) {
            throw new Error("Server responds with error!");
          }
          return res.json();
        })
        .then(
          (users) => {
            //
            setAllEmployeeName(users.items);

            // setLo)
          },
          (err) => {
            const mute = err;
            setHasError(true);
          }
        );
    };

    if (assignId) {
      getUsers()
    }
  }, [assignId]);
  const [theArray, setTheArray] = useState([]);
  const handleEmployeeNameCategory = (selectedOption) => {
    let dataEmployeeName = selectedOption.value;
    setTheArray([...theArray, dataEmployeeName]);
  };

  let categoryOptions = allEmployeeName.map((data) => {
    let optionsItem = {};
    optionsItem.value = `${data.employe_id}|${data.name_english}`;
    optionsItem.label = `${data.name_english} (${data.employe_registration_number})`;
    return optionsItem;
  });
  const sliceEmployeeName = (data) => {
    const myArray = data.split("|");
    const myArray1 = myArray[1].split(",");
    return myArray1[0];
  };
  const deleteAssignEmployeeHandler = (name) => {

    const result = theArray.filter((item) => item !== name);
    setTheArray(result);
  };
  //

  const addAssignEmployeeHandler = (id) => {

    theArray.map((item) => {
      const myArray = item.split("|");



      const data = {
        EMPLOYE_ID: parseInt(myArray[0]),
        EVENT_ID: id,
      };
      axios({
        method: "post",
        url: "/ords/eve/assign_employee/crud",
        data,

        headers: { Authorization: "Bearer ..." },
      }).then((res) => {
        if (res.data) {

        }
      });
    });

    setAssignEmployeeReportDataLoad(true);
  };
  const [searchEmpName, setSearchEmpName] = useState("");
  // ASSIGN EMPLOYEE Report SEARCH API

  useEffect(() => {
    const getUsers = () => {
      const url = `/ords/eve/select_list/emp_assign_on_event/${assignId}`;
      fetch(url, {
        method: "GET",
        headers: {
          search: `${searchEmpName}%`,
        },
      })
        .then((res) => {
          // You have to send it, as I have done below
          if (res.status >= 400) {
            throw new Error("Server responds with error!");
          }
          return res.json();
        })
        .then(
          (users) => {
            //
            setAssignEmployeeReportData(users.items);
            setAssignEmployeeReportDataLoad(false);
            // setLo)
          },
          (err) => {
            const mute = err;
            setHasError(true);
          }
        );
    };

    if (assignId) {
      getUsers()
    }
  }, [assignId, assignEmployeeReportDataLoad, searchEmpName]);

  // Delete API

  let deleteError1 = true;
  const assignDeleteButtonHandler = (Id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const url = `/ords/eve/assign_employee/crud`;
        fetch(url, {
          method: "DELETE",
          headers: {
            EVENT_ID: assignId,
            EMPLOYE_ID: Id,
          },
        })
          .then((item) => {
            const remainingUsers = assignEmployeeReportData.filter(
              (user) => user.employe_id !== Id
            );
            setAssignEmployeeReportData(remainingUsers);
          })
          .catch((err) => {
            const mute = err;
            if (err.message) {
              alert("You can't delete this Other!");
              deleteError1 = false;
            }
          })
          .then((res) => {
            if (deleteError1) {
              swal("Poof! Your imaginary file has been deleted!", {
                icon: "success",
              });
            }
          });
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  };

  // Delete API
  let deleteError = true;
  const deleteButtonHandler = (Id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const url = `/ords/eve/events/crud`;
        fetch(url, {
          method: "DELETE",
          headers: {
            EVENT_ID: Id,
          },
        })
          .then((item) => {
            const remainingUsers = data.filter((user) => user.event_id !== Id);
            setData(remainingUsers);
          })
          .catch((err) => {
            const mute = err;
            if (err.message) {
              alert("You can't delete this Other!");
              deleteError = false;
            }
          })
          .then((res) => {
            if (deleteError) {
              swal("Poof! Your imaginary file has been deleted!", {
                icon: "success",
              });
            }
          });
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  };

  // Edit Event Details Get API

  useEffect(() => {
    const getUsers = () => {
      setIsLoading(true);
      fetch(
        `/ords/eve/events/v_all_events_by_event_id/${assignId}`
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
            setEditDetailsData(users.items[0]);

            setIsLoading(false);
          },

          (err) => {
            const mute = err;
            setHasError(true);
            setIsLoading(true);
          }
        );
    };
    if (assignId) {
      getUsers()
    }
  }, [assignId]);

  const columns = [
    {
      title: "ID",
      dataIndex: "event_id",
    },
    {
      title: "Title",
      dataIndex: "event_name",
    },

    {
      title: "Category",
      dataIndex: "event_category_name",
    },
    {
      title: "Place",
      dataIndex: "event_place",
    },

    {
      title: "Schedule",
      dataIndex: "schedule",
    },

    {
      title: "Remain",
      render: (text, record) => (
        <div>
          {text.status === "ago" ? (
            <h5 className="text-danger">{text.remain}</h5>
          ) : text.status === "remain" ? (
            <h5 className="text-success">{text.remain}</h5>
          ) : (
            <h5 className="text-warning">{text.remain}</h5>
          )}
        </div>
      ),
    },
    {
      title: "Presenter/Trainer",
      dataIndex: "event_chief_name",
    },
    {
      title: "Participant",
      dataIndex: "participent",
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
            {/* <a className="dropdown-item" href="#" data-toggle="modal" ><i className="fa fa-pencil m-r-5" /> Details</a> */}
            <a
              className="dropdown-item"
              href="#"
              data-toggle="modal"
              data-target="#update_event"
              onClick={() => {
                assignButtonHandler(record.event_id);
              }}
            >
              <i className="fa fa-pencil m-r-5" /> Edit
            </a>
            <a
              className="dropdown-item"
              href="#"
              data-toggle="modal"
              data-target="#assign-employee_event"
              onClick={() => {
                assignButtonHandler(record.event_id);
              }}
            >
              <i className="fa fa-pencil m-r-5" /> Assign Employee
            </a>
            <a
              className="dropdown-item"
              href="#"
              onClick={() => {
                deleteButtonHandler(record.event_id);
              }}
            >
              <i className="fa fa-trash-o m-r-5" /> Cancel Event
            </a>
          </div>
        </div>
      ),
    },
  ];

  const columnsAssign = [
    {
      title: "ID",
      dataIndex: "employe_id",
    },
    {
      title: "Name",
      dataIndex: "name_english",
    },

    {
      title: "Mobile",
      dataIndex: "mobile_phone",
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
              onClick={() => {
                assignDeleteButtonHandler(record.employe_id);
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
          <title>Event - HR</title>
          <meta name="description" content="Login page" />
        </Helmet>
        {/* Page Content */}
        <div className="content container-fluid">
          {/* Page Header */}
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col">
                <h3 className="page-title">Events</h3>
                {/* <ul className="breadcrumb">
                                    <li className="breadcrumb-item"><Link to="/app/main/dashboard">Dashboard</Link></li>
                                    <li className="breadcrumb-item active">Departments</li>
                                </ul> */}
              </div>
              <div className="col-auto float-right ml-auto">
                <a
                  href="#"
                  className="btn bgColor text-white add-btn"
                  data-toggle="modal"
                  data-target="#new_event"
                >
                  <i className="fa fa-plus" />
                  New Event
                </a>
              </div>
            </div>
          </div>
          {/* /Page Header */}

          {/* Search Filter */}
          <div className="row  mb-4 ps-2">
            <input
              className="form-control w-25 shadow py-4"
              onChange={(e) => {
                setSearchEvent(e.target.value);
              }}
              type="text"
              placeholder="Search Event"
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

        {/* new create Event Modal */}

        <div id="new_event" className="modal custom-modal fade" role="dialog">
          <div
            className="modal-dialog modal-dialog-centered modal-xl"
            role="document"
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">NEW EVENT FORM</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body text-start bg-light">
                <form onSubmit={handleSubmit(onSubmitAddEvent)}>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="mb-3 row">
                        <label
                          htmlFor="inputTitle"
                          className="col-sm-3 col-form-label"
                        >
                          Event Title :
                        </label>
                        <div className="col-sm-9">
                          <input
                            type="text"
                            className="form-control"
                            id="inputTitle"
                            placeholder="Event Title"
                            {...register("event_name")}
                          />
                        </div>
                      </div>
                      <div className="mb-3 row">
                        <label
                          htmlFor="inputTitle"
                          className="col-sm-3 col-form-label"
                        >
                          Description :
                        </label>
                        <div className="col-sm-9">
                          <textarea
                            className="form-control"
                            placeholder="Description"
                            id="floatingTextarea2"
                            {...register("event_description")}
                          ></textarea>
                        </div>
                      </div>
                      <div className="mb-3 row">
                        <label
                          htmlFor="inputTitle"
                          className="col-sm-3 col-form-label"
                        >
                          Presenter/Trainer:
                        </label>
                        <div className="col-sm-9">
                          <input
                            type="text"
                            className="form-control"
                            id="inputTitle"
                            placeholder="Name"
                            {...register("event_chief_name")}
                          />
                        </div>
                      </div>
                      <div className="mb-3 row">
                        <label
                          htmlFor="inputTitle"
                          className="col-sm-3 col-form-label"
                        >
                          Floor :
                        </label>
                        <div className="col-sm-9">
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            onClick={(e) => setGetFloorId(e.target.value)}
                            {...register("floor_no")}
                          >
                            <option value="">select floor</option>
                            {getFloor.map((data) => (
                              <option value={data.floor_no}>
                                {data.floor}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="mb-3 row">
                        <label
                          htmlFor="inputTitle"
                          className="col-sm-3 col-form-label"
                        >
                          Room :
                        </label>
                        <div className="col-sm-9">
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            {...register("place")}
                          >
                            {getRoom.map((data) => (
                              <option value={data.room_id}>
                                {data.room_name_no}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="mb-3 row">
                        <label
                          htmlFor="inputTitle"
                          className="col-sm-3 col-form-label"
                        >
                          Event Category :
                        </label>
                        <div className="col-sm-9">
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            {...register("event_category_id")}
                          >
                            <option value="">select Category</option>
                            {getEventCategory.map((data) => (
                              <option value={data.event_category_id}>
                                {data.event_category_name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="mb-3 row">
                        <label
                          htmlFor="inputTitle"
                          className="col-sm-3 col-form-label"
                        >
                          Department :
                        </label>
                        <div className="col-sm-9">
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            {...register("departement_id")}
                          >
                            <option value="">select Department</option>
                            {getEventDepartment.map((data) => (
                              <option value={data.departement_id}>
                                {data.departement}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="mb-3 row">
                        <label
                          htmlFor="inputTitle"
                          className="col-sm-3  col-form-label"
                        >
                          Organization :
                        </label>
                        <div className="col-sm-9">
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            {...register("organizer_id")}
                          >
                            <option value="">select Organization</option>
                            {getEventOrganization.map((data) => (
                              <option value={data.organizer_id}>
                                {data.organizer_name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput50"
                          className="form-label fw-bold me-2 small"
                        >
                          Attach Document :
                        </label>
                        <input
                          onChange={(e) => {
                            uploadImage1(e);
                          }}
                          type="file"
                          id="files"
                          className="ms-5"
                          name="picture"
                        />
                      </div>

                      <div className="mb-3 row text-start">
                        <label
                          htmlFor="inputTitle"
                          className="col-sm-3 col-form-label"
                        >
                          Start Date :
                        </label>
                        <div className="col-sm-9">
                          <input
                            type="date"
                            className="form-control"
                            id="inputTitle"
                            {...register("start_date")}
                          />
                        </div>
                      </div>
                      <div className="mb-3 row ">
                        <div className="col-sm-6">
                          <label
                            htmlFor="inputTitle"
                            className="col-sm-8  col-form-label"
                          >
                            Time Start :
                          </label>
                          <div className="col-sm-10">
                            <input
                              type="time"
                              className="form-control"
                              id="inputTitle"
                              {...register("start_date_time")}
                            />
                            {
                              browserName === "firefox" &&
                              <p className="ps-2 text-warning">Please, type 'p' for PM OR type 'a' for AM </p>
                            }
                            <span className="ps-2 small fw-bold">(MM:SS XM) (Ex: 01:01 PM)</span>
                          </div>
                        </div>

                        <div className="col-sm-6">
                          <label
                            htmlFor="inputTitle"
                            className="col-sm-8  col-form-label"
                          >
                            End Time :
                          </label>
                          <div className="col-sm-10">
                            <input
                              type="time"
                              className="form-control"
                              id="inputTitle"
                              {...register("end_date_time")}
                            />
                            {
                              browserName === "firefox" &&
                              <p className="ps-2 text-warning">Please, type 'p' for PM OR type 'a' for AM </p>
                            }

                            <span className="ps-2 small fw-bold">(MM:SS XM) (Ex: 01:01 PM)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="submit-section">
                    <button
                      type="submit"
                      className="btn bgColor text-white px-5 py-2 rounded"
                    >
                      Save
                    </button>

                    <button
                      type="button"
                      className="btn bgColor text-white px-5 ms-1 py-2 rounded"
                      data-dismiss="modal"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* update event modal  */}
        <div
          id="update_event"
          className="modal custom-modal fade"
          role="dialog"
        >
          <div
            className="modal-dialog modal-dialog-centered modal-xl"
            role="document"
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">UPDATE EVENT FORM</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body text-start bg-light">
                <form onSubmit={handleSubmit1(onSubmitUpdateEvent)}>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="mb-3 row">
                        <label
                          htmlFor="inputTitle"
                          className="col-sm-3 col-form-label"
                        >
                          Event Title :
                        </label>
                        <div className="col-sm-9">
                          <input
                            type="text"
                            className="form-control"
                            id="inputTitle"
                            defaultValue={editDetailsData.event_name}
                            {...register1("event_name")}
                          />
                        </div>
                      </div>
                      <div className="mb-3 row">
                        <label
                          htmlFor="inputTitle"
                          className="col-sm-3 col-form-label"
                        >
                          Description :
                        </label>
                        <div className="col-sm-9">
                          <textarea
                            className="form-control"
                            defaultValue={editDetailsData.event_description}
                            {...register1("event_description")}
                            id="floatingTextarea2"
                          ></textarea>
                        </div>
                      </div>
                      <div className="mb-3 row">
                        <label
                          htmlFor="inputTitle"
                          className="col-sm-3 col-form-label"
                        >
                          Presenter/Trainer:
                        </label>
                        <div className="col-sm-9">
                          <input
                            type="text"
                            className="form-control"
                            id="inputTitle"
                            defaultValue={editDetailsData.event_chief_name}
                            {...register1("event_chief_name")}
                          />
                        </div>
                      </div>
                      <div className="mb-3 row">
                        <label
                          htmlFor="inputTitle"
                          className="col-sm-3 col-form-label"
                        >
                          Floor :
                        </label>
                        <div className="col-sm-9">
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            onClick={(e) => setGetFloorId(e.target.value)}
                          >
                            <option value="">select floor</option>
                            {getFloor.map((data) => (
                              <option value={data.floor_no}>
                                {data.floor}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="mb-3 row">
                        <label
                          htmlFor="inputTitle"
                          className="col-sm-3 col-form-label"
                        >
                          Room :
                        </label>
                        <div className="col-sm-9">
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            {...register1("place")}
                          >
                            <option value="">select room</option>
                            {getRoom.map((data) => (
                              <option value={data.room_id}>
                                {data.room_name_no}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="mb-3 row">
                        <label
                          htmlFor="inputTitle"
                          className="col-sm-3 col-form-label"
                        >
                          Event Category :
                        </label>
                        <div className="col-sm-9">
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            {...register1("event_category_id")}
                          >
                            <option value="">
                              {editDetailsData.event_category_name}
                            </option>
                            {getEventCategory.map((data) => (
                              <option value={data.event_category_id}>
                                {data.event_category_name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="mb-3 row">
                        <label
                          htmlFor="inputTitle"
                          className="col-sm-3 col-form-label"
                        >
                          Department :
                        </label>
                        <div className="col-sm-9">
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            {...register1("departement_id")}
                          >
                            <option value="">
                              {editDetailsData.departement}
                            </option>
                            {getEventDepartment.map((data) => (
                              <option value={data.departement_id}>
                                {data.departement}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="mb-3 row">
                        <label
                          htmlFor="inputTitle"
                          className="col-sm-3  col-form-label"
                        >
                          Organization :
                        </label>
                        <div className="col-sm-9">
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            {...register1("organizer_id")}
                          >
                            <option value="">
                              {editDetailsData.organizer_name}
                            </option>
                            {getEventOrganization.map((data) => (
                              <option value={data.organizer_id}>
                                {data.organizer_name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput50"
                          className="form-label fw-bold me-2 small"
                        >
                          Attach Document :
                        </label>
                        <input
                          onChange={(e) => {
                            uploadImage2(e);
                          }}
                          type="file"
                          id="files"
                          className="ms-5"
                          name="picture"
                        />
                      </div>
                      <div className="mb-3 row text-start">
                        <label
                          htmlFor="inputTitle"
                          className="col-sm-3 col-form-label"
                        >
                          Start Date :
                        </label>
                        <div className="col-sm-9">
                          <input
                            type="date"
                            className="form-control"
                            id="inputTitle"
                            defaultValue={editDetailsData.event_name}
                            {...register1("start_date")}
                          />
                        </div>
                      </div>
                      <div className="mb-3 row ">
                        <div className="col-sm-6">
                          <label
                            htmlFor="inputTitle"
                            className="col-sm-6  col-form-label"
                          >
                            Time Start :
                          </label>
                          <div className="col-sm-10">
                            <input
                              type="time"
                              className="form-control"
                              id="inputTitle"
                              defaultValue={editDetailsData.event_name}
                              {...register1("start_date_time")}
                            />
                          </div>
                        </div>

                        <div className="col-sm-6">
                          <label
                            htmlFor="inputTitle"
                            className="col-sm-6  col-form-label"
                          >
                            End Time :
                          </label>
                          <div className="col-sm-10">
                            <input
                              type="time"
                              className="form-control"
                              id="inputTitle"
                              defaultValue={editDetailsData.event_name}
                              {...register1("end_date_time")}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="submit-section">
                    <button
                      type="submit"
                      className="btn bgColor text-white px-5 py-2 rounded"
                    >
                      Save
                    </button>

                    <button
                      type="button"
                      className="btn bgColor text-white px-5 ms-1 py-2 rounded"
                      data-dismiss="modal"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Assign Employee Modal  */}
        <div
          id="assign-employee_event"
          className="modal custom-modal fade"
          role="dialog"
        >
          <div
            className="modal-dialog modal-dialog-centered modal-xl"
            role="document"
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">ASSIGN EMPLOYEE</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body text-start bg-light">
                <form>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="mb-1 row">
                        <h5 htmlFor="inputTitle" className="col-sm-3 fw-bold">
                          Title :
                        </h5>
                        <div className="col-sm-9">
                          <h6> {assignDetailsData.tittle} </h6>
                        </div>
                      </div>

                      <div className="mb-1 row">
                        <h5 htmlFor="inputTitle" className="col-sm-3 fw-bold">
                          Schedule :
                        </h5>
                        <div className="col-sm-9">
                          <h6> {assignDetailsData.schedule} </h6>
                        </div>
                      </div>

                      <div className="mb-4 row">
                        <h5 htmlFor="inputTitle" className="col-sm-3 fw-bold">
                          Time :
                        </h5>
                        <div className="col-sm-9">
                          <h6> {assignDetailsData.time} </h6>
                        </div>
                      </div>

                      <div className="mb-3 row">
                        <div className="col-sm-12">
                          <Select
                            options={categoryOptions}
                            onChange={handleEmployeeNameCategory}
                          />
                        </div>
                      </div>

                      <div className="mb-3 row ms-1">
                        <div className="col-sm-12  border rounded p-3 ">
                          {theArray.map((data) => (
                            <span className="mb-2 d-inline-block me-2">
                              <span className="bg-primary ps-2 pe-1 py-1 text-white rounded-3">
                                {sliceEmployeeName(data)}{" "}
                                <span
                                  className="badge bg-secondary "
                                  style={{ cursor: "pointer" }}
                                  onClick={() => {
                                    deleteAssignEmployeeHandler(data);
                                  }}
                                >
                                  X
                                </span>{" "}
                              </span>
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-6 ">
                      <div className="ms-3">
                        <div className="mb-1 row">
                          <h5 htmlFor="inputTitle" className="col-sm-3 fw-bold">
                            Category:
                          </h5>
                          <div className="col-sm-9">
                            <h6> {assignDetailsData.category} </h6>
                          </div>
                        </div>
                        <div className="mb-3 row">
                          <h5
                            htmlFor="inputTitle"
                            className="col-sm-3 fw-bold "
                          >
                            Place:
                          </h5>
                          <div className="col-sm-9">
                            <h6>{assignDetailsData.event_place}</h6>
                          </div>
                        </div>

                        <div className="row">
                          {/* Search Filter */}
                          <div className="row mb-1 ">
                            <input
                              onChange={(e) => {
                                setSearchEmpName(e.target.value);
                              }}
                              className="form-control ms-3 w-100 shadow "
                              type="text"
                              placeholder="Search Name"
                            />
                          </div>
                          <div className="col-md-12">
                            <div className="table-responsive">
                              <Table
                                className="table-striped"
                                pagination={{
                                  total: assignEmployeeReportData.length,
                                  showTotal: (total, range) =>
                                    `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                                  showSizeChanger: true,
                                  onShowSizeChange: onShowSizeChange,
                                  itemRender: itemRender,
                                }}
                                style={{ overflowX: "auto" }}
                                columns={columnsAssign}
                                // bordered
                                dataSource={assignEmployeeReportData}
                                rowKey={(record) => record.id}

                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="submit-section text-end">
                      <button
                        type="button"
                        className="btn bgColor text-white px-5 ms-1 py-2 rounded"
                        data-dismiss="modal"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </form>
                <div className="mb-3 row  ms-1">
                  <button
                    className="w-25 bgColor text-white py-1 rounded"
                    onClick={() => {
                      addAssignEmployeeHandler(assignId);
                    }}
                  >
                    {" "}
                    <i className="fa fa-plus" />
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCreate;
