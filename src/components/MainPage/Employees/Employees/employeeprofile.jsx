/**
 * TermsCondition Page
 */
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useParams } from "react-router-dom";
import {
  Avatar_02,
  Avatar_05,
  Avatar_09,
  Avatar_10,
  Avatar_16,
  placeholderImg,
} from "../../../Entryfile/imagepath";
import "font-awesome/css/font-awesome.min.css";
import { useReactToPrint } from "react-to-print";
import "../../../assets/css/font-awesome.min.css";
import "../../../assets/css/line-awesome.min.css";
import Select from "react-select";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../../assets/css/bootstrap.min.css";
import "../../../assets/css/select2.min.css";
import "../../../assets/js/app";
import "../../../assets/plugins/bootstrap-tagsinput/bootstrap-tagsinput.css";
import "../../../assets/css/bootstrap-datetimepicker.min.css";
import "../../../assets/css/style.css";
import { data } from "jquery";
import { useForm } from "react-hook-form";
import DateTimePicker from "react-datetime-picker";
import axios from "axios";
import swal from "sweetalert";
import { saveAs } from "file-saver";
import Api from "../../../initialpage/hooks/Api";

const EmployeeProfile = () => {
  const [employeeData, setEmployeeData] = useState({});
  const [employeeDataDate, setEmployeeDataDate] = useState({});
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadUpdate, setLoadUpdate] = useState(false);
  const [employeeChildren, setEmployeeChildren] = useState([]);
  const [docTypeData, setDocTypeData] = useState([]);
  const [employeeDoc, setEmployeeDoc] = useState([]);
  const [employeeLeave, setEmployeeLeave] = useState([]);
  const [employeeLoan, setEmployeeLoan] = useState([]);
  const [employeeHealth, setEmployeeHealth] = useState([]);
  const [employeeDiscipline, setEmployeeDiscipline] = useState([]);
  const [employeePromotion, setEmployeePromotion] = useState([]);
  const [employeePost, setEmployeePost] = useState([]);
  const [employeeTraining, setEmployeeTraining] = useState([]);
  const [employeeEducation, setEmployeeEducation] = useState([]);
  const [employeeBirthDate, setEmployeeBirthDate] = useState(null);
  const { emp_id } = useParams();






  //---------------------------- download image start

  const downloadXrayImage = (imageSrc, empl_id) => {
    const extension = imageSrc.split(".");
    saveAs(
      `http://${Api}/static${imageSrc}`,
      `Xray_${empl_id}.${extension[extension.length - 1]}`
    ); // Put your image url here.
  };
  const downloadEcgImage = (imageSrc2, empl_id2) => {
    const extension = imageSrc2.split(".");
    saveAs(
      `http://${Api}/static${imageSrc2}`,
      `Ecg_${empl_id2}.${extension[extension.length - 1]}`
    ); // Put your image url here.
  };
  const downloadPunishementImage = (imageSrc2, empl_id2) => {
    const extension = imageSrc2.split(".");
    saveAs(
      `http://${Api}/static${imageSrc2}`,
      `Pun_${empl_id2}.${extension[extension.length - 1]}`
    ); // Put your image url here.
  };
  const downloadReleaseImage = (imageSrc2, empl_id2) => {
    const extension = imageSrc2.split(".");
    saveAs(
      `http://${Api}/static${imageSrc2}`,
      `Pun_${empl_id2}.${extension[extension.length - 1]}`
    ); // Put your image url here.
  };



  // GET EMPLOYEE DATA USING EMPLOYEE ID
  useEffect(() => {
    const getUsers = () => {
      fetch(`/ords/hrm/employees/v_emp_all/${emp_id}`)
        .then((res) => {
          // You have to send it, as I have done below
          if (res.status >= 400) {
            throw new Error("Server responds with error!");
          }
          return res.json();
        })
        .then(
          (users) => {
            setEmployeeData(users);
            setLoadUpdate(false);

          },

          (err) => {
            const mute = err;
            setHasError(true);
          }
        );
    };
    if (emp_id) {
      getUsers();
    }

  }, [loadUpdate, emp_id]);

  // GET EMPLOYEE DATA USING EMPLOYEE ID
  useEffect(() => {
    const getUsers = () => {
      fetch(`/ords/hrm/employees/${emp_id}`)
        .then((res) => {
          // You have to send it, as I have done below
          if (res.status >= 400) {
            throw new Error("Server responds with error!");
          }
          return res.json();
        })
        .then(
          (users) => {
            setEmployeeDataDate(users.items[0]);

          },

          (err) => {
            const mute = err;
            setHasError(true);
          }
        );
    };
    if (emp_id) {
      getUsers();
    }
  }, [loadUpdate, emp_id]);

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
  const {
    register: register2,
    reset: reset2,
    formState: { errors: errors2 },
    handleSubmit: handleSubmit2,
  } = useForm();
  const {
    register: register3,
    reset: reset3,
    formState: { errors: errors3 },
    handleSubmit: handleSubmit3,
  } = useForm();
  const {
    register: register4,
    reset: reset4,
    formState: { errors: errors4 },
    handleSubmit: handleSubmit4,
  } = useForm();
  const {
    register: register5,
    reset: reset5,
    formState: { errors: errors5 },
    handleSubmit: handleSubmit5,
  } = useForm();
  const {
    register: register6,
    reset: reset6,
    formState: { errors: errors6 },
    handleSubmit: handleSubmit6,
  } = useForm();
  const {
    register: register7,
    reset: reset7,
    formState: { errors: errors7 },
    handleSubmit: handleSubmit7,
  } = useForm();
  const {
    register: register8,
    reset: reset8,
    formState: { errors: errors8 },
    handleSubmit: handleSubmit8,
  } = useForm();
  const {
    register: register9,
    reset: reset9,
    formState: { errors: errors9 },
    handleSubmit: handleSubmit9,
  } = useForm();

  const {
    register: register10,
    reset: reset10,
    formState: { errors: errors10 },
    handleSubmit: handleSubmit10,
  } = useForm();
  const {
    register: register11,
    reset: reset11,
    formState: { errors: errors11 },
    handleSubmit: handleSubmit11,
  } = useForm();
  const {
    register: register12,
    reset: reset12,
    formState: { errors: errors12 },
    handleSubmit: handleSubmit12,
  } = useForm();

  const {
    register: register13,
    reset: reset13,
    formState: { errors: errors13 },
    handleSubmit: handleSubmit13,
  } = useForm();
  const {
    register: register14,
    reset: reset14,
    formState: { errors: errors14 },
    handleSubmit: handleSubmit14,
  } = useForm();
  const {
    register: register15,
    reset: reset15,
    formState: { errors: errors15 },
    handleSubmit: handleSubmit15,
  } = useForm();
  const {
    register: register16,
    reset: reset16,
    formState: { errors: errors16 },
    handleSubmit: handleSubmit16,
  } = useForm();
  const {
    register: register17,
    reset: reset17,
    formState: { errors: errors17 },
    handleSubmit: handleSubmit17,
  } = useForm();
  const {
    register: registerAddLoan,
    reset: reset19,
    formState: { errors: errorsAddLoan },
    handleSubmit: handleSubmitAddLoan,
  } = useForm();
  const {
    register: registerChild,
    reset: resetChild,
    formState: { errors: errorsChild },
    handleSubmit: handleSubmitChild,
  } = useForm();
  const {
    register: registerPost,
    reset: resetPost,
    formState: { errors: errorsPost },
    handleSubmit: handleSubmitPost,
  } = useForm();
  const {
    register: registerPostUpdate,
    reset: resetPostUpdate,
    formState: { errors: errorsPostUpdate },
    handleSubmit: handleSubmitPostUpdate,
  } = useForm();
  const {
    register: registerDocPost,
    reset: resetDocPost,
    formState: { errors: errorsDocPost },
    handleSubmit: handleSubmitDocPost,
  } = useForm();

  //Post  Add child information
  const [certificateFilePath, setCertificateFilePath] = useState(null);
  const [childFilePath, setChildFilePath] = useState(null);
  const [childBirthDateUpload, setChildBirthDateUpload] = useState(null);

  //------------------------ date convert
  // function dateConvert(getDate) {
  //   const splitData = getDate.split('-')
  //   // if (convertType === 1) {
  //   //   const ye = splitData[0]
  //   //   const mo = splitData[1]
  //   //   const da = splitData[2]
  //   //   return `${da}-${mo}-${ye}`
  //   // }
  //   // else {
  //   const ye = splitData[2]
  //   const mo = splitData[1]
  //   const da = splitData[0]
  //   return `${ye}-${mo}-${da}`
  // }



  // --------------------------end


  const uploadCertificateImage = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();

    formData.append("image", file);

    axios({
      method: "post",
      url: `http://${Api}/addChildImages`,
      data: formData,
      headers: { Authorization: "Bearer ..." },
    }).then((data) => {
      setCertificateFilePath(data.data);
    });
  };
  const uploadChildImage = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();

    formData.append("image", file);

    axios({
      method: "post",
      url: `http://${Api}/addChildImages`,
      data: formData,
      headers: { Authorization: "Bearer ..." },
    }).then((data) => {
      setChildFilePath(data.data);

    });
  };

  const onSubmitChild = (dataChild) => {
    if (childFilePath) {
      dataChild.CHILD_PHOTO_PATH = childFilePath;
    } else {
      dataChild.child_image = "";
    }
    if (certificateFilePath) {
      dataChild.CERTIFICATE_PATH = certificateFilePath;
    } else {
      dataChild.CERTIFICATE_PATH = "";
    }

    dataChild.date_birth = `${dataChild.date_birth}T00: 00: 00Z`;


    axios({
      method: "post",
      url: "/ords/hrm/emp_chi/crud",
      data: {
        EMPLOYE_ID: emp_id,
        CHILD_NAME: dataChild.child_name,
        GENDER: dataChild.gender,
        DATE_BIRTH: dataChild.date_birth,
        SCHOOL: dataChild.school,
        CHILD_CLASS: dataChild.child_class,
        CERTIFICATE_PATH: dataChild.CERTIFICATE_PATH,
        CHILD_PHOTO_FILE: null,
        CHILD_PHOTO_PATH: dataChild.CHILD_PHOTO_PATH,
        CHILD_CERTIFICATE_FILE: null,
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
        resetChild();

        window.$("#add_child").modal("hide");
      }
    });
  };

  // Post Add POST

  const onSubmitPost = (data) => {
    data.EMPLOYEE_ID = parseInt(emp_id);
    data.POS_FROM_DATE = `${data.POS_FROM_DATE}T00: 00: 00Z`;
    data.POS_TO_DATE = `${data.POS_TO_DATE}T00: 00: 00Z`;

    axios({
      method: "post",
      url: "/ords/hrm/employee_posting/crud",
      data,
      headers: { Authorization: "Bearer ..." },
    }).then((res) => {
      if (!res.data) {
        setLoadUpdate(true);
        swal({
          title: "Good",
          text: "Successfully Added",
          icon: "success",
          button: "Ok",
        });
        resetPost();

        window.$("#addPost").modal("hide");
      }
    });
  };

  // Education Post
  const onSubmitAddEducation = (data1) => {


    axios({
      method: "post",
      url: "/ords/hrm/emp_edu/crud",
      data: {
        EMPLOYE_ID: parseInt(emp_id),
        NAME_INSTITUTION: data1.name_institution,
        PRINCIPAL_SUBJECT: data1.principal_subject,
        DEGREE_DIPLOMA: data1.degree_diploma,
        PASSIGNE_YEAR: parseInt(data1.passigne_year),
        EDUCATION_RESULT: data1.education_result,
        DISTINCTION: data1.distinction,
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
        reset17();

        window.$("#addEducation").modal("hide");
      }
    });
  };
  // Employee image put section
  const [employeeUpdateImagePath, setEmployeeUpdateImagePath] = useState("");
  const { handleSubmit: handleSubmitProfileImage } = useForm();

  const employeeImageUpdateHandle = (e) => {
    const imageEmployee = e.target.files[0];
    const formData = new FormData();

    formData.append("image", imageEmployee);

    axios({
      method: "post",
      url: `http://${Api}/addImages`,
      data: formData,
      headers: { Authorization: "Bearer ..." },
    }).then((data) => {
      setEmployeeUpdateImagePath(data.data);

    });
  };
  const onSubmitProfileImage = (profileData) => {
    if (employeeUpdateImagePath) {
      profileData.PHOTO_PATH = employeeUpdateImagePath;
    } else {
      profileData.PHOTO_PATH = employeeData.photo_path;
    }
    axios({
      method: "put",

      headers: {
        EMPLOYE_ID: emp_id,
      },
      url: `/ords/hrm/employees/upload_emp_image`,
      data: {
        PHOTO_PATH: profileData.PHOTO_PATH,
      },
    }).then((res) => {
      if (!res.data) {
        alert("Update Successfully");
        setTimeout(() => { }, 1000);
        window.location.reload();
      }
    });
  };



  // Loan Post
  const onSubmitAddLoan = (data1) => {

    data1.sanction_date = `${data1.sanction_date}T00:00:00Z`;


    data1.termination_date = `${data1.termination_date}T00:00:00Z`;

    data1.date_status = `${data1.date_status}T00:00:00Z`;


    data1.loan_id = parseInt(data1.loan_id);
    data1.loan_funds_id = parseInt(data1.loan_funds_id);
    data1.loan_amount = parseInt(data1.loan_amount);
    data1.number_month = parseInt(data1.number_month);
    data1.installment = parseInt(data1.installment);
    data1.employe_id = parseInt(emp_id);
    //

    axios({
      method: "post",
      url: "/ords/hrm/emp_loa/crud",
      data: {
        EMPLOYE_ID: data1.employe_id,
        LOAN_ID: data1.loan_id,
        LOAN_FUNDS_ID: data1.loan_funds_id,
        // VALIDATOR_ID: NULL,
        MEMO: data1.memo,
        SANCTION_DATE: data1.sanction_date,
        LOAN_AMOUNT: data1.loan_amount,
        LOAN_AMOUNT_WORD: data1.loan_amount_word,
        NUMBER_MONTH: data1.number_month,
        INSTALLMENT: data1.installment,
        TERMINATION_DATE: data1.termination_date,
        EMPLOYEE_MEMO: data1.employee_memo,
        DATE_STATUS: data1.date_status,
        STATUS: "New",
      },
      headers: { Authorization: "Bearer ..." },
    }).then((res) => {
      if (!res.data) {
        setLoadUpdate(true);
        swal({
          title: "Good!",
          text: "Successfully Added",
          icon: "success",
          button: "Ok",
        });
        reset19();

        window.$("#addLoan").modal("hide");
      }
    });
  };

  // Don't Edit Anything
  // Employee Information PUT SECTION

  const onSubmitEmployeeInfo = (data1) => {
    //

    if (data1.card_id) {
      data1.card_id = data1.card_id;
    } else {
      data1.card_id = employeeData.card_id;
    }
    if (data1.employe_registration_number) {
      data1.employe_registration_number = data1.employe_registration_number;
    } else {
      data1.employe_registration_number =
        employeeData.employe_registration_number;
    }
    if (data1.name_english) {
      data1.name_english = data1.name_english;
    } else {
      data1.name_english = employeeData.name_english;
    }
    if (data1.name_bangla) {
      data1.name_bangla = data1.name_bangla;
    } else {
      data1.name_bangla = employeeData.name_bangla;
    }
    if (data1.fater_englih) {
      data1.fater_englih = data1.fater_englih;
    } else {
      data1.fater_englih = employeeData.fater_englih;
    }
    if (data1.father_bangla) {
      data1.father_bangla = data1.father_bangla;
    } else {
      data1.father_bangla = employeeData.father_bangla;
    }
    if (data1.mother_english) {
      data1.mother_english = data1.mother_english;
    } else {
      data1.mother_english = employeeData.mother_english;
    }
    if (data1.mother_bangla) {
      data1.mother_bangla = data1.mother_bangla;
    } else {
      data1.mother_bangla = employeeData.mother_bangla;
    }
    if (data1.mobile_phone) {
      data1.mobile_phone = data1.mobile_phone;
    } else {
      data1.mobile_phone = employeeData.mobile_phone;
    }

    if (!data1.date_birth) {
      //
      data1.date_birth = employeeDataDate.date_birth;
    } else {
      data1.date_birth = `${data1.date_birth}T00:00:00Z`;
    }
    //
    axios({
      method: "put",

      headers: {
        EMPLOYE_ID: emp_id,
      },
      url: `/ords/hrm/employees/upd_emp_info`,
      data: {
        MOBILE_PHONE: data1.mobile_phone,
        NAME_BANGLA: data1.name_bangla,
        NAME_ENGLISH: data1.name_english,
        FATHER_BANGLA: data1.father_bangla,
        FATER_ENGLIH: data1.fater_englih,
        MOTHER_BANGLA: data1.mother_bangla,
        MOTHER_ENGLISH: data1.mother_english,
        DATE_BIRTH: data1.date_birth,
        CARD_ID: data1.card_id,
        EMPLOYE_REGISTRATION_NUMBER: data1.employe_registration_number,
      },
    }).then((res) => {
      if (!res.data) {
        setLoadUpdate(true);
        swal({
          title: "Good!",
          text: "Successfully Updated",
          icon: "success",
          button: "Ok",
        });

        window.$("#employee_info_modal").modal("hide");
      }
    });
  };

  // Job Information PUT SECTION

  const [departmentCategory, setDepartmentCategory] = useState();
  const [departmentData, setDepartmentData] = useState([]);
  const [designationSelectCategory, setDesignationSelectCategory] = useState();

  const onSubmitJobInfo = (data1) => {

    data1.designation_id = designationSelectCategory;
    data1.departement_id = departmentCategory;
    if (data1.designation_id) {
      data1.designation_id = data1.designation_id;
    } else {
      data1.designation_id = employeeDataDate.designation_id;
    }
    if (data1.departement_id) {
      data1.departement_id = data1.departement_id;
    } else {
      data1.departement_id = employeeDataDate.departement_id;
    }

    if (data1.cadre) {
      data1.cadre = data1.cadre;
    } else {
      data1.cadre = employeeData.cadre;
    }

    if (data1.email_adress) {
      data1.email_adress = data1.email_adress;
    } else {
      data1.email_adress = employeeData.email_adress;
    }

    if (data1.telephone_number) {
      data1.telephone_number = data1.telephone_number;
    } else {
      data1.telephone_number = employeeData.telephone_number;
    }

    if (data1.joining_date) {
      data1.joining_date = `${data1.joining_date}T00:00:00Z`;
    } else {
      data1.joining_date = employeeDataDate.joining_date;
    }
    if (data1.lrp_date) {
      data1.lrp_date = `${data1.lrp_date}T00:00:00Z`;
    } else {
      data1.lrp_date = employeeDataDate.lrp_date;
    }
    if (data1.date_confirmation) {
      data1.date_confirmation = `${data1.date_confirmation}T00:00:00Z`;
    } else {
      data1.date_confirmation = employeeDataDate.date_confirmation;
    }

    // PUT METHOD
    axios({
      method: "put",

      headers: {
        EMPLOYE_ID: emp_id,
      },
      url: `/ords/hrm/employees/upd_emp_job_info`,
      data: {
        DESIGNATION_ID: data1.designation_id,
        DEPARTEMENT_ID: data1.departement_id,
        CADRE: data1.cadre,
        EMAIL_ADRESS: data1.email_adress,
        TELEPHONE_NUMBER: data1.telephone_number,
        JOINING_DATE: data1.joining_date,
        LRP_DATE: data1.lrp_date,
        DATE_CONFIRMATION: data1.date_confirmation,
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

        window.$("#job_info_modal").modal("hide");
      }
    });
  };

  // Department Select Option
  let categoryOptionsDepartment = departmentData.map((data) => {
    let optionsItem = {};
    optionsItem.value = data.departement_id;
    optionsItem.label = data.departement;
    return optionsItem;
  });

  const handleDepartmentSelectCategory = (selectedOption) => {
    setDepartmentCategory(selectedOption.value);
  };

  const handleDesignationCategory = (selectedOption) => {
    setDesignationSelectCategory(selectedOption.value);
  };

  // GET DEPARTMENT DATA
  useEffect(() => {
    const getUsers = () => {
      fetch("/ords/hrm/dept/crud")
        .then((res) => {
          if (res.status >= 400) {
            throw new Error("Server responds with error!");
          }
          return res.json();
        })
        .then(
          (data) => {
            setDepartmentData(data.items);

          },
          (err) => {
            const mute = err;
            setHasError(true);

          }
        );
    };
    getUsers();
  }, []);

  const [joiningDate, SetJoiningDate] = useState("");
  const [lrpDate, setLrpDate] = useState("");
  const [dateConfirmation, setDateConfirmation] = useState("");


  // General PUT SECTION
  const onSubmitGeneral = (data1) => {
    //
    if (data1.blood_group) {
      data1.blood_group = data1.blood_group;
    } else {
      data1.blood_group = employeeData.blood_group;
    }
    if (data1.religion) {
      data1.religion = data1.religion;
    } else {
      data1.religion = employeeData.religion;
    }
    if (data1.gender) {
      data1.gender = data1.gender;
    } else {
      data1.gender = employeeData.gender;
    }
    if (data1.nationality) {
      data1.nationality = data1.nationality;
    } else {
      data1.nationality = employeeData.nationality;
    }
    if (data1.freedom_fighter === "Yes") {
      data1.freedom_fighter = 1;
    } else {
      data1.freedom_fighter = 0;
    }
    if (data1.grandchild_ff === "Yes") {
      data1.grandchild_ff = 1;
    } else {
      data1.grandchild_ff = 0;
    }
    if (data1.tribal === "Yes") {
      data1.tribal = 1;
    } else {
      data1.tribal = 0;
    }

    // PUT METHOD
    axios({
      method: "put",

      headers: {
        EMPLOYE_ID: emp_id,
      },
      url: `/ords/hrm/employees/upd_emp_general_info`,
      data: {
        BLOOD_GROUP: data1.blood_group,
        RELIGION: data1.religion,
        GENDER: data1.gender,
        FREEDOM_FIGHTER: data1.freedom_fighter,
        GRANDCHILD_FF: data1.grandchild_ff,
        TRIBAL: data1.tribal,
        NATIONALITY: data1.nationality,
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

        window.$("#general_info_modal").modal("hide");
      }
    });
  };

  // Emergency PUT SECTION
  const onSubmitEmergency = (data1) => {
    //

    if (data1.emergency_contact) {
      data1.emergency_contact = data1.emergency_contact;
    } else {
      data1.emergency_contact = employeeData.emergency_contact;
    }
    if (data1.emergency_relation) {
      data1.emergency_relation = data1.emergency_relation;
    } else {
      data1.emergency_relation = employeeData.emergency_relation;
    }
    if (data1.emergency_phone) {
      data1.emergency_phone = data1.emergency_phone;
    } else {
      data1.emergency_phone = employeeData.emergency_phone;
    }

    // PUT METHOD
    axios({
      method: "put",

      headers: {
        EMPLOYE_ID: emp_id,
      },
      url: `/ords/hrm/employees/upd_emp_eme_con`,
      data: {
        EMERGENCY_CONTACT: data1.emergency_contact,
        EMERGENCY_RELATION: data1.emergency_relation,
        EMERGENCY_PHONE: data1.emergency_phone,
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

        window.$("#emergency_contact_modal").modal("hide");
      }
    });
  };

  // ADDRESS PUT SECTION
  const [districtData, setDistrictData] = useState([]);
  const [presentCategory, setPresentCategory] = useState();
  const [permanentCategory, setPermanentCategory] = useState();
  const [officialCategory, setOfficialCategory] = useState();

  // GET DISTRICT DATA
  useEffect(() => {
    const getUsers = () => {
      fetch("/ords/hrm/dist/crud")
        .then((res) => {
          if (res.status >= 400) {
            throw new Error("Server responds with error!");
          }
          return res.json();
        })
        .then(
          (data) => {
            setDistrictData(data.items);

          },
          (err) => {
            const mute = err;
            setHasError(true);

          }
        );
    };
    getUsers();
  }, []);
  const handlePresentSelectCategory = (selectedOption) => {
    setPresentCategory(selectedOption.value);
  };
  const handlePermanentSelectCategory = (selectedOption) => {
    setPermanentCategory(selectedOption.value);
  };
  const handleOfficialSelectCategory = (selectedOption) => {
    setOfficialCategory(selectedOption.value);
  };

  // District Select Option
  let categoryOptions = districtData.map((data) => {
    let optionsItem = {};
    optionsItem.value = data.district_id;
    optionsItem.label = data.district;
    return optionsItem;
  });

  // Official Put Section --------------------------------------------------------------
  // ----------------------------------------------------------------------------------

  const onSubmitOfficial = (data1) => {
    //

    if (data1.official_adress_adress) {
      data1.official_adress_adress = data1.official_adress_adress;
    } else {
      data1.official_adress_adress = employeeData.official_adress_adress;
    }
    if (data1.official_adress_po) {
      data1.official_adress_po = data1.official_adress_po;
    } else {
      data1.official_adress_po = employeeData.official_adress_po;
    }
    if (data1.official_adress_upazilla) {
      data1.official_adress_upazilla = data1.official_adress_upazilla;
    } else {
      data1.official_adress_upazilla = employeeData.official_adress_upazilla;
    }

    if (!officialCategory) {
      data1.official_adress_district = employeeData.official_adress_district;
    } else {
      data1.official_adress_district = officialCategory;
    }

    // PUT METHOD
    axios({
      method: "put",

      headers: {
        EMPLOYE_ID: emp_id,
      },
      url: `/ords/hrm/employees/upd_emp_offi_addr`,
      data: {
        OFFICIAL_ADRESS_ADRESS: data1.official_adress_adress,
        OFFICIAL_ADRESS_PO: data1.official_adress_po,
        OFFICIAL_ADRESS_UPAZILLA: data1.official_adress_upazilla,
        OFFICIAL_ADRESS_DISTRICT: data1.official_adress_district,
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

        window.$("#Official_address_modal").modal("hide");
      }
    });
  };

  // Permanent Put Section --------------------------------------------------------------
  // ----------------------------------------------------------------------------------

  const onSubmitPermanent = (data1) => {
    //

    if (data1.permanent_adress_adress) {
      data1.permanent_adress_adress = data1.permanent_adress_adress;
    } else {
      data1.permanent_adress_adress = employeeData.permanent_adress_adress;
    }
    if (data1.permanent_adress_po) {
      data1.permanent_adress_po = data1.permanent_adress_po;
    } else {
      data1.permanent_adress_po = employeeData.permanent_adress_po;
    }
    if (data1.permanent_adress_upazilla) {
      data1.permanent_adress_upazilla = data1.permanent_adress_upazilla;
    } else {
      data1.permanent_adress_upazilla = employeeData.permanent_adress_upazilla;
    }

    if (!permanentCategory) {
      data1.permanent_adress_district = employeeData.permanent_adress_district;
    } else {
      data1.permanent_adress_district = permanentCategory;
    }

    // PUT METHOD
    axios({
      method: "put",

      headers: {
        EMPLOYE_ID: emp_id,
      },
      url: `/ords/hrm/employees/upd_emp_perm_addr`,
      data: {
        PERMANENT_ADRESS_ADRESS: data1.permanent_adress_adress,
        PERMANENT_ADRESS_PO: data1.permanent_adress_po,
        PERMANENT_ADRESS_UPAZILLA: data1.permanent_adress_upazilla,
        PERMANENT_ADRESS_DISTRICT: data1.permanent_adress_district,
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

        window.$("#permanent_address_modal").modal("hide");
      }
    });
  };

  // Present Put Section --------------------------------------------------------------
  // ----------------------------------------------------------------------------------

  const onSubmitPresent = (data1) => {


    if (data1.present_adress_adress) {
      data1.present_adress_adress = data1.present_adress_adress;
    } else {
      data1.present_adress_adress = employeeData.present_adress_adress;
    }
    if (data1.present_adress_po) {
      data1.present_adress_po = data1.present_adress_po;
    } else {
      data1.present_adress_po = employeeData.present_adress_po;
    }
    if (data1.present_adress_upazilla) {
      data1.present_adress_upazilla = data1.present_adress_upazilla;
    } else {
      data1.present_adress_upazilla = employeeData.present_adress_upazilla;
    }

    if (!presentCategory) {
      data1.present_adress_district = employeeData.present_adress_district;
    } else {
      data1.present_adress_district = presentCategory;
    }

    // PUT METHOD
    axios({
      method: "put",

      headers: {
        EMPLOYE_ID: emp_id,
      },
      url: `/ords/hrm/employees/upd_emp_pres_addr`,
      data: {
        PRESENT_ADRESS_ADRESS: data1.present_adress_adress,
        PRESENT_ADRESS_PO: data1.present_adress_po,
        PRESENT_ADRESS_UPAZILLA: data1.present_adress_upazilla,
        PRESENT_ADRESS_DISTRICT: data1.present_adress_district,
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

        window.$("#present_address_modal").modal("hide");
      }
    });
  };

  // Spouse Put Section --------------------------------------------------------------
  // ----------------------------------------------------------------------------------
  const [spouseImagePath, setSpouseImagePath] = useState("");
  const uploadSpouseImage = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();

    formData.append("image", file);

    axios({
      method: "post",
      url: `http://${Api}/addSpouseImages`,
      data: formData,
      headers: { Authorization: "Bearer ..." },
    }).then((data) => {
      setSpouseImagePath(data.data);

    });
  };

  const onSubmitSpouse = (data1) => {
    //

    if (data1.spouse_name) {
      data1.spouse_name = data1.spouse_name;
    } else {
      data1.spouse_name = employeeData.spouse_name;
    }
    if (data1.spouse_nationality) {
      data1.spouse_nationality = data1.spouse_nationality;
    } else {
      data1.spouse_nationality = employeeData.spouse_nationality;
    }
    if (data1.spouse_card_id) {
      data1.spouse_card_id = data1.spouse_card_id;
    } else {
      data1.spouse_card_id = employeeData.spouse_card_id;
    }
    if (spouseImagePath) {
      data1.SPOUSE_PHOTO = spouseImagePath;
    } else {
      data1.SPOUSE_PHOTO = employeeData.spouse_photo;
    }

    // PUT METHOD
    axios({
      method: "put",

      headers: {
        EMPLOYE_ID: emp_id,
      },
      url: `/ords/hrm/employees/upd_emp_spou_info`,
      data: {
        SPOUSE_NAME: data1.spouse_name,
        SPOUSE_NATIONALITY: data1.spouse_nationality,
        SPOUSE_CARD_ID: data1.spouse_card_id,
        SPOUSE_PHOTO: data1.SPOUSE_PHOTO,
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

        window.$("#spouse_info_modal").modal("hide");
      }
    });
  };

  // Children Put Section --------------------------------------------------------------
  // ----------------------------------------------------------------------------------
  const [getChildrenId, setGetChildrenId] = useState(null);
  const [singleChildrenData, setSingleChildrenData] = useState([]);
  const [updateCertificateFilePath, setUpdateCertificateFilePath] =
    useState(null);
  const [updateChildFilePath, setUpdateChildFilePath] = useState(null);
  const updateCertificateImage = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();

    formData.append("image", file);

    axios({
      method: "post",
      url: `http://${Api}/addChildImages`,
      data: formData,
      headers: { Authorization: "Bearer ..." },
    }).then((data) => {
      setUpdateCertificateFilePath(data.data);
    });
  };
  const updateChildImage = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();

    formData.append("image", file);

    axios({
      method: "post",
      url: `http://${Api}/addChildImages`,
      data: formData,
      headers: { Authorization: "Bearer ..." },
    }).then((data) => {
      setUpdateChildFilePath(data.data);

    });
  };

  const onSubmitChildren = (data1) => {
    if (data1.date_birth) {
      data1.date_birth = `${data1.date_birth}T00: 00: 00Z`;
    } else {
      data1.date_birth = singleChildrenData.date_birth;
    }

    if (data1.gender) {
      data1.gender = data1.gender;
    } else {
      data1.gender = singleChildrenData.gender;
    }
    if (data1.child_name) {
      data1.child_name = data1.child_name;
    } else {
      data1.child_name = singleChildrenData.child_name;
    }
    if (data1.school) {
      data1.school = data1.school;
    } else {
      data1.school = singleChildrenData.school;
    }
    if (data1.child_class) {
      data1.child_class = data1.child_class;
    } else {
      data1.child_class = singleChildrenData.child_class;
    }
    if (updateChildFilePath) {
      data1.CHILD_PHOTO_PATH = updateChildFilePath;
    } else {
      data1.CHILD_PHOTO_PATH = singleChildrenData.child_photo_path;
    }
    if (updateCertificateFilePath) {
      data1.CERTIFICATE_PATH = updateCertificateFilePath;
    } else {
      data1.CERTIFICATE_PATH = singleChildrenData.certificate_path;
    }
    //

    // PUT METHOD
    axios({
      method: "put",

      headers: {
        EMPLOYEE_CHILD_ID: getChildrenId,
      },
      url: `/ords/hrm/emp_chi/crud`,
      data: {
        EMPLOYEE_CHILD_ID: getChildrenId,
        EMPLOYE_ID: singleChildrenData.employe_id,
        CHILD_NAME: data1.child_name,
        GENDER: data1.gender,
        DATE_BIRTH: data1.date_birth,
        SCHOOL: data1.school,
        CHILD_CLASS: data1.child_class,
        CHILD_PHOTO_PATH: data1.CHILD_PHOTO_PATH,
        CERTIFICATE_PATH: data1.CERTIFICATE_PATH,
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

        window.$("#children_info_modal").modal("hide");
      }
    });
  };

  const handleChildrenUpdate = (updateChildrenId) => {
    //
    setGetChildrenId(updateChildrenId);
  };

  // get Single Children data
  useEffect(() => {
    const getUsers = () => {

      fetch(`/ords/hrm/emp_chi/${getChildrenId}`)
        .then((res) => {
          // You have to send it, as I have done below
          if (res.status >= 400) {
            throw new Error("Server responds with error!");
          }
          return res.json();
        })
        .then(
          (users) => {
            setSingleChildrenData(users.items[0]);
            //

            setLoadUpdate(false);
          },

          (err) => {
            const mute = err;
            setHasError(true);

          }
        );
    };
    if (getChildrenId) {
      getUsers();
    }
  }, [getChildrenId, loadUpdate]);

  const [childBirthDate, setChildBirthDate] = useState("");


  // Document Post Section ------------------------------------------------------
  // ----------------------------------------------------------------------------
  const [documentImagePath, setDocumentImagePath] = useState(null);



  const uploadImageDoc = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    // 
    formData.append("image", file);

    axios({
      method: "post",
      url: `http://${Api}/addImages`,
      data: formData,
      headers: { Authorization: "Bearer ..." },
    }).then((data) => {
      //
      setDocumentImagePath(data.data);
    });
  };

  const onSubmitDocumentPost = (data1) => {

    data1.document_type_id = parseInt(data1.document_type_id);
    data1.memo = data1.memo;
    data1.employee_doc = documentImagePath;
    //
    //
    axios({
      method: "post",
      url: "/ords/hrm/emp_doc/crud",
      data: {

        EMPLOYE_ID: parseInt(emp_id),
        DOCUMENT_TYPE_ID: data1.document_type_id,
        MEMO: data1.memo,
        EMPLOYEE_DOC: data1.employee_doc,

      },
    }).then((res) => {
      if (!res.data) {
        setLoadUpdate(true);
        swal({
          title: "Good job!",
          text: "Successfully Added",
          icon: "success",
          button: "Ok",
        });
        resetDocPost();

        window.$("#document_info_modal_post").modal("hide");
      }
    });
  };

  // const [singleDocData, setSingleDocData] = useState([]);
  // const [singleDocDataDate, setSingleDocDataDate] = useState([]);
  // const [getDocId, setGetDocId] = useState(null);

  // const onSubmitDocument = (data1) => {
  //   data1.document_type_id = parseInt(data1.document_type_id);

  //   if (data1.memo) {
  //     data1.memo = data1.memo;
  //   } else {
  //     data1.memo = singleDocData.memo;
  //   }

  //   if (data1.document_type_id) {
  //     data1.document_type_id = data1.document_type_id;
  //   } else {
  //     data1.document_type_id = singleDocData.document_type_id;
  //   }

  //   //

  //   // PUT METHOD
  //   axios({
  //     method: "put",

  //     headers: {
  //       EMPLOYEE_DOC_ID: getDocId,
  //     },
  //     url: `/ords/hrm/emp_doc/crud`,
  //     data: {
  //       EMPLOYEE_DOC_ID: getDocId,
  //       EMPLOYE_ID: singleDocData.employe_id,
  //       DOCUMENT_TYPE_ID: data1.document_type_id,
  //       MEMO: data1.memo,
  //       DATE_CREATION: singleDocDataDate.date_creation,
  //       EMPLOYEE_DOC: data1.employee_doc,
  //     },
  //   }).then((res) => {
  //     if (!res.data) {
  //       setLoadUpdate(true);
  //       swal({
  //         title: "Good job!",
  //         text: "Successfully Updated",
  //         icon: "success",
  //         button: "Ok",
  //       });

  //       window.$("#document_info_modal").modal("hide");
  //     }
  //   });
  // };

  // const handleDocUpdate = (updateDocId) => {
  //   //
  //   setGetDocId(updateDocId);
  // };

  // // Get Employee Doc Data
  // useEffect(() => {
  //   const getUsers = () => {
  //     fetch(`/ords/hrm/emp_doc/v_emp_doc/e/${emp_id}`)
  //       .then((res) => {
  //         // You have to send it, as I have done below
  //         if (res.status >= 400) {
  //           throw new Error("Server responds with error!");
  //         }
  //         return res.json();
  //       })
  //       .then(
  //         (users) => {
  //           setSingleDocData(users.items[0]);

  //           setLoadUpdate(false);
  //         },

  //         (err) => {
  //           const mute = err;
  //           setHasError(true);
  //         }
  //       );
  //   };
  //   getUsers();
  // }, [loadUpdate, emp_id]);

  // // GET SINGLE DOCUMENT DATA FOR DATE UPDATE

  // useEffect(() => {
  //   const getUsers = () => {
  //     fetch(`/ords/hrm/emp_doc/e/${emp_id}`)
  //       .then((res) => {
  //         // You have to send it, as I have done below
  //         if (res.status >= 400) {
  //           throw new Error("Server responds with error!");
  //         }
  //         return res.json();
  //       })
  //       .then(
  //         (users) => {
  //           setSingleDocDataDate(users.items[0]);
  //         },

  //         (err) => {
  //           const mute = err;
  //           setHasError(true);
  //         }
  //       );
  //   };
  //   getUsers();
  // }, [emp_id]);

  // Loan Put Section --------------------------------------------------------------
  // ----------------------------------------------------------------------------------

  const [loanType, setLoanType] = useState([]);
  const [birthDate, setBirthDate] = useState();
  const [loanFunds, setLoanFunds] = useState([]);

  const [getLoanId, setGetLoanId] = useState(null);
  const [getLoanData, setGetLoanData] = useState({});
  const [loanDate, setLoanDate] = useState({});

  const [loanData, setLoanData] = useState([]);

  const onSubmitLoan = (data1) => {
    data1.loan_id = parseInt(data1.loan_id);
    data1.loan_funds_id = parseInt(data1.loan_funds_id);
    data1.loan_amount = parseInt(data1.loan_amount);
    data1.number_month = parseInt(data1.number_month);
    data1.installment = parseInt(data1.installment);
    if (data1.sanction_date) {
      data1.sanction_date = `${data1.sanction_date}T00:00:00Z`;
    } else {
      data1.sanction_date = loanDate.sanction_date;
    }

    if (data1.date_status) {
      data1.date_status = `${data1.date_status}T00:00:00Z`;
    } else {
      data1.date_status = loanDate.date_status;
    }

    if (data1.termination_date) {
      data1.termination_date = `${data1.termination_date}T00:00:00Z`;
    } else {
      data1.termination_date = loanDate.termination_date;
    }
    if (data1.loan_id) {
      data1.loan_id = data1.loan_id;
    } else {
      data1.loan_id = loanDate.loan_id;
    }
    if (data1.loan_funds_id) {
      data1.loan_funds_id = data1.loan_funds_id;
    } else {
      data1.loan_funds_id = loanDate.loan_funds_id;
    }
    if (data1.loan_amount) {
      data1.loan_amount = data1.loan_amount;
    } else {
      data1.loan_amount = getLoanData.loan_amount;
    }
    if (data1.number_month) {
      data1.number_month = data1.number_month;
    } else {
      data1.number_month = getLoanData.number_month;
    }

    if (data1.installment) {
      data1.installment = data1.installment;
    } else {
      data1.installment = getLoanData.installment;
    }
    if (data1.memo) {
      data1.memo = data1.memo;
    } else {
      data1.memo = getLoanData.memo;
    }

    if (data1.employee_memo) {
      data1.employee_memo = data1.employee_memo;
    } else {
      data1.employee_memo = getLoanData.employee_memo;
    }
    if (data1.loan_amount_word) {
      data1.loan_amount_word = data1.loan_amount_word;
    } else {
      data1.loan_amount_word = getLoanData.loan_amount_word;
    }

    // PUT METHOD
    axios({
      method: "put",

      headers: {
        EMPLOYE_LOAN_ID: getLoanId,
      },
      url: `/ords/hrm/emp_loa/crud`,
      data: {
        EMPLOYE_LOAN_ID: getLoanId,
        EMPLOYE_ID: getLoanData.employe_id,
        LOAN_ID: data1.loan_id,
        LOAN_FUNDS_ID: data1.loan_funds_id,
        MEMO: data1.memo,
        SANCTION_DATE: data1.sanction_date,
        LOAN_AMOUNT: data1.loan_amount,
        LOAN_AMOUNT_WORD: data1.loan_amount_word,
        NUMBER_MONTH: data1.number_month,
        INSTALLMENT: data1.installment,
        TERMINATION_DATE: data1.termination_date,
        EMPLOYEE_MEMO: data1.employee_memo,
        DATE_STATUS: data1.date_status,
        STATUS: getLoanData.status,
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

        window.$("#loan_info_modal").modal("hide");
      }
    });
  };
  //

  const handleLoanUpdate = (updateLoanId) => {
    setGetLoanId(updateLoanId);
  };

  // GET LOAN DATA
  useEffect(() => {
    const getUsers = () => {

      fetch(`/ords/hrm/emp_loa/v_emp_loa/${getLoanId}`)
        .then((res) => {
          // You have to send it, as I have done below
          if (res.status >= 400) {
            throw new Error("Server responds with error!");
          }
          return res.json();
        })
        .then(
          (users) => {
            setGetLoanData(users);
            //

            setLoadUpdate(false);
          },

          (err) => {
            const mute = err;
            setHasError(true);

          }
        );
    };
    if (getLoanId) {
      getUsers();
    }
  }, [getLoanId, loadUpdate]);

  useEffect(() => {
    const getUsers = () => {

      fetch(`/ords/hrm/emp_loa/${getLoanId}`)
        .then((res) => {
          // You have to send it, as I have done below
          if (res.status >= 400) {
            throw new Error("Server responds with error!");
          }
          return res.json();
        })
        .then(
          (users) => {
            setLoanDate(users);

            setLoadUpdate(false);
          },

          (err) => {
            const mute = err;
            setHasError(true);

          }
        );
    };
    if (getLoanId) {
      getUsers();
    }
  }, [getLoanId, loadUpdate]);

  const [terminationDate, setTerminationDate] = useState("");
  const [paidDate, setPaidDate] = useState("");
  const [sanctionDate, setSanctionDate] = useState("");

  // GET LOAN_TYPE DATA
  useEffect(() => {
    const getUsers = () => {

      fetch(`/ords/hrm/loa_typ/crud`)
        .then((res) => {
          // You have to send it, as I have done below
          if (res.status >= 400) {
            throw new Error("Server responds with error!");
          }
          return res.json();
        })
        .then(
          (users) => {
            setLoanType(users.items);

          },

          (err) => {
            const mute = err;
            setHasError(true);

          }
        );
    };
    getUsers();
  }, []);

  // GET LOAN_FUNDS DATA
  useEffect(() => {
    const getUsers = () => {

      fetch(`/ords/hrm/loa_fun/crud`)
        .then((res) => {
          // You have to send it, as I have done below
          if (res.status >= 400) {
            throw new Error("Server responds with error!");
          }
          return res.json();
        })
        .then(
          (users) => {
            setLoanFunds(users.items);

          },

          (err) => {
            const mute = err;
            setHasError(true);

          }
        );
    };
    getUsers();
  }, []);

  // Leave Put Section --------------------------------------------------------
  // --------------------------------------------------------------------------------

  const [leaveType, setLeaveType] = useState([]);
  const [getLeaveId, setGetLeaveId] = useState(null);
  const [getLeaveData, setGetLeaveData] = useState({});
  const [leaveDate, setLeaveDate] = useState({});

  const onSubmitLeave = (data1) => {
    //

    data1.employe_id = parseInt(data1.employe_id);

    if (data1.date_from) {
      data1.date_from = `${data1.date_from}T00:00:00Z`;
    } else {
      data1.date_from = leaveDate.date_from;
    }
    if (data1.date_to) {
      data1.date_to = `${data1.date_to}T00:00:00Z`;
    } else {
      data1.date_to = leaveDate.date_to;
    }
    if (data1.employee_memo) {
      data1.employee_memo = data1.employee_memo;
    } else {
      data1.employee_memo = getLeaveData.employee_memo;
    }

    if (data1.cause) {
      data1.cause = data1.cause;
    } else {
      data1.cause = getLeaveData.cause;
    }
    if (data1.memo_validator) {
      data1.memo_validator = data1.memo_validator;
    } else {
      data1.memo_validator = getLeaveData.memo_validator;
    }
    if (data1.duration) {
      data1.duration = parseInt(data1.duration);
    } else {
      data1.duration = leaveDate.duration;
    }
    if (data1.leave_id) {
      data1.leave_id = parseInt(data1.leave_id);
    } else {
      data1.leave_id = leaveDate.leave_id;
    }

    // PUT METHOD
    axios({
      method: "put",

      headers: {
        EMPLOYEE_LEAVE_ID: getLeaveId,
      },
      url: `/ords/hrm/emp_lea/crud`,
      data: {
        EMPLOYEE_LEAVE_ID: getLeaveId,
        EMPLOYE_ID: getLeaveData.employe_id,
        LEAVE_ID: data1.leave_id,
        CAUSE: data1.cause,
        DATE_FROM: data1.date_from,
        DATE_TO: data1.date_to,
        EMPLOYEE_MEMO: data1.employee_memo,
        MEMO_VALIDATOR: data1.memo_validator,
        STATUS: getLeaveData.status,
        DURATION: data1.duration,
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

        window.$("#leave_info_modal").modal("hide");
      }
    });
  };

  //

  const handleLeaveUpdate = (updateLeaveId) => {
    setGetLeaveId(updateLeaveId);
  };

  // GET LeaveType data
  useEffect(() => {
    const getUsers = () => {

      fetch(`/ords/hrm/lea_typ/crud`)
        .then((res) => {
          // You have to send it, as I have done below
          if (res.status >= 400) {
            throw new Error("Server responds with error!");
          }
          return res.json();
        })
        .then(
          (users) => {
            setLeaveType(users.items);

          },

          (err) => {
            const mute = err;
            setHasError(true);

          }
        );
    };
    getUsers();
  }, []);

  // Get Leave Data
  useEffect(() => {
    const getUsers = () => {

      fetch(`/ords/hrm/emp_lea/v_emp_lea/${getLeaveId}`)
        .then((res) => {
          // You have to send it, as I have done below
          if (res.status >= 400) {
            throw new Error("Server responds with error!");
          }
          return res.json();
        })
        .then(
          (users) => {
            setGetLeaveData(users);

            setLoadUpdate(false);
          },

          (err) => {
            const mute = err;
            setHasError(true);

          }
        );
    };
    if (getLeaveId) {
      getUsers();
    }
  }, [getLeaveId, loadUpdate]);

  // Get Leave Data for leave Date
  useEffect(() => {
    const getUsers = () => {

      fetch(`/ords/hrm/emp_lea/${getLeaveId}`)
        .then((res) => {
          // You have to send it, as I have done below
          if (res.status >= 400) {
            throw new Error("Server responds with error!");
          }
          return res.json();
        })
        .then(
          (users) => {
            setLeaveDate(users);

            setLoadUpdate(false);
          },

          (err) => {
            const mute = err;
            setHasError(true);

          }
        );
    };
    if (getLeaveId) {
      getUsers();
    }
  }, [getLeaveId, loadUpdate]);

  const [leaveFromDate, setLeaveFromDate] = useState("");
  const [leaveToDate, setLeaveToDate] = useState("");

  // Employee Education Put--------------------------------------------------------------
  // ---------------------------------------------------------------------------------
  const [getEducationData, setGetEducationData] = useState([]);
  const [getEducationId, setGetEducationId] = useState(null);
  const onSubmitEducation = (data1) => {
    data1.employe_id = parseInt(emp_id);
    if (data1.name_institution) {
      data1.name_institution = data1.name_institution;
    } else {
      data1.name_institution = getEducationData.name_institution;
    }
    if (data1.education_result) {
      data1.education_result = parseFloat(data1.education_result);
    } else {
      data1.education_result = getEducationData.education_result;
    }
    if (data1.principal_subject) {
      data1.principal_subject = data1.principal_subject;
    } else {
      data1.principal_subject = getEducationData.principal_subject;
    }
    if (data1.degree_diploma) {
      data1.degree_diploma = data1.degree_diploma;
    } else {
      data1.degree_diploma = getEducationData.degree_diploma;
    }
    if (data1.passigne_year) {
      data1.passigne_year = parseInt(data1.passigne_year);
    } else {
      data1.passigne_year = getEducationData.passigne_year;
    }
    if (data1.distinction) {
      data1.distinction = data1.distinction;
    } else {
      data1.distinction = getEducationData.distinction;
    }

    // PUT METHOD
    axios({
      method: "put",
      headers: {
        EMPLOYEE_EDUC_ID: getEducationId,
      },
      url: `/ords/hrm/emp_edu/crud`,
      data: {
        EMPLOYEE_EDUC_ID: getEducationId,
        EMPLOYE_ID: data1.employe_id,
        NAME_INSTITUTION: data1.name_institution,
        PRINCIPAL_SUBJECT: data1.principal_subject,
        DEGREE_DIPLOMA: data1.degree_diploma,
        PASSIGNE_YEAR: data1.passigne_year,
        EDUCATION_RESULT: data1.education_result,
        DISTINCTION: data1.distinction,
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
        reset();

        window.$("#education_info_modal").modal("hide");
      }
    });
  };
  const handleEducationUpdate = (updateEducationId) => {
    //
    setGetEducationId(updateEducationId);
  };
  //
  useEffect(() => {
    const getUsers = () => {
      fetch(`/ords/hrm/emp_edu/id/${getEducationId}`)
        .then((res) => {
          // You have to send it, as I have done below
          if (res.status >= 400) {
            throw new Error("Server responds with error!");
          }
          return res.json();
        })
        .then(
          (users) => {
            setGetEducationData(users);

            setLoadUpdate(false);
          },
          (err) => {
            const mute = err;
            setHasError(true);
          }
        );
    };
    if (getEducationId) {
      getUsers();
    }
  }, [getEducationId, loadUpdate]);

  // Training Put Section --------------------------------------------------------
  // --------------------------------------------------------------------------------

  const [getTrainingId, setGetTrainingId] = useState(null);
  const [getTrainingData, setGetTrainingData] = useState({});
  const [trainingDate, setTrainingDate] = useState({});

  //
  const onSubmitTraining = (data1) => {
    //

    data1.employe_id = parseInt(data1.employe_id);

    if (data1.date_to) {
      data1.date_to = `${data1.date_to}T00:00:00Z`;
    } else {
      data1.date_to = trainingDate.date_to;
    }
    if (data1.date_from) {
      data1.date_from = `${data1.date_from}T00:00:00Z`;
    } else {
      data1.date_from = trainingDate.date_from;
    }
    if (data1.training_type) {
      data1.training_type = data1.training_type;
    } else {
      data1.training_type = getTrainingData.training_type;
    }

    if (data1.course_title) {
      data1.course_title = data1.course_title;
    } else {
      data1.course_title = getTrainingData.course_title;
    }
    if (data1.institution) {
      data1.institution = data1.institution;
    } else {
      data1.institution = getTrainingData.institution;
    }
    if (data1.location) {
      data1.location = data1.location;
    } else {
      data1.location = getTrainingData.location;
    }
    if (data1.position) {
      data1.position = data1.position;
    } else {
      data1.position = getTrainingData.position;
    }

    // PUT METHOD

    axios({
      method: "put",

      headers: {
        EMPLOYEE_TRAINING_ID: getTrainingId,
      },
      url: `/ords/hrm/emp_tra/crud`,
      data: {
        EMPLOYEE_TRAINING_ID: getTrainingId,
        EMPLOYE_ID: getTrainingData.employe_id,
        TRAINING_TYPE: data1.training_type,
        COURSE_TITLE: data1.course_title,
        INSTITUTION: data1.institution,
        LOCATION: data1.location,
        DATE_FROM: data1.date_from,
        DATE_TO: data1.date_to,
        // DURATION:,
        POSITION: data1.position,
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

        window.$("#training_info_modal").modal("hide");
      }
    });
  };

  const handleTrainingUpdate = (updateTrainingId) => {
    //
    setGetTrainingId(updateTrainingId);
  };

  // Get Training Data
  useEffect(() => {
    const getUsers = () => {

      fetch(
        `/ords/hrm/emp_tra/v_emp_tra/${getTrainingId}`
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
            setGetTrainingData(users);

            setLoadUpdate(false);
          },

          (err) => {
            const mute = err;
            setHasError(true);

          }
        );
    };
    if (getTrainingId) {
      getUsers();
    }
  }, [getTrainingId, loadUpdate]);

  // Get Training Data for Training Date
  useEffect(() => {
    const getUsers = () => {

      fetch(`/ords/hrm/emp_tra/id/${getTrainingId}`)
        .then((res) => {
          // You have to send it, as I have done below
          if (res.status >= 400) {
            throw new Error("Server responds with error!");
          }
          return res.json();
        })
        .then(
          (users) => {
            setTrainingDate(users.items[0]);

            setLoadUpdate(false);
          },

          (err) => {
            const mute = err;
            setHasError(true);

          }
        );
    };
    if (getTrainingId) {
      getUsers();
    }
  }, [getTrainingId, loadUpdate]);

  const [trainingToD, setTrainingToD] = useState("");
  const [trainingFromD, setTrainingFromD] = useState("");

  // Promotion Put Section ---------------------------------------------------
  // ---------------------------------------------------------------------------

  const [gradeId, setGradeId] = useState(null);
  const [gradeData, setGradeData] = useState({});
  const [designationId, setDesignationId] = useState(null);
  const [getPromotionId, setGetPromotionId] = useState(null);
  const [designationData, setDesignationData] = useState([]);
  const [designationCategory, setDesignationCategory] = useState();
  const [getPromotionData, setGetPromotionData] = useState([]);
  const onSubmitPromotion = (data1) => {
    //
    data1.designation_id = designationCategory;

    if (data1.date_to) {
      data1.date_to = `${data1.date_to}T00:00:00Z`;
    } else {
      data1.date_to = promotionDateData.date_to;
    }

    if (data1.date_from) {
      data1.date_from = `${data1.date_from}T00:00:00Z`;
    } else {
      data1.date_from = promotionDateData.date_from;
    }

    if (data1.promotion_date) {
      data1.promotion_date = `${data1.promotion_date}T00:00:00Z`;
    } else {
      data1.promotion_date = promotionDateData.promotion_date;
    }

    if (data1.designation_id) {
      data1.designation_id = data1.designation_id;
    } else {
      data1.designation_id = getPromotionData.designation_id;
    }

    if (data1.type_promotion) {
      data1.type_promotion = data1.type_promotion;
    } else {
      data1.type_promotion = getPromotionData.type_promotion;
    }

    if (data1.organization) {
      data1.organization = data1.organization;
    } else {
      data1.organization = getPromotionData.organization;
    }
    if (data1.type_posting) {
      data1.type_posting = data1.type_posting;
    } else {
      data1.type_posting = getPromotionData.type_posting;
    }
    if (data1.location) {
      data1.location = data1.location;
    } else {
      data1.location = getPromotionData.location;
    }
    if (data1.position) {
      data1.position = data1.position;
    } else {
      data1.position = getPromotionData.position;
    }

    // PUT METHOD
    axios({
      method: "put",

      headers: {
        EMPLOYE_PROMOTION_ID: getPromotionId,
      },
      url: `/ords/hrm/emp_pro/crud`,
      data: {
        EMPLOYE_PROMOTION_ID: getPromotionId,
        EMPLOYE_ID: getPromotionData.employe_id,
        DESIGNATION_ID: data1.designation_id,
        TYPE_PROMOTION: data1.type_promotion,
        ORGANIZATION: data1.organization,
        LOCATION: data1.location,
        DATE_FROM: data1.date_from,
        DATE_TO: data1.date_to,
        PROMOTION_DATE: data1.promotion_date,
        TYPE_POSTING: data1.type_posting,
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

        window.$("#promotion_info_modal").modal("hide");
      }
    });
  };

  const handlePromotionUpdate = (updatePromotionId) => {
    //
    setGetPromotionId(updatePromotionId);
  };

  // Get Promotion Data

  useEffect(() => {
    const getUsers = () => {

      fetch(
        `/ords/hrm/emp_pro/v_emp_pro/${getPromotionId}`
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
            setGetPromotionData(users);

            setLoadUpdate(false);
          },

          (err) => {
            const mute = err;
            setHasError(true);

          }
        );
    };
    if (getPromotionId) {
      getUsers();
    }
  }, [getPromotionId, loadUpdate]);

  const [promotionDateData, setPromotionDateData] = useState([]);

  // GET PROMOTION DATA FOR DATE UPDATE
  useEffect(() => {
    const getUsers = () => {

      fetch(`/ords/hrm/emp_pro/${getPromotionId}`)
        .then((res) => {
          // You have to send it, as I have done below
          if (res.status >= 400) {
            throw new Error("Server responds with error!");
          }
          return res.json();
        })
        .then(
          (users) => {
            setPromotionDateData(users);

            setLoadUpdate(false);
          },

          (err) => {
            const mute = err;
            setHasError(true);

          }
        );
    };
    if (getPromotionId) {
      getUsers();
    }
  }, [getPromotionId, loadUpdate]);

  // get Designation Data

  useEffect(() => {
    const getUsers = () => {
      fetch("/ords/hrm/des/crud")
        .then((res) => {
          if (res.status >= 400) {
            throw new Error("Server responds with error!");
          }
          return res.json();
        })
        .then(
          (data) => {
            setDesignationData(data.items);
          },
          (err) => {
            const mute = err;
            setHasError(true);

          }
        );
    };
    getUsers();
  }, []);

  const handleDesignationSelectCategory = (selectedOption) => {
    setDesignationCategory(selectedOption.value);
    setDesignationId(selectedOption.value);
  };

  // SET GRADE ID
  useEffect(() => {
    const getUsers = () => {
      fetch(`/ords/hrm/des/${designationId}`)
        .then((res) => {
          if (res.status >= 400) {
            throw new Error("Server responds with error!");
          }
          return res.json();
        })
        .then(
          (data) => {
            setGradeId(data.grade_id);

          },
          (err) => {
            const mute = err;
            setHasError(true);

          }
        );
    };
    if (designationId) {
      getUsers();
    }
  }, [designationId]);

  // GET GRADE DATA
  useEffect(() => {
    const getUsers = () => {
      fetch(`/ords/hrm/gra/${gradeId}`)
        .then((res) => {
          if (res.status >= 400) {
            throw new Error("Server responds with error!");
          }
          return res.json();
        })
        .then(
          (data) => {
            setGradeData(data);

          },
          (err) => {
            const mute = err;
            setHasError(true);

          }
        );
    };
    if (gradeId) {
      getUsers();
    }
  }, [gradeId]);

  // PROMOTION SELECT OPTION
  let categoryOptionsPromotion = designationData.map((data) => {
    let optionsItem = {};
    optionsItem.value = data.designation_id;
    optionsItem.label = data.designation;
    return optionsItem;
  });

  const [promotionFromDate, setPromotionFromDate] = useState("");
  const [promotionToDate, setPromotionToDate] = useState("");
  const [promotionDate, setPromotionDate] = useState("");

  // Post Put Section ---------------------------------------------------
  // ---------------------------------------------------------------------------

  const [getPostId, setGetPostId] = useState(null);
  const [getPostData, setGetPostData] = useState([]);
  const handlePostUpdate = (updatePostId) => {

    setGetPostId(updatePostId);
  };
  // Get Post Data

  useEffect(() => {
    const getUsers = () => {

      fetch(
        `/ords/hrm/employee_posting/posting_single/${getPostId}`
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
            setGetPostData(users);

          },

          (err) => {
            const mute = err;
            setHasError(true);

          }
        );
    };
    if (getPostId) {
      getUsers();
    }
  }, [getPostId]);

  //

  const onSubmitPostUpdate = (data) => {
    data.EMPLOYEE_ID = parseInt(emp_id);
    if (data.POS_FROM_DATE) {
      data.POS_FROM_DATE = `${data.POS_FROM_DATE}T00:00:00Z`;
    } else {
      data.POS_FROM_DATE = getPostData.pos_from_date;
    }
    if (data.POS_TO_DATE) {
      data.POS_TO_DATE = `${data.POS_TO_DATE}T00:00:00Z`;
    } else {
      data.POS_TO_DATE = getPostData.pos_to_date;
    }
    if (data.PLACE_FROM) {
      data.PLACE_FROM = data.PLACE_FROM;
    } else {
      data.PLACE_FROM = getPostData.place_from;
    }
    if (data.PLACE_TO) {
      data.PLACE_TO = data.PLACE_TO;
    } else {
      data.PLACE_TO = getPostData.place_to;
    }
    if (data.INSTITUTE_NAME) {
      data.INSTITUTE_NAME = data.INSTITUTE_NAME;
    } else {
      data.INSTITUTE_NAME = getPostData.institute_name;
    }

    if (data.GRADE) {
      data.GRADE = data.GRADE;
    } else {
      data.GRADE = getPostData.grade;
    }

    if (data.DESIGNATION) {
      data.DESIGNATION = data.DESIGNATION;
    } else {
      data.DESIGNATION = getPostData.designation;
    }
    if (data.POST) {
      data.POST = data.POST;
    } else {
      data.POST = getPostData.post;
    }
    if (data.DETAILS) {
      data.DETAILS = data.DETAILS;
    } else {
      data.DETAILS = getPostData.details;
    }

    //

    // PUT METHOD
    axios({
      method: "put",

      headers: {
        POSTING_ID: getPostId,
      },
      url: `/ords/hrm/employee_posting/crud`,
      data,
    }).then((res) => {
      if (!res.data) {
        setLoadUpdate(true);
        swal({
          title: "Good!",
          text: "Successfully Updated",
          icon: "success",
          button: "Ok",
        });

        window.$("#post_info_modal").modal("hide");
      }
    });
  };

  // Health Put Section ---------------------------------------------------
  // ---------------------------------------------------------------------------

  const [healthInfo, setHealthInfo] = useState([]);
  const [getHealthId, setGetHealthId] = useState(null);
  const [getHealthData, setGetHealthData] = useState([]);
  const [healthDate, setHealthDate] = useState([]);
  const onSubmitHealth = (data1) => {


    data1.height = data1.height;
    data1.weight = data1.weight;
    data1.visual_power = data1.visual_power;
    data1.blood_pressure = data1.blood_pressure;

    if (data1.date_to) {
      data1.date_to = `${data1.date_to}T00:00:00Z`;
    } else {
      data1.date_to = healthDate.date_to;
    }

    if (data1.date_from) {
      data1.date_from = `${data1.date_from}T00:00:00Z`;
    } else {
      data1.date_from = healthDate.date_from;
    }

    if (data1.health_info_id) {
      data1.health_info_id = data1.health_info_id;
    } else {
      data1.health_info_id = getHealthData.health_info_id;
    }
    if (data1.height) {
      data1.height = data1.height;
    } else {
      data1.height = getHealthData.height;
    }
    if (data1.weight) {
      data1.weight = data1.weight;
    } else {
      data1.weight = getHealthData.weight;
    }
    if (data1.visual_power) {
      data1.visual_power = data1.visual_power;
    } else {
      data1.visual_power = getHealthData.visual_power;
    }
    if (data1.blood_pressure) {
      data1.blood_pressure = data1.blood_pressure;
    } else {
      data1.blood_pressure = getHealthData.blood_pressure;
    }
    if (data1.medical_classification) {
      data1.medical_classification = data1.medical_classification;
    } else {
      data1.medical_classification = getHealthData.medical_classification;
    }
    if (data1.health_weakness) {
      data1.health_weakness = data1.health_weakness;
    } else {
      data1.health_weakness = getHealthData.health_weakness;
    }
    //
    // PUT METHOD
    axios({
      method: "put",

      headers: {
        EMPLOYEE_LEAVE_ID: getHealthId,
      },
      url: `/ords/hrm/emp_hea/crud`,
      data: {
        EMPLOYEE_HEALTH_ID: getHealthId,
        EMPLOYE_ID: getHealthData.employe_id,
        HEALTH_INFO_ID: data1.health_info_id,
        HEIGHT: data1.height,
        WEIGHT: data1.weight,
        VISUAL_POWER: data1.visual_power,
        DATE_FROM: data1.date_from,
        DATE_TO: data1.date_to,
        BLOOD_PRESSURE: data1.blood_pressure,
        MEDICAL_CLASSIFICATION: data1.medical_classification,
        HEALTH_WEAKNESS: data1.health_weakness,
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

        window.$("#health_info_modal").modal("hide");
      }
    });
  };

  const handleHealthUpdate = (updateHealthId) => {
    //
    setGetHealthId(updateHealthId);
  };

  // GET HEALTH DATA
  useEffect(() => {
    const getUsers = () => {

      fetch(`/ords/hrm/emp_hea/v_hea_inf/${getHealthId}`)
        .then((res) => {
          // You have to send it, as I have done below
          if (res.status >= 400) {
            throw new Error("Server responds with error!");
          }
          return res.json();
        })
        .then(
          (users) => {
            setGetHealthData(users);

            setLoadUpdate(false);
          },

          (err) => {
            const mute = err;
            setHasError(true);

          }
        );
    };
    if (getHealthId) {
      getUsers();
    }
  }, [getHealthId, loadUpdate]);

  // GET HEALTH DATA FOR DATE UPDATE
  useEffect(() => {
    const getUsers = () => {

      fetch(`/ords/hrm/emp_hea/id/${getHealthId}`)
        .then((res) => {
          // You have to send it, as I have done below
          if (res.status >= 400) {
            throw new Error("Server responds with error!");
          }
          return res.json();
        })
        .then(
          (users) => {
            setHealthDate(users.items[0]);

            setLoadUpdate(false);
          },

          (err) => {
            const mute = err;
            setHasError(true);

          }
        );
    };
    if (getHealthId) {
      getUsers();
    }
  }, [getHealthId, loadUpdate]);

  //

  // GET HEALTH INFO TABLE DATA
  useEffect(() => {
    const getUsers = () => {

      fetch(`/ords/hrm/hea_inf/crud`)
        .then((res) => {
          // You have to send it, as I have done below
          if (res.status >= 400) {
            throw new Error("Server responds with error!");
          }
          return res.json();
        })
        .then(
          (users) => {
            setHealthInfo(users.items);

          },

          (err) => {
            const mute = err;
            setHasError(true);

          }
        );
    };
    getUsers();
  }, []);

  const [healthStartDate, setHealthStartDate] = useState("");
  const [healthEndDate, setHealthEndDate] = useState("");

  // Discipline Put Section ---------------------------------------------------
  // ---------------------------------------------------------------------------

  const [click, setClick] = useState(false);

  const [punishmentType, setPunishmentType] = useState([]);
  const [getDisciplineData, setGetDisciplineData] = useState([]);
  const [disciplineDate, setDisciplineDate] = useState([]);
  const [getDisciplineId, setGetDisciplineId] = useState(null);

  const handleClick = (e) => {
    setClick(e.target.checked);
  };
  const onSubmitDiscipline = (data1) => {
    //

    data1.punishment_id = parseInt(data1.punishment_id);

    if (data1.release_memo_date) {
      data1.release_memo_date = `${data1.release_memo_date}T00:00:00Z`;
    } else {
      data1.release_memo_date = disciplineDate.release_memo_date;
    }

    if (data1.punishement_memo_date) {
      data1.punishement_memo_date = `${data1.punishement_memo_date}T00:00:00Z`;
    } else {
      data1.punishement_memo_date = disciplineDate.punishement_memo_date;
    }

    if (data1.name_punishement) {
      data1.name_punishement = data1.name_punishement;
    } else {
      data1.name_punishement = getDisciplineData.name_punishement;
    }
    if (data1.offence_description) {
      data1.offence_description = data1.offence_description;
    } else {
      data1.offence_description = getDisciplineData.offence_description;
    }
    if (data1.punishement_memo_n) {
      data1.punishement_memo_n = data1.punishement_memo_n;
    } else {
      data1.punishement_memo_n = getDisciplineData.punishement_memo_n;
    }
    if (data1.release_memo_n) {
      data1.release_memo_n = data1.release_memo_n;
    } else {
      data1.release_memo_n = getDisciplineData.release_memo_n;
    }

    if (data1.appeal) {
      data1.appeal = data1.appeal;
    } else {
      data1.appeal = getDisciplineData.appeal;
    }

    // PUT METHOD

    axios({
      method: "put",

      headers: {
        EMPLOYEE_LEAVE_ID: getDisciplineId,
      },
      url: `/ords/hrm/emp_dis/crud`,
      data: {
        EMPLOYEE_DISCIPLINE_ID: getDisciplineId,
        PUNISHMENT_ID: data1.punishment_id,
        EMPLOYE_ID: getDisciplineData.employe_id,
        NAME_PUNISHEMENT: data1.name_punishement,
        OFFENCE_DESCRIPTION: data1.offence_description,
        PUNISHEMENT_MEMO_N: data1.punishement_memo_n,
        PUNISHEMENT_MEMO_DATE: data1.punishement_memo_date,
        APPEAL: data1.appeal,
        RELEASE_MEMO_N: data1.release_memo_n,
        RELEASE_MEMO_DATE: data1.release_memo_date,
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

        window.$("#Discipline_info_modal").modal("hide");
      }
    });
  };

  const handleDisciplineUpdate = (updateDisciplineId) => {
    //
    setGetDisciplineId(updateDisciplineId);
  };

  // GET DISCIPLINE DATA
  useEffect(() => {
    const getUsers = () => {

      fetch(
        `/ords/hrm/emp_dis/v_emp_dis/${getDisciplineId}`
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
            setGetDisciplineData(users);

            setLoadUpdate(false);
          },

          (err) => {
            const mute = err;
            setHasError(true);

          }
        );
    };
    if (getDisciplineId) {
      getUsers();
    }
  }, [getDisciplineId, loadUpdate]);

  // GET DISCIPLINE DATA FOR DATE UPDATE
  useEffect(() => {
    const getUsers = () => {

      fetch(`/ords/hrm/emp_dis/${getDisciplineId}`)
        .then((res) => {
          // You have to send it, as I have done below
          if (res.status >= 400) {
            throw new Error("Server responds with error!");
          }
          return res.json();
        })
        .then(
          (users) => {
            setDisciplineDate(users.items[0]);

            setLoadUpdate(false);
          },

          (err) => {
            const mute = err;
            setHasError(true);

          }
        );
    };
    if (getDisciplineId) {
      getUsers();
    }
  }, [getDisciplineId, loadUpdate]);

  //

  // GET PUNISHMENT_TYPE DATA
  useEffect(() => {
    const getUsers = () => {

      fetch(`/ords/hrm/pun_typ/crud`)
        .then((res) => {
          // You have to send it, as I have done below
          if (res.status >= 400) {
            throw new Error("Server responds with error!");
          }
          return res.json();
        })
        .then(
          (users) => {
            setPunishmentType(users.items);

          },

          (err) => {
            const mute = err;
            setHasError(true);

          }
        );
    };
    getUsers();
  }, []);


  // Not Edit Here



  // GET EMPLOYEE LEAVE DATA USING EMPLOYEE ID
  useEffect(() => {
    const getUsers = () => {
      fetch(`/ords/hrm/emp_lea/v_emp_lea/e/${emp_id}`)
        .then((res) => {
          // You have to send it, as I have done below
          if (res.status >= 400) {
            throw new Error("Server responds with error!");
          }
          return res.json();
        })
        .then(
          (users) => {
            setEmployeeLeave(users.items);
            setLoadUpdate(false);
          },

          (err) => {
            const mute = err;
            setHasError(true);
          }
        );
    };
    if (emp_id) {
      getUsers();
    }
  }, [loadUpdate, emp_id]);

  // GET EMPLOYEE LOAN DATA USING EMPLOYEE ID
  useEffect(() => {
    const getUsers = () => {
      fetch(`/ords/hrm/emp_loa/v_emp_loa/e/${emp_id}`)
        .then((res) => {
          // You have to send it, as I have done below
          if (res.status >= 400) {
            throw new Error("Server responds with error!");
          }
          return res.json();
        })
        .then(
          (users) => {
            setEmployeeLoan(users.items);
            setLoadUpdate(false);
          },

          (err) => {
            const mute = err;
            setHasError(true);
          }
        );
    };
    if (emp_id) {
      getUsers();
    }
  }, [loadUpdate, emp_id]);

  // GET EMPLOYEE HEALTH DATA USING EMPLOYEE ID
  useEffect(() => {
    const getUsers = () => {
      fetch(`/ords/hrm/emp_hea/v_hea_inf/e/${emp_id}`)
        .then((res) => {
          // You have to send it, as I have done below
          if (res.status >= 400) {
            throw new Error("Server responds with error!");
          }
          return res.json();
        })
        .then(
          (users) => {
            setEmployeeHealth(users.items);
            setLoadUpdate(false);
          },

          (err) => {
            const mute = err;
            setHasError(true);
          }
        );
    };
    if (emp_id) {
      getUsers();
    }
  }, [loadUpdate, emp_id]);

  // GET EMPLOYEE DISCIPLINE DATA USING EMPLOYEE ID
  useEffect(() => {
    const getUsers = () => {
      fetch(`/ords/hrm/emp_dis/v_emp_dis/e/${emp_id}`)
        .then((res) => {
          // You have to send it, as I have done below
          if (res.status >= 400) {
            throw new Error("Server responds with error!");
          }
          return res.json();
        })
        .then(
          (users) => {
            setEmployeeDiscipline(users.items);
            setLoadUpdate(false);
          },

          (err) => {
            const mute = err;
            setHasError(true);
          }
        );
    };
    if (emp_id) {
      getUsers();
    }
  }, [loadUpdate, emp_id]);

  // GET EMPLOYEE PROMOTION DATA USING EMPLOYEE ID
  useEffect(() => {
    const getUsers = () => {
      fetch(`/ords/hrm/emp_pro/v_emp_pro/e/${emp_id}`)
        .then((res) => {
          // You have to send it, as I have done below
          if (res.status >= 400) {
            throw new Error("Server responds with error!");
          }
          return res.json();
        })
        .then(
          (users) => {
            setEmployeePromotion(users.items);
            setLoadUpdate(false);
          },

          (err) => {
            const mute = err;
            setHasError(true);
          }
        );
    };
    if (emp_id) {
      getUsers();
    }
  }, [loadUpdate, emp_id]);

  // GET EMPLOYEE POST DATA USING EMPLOYEE ID
  useEffect(() => {
    const getUsers = () => {
      fetch(
        `/ords/hrm/employee_posting/v_emp_posting/${emp_id}`
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
            setEmployeePost(users.items);
            setLoadUpdate(false);
          },

          (err) => {
            const mute = err;
            setHasError(true);
          }
        );
    };
    if (emp_id) {
      getUsers();
    }
  }, [loadUpdate, emp_id]);

  // GET EMPLOYEE TRAINING DATA USING EMPLOYEE ID
  useEffect(() => {
    const getUsers = () => {
      fetch(`/ords/hrm/emp_tra/v_emp_tra/e/${emp_id}`)
        .then((res) => {
          // You have to send it, as I have done below
          if (res.status >= 400) {
            throw new Error("Server responds with error!");
          }
          return res.json();
        })
        .then(
          (users) => {
            setEmployeeTraining(users.items);
            setLoadUpdate(false);
          },

          (err) => {
            const mute = err;
            setHasError(true);
          }
        );
    };
    if (emp_id) {
      getUsers();
    }
  }, [loadUpdate, emp_id]);

  // GET EMPLOYEE EDUCATION DATA USING EMPLOYEE ID
  useEffect(() => {
    const getUsers = () => {
      fetch(`/ords/hrm/emp_edu/${emp_id}`)
        .then((res) => {
          // You have to send it, as I have done below
          if (res.status >= 400) {
            throw new Error("Server responds with error!");
          }
          return res.json();
        })
        .then(
          (users) => {
            setEmployeeEducation(users.items);
            setLoadUpdate(false);
          },

          (err) => {
            const mute = err;
            setHasError(true);
          }
        );
    };
    if (emp_id) {
      getUsers();
    }
  }, [loadUpdate, emp_id]);

  // GET EMPLOYEE CHILDREN DATA USING EMPLOYEE ID
  useEffect(() => {
    const getUsers = () => {
      fetch(`/ords/hrm/emp_chi/e/${emp_id}`)
        .then((res) => {
          // You have to send it, as I have done below
          if (res.status >= 400) {
            throw new Error("Server responds with error!");
          }
          return res.json();
        })
        .then(
          (users) => {
            setEmployeeChildren(users.items);
            setLoadUpdate(false);
          },

          (err) => {
            const mute = err;
            setHasError(true);
          }
        );
    };
    if (emp_id) {
      getUsers();
    }
  }, [loadUpdate, emp_id]);

  // // Employee Children Delete  Handler
  const deleteButtonChildrenHandler = (childId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const url = `/ords/hrm/emp_chi/crud`;
        fetch(url, {
          method: "DELETE",
          headers: {
            EMPLOYEE_CHILD_ID: childId,
          },
        }).then((item) => {
          const remainingUsers = employeeChildren.filter(
            (user) => user.employee_child_id !== childId
          );
          setEmployeeChildren(remainingUsers);

          setLoadUpdate(true);
        });
        swal("Poof! Your imaginary file has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  };

  // GET EMPLOYEE DOCUMENT DATA USING EMPLOYEE ID
  useEffect(() => {
    const getUsers = () => {
      fetch(`/ords/hrm/emp_doc/v_emp_doc/e/${emp_id}`)
        .then((res) => {
          // You have to send it, as I have done below
          if (res.status >= 400) {
            throw new Error("Server responds with error!");
          }
          return res.json();
        })
        .then(
          (users) => {
            setEmployeeDoc(users.items);
          },

          (err) => {
            const mute = err;
            setHasError(true);
          }
        );
    };
    if (emp_id) {
      getUsers();
    }
  }, [loadUpdate, emp_id]);

  // GET DOCUMENT TYPE DATA

  useEffect(() => {
    const getUsers = () => {
      fetch("/ords/hrm/doc_typ/crud")
        .then((res) => {
          if (res.status >= 400) {
            throw new Error("Server responds with error!");
          }
          return res.json();
        })
        .then(
          (data) => {
            setDocTypeData(data.items);

          },
          (err) => {
            const mute = err;
            setHasError(true);

          }
        );
    };
    getUsers();
  }, []);

  // Employee Document Delete  Handler
  const deleteButtonDocHandler = (docId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const url = `/ords/hrm/emp_doc/crud`;
        fetch(url, {
          method: "DELETE",
          headers: {
            EMPLOYEE_DOC_ID: docId,
          },
        }).then((item) => {
          const remainingUsers = employeeDoc.filter(
            (user) => user.employee_doc_id !== docId
          );
          setEmployeeDoc(remainingUsers);
          setLoadUpdate(true);
        });
        swal("Poof! Your imaginary file has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  };

  // Employee Discipline Delete  Handler

  const deleteButtonDisciplineHandler = (disciplineId) => {
    //
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const url = `/ords/hrm/emp_dis/crud`;
        fetch(url, {
          method: "DELETE",
          headers: {
            EMPLOYEE_DISCIPLINE_ID: disciplineId,
          },
        }).then((item) => {
          const remainingUsers = employeeDiscipline.filter(
            (user) => user.employee_discipline_id !== disciplineId
          );
          setEmployeeDiscipline(remainingUsers);
          setLoadUpdate(true);
        });
        swal("Poof! Your imaginary file has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  };

  // Employee Health Delete  Handler

  const deleteButtonHealthHandler = (healthId) => {
    //
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const url = `/ords/hrm/emp_hea/crud`;
        fetch(url, {
          method: "DELETE",
          headers: {
            EMPLOYEE_HEALTH_ID: healthId,
          },
        }).then((item) => {
          const remainingUsers = employeeHealth.filter(
            (user) => user.employee_health_id !== healthId
          );
          setEmployeeHealth(remainingUsers);
          setLoadUpdate(true);
        });
        swal("Poof! Your imaginary file has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  };

  // Employee Training Delete  Handler
  const deleteButtonTrainingHandler = (trainingId) => {
    //
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const url = `/ords/hrm/emp_tra/crud`;
        fetch(url, {
          method: "DELETE",
          headers: {
            EMPLOYEE_TRAINING_ID: trainingId,
          },
        }).then((item) => {
          const remainingUsers = employeeTraining.filter(
            (user) => user.employee_training_id !== trainingId
          );
          setEmployeeTraining(remainingUsers);
          setLoadUpdate(true);
        });
        swal("Poof! Your imaginary file has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  };

  // Employee Leave Delete  Handler

  const deleteButtonLeaveHandler = (leaveId) => {
    //
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const url = `/ords/hrm/emp_lea/crud`;
        fetch(url, {
          method: "DELETE",
          headers: {
            EMPLOYEE_LEAVE_ID: leaveId,
          },
        }).then((item) => {
          const remainingUsers = employeeLeave.filter(
            (user) => user.employee_leave_id !== leaveId
          );
          setEmployeeLeave(remainingUsers);
          setLoadUpdate(true);
        });
        swal("Poof! Your imaginary file has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  };

  // Employee Loan Delete  Handler
  const deleteButtonLoanHandler = (loanId) => {
    //
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const url = `/ords/hrm/emp_loa/crud`;
        fetch(url, {
          method: "DELETE",
          headers: {
            EMPLOYE_LOAN_ID: loanId,
          },
        }).then((item) => {
          const remainingUsers = employeeLoan.filter(
            (user) => user.employee_loan_id !== loanId
          );
          setEmployeeLoan(remainingUsers);
          setLoadUpdate(true);
        });

        swal("Poof! Your imaginary file has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  };

  // Employee Promotion Delete  Handler
  const deleteButtonPromotionHandler = (promotionId) => {
    //
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const url = `/ords/hrm/emp_pro/crud`;
        fetch(url, {
          method: "DELETE",
          headers: {
            EMPLOYE_PROMOTION_ID: promotionId,
          },
        }).then((item) => {
          const remainingUsers = employeePromotion.filter(
            (user) => user.employee_promotion_id !== promotionId
          );
          setEmployeePromotion(remainingUsers);
          setLoadUpdate(true);
        });

        swal("Poof! Your imaginary file has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  };
  // Employee Post Delete  Handler
  const deleteButtonPostHandler = (postId) => {
    //
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const url = `/ords/hrm/employee_posting/crud`;
        fetch(url, {
          method: "DELETE",
          headers: {
            POSTING_ID: postId,
          },
        }).then((item) => {
          const remainingUsers = employeePost.filter(
            (user) => user.posting_id !== postId
          );
          setEmployeePost(remainingUsers);
          setLoadUpdate(true);
        });

        swal("Poof! Your imaginary file has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  };

  // Employee Education Delete  Handler

  const deleteButtonEducationHandler = (educationId) => {
    //
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const url = `/ords/hrm/emp_edu/crud`;
        fetch(url, {
          method: "DELETE",
          headers: {
            EMPLOYEE_EDUC_ID: educationId,
          },
        }).then((item) => {
          const remainingUsers = employeeEducation.filter(
            (user) => user.employee_educ_id !== educationId
          );
          setEmployeeEducation(remainingUsers);
          setLoadUpdate(true);
        });
        swal("Poof! Your imaginary file has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  };

  //
  return (
    <div className="page-wrapper">
      {Object.keys(employeeData).length === 0 &&
        <div className="spinner-border text-info spiner-margin" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      }
      {Object.keys(employeeData).length !== 0 &&
        <div>
          <div className="text-end mt-4 me-5  ">
            <Link to={`profile/${emp_id}`}>
              <button className="bgColor rounded py-1 px-2 text-white">
                Report Download
              </button>
            </Link>{" "}
          </div>

          <div>
            <Helmet>
              <title>Employee Profile - HR</title>
              <meta name="description" content="Reactify Blank Page" />
            </Helmet>
            {/* Page Content */}
            <div className="content text-start container-fluid">
              {/* Page Header */}
              <div className="page-header">
                <div className="row">
                  <div className="col-sm-12">
                    <h3 className="page-title">Profile</h3>
                    <ul className="breadcrumb">
                      <li className="breadcrumb-item">
                        <Link to="/app/main/dashboard">Dashboard</Link>
                      </li>
                      <li className="breadcrumb-item active">Profile</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* /Page Header */}
              <div className="card mb-0">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="profile-view">
                        <div className="profile-img-wrap">
                          {employeeData.photo_path ? (
                            <div className="profile-img">
                              <img
                                className="avatar"
                                src={` http://${Api}/static${employeeData.photo_path}`}
                              />
                            </div>
                          ) : (
                            <div className="profile-img">
                              <img className="avatar" src={placeholderImg} />
                            </div>
                          )}
                        </div>

                        <div className="profile-basic">
                          <div className="row">
                            <div className="col-md-5">
                              <div className="profile-info-left">
                                <h3 className="user-name m-t-0 mb-0">
                                  {employeeData.name_english}
                                </h3>
                                <h5 className="personal-title text-start text-secondary">
                                  {employeeData.designation} ( {employeeData.departement} )
                                </h5>
                                {/* <h6 className="personal-title">
                               {employeeData.departement}
                             </h6> */}
                                <div className="smart-text">
                                  Employee ID :{" "}
                                  {employeeData.employe_registration_number}
                                  <span style={{ color: "transparent" }}>.</span>
                                </div>
                                <div className="smart-text">
                                  Cadre: {employeeData.cadre}{" "}
                                  <span style={{ color: "transparent" }}>.</span>
                                </div>
                                <div className="smart-text">
                                  Joining Date : {employeeData.joining_date}
                                  <span style={{ color: "transparent" }}>.</span>
                                </div>
                                <div className="smart-text">
                                  {" "}
                                  PRL Date : {employeeData.lrp_date}
                                  <span style={{ color: "transparent" }}>.</span>
                                </div>
                                <div className="smart-text">
                                  {" "}
                                  Date of Confirmation :{" "}
                                  {employeeData.date_confirmation}
                                  <span style={{ color: "transparent" }}>.</span>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-7">
                              <div className="smart-text">
                                Contact No : {employeeData.mobile_phone}
                                <span style={{ color: "transparent" }}>.</span>
                              </div>

                              <div className="smart-text">
                                Email Address : {employeeData.email_adress}
                                <span style={{ color: "transparent" }}>.</span>
                              </div>

                              <div className="smart-text">
                                NID Card ID : {employeeData.card_id}
                                <span style={{ color: "transparent" }}>.</span>
                              </div>

                              <div className="smart-text">
                                Official Address :{" "}
                                {employeeData.official_adress_adress}
                                <span style={{ color: "transparent" }}>.</span>
                              </div>

                              <div className="smart-text">
                                Date of Birth : {employeeData.date_birth}{" "}
                                <span style={{ color: "transparent" }}>.</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* <a
                          className="
  text-start"
                          data-toggle="modal"
                          data-target="#editProfileImage"
                        >
                          {" "}
                          <i
                            className="
 fa fa-pencil me-2"
                          ></i>{" "}
                          Edit
                        </a> */}
                        {/* <div className="pro-edit"><a data-target="#profile_info" data-toggle="modal" className="edit-icon" href="#"><i className="fa fa-pencil" /></a></div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="tab-content">
                {/* Profile Info Tab */}
                <div
                  id="emp_profile"
                  className="pro-overview tab-pane fade show active"
                >
                  <div className="row">
                    {/* ----------------------------------------------------Employee Information */}
                    <div className="col-md-6 d-flex">
                      <div className="card profile-box flex-fill">
                        <div className="card-body">
                          <h3 className="card-title">
                            Employee Information{" "}
                            <a
                              className="edit-icon"
                              data-toggle="modal"
                              data-target="#employee_info_modal"
                            >
                              <span>Edit</span>
                              <i className="fa fa-pencil ps-1" />
                            </a>
                          </h3>
                          <ul className="personal-info">
                            <li>
                              <div className="title">Employee ID.</div>
                              <div className="text">
                                {employeeData.employe_registration_number}{" "}
                                <span style={{ color: "transparent" }}>.</span>
                              </div>
                            </li>
                            <li>
                              <div className="title">NID No</div>
                              <div className="text">
                                {employeeData.card_id}{" "}
                                <span style={{ color: "transparent" }}>.</span>
                              </div>
                            </li>
                            <li>
                              <div className="title">Name (English)</div>
                              <div className="text">
                                {employeeData.name_english}{" "}
                                <span style={{ color: "transparent" }}>.</span>
                              </div>
                            </li>
                            <li>
                              <div className="title">Name (Bangla)</div>
                              <div className="text">
                                {employeeData.name_bangla}{" "}
                                <span style={{ color: "transparent" }}>.</span>
                              </div>
                            </li>
                            <li>
                              <div className="title">Father's Name (English)</div>
                              <div className="text">
                                {employeeData.fater_englih}{" "}
                                <span style={{ color: "transparent" }}>.</span>
                              </div>
                            </li>
                            <li>
                              <div className="title">Father's Name (Bangla)</div>
                              <div className="text">
                                {" "}
                                {employeeData.father_bangla}{" "}
                                <span style={{ color: "transparent" }}>.</span>
                              </div>
                            </li>
                            <li>
                              <div className="title">Mother's Name (English)</div>
                              <div className="text">
                                {employeeData.mother_english}{" "}
                                <span style={{ color: "transparent" }}>.</span>
                              </div>
                            </li>
                            <li>
                              <div className="title">Mother's Name (Bangla)</div>
                              <div className="text">
                                {employeeData.mother_bangla}{" "}
                                <span style={{ color: "transparent" }}>.</span>
                              </div>
                            </li>
                            <li>
                              <div className="title">Mobile</div>
                              <div className="text">
                                {employeeData.mobile_phone}{" "}
                                <span style={{ color: "transparent" }}>.</span>
                              </div>
                            </li>
                            <li>
                              <div className="title">Date of Birth</div>
                              <div className="text">
                                {employeeData.date_birth}{" "}
                                <span style={{ color: "transparent" }}>.</span>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* ------------------------------------------------------Job Information */}
                    <div className="col-md-6 d-flex">
                      <div className="card profile-box flex-fill">
                        <div className="card-body">
                          <h3 className="card-title">
                            Job Information{" "}
                            <a
                              className="edit-icon"
                              data-toggle="modal"
                              data-target="#job_info_modal"
                            >
                              <span>Edit</span>
                              <i className="fa fa-pencil ps-1" />
                            </a>
                          </h3>

                          <ul className="personal-info">
                            <li>
                              <div className="title">Designation</div>
                              <div className="text">
                                {employeeData.designation}{" "}
                                <span style={{ color: "transparent" }}>.</span>
                              </div>
                            </li>
                            <li>
                              <div className="title">Department</div>
                              <div className="text">
                                {employeeData.departement}{" "}
                                <span style={{ color: "transparent" }}>.</span>
                              </div>
                            </li>
                            <li>
                              <div className="title">Cadre </div>
                              <div className="text">
                                {employeeData.cadre}{" "}
                                <span style={{ color: "transparent" }}>.</span>
                              </div>
                            </li>

                            <li>
                              <div className="title">Email Address</div>
                              <div className="text">
                                {employeeData.email_adress}{" "}
                                <span style={{ color: "transparent" }}>.</span>
                              </div>
                            </li>
                            <li>
                              <div className="title">Phone</div>
                              <div className="text">
                                {employeeData.telephone_number}
                                <span style={{ color: "transparent" }}>.</span>
                              </div>
                            </li>
                            <li>
                              <div className="title">Joining Date </div>
                              <div className="text">
                                {employeeData.joining_date}{" "}
                                <span style={{ color: "transparent" }}>.</span>
                              </div>
                            </li>
                            <li>
                              <div className="title">PRL Date </div>
                              <div className="text">
                                {employeeData.lrp_date}{" "}
                                <span style={{ color: "transparent" }}>.</span>
                              </div>
                            </li>
                            <li>
                              <div className="title">Date of Confirmation </div>
                              <div className="text">
                                {employeeData.date_confirmation}{" "}
                                <span style={{ color: "transparent" }}>.</span>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    {/* ---------------------------------------------General Information */}

                    <div className="col-md-6 d-flex">
                      <div className="card profile-box flex-fill">
                        <div className="card-body">
                          <h3 className="card-title">
                            General Informations{" "}
                            <a
                              className="edit-icon"
                              data-toggle="modal"
                              data-target="#general_info_modal"
                            >
                              <span>Edit</span>
                              <i className="fa fa-pencil ps-1" />
                            </a>
                          </h3>
                          <ul className="personal-info">
                            <li>
                              <div className="title">Employee Blood</div>
                              <div className="text">
                                {employeeData.blood_group}{" "}
                                <span style={{ color: "transparent" }}>.</span>
                              </div>
                            </li>
                            <li>
                              <div className="title">Religion</div>
                              <div className="text">
                                {employeeData.religion}{" "}
                                <span style={{ color: "transparent" }}>.</span>
                              </div>
                            </li>
                            <li>
                              <div className="title">Gender</div>
                              <div className="text">
                                {employeeData.gender}{" "}
                                <span style={{ color: "transparent" }}>.</span>
                              </div>
                            </li>
                            <li>
                              <div className="title">Quota</div>
                              <div className="text">
                                {employeeData.freedom_fighter === "Yes"
                                  ? "Freedom Fighter,"
                                  : ""}{" "}
                                {employeeData.grandchild_ff === "Yes"
                                  ? "Grand Child_FF,"
                                  : ""}{" "}
                                {employeeData.tribal === "Yes" ? "Tribal" : ""}{" "}
                                <span style={{ color: "transparent" }}>.</span>
                              </div>
                            </li>
                            <li>
                              <div className="title">Nationality</div>
                              <div className="text">
                                {employeeData.nationality}{" "}
                                <span style={{ color: "transparent" }}>.</span>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* -------------------------------------Emergency Contact */}
                    <div className="col-md-6 d-flex">
                      <div className="card profile-box flex-fill">
                        <div className="card-body">
                          <h3 className="card-title">
                            Emergency Contact
                            <a
                              className="edit-icon"
                              data-toggle="modal"
                              data-target="#emergency_contact_modal"
                            >
                              <span>Edit</span>
                              <i className="fa fa-pencil ps-1" />
                            </a>
                          </h3>

                          <ul className="personal-info">
                            <li>
                              <div className="title">Name</div>
                              <div className="text">
                                {employeeData.emergency_contact}
                                <span style={{ color: "transparent" }}>.</span>
                              </div>
                            </li>
                            <li>
                              <div className="title">Relation</div>
                              <div className="text">
                                {employeeData.emergency_relation}
                                <span style={{ color: "transparent" }}>.</span>
                              </div>
                            </li>
                            <li>
                              <div className="title">Phone Number </div>
                              <div className="text">
                                {employeeData.emergency_phone}
                                <span style={{ color: "transparent" }}>.</span>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Address Informations */}

                  <div className="row ">
                    {/* --------------------------------------------Present Address */}

                    <div className="col-md-4 d-flex">
                      <div className="card profile-box flex-fill">
                        <div className="card-body">
                          <h3 className="card-title">
                            Present Address{" "}
                            <a
                              className="edit-icon"
                              data-toggle="modal"
                              data-target="#present_address_modal"
                            >
                              <span>Edit</span>
                              <i className="fa fa-pencil ps-1" />
                            </a>
                          </h3>
                          <ul className="personal-info">
                            <li>
                              <div className="title">Village/House No. Road</div>
                              <div className="text">
                                {employeeData.present_adress_adress}{" "}
                                <span style={{ color: "transparent" }}>.</span>
                              </div>
                            </li>
                            <li>
                              <div className="title">Post Office</div>
                              <div className="text">
                                {employeeData.present_adress_po}{" "}
                                <span style={{ color: "transparent" }}>.</span>
                              </div>
                            </li>
                            <li>
                              <div className="title">Upazila</div>
                              <div className="text">
                                {employeeData.present_adress_upazilla}{" "}
                                <span style={{ color: "transparent" }}>.</span>
                              </div>
                            </li>
                            <li>
                              <div className="title">District</div>
                              <div className="text">
                                {employeeData.pre_district_name}{" "}
                                <span style={{ color: "transparent" }}>.</span>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* -------------------------------------Permanent Address */}
                    <div className="col-md-4 d-flex">
                      <div className="card profile-box flex-fill">
                        <div className="card-body">
                          <h3 className="card-title">
                            Permanent Address
                            <a
                              className="edit-icon"
                              data-toggle="modal"
                              data-target="#permanent_address_modal"
                            >
                              <span>Edit</span>
                              <i className="fa fa-pencil ps-1" />
                            </a>
                          </h3>

                          <ul className="personal-info">
                            <li>
                              <div className="title">Village/House No. Road</div>
                              <div className="text">
                                {employeeData.permanent_adress_adress}{" "}
                                <span style={{ color: "transparent" }}>.</span>
                              </div>
                            </li>
                            <li>
                              <div className="title">Post Office</div>
                              <div className="text">
                                {employeeData.permanent_adress_po}{" "}
                                <span style={{ color: "transparent" }}>.</span>
                              </div>
                            </li>
                            <li>
                              <div className="title">Upazila</div>
                              <div className="text">
                                {employeeData.permanent_adress_upazilla}{" "}
                                <span style={{ color: "transparent" }}>.</span>
                              </div>
                            </li>
                            <li>
                              <div className="title">District</div>
                              <div className="text">
                                {employeeData.per_district_name}{" "}
                                <span style={{ color: "transparent" }}>.</span>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* ----------------------------------------Official Address */}
                    <div className="col-md-4 d-flex">
                      <div className="card profile-box flex-fill">
                        <div className="card-body">
                          <h3 className="card-title">
                            Official Address
                            <a
                              className="edit-icon"
                              data-toggle="modal"
                              data-target="#Official_address_modal"
                            >
                              <span>Edit</span>
                              <i className="fa fa-pencil ps-1" />
                            </a>
                          </h3>

                          <ul className="personal-info">
                            <li>
                              <div className="title">Village/House No. Road</div>
                              <div className="text">
                                {employeeData.official_adress_adress}
                                <span style={{ color: "transparent" }}>.</span>
                              </div>
                            </li>
                            <li>
                              <div className="title">Post Office</div>
                              <div className="text">
                                {employeeData.official_adress_po}
                                <span style={{ color: "transparent" }}>.</span>
                              </div>
                            </li>
                            <li>
                              <div className="title">Upazila</div>
                              <div className="text">
                                {employeeData.official_adress_upazilla}
                                <span style={{ color: "transparent" }}>.</span>
                              </div>
                            </li>
                            <li>
                              <div className="title">District</div>
                              <div className="text">
                                {employeeData.off_district_name}
                                <span style={{ color: "transparent" }}>.</span>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/*Spouse Information and children information  */}
                  <div className="row">
                    {/* ---------------------------------------------Spouse Information */}

                    <div className="col-md-5 d-flex">
                      <div className="card profile-box flex-fill">
                        <div className="card-body">
                          <h3 className="card-title">
                            Spouse Information{" "}
                            <a
                              className="edit-icon"
                              data-toggle="modal"
                              data-target="#spouse_info_modal"
                            >
                              <span>Edit</span>
                              <i className="fa fa-pencil ps-1" />
                            </a>
                          </h3>

                          <h2 className=" text-start spouse-img mb-3">
                            {employeeData.spouse_photo ? (
                              <div>
                                <img
                                  className="avatar"
                                  src={`http://${Api}/static${employeeData.spouse_photo}`}
                                />
                              </div>
                            ) : (
                              <div>
                                <img className="profile-img" src={placeholderImg} />
                              </div>
                            )}
                          </h2>
                          <ul className="personal-info">
                            <li>
                              <div className="title">Spouse Name</div>
                              <div className="text">{employeeData.spouse_name}
                                <span style={{ color: "transparent" }}>.</span>
                              </div>

                            </li>

                            <li>
                              <div className="title">Nationality</div>
                              <div className="text">
                                {employeeData.spouse_nationality}
                                <span style={{ color: "transparent" }}>.</span>
                              </div>
                            </li>
                            <li>
                              <div className="title">National ID No</div>
                              <div className="text">
                                {employeeData.spouse_card_id}
                                <span style={{ color: "transparent" }}>.</span>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* ----------------------- Children Informations --------------------*/}

                    <div id="childrenHash" className="col-md-7 d-flex">
                      <div className="card profile-box flex-fill">
                        <div className="card-body">
                          <div className="">
                            <h3 className="card-title">
                              Children
                              <span className="col-auto float-right ml-auto">
                                <a
                                  className="add-icon"
                                  data-toggle="modal"
                                  data-target="#add_child"
                                >
                                  <i className="fa fa-plus" /> Add
                                </a>
                              </span>
                            </h3>
                          </div>
                          <div className="overflow-auto">
                            <table className="table table-nowrap">
                              <thead>
                                <tr>
                                  <th>Photo</th>
                                  <th>Name</th>
                                  <th>Gender</th>
                                  <th>Birth Date</th>
                                  <th>Institute</th>
                                  <th>Class</th>
                                  <th>Certificate</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {employeeChildren.map((item) => (
                                  <tr>
                                    <td>
                                      <h2 className="table-avatar">
                                        {item.child_photo_path ? (
                                          <div className="table-img">
                                            <img
                                              className="avatar"
                                              src={`http://${Api}/static${item.child_photo_path}`}
                                            />
                                          </div>
                                        ) : (
                                          <div>
                                            <img
                                              className="avatar"
                                              src={placeholderImg}
                                            />
                                          </div>
                                        )}
                                      </h2>
                                    </td>
                                    <td className="personal-text">
                                      {item.child_name}
                                    </td>
                                    <td className="personal-text">{item.gender}</td>
                                    <td className="personal-text">
                                      {item.date_birth}
                                    </td>
                                    <td className="personal-text">{item.school}</td>
                                    <td className="personal-text">
                                      {item.child_class}
                                    </td>
                                    <td className="personal-text">
                                      {item.certificate_path && (
                                        <div className="d-flex">
                                          <a
                                            target="_blank"
                                            className="input-group-text w-50 cursor-pointer btn-eye ms-2 fs-5"
                                            href={`http://${Api}/static${item.certificate_path}`}
                                          >
                                            <i className="fa fa-eye" />
                                          </a>
                                        </div>
                                      )}
                                    </td>
                                    <td className="text-right">
                                      <div className="dropdown dropdown-action">
                                        <a
                                          aria-expanded="false"
                                          data-toggle="dropdown"
                                          className="action-icon dropdown-toggle"
                                          href="#"
                                        >
                                          <i className="material-icons">
                                            more_vert
                                          </i>
                                        </a>
                                        <div className="dropdown-menu dropdown-menu-right">
                                          <a
                                            className="dropdown-item"
                                            data-toggle="modal"
                                            data-target="#children_info_modal"
                                            onClick={() => {
                                              handleChildrenUpdate(
                                                item.employee_child_id
                                              );
                                            }}
                                          >
                                            <i className="fa fa-pencil m-r-5" />{" "}
                                            Edit
                                          </a>
                                          <a
                                            className="dropdown-item"
                                            onClick={() => {
                                              deleteButtonChildrenHandler(
                                                item.employee_child_id
                                              );
                                            }}
                                          >
                                            <i className="fa fa-trash-o m-r-5" />{" "}
                                            Delete
                                          </a>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* -------------------------------------Documents */}
                  <div className="row">
                    <div className="col-md-12 d-flex">
                      <div className="card profile-box flex-fill">
                        <div className="card-body">
                          <h3 className="card-title">Documents </h3>
                          <div className="overflow-auto">
                            <table className="table table-nowrap">
                              <thead>
                                <tr>
                                  <th>Doc ID</th>
                                  <th>Document Type</th>
                                  <th>File Name</th>
                                  <th>Creation Date</th>
                                  <th>MEMO</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {employeeDoc.map((item) => (
                                  <tr>
                                    <td>{item.employee_doc_id}</td>
                                    <td>{item.document_type}</td>
                                    <td>{item.employee_doc}</td>
                                    <td>{item.date_creation}</td>
                                    <td>{item.memo}</td>

                                    <td className="text-right">
                                      <div className="dropdown dropdown-action">
                                        <a
                                          aria-expanded="false"
                                          data-toggle="dropdown"
                                          className="action-icon dropdown-toggle"
                                          href="#"
                                        >
                                          <i className="material-icons">
                                            more_vert
                                          </i>
                                        </a>
                                        <div className="dropdown-menu dropdown-menu-right">

                                          <a
                                            className="dropdown-item"
                                            onClick={() => {
                                              deleteButtonDocHandler(
                                                item.employee_doc_id
                                              );
                                            }}
                                          >
                                            <i className="fa fa-trash-o m-r-5" />{" "}
                                            Delete
                                          </a>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* -------------------------------------Discipline */}
                  <div className="row" id="disciplineHash">
                    <div className="col-md-12 d-flex">
                      <div className="card profile-box flex-fill">
                        <div className="card-body">
                          <h3 className="card-title">Discipline </h3>
                          {/* <a className="edit-icon" data-toggle="modal" data-target="#Discipline_info_modal"><i className="fa fa-pencil" /></a> */}
                          <div className="overflow-auto">
                            <table className="table table-nowrap">
                              <thead>
                                <tr>
                                  <th>
                                    Offence <br /> Description
                                  </th>
                                  <th>
                                    Punishment <br /> Name
                                  </th>
                                  <th>
                                    Punishment <br /> Memo Date
                                  </th>
                                  <th>
                                    Punishment <br /> Memo N
                                  </th>
                                  <th>Appeal</th>
                                  <th>
                                    Release <br /> Memo N
                                  </th>
                                  <th>
                                    Release <br /> Memo Date
                                  </th>
                                  <th>Punishment File</th>
                                  <th>Release File</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {employeeDiscipline.map((item) => (
                                  <tr>
                                    <td> {item.offence_description}</td>
                                    <td>{item.name_punishement}</td>
                                    <td>{item.punishement_memo_date}</td>
                                    <td>{item.punishement_memo_n}</td>
                                    <td>{item.appeal}</td>
                                    <td>{item.release_memo_n}</td>
                                    <td>{item.release_memo_date}</td>
                                    <td>
                                      {item.punishement_memo_path && (
                                        <div className="d-flex">
                                          <span
                                            className="input-group-text w-50 cursor-pointer btn-eye fs-5"
                                            onClick={(e) => {
                                              downloadPunishementImage(
                                                item.punishement_memo_path,
                                                item.employee_discipline_id
                                              );
                                            }}
                                          >
                                            <i className="fa fa-download"></i>
                                          </span>

                                          <a
                                            target="_blank"
                                            className="input-group-text w-50 cursor-pointer btn-eye ms-2 fs-5"
                                            href={`http://${Api}/static${item.punishement_memo_path}`}
                                          >
                                            <i className="fa fa-eye" />
                                          </a>
                                        </div>
                                      )}
                                    </td>
                                    <td>
                                      {item.release_memo_path && (
                                        <div className="d-flex">
                                          <span
                                            className="input-group-text w-50 cursor-pointer btn-eye fs-5"
                                            onClick={(e) => {
                                              downloadReleaseImage(
                                                item.release_memo_path,
                                                item.employee_discipline_id
                                              );
                                            }}
                                          >
                                            <i className="fa fa-download"></i>
                                          </span>

                                          <a
                                            target="_blank"
                                            className="input-group-text w-50 cursor-pointer btn-eye ms-2 fs-5"
                                            href={`http://${Api}/static${item.release_memo_path}`}
                                          >
                                            <i className="fa fa-eye" />
                                          </a>
                                        </div>
                                      )}
                                    </td>

                                    <td className="text-right">
                                      <div className="dropdown dropdown-action">
                                        <a
                                          aria-expanded="false"
                                          data-toggle="dropdown"
                                          className="action-icon dropdown-toggle"
                                          href="#"
                                        >
                                          <i className="material-icons">
                                            more_vert
                                          </i>
                                        </a>
                                        <div className="dropdown-menu dropdown-menu-right">
                                          <a
                                            className="dropdown-item"
                                            data-toggle="modal"
                                            data-target="#Discipline_info_modal"
                                            onClick={() => {
                                              handleDisciplineUpdate(
                                                item.employee_discipline_id
                                              );
                                            }}
                                          >
                                            <i className="fa fa-pencil m-r-5" />{" "}
                                            Edit
                                          </a>
                                          <a
                                            className="dropdown-item"
                                            onClick={() => {
                                              deleteButtonDisciplineHandler(
                                                item.employee_discipline_id
                                              );
                                            }}
                                          >
                                            <i className="fa fa-trash-o m-r-5" />{" "}
                                            Delete
                                          </a>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* -------------------------------------Health */}
                  <div className="row overflow-auto" id="healthHash">
                    <div className="col-md-12 d-flex">
                      <div className="card profile-box flex-fill">
                        <div className="card-body">
                          <h3 className="card-title">Health</h3>
                          {/* <a className="edit-icon" data-toggle="modal" data-target="#health_info_modal"><i className="fa fa-pencil" /></a> */}
                          <div className="overflow-auto">
                            <table className="table">
                              <thead>
                                <tr>
                                  <th>Health ID</th>
                                  <th>Health Info</th>
                                  <th>From Date</th>
                                  <th>To Date</th>
                                  <th>Height</th>
                                  <th>Weight</th>
                                  <th>Visual Power</th>
                                  <th>Blood Pressure</th>
                                  <th>Medical Classification</th>
                                  <th>Health Weakness</th>
                                  <th>X-ray Report</th>
                                  <th>ECG Report</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {employeeHealth.map((item) => (
                                  <tr>
                                    <td> {item.employee_health_id}</td>
                                    <td>{item.health_info}</td>
                                    <td>{item.date_from}</td>
                                    <td>{item.date_to}</td>
                                    <td>{item.height}</td>
                                    <td>{item.weight}</td>
                                    <td>{item.visual_power}</td>
                                    <td>{item.blood_pressure}</td>
                                    <td>{item.medical_classification}</td>
                                    <td>{item.health_weakness}</td>
                                    <td>
                                      {item.x_ray_report && (
                                        <div className="d-flex">
                                          <span
                                            className="input-group-text w-50 cursor-pointer btn-eye fs-5"
                                            onClick={(e) => {
                                              downloadXrayImage(
                                                item.x_ray_report,
                                                item.employee_health_id
                                              );
                                            }}
                                          >
                                            <i className="fa fa-download"></i>
                                          </span>

                                          <a
                                            target="_blank"
                                            className="input-group-text w-50 cursor-pointer btn-eye ms-2 fs-5"
                                            href={`http://${Api}/static${item.x_ray_report}`}
                                          >
                                            <i className="fa fa-eye" />
                                          </a>
                                        </div>
                                      )}
                                    </td>
                                    <td>
                                      {item.ecg_report && (
                                        <div className="d-flex">
                                          <span
                                            className="input-group-text w-50 cursor-pointer btn-eye fs-5"
                                            onClick={(e) => {
                                              downloadEcgImage(
                                                item.ecg_report,
                                                item.employee_health_id
                                              );
                                            }}
                                          >
                                            {" "}
                                            <i className="fa fa-download"></i>
                                          </span>

                                          <a
                                            target="_blank"
                                            className="input-group-text ms-2 w-50 cursor-pointer btn-eye fs-5"
                                            href={`http://${Api}/static${item.ecg_report}`}
                                            download
                                          >
                                            <i className="fa fa-eye" />
                                          </a>
                                        </div>
                                      )}
                                    </td>
                                    <td className="text-right">
                                      <div className="dropdown dropdown-action">
                                        <a
                                          aria-expanded="false"
                                          data-toggle="dropdown"
                                          className="action-icon dropdown-toggle"
                                          href="#"
                                        >
                                          <i className="material-icons">
                                            more_vert
                                          </i>
                                        </a>
                                        <div className="dropdown-menu dropdown-menu-right">
                                          <a
                                            className="dropdown-item"
                                            data-toggle="modal"
                                            data-target="#health_info_modal"
                                            onClick={() => {
                                              handleHealthUpdate(
                                                item.employee_health_id
                                              );
                                            }}
                                          >
                                            <i className="fa fa-pencil m-r-5" />{" "}
                                            Edit
                                          </a>
                                          <a
                                            className="dropdown-item"
                                            onClick={() => {
                                              deleteButtonHealthHandler(
                                                item.employee_health_id
                                              );
                                            }}
                                          >
                                            <i className="fa fa-trash-o m-r-5" />{" "}
                                            Delete
                                          </a>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* -------------------------------------Promotion */}
                  <div className="row" id="promotionHash">
                    <div className="col-md-12 d-flex">
                      <div className="card profile-box flex-fill">
                        <div className="card-body">
                          <h3 className="card-title">Promotion</h3>
                          {/* <a className="edit-icon" data-toggle="modal" data-target="#promotion_info_modal"><i className="fa fa-pencil" /></a> */}
                          <div className="overflow-auto">
                            <table className="table table-nowrap">
                              <thead>
                                <tr>
                                  <th>Type</th>
                                  <th>Designation</th>
                                  <th>Organization</th>
                                  <th>Posting Type</th>
                                  <th>Location</th>
                                  <th>Promotion/Charge Date</th>
                                  <th>Date From</th>
                                  <th>Date To</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {employeePromotion.map((item) => (
                                  <tr>
                                    <td> {item.type_promotion}</td>
                                    <td>{item.designation}</td>
                                    <td>{item.organization}</td>
                                    <td>{item.type_posting}</td>
                                    <td>{item.location}</td>
                                    <td>{item.promotion_date}</td>
                                    <td>{item.date_from}</td>
                                    <td>{item.date_to}</td>

                                    <td className="text-right">
                                      <div className="dropdown dropdown-action">
                                        <a
                                          aria-expanded="false"
                                          data-toggle="dropdown"
                                          className="action-icon dropdown-toggle"
                                          href="#"
                                        >
                                          <i className="material-icons">
                                            more_vert
                                          </i>
                                        </a>
                                        <div className="dropdown-menu dropdown-menu-right">
                                          <a
                                            className="dropdown-item"
                                            data-toggle="modal"
                                            data-target="#promotion_info_modal"
                                            onClick={() => {
                                              handlePromotionUpdate(
                                                item.employe_promotion_id
                                              );
                                            }}
                                          >
                                            <i className="fa fa-pencil m-r-5" />{" "}
                                            Edit
                                          </a>
                                          <a
                                            className="dropdown-item"
                                            onClick={() => {
                                              deleteButtonPromotionHandler(
                                                item.employe_promotion_id
                                              );
                                            }}
                                          >
                                            <i className="fa fa-trash-o m-r-5" />{" "}
                                            Delete
                                          </a>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* -------------------------------------Post */}
                  <div className="row" id="postHash">
                    <div className="col-md-12 d-flex">
                      <div className="card profile-box flex-fill">
                        <div className="card-body">
                          <h3 className="card-title">
                            Post{" "}
                            {/* <span className="col-auto float-right">
                          <a
                            className="add-icon"
                            data-toggle="modal"
                            data-target="#addPost"
                          >
                            <i className="fa fa-plus" /> Add
                          </a>
                        </span> */}
                          </h3>
                          {/* <a className="edit-icon" data-toggle="modal" data-target="#promotion_info_modal"><i className="fa fa-pencil" /></a> */}
                          <div className="overflow-auto">
                            <table className="table table-nowrap">
                              <thead>
                                <tr>
                                  <th>Designation</th>
                                  <th>Post</th>
                                  <th>Institute Name</th>
                                  <th>Grade</th>
                                  <th>From</th>
                                  <th>To</th>
                                  <th>Place From</th>
                                  <th>Place To</th>
                                  <th>Detail</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {employeePost.map((item) => (
                                  <tr>
                                    <td> {item.designation}</td>
                                    <td>{item.post}</td>
                                    <td>{item.institute_name}</td>
                                    <td>{item.grade}</td>
                                    <td>{item.pos_from_date}</td>
                                    <td>{item.pos_to_date}</td>
                                    <td>{item.place_from}</td>
                                    <td>{item.place_to}</td>
                                    <td>{item.details}</td>

                                    <td className="text-right">
                                      <div className="dropdown dropdown-action">
                                        <a
                                          aria-expanded="false"
                                          data-toggle="dropdown"
                                          className="action-icon dropdown-toggle"
                                          href="#"
                                        >
                                          <i className="material-icons">
                                            more_vert
                                          </i>
                                        </a>
                                        <div className="dropdown-menu dropdown-menu-right">
                                          <a
                                            className="dropdown-item"
                                            data-toggle="modal"
                                            data-target="#post_info_modal"
                                            onClick={() => {
                                              handlePostUpdate(item.posting_id);
                                            }}
                                          >
                                            <i className="fa fa-pencil m-r-5" />{" "}
                                            Edit
                                          </a>
                                          <a
                                            className="dropdown-item"
                                            onClick={() => {
                                              deleteButtonPostHandler(
                                                item.posting_id
                                              );
                                            }}
                                          >
                                            <i className="fa fa-trash-o m-r-5" />{" "}
                                            Delete
                                          </a>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* -------------------------------------Education */}
                  <div className="row" id="EducationHash">
                    <div className="col-md-12 d-flex">
                      <div className="card profile-box flex-fill">
                        <div className="card-body">
                          <div className="">
                            <h3 className="card-title">
                              Education{" "}
                              <span className="col-auto float-right">
                                <a
                                  className="add-icon"
                                  data-toggle="modal"
                                  data-target="#addEducation"
                                >
                                  <i className="fa fa-plus" /> Add
                                </a>
                              </span>
                            </h3>
                            {/* <h3 className="card-title mb-2">Education</h3>
                         <button className='bgColor text-white mb-2 rounded py-1' data-toggle="modal" data-target="#addEducation"><a><i className="fa fa-plus" /> Add</a></button> */}
                          </div>
                          <div className="overflow-auto">
                            <table className="table table-nowrap">
                              <thead>
                                <tr>
                                  <th>Institution Name</th>
                                  <th>Principal Subject</th>
                                  <th>Degree</th>
                                  <th>Passing Year</th>
                                  <th>Education Result</th>
                                  <th>Distinction</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {employeeEducation.map((item) => (
                                  <tr>
                                    <td>{item.name_institution}</td>
                                    <td>{item.principal_subject}</td>
                                    <td>{item.degree_diploma}</td>
                                    <td>{item.passigne_year}</td>
                                    <td>{item.education_result}</td>
                                    <td>{item.distinction}</td>

                                    <td className="text-right">
                                      <div className="dropdown dropdown-action">
                                        <a
                                          aria-expanded="false"
                                          data-toggle="dropdown"
                                          className="action-icon dropdown-toggle"
                                          href="#"
                                        >
                                          <i className="material-icons">
                                            more_vert
                                          </i>
                                        </a>
                                        <div className="dropdown-menu dropdown-menu-right">
                                          <a
                                            className="dropdown-item"
                                            data-toggle="modal"
                                            data-target="#education_info_modal"
                                            onClick={() => {
                                              handleEducationUpdate(
                                                item.employee_educ_id
                                              );
                                            }}
                                          >
                                            <i className="fa fa-pencil m-r-5" />{" "}
                                            Edit
                                          </a>
                                          <a
                                            className="dropdown-item"
                                            onClick={() => {
                                              deleteButtonEducationHandler(
                                                item.employee_educ_id
                                              );
                                            }}
                                          >
                                            <i className="fa fa-trash-o m-r-5" />{" "}
                                            Delete
                                          </a>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* -------------------------------------Training */}
                  <div className="row" id="trainingHash">
                    <div className="col-md-12 d-flex">
                      <div className="card profile-box flex-fill">
                        <div className="card-body">
                          <h3 className="card-title">Training</h3>
                          {/* <a className="edit-icon" data-toggle="modal" data-target="#training_info_modal"><i className="fa fa-pencil" /></a> */}
                          <div className="overflow-auto">
                            <table className="table table-nowrap">
                              <thead>
                                <tr>
                                  <th>Course Title</th>
                                  <th>Training Type</th>
                                  <th>From Date</th>
                                  <th>To Date</th>
                                  <th>Position</th>
                                  <th>Institution</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {employeeTraining.map((item) => (
                                  <tr>
                                    <td>{item.course_title}</td>
                                    <td>{item.training_type}</td>
                                    <td>{item.date_from}</td>
                                    <td>{item.date_to}</td>
                                    <td>{item.position}</td>
                                    <td>{item.institution}</td>

                                    <td className="text-right">
                                      <div className="dropdown dropdown-action">
                                        <a
                                          aria-expanded="false"
                                          data-toggle="dropdown"
                                          className="action-icon dropdown-toggle"
                                          href="#"
                                        >
                                          <i className="material-icons">
                                            more_vert
                                          </i>
                                        </a>
                                        <div className="dropdown-menu dropdown-menu-right">
                                          <a
                                            className="dropdown-item"
                                            data-toggle="modal"
                                            data-target="#training_info_modal"
                                            onClick={() => {
                                              handleTrainingUpdate(
                                                item.employee_training_id
                                              );
                                            }}
                                          >
                                            <i className="fa fa-pencil m-r-5" />{" "}
                                            Edit
                                          </a>
                                          <a
                                            className="dropdown-item"
                                            onClick={() => {
                                              deleteButtonTrainingHandler(
                                                item.employee_training_id
                                              );
                                            }}
                                          >
                                            <i className="fa fa-trash-o m-r-5" />{" "}
                                            Delete
                                          </a>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* -------------------------------------Leave */}
                  <div className="row" id="leaveHash">
                    <div className="col-md-12 d-flex">
                      <div className="card profile-box flex-fill">
                        <div className="card-body">
                          <div className="">
                            <h3 className="card-title">
                              Leave{" "}
                              <span className="col-auto float-right">
                                <a
                                  className="add-icon"
                                  data-toggle="modal"
                                  data-target="#addLeave"
                                >
                                  <i className="fa fa-plus" /> Add
                                </a>
                              </span>
                            </h3>
                            {/* <h3 className="card-title mb-2">Education</h3>
                         <button className='bgColor text-white mb-2 rounded py-1' data-toggle="modal" data-target="#addEducation"><a><i className="fa fa-plus" /> Add</a></button> */}
                          </div>
                          <div className="overflow-auto">
                            <table className="table table-nowrap">
                              <thead>
                                <tr>
                                  <th>ID</th>
                                  <th>Leave</th>
                                  <th>Cause</th>
                                  <th>From Date</th>
                                  <th>To Date</th>
                                  <th>Duration</th>
                                  <th>Status</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {employeeLeave.map((item) => (
                                  <tr>
                                    <td> {item.employee_leave_id}</td>
                                    <td>{item.leave_type}</td>
                                    <td>{item.cause}</td>
                                    <td>{item.date_from}</td>
                                    <td>{item.date_to}</td>
                                    <td>{item.duration}</td>
                                    <td>{item.status}</td>
                                    <td className="text-right">
                                      <div className="dropdown dropdown-action">
                                        <a
                                          aria-expanded="false"
                                          data-toggle="dropdown"
                                          className="action-icon dropdown-toggle"
                                          href="#"
                                        >
                                          <i className="material-icons">
                                            more_vert
                                          </i>
                                        </a>
                                        <div className="dropdown-menu dropdown-menu-right">
                                          <a
                                            className="dropdown-item"
                                            data-toggle="modal"
                                            data-target="#leave_info_modal"
                                            onClick={() => {
                                              handleLeaveUpdate(
                                                item.employee_leave_id
                                              );
                                            }}
                                          >
                                            <i className="fa fa-pencil m-r-5" />{" "}
                                            Edit
                                          </a>
                                          <a
                                            className="dropdown-item"
                                            onClick={() => {
                                              deleteButtonLeaveHandler(
                                                item.employee_leave_id
                                              );
                                            }}
                                          >
                                            <i className="fa fa-trash-o m-r-5" />{" "}
                                            Delete
                                          </a>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* -------------------------------------Loan */}
                  <div className="row" id="loanHash">
                    <div className="col-md-12 d-flex">
                      <div className="card profile-box flex-fill">
                        <div className="card-body">
                          <div className="">
                            <h3 className="card-title">
                              Loan{" "}
                              <span className="col-auto float-right">
                                <a
                                  className="add-icon"
                                  data-toggle="modal"
                                  data-target="#addLoan"
                                >
                                  <i className="fa fa-plus" /> Add
                                </a>
                              </span>
                            </h3>
                            {/* <h3 className="card-title mb-2">Education</h3>
                         <button className='bgColor text-white mb-2 rounded py-1' data-toggle="modal" data-target="#addEducation"><a><i className="fa fa-plus" /> Add</a></button> */}
                          </div>
                          <div className="overflow-auto">
                            <table className="table table-nowrap">
                              <thead>
                                <tr>
                                  <th>ID</th>
                                  <th>Request Date</th>
                                  <th>Loan Type</th>
                                  <th>Loan Funds</th>
                                  <th>Amount</th>
                                  <th>Sanction Date</th>
                                  <th>Status</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {employeeLoan.map((item) => (
                                  <tr>
                                    <td> {item.employe_loan_id}</td>
                                    <td>{item.date_status}</td>
                                    <td>{item.loan_type}</td>
                                    <td>{item.loan_funds}</td>
                                    <td>{item.loan_amount}</td>
                                    <td>{item.sanction_date}</td>
                                    <td>{item.status}</td>
                                    <td className="text-right">
                                      <div className="dropdown dropdown-action">
                                        <a
                                          aria-expanded="false"
                                          data-toggle="dropdown"
                                          className="action-icon dropdown-toggle"
                                          href="#"
                                        >
                                          <i className="material-icons">
                                            more_vert
                                          </i>
                                        </a>
                                        <div className="dropdown-menu dropdown-menu-right">
                                          <a
                                            className="dropdown-item"
                                            data-toggle="modal"
                                            data-target="#loan_info_modal"
                                            onClick={() => {
                                              handleLoanUpdate(
                                                item.employe_loan_id
                                              );
                                            }}
                                          >
                                            <i className="fa fa-pencil m-r-5" />{" "}
                                            Edit
                                          </a>
                                          <a
                                            className="dropdown-item"
                                            onClick={() => {
                                              deleteButtonLoanHandler(
                                                item.employe_loan_id
                                              );
                                            }}
                                          >
                                            <i className="fa fa-trash-o m-r-5" />{" "}
                                            Delete
                                          </a>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* /Page Content */}
            {/* Profile Modal */}
            <div
              id="editProfileImage"
              className="modal custom-modal fade"
              role="dialog"
            >
              <div
                className="modal-dialog modal-dialog-centered modal-lg"
                role="document"
              >
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Profile Photo Update</h5>
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
                    <form onSubmit={handleSubmitProfileImage(onSubmitProfileImage)}>
                      <div className="row">
                        <div className="col-sm-6">
                          <div className="mb-3">
                            <label
                              htmlFor="exampleFormControlInput6"
                              className="form-label small fw-bold me-3"
                            >
                              Upload Image
                            </label>
                            <input
                              onChange={(e) => employeeImageUpdateHandle(e)}
                              type="file"
                              id="files"
                              name="picture"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="submit-section">
                        <button
                          type="submit"
                          className="btn bgColor text-white px-5 py-2 rounded"
                        >
                          Update
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            {/* Employee Info Modal */}

            <div
              id="employee_info_modal"
              className="modal custom-modal fade"
              role="dialog"
            >
              <div
                className="modal-dialog modal-dialog-centered modal-lg"
                role="document"
              >
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Employee Information Update</h5>
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
                    <form onSubmit={handleSubmit12(onSubmitEmployeeInfo)}>
                      <div className="row">
                        <div className="col-sm-6">
                          <div className="mb-3">
                            <label
                              htmlFor="exampleFormControlInput5"
                              className="form-label fw-bold small"
                            >
                              NID
                            </label>
                            <input
                              type="number"
                              className="form-control"
                              id="exampleFormControlInput5"
                              defaultValue={employeeData.card_id}
                              {...register12("card_id")}
                            />
                          </div>
                          <div className="mb-3">
                            <label
                              htmlFor="exampleFormControlInput5"
                              className="form-label fw-bold small"
                            >
                              Employee Id
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="exampleFormControlInput5"
                              defaultValue={
                                employeeData.employe_registration_number
                              }
                              {...register12("employe_registration_number")}
                            />
                          </div>
                          <div className="mb-3">
                            <label
                              htmlFor="exampleFormControlInput2"
                              className="form-label fw-bold small"
                            >
                              Name (English)
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="exampleFormControlInput3"
                              defaultValue={employeeData.name_english}
                              {...register12("name_english")}
                            />
                          </div>
                          <div className="mb-3">
                            <label
                              htmlFor="exampleFormControlInput3"
                              className="form-label fw-bold small"
                            >
                              Name (Bangla)
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="exampleFormControlInput3"
                              defaultValue={employeeData.name_bangla}
                              {...register12("name_bangla")}
                            />
                          </div>
                          <div className="mb-3">
                            <label
                              htmlFor="exampleFormControlInput4"
                              className="form-label fw-bold small"
                            >
                              Date of Birth
                            </label>
                            <span className="ps-2 small fw-bold">(mm/dd/yy)</span>
                            {employeeDataDate.date_birth ?
                              <input
                                type="date"
                                defaultValue={employeeDataDate.date_birth.slice(0, 10)}
                                className="form-control"
                                id="exampleFormControlInput4"
                                {...register12("date_birth")}
                              />
                              :
                              <input
                                type="date"
                                className="form-control"
                                id="exampleFormControlInput4"
                                {...register12("date_birth")}
                              />}
                            {/* <DateTimePicker
                           format={`dd/MM/yyyy 00:00`}
                           className="w-100"
                           onChange={setEmployeeBirthDate}
                           value={employeeBirthDate}
                         /> */}
                          </div>
                          <div className="mb-3">
                            <label
                              htmlFor="exampleFormControlInput11"
                              className="form-label fw-bold small"
                            >
                              Mobile
                            </label>
                            <input
                              type="number"
                              className="form-control"
                              id="exampleFormControlInput11"
                              defaultValue={employeeData.mobile_phone}
                              {...register12("mobile_phone")}
                            />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="mb-3">
                            <label
                              htmlFor="exampleFormControlInput7"
                              className="form-label fw-bold small"
                            >
                              Father's Name (English)
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="exampleFormControlInput7"
                              defaultValue={employeeData.fater_englih}
                              {...register12("fater_englih")}
                            />
                          </div>
                          <div className="mb-3">
                            <label
                              htmlFor="exampleFormControlInput8"
                              className="form-label fw-bold small"
                            >
                              Father's Name (Bangla)
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="exampleFormControlInput8"
                              defaultValue={employeeData.father_bangla}
                              {...register12("father_bangla")}
                            />
                          </div>
                          <div className="mb-3">
                            <label
                              htmlFor="exampleFormControlInput9"
                              className="form-label fw-bold small"
                            >
                              Mother's Name (English)
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="exampleFormControlInput9"
                              defaultValue={employeeData.mother_english}
                              {...register12("mother_english")}
                            />
                          </div>
                          <div className="mb-3">
                            <label
                              htmlFor="exampleFormControlInput10"
                              className="form-label fw-bold small"
                            >
                              Mother's Name (Bangla)
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="exampleFormControlInput10"
                              defaultValue={employeeData.mother_bangla}
                              {...register12("mother_bangla")}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="submit-section">
                        <button
                          type="submit"
                          className="btn bgColor text-white px-5 py-2 rounded"
                        >
                          Update
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

            {/* Job Info Modal */}

            <div
              id="job_info_modal"
              className="modal custom-modal fade"
              role="dialog"
            >
              <div
                className="modal-dialog modal-dialog-centered modal-lg"
                role="document"
              >
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title"> Job Informations Update</h5>
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
                    <form onSubmit={handleSubmit13(onSubmitJobInfo)}>
                      <div className="row ">
                        <div className="col-sm-6">
                          <div className="mb-3">
                            <label
                              htmlFor="inputGroupSelect12"
                              className="form-label small fw-bold"
                            >
                              Designation
                            </label>
                            <Select
                              options={categoryOptionsPromotion}
                              onChange={handleDesignationCategory}
                              placeholder={`${employeeData.designation}`}
                            />
                          </div>
                          <div className="mb-3">
                            <label
                              htmlFor="inputGroupSelect13"
                              className="form-label small fw-bold"
                            >
                              Department
                            </label>
                            <Select
                              options={categoryOptionsDepartment}
                              onChange={handleDepartmentSelectCategory}
                              placeholder={`${employeeData.departement}`}
                            />
                          </div>

                          <div className="mb-3">
                            <label
                              htmlFor="exampleFormControlInput14"
                              className="form-label small fw-bold"
                            >
                              Cadre
                            </label>
                            <input
                              defaultValue={employeeData.cadre}
                              type="text"
                              className="form-control"
                              id="exampleFormControlInput14"
                              placeholder="Cadre"
                              {...register13("cadre")}
                            />
                          </div>
                          <div className="mb-3">
                            <label
                              htmlFor="exampleFormControlInput15"
                              className="form-label small fw-bold"
                            >
                              Email Address
                            </label>
                            <input
                              defaultValue={employeeData.email_adress}
                              type="email"
                              className="form-control"
                              id="exampleFormControlInput15"
                              placeholder="Enter Email"
                              {...register13("email_adress")}
                            />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="mb-3">
                            <label
                              htmlFor="exampleFormControlInput16"
                              className="form-label small fw-bold"
                            >
                              Phone
                            </label>
                            <input
                              defaultValue={employeeData.telephone_number}
                              type="number"
                              className="form-control"
                              id="exampleFormControlInput16"
                              placeholder="Phone"
                              {...register13("telephone_number")}
                            />
                          </div>
                          <div className="mb-3">
                            <label
                              htmlFor="exampleFormControlInput17"
                              className="form-label small fw-bold"
                            >
                              Joining Date
                            </label>
                            {/* employeeData.joining_date */}
                            <span className="ps-2 small fw-bold">(mm/dd/yy)</span>
                            {employeeDataDate.joining_date ?
                              <input
                                type="date"
                                defaultValue={employeeDataDate.joining_date.slice(0, 10)}
                                className="form-control"
                                id="exampleFormControlInput17"
                                {...register13("joining_date")}
                              />
                              :
                              <input
                                type="date"
                                className="form-control"
                                id="exampleFormControlInput17"
                                {...register13("joining_date")}
                              />

                            }

                          </div>
                          <div className="mb-3">
                            <label
                              htmlFor="exampleFormControlInput18"
                              className="form-label small fw-bold"
                            >
                              PRL Date
                            </label>
                            <span className="ps-2 small fw-bold">(mm/dd/yy)</span>
                            {employeeDataDate.lrp_date ?
                              <input
                                type="date"
                                defaultValue={employeeDataDate.lrp_date.slice(0, 10)}
                                className="form-control"
                                id="exampleFormControlInput18"
                                {...register13("lrp_date")}
                              />
                              :
                              <input
                                type="date"
                                className="form-control"
                                id="exampleFormControlInput18"
                                {...register13("lrp_date")}
                              />
                            }
                            {/* <DateTimePicker
                           format={`dd/MM/yyyy 00:00`}
                           className="w-100"
                           onChange={setLrpDate}
                           value={lrpDate}
                         /> */}
                          </div>
                          <div className="mb-3">
                            <label
                              htmlFor="exampleFormControlInput19"
                              className="form-label small fw-bold"
                            >
                              Date of Confirmation
                            </label>
                            <span className="ps-2 small fw-bold">(mm/dd/yy)</span>
                            {employeeDataDate.date_confirmation ?
                              <input
                                type="date"
                                defaultValue={employeeDataDate.date_confirmation.slice(0, 10)}
                                className="form-control"
                                id="exampleFormControlInput18"
                                {...register13("date_confirmation")}
                              />
                              :
                              <input
                                type="date"
                                className="form-control"
                                id="exampleFormControlInput18"
                                {...register13("date_confirmation")}
                              />
                            }
                            {/* <DateTimePicker
                           format={`dd/MM/yyyy 00:00`}
                           className="w-100"
                           onChange={setDateConfirmation}
                           value={dateConfirmation}
                         /> */}
                          </div>
                        </div>
                      </div>
                      <div className="submit-section">
                        <button
                          type="submit"
                          className="btn bgColor text-white px-5 py-2 rounded"
                        >
                          Update
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

            {/* General Info Modal */}

            <div
              id="general_info_modal"
              className="modal custom-modal fade"
              role="dialog"
            >
              <div
                className="modal-dialog  modal-dialog-centered modal-lg"
                role="document"
              >
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">General Information Update</h5>
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
                    <form onSubmit={handleSubmit11(onSubmitGeneral)}>
                      <div className="row">
                        <div className="col-sm-12 ">
                          <div className="mb-3">
                            <label
                              htmlFor="inputGroupSelect20"
                              className="form-label fw-bold small"
                            >
                              Employee Blood
                            </label>
                            <select
                              className="form-select"
                              id="inputGroupSelect20"
                              {...register11("blood_group")}
                            >
                              <option value="">{employeeData.blood_group}</option>
                              <option value="A+">A+</option>
                              <option value="A-">A-</option>
                              <option value="B+">B+</option>
                              <option value="B-">B-</option>
                              <option value="O+">O+</option>
                              <option value="O-">O-</option>
                              <option value="AB+">AB+</option>
                              <option value="AB-">AB-</option>
                            </select>
                          </div>

                          <div className="mb-3">
                            <label
                              htmlFor="inputGroupSelect21"
                              className="form-label fw-bold small"
                            >
                              Religion
                            </label>
                            <select
                              className="form-select"
                              id="inputGroupSelect21"
                              {...register11("religion")}
                            >
                              <option value="">{employeeData.religion}</option>
                              <option value="Islam">Islam</option>
                              <option value="Hinduism">Hinduism</option>
                              <option value="Buddhism">Buddhism</option>
                              <option value="Christianity">Christianity</option>
                            </select>
                          </div>

                          <div className="mb-3">
                            <label
                              htmlFor="inputGroupSelect22"
                              className="form-label fw-bold small"
                            >
                              Gender
                            </label>
                            <select
                              className="form-select"
                              id="inputGroupSelect22"
                              {...register11("gender")}
                            >
                              <option value="">{employeeData.gender}</option>
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                              <option value="Others">Others</option>
                            </select>
                          </div>
                          <div className="mb-3">
                            <label
                              htmlFor="inputGroupSelect23"
                              className="form-label small  fw-bold me-5"
                            >
                              Quota
                            </label>
                            <div className="form-check" id="inputGroupSelect23">
                              <div
                                className="
 form-check"
                              >
                                {
                                  employeeData.freedom_fighter ?
                                    <input
                                      defaultChecked={employeeData.freedom_fighter === 'Yes' ? "true" : ""}
                                      className="form-check-input"
                                      type="checkbox"
                                      id="flexCheck1"
                                      value="Yes"
                                      {...register11("freedom_fighter")}
                                    />
                                    :
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      id="flexCheck1"
                                      value="Yes"
                                      {...register11("freedom_fighter")}
                                    />

                                }
                                <label
                                  className="form-check-label"
                                  htmlFor="flexCheck1"
                                >
                                  Freedom Fighter
                                </label>
                              </div>
                              <div
                                className="form-check"
                              >
                                {
                                  employeeData.grandchild_ff ?
                                    <input
                                      defaultChecked={employeeData.grandchild_ff === "Yes" ? "true" : ""}
                                      className="form-check-input"
                                      type="checkbox"
                                      id="flexCheck2"
                                      value="Yes"
                                      {...register11("grandchild_ff")}
                                    />
                                    :
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      id="flexCheck2"
                                      value="Yes"
                                      {...register11("grandchild_ff")}
                                    />
                                }
                                <label
                                  className=" form-check-label"
                                  htmlFor="flexCheck2"
                                >
                                  Child/Grandchild of Freedom fighter
                                </label>
                              </div>
                              <div
                                className="
     form-check"
                              >
                                {
                                  employeeData.tribal ?
                                    <input
                                      defaultChecked={employeeData.tribal === "Yes" ? "true" : ""}
                                      className="form-check-input"
                                      type="checkbox"
                                      id="flexCheck3"
                                      value="Yes"
                                      {...register11("tribal")}
                                    />
                                    :
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      id="flexCheck3"
                                      value="Yes"
                                      {...register11("tribal")}
                                    />
                                }
                                <label
                                  className="
 form-check-label"
                                  htmlFor="flexCheck3"
                                >
                                  Tribal
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="mb-3">
                            <label
                              htmlFor="inputGroupSelect24"
                              className="form-label fw-bold small"
                            >
                              Nationality
                            </label>
                            <select
                              className="form-select"
                              id="inputGroupSelect24"
                              {...register11("nationality")}
                            >
                              <option value="">{employeeData.nationality}</option>
                              <option value="Bangladeshi">Bangladeshi</option>
                              <option value="Others">Others</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="submit-section">
                        <button
                          type="submit"
                          className="btn bgColor text-white px-5 py-2 rounded"
                        >
                          Update
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

            {/* /Emergency Contact Modal */}

            <div
              id="emergency_contact_modal"
              className="modal custom-modal fade"
              role="dialog"
            >
              <div
                className="modal-dialog modal-dialog-centered modal"
                role="document"
              >
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Emergency Contact Update</h5>
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
                    <form onSubmit={handleSubmit10(onSubmitEmergency)}>
                      <div className="row">
                        <div className="col-sm-12 ">
                          <div className="mb-3">
                            <label
                              htmlFor="exampleFormControlInput25"
                              className="form-label fw-bold small"
                            >
                              Name
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="exampleFormControlInput25"
                              defaultValue={employeeData.emergency_contact}
                              {...register10("emergency_contact")}
                            />
                          </div>
                          <div className="mb-3">
                            <label
                              htmlFor="exampleFormControlInput26"
                              className="form-label fw-bold small"
                            >
                              Relation
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="exampleFormControlInput26"
                              defaultValue={employeeData.emergency_relation}
                              {...register10("emergency_relation")}
                            />
                          </div>
                          <div className="mb-3">
                            <label
                              htmlFor="exampleFormControlInput27"
                              className="form-label fw-bold small"
                            >
                              Phone No
                            </label>
                            <input
                              type="number"
                              className="form-control"
                              id="exampleFormControlInput27"
                              defaultValue={employeeData.emergency_phone}
                              {...register10("emergency_phone")}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="submit-section">
                        <button
                          type="submit"
                          className="btn bgColor text-white px-5 py-2 rounded"
                        >
                          Update
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            {/* Present Address Modal */}

            <div
              id="present_address_modal"
              className="modal custom-modal fade"
              role="dialog"
            >
              <div
                className="modal-dialog modal-dialog-centered modal"
                role="document"
              >
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Present Address Update</h5>
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
                    <form onSubmit={handleSubmit9(onSubmitPresent)}>
                      <div className="row">
                        <div className="col-sm-12 ">
                          <div className="mb-3">
                            <label
                              htmlFor="exampleFormControlInput28"
                              className="form-label fw-bold small"
                            >
                              Village/House N°. Road
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="exampleFormControlInput28"
                              defaultValue={employeeData.present_adress_adress}
                              {...register9("present_adress_adress")}
                            />
                          </div>
                          <div className="mb-3">
                            <label
                              htmlFor="exampleFormControlInput29"
                              className="form-label fw-bold small"
                            >
                              Post Office
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="exampleFormControlInput29"
                              defaultValue={employeeData.present_adress_po}
                              {...register9("present_adress_po")}
                            />
                          </div>
                          <div className="mb-3">
                            <label
                              htmlFor="exampleFormControlInput30"
                              className="form-label fw-bold small"
                            >
                              Upazila
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="exampleFormControlInput30"
                              defaultValue={employeeData.present_adress_upazilla}
                              {...register9("present_adress_upazilla")}
                            />
                          </div>

                          <div className="mb-3">
                            <label
                              htmlFor="inputGroupSelect31"
                              className="form-label fw-bold small"
                            >
                              District
                            </label>
                            <Select
                              placeholder={employeeData ? employeeData.pre_district_name : "Select.."}
                              options={categoryOptions}
                              onChange={handlePresentSelectCategory}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="submit-section">
                        <button
                          type="submit"
                          className="btn bgColor text-white px-5 py-2 rounded"
                        >
                          Update
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

            {/* Permanent Address Modal */}

            <div
              id="permanent_address_modal"
              className="modal custom-modal fade"
              role="dialog"
            >
              <div
                className="modal-dialog modal-dialog-centered modal"
                role="document"
              >
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Permanent Address Update</h5>
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
                    <form onSubmit={handleSubmit8(onSubmitPermanent)}>
                      <div className="row">
                        <div className="col-sm-12 ">
                          <div className="mb-3">
                            <label
                              htmlFor="exampleFormControlInput28"
                              className="form-label fw-bold small"
                            >
                              Village/House N°. Road
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="exampleFormControlInput28"
                              defaultValue={employeeData.permanent_adress_adress}
                              {...register8("permanent_adress_adress")}
                            />
                          </div>
                          <div className="mb-3">
                            <label
                              htmlFor="exampleFormControlInput29"
                              className="form-label fw-bold small"
                            >
                              Post Office
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="exampleFormControlInput29"
                              defaultValue={employeeData.permanent_adress_po}
                              {...register8("permanent_adress_po")}
                            />
                          </div>
                          <div className="mb-3">
                            <label
                              htmlFor="exampleFormControlInput30"
                              className="form-label fw-bold small"
                            >
                              Upazila
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="exampleFormControlInput30"
                              defaultValue={employeeData.permanent_adress_upazilla}
                              {...register8("permanent_adress_upazilla")}
                            />
                          </div>

                          <div className="mb-3">
                            <label
                              htmlFor="inputGroupSelect31"
                              className="form-label fw-bold small"
                            >
                              District
                            </label>
                            <Select
                              options={categoryOptions}
                              placeholder={employeeData ? employeeData.per_district_name : "Select.."}
                              onChange={handlePermanentSelectCategory}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="submit-section">
                        <button
                          type="submit"
                          className="btn bgColor text-white px-5 py-2 rounded"
                        >
                          Update
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

            {/* Official Address Modal */}

            <div
              id="Official_address_modal"
              className="modal custom-modal fade"
              role="dialog"
            >
              <div
                className="modal-dialog modal-dialog-centered modal"
                role="document"
              >
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Official Address Update</h5>
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
                    <form onSubmit={handleSubmit7(onSubmitOfficial)}>
                      <div className="row">
                        <div className="col-sm-12 ">
                          <div className="mb-3">
                            <label
                              htmlFor="exampleFormControlInput28"
                              className="form-label fw-bold small"
                            >
                              Village/House N°. Road
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="exampleFormControlInput28"
                              defaultValue={employeeData.official_adress_adress}
                              {...register7("official_adress_adress")}
                            />
                          </div>
                          <div className="mb-3">
                            <label
                              htmlFor="exampleFormControlInput29"
                              className="form-label fw-bold small"
                            >
                              Post Office
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="exampleFormControlInput29"
                              defaultValue={employeeData.official_adress_po}
                              {...register7("official_adress_po")}
                            />
                          </div>
                          <div className="mb-3">
                            <label
                              htmlFor="exampleFormControlInput30"
                              className="form-label fw-bold small"
                            >
                              Upazila
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="exampleFormControlInput30"
                              defaultValue={employeeData.official_adress_upazilla}
                              {...register7("official_adress_upazilla")}
                            />
                          </div>

                          <div className="mb-3">
                            <label
                              htmlFor="inputGroupSelect31"
                              className="form-label fw-bold small"
                            >
                              District
                            </label>
                            <Select
                              placeholder={employeeData ? employeeData.off_district_name : "Select.."}
                              options={categoryOptions}
                              onChange={handleOfficialSelectCategory}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="submit-section">
                        <button
                          type="submit"
                          className="btn bgColor text-white px-5 py-2 rounded"
                        >
                          Update
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

            {/* Spouse Informations */}

            <div
              id="spouse_info_modal"
              className="modal custom-modal fade"
              role="dialog"
            >
              <div
                className="modal-dialog modal-dialog-centered modal"
                role="document"
              >
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Spouse Informations Update</h5>
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
                    <form onSubmit={handleSubmit6(onSubmitSpouse)}>
                      <div className="row">
                        <div className="col-sm-12 ">
                          <div className="mb-3">
                            <label
                              htmlFor="exampleFormControlInput40"
                              className="form-label fw-bold small"
                            >
                              Spouse Name
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="exampleFormControlInput40"
                              defaultValue={employeeData.spouse_name}
                              {...register6("spouse_name")}
                            />
                          </div>
                          <div className="mb-3">
                            <label
                              htmlFor="inputGroupSelect41"
                              className="form-label fw-bold small"
                            >
                              Nationality
                            </label>
                            <select
                              className="form-select"
                              id="inputGroupSelect41"
                              {...register6("spouse_nationality")}
                            >
                              <option value={employeeData.spouse_nationality}>
                                {employeeData.spouse_nationality}
                              </option>
                              <option value="Bangladeshi">Bangladeshi</option>
                              <option value="Others">Others</option>
                            </select>
                          </div>

                          <div className="mb-3">
                            <label
                              htmlFor="exampleFormControlInput43"
                              className="form-label fw-bold small"
                            >
                              National ID No
                            </label>
                            <input
                              type="number"
                              className="form-control"
                              id="exampleFormControlInput43"
                              defaultValue={employeeData.spouse_card_id}
                              {...register6("spouse_card_id")}
                            />
                          </div>
                          <div className="mb-3">
                            <label
                              htmlFor="exampleFormControlInput50"
                              className="form-label small fw-bold"
                            >
                              Photo
                            </label>

                            <input
                              onChange={(e) => {
                                uploadSpouseImage(e);
                              }}
                              type="file"
                              id="files"
                              className="
 ms-2"
                              name="picture"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="submit-section">
                        <button
                          type="submit"
                          className="btn bgColor text-white px-5 py-2 rounded"
                        >
                          Update
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

            {/* Children Informations  */}

            {/* Add Children Modal */}

            <div id="add_child" className="modal custom-modal fade" role="dialog">
              <div
                className="modal-dialog modal-lg modal-dialog-centered"
                role="document"
              >
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Add Child</h5>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                  <form onSubmit={handleSubmitChild(onSubmitChild)}>
                    <div className="modal-body text-start">
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput44"
                          className="form-label small fw-bold"
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="exampleFormControlInput44"
                          placeholder="Name"
                          {...registerChild("child_name", { required: true })}
                        />
                      </div>

                      <div className="mb-3">
                        <label
                          htmlFor="inputGroupSelect46"
                          className="form-label small fw-bold"
                        >
                          Gender
                        </label>
                        <select
                          className="form-select"
                          id="inputGroupSelect46"
                          {...registerChild("gender")}
                        >
                          <option value="">Please Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Others">Others</option>
                        </select>
                      </div>

                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput47"
                          className="form-label small fw-bold"
                        >
                          Institute
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="exampleFormControlInput47"
                          placeholder="Institute"
                          {...registerChild("school")}
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput48"
                          className="form-label small fw-bold"
                        >
                          Class
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="exampleFormControlInput48"
                          placeholder="Class"
                          {...registerChild("child_class")}
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput45"
                          className="form-label small fw-bold"
                        >
                          Date of birth
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          id="exampleFormControlInput45"
                          {...registerChild("date_birth")}
                        />
                        {/* <DateTimePicker
                       format={`dd/MM/yyyy 00:00`}
                       className="w-100"
                       onChange={setChildBirthDateUpload}
                       value={childBirthDateUpload}
                     /> */}
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput49"
                          className="form-label small fw-bold"
                        >
                          Certificate
                        </label>
                        <input
                          onChange={(e) => {
                            uploadCertificateImage(e);
                          }}
                          type="file"
                          id="files"
                          className="
 ms-2 "
                          name="picture"
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput50"
                          className="form-label small fw-bold"
                        >
                          Photo
                        </label>

                        <input
                          onChange={(e) => {
                            uploadChildImage(e);
                          }}
                          type="file"
                          id="files"
                          className="
 ms-2"
                          name="picture"
                        />
                      </div>

                      <div className="modal-footer">
                        <button
                          type="submit"
                          className="btn bgColor text-white px-5 ms-1 py-2 rounded"
                        >
                          {" "}
                          Add{" "}
                        </button>
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
                </div>
              </div>
            </div>

            {/* Children Informations  */}

            <div
              id="children_info_modal"
              className="modal custom-modal fade"
              role="dialog"
            >
              <div
                className="modal-dialog modal-dialog-centered modal-lg"
                role="document"
              >
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Children Informations</h5>
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
                    <form onSubmit={handleSubmit14(onSubmitChildren)}>
                      <div className="row">
                        <div className="mb-3">
                          <label
                            htmlFor="exampleFormControlInput44"
                            className="form-label fs-6 fw-bold"
                          >
                            Name
                          </label>
                          <input
                            defaultValue={singleChildrenData.child_name}
                            type="text"
                            className="form-control"
                            id="exampleFormControlInput44"
                            {...register14("child_name")}
                          />
                        </div>

                        <div className="mb-3">
                          <label
                            htmlFor="inputGroupSelect46"
                            className="form-label fs-6 fw-bold"
                          >
                            Gender
                          </label>
                          <select
                            className="form-select"
                            id="inputGroupSelect46"
                            {...register14("gender")}
                          >
                            <option value={singleChildrenData.gender}>
                              {singleChildrenData.gender}
                            </option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Others">Others</option>
                          </select>
                        </div>

                        <div className="mb-3">
                          <label
                            htmlFor="exampleFormControlInput47"
                            className="form-label fs-6 fw-bold"
                          >
                            Institute
                          </label>
                          <input
                            defaultValue={singleChildrenData.school}
                            type="text"
                            className="form-control"
                            id="exampleFormControlInput47"
                            placeholder="Institute"
                            {...register14("school")}
                          />
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor="exampleFormControlInput48"
                            className="form-label fs-6 fw-bold"
                          >
                            Class
                          </label>
                          <input
                            defaultValue={singleChildrenData.child_class}
                            type="text"
                            className="form-control"
                            id="exampleFormControlInput48"
                            placeholder="Class"
                            {...register14("child_class")}
                          />
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor="exampleFormControlInput45"
                            className="form-label fs-6 fw-bold"
                          >
                            Date of birth
                          </label>
                          <span className="ps-2 small fw-bold">(mm/dd/yy)</span>
                          {
                            employeeDataDate.date_birth ?
                              <input
                                type="date"
                                className="form-control"
                                defaultValue={employeeDataDate.date_birth.slice(0, 10)}
                                id="exampleFormControlInput45"
                                {...register14("date_birth")}
                              />
                              :
                              <input
                                type="date"
                                className="form-control"

                                id="exampleFormControlInput45"
                                {...register14("date_birth")}
                              />
                          }

                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor="exampleFormControlInput49"
                            className="form-label fs-6 fw-bold"
                          >
                            Certificate
                          </label>
                          <input
                            onChange={(e) => {
                              updateCertificateImage(e);
                            }}
                            type="file"
                            id="files"
                            className="
 ms-2 "
                            name="picture"
                          />
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor="exampleFormControlInput50"
                            className="form-label fs-6 fw-bold"
                          >
                            Photo
                          </label>

                          <input
                            onChange={(e) => {
                              updateChildImage(e);
                            }}
                            type="file"
                            id="files"
                            className="
 ms-2"
                            name="picture"
                          />
                        </div>
                      </div>
                      <div className="submit-section">
                        <button
                          type="submit"
                          className="btn bgColor text-white px-5 py-2 rounded"
                        >
                          Update
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

            {/* Documents Informations  */}



            {/* Discipline Informations  */}

            <div
              id="Discipline_info_modal"
              className="modal custom-modal fade"
              role="dialog"
            >
              <div
                className="modal-dialog modal-dialog-centered modal-lg"
                role="document"
              >
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Discipline</h5>
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
                    <form onSubmit={handleSubmit5(onSubmitDiscipline)}>
                      <div className="row">
                        <div className="col-sm-6">
                          <div className="mb-3">
                            <label
                              htmlFor="inputGroupSelect12"
                              className="form-label fw-bold small"
                            >
                              Choose an Employee
                            </label>

                            <select
                              className="form-select"
                              id="inputGroupSelect12"
                              {...register5("employe_id")}
                            >
                              <option value={getDisciplineData.employe_id}>
                                {" "}
                                {getDisciplineData.name_english}{" "}
                              </option>
                            </select>
                          </div>

                          <div className="mb-2 mt-3">
                            <h5>Punishment</h5>
                            <hr />
                          </div>
                          <div className="mb-3">
                            <label
                              htmlFor="exampleFormControlInput14"
                              className="form-label fw-bold small"
                            >
                              Name Of Punishment
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="exampleFormControlInput14"
                              defaultValue={getDisciplineData.name_punishement}
                              {...register5("name_punishement")}
                            />
                          </div>

                          <div className="mb-3">
                            <label
                              htmlFor="exampleFormControlInput14"
                              className="form-label fw-bold small"
                            >
                              Punishment Memo No
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="exampleFormControlInput14"
                              defaultValue={getDisciplineData.punishement_memo_n}
                              {...register5("punishement_memo_n")}
                            />
                          </div>

                          {/* <div className="mb-3">
                         <label htmlFor="exampleFormControlInput50" className="form-label fw-bold small me-2">Punishment Memo Scan</label>
                       <input type="file" className="form-control" id="exampleFormControlInput51" {...register("punishement_memo_file")} /> 
                       <input onChange={(e) => {
                         uploadImage1(e);
                       }} type="file" name="picture" />
                     </div> */}

                          <div className="form-check ps-1 pt-5 mt-5">
                            <label
                              className="form-check-label  fw-bold"
                              htmlFor="flexCheckDefault"
                            >
                              Release From Charge
                            </label>
                            <input
                              className="form-check-input ms-5"
                              type="checkbox"
                              id="flexCheckDefault"
                              onChange={handleClick}
                            />
                          </div>

                          {/* radio click  */}

                          {click ? (
                            <div>
                              <div className="mb-3">
                                <label
                                  htmlFor="exampleFormControlInput14"
                                  className="form-label fw-bold small"
                                >
                                  Memo No
                                </label>

                                <input
                                  type="text"
                                  className="form-control"
                                  id="exampleFormControlInput14"
                                  defaultValue={getDisciplineData.release_memo_n}
                                  {...register5("release_memo_n")}
                                />
                              </div>

                              <div className="mb-3">
                                <label
                                  htmlFor="exampleFormControlInput17"
                                  className="form-label fw-bold"
                                >
                                  Memo Date
                                </label>
                                <input
                                  type="date"
                                  className="form-control"
                                  id="exampleFormControlInput17"
                                  {...register5("release_memo_date")}
                                />
                                {/* <DateTimePicker
                               format={`dd/MM/yyyy 00:00`}
                               className="w-100"
                               onChange={setReleaseDate}
                               value={releaseDate}
                             /> */}
                              </div>
                              <div className="mb-3">
                                <label
                                  htmlFor="exampleFormControlInput50"
                                  className="form-label fw-bold"
                                >
                                  Memo Scan
                                </label>
                                <input
                                  type="file"
                                  className="form-control"
                                  id="exampleFormControlInput51"
                                />
                              </div>
                            </div>
                          ) : (
                            <div>
                              <div className="mb-3">
                                <label
                                  htmlFor="exampleFormControlInput14"
                                  className="form-label fw-bold small"
                                >
                                  Memo No
                                </label>

                                <input
                                  type="text"
                                  className="form-control"
                                  id="exampleFormControlInput14"
                                  defaultValue={getDisciplineData.release_memo_n}
                                  disabled
                                />
                              </div>

                              <div className="mb-3">
                                <label
                                  htmlFor="exampleFormControlInput17"
                                  className="form-label fw-bold"
                                >
                                  Memo Date
                                </label>
                                <input
                                  type="date"
                                  className="form-control"
                                  id="exampleFormControlInput17"
                                  {...register5("release_memo_date")}
                                  disabled
                                />
                                {/* <DateTimePicker
                               format={`dd/MM/yyyy 00:00`}
                               className="w-100"
                               onChange={setReleaseDate}
                               value={releaseDate}
                               disabled
                             /> */}
                              </div>

                              <div className="mb-3">
                                <label
                                  htmlFor="exampleFormControlInput50"
                                  className="form-label fw-bold"
                                >
                                  Memo Scan
                                </label>
                                <input
                                  type="file"
                                  className="form-control"
                                  id="exampleFormControlInput51"
                                  disabled
                                />
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="col-sm-6">
                          <div className="mb-3">
                            <label
                              htmlFor="exampleFormControlInput14"
                              className="form-label fw-bold small"
                            >
                              Description Of Offence
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="exampleFormControlInput14"
                              defaultValue={getDisciplineData.offence_description}
                              {...register5("offence_description")}
                            />
                          </div>

                          <div className="mb-3 mt-5 pt-3">
                            <label
                              htmlFor="inputGroupSelect12"
                              className="form-label fw-bold small"
                            >
                              Type Of Punishment
                            </label>

                            <select
                              className="form-select"
                              id="inputGroupSelect12"
                              {...register5("punishment_id")}
                            >
                              <option value={getDisciplineData.punishment_id}>
                                {getDisciplineData.punishment_type}
                              </option>
                              {punishmentType.map((data) => (
                                <option value={data.punishment_id}>
                                  {data.punishment_type}
                                </option>
                              ))}
                              ;
                            </select>
                          </div>

                          <div className="mb-3 ">
                            <label
                              htmlFor="exampleFormControlInput17"
                              className="form-label fw-bold"
                            >
                              Punishment Memo Date
                            </label>
                            <input type="date"
                              placeholder="dd-mm-yyyy"
                              className="form-control"
                              id="exampleFormControlInput17"
                              {...register5("punishement_memo_date")}
                            />
                            {/* <DateTimePicker
                           format={`dd/MM/yyyy 00:00`}
                           className="w-100"
                           onChange={setPunishmentDate}
                           value={punishmentDate}
                         /> */}
                            {/* <input type="date" className="form-control" id="exampleFormControlInput17" {...register("punishement_memo_date")} /> */}
                          </div>
                          <div className="mb-3">
                            <label
                              htmlFor="exampleFormControlTextarea1"
                              className="form-label fw-bold small"
                            >
                              Appeal
                            </label>
                            <textarea
                              className="form-control"
                              id="exampleFormControlTextarea1"
                              rows="5"
                              defaultValue={getDisciplineData.appeal}
                              {...register5("appeal")}
                            ></textarea>
                          </div>
                        </div>
                      </div>
                      <div className="modal-footer">
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

            {/* Health Informations  */}

            <div
              id="health_info_modal"
              className="modal custom-modal fade"
              role="dialog"
            >
              <div
                className="modal-dialog modal-dialog-centered modal-lg"
                role="document"
              >
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Health</h5>
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
                    <form onSubmit={handleSubmit4(onSubmitHealth)}>
                      <div className="row">
                        <div className="col-sm-6">
                          <div className="mb-3">
                            <label
                              htmlFor="inputGroupSelect12"
                              className="form-label fw-bold small"
                            >
                              Choose an Employee
                            </label>
                            <select
                              className="form-select"
                              id="inputGroupSelect12"
                              {...register4("employe_id")}
                            >
                              <option value={getHealthData.employe_id}>
                                {" "}
                                {getHealthData.name_english}{" "}
                              </option>
                            </select>
                          </div>

                          <div className="mb-3">
                            <label
                              htmlFor="exampleFormControlInput17"
                              className="form-label small fw-bold"
                            >
                              Start Date
                            </label>
                            <input type="date"
                              placeholder="dd-mm-yyyy"
                              className="form-control"
                              id="exampleFormControlInput17"
                              {...register4("date_from")}
                            />
                            {/* <DateTimePicker
                           format={`dd/MM/yyyy 00:00`}
                           className="w-100"
                           onChange={setHealthStartDate}
                           value={healthStartDate}
                         /> */}
                            {/* <input type="date" className="form-control" id="exampleFormControlInput17" {...register("date_from")} /> */}
                          </div>

                          <div className="mb-3">
                            <label
                              htmlFor="exampleFormControlInput17"
                              className="form-label fw-bold small"
                            >
                              End Date
                            </label>
                            <input type="date"
                              placeholder="dd-mm-yyyy"
                              className="form-control"
                              id="exampleFormControlInput17"
                              {...register4("date_to")}
                            />
                            {/* <DateTimePicker
                           format={`dd/MM/yyyy 00:00`}
                           className="w-100"
                           onChange={setHealthEndDate}
                           value={healthEndDate}
                         /> */}
                            {/* <input type="date" className="form-control" id="exampleFormControlInput17"  {...register("date_to")} /> */}
                          </div>

                          <div className="mb-3">
                            <label
                              htmlFor="exampleFormControlInput14"
                              className="form-label fw-bold small"
                            >
                              Height
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="exampleFormControlInput14"
                              defaultValue={getHealthData.height}
                              {...register4("height")}
                            />
                          </div>
                          <div className="mb-3">
                            <label
                              htmlFor="exampleFormControlInput14"
                              className="form-label fw-bold small"
                            >
                              Weight
                            </label>
                            <input
                              type="text"
                              defaultValue={getHealthData.weight}
                              className="form-control"
                              id="exampleFormControlInput14"
                              {...register4("weight")}
                            />
                          </div>
                          <div className="mb-3">
                            <label
                              htmlFor="exampleFormControlInput14"
                              className="form-label fw-bold small"
                            >
                              Visual power
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              defaultValue={getHealthData.visual_power}
                              id="exampleFormControlInput14"
                              {...register4("visual_power")}
                            />
                          </div>

                          {/* <div className="mb-3">
                       <label htmlFor="exampleFormControlInput50" className="form-label fw-bold me-2 small">X-ray Report</label>
                       <input onChange={(e) => {
                         uploadImage1(e);
                       }} type="file" name="picture" />
                      //  <input type="file" className="form-control" id="exampleFormControlInput51"  {...register("x_ray_report")} /> 
                   </div> */}
                        </div>
                        <div className="col-sm-6">
                          <div className="mb-3">
                            <label
                              htmlFor="inputGroupSelect12"
                              className="form-label fw-bold small"
                            >
                              Health Information
                            </label>
                            <select
                              className="form-select"
                              id="inputGroupSelect12"
                              {...register4("health_info_id")}
                            >
                              <option value="">{getHealthData.health_info} </option>
                              {healthInfo.map((data) => (
                                <option value={data.health_info_id}>
                                  {data.health_info}
                                </option>
                              ))}
                              ;
                            </select>
                          </div>

                          <div className="mb-3">
                            <label
                              htmlFor="exampleFormControlInput14"
                              className="form-label fw-bold small"
                            >
                              Blood Pressure
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              defaultValue={getHealthData.blood_pressure}
                              id="exampleFormControlInput14"
                              {...register4("blood_pressure")}
                            />
                          </div>

                          <div className="mb-3">
                            <label
                              htmlFor="exampleFormControlTextarea1"
                              className="form-label fw-bold small"
                            >
                              Medical Classification
                            </label>
                            <textarea
                              className="form-control"
                              defaultValue={getHealthData.medical_classification}
                              id="exampleFormControlTextarea1"
                              rows="5"
                              {...register4("medical_classification")}
                            ></textarea>
                          </div>

                          <div className="mb-3">
                            <label
                              htmlFor="exampleFormControlTextarea1"
                              className="form-label fw-bold small"
                            >
                              Health Weakness/Incompetent Nature
                            </label>
                            <textarea
                              className="form-control"
                              defaultValue={getHealthData.health_weakness}
                              id="exampleFormControlTextarea1"
                              rows="4"
                              {...register4("health_weakness")}
                            ></textarea>
                          </div>
                          {/* <div className="mb-3">
                       <label htmlFor="exampleFormControlInput50" className="form-label fw-bold me-2 small">ECG Report</label>
   
                       <input onChange={(e) => {
                         uploadImage2(e);
                       }} type="file" name="picture" />
                      // <input type="file" className="form-control" id="exampleFormControlInput51" {...register("ecg_report")} ///> 
                 </div> */}
                        </div>
                      </div>
                      <div className="modal-footer">
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

            {/* Promotion Informations  */}

            <div
              id="promotion_info_modal"
              className="modal custom-modal fade"
              role="dialog"
            >
              <div
                className="modal-dialog modal-dialog-centered modal-lg"
                role="document"
              >
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Promotion</h5>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                  <form onSubmit={handleSubmit3(onSubmitPromotion)}>
                    <div className="modal-body text-start">
                      <div className="mb-3">
                        <label
                          htmlFor="inputGroupSelect12"
                          className="form-label fw-bold small"
                        >
                          Employee
                        </label>
                        <select
                          className="form-select"
                          id="inputGroupSelect12"
                          {...register2("employe_id")}
                        >
                          <option value={getPromotionData.employe_id}>
                            {" "}
                            {getPromotionData.name_english}{" "}
                          </option>
                        </select>
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="inputGroupSelect12"
                          className="form-label fw-bold small"
                        >
                          Type
                        </label>
                        <select
                          className="form-select"
                          id="inputGroupSelect12"
                          {...register3("type_promotion")}
                        >
                          <option value={getPromotionData.type_promotion}>
                            {getPromotionData.type_promotion}
                          </option>
                          <option value="Promotion">Promotion</option>
                          <option value="Charge">Charge</option>
                        </select>
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="inputGroupSelect12"
                          className="form-label fw-bold small"
                        >
                          Designation
                        </label>
                        <Select
                          // defaultValue={{
                          //   label: `${getPromotionData ?
                          //     getPromotionData.designation_id
                          //     : "select.."}`, value: getPromotionData.designation_id
                          // }}
                          options={categoryOptionsPromotion}
                          onChange={handleDesignationSelectCategory}
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput14"
                          className="form-label fw-bold small"
                        >
                          Grade
                        </label>
                        <input
                          value={gradeData.grade || 0}
                          type="text"
                          className="form-control"
                          id="exampleFormControlInput14"
                          disabled
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput14"
                          className="form-label fw-bold small"
                        >
                          Payscale
                        </label>
                        <input
                          type="text"
                          value={`${gradeData.pay_scale_from || 0} -${gradeData.pay_scale_to || 0
                            }`}
                          className="form-control"
                          id="exampleFormControlInput14"
                          disabled
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput14"
                          className="form-label fw-bold small"
                        >
                          Organization
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="exampleFormControlInput14"
                          defaultValue={getPromotionData.organization}
                          {...register3("organization")}
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="inputGroupSelect12"
                          className="form-label fw-bold small"
                        >
                          PostingType
                        </label>
                        <select
                          className="form-select"
                          id="inputGroupSelect12"
                          {...register3("type_posting")}
                        >
                          <option value="">{getPromotionData.type_posting}</option>
                          <option value="Regular">Regular</option>
                          <option value="Deputation">Deputation</option>
                          <option value="Lien">Lien</option>
                          <option value="4">others</option>
                        </select>
                        <div className="mb-3">
                          <label
                            htmlFor="exampleFormControlInput14"
                            className="form-label fw-bold small"
                          >
                            Location
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="exampleFormControlInput14"
                            defaultValue={getPromotionData.location}
                            {...register3("location")}
                          />
                        </div>

                        <div className="mb-3">
                          <label
                            htmlFor="exampleFormControlInput17"
                            className="form-label fw-bold small"
                          >
                            From Date
                          </label>
                          <input
                            type="date"
                            className="form-control"
                            id="exampleFormControlInput17"
                            {...register3("date_from")}
                          />

                          {/* <input type="date" className="form-control" id="exampleFormControlInput17" {...register("date_from")} /> */}
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor="exampleFormControlInput17"
                            className="form-label fw-bold small"
                          >
                            To Date
                          </label>
                          <input
                            type="date"
                            className="form-control"
                            id="exampleFormControlInput17"
                            {...register3("date_to")}
                          />
                          {/* <input type="date" className="form-control" id="exampleFormControlInput17"  {...register("date_to")} /> */}
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor="exampleFormControlInput17"
                            className="form-label fw-bold small"
                          >
                            Promotion Date
                          </label>

                          <input
                            type="date"
                            className="form-control"
                            id="exampleFormControlInput17"
                            {...register3("promotion_date")}
                          />
                          {/* <input type="date" className="form-control" id="exampleFormControlInput17"   {...register("promotion_date")} /> */}
                        </div>
                      </div>
                      <div className="modal-footer">
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
                    </div>
                  </form>
                </div>
              </div>
            </div>
            {/* Post Update modal   */}

            <div
              id="post_info_modal"
              className="modal custom-modal fade"
              role="dialog"
            >
              <div
                className="modal-dialog modal-dialog-centered modal-lg"
                role="document"
              >
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Update Post</h5>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                  <form onSubmit={handleSubmitPostUpdate(onSubmitPostUpdate)}>
                    <div className="modal-body text-start">
                      <div className="mb-3 row">
                        <div className="col-sm-6">
                          <label
                            htmlFor="exampleFormControlInput14"
                            className="form-label fw-bold small"
                          >
                            Place From
                          </label>
                          <input
                            type="text"
                            defaultValue={getPostData.place_from}
                            className="form-control"
                            id="exampleFormControlInput14"
                            {...registerPostUpdate("PLACE_FROM")}
                          />
                        </div>
                        <div className="col-sm-6">
                          <label
                            htmlFor="exampleFormControlInput14"
                            className="form-label fw-bold small"
                          >
                            Place To
                          </label>
                          <input
                            type="text"
                            defaultValue={getPostData.place_to}
                            className="form-control"
                            id="exampleFormControlInput14"
                            {...registerPostUpdate("PLACE_TO")}
                          />
                        </div>
                      </div>
                      <div className="mb-3 row">
                        <div className="col-sm-6">
                          <label
                            htmlFor="exampleFormControlInput14"
                            className="form-label fw-bold small"
                          >
                            From
                          </label>
                          <input
                            type="date"
                            className="form-control"
                            id="exampleFormControlInput14"
                            {...registerPostUpdate("POS_FROM_DATE")}
                          />
                        </div>
                        <div className="col-sm-6">
                          <label
                            htmlFor="exampleFormControlInput14"
                            className="form-label fw-bold small"
                          >
                            To
                          </label>
                          <input
                            type="date"
                            className="form-control"
                            id="exampleFormControlInput14"
                            {...registerPostUpdate("POS_TO_DATE")}
                          />
                        </div>
                      </div>
                      <div className="mb-3 row">
                        <div className="col-sm-6">
                          <label
                            htmlFor="exampleFormControlInput14"
                            className="form-label fw-bold small"
                          >
                            Designation
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="exampleFormControlInput14"
                            defaultValue={getPostData.designation}
                            {...registerPostUpdate("DESIGNATION")}
                          />
                        </div>
                        <div className="col-sm-6">
                          <label
                            htmlFor="exampleFormControlInput14"
                            className="form-label fw-bold small"
                          >
                            Grade
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="exampleFormControlInput14"
                            defaultValue={getPostData.grade}
                            {...registerPostUpdate("GRADE")}
                          />
                        </div>
                      </div>

                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput14"
                          className="form-label fw-bold small"
                        >
                          Institute Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="exampleFormControlInput14"
                          defaultValue={getPostData.institute_name}
                          {...registerPostUpdate("INSTITUTE_NAME")}
                        />
                      </div>

                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput14"
                          className="form-label fw-bold small"
                        >
                          Post
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="exampleFormControlInput14"
                          defaultValue={getPostData.post}
                          {...registerPostUpdate("POST")}
                        />
                      </div>

                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlTextarea1"
                          className="form-label fw-bold small"
                        >
                          Reason
                        </label>
                        <textarea
                          className="form-control"
                          id="exampleFormControlTextarea1"
                          rows="5"
                          defaultValue={getPostData.details}
                          {...registerPostUpdate("DETAILS")}
                        ></textarea>
                      </div>

                      <div className="modal-footer">
                        <button
                          type="submit"
                          className="btn bgColor text-white px-5 py-2 rounded"
                        >
                          Update
                        </button>
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
                </div>
              </div>
            </div>

            {/*Add Post Informations  */}

            <div id="addPost" className="modal custom-modal fade" role="dialog">
              <div
                className="modal-dialog modal-lg modal-dialog-centered"
                role="document"
              >
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Add new Posting</h5>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                  <form onSubmit={handleSubmitPost(onSubmitPost)}>
                    <div className="modal-body text-start">
                      <div className="mb-3 row">
                        <div className="col-sm-6">
                          <label
                            htmlFor="exampleFormControlInput14"
                            className="form-label fw-bold small"
                          >
                            Place From
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="exampleFormControlInput14"
                            placeholder="Enter Location"
                            {...registerPost("PLACE_FROM")}
                          />
                        </div>
                        <div className="col-sm-6">
                          <label
                            htmlFor="exampleFormControlInput14"
                            className="form-label fw-bold small"
                          >
                            Place To
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="exampleFormControlInput14"
                            placeholder="Enter Location"
                            {...registerPost("PLACE_TO")}
                          />
                        </div>
                      </div>
                      <div className="mb-3 row">
                        <div className="col-sm-6">
                          <label
                            htmlFor="exampleFormControlInput14"
                            className="form-label fw-bold small"
                          >
                            From
                          </label>
                          <input
                            type="date"
                            className="form-control"
                            id="exampleFormControlInput14"
                            placeholder="Enter Location"
                            {...registerPost("POS_FROM_DATE")}
                          />
                        </div>
                        <div className="col-sm-6">
                          <label
                            htmlFor="exampleFormControlInput14"
                            className="form-label fw-bold small"
                          >
                            To
                          </label>
                          <input
                            type="date"
                            className="form-control"
                            id="exampleFormControlInput14"
                            placeholder="Enter Location"
                            {...registerPost("POS_TO_DATE")}
                          />
                        </div>
                      </div>
                      <div className="mb-3 row">
                        <div className="col-sm-6">
                          <label
                            htmlFor="exampleFormControlInput14"
                            className="form-label fw-bold small"
                          >
                            Designation
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="exampleFormControlInput14"
                            placeholder="Enter Location"
                            {...registerPost("DESIGNATION")}
                          />
                        </div>
                        <div className="col-sm-6">
                          <label
                            htmlFor="exampleFormControlInput14"
                            className="form-label fw-bold small"
                          >
                            Grade
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="exampleFormControlInput14"
                            placeholder="Enter Location"
                            {...registerPost("GRADE")}
                          />
                        </div>
                      </div>

                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput14"
                          className="form-label fw-bold small"
                        >
                          Institute Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="exampleFormControlInput14"
                          placeholder="Enter Location"
                          {...registerPost("INSTITUTE_NAME")}
                        />
                      </div>

                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput14"
                          className="form-label fw-bold small"
                        >
                          Post
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="exampleFormControlInput14"
                          placeholder="Enter Location"
                          {...registerPost("POST")}
                        />
                      </div>

                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlTextarea1"
                          className="form-label fw-bold small"
                        >
                          Reason
                        </label>
                        <textarea
                          className="form-control"
                          id="exampleFormControlTextarea1"
                          rows="5"
                          placeholder="Enter Appeal"
                          {...registerPost("DETAILS")}
                        ></textarea>
                      </div>

                      <div className="modal-footer">
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
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/*ADD Education Informations  */}

            <div
              id="addEducation"
              className="modal custom-modal fade"
              role="dialog"
            >
              <div
                className="modal-dialog modal-dialog-centered modal-lg"
                role="document"
              >
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Add Education</h5>
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
                    <form onSubmit={handleSubmit17(onSubmitAddEducation)}>
                      <div className="modal-body text-start">
                        <div className="mb-3">
                          <label
                            htmlFor="inputGroupSelect12"
                            className="form-label fw-bold small"
                          >
                            Choose an Employee
                          </label>
                          <select
                            className="form-select"
                            id="inputGroupSelect12"
                            {...register17("employe_id")}
                          >
                            <option value={employeeData.employe_id}>
                              {" "}
                              {employeeData.name_english}{" "}
                            </option>
                          </select>
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor="exampleFormControlInput14"
                            className="form-label fw-bold small"
                          >
                            Institution Name
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="exampleFormControlInput14"
                            placeholder="Institution Name"
                            {...register17("name_institution")}
                          />
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor="exampleFormControlInput14"
                            className="form-label fw-bold small"
                          >
                            Principal Subject
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="exampleFormControlInput14"
                            placeholder="Principal Subject"
                            {...register17("principal_subject")}
                          />
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor="exampleFormControlInput14"
                            className="form-label fw-bold small"
                          >
                            Degree/Diploma
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="exampleFormControlInput14"
                            placeholder="Degree/Diploma"
                            {...register17("degree_diploma")}
                          />
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor="exampleFormControlInput14"
                            className="form-label fw-bold small"
                          >
                            Passing Year
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="exampleFormControlInput14"
                            placeholder="Passing Year"
                            {...register17("passigne_year")}
                          />
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor="exampleFormControlInput14"
                            className="form-label fw-bold small"
                          >
                            Result
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="exampleFormControlInput14"
                            placeholder="Result"
                            {...register17("education_result")}
                          />
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor="exampleFormControlInput14"
                            className="form-label fw-bold small"
                          >
                            Distinction
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="exampleFormControlInput14"
                            placeholder="Distinction"
                            {...register17("distinction")}
                          />
                        </div>

                        <div className="modal-footer">
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
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            {/*Update Education Informations  */}

            <div
              id="education_info_modal"
              className="modal custom-modal fade"
              role="dialog"
            >
              <div
                className="modal-dialog modal-dialog-centered modal-lg"
                role="document"
              >
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Education</h5>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                  <form onSubmit={handleSubmit16(onSubmitEducation)}>
                    <div className="modal-body text-start">
                      <div className="mb-3">
                        <label
                          htmlFor="inputGroupSelect12"
                          className="form-label fw-bold small"
                        >
                          Choose an Employee
                        </label>
                        <select
                          className="form-select"
                          id="inputGroupSelect12"
                          {...register16("employe_id")}
                        >
                          <option value={employeeData.employe_id}>
                            {" "}
                            {employeeData.name_english}{" "}
                          </option>
                        </select>
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput14"
                          className="form-label fw-bold small"
                        >
                          Institution Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="exampleFormControlInput14"
                          defaultValue={getEducationData.name_institution}
                          {...register16("name_institution")}
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput14"
                          className="form-label fw-bold small"
                        >
                          Principal Subject
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="exampleFormControlInput14"
                          defaultValue={getEducationData.principal_subject}
                          {...register16("principal_subject")}
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput14"
                          className="form-label fw-bold small"
                        >
                          Degree/Diploma
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="exampleFormControlInput14"
                          defaultValue={getEducationData.degree_diploma}
                          {...register16("degree_diploma")}
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput14"
                          className="form-label fw-bold small"
                        >
                          Passing Year
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="exampleFormControlInput14"
                          defaultValue={getEducationData.passigne_year}
                          {...register16("passigne_year")}
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput14"
                          className="form-label fw-bold small"
                        >
                          Result
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="exampleFormControlInput14"
                          defaultValue={getEducationData.education_result}
                          {...register16("education_result")}
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput14"
                          className="form-label fw-bold small"
                        >
                          Distinction
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="exampleFormControlInput14"
                          defaultValue={getEducationData.distinction}
                          {...register16("distinction")}
                        />
                      </div>

                      <div className="modal-footer">
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
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Training Informations  */}

            <div
              id="training_info_modal"
              className="modal custom-modal fade"
              role="dialog"
            >
              <div
                className="modal-dialog modal-dialog-centered modal-lg"
                role="document"
              >
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Training</h5>
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
                    <form onSubmit={handleSubmit2(onSubmitTraining)}>
                      <div className="modal-body text-start">
                        <div className="mb-3">
                          <label
                            htmlFor="inputGroupSelect12"
                            className="form-label fw-bold small"
                          >
                            Choose an Employee
                          </label>
                          <select
                            className="form-select"
                            id="inputGroupSelect12"
                            {...register2("employe_id")}
                          >
                            <option value={getTrainingData.employe_id}>
                              {" "}
                              {getTrainingData.name_english}{" "}
                            </option>
                          </select>
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor="inputGroupSelect12"
                            className="form-label fw-bold small"
                          >
                            Local/Foreign
                          </label>
                          <select
                            className="form-select"
                            id="inputGroupSelect12"
                            {...register2("training_type")}
                          >
                            <option value={getTrainingData.training_type}>
                              {getTrainingData.training_type}
                            </option>
                            <option value="Local">Local</option>
                            <option value="Foreign">Foreign</option>
                          </select>
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor="exampleFormControlInput14"
                            className="form-label fw-bold small"
                          >
                            Course Title
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="exampleFormControlInput14"
                            defaultValue={getTrainingData.course_title}
                            placeholder="Enter Course Title"
                            {...register2("course_title")}
                          />
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor="exampleFormControlInput14"
                            className="form-label fw-bold small"
                          >
                            Institution
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="exampleFormControlInput14"
                            defaultValue={getTrainingData.institution}
                            placeholder="Enter Institution"
                            {...register2("institution")}
                          />
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor="exampleFormControlInput14"
                            className="form-label fw-bold small"
                          >
                            Location
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="exampleFormControlInput14"
                            defaultValue={getTrainingData.location}
                            placeholder="Enter Location"
                            {...register2("location")}
                          />
                        </div>

                        <div className="mb-3">
                          <label
                            htmlFor="exampleFormControlInput17"
                            className="form-label fw-bold small"
                          >
                            From Date
                          </label>
                          <input
                            type="date"
                            className="form-control"
                            id="exampleFormControlInput14"
                            {...register2("date_from")}
                          />

                          {/* <input type="date" className="form-control" id="exampleFormControlInput17" {...register("date_from")} /> */}
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor="exampleFormControlInput17"
                            className="form-label fw-bold small"
                          >
                            To Date
                          </label>
                          <input
                            type="date"
                            className="form-control"
                            id="exampleFormControlInput14"
                            {...register2("date_to")}
                          />
                          {/* <input type="date" className="form-control" id="exampleFormControlInput17" {...register("date_to")} /> */}
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor="exampleFormControlInput17"
                            className="form-label fw-bold small"
                          >
                            Position
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="exampleFormControlInput17"
                            defaultValue={getTrainingData.position}
                            placeholder="Enter Position"
                            {...register2("position")}
                          />
                        </div>

                        <div className="mb-3">
                          <label
                            htmlFor="exampleFormControlInput17"
                            className="form-label fw-bold small"
                          >
                            Training Material
                          </label>
                          <input
                            type="file"
                            className="form-control"
                            id="exampleFormControlInput17"
                            defaultValue={getTrainingData.material_file}
                            {...register2("material_file")}
                          />
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor="exampleFormControlInput17"
                            className="form-label fw-bold small"
                          >
                            Training Certificate
                          </label>
                          <input
                            type="file"
                            className="form-control"
                            id="exampleFormControlInput17"
                            defaultValue={getTrainingData.certificate_file}
                            placeholder="Enter Position"
                            {...register2("certificate_file")}
                          />
                        </div>
                        <div className="modal-footer">
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
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            {/*update Leave Informations  */}

            <div
              id="leave_info_modal"
              className="modal custom-modal fade"
              role="dialog"
            >
              <div
                className="modal-dialog modal-dialog-centered modal-lg"
                role="document"
              >
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Leave</h5>
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
                    <form onSubmit={handleSubmit1(onSubmitLeave)}>
                      <div className="row">
                        <div className="col-sm-6">
                          <div className="mb-3">
                            <label
                              htmlFor="inputGroupSelect12"
                              className="form-label fw-bold small"
                            >
                              Choose an Employee
                            </label>
                            <select
                              className="form-select"
                              id="inputGroupSelect12"
                              {...register1("employe_id")}
                            >
                              <option value={getLeaveData.employe_id}>
                                {" "}
                                {getLeaveData.emp_name}{" "}
                              </option>
                            </select>
                          </div>

                          <div className="mb-3">
                            <label
                              htmlFor="exampleFormControlInput17"
                              className="form-label small fw-bold"
                            >
                              From Date
                            </label>
                            <input type="date"
                              placeholder="dd-mm-yyyy"
                              className="form-control"
                              id="exampleFormControlInput14"
                              {...register1("date_from")}
                            />
                            {/* <DateTimePicker
                           format={`dd/MM/yyyy 00:00`}
                           className="w-100"
                           onChange={setLeaveFromDate}
                           value={leaveFromDate}
                         /> */}
                            {/* <input type="date" className="form-control" id="exampleFormControlInput17" {...register("date_from")} /> */}
                          </div>

                          <div className="mb-3">
                            <label
                              htmlFor="exampleFormControlInput17"
                              className="form-label small fw-bold"
                            >
                              To Date
                            </label>
                            <input type="date"
                              placeholder="dd-mm-yyyy"
                              className="form-control"
                              id="exampleFormControlInput14"
                              {...register1("date_to")}
                            />
                            {/* <DateTimePicker
                           format={`dd/MM/yyyy 00:00`}
                           className="w-100"
                           onChange={setLeaveToDate}
                           value={leaveToDate}
                         /> */}
                            {/* <input type="date" className="form-control" id="exampleFormControlInput17"  {...register("date_to")} /> */}
                          </div>

                          <div className="mb-3">
                            <label
                              htmlFor="exampleFormControlInput14"
                              className="form-label fw-bold small"
                            >
                              Duration
                            </label>
                            <input
                              type="number"
                              className="form-control"
                              id="exampleFormControlInput14"
                              defaultValue={getLeaveData.duration}
                              {...register1("duration")}
                            />
                          </div>

                          <div className="mb-3">
                            <label
                              htmlFor="inputGroupSelect12"
                              className="form-label fw-bold small"
                            >
                              Name of Leave
                            </label>
                            <select
                              className="form-select"
                              id="inputGroupSelect12"
                              {...register1("leave_id")}
                            >
                              <option value={getLeaveData.leave_id}>
                                {getLeaveData.leave_type}
                              </option>
                              {leaveType.map((data) => (
                                <option value={data.leave_id}>
                                  {data.leave_type}
                                </option>
                              ))}
                              ;
                            </select>
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="mb-3">
                            <label
                              htmlFor="exampleFormControlInput14"
                              className="form-label fw-bold small"
                            >
                              Cause
                            </label>
                            <input
                              defaultValue={getLeaveData.cause}
                              type="text"
                              className="form-control"
                              id="exampleFormControlInput14"
                              {...register1("cause")}
                            />
                          </div>

                          <div className="mb-3">
                            <label
                              htmlFor="exampleFormControlTextarea1"
                              className="form-label fw-bold small"
                            >
                              Comments Employee
                            </label>
                            <textarea
                              className="form-control"
                              rows="5"
                              defaultValue={getLeaveData.employee_memo}
                              {...register1("employee_memo")}
                            ></textarea>
                          </div>
                          <div className="mb-3">
                            <label
                              htmlFor="exampleFormControlTextarea2"
                              className="form-label fw-bold small"
                            >
                              Superior Memo
                            </label>
                            <textarea
                              defaultValue={getLeaveData.memo_validator}
                              className="form-control"
                              rows="5"
                              {...register1("memo_validator")}
                            ></textarea>
                          </div>
                        </div>
                      </div>
                      <div className="modal-footer">
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

            {/*Update Loan Informations  */}

            <div
              id="loan_info_modal"
              className="modal custom-modal fade"
              role="dialog"
            >
              <div
                className="modal-dialog modal-dialog-centered modal-lg"
                role="document"
              >
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Loan</h5>
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
                    <form onSubmit={handleSubmit(onSubmitLoan)}>
                      <div className="row">
                        <div className="col-sm-6">
                          <div className="mb-3">
                            <label
                              htmlFor="inputGroupSelect12"
                              className="form-label fw-bold small"
                            >
                              Choose an Employee
                            </label>
                            <select
                              className="form-select"
                              id="inputGroupSelect12"
                              {...register("employe_id")}
                            >
                              <option value={getLoanData.employe_id}>
                                {getLoanData.name_english}{" "}
                              </option>
                            </select>
                          </div>
                          <div className="mb-3">
                            <label
                              htmlFor="inputGroupSelect12"
                              className="form-label fw-bold small"
                            >
                              Loan Type
                            </label>
                            <select
                              className="form-select"
                              id="inputGroupSelect12"
                              {...register("loan_id")}
                            >
                              <option value=""> {getLoanData.loan_type}</option>
                              {loanType.map((data) => (
                                <option value={data.loan_id}>
                                  {data.loan_type}
                                </option>
                              ))}
                              ;
                            </select>
                          </div>
                          <div className="mb-3">
                            <label
                              htmlFor="exampleFormControlInput14"
                              className="form-label fw-bold small"
                            >
                              Total Loan Amount
                            </label>
                            <input
                              type="number"
                              className="form-control"
                              id="exampleFormControlInput14"
                              defaultValue={getLoanData.loan_amount}
                              {...register("loan_amount")}
                            />
                          </div>

                          <div className="mb-3">
                            <label
                              htmlFor="exampleFormControlInput14"
                              className="form-label fw-bold small"
                            >
                              Loan Amount in Words
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="exampleFormControlInput14"
                              placeholder="Loan Amount in Words"
                              defaultValue={getLoanData.loan_amount_word}
                              {...register("loan_amount_word")}
                            />
                          </div>
                          <div className="mb-3">
                            <label
                              htmlFor="exampleFormControlInput14"
                              className="form-label fw-bold small"
                            >
                              Number Month
                            </label>
                            <input
                              type="number"
                              className="form-control"
                              id="exampleFormControlInput14"
                              placeholder="Number Month"
                              defaultValue={getLoanData.number_month}
                              {...register("number_month")}
                            />
                          </div>
                          <div className="mb-3">
                            <label
                              htmlFor="exampleFormControlInput17"
                              className="form-label fw-bold small"
                            >
                              Loan Termination Date
                            </label>
                            <input type="date"
                              placeholder="dd-mm-yyyy"
                              className="form-control"
                              id="exampleFormControlInput17"
                              {...register("termination_date")}
                            />
                            {/* <input type="date" className="form-control" id="exampleFormControlInput17" {...register("termination_date")} /> */}
                          </div>
                          <div className="mb-3">
                            <label
                              htmlFor="exampleFormControlInput17"
                              className="form-label fw-bold small"
                            >
                              Paid Date
                            </label>
                            <input type="date"
                              placeholder="dd-mm-yyyy"
                              className="form-control"
                              id="exampleFormControlInput17"
                              {...register("date_status")}
                            />
                            {/* <input type="date" className="form-control" id="exampleFormControlInput17"  {...register("date_status")} /> */}
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="mb-3">
                            <label
                              htmlFor="exampleFormControlInput17"
                              className="form-label fw-bold small"
                            >
                              Sanction Date
                            </label>
                            <input type="date"
                              placeholder="dd-mm-yyyy"
                              className="form-control"
                              id="exampleFormControlInput17"
                              {...register("sanction_date")}
                            />
                            {/* <input type="date" className="form-control" id="exampleFormControlInput17" {...register("sanction_date")} /> */}
                          </div>

                          <div className="mb-3">
                            <label
                              htmlFor="inputGroupSelect12"
                              className="form-label fw-bold small"
                            >
                              Source of Fund
                            </label>
                            <select
                              className="form-select"
                              id="inputGroupSelect12"
                              {...register("loan_funds_id")}
                            >
                              <option value="">{getLoanData.loan_funds}</option>
                              {loanFunds.map((data) => (
                                <option value={data.loan_funds_id}>
                                  {data.loan_funds}
                                </option>
                              ))}
                              ;
                            </select>
                          </div>
                          <div className="mb-3">
                            <label
                              htmlFor="exampleFormControlTextarea1"
                              className="form-label fw-bold small"
                            >
                              Memo
                            </label>
                            <textarea
                              className="form-control"
                              id="exampleFormControlTextarea1"
                              rows="5"
                              defaultValue={getLoanData.memo}
                              {...register("memo")}
                            ></textarea>
                          </div>
                          <div className="mb-3">
                            <label
                              htmlFor="exampleFormControlInput14"
                              className="form-label fw-bold small"
                            >
                              Installment
                            </label>
                            <input
                              type="number"
                              className="form-control"
                              id="exampleFormControlInput14"
                              defaultValue={getLoanData.installment}
                              {...register("installment")}
                            />
                          </div>

                          <div className="mb-3">
                            <label
                              htmlFor="exampleFormControlTextarea1"
                              className="form-label fw-bold small"
                            >
                              Comments Employee
                            </label>
                            <textarea
                              className="form-control"
                              id="exampleFormControlTextarea1"
                              rows="5"
                              defaultValue={getLoanData.employee_memo}
                              {...register("employee_memo")}
                            ></textarea>
                          </div>
                        </div>
                      </div>
                      <div className="modal-footer">
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

            {/*Add Loan Informations  */}

            <div id="addLoan" className="modal custom-modal fade" role="dialog">
              <div
                className="modal-dialog modal-dialog-centered modal-lg"
                role="document"
              >
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Add new Loan Request</h5>
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
                    <form onSubmit={handleSubmitAddLoan(onSubmitAddLoan)}>
                      <div className="row">
                        <div className="col-sm-6">
                          <div className="mb-3">
                            <label
                              htmlFor="inputGroupSelect12"
                              className="form-label fw-bold small"
                            >
                              Choose an Employee
                            </label>
                            <select
                              className="form-select"
                              id="inputGroupSelect12"
                              {...registerAddLoan("employe_id")}
                            >
                              <option value={employeeData.employe_id}>
                                {" "}
                                {employeeData.name_english}{" "}
                              </option>
                            </select>
                          </div>
                          <div className="mb-3">
                            <label
                              htmlFor="inputGroupSelect12"
                              className="form-label fw-bold small"
                            >
                              Loan Type
                            </label>
                            <select
                              className="form-select"
                              id="inputGroupSelect12"
                              {...registerAddLoan("loan_id")}
                            >
                              {loanType.map((data) => (
                                <option value={data.loan_id}>
                                  {data.loan_type}
                                </option>
                              ))}
                              ;
                            </select>
                          </div>
                          <div className="mb-3">
                            <label
                              htmlFor="exampleFormControlInput14"
                              className="form-label fw-bold small"
                            >
                              Total Loan Amount
                            </label>
                            <input
                              type="number"
                              className="form-control"
                              id="exampleFormControlInput14"
                              placeholder="Total Loan Amount"
                              {...registerAddLoan("loan_amount")}
                            />
                          </div>

                          <div className="mb-3">
                            <label
                              htmlFor="exampleFormControlInput14"
                              className="form-label fw-bold small"
                            >
                              Loan Amount in Words
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="exampleFormControlInput14"
                              placeholder="Loan Amount in Words"
                              {...registerAddLoan("loan_amount_word")}
                            />
                          </div>
                          <div className="mb-3">
                            <label
                              htmlFor="exampleFormControlInput14"
                              className="form-label fw-bold small"
                            >
                              Number Month
                            </label>
                            <input
                              type="number"
                              className="form-control"
                              id="exampleFormControlInput14"
                              placeholder="Number Month"
                              {...registerAddLoan("number_month")}
                            />
                          </div>
                          <div className="mb-3">
                            <label
                              htmlFor="exampleFormControlInput17"
                              className="form-label fw-bold small"
                            >
                              Loan Termination Date
                            </label>
                            <input type="date"
                              placeholder="dd-mm-yyyy"
                              className="form-control"
                              id="exampleFormControlInput14"
                              {...registerAddLoan("termination_date")}
                            />
                            {/* <input type="date" className="form-control" id="exampleFormControlInput17" {...register("termination_date")} /> */}
                          </div>
                          <div className="mb-3">
                            <label
                              htmlFor="exampleFormControlInput17"
                              className="form-label fw-bold small"
                            >
                              Paid Date
                            </label>
                            <input type="date"
                              placeholder="dd-mm-yyyy"
                              className="form-control"
                              id="exampleFormControlInput14"
                              {...registerAddLoan("date_status")}
                            />
                            {/* <input type="date" className="form-control" id="exampleFormControlInput17"  {...register("date_status")} /> */}
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="mb-3">
                            <label
                              htmlFor="exampleFormControlInput17"
                              className="form-label fw-bold small"
                            >
                              Sanction Date
                            </label>
                            <input type="date"
                              placeholder="dd-mm-yyyy"
                              className="form-control"
                              id="exampleFormControlInput14"
                              {...registerAddLoan("sanction_date")}
                            />
                            {/* <input type="date" className="form-control" id="exampleFormControlInput17" {...register("sanction_date")} /> */}
                          </div>

                          <div className="mb-3">
                            <label
                              htmlFor="inputGroupSelect12"
                              className="form-label fw-bold small"
                            >
                              Source of Fund
                            </label>
                            <select
                              className="form-select"
                              id="inputGroupSelect12"
                              {...registerAddLoan("loan_funds_id")}
                            >
                              <option value="">Select Source of Fund</option>
                              {loanFunds.map((data) => (
                                <option value={data.loan_funds_id}>
                                  {data.loan_funds}
                                </option>
                              ))}
                              ;
                            </select>
                          </div>
                          <div className="mb-3">
                            <label
                              htmlFor="exampleFormControlTextarea1"
                              className="form-label fw-bold small"
                            >
                              Memo
                            </label>
                            <textarea
                              className="form-control"
                              id="exampleFormControlTextarea1"
                              rows="5"
                              placeholder="Enter Memo"
                              {...registerAddLoan("memo")}
                            ></textarea>
                          </div>
                          <div className="mb-3">
                            <label
                              htmlFor="exampleFormControlInput14"
                              className="form-label fw-bold small"
                            >
                              Installment
                            </label>
                            <input
                              type="number"
                              className="form-control"
                              id="exampleFormControlInput14"
                              placeholder="Installment"
                              {...registerAddLoan("installment")}
                            />
                          </div>

                          <div className="mb-3">
                            <label
                              htmlFor="exampleFormControlTextarea1"
                              className="form-label fw-bold small"
                            >
                              Comments Employee
                            </label>
                            <textarea
                              className="form-control"
                              id="exampleFormControlTextarea1"
                              rows="5"
                              placeholder="Comments Employee"
                              {...registerAddLoan("employee_memo")}
                            ></textarea>
                          </div>
                        </div>
                      </div>
                      <div className="modal-footer">
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
      }
    </div>
  );
};
export default EmployeeProfile;
