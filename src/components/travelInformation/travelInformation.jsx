import React, { useEffect, useState } from "react";
import "./travelInformation.css";
import Travels from "./steps/travels/travels";
import FiveTravels from "./steps/fiveTravels/fiveTravels";
import TravelInformations from "./steps/travelInformations/travelInformations";
import ContactPoint from "./steps/contactPoint/contactPoint";
import Companion from "./steps/companion/companion";
import Payer from "./steps/payer/payer";
import { useData } from "../../dataContext/dataContext";

function TravelInformation(props) {
  const { data } = useData();
  const [activeStep, setActiveStep] = useState(5);
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
      isValid = visited_countries.length > 0;
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
      return isValid;
    }

    isValid = us_visits.some(
      (visit) => visit.date !== "" && visit.length_of_stay !== 0
    );

    return isValid;
  };

  const validateStep2 = () => {
    let isValid = false;

    const { stay } = data;
    debugger;
    isValid =
      stay.date &&
      stay.date !== "" &&
      stay.length &&
      stay.length > 0 &&
      stay.address.street &&
      stay.address.street !== "" &&
      stay.address.city &&
      stay.address.city !== "" &&
      stay.address.state &&
      stay.address.state !== "" &&
      stay.address.zip_code &&
      stay.address.zip_code !== "" &&
      stay.address.country &&
      stay.address.country !== "";

    return isValid;
  };

  const validateStep3 = () => {
    let isValid = false;

    const { us_contact } = data;

    if (!us_contact.person_name) {
      isValid =
        us_contact.organization_name && us_contact.organization_name !== "";
    } else {
      isValid =
        us_contact.person_name.given_name &&
        us_contact.person_name.given_name !== "" &&
        us_contact.person_name.surname &&
        us_contact.person_name.surname !== "";
    }

    isValid =
      us_contact.phone_number &&
      us_contact.phone_number !== "" &&
      us_contact.email &&
      us_contact.email !== "" &&
      us_contact.address.street &&
      us_contact.address.street !== "" &&
      us_contact.address.city &&
      us_contact.address.city !== "" &&
      us_contact.address.zip_code &&
      us_contact.address.zip_code !== "" &&
      us_contact.address.state &&
      us_contact.address.state !== "";

    return isValid;
  };

  const validateStep4 = () => {
    let isValid = false;

    const { companionSelected, escorts, group } = data;

    if (companionSelected === 1) {
      isValid = true;
    }

    if (companionSelected === 2 && escorts) {
      isValid = escorts.some(
        (scort) =>
          scort.name.given_name &&
          scort.name.given_name !== "" &&
          scort.name.surname &&
          scort.name.surname
      );
    }

    if (companionSelected === 3) {
      isValid = group && group !== "";
    }

    return isValid;
  };

  const validateStep5 = () => {
    let isValid = false;

    const { companionSelected, escorts, group } = data;

    if (companionSelected === 1) {
      isValid = true;
    }

    if (companionSelected === 2 && escorts) {
      isValid = escorts.some(
        (scort) =>
          scort.name.given_name &&
          scort.name.given_name !== "" &&
          scort.name.surname &&
          scort.name.surname
      );
    }

    if (companionSelected === 3) {
      isValid = group && group !== "";
    }

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

    setIsDisabled(true);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const stepValidations = {
    0: validateStep0,
    1: validateStep1,
    2: validateStep2,
    3: validateStep3,
    4: validateStep4,
    5: validateStep5,
  };

  const allComponents = [
    <Travels key="travels" validateStep={validateStep} />,
    <FiveTravels key="fiveTravels" validateStep={validateStep} />,
    <TravelInformations key="travelInformations" validateStep={validateStep} />,
    <ContactPoint key="contactPoint" validateStep={validateStep} />,
    <Companion key="companion" validateStep={validateStep} />,
    <Payer key="payer" validateStep={validateStep} />,
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

export default TravelInformation;
