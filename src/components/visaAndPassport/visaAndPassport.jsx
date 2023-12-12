import React, { useEffect, useState } from "react";
import "./visaAndPassport.css";
import EmissionVisa from "./steps/emissionVisa/emissionVisa";
import RevokedVisa from "./steps/revokedVisa/revokedVisa";
import LostVisa from "./steps/lostVisa/lostVisa";
import Documents from "./steps/documents/documents";
import { useData } from "../../dataContext/dataContext";
import ds160Service from "../../services/ds160Service";

function VisaAndPassport(props) {
  const { data } = useData();
  const [activeStep, setActiveStep] = useState(1);
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

    const { passport, lost_or_stolen_passports } = data;

    isValid =
      passport.document_type &&
      passport.document_type !== "" &&
      passport.country &&
      passport.country !== "" &&
      passport.city &&
      passport.city !== "" &&
      passport.state &&
      passport.state !== "" &&
      passport.issuance_date &&
      passport.issuance_date !== "" &&
      passport.expiration_date &&
      passport.expiration_date !== "" &&
      (passport.lost_reason
        ? lost_or_stolen_passports[0].document_type &&
          lost_or_stolen_passports[0].document_type !== "" &&
          lost_or_stolen_passports[0].country &&
          lost_or_stolen_passports[0].country !== ""
        : true);

    return isValid;
  };

  const validateStep1 = () => {
    let isValid = false;

    const { old_visa } = data;

    if (!old_visa) {
      isValid = true;
      return isValid;
    }

    isValid =
      old_visa.consulate_id &&
      old_visa.issue_date &&
      old_visa.issue_date !== "" &&
      old_visa.expiration_date &&
      old_visa.expiration_date !== "" &&
      old_visa.number &&
      old_visa.number !== "";

    return isValid;
  };

  const validateStep2 = () => {
    let isValid = false;

    const { old_visa } = data;

    if (!old_visa?.revoked) {
      return true;
    }

    isValid = old_visa.revoked_reason && old_visa.revoked_reason;

    return isValid;
  };

  const handleNext = () => {
    if (activeStep == 3) {
      
      ds160Service.submit(data);
    }
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);

    setSkipped(newSkipped);

    if (activeStep === 3) {
      props.onVisaAndPassaportChange();
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const allComponents = [
    <Documents key="documents" validateStep={validateStep} />,
    <EmissionVisa key="fiveTravels" validateStep={validateStep} />,
    <RevokedVisa key="revokedVisa" validateStep={validateStep} />,
    <LostVisa key="lostVisa" />,
  ];

  const stepValidations = {
    0: validateStep0,
    1: validateStep1,
    2: validateStep2,
    // 3: validateStep3,
  };

  return (
    <div className="div-flex">
      <div className="div-margin" style={{ width: "100%" }}>
        <div>{allComponents[activeStep]}</div>

        <div
          style={{
            display: "flex",
            justifyContent: "end",
            marginRight: "-2rem",
            paddingBottom: "2rem",
          }}
          className={"all-buttons-form-container"}
        >
          <div style={{ paddingRight: "1rem" }}>
            <button
              type="button"
              className="button-style"
              disabled={activeStep === 0}
              onClick={handleBack}
              style={{ display: activeStep === 0 ? "none" : "" }}
            >
              <span className="font-button">Voltar</span>
            </button>
          </div>
          <div>
            <button
              type="button"
              disabled={isDisabled}
              className={`button-style ${isDisabled ? "disabled-button" : ""}`}
              onClick={handleNext}
            >
              <span className="font-button">{"Próxima"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VisaAndPassport;
