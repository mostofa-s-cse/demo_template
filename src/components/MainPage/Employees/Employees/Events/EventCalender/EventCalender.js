

import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { Table } from 'antd';
import 'antd/dist/antd.css';
import { itemRender, onShowSizeChange } from "../../../../../MainPage/paginationfunction.jsx"
import "../../../../../MainPage/antdstyle.css"
import swal from 'sweetalert';
import axios from 'axios';
import Select from 'react-select'
import Calendar from '../calender/calendar.jsx';
import useAuth from '../../../../../initialpage/hooks/useAuth.js';
import './EventCalender.css'


const EventCalender = () => {
    const [recentEventData, setRecentEventData] = useState([]);
    const [getFloor, setGetFloor] = useState([]);
    const [getFloorId, setGetFloorId] = useState();
    const [getRoom, setGetRoom] = useState([]);

    const [getEventCategory, setGetEventCategory] = useState([]);
    const [getEventDepartment, setGetEventDepartment] = useState([]);
    const [getEventOrganization, setGetEventOrganization] = useState([]);
    const [assignEmployeeReportData, setAssignEmployeeReportData] = useState([]);
    const [assignEmployeeReportDataLoad, setAssignEmployeeReportDataLoad] = useState(false);
    const [assignId, setAssignId] = useState(null);
    const [assignDetailsData, setAssignDetailsData] = useState([]);
    const [allEmployeeName, setAllEmployeeName] = useState([]);
    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [eventId, setEventId] = useState(null);
    const [searchData, setSearchData] = useState('');
    const [eventDateData, setEventDateData] = useState([]);
    const [displayEvent, setDisplayEvent] = useState([]);
    const { user } = useAuth();
    const employeeId = user && user.employe_id;
    var date = new Date(); // Create a Date object to find out what time it is
    const formattedDate = date.toISOString();
    const todayDate = formattedDate.slice(0, 7)
    const [yearMonth, setYearMonth] = useState(todayDate);
    const callback = (dateEventData, getYearMonth) => {
        setEventDateData(dateEventData)
        // setYearMonth(yearMonth)
    }

    // 

    useEffect(() => {
        if (eventDateData.length) {
            setDisplayEvent([...eventDateData])
        }

    }, [eventDateData])

    const {
        register: register1,
        reset: reset1,
        formState: { errors: errors1 },
        handleSubmit: handleSubmit1,
    } = useForm();
    const {
        register: register2,
        reset: reset2,
        formState: { errors: errors2 },
        handleSubmit: handleSubmit2,
    } = useForm();







    const handleSearch = e => {
        const search = e.target.value
        const remainData = eventDateData.filter(item =>
            item.event_name.toLowerCase().includes(search.toLowerCase())

        );
        setDisplayEvent(remainData);
    }


    // Post API 
    const onSubmitAddEvent = data1 => {
        data1.event_created_by = employeeId;
        data1.event_category_id = parseInt(data1.event_category_id);
        data1.departement_id = parseInt(data1.departement_id);
        data1.organizer_id = parseInt(data1.organizer_id);
        data1.place = parseInt(data1.place);
        data1.start_date_time = `${data1.start_date}T${data1.start_date_time}:00Z`
        data1.end_date_time = `${data1.start_date}T${data1.end_date_time}:00Z`


        axios({
            method: 'post',
            url: '/ords/eve/events/crud',
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
                EVENT_CHIEF_NAME: data1.event_chief_name
            },
            headers: { 'Authorization': 'Bearer ...' }
        })
            .then(res => {
                if (res) {
                    swal({
                        title: "Thank you!",
                        text: "Successfully Added",
                        icon: "success",
                        button: "Ok",
                    });

                    reset2();
                    window.location.reload();
                }
            })




    }




    const onSubmitScheduleEvent = data1 => {
        data1.start_date_time = `${data1.start_date}T${data1.start_date_time}:00Z`
        data1.end_date_time = `${data1.start_date}T${data1.end_date_time}:00Z`



        axios({
            method: 'put',

            headers: {
                'event_id': eventId
            },
            url: `/ords/eve/events/reschedule`,
            data: {
                START_DATE_TIME: data1.start_date_time,
                END_DATE_TIME: data1.end_date_time
            },
        })
            .then(res => {
                if (res) {
                    swal({
                        title: "Thank you!",
                        text: "Successfully Update",
                        icon: "success",
                        button: "Ok",
                    });

                    reset1();

                    window.$("#update_schedule").modal("hide");
                }
            })




    }

    // floor Get API 
    useEffect(() => {
        const getUsers = () => {
            setIsLoading(true);
            fetch(`/ords/eve/floor/crud`)
                .then(res => {

                    // You have to send it, as I have done below
                    if (res.status >= 400) {
                        throw new Error("Server responds with error!")
                    }
                    return res.json()
                })
                .then(users => {
                    setGetFloor(users.items);
                    setIsLoading(false);

                },

                    err => {
                        const mute = err
                        setHasError(true);
                        setIsLoading(true);
                    })
        };
        getUsers()
    }, [])

    // room Get API 
    useEffect(() => {
        const getUsers = () => {
            setIsLoading(true);
            fetch(`/ords/eve/room/room_by_floor/${getFloorId}`)
                .then(res => {

                    // You have to send it, as I have done below
                    if (res.status >= 400) {
                        throw new Error("Server responds with error!")
                    }
                    return res.json()
                })
                .then(users => {
                    setGetRoom(users.items);
                    setIsLoading(false);

                },

                    err => {
                        const mute = err
                        setHasError(true);
                        setIsLoading(true);
                    })
        };
        if (getFloorId) { getUsers() }
    }, [getFloorId])


    // Event Category Get API 
    useEffect(() => {
        const getUsers = () => {
            setIsLoading(true);
            fetch(`/ords/eve/cat/crud`)
                .then(res => {

                    // You have to send it, as I have done below
                    if (res.status >= 400) {
                        throw new Error("Server responds with error!")
                    }
                    return res.json()
                })
                .then(users => {
                    setGetEventCategory(users.items);
                    setIsLoading(false);

                },

                    err => {
                        const mute = err
                        setHasError(true);
                        setIsLoading(true);
                    })
        };
        getUsers()
    }, [])
    // Event Department Get API 
    useEffect(() => {
        const getUsers = () => {
            setIsLoading(true);
            fetch(`/ords/eve/select_list/dept_list`)
                .then(res => {

                    // You have to send it, as I have done below
                    if (res.status >= 400) {
                        throw new Error("Server responds with error!")
                    }
                    return res.json()
                })
                .then(users => {
                    setGetEventDepartment(users.items);
                    setIsLoading(false);

                },

                    err => {
                        const mute = err
                        setHasError(true);
                        setIsLoading(true);
                    })
        };
        getUsers()
    }, [])
    // Event Organization Get API 
    useEffect(() => {
        const getUsers = () => {
            setIsLoading(true);
            fetch(`/ords/eve/org/crud`)
                .then(res => {

                    // You have to send it, as I have done below
                    if (res.status >= 400) {
                        throw new Error("Server responds with error!")
                    }
                    return res.json()
                })
                .then(users => {
                    setGetEventOrganization(users.items);
                    setIsLoading(false);

                },

                    err => {
                        const mute = err
                        setHasError(true);
                        setIsLoading(true);
                    })
        };
        getUsers()
    }, [])








    //
    // const remainingUsers = eventDateData.filter(user => user.lease_id !== searchData);
    // setEventDateData(remainingUsers)


    const rescheduleButtonHandler = id => {

        setEventId(id);
    }

    const assignButtonHandler = id => {

        setAssignId(id);
    }
    // Event AssignDetails Data Get API 
    useEffect(() => {
        const getUsers = () => {
            setIsLoading(true);
            fetch(`/ords/eve/events/events_details_on_assign/${assignId}`)
                .then(res => {

                    // You have to send it, as I have done below
                    if (res.status >= 400) {
                        throw new Error("Server responds with error!")
                    }
                    return res.json()
                })
                .then(users => {
                    setAssignDetailsData(users);

                    setIsLoading(false);

                },

                    err => {
                        const mute = err
                        setHasError(true);
                        setIsLoading(true);
                    })
        };
        if (assignId) {
            getUsers()
        }
    }, [assignId])

    // ASSIGN EMPLOYEE NAME SEARCH API 
    //
    useEffect(() => {
        const getUsers = () => {
            const url = `/ords/eve/select_list/employee_list_except_assigned/${assignId}`
            fetch(url,
                {
                    method: 'GET',
                    headers: {
                        'search': `%`
                    }
                })
                .then(res => {
                    // You have to send it, as I have done below
                    if (res.status >= 400) {
                        throw new Error("Server responds with error!")
                    }
                    return res.json()
                })
                .then(users => {
                    // 
                    setAllEmployeeName(users.items);

                    // setLo)
                },
                    err => {
                        const mute = err
                        setHasError(true);
                    })
        };

        if (assignId) {
            getUsers()
        }

    }, [assignId])
    const [theArray, setTheArray] = useState([]);
    const handleEmployeeNameCategory = selectedOption => {
        let dataEmployeeName = selectedOption.value;
        setTheArray([...theArray, dataEmployeeName]);

    }

    let categoryOptions = allEmployeeName.map(data => {
        let optionsItem = {};
        optionsItem.value = `${data.employe_id}|${data.name_english}`;
        optionsItem.label = `${data.name_english} (${data.employe_registration_number})`;
        return optionsItem;
    })
    const sliceEmployeeName = (data) => {
        const myArray = data.split("|");
        const myArray1 = myArray[1].split(",");
        return myArray1[0];
    }
    const deleteAssignEmployeeHandler = name => {

        const result = theArray.filter(item => item !== name);
        setTheArray(result)
    }
    //

    const addAssignEmployeeHandler = id => {

        theArray.map(item => {
            const myArray = item.split("|");




            const data = {
                EMPLOYE_ID: parseInt(myArray[0]),
                EVENT_ID: id
            }
            axios({
                method: 'post',
                url: '/ords/eve/assign_employee/crud',
                data,

                headers: { 'Authorization': 'Bearer ...' }
            })
                .then(res => {
                    if (res.data) {




                    }
                })

        })

        setAssignEmployeeReportDataLoad(true);


    }
    const [searchEmpName, setSearchEmpName] = useState('')
    // ASSIGN EMPLOYEE Report SEARCH API 

    useEffect(() => {
        const getUsers = () => {
            const url = `/ords/eve/select_list/emp_assign_on_event/${assignId}`
            fetch(url,
                {
                    method: 'GET',
                    headers: {
                        'search': `${searchEmpName}%`
                    }
                })
                .then(res => {
                    // You have to send it, as I have done below
                    if (res.status >= 400) {
                        throw new Error("Server responds with error!")
                    }
                    return res.json()
                })
                .then(users => {
                    // 
                    setAssignEmployeeReportData(users.items);
                    setAssignEmployeeReportDataLoad(false)
                    // setLo)
                },
                    err => {
                        const mute = err
                        setHasError(true);
                    })
        };

        if (assignId) {
            getUsers()
        }

    }, [assignId, assignEmployeeReportDataLoad, searchEmpName])



    // Delete API 

    let deleteError1 = true;
    const assignDeleteButtonHandler = (Id) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    const url = `/ords/eve/assign_employee/crud`
                    fetch(url,
                        {
                            method: 'DELETE',
                            headers: {

                                'EVENT_ID': assignId,
                                'EMPLOYE_ID': Id
                            }
                        })
                        .then(item => {
                            const remainingUsers = assignEmployeeReportData.filter(user => user.employe_id !== Id);
                            setAssignEmployeeReportData(remainingUsers)

                        })
                        .catch(err => {
                            const mute = err
                            if (err.message) {
                                alert("You can't delete this Other!");
                                deleteError1 = false;
                            }


                        })
                        .then(res => {

                            if (deleteError1) {
                                swal("Poof! Your imaginary file has been deleted!", {
                                    icon: "success",
                                });
                            }

                        })


                } else {
                    swal("Your imaginary file is safe!");
                }
            });
    };

    useEffect(() => {
        const getUsers = () => {
            setIsLoading(true);
            fetch(`/ords/eve/events/v_event_date_picker_by_month?dates=${yearMonth}`)
                .then(res => {

                    // You have to send it, as I have done below
                    if (res.status >= 400) {
                        throw new Error("Server responds with error!")
                    }
                    return res.json()
                })
                .then(users => {
                    setDisplayEvent(users.items);
                    setIsLoading(false);

                },

                    err => {
                        const mute = err
                        setHasError(true);
                        setIsLoading(true);
                    })
        };
        if (!eventDateData.length) {
            getUsers()
        }

    }, [])
    useEffect(() => {
        const getUsers = () => {
            setIsLoading(true);
            fetch(`/ords/eve/events/recent_event_on_calender`)
                .then(res => {

                    // You have to send it, as I have done below
                    if (res.status >= 400) {
                        throw new Error("Server responds with error!")
                    }
                    return res.json()
                })
                .then(users => {
                    setRecentEventData(users.items);
                    setIsLoading(false);

                },

                    err => {
                        const mute = err
                        setHasError(true);
                        setIsLoading(true);
                    })
        };
        getUsers()
    }, [])

    const columnsAssign = [

        {
            title: 'ID',
            dataIndex: 'employe_id',

        },
        {
            title: 'Name',
            dataIndex: 'name_english',

        },

        {
            title: 'Mobile',
            dataIndex: 'mobile_phone',

        },

        {
            title: 'Action',
            render: (text, record) => (
                <div className="dropdown dropdown-action text-right">
                    <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>

                    <div className="dropdown-menu dropdown-menu-right">
                        <a className="dropdown-item" href="#" data-toggle="modal" onClick={() => { assignDeleteButtonHandler(record.employe_id) }}  ><i className="fa fa-trash-o m-r-5" /> Delete</a>
                    </div>
                </div >
            ),
        },
    ]
    const d = new Date();
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let monthName = month[d.getMonth()];
    const textClrHandle = (evStatus) => {
        const statusData = evStatus.split(" ")
        let textClr = (statusData[statusData.length - 1])
        if (textClr === "Ago") {
            return "text-danger"
        }
        else if (textClr === "Remain") {
            return "text-success"
        }
        else {
            return "text-warning"
        }
    }
    let count = 1;
    const eventCrdBg = (crdCount) => {
        if (crdCount > 5) {
            count = 2;
            crdCount = 1;
        }
        return `eventCrdBgClr${crdCount}`

    }

    return (
        <div className='page-wrapper  mt-5'>
            <div className='row ms-3'>
                <div className='col-sm-6'>
                    <div className="row mb-3">
                        <div className="col-sm-3 text-start ">
                            <h2>{monthName}</h2>
                            <h5 className='fw-lighter'>{`${d}`.slice(0, 21)}</h5>
                        </div>
                        <div className="col-sm-9">
                            <div className="row  ">

                                {/* <input onChange={handleSearch} className="form-control w-50 shadow ms-lg-3 me-2" type="text" placeholder="Search Event" /> */}
                                {/* <button className='w-25 bgColor text-white rounded' data-toggle="modal" data-target="#new_event">+ New Event</button> */}
                            </div>
                        </div>
                    </div>

                    {displayEvent.length > 0 &&
                        displayEvent.map(item =>
                            <div className="">
                                <div className="row gx-5 mb-3">
                                    <div className="col-sm-3 ">
                                        <div className="p-3 border rounded h-100 bg-light text-start">{item.start_time}</div>
                                    </div>
                                    <div className="col-sm-9">
                                        <div className={`p-3 border rounded ${eventCrdBg(count++)}`}>
                                            <div className='d-flex justify-content-between mb-4'>
                                                <h5>
                                                    {item.event_name}
                                                </h5>
                                                <p className={`${textClrHandle(item.remain)} p-2 rounded-3`}>
                                                    {item.remain}
                                                </p>
                                            </div>
                                            <div className='d-flex justify-content-between'>
                                                <p>
                                                    {item.time_schedule}
                                                </p>
                                                <p>
                                                    {item.total_employee}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        )

                    }





                </div>
                <div className='col-sm-6'>
                    <div className="">

                        <Calendar parentCallback={callback}></Calendar>

                        <hr />
                        <div className='event-height overflow-auto w-100'>

                            {recentEventData.length &&
                                recentEventData.map(item => <div className='border rounded mb-3'>
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-sm-3 my-2 ps-1 ">
                                                <div className='bg-danger rounded-3 py-3 px-2 text-center'>
                                                    <h4 className='text-white'>{item.date1}</h4>

                                                </div>
                                            </div>
                                            <div className="col-sm-7 px-0 ">
                                                <div className='py-3 text-start' > <h5 className='mb-3'>{item.event_name} </h5>
                                                    <h5 className='text-primary'>{item.date2}</h5></div>
                                            </div>
                                            <div className="col-sm-2 ">

                                            </div>
                                        </div>
                                    </div>
                                    <div className='container'>
                                        <div className='row my-2'>
                                            <div className="col-sm-6 px-0 ">
                                                <div className='ps-2 text-start'>
                                                    <button className='bg-primary text-white rounded' data-toggle="modal" data-target="#assign-employee_event" onClick={() => { assignButtonHandler(item.event_id) }}>Assign Employee +</button>
                                                </div>
                                            </div>
                                            <div className="col-sm-4  px-0">
                                                <div >
                                                    <button className='bg-primary text-white rounded' data-toggle="modal" data-target="#update_schedule" onClick={() => { rescheduleButtonHandler(item.event_id) }}>Reschedule</button>
                                                </div>
                                            </div>
                                            <div className="col-sm-2">

                                            </div>
                                        </div>
                                    </div>
                                </div>

                                )
                            }










                        </div>
                    </div>
                </div>
            </div>

            {/* new create Event Modal */}

            <div id="new_event" className="modal custom-modal fade" role="dialog">
                <div className="modal-dialog modal-dialog-centered modal-xl" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">NEW EVENT FORM</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body text-start bg-light">
                            <form onSubmit={handleSubmit2(onSubmitAddEvent)} >
                                <div className="row">


                                    <div className='col-sm-6'>
                                        <div className="mb-3 row">
                                            <label for="inputTitle" className="col-sm-3 col-form-label">Event Title :</label>
                                            <div className="col-sm-9">
                                                <input type="text" className="form-control" id="inputTitle" placeholder='Event Title' {...register2("event_name")} />
                                            </div>
                                        </div>
                                        <div className="mb-3 row">
                                            <label for="inputTitle" className="col-sm-3 col-form-label">Description :</label>
                                            <div className="col-sm-9">
                                                <textarea className="form-control" placeholder="Description" id="floatingTextarea2"  {...register2("event_description")} ></textarea>
                                            </div>
                                        </div>
                                        <div className="mb-3 row">
                                            <label for="inputTitle" className="col-sm-3 col-form-label">Presenter/Trainer:</label>
                                            <div className="col-sm-9">
                                                <input type="text" className="form-control" id="inputTitle" placeholder='Name'  {...register2("event_chief_name")} />
                                            </div>
                                        </div>
                                        <div className="mb-3 row">
                                            <label for="inputTitle" className="col-sm-3 col-form-label">Floor :</label>
                                            <div className="col-sm-9">
                                                <select className="form-select" aria-label="Default select example" onClick={e => setGetFloorId(e.target.value)} {...register2("floor_no")}>
                                                    <option value="">select floor</option>
                                                    {

                                                        getFloor.map(data =>
                                                            <option value={data.floor_no}>{data.floor}</option>
                                                        )

                                                    }
                                                </select>
                                            </div>
                                        </div>
                                        <div className="mb-3 row">
                                            <label for="inputTitle" className="col-sm-3 col-form-label">Room :</label>
                                            <div className="col-sm-9">
                                                <select className="form-select" aria-label="Default select example"  {...register2("place")}>
                                                    {

                                                        getRoom.map(data =>
                                                            <option value={data.room_id}>{data.room_name_no}</option>
                                                        )

                                                    }
                                                </select>
                                            </div>
                                        </div>


                                    </div>
                                    <div className='col-sm-6'>
                                        <div className="mb-3 row">
                                            <label for="inputTitle" className="col-sm-3 col-form-label">Event Category :</label>
                                            <div className="col-sm-9">
                                                <select className="form-select" aria-label="Default select example"  {...register2("event_category_id")}>
                                                    <option value="">select Category</option>
                                                    {

                                                        getEventCategory.map(data =>
                                                            <option value={data.event_category_id}>{data.event_category_name}</option>
                                                        )

                                                    }
                                                </select>
                                            </div>
                                        </div>
                                        <div className="mb-3 row">
                                            <label for="inputTitle" className="col-sm-3 col-form-label">Department :</label>
                                            <div className="col-sm-9">
                                                <select className="form-select" aria-label="Default select example"  {...register2("departement_id")}>
                                                    <option value="">select Department</option>
                                                    {

                                                        getEventDepartment.map(data =>
                                                            <option value={data.departement_id}>{data.departement}</option>
                                                        )

                                                    }
                                                </select>
                                            </div>
                                        </div>
                                        <div className="mb-3 row">
                                            <label for="inputTitle" className="col-sm-3  col-form-label">Organization :</label>
                                            <div className="col-sm-9">
                                                <select className="form-select" aria-label="Default select example"  {...register2("organizer_id")}>
                                                    <option value="">select Organization</option>
                                                    {

                                                        getEventOrganization.map(data =>
                                                            <option value={data.organizer_id}>{data.organizer_name}</option>
                                                        )

                                                    }
                                                </select>
                                            </div>
                                        </div>
                                        <div className="mb-3 row text-start">
                                            <label for="inputTitle" className="col-sm-3 col-form-label">Start Date :</label>
                                            <div className="col-sm-9">
                                                <input type="date" className="form-control" id="inputTitle"  {...register2("start_date")} />
                                            </div>
                                        </div>
                                        <div className="mb-3 row ">
                                            <div className='col-sm-6'>
                                                <label for="inputTitle" className="col-sm-6  col-form-label">Time Start :</label>
                                                <div className="col-sm-10">
                                                    <input type="time" className="form-control" id="inputTitle"  {...register2("start_date_time")} />
                                                </div>
                                            </div>

                                            <div className='col-sm-6'>
                                                <label for="inputTitle" className="col-sm-6  col-form-label">End Time :</label>
                                                <div className="col-sm-10">
                                                    <input type="time" className="form-control" id="inputTitle"  {...register2("end_date_time")} />
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                </div>

                                <div className="submit-section">
                                    <button type="submit" className="btn bgColor text-white px-5 py-2 rounded" >Save</button>

                                    <button type="button" className="btn bgColor text-white px-5 ms-1 py-2 rounded" data-dismiss="modal">Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>



            <div id="update_schedule" className="modal custom-modal fade" role="dialog">
                <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">UPDATE EVENT SCHEDULE</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body text-start bg-light">
                            <form onSubmit={handleSubmit1(onSubmitScheduleEvent)} >
                                <div className="row">


                                    <div className='col-sm-12'>

                                        <div className="mb-3 row text-start">
                                            <label for="inputTitle" className="col-sm-3 col-form-label">Start Date :</label>
                                            <div className="col-sm-9">
                                                <input type="date" className="form-control" id="inputTitle"  {...register1("start_date")} />
                                            </div>
                                        </div>
                                        <div className="mb-3 row ">
                                            <div className='col-sm-6'>
                                                <label for="inputTitle" className="col-sm-6  col-form-label">Time Start :</label>
                                                <div className="col-sm-10">
                                                    <input type="time" className="form-control" id="inputTitle"  {...register1("start_date_time")} />
                                                </div>
                                            </div>

                                            <div className='col-sm-6'>
                                                <label for="inputTitle" className="col-sm-6  col-form-label">End Time :</label>
                                                <div className="col-sm-10">
                                                    <input type="time" className="form-control" id="inputTitle"  {...register1("end_date_time")} />
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                </div>


                                <div className="submit-section">
                                    <button type="submit" className="btn bgColor text-white px-5 py-2 rounded" >Save</button>

                                    <button type="button" className="btn bgColor text-white px-5 ms-1 py-2 rounded" data-dismiss="modal">Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div id="assign-employee_event" className="modal custom-modal fade" role="dialog">
                <div className="modal-dialog modal-dialog-centered modal-xl" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">ASSIGN EMPLOYEE</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body text-start bg-light">
                            <form >
                                <div className="row">
                                    <div className='col-sm-6'>
                                        <div className="mb-1 row">
                                            <h5 for="inputTitle" className="col-sm-3 fw-bold">Title :</h5>
                                            <div className="col-sm-9">
                                                <h6> {assignDetailsData.tittle} </h6>
                                            </div>
                                        </div>

                                        <div className="mb-1 row">
                                            <h5 for="inputTitle" className="col-sm-3 fw-bold">Schedule :</h5>
                                            <div className="col-sm-9">
                                                <h6> {assignDetailsData.schedule} </h6>
                                            </div>
                                        </div>

                                        <div className="mb-4 row">
                                            <h5 for="inputTitle" className="col-sm-3 fw-bold">Time :</h5>
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

                                        <div className='mb-3 row ms-1'>
                                            <div className="col-sm-12  border rounded p-3 ">
                                                {theArray.map(data =>
                                                    <span className='mb-2 d-inline-block me-2'>
                                                        <span className='bg-primary ps-2 pe-1 py-1 text-white rounded-3'>{sliceEmployeeName(data)} <span className="badge bg-secondary " style={{ cursor: "pointer" }} onClick={() => { deleteAssignEmployeeHandler(data) }} >X</span> </span>
                                                    </span>

                                                )}
                                            </div>
                                        </div>


                                    </div>
                                    <div className='col-sm-6 '>

                                        <div className='ms-3'>
                                            <div className="mb-1 row">
                                                <h5 for="inputTitle" className="col-sm-3 fw-bold">Category:</h5>
                                                <div className="col-sm-9">
                                                    <h6> {assignDetailsData.category} </h6>
                                                </div>
                                            </div>
                                            <div className="mb-3 row">
                                                <h5 for="inputTitle" className="col-sm-3 fw-bold ">Place:</h5>
                                                <div className="col-sm-9">
                                                    <h6>{assignDetailsData.event_place}</h6>
                                                </div>
                                            </div>

                                            <div className="row">
                                                {/* Search Filter */}
                                                <div className="row mb-1 ">

                                                    <input onChange={e => { setSearchEmpName(e.target.value) }} className="form-control ms-3 w-100 shadow " type="text" placeholder="Search Name" />


                                                </div>
                                                <div className="col-md-12">
                                                    <div className="table-responsive">

                                                        <Table className="table-striped"
                                                            pagination={{
                                                                total: assignEmployeeReportData.length,
                                                                showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                                                                showSizeChanger: true, onShowSizeChange: onShowSizeChange, itemRender: itemRender
                                                            }}
                                                            style={{ overflowX: 'auto' }}
                                                            columns={columnsAssign}
                                                            // bordered
                                                            dataSource={assignEmployeeReportData}
                                                            rowKey={record => record.id}

                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                        </div>





                                    </div>

                                    <div className="submit-section text-end">
                                        <button type="button" className="btn bgColor text-white px-5 ms-1 py-2 rounded" data-dismiss="modal">Close</button>
                                    </div>
                                </div>
                            </form>
                            <div className='mb-3 row  ms-1' >
                                <button className='w-25 bgColor text-white py-1 rounded' onClick={() => { addAssignEmployeeHandler(assignId) }} > <i className="fa fa-plus" />Add</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default EventCalender;