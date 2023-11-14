import React, { useEffect, useState } from "react"
import './travelInformation.css'
import Travels from "./steps/travels/travels";
import FiveTravels from "./steps/fiveTravels/fiveTravels";
import TravelInformations from "./steps/travelInformations/travelInformations";
import ContactPoint from "./steps/contactPoint/contactPoint";
import Companion from "./steps/companion/companion";
import Payer from "./steps/payer/payer";
import { useData } from "../../dataContext/dataContext";



function TravelInformation(props) {
  const { data } = useData();
  const [activeStep, setActiveStep] = useState(2);
  const [skipped, setSkipped] = useState(new Set());
  const [isDisabled, setIsDisabled] = useState(true);


  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const validateStep = () => {
    const validateFunction = stepValidations[activeStep];
    if (validateFunction) {
      setIsDisabled(!validateFunction(data));
    }
  };

  const validateStep0 = () => {
    let isValid = false;

    const { visited_countries } = data;

    if (visited_countries !== null) {
      isValid =
        visited_countries.length > 0;
    } else {
      isValid = true;
    }

    return isValid;
  };

  const validateStep1 = () => {
    let isValid = false;

    const { us_visits } = data;

    if (!us_visits) {
      isValid = true;
      return isValid
    }

    isValid = us_visits.some(visit => visit.date !== "" && visit.length_of_stay !== 0);


    return isValid;
  };

  const validateStep2 = () => {
    let isValid = false;

    const { us_visits } = data;

    if (!us_visits) {
      isValid = true;
      return isValid
    }

    isValid = us_visits.some(visit => visit.date !== "" && visit.length_of_stay !== 0);


    return isValid;
  };




  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);


    setSkipped(newSkipped);
    if (activeStep === 5) {
      props.onTravelInformationChange();
    }

    setIsDisabled(true)
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const stepValidations = {
    0: validateStep0,
    1: validateStep1,
    2: validateStep2,
  };

  const allComponents = [
    <Travels key="travels" validateStep={validateStep} />,
    <FiveTravels key="fiveTravels" validateStep={validateStep} />,
    <TravelInformations key="travelInformations" validateStep={validateStep} />,
    <ContactPoint key="contactPoint" />,
    <Companion key="companion" />,
    <Payer key="payer" />
  ];

  return (
    <div className='div-flex'>
      <div className="div-margin" style={{ width: '100%' }}>
        <div >
          {allComponents[activeStep]}
        </div>

        <div style={{ display: 'flex', justifyContent: 'end', marginRight: '-2rem', paddingBottom: '2rem' }}>
          <div style={{ paddingRight: '1rem' }}>
            <button
              type='button'
              className='button-style'
              disabled={activeStep === 0}
              onClick={handleBack}
              style={{ display: activeStep === 0 ? 'none' : '' }}
            >
              <span className='font-button'>Voltar</span>
            </button>
          </div>
          <div>
            <button
              type='button'
              disabled={isDisabled}
              className={`button-style ${isDisabled ? "disabled-button" : ""}`}
              onClick={handleNext}
            >
              <span className='font-button'>{'Próxima'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TravelInformation
