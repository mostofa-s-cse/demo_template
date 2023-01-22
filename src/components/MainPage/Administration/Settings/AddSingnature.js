import React, { useState, useEffect } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import { Table } from 'antd';
import 'antd/dist/antd.css';
import { itemRender, onShowSizeChange } from "../../paginationfunction"
import "../../antdstyle.css"
import { useForm } from 'react-hook-form';
import Select from "react-select";
import axios from 'axios';
import swal from 'sweetalert';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import useAuth from '../../../initialpage/hooks/useAuth';
import Api from '../../../initialpage/hooks/Api';
const AddSignature = () => {
    const { searchFunction } = useAuth()
    const [data, setData] = useState([]);
    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [loadUpdate, setLoadUpdate] = useState(false);
    const [searchSignature, setSearchSignature] = useState('')
    const [cropStatus, setCropStatus] = useState(false)
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

    // GET EMPLOYEE DATA
    // Select Employee search using Name
    const [emploId, setEmploId] = useState(0);
    const [employeeData, setEmployeeData] = useState([]);
    useEffect(() => {
        const getUsers = () => {
            fetch("/ords/hrm/employees/v_emp?limit=100000")
                .then((res) => {
                    if (res.status >= 400) {
                        throw new Error("Server responds with error!");
                    }
                    return res.json();
                })
                .then(
                    (data) => {
                        setEmployeeData(data.items);
                    },
                    (err) => {
                        const mute = err;
                    }
                );
        };
        getUsers();
    }, []);


    const handleEmployeeNameCategory = (selectedOption) => {
        setEmploId(selectedOption.value);
    };

    let categoryOptions = employeeData.map((data) => {
        let optionsItem = {};
        optionsItem.value = data.employe_id;
        optionsItem.label = `${data.name_english} (${data.employe_registration_number})`;
        return optionsItem;
    });




    // Employee image put section
    const [src, setSrc] = useState(null);
    const [crop, setCrop] = useState({
        unit: 'px',
        x: 25,
        y: 25,
        width: 150,
        height: 50,
    });
    const [image, setImage] = useState(null);
    const [output, setOutput] = useState(null);
    const [outputImage, setOutputImage] = useState(null)
    const [imageName, setImageName] = useState(null)
    const [imageSizeValidation, setImageSizeValidation] = useState(false);
    const [imageValidation, setImageValidation] = useState(false);
    const [getEmploId, setGetEmploId] = useState(null)
    const selectImage = (file) => {
        if (file) {
            const fileType = file.type.split('/')
            const fileSize = file.size;
            if (fileSize >= 3000000) {
                setImageSizeValidation(true);
            }
            if (fileType[0] !== "image") {
                setImageValidation(true)
            }
            setImageName(file.name)
            setSrc(URL.createObjectURL(file));
            var reader = new FileReader();
            reader.onloadend = function () {
                setOutputImage(reader.result)
            }
            reader.readAsDataURL(file);
        }
    };

    const cropImageNow = () => {
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');

        const pixelRatio = window.devicePixelRatio;
        canvas.width = crop.width * pixelRatio;
        canvas.height = crop.height * pixelRatio;
        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        ctx.imageSmoothingQuality = 'high';

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height,
        );
        // Converting to base64
        const base64Image = canvas.toDataURL();
        setImageSizeValidation(false)
        setOutput(base64Image);
    };

    // post Method 
    const onSubmitPost = data1 => {

        if (outputImage && imageSizeValidation) {
            swal({
                title: "opps!",
                text: "Please, crop your Image",
                icon: "warning",
                button: "Ok",
            });
        }
        if ((outputImage && !imageSizeValidation) || output) {
            axios({
                method: "post",
                url: `http://${Api}/addImages`,
                data: {
                    name: imageName,
                    pathName: '/public/signature/',
                    base64: output ? output : outputImage
                },
                headers: { Authorization: "Bearer ..." },
            }).then((data) => {

                const pathImage = data.data.filePath;
                console.log(data.data.status)
                if (data.data.status === 200) {
                    axios({
                        method: "post",
                        url: `/ords/hrm/emp_sig_crud/`,
                        data: {
                            SIGNATURE_PATH: pathImage,
                            EMPLOYE_ID: emploId
                        },
                        headers: { Authorization: "Bearer ..." },
                    }).then((res) => {
                        console.log(res)
                        if (res.data) {
                            swal({
                                title: "Good!",
                                text: "Successfully Updated",
                                icon: "success",
                                button: "Ok",
                            });
                            window.$("#add_signature").modal("hide");
                            window.location.reload();
                        }
                    }).catch(error => {
                        if (error && `${error}`.includes('400')) {
                            swal({
                                title: "opps!",
                                text: "Employee signature already exists",
                                icon: "warning",
                                button: "Ok",
                            });
                        }
                    })
                }

            });
        }
        if (!output && !outputImage) {
            swal({
                title: "opps!",
                text: "Please, select an image",
                icon: "warning",
                button: "Ok",
            });
        }
    }
    // Update Signature
    const onSubmitPut = (data) => {

        if (outputImage && imageSizeValidation) {
            swal({
                title: "opps!",
                text: "Please, crop your Image",
                icon: "warning",
                button: "Ok",
            });
        }
        if ((outputImage && !imageSizeValidation) || output) {
            axios({
                method: "post",
                url: `http://${Api}/addImages`,
                data: {
                    name: imageName,
                    pathName: '/public/signature/',
                    base64: output ? output : outputImage
                },
                headers: { Authorization: "Bearer ..." },
            }).then((data) => {

                const pathImage = data.data.filePath;

                if (data.data.status === 200) {
                    console.log(getId, pathImage, getEmploId)
                    axios({
                        method: "put",
                        url: `/ords/hrm/emp_sig_crud/${getId}`,
                        data: {
                            SIGNATURE_PATH: pathImage,
                            EMPLOYE_ID: getEmploId
                        },
                        headers: { Authorization: "Bearer ..." },
                    }).then((res) => {

                        if (res.data) {
                            swal({
                                title: "Good!",
                                text: "Successfully Updated",
                                icon: "success",
                                button: "Ok",
                            });
                            window.$("#edit_signature").modal("hide");
                            window.location.reload();
                        }
                    }).catch(error => {
                        console.log(error, error.error)
                        if (error && `${error}`.includes('400')) {
                            swal({
                                title: "opps!",
                                text: "Employee signature already exists",
                                icon: "warning",
                                button: "Ok",
                            });
                        }
                    })
                }

            });
        }
        if (!output && !outputImage) {
            swal({
                title: "opps!",
                text: "Please, select an image",
                icon: "warning",
                button: "Ok",
            });
        }



    }

    // const imageUploadHandle = () => {
    //     console.log(outputImage, imageSizeValidation)

    // }

    //-------------------------------------------------------------   end

    // PUT METHOD 
    const [getId, setGetId] = useState(null);

    const addSignHandle = () => {
        setCropStatus(false)
        setOutput("")
        setSrc("")
        setImage("")
    }

    const handleUpdate = updateId => {
        setCropStatus(true)
        setOutput("")
        setSrc("")
        setImage("")
        setGetId(updateId);
    }
    //

    // GET Department DATA 
    useEffect(() => {
        const getUsers = () => {
            setIsLoading(true);
            fetch(`/ords/hrm/emp_sig_crud/${getId}`)
                .then(res => {

                    // You have to send it, as I have done below
                    if (res.status >= 400) {
                        throw new Error("Server responds with error!")
                    }
                    return res.json()
                })
                .then(users => {
                    setGetEmploId(users.employe_id);
                    setIsLoading(false);
                },

                    err => {
                        const mute = err
                        setHasError(true);
                        setIsLoading(true);
                    })
        };
        if (getId) { getUsers() }
    }, [getId])




    // GET Department DATA 
    useEffect(() => {
        const getUsers = () => {
            setIsLoading(true);
            fetch(`/ords/hrm/emp_sig/?limit=10000`)
                .then(res => {

                    // You have to send it, as I have done below
                    if (res.status >= 400) {
                        throw new Error("Server responds with error!")
                    }
                    return res.json()
                })
                .then(users => {
                    const getSignData = users.items;
                    const searchSingData = searchFunction(getSignData, searchSignature, "name_english")
                    setData(searchSingData);
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
    }, [searchSignature, loadUpdate])

    const columns = [
        {
            title: 'EMPLOYEE ID',
            dataIndex: 'employe_registration_number',

        },
        {
            title: 'NAME',
            dataIndex: 'name_english',

        },
        {
            title: "SIGNATURE",
            render: (text, record) => (


                <>
                    {record.signature_path ? (
                        <div class="img square" style={{
                            backgroundImage: `url("http://${Api}/static${record.signature_path}")`
                        }}>

                        </div>
                    ) : (
                        ""
                    )}

                </>
            ),
        },


        {
            title: 'Action',
            render: (text, record) => (
                <div className="dropdown dropdown-action text-right">
                    <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                    <div className="dropdown-menu dropdown-menu-right">
                        <a className="dropdown-item" data-toggle="modal" data-target="#edit_signature" onClick={() => { handleUpdate(record.signature_id) }}><i className="fa fa-pencil m-r-5" /> Edit</a>
                    </div>
                </div>
            ),
        },
    ]



    return (
        <div>
            <div className="page-wrapper">
                <Helmet>
                    <title>Signature - HR</title>
                    <meta name="description" content="Login page" />
                </Helmet>
                {/* Page Content */}
                <div className="content container-fluid">
                    {/* Page Header */}
                    <div className="page-header">
                        <div className="row align-items-center">
                            <div className="col">
                                <h3 className="page-title">Signature</h3>
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item"><Link to="/app/main/dashboard">Dashboard</Link></li>
                                    <li className="breadcrumb-item active">Signature</li>
                                </ul>
                            </div>
                            <div onClick={addSignHandle} className="col-auto float-right ml-auto">
                                <a href="#" className="btn bgColor text-white add-btn" data-toggle="modal" data-target="#add_signature"><i className="fa fa-plus" /> Add new Signature</a>
                            </div>
                        </div>
                    </div>
                    {/* /Page Header */}


                    {/* Search Filter */}
                    <div className="row  mb-4 ps-2">

                        <input onChange={e => { setSearchSignature(e.target.value) }} className="form-control w-25 shadow py-4" type="text" placeholder="Search Here" />


                    </div>
                    {/* /Search Filter */}
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
                {/* Add Signature Modal */}

                <div id="add_signature" className="modal custom-modal fade" role="dialog">
                    <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add new Signature</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <form onSubmit={handleSubmit(onSubmitPost)}>
                                <div className="modal-body text-start">
                                    <div className="row">

                                        <div className="mb-3">
                                            <label
                                                htmlFor="inputGroupSelect12"
                                                className="form-label fw-bold small"
                                            >
                                                Choose an Employee
                                            </label>

                                            <Select
                                                options={categoryOptions}
                                                onChange={handleEmployeeNameCategory}
                                            />
                                            <input
                                                tabIndex={-1}
                                                autoComplete="off"
                                                style={{ opacity: 0, height: 0 }}
                                                value={emploId}
                                                required
                                            />
                                        </div>
                                        {!cropStatus &&
                                            <div className="">
                                                <label class="form-label smart-text fs-6" for="customFile">Upload Your Image</label>
                                                <input
                                                    onChange={(e) => {
                                                        selectImage(e.target.files[0]);
                                                    }}
                                                    type="file"
                                                    accept="image/*"
                                                    class="form-control" id="customFile"
                                                    name="picture"
                                                />
                                                {
                                                    imageSizeValidation &&
                                                    <span className="text-warning">Oops! The size limit for images is 3.0 MB. Please crop your image.</span>
                                                }
                                                {
                                                    imageValidation &&
                                                    <span className="text-danger">Oops! Please select JPG, JPEG or PNG  image and try again.</span>
                                                }

                                                <br />
                                                <br />
                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        {src && (
                                                            <div>
                                                                <ReactCrop
                                                                    crop={crop} src={src} onChange={setCrop} onImageLoaded={setImage}>

                                                                </ReactCrop>
                                                                <br />
                                                                <button type='button' className="btn bgColor text-white px-5 py-2 rounded" onClick={cropImageNow}>Crop</button>
                                                                <br />
                                                                <br />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="col-sm-6">{output && <img src={output} />}</div>
                                                </div>

                                            </div>
                                        }
                                    </div>

                                    <div className="submit-section">
                                        <button type="submit" className="btn bgColor text-white px-5 py-2 rounded" >Add</button>

                                        <button type="button" className="btn bgColor text-white px-5 ms-1 py-2 rounded" data-dismiss="modal">Close</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>




                {/* edit signature Modal */}

                <div id="edit_signature" className="modal custom-modal fade" role="dialog">
                    <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Signature</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body text-start">
                                <form onSubmit={handleSubmit1(onSubmitPut)}>
                                    <div className="row">

                                        {
                                            cropStatus &&
                                            <div className="">
                                                <label class="form-label smart-text fs-6" for="customFile">Upload Your Image</label>
                                                <input
                                                    onChange={(e) => {
                                                        selectImage(e.target.files[0]);
                                                    }}
                                                    type="file"
                                                    accept="image/*"
                                                    class="form-control" id="customFile"
                                                    name="picture"
                                                />
                                                {
                                                    imageSizeValidation &&
                                                    <span className="text-warning">Oops! The size limit for images is 3.0 MB. Please crop your image.</span>
                                                }
                                                {
                                                    imageValidation &&
                                                    <span className="text-danger">Oops! Please select JPG, JPEG or PNG  image and try again.</span>
                                                }

                                                <br />
                                                <br />
                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        {src && (
                                                            <div>
                                                                <ReactCrop
                                                                    crop={crop} src={src} onChange={setCrop} onImageLoaded={setImage}>

                                                                </ReactCrop>
                                                                <br />
                                                                <button type='button' className="btn bgColor text-white px-5 py-2 rounded" onClick={cropImageNow}>Crop</button>
                                                                <br />
                                                                <br />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="col-sm-6">{output && <img src={output} />}</div>
                                                </div>

                                            </div>
                                        }

                                    </div>

                                    <div className="submit-section">
                                        <button type="submit" className="btn bgColor text-center text-white px-5 mb-3 rounded"> Update </button>
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

export default AddSignature;