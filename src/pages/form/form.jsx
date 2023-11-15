import React, { useState } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import PersonalInformation from "../../components/personalInformation/personalInformation";
import AdditionalInformation from "../../components/additionalInformation/additionalInformation";
import AddressDelivery from "../../components/addressDelivery/addressDelivery";
import TravelInformation from "../../components/travelInformation/travelInformation";
import VisaAndPassport from "../../components/visaAndPassport/visaAndPassport";
import End from "../../components/end/end";
import "./form.css";

const steps = [
  "Informações pessoais",
  "Informações adicionais",
  "Endereço e residência",
  "Informações sobre a viagem",
  "Visto ou passaporte",
  "Fim",
];

function Form() {
  const [activeStep, setActiveStep] = useState(3);
  const [skipped, setSkipped] = useState(new Set());

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const addParents = () => {
    setActiveStep(0);
  };

  const allComponents = [
    <PersonalInformation key="personalInfo" onPersonalChange={handleNext} />,
    <AdditionalInformation
      key="additionalInfo"
      onAdditionalChange={handleNext}
    />,
    <AddressDelivery key="addressDelivery" onAddressChange={handleNext} />,
    <TravelInformation
      key="travelInformation"
      onTravelInformationChange={handleNext}
    />,
    <VisaAndPassport
      key="visaAndPassport"
      onVisaAndPassaportChange={handleNext}
    />,
    <End onEndChange={addParents} key="end" />,
  ];

  return (
    <div className="div-flex">
      <div
        className="div-width-step"
        style={{ display: activeStep === 5 ? "none" : "" }}
      >
        <Stepper
          activeStep={activeStep}
          orientation="vertical"
          style={{ paddingTop: "3rem" }}
        >
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps} className="style-step-1">
                  {label}
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </div>
      <div className="div-margin" style={{ width: "100%" }}>
        <div>{allComponents[activeStep]}</div>
      </div>
    </div>
  );
}

export default Form;
