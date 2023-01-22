import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import "./calendar.css"

import Modal from 'react-bootstrap/Modal'

const Calendar = ({ parentCallback }) => {
    // parentCallback(count);

    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [eventsData, setEventsData] = useState([])
    const [dateEventsData, setDateEventsData] = useState([])
    const [monthData, setMonthData] = useState('')
    useEffect(() => {
        const getUsers = () => {
            setIsLoading(true);
            fetch(`/ords/eve/events/v_event_date_picker`)
                .then(res => {

                    // You have to send it, as I have done below
                    if (res.status >= 400) {
                        throw new Error("Server responds with error!")
                    }
                    return res.json()
                })
                .then(users => {
                    if (users.items) {
                        setEventsData(users.items);
                    }
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

    const dateColor = (statusClr) => {
        if (statusClr === 'ago') {
            return 'bg-danger'
        }
        else if (statusClr === 'remain') {
            return 'bg-success '
        }
        else {
            return 'bg-warning '
        }

    }

    const [startDate, setDate] = useState(new Date()),
        [event_title, setevent_title] = useState(""),
        [calenderevent, setcalenderevent] = useState(""),
        [weekendsVisible, setweekendsVisible] = useState(true),
        [currentEvents, setscurrentEvents] = useState([]);

    const defaultEvents = eventsData.map(data => {
        let optionsItem = {};
        optionsItem.title = data.event_name;
        optionsItem.start = data.start_date_time;
        optionsItem.className = dateColor(data.status)
        return optionsItem;
    });



    const handleEventClick = (clickInfo) => {

        // setiseditdelete(false)
        const getDate = `${clickInfo.event.startStr}`.slice(0, 10);
        setevent_title(clickInfo.event.title)
        setcalenderevent(getDate)

    }


    // get data wise data 
    useEffect(() => {
        const getUsers = () => {
            setIsLoading(true);
            fetch(`/ords/eve/events/v_event_date_picker_by_calender?dates=${calenderevent}`)
                .then(res => {

                    // You have to send it, as I have done below
                    if (res.status >= 400) {
                        throw new Error("Server responds with error!")
                    }
                    return res.json()
                })
                .then(users => {
                    if (users.items) {
                        setDateEventsData(users.items);
                    }
                    setIsLoading(false);

                },

                    err => {
                        const mute = err
                        setHasError(true);
                        setIsLoading(true);
                    })
        };

        getUsers()

    }, [calenderevent])

    // end
    const handleMonthClick = (clickInfo) => {

        // let getMonthData = clickInfo.startStr
        //
        // setMonthData(getMonthData.slice(0, 7))
        // if (defaultEvents.length) {
        //     return defaultEvents;
        // }

    }
    parentCallback(dateEventsData, monthData);
    return (

        <div className="">

            <div className="row">
                <div className="col-md-12">
                    <div className="card bg-white calendarIndex">
                        {defaultEvents.length &&
                            <div className="card-body">
                                <FullCalendar
                                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                                    headerToolbar={{
                                        left: 'prev,next today',
                                        center: 'title',
                                        right: 'dayGridMonth,timeGridWeek,timeGridDay'

                                    }}
                                    initialView='dayGridMonth'
                                    editable={true}
                                    selectable={true}
                                    selectMirror={true}
                                    dayMaxEvents={true}
                                    weekends={weekendsVisible}
                                    // timeZone='UTC'
                                    timeZone='local'
                                    // hiddenDays={[5]}
                                    // events={defaultEvents}
                                    initialEvents={defaultEvents}

                                    eventClick={clickInfo => handleEventClick(clickInfo)}
                                // eventsClick={(monthData) => handleMonthClick(monthData)
                                // }
                                />
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>


    );

}
export default Calendar;