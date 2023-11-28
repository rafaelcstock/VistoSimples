import React, { createContext, useContext, useState } from "react";

const DataContext = createContext({});

export function DataProvider({ children }) {
  const [data, setData] = useState({
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
    other_name: {
      surname: null,
      given_name: null,
      full_name: null,
    },
    telecode_name: {
      surname: "",
      given_name: "",
      full_name: "",
    },
    gender: "M",
    marital_status: "S",
    spouse: {
      name: {
        surname: "",
        given_name: "",
        full_name: "",
      },
      birth: {
        date: "",
        city: "",
        state: "",
        country: "",
      },
      nationality: "",
      address_type: "",
      address: {
        street: "",
        complement: "",
        city: "",
        state: "",
        state_acronym: "",
        zip_code: "",
        country: "",
      },
    },
    former_spouses: [
      {
        name: {
          surname: "",
          given_name: "",
          full_name: "",
        },
        birth: {
          date: "",
          city: "",
          state: "",
          country: "AFGH",
        },
        nationality_country: "AFGH",
        marriage_start_date: "",
        marriage_end_date: "",
        end_marriage_reason: "",
        end_marriage_country: "AFGH",
      },
    ],
    deceased_spouse: {
      name: {
        surname: "",
        given_name: "",
        full_name: "",
      },
      birth: {
        date: "",
        city: "",
        state: "",
        country: "",
      },
      nationality: "",
    },
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
    stay: {
      date: "",
      length: 0,
      address: {
        street: "",
        complement: null,
        city: "",
        state: "",
        state_acronym: null,
        zip_code: "",
        country: "",
      },
    },
    entity_paying: {
      entity_type: "S",
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
      {
        date: "",
        length_of_stay: 0,
      },
      {
        date: "",
        length_of_stay: 0,
      },
      {
        date: "",
        length_of_stay: 0,
      },
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
    address: {
      street: "",
      complement: "",
      city: "",
      state: "",
      state_acronym: null,
      zip_code: "",
      country: "",
    },
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
    us_contact: {
      person_name: null,
      organization_name: "",
      relationship: "R",
      address: {
        street: "",
        complement: null,
        city: "",
        state: "",
        state_acronym: null,
        zip_code: "",
        country: null,
      },
      phone_number: "",
      email: "",
    },
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
    specialized_skills: "string",
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
  });

  // console.log(data);
  console.log(data.old_visa);
  // console.log("------------------------- abaixo é lost");
  // console.log(data.lost_or_stolen_passports);

  const updateData = (newData) => {
    setData({ ...data, ...newData });
  };

  return (
    <DataContext.Provider value={{ data, updateData }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}
