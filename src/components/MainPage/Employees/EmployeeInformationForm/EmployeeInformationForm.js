import React, { useCallback, useEffect, useState } from 'react';
import MultiStep from './FormSteps/FormIndex';
import EmployeeDetails from './FormSteps/EmployeeDetails';
import JobDetails from './FormSteps/JobDetails';
import GeneralEmergencyContact from './FormSteps/GeneralEmergencyContact';
import AddressInformation from './FormSteps/AddressInformation';
import FamilyInformation from './FormSteps/FamilyInformation';
import Documents from './FormSteps/Documents';
import './EmployeeInformationForm.css';
import EmployeeSubmit from './FormSteps/EmployeeSubmit';
import EducationDetails from './FormSteps/EducationDetails';
// import EmployeeDetails from './FormSteps/EmployeeDetails';
const EmployeeInformationForm = () => {
    const [count, setCount] = useState(0);

    const callback = (count) => {
        setCount(count + 2);
    }
    const callbackA = (count) => {
        setCount(count + 3);
    }
    const callbackB = (count) => {
        setCount(count + 4);
    }
    const callbackC = (count) => {
        setCount(count + 5);
    }
    const callbackD = (count) => {
        setCount(count + 6);
    }
    const callbackE = (count) => {
        setCount(count + 7);
    }
    // const callbackF = (count) => {
    //     setCount(count + 8);
    // }
    useEffect(() => {
        setCount(0);
    }, [count]);



    const steps = [
        { name: 'StepOne', component: <EmployeeDetails parentCallback={callback} /> },
        { name: 'StepTwo', component: <JobDetails parentCallbackA={callbackA} /> },
        { name: 'StepThree', component: <GeneralEmergencyContact parentCallbackB={callbackB} /> },
        { name: 'StepFour', component: <AddressInformation parentCallbackC={callbackC} /> },
        { name: 'StepFive', component: <FamilyInformation parentCallbackD={callbackD} /> },
        { name: 'StepSix', component: <Documents parentCallbackE={callbackE} /> },
        // { name: 'StepSeven', component: <EducationDetails parentCallbackF={callbackF} /> },
        { name: 'StepEight', component: <EmployeeSubmit /> },
    ];

    // custom styles

    const prevStyle = {
        background: '#118DFA',
        padding: '5px 2% ',
        marginRight: '10px',
        color: 'white',
        borderRadius: '10px',
        backgroundImage: 'linear-gradient(to right, #667EEA 0%, #764BA2 100%)'

    }
    const nextStyle = {
        background: '#118DFA',
        padding: '5px 2% ',
        marginRight: '10px',
        color: 'white',
        borderRadius: '10px',
        backgroundImage: 'linear-gradient(to right, #667EEA 0%, #764BA2 100%)'

    }

    return (
        <div className='page-wrapper pb-5  mb-5'>
            <div className="row">
                <div className="col-sm-1">

                </div>
                <div className="col-sm-10">
                    <div className=''>
                        <MultiStep chack={count} activeStep={0} steps={steps} prevStyle={prevStyle} nextStyle={nextStyle} />
                    </div>
                    <div className="col-sm">

                    </div>
                </div>
            </div>

        </div>
    );
};

export default EmployeeInformationForm;