import React, { useEffect, useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { landingIcon1, landingIcon2, landingIcon3, landingIcon4, landingIcon5, landingIcon6, landingIcon7, logImg2 } from '../../../Entryfile/imagepath';
import Select from 'react-select'
import ReactExport from "react-export-excel";
const AllEmployeeReports = () => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const ExcelFile = ReactExport.ExcelFile;
  const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
  const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
  const [allEmployeeData, setAllEmployeeData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [departmentData, setDepartmentData] = useState([]);
  const [departmentCategory, setDepartmentCategory] = useState('')
  const [bloodGroup, setBloodGroup] = useState('')
  const [getYear, setGetYear] = useState('')
  const [allReport, setAllReport] = useState(false)
  let counter = 1;
  useEffect(() => {
    const getUsers = () => {
      setIsLoading(true);
      fetch(`/ords/hrm/employees/v_emp?limit=100000`)
        .then(res => {

          // You have to send it, as I have done below
          if (res.status >= 400) {
            throw new Error("Server responds with error!")
          }
          return res.json()
        })
        .then(users => {
          setAllEmployeeData(users.items);
          setIsLoading(false);
          setAllReport(false)
        },

          err => {
            const mute = err
            setHasError(true);
            setIsLoading(true);
          })
    };

    getUsers()
  }, [allReport])


  //  department data
  useEffect(() => {
    const getUsers = () => {
      fetch('/ords/hrm/dept/crud')
        .then(res => {
          if (res.status >= 400) {
            throw new Error("Server responds with error!")
          }
          return res.json()
        })
        .then(data => {
          setDepartmentData(data.items)
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


  // department wise Report 
  useEffect(() => {
    const getUsers = () => {
      fetch(`/ords/hrm/employees/v_emp_search_dept/${departmentCategory}?limit=100000`)
        .then(res => {
          if (res.status >= 400) {
            throw new Error("Server responds with error!")
          }
          return res.json()
        })
        .then(data => {
          setAllEmployeeData(data.items);
          setIsLoading(true);
        },
          err => {
            const mute = err
            setHasError(true);
            setIsLoading(true);
          })
    };
    if (departmentCategory) {
      getUsers();
    }

  }, [departmentCategory])

  // Blood Group wise Report 
  useEffect(() => {
    const getUsers = () => {
      setIsLoading(true);
      const url = `/ords/hrm/employees/blood?limit=10000`
      fetch(url,
        {
          method: 'GET',
          headers: {
            'blood': bloodGroup
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
          setAllEmployeeData(users.items);
          setIsLoading(false);
        },
          err => {
            const mute = err
            setHasError(true);
            setIsLoading(true);
          })
    };
    if (bloodGroup) {
      getUsers()
    }

  }, [bloodGroup])
  //  Year wise PRL Report 
  useEffect(() => {
    const getUsers = () => {
      setIsLoading(true);
      const url = `/ords/hrm/employees/lrp?limit=10000`
      fetch(url,
        {
          method: 'GET',
          headers: {
            'p_year': getYear
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
          setAllEmployeeData(users.items);
          setIsLoading(false);
        },
          err => {
            const mute = err
            setHasError(true);
            setIsLoading(true);
          })
    };
    if (getYear) {
      getUsers()
    }

  }, [getYear])







  //
  //  handele departmentData select

  const handleDepartmentSelectCategory = selectedOption => {
    setBloodGroup('');
    setGetYear('');
    setDepartmentCategory(selectedOption.value);

  }

  let categoryOptions1 = departmentData.map(data => {
    let optionsItem = {};
    optionsItem.value = data.departement;
    optionsItem.label = data.departement;
    return optionsItem;
  })


  const handleAllReport = () => {
    setBloodGroup('');
    setDepartmentCategory('');
    setGetYear('');

    setAllReport(true);


  }


  return (
    <div>
      <div className='page-wrapper'>

        <div className='row bg-project p-3 mb-3'>

          <div className="container col-sm-3 text-start mb-3">
            <label htmlFor="inputGroupSelect13" className="form-label text-light fs-6 fw-bold">Department</label>
            <Select
              options={categoryOptions1}
              onChange={handleDepartmentSelectCategory}

            />
          </div>
          <div className="container col-sm-3 text-start mb-3">
            <label htmlFor="inputGroupSelect13" className="form-label text-light fs-6 fw-bold">Year wise PRL</label>
            <input type="year" onChange={(e) => {
              setBloodGroup("")
              setGetYear(e.target.value)
            }} className="form-control" id="exampleFormControlInput14" />

          </div>
          <div className="container col-sm-3 text-start mb-3">
            <label htmlFor="inputGroupSelect13" className="form-label text-light fs-6 fw-bold">Blood Group</label>
            <select onChange={(e) => {
              setGetYear('')
              setBloodGroup(e.target.value)
            }} className="form-select form-select-lg mb-3" aria-label=".form-select-lg example">

              <option value="">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="B+">B+</option>
              <option value="O+">O+</option>
              <option value="A-">A-</option>
              <option value="B-">B-</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
          </div>

          <div className='container col-sm-2 text-start mb-3 mt-4'>
            <button className='btn btn-primary px-3 py-2' onClick={handleAllReport}>All Employees</button>
          </div>

        </div>
        <div className='text-end mt-4 me-4'>
          <button className='btn btn-primary text-end me-3' onClick={handlePrint}><i className='la la-file-pdf-o'></i> PDF!</button>
          <ExcelFile element={<a href="#" className="btn  btn-primary text-end"  >
            <i className='la la-file-excel-o'></i> Excel</a>}>
            <ExcelSheet data={allEmployeeData} name="Employees">
              <ExcelColumn label="Employee ID" value="employe_registration_number" />
              <ExcelColumn label="Name" value="name_english" />
              <ExcelColumn label="Joining Date" value="joining_date" />
              <ExcelColumn label="Designation" value="designation" />
              <ExcelColumn label="Departement" value="departement" />
              <ExcelColumn label="Phone" value="phone" />
              <ExcelColumn label="Email" value="email" />

            </ExcelSheet>

          </ExcelFile>

        </div>



        <div ref={componentRef} style={{ width: '100%', minHeight: '100vh' }} className="my-4">
          <div className="bg-light mt-1 p-4 mx-auto container">
            <div className="row text-center" >
              <div className="col-3">
                <img className="img-fluid" width="80" src={landingIcon1} alt="" />
              </div>
              <div className="col-6">
                <h4>গণপ্রজাতন্ত্রী বাংলাদেশ  সরকার </h4>
                <h5 className='lh-base'>বাংলাদেশ সেতু কর্তৃপক্ষ	<br /> সেতু ভবন,বনানী,ঢাকা-১২১২</h5>
              </div>
              <div className="col-3">
                <img className="img-fluid" width="160" src={logImg2} alt="" />
              </div>
            </div>
            <h3 className="mb-3 text-center mt-4">All Employees</h3>
            <hr className="border-bottom border-2 border-dark mb-4" />

            <table className="table table-striped my-5 text-start">
              <thead>
                <tr>
                  <th scope="col">S/N</th>
                  <th scope="col">Employee ID</th>
                  <th scope="col">Name</th>
                  <th scope="col">Joining Date</th>
                  <th scope="col">Designation</th>

                  <th scope="col">Departement</th>

                  <th scope="col">Phone</th>
                  {
                    bloodGroup &&
                    <th scope="col">Blood Group</th>
                  }
                  {
                    getYear &&
                    <th scope="col">Retired Date</th>
                  }
                  {
                    getYear &&
                    <th scope="col">Retired Status</th>
                  }
                </tr>
              </thead>
              <tbody>
                {
                  allEmployeeData.map(reports => <tr
                    key={counter}
                  >

                    <th scope="row">{counter++}</th>
                    <td>{reports.employe_registration_number}</td>
                    <td>{reports.name_english}</td>
                    <td>{reports.joining_date}</td>
                    <td>{reports.designation}</td>
                    <td>{reports.departement}</td>
                    <td>{reports.phone}</td>
                    {
                      getYear &&
                      <td>{reports.retired_date}</td>
                    }
                    {
                      getYear &&
                      <td>{reports.retired_status}</td>
                    }

                    {
                      bloodGroup &&
                      <td className='text-center' ><span className='bg-danger px-2 py-1 text-white'> {reports.blood_group}</span></td>
                    }

                  </tr>
                  )
                }


              </tbody>
            </table>







          </div>
        </div>
      </div>
    </div>
  );
};

export default AllEmployeeReports;