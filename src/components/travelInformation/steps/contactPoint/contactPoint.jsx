import React, { useEffect, useState } from "react";
import "./contactPoint.css";
import { MenuItem, Select, TextField } from "@mui/material";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import InputMask from "react-input-mask";
import escortRelationship from "../../../../datas/escort_relationship";
import statesService from "../../../../services/statesWorldMain";
import citiesService from "../../../../services/citiesWorld";
import { useData } from "../../../../dataContext/dataContext";
import USStates from "../../../../datas/us_states";
import usContactRelationship from "../../../../datas/us_contact_relationship";

function ContactPoint({ validateStep }) {
  const { data, updateData } = useData();

  const [selectedState, setSelectedState] = useState("Hotel");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);

  const getStates = async (country) => {
    let _states = await statesService.getStateByCountry("US");
    setStates(_states);
  };

  const getCities = async (country, state) => {
    let _cities = await citiesService.getCitiesByStateByCountry(country, state);
    setCities(_cities);
  };

  const handleChangeSelectState = (event) => {
    setState(event.target.value);
    getCities("US", event.target.value);
  };

  const handleChangeSelectCity = (event) => {
    setCity(event.target.value);
  };

  const handleLocateChangeSelect = (event) => {
    const { value } = event.target;
    const boolValue = value === "Hotel" ? true : false;

    if (boolValue) {
      updateData({
        ...data,
        us_contact: {
          ...data.us_contact,
          person_name: null,
          organization_name: "",
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
      });
    } else {
      updateData({
        ...data,
        us_contact: {
          ...data.us_contact,
          person_name: {
            surname: "",
            given_name: "",
            full_name: "",
          },
          organization_name: null,
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
      });
    }
  };

  const handleHotelNameChange = (event) => {
    const { value } = event.target;

    updateData({
      ...data,
      us_contact: {
        ...data.us_contact,
        organization_name: value,
      },
    });
  };

  const handleContactNameChange = (event) => {
    const { value, name } = event.target;

    updateData({
      ...data,
      us_contact: {
        ...data.us_contact,
        person_name: {
          ...data.us_contact.person_name,
          [name]: value,
        },
      },
    });
  };

  const handleAddressChange = (event) => {
    const { value, name } = event.target;

    updateData({
      ...data,
      us_contact: {
        ...data.us_contact,
        address: {
          ...data.us_contact.address,
          [name]: value,
        },
      },
    });
  };

  const handleEmailChange = (event) => {
    const { value } = event.target;

    updateData({
      ...data,
      us_contact: {
        ...data.us_contact,
        email: value,
      },
    });
  };

  const handleRelationshipChange = (event) => {
    const { value } = event.target;

    updateData({
      ...data,
      us_contact: {
        ...data.us_contact,
        relationship: value,
      },
    });
  };

  const handlePhoneNumberChange = (event) => {
    const { value } = event.target;

    updateData({
      ...data,
      us_contact: {
        ...data.us_contact,
        phone_number: value,
      },
    });
  };

  useEffect(() => {
    validateStep();
  }, [data]);

  return (
    <div className="div-margin">
      <div className="padding-bottom">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <span className="title-header">
              Informações sobre o ponto de contato
            </span>
          </div>
        </div>
        <hr className="hr-color" />
      </div>
      <div className="div-marital-padding">
        <div className="padding-bottom-title-input">
          <span className="title-header-2">
            Qual será o seu ponto de contato nos EUA?
            <span style={{ color: "red" }}>*</span>
          </span>
        </div>
        <div className="padding-radio-marital">
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="Hotel"
            name="radio-buttons-group"
            className="subTitle-div-2"
            row
            value={!data.us_contact.person_name ? "Hotel" : "Conhecido"}
            onChange={handleLocateChangeSelect}
          >
            <FormControlLabel value="Hotel" control={<Radio />} label="Hotel" />
            <FormControlLabel
              value="Conhecido"
              control={<Radio />}
              label="Conhecido"
            />
          </RadioGroup>
        </div>
      </div>

      {!data.us_contact.person_name ? (
        <div className="div-marital-padding">
          <div className="padding-bottom-title-input">
            <span className="title-header-2">Informação sobre o Hotel</span>
          </div>
          <div className="div-2-inputs-work">
            <div>
              <div style={{ paddingBottom: "0.4rem" }}>
                <span className="span-state">
                  Nome do hotel<span style={{ color: "red" }}>*</span>
                </span>
              </div>
              <div className="padding-bottom-1">
                <TextField
                  id="outlined-basic"
                  className="style-select-work"
                  placeholder="Escreva o nome do hotel"
                  variant="outlined"
                  value={data.us_contact.organization_name}
                  onChange={handleHotelNameChange}
                />
              </div>
            </div>
          </div>
          <div className="div-2-inputs-work">
            <div>
              <div style={{ paddingBottom: "0.4rem" }}>
                <span className="span-state">
                  Estado do hotel<span style={{ color: "red" }}>*</span>
                </span>
              </div>
              <div className="padding-bottom-1">
                <Select
                  className="style-select-work"
                  labelId="select-state"
                  id="select-state"
                  name="state"
                  value={data.us_contact.address.state}
                  onChange={handleAddressChange}
                >
                  {USStates.map((state, index) => (
                    <MenuItem key={index} value={state.key}>
                      {state.value}
                    </MenuItem>
                  ))}
                </Select>
              </div>
            </div>
            <div>
              <div style={{ paddingBottom: "0.4rem" }}>
                <span className="span-state">
                  Cidade do hotel<span style={{ color: "red" }}>*</span>
                </span>
              </div>

              <div className="padding-bottom-1">
                <TextField
                  id="outlined-basic"
                  className="style-select-work"
                  placeholder="Escreva o nome do hotel"
                  variant="outlined"
                  name="city"
                  value={data.us_contact.address.city}
                  onChange={handleAddressChange}
                />
              </div>
            </div>
          </div>
          <div className="div-2-inputs-work">
            <div>
              <div style={{ paddingBottom: "0.4rem" }}>
                <span className="span-state">
                  Endereço do hotel<span style={{ color: "red" }}>*</span>
                </span>
              </div>
              <div className="padding-bottom-1">
                <TextField
                  id="outlined-basic"
                  className="style-select-work"
                  placeholder="Rua, bairro, número"
                  variant="outlined"
                  name="street"
                  value={data.us_contact.address.street}
                  onChange={handleAddressChange}
                />
              </div>
            </div>
            <div>
              <div style={{ paddingBottom: "0.4rem" }}>
                <span className="span-state">
                  CEP<span style={{ color: "red" }}>*</span>
                </span>
              </div>
              <div className="padding-bottom-1">
                <InputMask
                  mask="99999-999"
                  maskChar=""
                  value={data.us_contact.address.zip_code}
                  onChange={handleAddressChange}
                >
                  {() => (
                    <TextField
                      id="outlined-basic"
                      className="style-select-work"
                      placeholder="00000-000"
                      variant="outlined"
                      name="zip_code"
                    />
                  )}
                </InputMask>
              </div>
            </div>
          </div>
          <div className="div-2-inputs-work">
            <div>
              <div style={{ paddingBottom: "0.4rem" }}>
                <span className="span-state">
                  Telefone do hotel<span style={{ color: "red" }}>*</span>
                </span>
              </div>
              <div className="padding-bottom-1">
                <InputMask
                  mask="99+ (99) 99999-9999"
                  maskChar=""
                  value={data.us_contact.phone_number}
                  onChange={handlePhoneNumberChange}
                >
                  {() => (
                    <TextField
                      id="outlined-basic"
                      className="style-select-work"
                      placeholder="99+ (00) 00000-0000"
                      variant="outlined"
                    />
                  )}
                </InputMask>
              </div>
            </div>
            <div>
              <div style={{ paddingBottom: "0.4rem" }}>
                <span className="span-state">
                  Email do hotel<span style={{ color: "red" }}>*</span>
                </span>
              </div>
              <div className="padding-bottom-1">
                <TextField
                  id="outlined-basic"
                  className="style-select-work"
                  placeholder="email@exemplo.com"
                  variant="outlined"
                  value={data.us_contact.email}
                  onChange={handleEmailChange}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="div-marital-padding">
          <div className="padding-bottom-title-input">
            <span className="title-header-2">Informação sobre o conhecido</span>
          </div>
          <div className="div-1-inputs-contact">
            <div>
              <div style={{ paddingBottom: "0.4rem" }}>
                <span className="span-state">
                  Nome do contato <span style={{ color: "red" }}>*</span>
                </span>
              </div>
              <div className="padding-bottom-1">
                <TextField
                  id="outlined-basic"
                  className="input-style-contact"
                  placeholder="Escreva o primeiro nome"
                  variant="outlined"
                  name="given_name"
                  value={data.us_contact.person_name.given_name}
                  onChange={handleContactNameChange}
                />
              </div>
            </div>
            <div>
              <div style={{ paddingBottom: "0.4rem" }}>
                <span className="span-state">
                  Sobrenome do contato<span style={{ color: "red" }}>*</span>
                </span>
              </div>
              <div className="padding-bottom-1">
                <TextField
                  id="outlined-basic"
                  className="input-style-contact"
                  placeholder="Escreva sobrenome"
                  variant="outlined"
                  name="surname"
                  value={data.us_contact.person_name.surname}
                  onChange={handleContactNameChange}
                />
              </div>
            </div>
            <div>
              <div style={{ paddingBottom: "0.4rem" }}>
                <span className="span-state">
                  Relação com o contato<span style={{ color: "red" }}>*</span>
                </span>
              </div>
              <div className="padding-bottom-1">
                <Select
                  className="style-select-work"
                  labelId="select-state"
                  id="select-state"
                  value={data.us_contact.relationship}
                  onChange={handleRelationshipChange}
                >
                  {usContactRelationship.map((state) => (
                    <MenuItem key={state.key} value={state.key}>
                      {state.value}
                    </MenuItem>
                  ))}
                </Select>
              </div>
            </div>
          </div>
          <div className="div-2-inputs-work">
            <div>
              <div style={{ paddingBottom: "0.4rem" }}>
                <span className="span-state">
                  Estado do contato<span style={{ color: "red" }}>*</span>
                </span>
              </div>
              <div className="padding-bottom-1">
                <Select
                  className="style-select-work"
                  labelId="select-state"
                  id="select-state"
                  name="state"
                  value={data.us_contact.address.state}
                  onChange={handleAddressChange}
                >
                  {USStates.map((state, index) => (
                    <MenuItem key={index} value={state.key}>
                      {state.value}
                    </MenuItem>
                  ))}
                </Select>
              </div>
            </div>
            <div>
              <div style={{ paddingBottom: "0.4rem" }}>
                <span className="span-state">
                  Cidade do contato<span style={{ color: "red" }}>*</span>
                </span>
              </div>
              <div className="padding-bottom-1">
                <TextField
                  id="outlined-basic"
                  className="style-select-work"
                  placeholder="Escreva o nome do hotel"
                  variant="outlined"
                  name="city"
                  value={data.us_contact.address.city}
                  onChange={handleAddressChange}
                />
              </div>
            </div>
          </div>
          <div className="div-2-inputs-work">
            <div>
              <div style={{ paddingBottom: "0.4rem" }}>
                <span className="span-state">
                  Endereço do contato<span style={{ color: "red" }}>*</span>
                </span>
              </div>
              <div className="padding-bottom-1">
                <TextField
                  id="outlined-basic"
                  className="style-select-work"
                  placeholder="Rua, bairro, número"
                  variant="outlined"
                  name="street"
                  value={data.us_contact.address.street}
                  onChange={handleAddressChange}
                />
              </div>
            </div>
            <div>
              <div style={{ paddingBottom: "0.4rem" }}>
                <span className="span-state">
                  CEP<span style={{ color: "red" }}>*</span>
                </span>
              </div>
              <div className="padding-bottom-1">
                <InputMask
                  mask="99999-999"
                  maskChar=""
                  value={data.us_contact.address.zip_code}
                  onChange={handleAddressChange}
                >
                  {() => (
                    <TextField
                      id="outlined-basic"
                      className="style-select-work"
                      placeholder="00000-000"
                      variant="outlined"
                      name="zip_code"
                    />
                  )}
                </InputMask>
              </div>
            </div>
          </div>
          <div className="div-2-inputs-work">
            <div>
              <div style={{ paddingBottom: "0.4rem" }}>
                <span className="span-state">
                  Telefone do contato<span style={{ color: "red" }}>*</span>
                </span>
              </div>
              <div className="padding-bottom-1">
                <InputMask
                  mask="99+ (99) 99999-9999"
                  maskChar=""
                  value={data.us_contact.phone_number}
                  onChange={handlePhoneNumberChange}
                >
                  {() => (
                    <TextField
                      id="outlined-basic"
                      className="style-select-work"
                      placeholder="99+ (00) 00000-0000"
                      variant="outlined"
                    />
                  )}
                </InputMask>
              </div>
            </div>
            <div>
              <div style={{ paddingBottom: "0.4rem" }}>
                <span className="span-state">
                  Email do contato<span style={{ color: "red" }}>*</span>
                </span>
              </div>
              <div className="padding-bottom-1">
                <TextField
                  id="outlined-basic"
                  className="style-select-work"
                  placeholder="email@exemplo.com"
                  variant="outlined"
                  value={data.us_contact.email}
                  onChange={handleEmailChange}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ContactPoint;
