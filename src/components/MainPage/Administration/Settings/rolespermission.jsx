/**
 * Signin Firebase
 */

import React, { useEffect, useState } from 'react';
import { Helmet } from "react-helmet";
import { useForm } from 'react-hook-form';
import Select from 'react-select'
const axios = require('axios');
const RolePermisson = () => {
  const [roleData, setRoleData] = useState([]);
  const [getRoleName, setGetRoleName] = useState("");
  const [getRoleId, setGetRoleId] = useState("");
  const [getProgramName, setGetProgramName] = useState("")
  const [getProgramId, setGetProgramId] = useState("");
  const [getSelectRole, setGetSelectRoll] = useState("");
  const [getSelectProgram, setGetSelectProgram] = useState("");
  const [programData, setProgramData] = useState([]);
  const [roleProgramData, setRoleProgramData] = useState([]);
  const { register, reset } = useForm();
  //  const [error , setError] = useState(false);
  // Role data
  useEffect(() => {

    fetch('/ords/hrm/ass_pre/crud')
      .then(res => res.json())
      .then(data => {
        setRoleData(data.items)
      })
  }, []);

  // Program data
  useEffect(() => {

    fetch('/ords/hrm/pro/get')
      .then(res => res.json())
      .then(data => {
        setProgramData(data.items)
      })
  }, []);

  // Role Program data
  useEffect(() => {

    fetch(`/ords/hrm/rol_per_pro/get`)
      .then(res => res.json())
      .then(data => {
        setRoleProgramData(data.items)
      })
  }, []);
  let roleOption = [];
  //  select option for role
  roleOption = roleData.map(roleItem => {
    let optionsItem = {};
    optionsItem.value = roleItem.role_id;
    optionsItem.label = `${roleItem.role} (${roleItem.role_id})`;
    return optionsItem;
  })
  let programOption = [];
  //  select option for program
  programOption = programData.map(progItem => {
    let optionsItem = {};
    optionsItem.value = progItem.program_id;
    optionsItem.label = `${progItem.program} (${progItem.program_id})`;
    return optionsItem;
  })


  // rol post data

  const handleRoleSubmit = e => {
    let data = {}
    data.ROLE_ID = parseInt(getRoleId);
    data.ROLE = getRoleName;
    // post data
    axios({
      method: 'post',
      url: '/ords/hrm/ass_pre/add_rol',
      data,
      headers: { 'Authorization': 'Bearer ...' }
    })
      .then(({ data }) => {
        alert('Insert successfully')
        setGetRoleName("")
        setGetRoleId("")
      })

    e.preventDefault();
  }
  // Program post data

  const handleProgramSubmit = e => {
    let data = {}
    data.PROGRAM_ID = parseInt(getProgramId);
    data.MODULE_ID = null;
    data.PROGRAM = getProgramName;

    // post data
    axios({
      method: 'post',
      url: '/ords/hrm/pro/add_program',
      data,
      headers: { 'Authorization': 'Bearer ...' }
    })
      .then(res => {
        if (!res.data) {
          alert('Insert successfully')
          setGetProgramName("")
          setGetProgramId("")
        }

      })
    // window.location.reload();
    e.preventDefault();
  }

  return (
    <>
      <div className="page-wrapper">
        <Helmet>
          <title>Roles & Permissions - HR</title>
          <meta name="description" content="Login page" />
        </Helmet>
        {/* Page Content */}
        <div className="content container-fluid">
          {/* Page Header */}
          <div className="page-header">
            <div className="row">
              <div className="col-sm-12">
                <h3 className="page-title">Roles &amp; Permissions</h3>
              </div>
            </div>
          </div>
          {/* /Page Header */}
          <div className="row gx-2">
            <div className="col-sm-3 ">
              <div className='border pt-3 border-2 p-3'>
                <h6 className="card-title m-b-20"> Roles </h6>
                <a href="#" className="btn bgColor text-white btn-block" data-toggle="modal" data-target="#add_role"><i className="fa fa-plus" /> Add Roles</a>
                <div className="roles-menu">
                  <ul>
                    {
                      roleData.map(item => <li key={item.role_id} className="p-3">{item.role}  ({item.role_id}) </li>)
                    }



                  </ul>
                </div>
              </div>
            </div>

            <div className="col-sm-3 ">
              <div className='border pt-3 border-2 p-3'>
                <h6 className="card-title m-b-20">Program</h6>
                <a href="#" className="btn bgColor text-white btn-block" data-toggle="modal" data-target="#add_Program"><i className="fa fa-plus" /> Add Program</a>
                <div className="roles-menu">
                  <ul>
                    {
                      programData.map(item => <li key={item.program_id} className="p-3">{item.program} ({item.program_id}) </li>)
                    }


                  </ul>
                </div>
              </div>
            </div>
            <div className="col-sm-6 ">

              <div className='border pt-3 border-2 p-3'>
                <h6 className="card-title m-b-20">Program Access</h6>
                <div className='mb-4'>
                  <a href="#" className="btn bgColor text-white btn-block" data-toggle="modal" data-target="#ass_role_per"><i className="fa fa-plus" /> Assign Role Permission</a>
                </div>
                <div className="table-responsive">
                  <table className="table table-striped custom-table">
                    <thead>
                      <tr>
                        <th>Program Id</th>
                        <th className="text-center">Role id</th>

                      </tr>
                    </thead>
                    <tbody>
                      {
                        roleProgramData.map(item => <tr key={item.program_id}>
                          <td>{item.program_id}</td>
                          <td className="text-center">
                            {item.role_id}
                          </td>
                        </tr>)
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

          </div>
        </div>
        {/* /Page Content */}
        {/* Add Role Modal */}
        <div id="add_role" className="modal custom-modal fade" role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Role</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleRoleSubmit}>
                  <div className="form-group">
                    <label>Role Name <span className="text-danger">*</span></label>
                    <input value={getRoleName} onChange={e => setGetRoleName(e.target.value)} className="form-control" type="text" />
                    <label>Role Id <span className="text-danger">*</span></label>
                    <input value={getRoleId} onChange={e => setGetRoleId(e.target.value)} className="form-control" type="text" />
                  </div>
                  <div className="submit-section">
                    <button className="btn btn-primary submit-btn">Submit</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* add Program  */}

        <div id="add_Program" className="modal custom-modal fade" role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Program</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleProgramSubmit}>
                  <div className="form-group">
                    <label>Program name <span className="text-danger">*</span></label>
                    <input value={getProgramName} onChange={e => setGetProgramName(e.target.value)} className="form-control" type="text" />
                    <label> Program Id <span className="text-danger">*</span></label>
                    <input value={getProgramId} onChange={e => setGetProgramId(e.target.value)} className="form-control" type="text" />
                  </div>
                  <div className="submit-section">
                    <button className="btn btn-primary submit-btn">Submit</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* Assign Role Permission */}

        <div id="ass_role_per" className="modal custom-modal fade" role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Assign Role Permission</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body text-start">
                <form>
                  <div className="form-group">
                    <label> Role Id <span className="text-danger">*</span></label>
                    <Select
                      options={roleOption}
                      onChange={selectedOption => setGetSelectRoll(selectedOption.value)}

                    />

                    <label className='mt-4'> Program Id <span className="text-danger">*</span></label>
                    <Select
                      options={programOption}
                      onChange={selectedOption => setGetSelectProgram(selectedOption.value)}

                    />
                  </div>
                  <div className="submit-section">
                    <button className="btn btn-primary submit-btn">Submit</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>



        {/* /Add Role Modal */}
        {/* Edit Role Modal */}
        {/* <div id="edit_role" className="modal custom-modal fade" role="dialog">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content modal-md">
                <div className="modal-header">
                  <h5 className="modal-title">Edit Role</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="form-group">
                      <label>Role Name <span className="text-danger">*</span></label>
                      <input className="form-control" defaultValue="Team Leader" type="text" />
                    </div>
                    <div className="submit-section">
                      <button className="btn btn-primary submit-btn">Save</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div> */}
        {/* /Edit Role Modal */}
        {/* Delete Role Modal */}
        {/* <div className="modal custom-modal fade" id="delete_role" role="dialog">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-body">
                  <div className="form-header">
                    <h3>Delete Role</h3>
                    <p>Are you sure want to delete?</p>
                  </div>
                  <div className="modal-btn delete-action">
                    <div className="row">
                      <div className="col-6">
                        <a href="" className="btn btn-primary continue-btn">Delete</a>
                      </div>
                      <div className="col-6">
                        <a href="" data-dismiss="modal" className="btn btn-primary cancel-btn">Cancel</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        {/* /Delete Role Modal */}
      </div>

    </>
  );
}

export default RolePermisson;
