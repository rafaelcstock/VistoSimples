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
import { useData } from "../../dataContext/dataContext";

const steps = [
  "Informações pessoais",
  "Informações adicionais",
  "Endereço e residência",
  "Informações sobre a viagem",
  "Visto ou passaporte",
  "Fim",
];

function Form() {
  const { data, updateData } = useData();
  const [activeStep, setActiveStep] = useState(0);
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
    updateData({
      address: {
        ...data.address,
      },
      stay: {
        ...data.stay,
      },
      us_contact: {
        ...data.us_contact,
      },
      max_schedule_date: "2023-11-08",
      blacklist_dates: ["2023-11-08"],
      ds160_city: "",
      consulate_id: 54,
      b64_picture: "",
      main_applicant: true,
      traveling_to_apply: true,
      security_question_option: 0,
      security_question_response: "",
      application_id: "",
      name: {
        surname: "",
        given_name: "",
        full_name: null,
      },
      other_name: null,
      telecode_name: {
        surname: "",
        given_name: "",
        full_name: "",
      },
      gender: "M",
      marital_status: "S",
      spouse: null,
      former_spouses: null,
      deceased_spouse: null,
      birth: {
        date: "",
        city: "",
        state: "",
        country: "",
      },
      nationality_country: "",
      other_nationality_country: null,
      other_nationality_passport: null,
      permanent_resident_other_country: null,
      national_identification_number: "",
      us_social_security_number: "",
      us_taxpayer_number: "",
      visa_class: "B",
      visa_class_specify: "B1-B2",
      entity_paying: {
        entity_type: "S",
        address: null,
        phone_number: "",
        relationship: "C",
        same_address: false,
        email: "",
        org_name: "",
        person_name: {
          surname: "",
          given_name: "",
          full_name: "",
        },
      },
      escorts: null,
      group: null,
      us_visits: [
        {
          date: "",
          length_of_stay: 0,
        },
      ],
      old_visa: null,
      us_drivers_license: [
        {
          number: "",
          state: "",
        },
      ],
      refused_us_visa: true,
      refused_us_visa_reason: "",
      immigrant_petition: true,
      immigrant_petition_reason: "",
      mailing_address: {
        street: "",
        complement: "",
        city: "",
        state: "",
        state_acronym: null,
        zip_code: "",
        country: "",
      },
      primary_phone_number: "",
      secondary_phone_number: "",
      work_phone_number: "",
      other_phone_numbers: [""],
      email_address: "",
      other_email_adresses: [""],
      social_medias: null,
      passport: {
        document_type: "R",
        number: "",
        custom_document_reason: "",
        book_number: "",
        country: "AFGH",
        city: "",
        state: "",
        issuance_date: "",
        expiration_date: "",
        lost_reason: null,
      },
      lost_or_stolen_passports: null,
      father: {
        name: {
          surname: "",
          given_name: "",
          full_name: null,
        },
        birth_date: "",
        locating_in_us: false,
        us_status: "S",
      },
      mother: {
        name: {
          surname: "",
          given_name: "",
          full_name: "",
        },
        birth_date: "",
        locating_in_us: true,
        us_status: "S",
      },
      immediate_relatives: [
        {
          name: {
            surname: "",
            given_name: "",
            full_name: "",
          },
          locating_in_us: true,
          relationship: "",
          us_status: "",
        },
      ],
      any_other_relative_in_us: true,
      primary_occupation: {
        occupation_type: "S",
        specify_occupation: null,
        entity_name: "",
        address: {
          street: "",
          complement: null,
          city: "",
          state: "",
          state_acronym: null,
          zip_code: "",
          country: "",
        },
        phone_number: "",
        start_date: "",
        end_date: null,
        monthly_income: null,
        description: null,
        occupation_title: "",
        supervisor_name: null,
      },
      past_jobs: [
        {
          occupation_type: "",
          specify_occupation: null,
          entity_name: "",
          address: {
            street: "",
            complement: null,
            city: "",
            state: "",
            state_acronym: null,
            zip_code: "",
            country: "",
          },
          phone_number: "",
          start_date: "",
          end_date: "",
          monthly_income: null,
          description: null,
          occupation_title: "",
          supervisor_name: null,
          email: "",
        },
      ],
      education: [
        {
          occupation_type: null,
          specify_occupation: null,
          entity_name: "",
          address: {
            street: "",
            complement: null,
            city: "",
            state: "",
            state_acronym: null,
            zip_code: "",
            country: "",
          },
          phone_number: "",
          start_date: "",
          end_date: "",
          monthly_income: null,
          description: null,
          occupation_title: "",
          supervisor_name: null,
        },
      ],
      clan: null,
      languages: [],
      visited_countries: [],
      charitable_organizations: [],
      specialized_skills: null,
      military_info: [
        {
          country: "",
          branch_of_service: "",
          rank: "",
          specialty: "",
          start_date: "",
          end_date: "",
        },
      ],
      special_organization: "string",
      security_responses: ["string", null],
      hasAnotherName: false,
      hasAnotherNationality: true,
      hasInformationAboutFather: true,
      hasInformationAboutMother: true,
      hasParentInUs: true,
      hasClan: true,
      hasUsDriversLicense: true,
      companionSelected: 1,
      spouseHasSameAddress: true,
      occupation_type_selected: "S",
    });
    
    localStorage.setItem("primaryMember", JSON.stringify(data));

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
          sx={{
            "@media (max-width: 768px)": {
              display: "none",
            },
          }}
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
      <div
        className="div-margin all-components-wrapper "
        style={{ width: "100%" }}
      >
        <div>{allComponents[activeStep]}</div>
      </div>
    </div>
  );
}

export default Form;
