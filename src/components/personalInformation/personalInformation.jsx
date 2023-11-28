import "./personalInformation.css";
import React, { useState } from "react";
import InitialInformation from "./steps/initialInformation/initialInformation";
import StableUnion from "./steps/maritalStatus/stableUnion";
import AnotherName from "./steps/anotherName/anotherName";
import Nationality from "./steps/nationality/nationality";
import FatherInformation from "./steps/fatherInformation/fatherInformation";
import MotherInformation from "./steps/motherInformation/motherInformation";
import USAFamily from "./steps/USAFamily/USAFamily";
import DistantFamily from "./steps/distantFamily/distantFamily";
import Group from "./steps/group/group";
import CNH from "./steps/CNH/CNH";
import SocialNetwork from "./steps/socialNetwork/socialNetwork";
import Married from "./steps/maritalStatus/married";
import Divorced from "./steps/maritalStatus/divorced";
import Widow from "./steps/maritalStatus/widow";

import { useData } from "../../dataContext/dataContext";

function PersonalInformation(props) {
  const { data, updateData } = useData();

  const [activeStep, setActiveStep] = useState(10);

  const [skipped, setSkipped] = useState(new Set());

  const [maritalStatus, setMaritalStatus] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");

  const [isDisabled, setIsDisabled] = useState(true);

  const validateStep = () => {
    const validateFunction = stepValidations[activeStep];
    if (validateFunction) {
      setIsDisabled(!validateFunction(data));
    }
  };

  const validateStep0 = () => {
    const { name, marital_status, birth, primary_phone_number, email_address } =
      data;

    return (
      name.surname &&
      name.surname !== "" &&
      name.given_name &&
      name.given_name !== "" &&
      marital_status &&
      marital_status !== "" &&
      birth.date &&
      birth.date !== "" &&
      primary_phone_number &&
      primary_phone_number !== "" &&
      email_address &&
      email_address !== ""
    );
  };

  const validateStep2 = () => {
    const { hasAnotherName, other_name } = data;

    if (!hasAnotherName) return true;

    return (
      other_name.given_name &&
      other_name.given_name !== "" &&
      other_name.surname &&
      other_name.surname !== ""
    );
  };

  const validateStep3 = () => {
    let isValid = false;

    const {
      hasAnotherNacionality,
      birth,
      b64_picture,
      other_nationality_country,
      other_nationality_passport,
    } = data;

    isValid =
      birth.country &&
      birth.country !== "" &&
      birth.city &&
      birth.city !== "" &&
      birth.state &&
      birth.state !== "" &&
      b64_picture &&
      b64_picture !== "";

    if (!hasAnotherNacionality) return isValid;

    isValid =
      other_nationality_country &&
      other_nationality_country !== "" &&
      other_nationality_passport &&
      other_nationality_passport !== "";

    return isValid;
  };

  const validateStep4 = () => {
    let isValid = false;

    const { father, hasInformationAboutFather } = data;

    if (!hasInformationAboutFather) {
      isValid = true;
      return isValid;
    }

    isValid =
      father.birth_date &&
      father.birth_date !== "" &&
      father.name.surname &&
      father.name.surname !== "" &&
      father.name.given_name &&
      father.name.given_name !== "" &&
      father.birth_date &&
      father.birth_date !== "" &&
      father.us_status &&
      father.us_status !== "";

    return isValid;
  };

  const validateStep5 = () => {
    let isValid = false;

    const { mother, hasInformationAboutMother } = data;

    if (!hasInformationAboutMother) {
      isValid = true;
      return isValid;
    }

    isValid =
      mother.birth_date &&
      mother.birth_date !== "" &&
      mother.name.surname &&
      mother.name.surname !== "" &&
      mother.name.given_name &&
      mother.name.given_name !== "" &&
      mother.birth_date &&
      mother.birth_date !== "" &&
      mother.us_status &&
      mother.us_status !== "";

    return isValid;
  };

  const validateStep6 = () => {
    let isValid = false;

    const { immediate_relatives, hasParentInUs } = data;

    if (!hasParentInUs) {
      isValid = true;
      return isValid;
    }

    isValid = immediate_relatives.every((relative) => {
      return (
        relative.relationship &&
        relative.relationship !== "" &&
        relative.us_status &&
        relative.us_status !== "" &&
        relative.name.given_name &&
        relative.name.given_name !== "" &&
        relative.name.surname &&
        relative.name.surname !== ""
      );
    });

    return isValid;
  };

  const validateStep7 = () => {
    let isValid = false;

    const { primary_occupation } = data;

    if (!primary_occupation) {
      isValid = true;
      return isValid;
    }

    isValid =
      primary_occupation.occupation_type &&
      primary_occupation.occupation_type !== "" &&
      primary_occupation.entity_name &&
      primary_occupation.entity_name !== "" &&
      primary_occupation.phone_number &&
      primary_occupation.phone_number !== "" &&
      primary_occupation.start_date &&
      primary_occupation.start_date !== "" &&
      primary_occupation.occupation_title &&
      primary_occupation.occupation_title !== "" &&
      primary_occupation.address.country &&
      primary_occupation.address.country !== "" &&
      primary_occupation.address.street &&
      primary_occupation.address.street !== "" &&
      primary_occupation.address.city &&
      primary_occupation.address.city !== "" &&
      primary_occupation.address.state &&
      primary_occupation.address.state !== "" &&
      primary_occupation.address.zip_code &&
      primary_occupation.address.zip_code !== "";

    return isValid;
  };

  const validateStep8 = () => {
    let isValid = false;

    const { clan, hasClan } = data;

    if (!hasClan) {
      isValid = true;
      return isValid;
    }

    isValid = clan && clan !== "";

    return isValid;
  };

  const validateStep9 = () => {
    let isValid = false;

    const { social_medias } = data;

    if (social_medias === null) {
      isValid = true;
      return isValid;
    }

    if (social_medias.length === 0) {
      updateData({ ...data, social_medias: null });
      isValid = true;
      return isValid;
    }

    const filledFieldsCount = social_medias
      ? social_medias.filter((media) => media.identifier !== "").length
      : 0;

    isValid = filledFieldsCount >= 1;

    return isValid;
  };

  const validateStep10 = () => {
    let isValid = false;

    const { hasUsDriversLicense, us_drivers_license } = data;

    if (!hasUsDriversLicense) {
      isValid = true;
      return isValid;
    }

    if (us_drivers_license !== null) {
      isValid =
        us_drivers_license[0].number &&
        us_drivers_license[0].number !== "" &&
        us_drivers_license[0].state &&
        us_drivers_license[0].state !== "";
    }

    return isValid;
  };

  const stepValidations = {
    0: validateStep0,

    2: validateStep2,
    3: validateStep3,
    4: validateStep4,
    5: validateStep5,
    6: validateStep6,
    7: validateStep7,
    8: validateStep8,
    9: validateStep9,
    10: validateStep10,
  };

  const validateStep1 = () => {
    const { name, marital_status } = data;

    return (
      name.surname &&
      name.surname !== "" &&
      name.given_name &&
      name.given_name !== "" &&
      marital_status &&
      marital_status !== ""
    );
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;

    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    if ((selectedStatus === "S" || selectedStatus === "") && activeStep === 0) {
      setActiveStep((prevActiveStep) => prevActiveStep + 2);
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
    setSkipped(newSkipped);
    if (activeStep === 10) {
      props.onPersonalChange();
    }

    setIsDisabled(true);
  };

  const handleBack = () => {
    if ((selectedStatus === "S" || selectedStatus === "") && activeStep === 2) {
      setActiveStep((prevActiveStep) => prevActiveStep - 2);
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    handleNextMarital(status);
  };

  const handleNextMarital = (selectedStatus) => {
    if (selectedStatus === "M") {
      setMaritalStatus(<Married key="married" />);
    } else if (selectedStatus === "P") {
      setMaritalStatus(<StableUnion key="stableUnion" />);
    } else if (selectedStatus === "W") {
      setMaritalStatus(<Widow key="window" />);
    } else if (selectedStatus === "D" || "L") {
      setMaritalStatus(<Divorced key="divorced" />);
    }
  };

  const allComponents = [
    <InitialInformation
      key="initialInformation"
      onStatusChange={handleStatusChange}
      validateStep={validateStep}
    />,
    maritalStatus,
    <AnotherName key="anotherName" validateStep={validateStep} />,
    <Nationality key="nationality" validateStep={validateStep} />,
    <FatherInformation key="fatherInformation" validateStep={validateStep} />,
    <MotherInformation key="motherInformation" validateStep={validateStep} />,
    <USAFamily key="USAFamily" validateStep={validateStep} />,
    <DistantFamily key="distantFamily" validateStep={validateStep} />,
    <Group key="group" validateStep={validateStep} />,
    <SocialNetwork key="socialNetwork" validateStep={validateStep} />,
    <CNH key="CNH" validateStep={validateStep} />,
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
              className={`button-style ${isDisabled ? "disabled-button" : ""}`}
              disabled={isDisabled}
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

export default PersonalInformation;
