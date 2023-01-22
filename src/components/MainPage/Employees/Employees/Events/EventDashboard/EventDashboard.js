import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const EventDashboard = () => {


    const [eventData, setEventData] = useState([]);


    useEffect(() => {
        fetch('/ords/eve/events/v_all_events')
            .then(res => res.json())
            .then(data => {
                setEventData(data.items)

            })

    }, []);




    const agoEvent = eventData.filter(item => item.status === "ago")
    const remainEvent = eventData.filter(item => item.status === "remain")
    const runningEvent = eventData.filter(item => item.status === "running")




    return (
        <div className='page-wrapper'>
            <h2 className="mt-5">Event Dashboard</h2>
            <div className="container">  <hr /></div>



            <div className="container my-5">

                <div className="row mt-5">
                    <div className="col-sm-4 text-white text-start rounded-3">
                        <div className="card dash-widget bg-project">
                            <div className="card-body">
                                <p className='fs-5 text-end'>Total Event</p>
                                <h2 className="card-title fs-1 text-white text-end">{eventData.length}</h2>
                                <hr />
                                <h4 className='text-center '> <Link to="/eventcreate" className="text-white p-0 fs-5 nav-link"><i className="fa fa-eye"></i> View</Link></h4>

                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4 text-white text-start rounded-3">
                        <div className="card dash-widget bg-project text-white">
                            <div className="card-body">
                                <p className='fs-5 text-end'>Ago</p>
                                <h2 className="card-title fs-1 text-white text-end">{agoEvent.length}</h2>
                                <hr />
                                <h4 className='text-center '> <Link to="/eventcreate" className="text-white p-0 fs-5 nav-link"><i className="fa fa-eye"></i> View</Link></h4>

                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4 text-white text-start rounded-3">
                        <div className="card dash-widget bg-project">
                            <div className="card-body">
                                <p className='fs-5 text-end'>Remain</p>
                                <h2 className="card-title fs-1 text-white text-end">{remainEvent.length}</h2>
                                <hr />
                                <h4 className='text-center '> <Link to="/eventcreate" className="text-white p-0 fs-5 nav-link"><i className="fa fa-eye"></i> View</Link></h4>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-sm-4 text-white text-start rounded-3">
                        <div className="card dash-widget bg-project">
                            <div className="card-body">
                                <p className='fs-5 text-end'>Running</p>
                                <h2 className="card-title fs-1 text-white text-end">{runningEvent.length}</h2>
                                <hr />
                                <h4 className='text-center '> <Link to="/eventcreate" className="text-white p-0 fs-5 nav-link"><i className="fa fa-eye"></i> View</Link></h4>

                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4"></div>
                    <div className="col-sm-4"></div>

                </div>
            </div>
            {/* <div className="">
                <Reports></Reports>
            </div> */}
        </div>
    );
};

export default EventDashboard;