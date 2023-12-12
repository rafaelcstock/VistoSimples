import React, { useEffect, useState } from "react";
import "./addressDelivery.css";
import InformationResidence from "./steps/informationResidence/informationResidence";
import Adress from "./steps/adress/adress";
import { useData } from "../../dataContext/dataContext";

const steps = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"];

function AddressDelivery(props) {
  const { data } = useData();
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [isDisabled, setIsDisabled] = useState(null);

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

    const { address, permanent_resident_other_country } = data;

    isValid =
      address.street &&
      address.street !== "" &&
      address.city &&
      address.city !== "" &&
      address.state &&
      address.state !== "" &&
      address.zip_code &&
      address.zip_code !== "" &&
      address.country &&
      address.country !== "";

    if (permanent_resident_other_country) {
      isValid =
        permanent_resident_other_country &&
        permanent_resident_other_country !== " " &&
        address.street &&
        address.street !== "" &&
        address.city &&
        address.city !== "" &&
        address.state &&
        address.state !== "" &&
        address.zip_code &&
        address.zip_code !== "" &&
        address.country &&
        address.country !== "";
    }

    return isValid;
  };

  const validateStep1 = () => {
    let isValid = false;

    const { mailing_address } = data;

    isValid =
      mailing_address.street &&
      mailing_address.street !== "" &&
      mailing_address.city &&
      mailing_address.city !== "" &&
      mailing_address.state &&
      mailing_address.state !== "" &&
      mailing_address.zip_code &&
      mailing_address.zip_code !== "" &&
      mailing_address.country &&
      mailing_address.country !== "";

    return isValid;
  };

  const handleSkipAddress = () => {
    setActiveStep(1);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    if (activeStep == 0 && data.mailing_address.street !== "") {
      props.onAddressChange();
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }

    setSkipped(newSkipped);
    if (activeStep === 1) {
      props.onAddressChange();
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const stepValidations = {
    0: validateStep0,
    1: validateStep1,
  };

  const [selectedStatus, setSelectedStatus] = useState("");

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
  };

  const allComponents = [
    <InformationResidence
      key="informationResidence"
      validateStep={validateStep}
      handleSkipAddress={handleSkipAddress}
    />,
    <Adress
      key="adress"
      onStatusChange={handleStatusChange}
      validateStep={validateStep}
    />,
  ];

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

export default AddressDelivery;
