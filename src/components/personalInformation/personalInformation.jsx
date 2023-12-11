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
import { emailRegex } from "../utils/regex";

function PersonalInformation(props) {
  const { data, updateData } = useData();

  const [activeStep, setActiveStep] = useState(0);

  const [skipped, setSkipped] = useState(new Set());

  const [isValidInitialInformation, setIsValidInitialInformation] = useState({
    email: true,
    secondary_email: true,
    cpf: true,
  });

  const [isDisabled, setIsDisabled] = useState(true);

  const validateStep = () => {
    const validateFunction = stepValidations[activeStep];
    if (validateFunction) {
      setIsDisabled(!validateFunction(data));
    }
  };

  const validateStep0 = () => {
    const {
      name,
      marital_status,
      birth,
      primary_phone_number,
      email_address,
      other_email_adresses,
      national_identification_number,
    } = data;

    let validateEmail = true;
    let validateSecondaryEmail = true;
    let validateCpf = true;

    validateEmail =
      email_address !== "" ? emailRegex.test(email_address) : true;
    validateSecondaryEmail =
      other_email_adresses[0] !== ""
        ? emailRegex.test(other_email_adresses[0])
        : true;

    validateCpf =
      national_identification_number !== ""
        ? checkCpf(national_identification_number)
        : true;

    setIsValidInitialInformation({
      cpf: validateCpf,
      secondary_email: validateSecondaryEmail,
      email: validateEmail,
    });

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
      email_address !== "" &&
      validateEmail &&
      validateSecondaryEmail &&
      national_identification_number &&
      national_identification_number !== "" &&
      validateCpf
    );
  };

  const validateStep1 = () => {
    const { marital_status } = data;

    if (marital_status == "M" || marital_status == "P")
      return validateMarriedStep();

    if (marital_status == "D" || marital_status == "L")
      return validateFormerSpouseStep();

    if (marital_status == "W") return validateDeceasedStep();
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
      father.birth_date !== "";

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
      mother.birth_date !== "";
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
    const { primary_occupation } = data;

    if (!primary_occupation) {
      return true;
    }
    if (primary_occupation.type === "Employee") {
      return (
        primary_occupation.occupation_type &&
        primary_occupation.entity_name &&
        primary_occupation.start_date &&
        primary_occupation.address.street &&
        primary_occupation.address.city &&
        primary_occupation.address.state
      );
    }

    if (primary_occupation.type === "Retiree") {
      return primary_occupation.monthly_income > 0;
    }

    return false;
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

  const validateMarriedStep = () => {
    const { spouse } = data;

    let isValid = false;
    let isAddressValid = true;

    if (!data.spouseHasSameAddress) {
      isAddressValid =
        spouse.address.street &&
        spouse.address.street !== "" &&
        spouse.address.country &&
        spouse.address.country !== "" &&
        spouse.address.state &&
        spouse.address.state !== "" &&
        spouse.address.city &&
        spouse.address.city !== "" &&
        spouse.address.zip_code &&
        spouse.address.zip_code !== "";
    }

    isValid =
      spouse.name.surname &&
      spouse.name.surname !== "" &&
      spouse.name.given_name &&
      spouse.name.given_name !== "" &&
      spouse.birth.date &&
      spouse.birth.date !== "" &&
      spouse.birth.country &&
      spouse.birth.country !== "" &&
      spouse.nationality !== "" &&
      isAddressValid;

    return isValid;
  };

  const validateFormerSpouseStep = () => {
    const { former_spouses } = data;

    let isValid = false;

    isValid =
      former_spouses[0].name.surname &&
      former_spouses[0].name.surname !== "" &&
      former_spouses[0].name.given_name &&
      former_spouses[0].name.given_name !== "" &&
      former_spouses[0].birth.date &&
      former_spouses[0].birth.date !== "" &&
      former_spouses[0].birth.city &&
      former_spouses[0].birth.city !== "" &&
      former_spouses[0].birth.country &&
      former_spouses[0].birth.country !== "" &&
      former_spouses[0].nationality_country &&
      former_spouses[0].nationality_country !== "" &&
      former_spouses[0].marriage_start_date &&
      former_spouses[0].marriage_start_date !== "" &&
      former_spouses[0].marriage_end_date &&
      former_spouses[0].marriage_end_date !== "" &&
      former_spouses[0].end_marriage_country &&
      former_spouses[0].end_marriage_country !== "";

    return isValid;
  };

  const validateDeceasedStep = () => {
    const { deceased_spouse } = data;

    let isValid = false;

    isValid =
      deceased_spouse.name.surname &&
      deceased_spouse.name.surname !== "" &&
      deceased_spouse.name.given_name &&
      deceased_spouse.name.given_name !== "" &&
      deceased_spouse.birth.date &&
      deceased_spouse.birth.date !== "" &&
      deceased_spouse.birth.country &&
      deceased_spouse.birth.country !== "" &&
      deceased_spouse.birth.state &&
      deceased_spouse.birth.state !== "" &&
      deceased_spouse.birth.city &&
      deceased_spouse.birth.city !== "" &&
      deceased_spouse.nationality;

    return isValid;
  };

  const stepValidations = {
    0: validateStep0,
    1: validateStep1,
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

  const checkCpf = (cpf) => {
    const cleanedCpf = cpf.replace(/\D/g, "");

    if (cleanedCpf.length !== 11) {
      return false;
    }

    if (/^(\d)\1+$/.test(cleanedCpf)) {
      return false;
    }

    let sum = 0;
    for (let i = 1; i <= 9; i++) {
      sum += parseInt(cleanedCpf.charAt(i - 1)) * (11 - i);
    }
    let remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) {
      remainder = 0;
    }

    if (remainder !== parseInt(cleanedCpf.charAt(9))) {
      return false;
    }

    sum = 0;
    for (let i = 1; i <= 10; i++) {
      sum += parseInt(cleanedCpf.charAt(i - 1)) * (12 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) {
      remainder = 0;
    }

    return remainder === parseInt(cleanedCpf.charAt(10));
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

    if (
      (data.marital_status === "S" || data.marital_status === "") &&
      activeStep === 0
    ) {
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
    if (
      (data.marital_status === "S" || data.marital_status === "") &&
      activeStep === 2
    ) {
      setActiveStep((prevActiveStep) => prevActiveStep - 2);
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };

  const handleNextMaital = () => {
    if (data.marital_status === "P") {
      return <StableUnion key="stableUnion" validateStep={validateStep} />;
    }

    if (data.marital_status === "M") {
      return <Married key="married" validateStep={validateStep} />;
    }

    if (data.marital_status === "W") {
      return <Widow key="window" validateStep={validateStep} />;
    }

    if (data.marital_status === "D" || "L") {
      return <Divorced key="divorced" validateStep={validateStep} />;
    }
  };

  const allComponents = [
    <InitialInformation
      key="initialInformation"
      validateStep={validateStep}
      isValidInitialInformation={isValidInitialInformation}
    />,
    handleNextMaital(),
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
          <div
            className={"button-proxima-container"}
          >
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
