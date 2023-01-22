import React from 'react';
import { useState, useEffect } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
// import { Avatar_02, Avatar_05, Avatar_09, Avatar_10, Avatar_03, Avatar_08, Avatar_15, Avatar_20, Avatar_25, Avatar_24 } from "../../../Entryfile/imagepath"
import { Table } from 'antd';
import 'antd/dist/antd.css';
import { itemRender, onShowSizeChange } from "../../paginationfunction"
import "../../antdstyle.css"
import { useForm } from "react-hook-form";
import Select from 'react-select'
import axios from 'axios';
import { HashLink } from 'react-router-hash-link';
import swal from 'sweetalert';
import '../../../../App.css'

const Posting = () => {

  const [loadUpdate, setLoadUpdate] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = data => {
    data.EMPLOYEE_ID = employeeNameCategory;
    data.POS_FROM_DATE = `${data.POS_FROM_DATE}T00:00:00Z`
    data.POS_TO_DATE = `${data.POS_TO_DATE}T00:00:00Z`
    data.GRADE_ID = gradeCategory

    axios({
      method: 'post',
      url: '/ords/hrm/employee_posting/crud',
      data,
      headers: { 'Authorization': 'Bearer ...' }
    })
      .then(res => {
        if (!res.data) {
          setLoadUpdate(true)
          swal({
            title: "Good",
            text: "Successfully Added",
            icon: "success",
            button: "Ok",
          });
          reset();

          window.$("#add_posting").modal("hide");
        }
      })
  };

  const [employeeData, setEmployeeData] = useState([]);
  const [employeeNameCategory, setEmployeeNameCategory] = useState();
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);




  const [searchPost, setSearchPost] = useState('');

  useEffect(() => {
    const getUsers = () => {
      setIsLoading(true);

      fetch(`/ords/hrm/employee_posting/v_emp_posting?q={"name_english":{"$like":"%25${searchPost.toLocaleUpperCase()}%25"},"$orderby":{"posting_id":"desc"}}`)
        .then(res => {

          // You have to send it, as I have done below
          if (res.status >= 400) {
            throw new Error("Server responds with error!")
          }
          return res.json()
        })
        .then(users => {
          setData(users.items);
          setIsLoading(false);
          setLoadUpdate(false);
        },

          err => {
            const mute = err
            setHasError(true);
            setIsLoading(true);
          })
    };
    getUsers()
    // searchPromotion
  }, [loadUpdate, searchPost])

  useEffect(() => {
    const getUsers = () => {
      fetch('/ords/hrm/employees/crud?limit=10000')
        .then(res => {
          if (res.status >= 400) {
            throw new Error("Server responds with error!")
          }
          return res.json()
        })
        .then(data => {
          setEmployeeData(data.items)
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
  const [gradeData, setGradeData] = useState([])
  const [gradeCategory, setGradeCategory] = useState('')
  useEffect(() => {
    const getUsers = () => {
      fetch('/ords/hrm/gra?limit=10000&&q={"$orderby":{"pay_scale_from":"desc"}}')
        .then(res => {
          if (res.status >= 400) {
            throw new Error("Server responds with error!")
          }
          return res.json()
        })
        .then(data => {
          setGradeData(data.items)
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


  const handleGradeCategory = selectedOption => {
    setGradeCategory(selectedOption.value);

  }
  let gradeCategoryOptions = gradeData.map(data => {
    let optionsItem = {};
    optionsItem.value = data.grade_id;
    optionsItem.label = data.grade;
    return optionsItem;
  })





  const handleEmployeeNameCategory = selectedOption => {
    setEmployeeNameCategory(selectedOption.value);

  }





  let categoryOptions = employeeData.map(data => {
    let optionsItem = {};
    optionsItem.value = data.employe_id;
    optionsItem.label = `${data.name_english} (${data.employe_registration_number})`;
    return optionsItem;
  })




  const columns = [
    {
      title: 'Name',
      dataIndex: 'name_english',

    },
    {
      title: 'Designation',
      dataIndex: 'designation',

    },
    {
      title: 'Post',
      dataIndex: 'post',

    },
    {
      title: 'Institute Name',
      dataIndex: 'institute_name',

    },
    {
      title: 'Grade',
      dataIndex: 'grade',

    },

    {
      title: 'From',
      dataIndex: 'pos_from_date',

    },
    {
      title: 'To',
      dataIndex: 'pos_to_date',

    },

    {
      title: 'Place From',
      dataIndex: 'place_from',

    },
    {
      title: 'Place To',
      dataIndex: 'place_to',

    },
    {
      className: 'dataBreak ',
      title: 'Details',
      dataIndex: 'details',

    },




    {
      title: 'Action',
      render: (text, record) => (
        <div className="dropdown dropdown-action text-right">
          <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
          <div className="dropdown-menu dropdown-menu-right">
            <Link to={`/allemployees/employeeprofile/${record.employee_id}`}  >
              <HashLink to={`/allemployees/employeeprofile/${record.employee_id}#postHash`}>  <a className="dropdown-item" href="#" data-toggle="modal"><i className="fa fa-pencil m-r-5" /> Edit</a>
              </HashLink></Link>
            <a className="dropdown-item" href="#" data-toggle="modal" onClick={() => { deleteButtonHandler(record.posting_id) }}><i className="fa fa-trash-o m-r-5" /> Delete</a>
          </div>
        </div>
      ),


    },


  ]
  const deleteButtonHandler = (postId) => {
    //
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          const url = `/ords/hrm/employee_posting/crud`
          fetch(url,
            {
              method: 'DELETE',
              headers: {
                'POSTING_ID': postId
              }
            })
            .then(item => {
              const remainingUsers = data.filter(user => user.posting_id !== postId);
              setData(remainingUsers)

            })
          swal("Poof! Your imaginary file has been deleted!", {
            icon: "success",
          });
        } else {
          swal("Your imaginary file is safe!");
        }
      });

  }

  return (
    <div className="page-wrapper">
      <Helmet>
        <title>Posting - HR</title>
        <meta name="description" content="Login page" />
      </Helmet>
      {/* Page Content */}
      <div className="content container-fluid">
        {/* Page Header */}
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col">
              <h3 className="page-title">Posting</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/app/main/dashboard">Dashboard</Link></li>
                <li className="breadcrumb-item active">Posting</li>
              </ul>
            </div>
            <div className="col-auto float-right ml-auto">
              <a href="#" className="btn add-btn bgColor text-white" data-toggle="modal" data-target="#add_posting"><i className="fa fa-plus" /> Add Posting</a>
            </div>
          </div>
        </div>
        <div className="row  mb-4 ps-2">

          <input onChange={e => { setSearchPost(e.target.value) }} className="form-control w-25 shadow py-4" type="text" placeholder="Employee Name" />


        </div>
        {/* /Leave Statistics */}
        <div className="row">
          <div className="col-md-12">
            <div className="table-responsive">

              <Table className="table-striped"
                pagination={{
                  total: data.length,
                  showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                  showSizeChanger: true, onShowSizeChange: onShowSizeChange, itemRender: itemRender
                }}
                style={{ overflowX: 'auto' }}
                columns={columns}
                // bordered
                dataSource={data}
                rowKey={record => record.id}

              />
            </div>
          </div>
        </div>
      </div>
      {/* /Page Content */}
      {/* Add Promotion Modal */}

      <div id="add_posting" className="modal custom-modal fade" role="dialog">
        <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add new Posting</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="modal-body text-start">

                <div className="mb-3">
                  <label htmlFor="inputGroupSelect12" className="form-label fw-bold small">Employee</label>
                  <Select
                    options={categoryOptions}
                    onChange={handleEmployeeNameCategory}

                  />
                </div>
                <div className="mb-3 row">
                  <div className='col-sm-6'>
                    <label htmlFor="exampleFormControlInput14" className="form-label fw-bold small">Place From</label>
                    <input type="text" className="form-control" id="exampleFormControlInput14" placeholder="Enter Place From"  {...register("PLACE_FROM")} />
                  </div>
                  <div className='col-sm-6'>
                    <label htmlFor="exampleFormControlInput14" className="form-label fw-bold small">Place To</label>
                    <input type="text" className="form-control" id="exampleFormControlInput14" placeholder="Enter Place To"  {...register("PLACE_TO")} />
                  </div>
                </div>
                <div className="mb-3 row">
                  <div className='col-sm-6'>
                    <label htmlFor="exampleFormControlInput14" className="form-label fw-bold small">From</label>
                    <input type="date" className="form-control" id="exampleFormControlInput14" placeholder="Enter From"  {...register("POS_FROM_DATE")} />
                  </div>
                  <div className='col-sm-6'>
                    <label htmlFor="exampleFormControlInput14" className="form-label fw-bold small">To</label>
                    <input type="date" className="form-control" id="exampleFormControlInput14" placeholder="Enter To"  {...register("POS_TO_DATE")} />
                  </div>
                </div>
                <div className="mb-3 row">
                  <div className='col-sm-6'>
                    <label htmlFor="exampleFormControlInput14" className="form-label fw-bold small">Designation</label>
                    <input type="text" className="form-control" id="exampleFormControlInput14" placeholder="Enter Designation"  {...register("DESIGNATION")} />
                  </div>
                  <div className='col-sm-6'>
                    <label htmlFor="exampleFormControlInput14" className="form-label fw-bold small">Grade</label>
                    <Select
                      options={gradeCategoryOptions}
                      onChange={handleGradeCategory}

                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="exampleFormControlInput14" className="form-label fw-bold small">Institute Name</label>
                  <input type="text" className="form-control" id="exampleFormControlInput14" placeholder="Enter Institute Name"  {...register("INSTITUTE_NAME")} />
                </div>

                <div className="mb-3">
                  <label htmlFor="exampleFormControlInput14" className="form-label fw-bold small">Post</label>
                  <input type="text" className="form-control" id="exampleFormControlInput14" placeholder="Enter Post"  {...register("POST")} />
                </div>

                <div className="mb-3">
                  <label htmlFor="exampleFormControlTextarea1" className="form-label fw-bold small">Reason</label>
                  <textarea className="form-control" id="exampleFormControlTextarea1" rows="5" placeholder='Enter Reason' {...register("DETAILS")}></textarea>
                </div>


                <div className="modal-footer">
                  <button type="submit" className="btn bgColor text-white px-5 py-2 rounded">Add</button>
                  <button type="button" className="btn bgColor text-white px-5 ms-1 py-2 rounded" data-dismiss="modal">Close</button>

                </div>
              </div>
            </form>
          </div>
        </div>
      </div>






    </div >
  );
};

export default Posting;