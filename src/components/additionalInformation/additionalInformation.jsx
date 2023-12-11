import React, { useEffect, useState } from "react";
import "./additionalInformation.css";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import statesBrazilianService from "../../services/statesBrazilianService";
import Charity from "./steps/charity/charity";
import Work from "./steps/work/work";
import Formation from "./steps/formation/formation";
import CountryService from "./steps/countryService/countryService";
import { useData } from "../../dataContext/dataContext";

function AdditionalInformation(props) {
  const { data, updateData } = useData();

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

    const { past_jobs } = data;

    if (past_jobs.length == 0) {
      isValid = true;
      return isValid;
    }

    isValid =
      past_jobs[0].entity_name &&
      past_jobs[0].entity_name !== "" &&
      past_jobs[0].occupation_type &&
      past_jobs[0].occupation_type !== "" &&
      past_jobs[0].phone_number &&
      past_jobs[0].phone_number !== "" &&
      past_jobs[0].start_date &&
      past_jobs[0].start_date !== "" &&
      past_jobs[0].occupation_title &&
      past_jobs[0].occupation_title !== "" &&
      past_jobs[0].address.street &&
      past_jobs[0].address.street !== "" &&
      past_jobs[0].address.city &&
      past_jobs[0].address.city !== "" &&
      past_jobs[0].address.state &&
      past_jobs[0].address.state !== "" &&
      past_jobs[0].address.zip_code &&
      past_jobs[0].address.zip_code !== "" &&
      past_jobs[0].address.country &&
      past_jobs[0].address.country !== "";

    return isValid;
  };

  const validateStep1 = () => {
    let isValid = false;

    const { education } = data;

    if (education.length == 0) {
      isValid = true;
      return isValid;
    }

    isValid =
      education[0].entity_name &&
      education[0].entity_name !== "" &&
      education[0].start_date &&
      education[0].start_date !== "" &&
      education[0].end_date &&
      education[0].end_date !== "" &&
      education[0].occupation_title &&
      education[0].occupation_title !== "" &&
      education[0].address.street &&
      education[0].address.street !== "" &&
      education[0].address.city &&
      education[0].address.city !== "" &&
      education[0].address.state &&
      education[0].address.state !== "" &&
      education[0].address.country &&
      education[0].address.country !== "";

    return isValid;
  };

  const validateStep2 = () => {
    let isValid = false;

    const { military_info } = data;

    if (military_info.length == 0) {
      isValid = true;
      return isValid;
    }

    isValid =
      military_info[0].country &&
      military_info[0].country !== "" &&
      military_info[0].branch_of_service &&
      military_info[0].branch_of_service !== "" &&
      military_info[0].rank &&
      military_info[0].rank !== "" &&
      military_info[0].specialty &&
      military_info[0].specialty !== "" &&
      military_info[0].start_date &&
      military_info[0].start_date !== "" &&
      military_info[0].end_date &&
      military_info[0].end_date !== "";

    return isValid;
  };

  const validateStep3 = () => {
    let isValid = false;

    const { languages, charitable_organizations } = data;

    // if (languages.length == 0) {
    //   isValid = false;
    //   return isValid;
    // }

    if (charitable_organizations.length == 0) {
      isValid = true;
      return isValid;
    }

    isValid = charitable_organizations[0] && charitable_organizations[0] !== "";

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
    if (activeStep === 3) {
      props.onAdditionalChange();
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const stepValidations = {
    0: validateStep0,
    1: validateStep1,
    2: validateStep2,
    3: validateStep3,
  };

  const allComponents = [
    <Work key="work" validateStep={validateStep} />,
    <Formation key="formation" validateStep={validateStep} />,
    <CountryService key="countryService" validateStep={validateStep} />,
    <Charity key="charity" validateStep={validateStep} />,
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

export default AdditionalInformation;
