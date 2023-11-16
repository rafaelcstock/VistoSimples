import React, { useEffect, useState } from "react";
import "./payer.css";
import { MenuItem, Select, TextField } from "@mui/material";
import statesBrazilianService from "../../../../services/statesBrazilianService";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import InputMask from "react-input-mask";
import escortRelationship from "../../../../datas/escort_relationship";
import countriesService from "../../../../services/countriesWorld";
import statesService from "../../../../services/statesWorldMain";
import citiesService from "../../../../services/citiesWorld";
import { useData } from "../../../../dataContext/dataContext";
import personPaying from "../../../../datas/person_paying";
import Countries from "../../../../datas/countries";

function Payer({ validateStep }) {
  const { data, updateData } = useData();

  const handlePaymentChangeSelect = (event) => {
    const { value } = event.target;
    debugger
    if (value == "S") {
      updateData({
        entity_paying: {
          ...data.entity_paying,
          org_name: null,
          person_name: null,
          entity_type: value,
          phone_number: "",
          email: "",
          address: null,
        },
      });
    }

    if (value == "O") {
      updateData({
        entity_paying: {
          ...data.entity_paying,
          org_name: null,
          entity_type: value,
          phone_number: "",
          email: "",
          address: {
            street: "",
            complement: null,
            city: "",
            state: "",
            state_acronym: null,
            zip_code: "",
            country: "",
          },
          person_name: {
            surname: "",
            given_name: "",
            full_name: "",
          },
        },
      });
    }

    if (value !== "O" && value !== "S") {
      updateData({
        entity_paying: {
          ...data.entity_paying,
          entity_type: value,
          org_name: "",
          person_name: null,
          phone_number: "",
          email: "",
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
      });
    }
  };

  const handleChangeSelect = (event) => {
    const { value } = event.target;
    const boolValue = value === "Sim" ? true : false;

    if (boolValue) {
      updateData({
        entity_paying: { ...data.entity_paying, same_address: boolValue, address: null },

      });
    } else {
      updateData({
        entity_paying: { ...data.entity_paying, same_address: boolValue },
        address: {
          street: "",
          complement: null,
          city: "",
          state: "",
          state_acronym: null,
          zip_code: "",
          country: "",
        }
      });
    }

  };

  const handlePersonNameChange = (event) => {
    const { value, name } = event.target;

    updateData({
      entity_paying: {
        ...data.entity_paying,
        person_name: { ...data.entity_paying.person_name, [name]: value },
      },
    });
  };

  const handleAddressChange = (event) => {
    const { value, name } = event.target;

    updateData({
      entity_paying: {
        ...data.entity_paying,
        address: { ...data.entity_paying.address, [name]: value },
      },
    });
  };

  const handlePhoneNumberChange = (event) => {
    const { value } = event.target;

    updateData({
      entity_paying: {
        ...data.entity_paying,
        phone_number: value,
      },
    });
  };

  const handleEmailChange = (event) => {
    const { value } = event.target;

    updateData({
      entity_paying: {
        ...data.entity_paying,
        email: value,
      },
    });
  };

  const handlePersonRelationshipChange = (event) => {
    const { value } = event.target;

    updateData({
      entity_paying: {
        ...data.entity_paying,
        relationship: value,
      },
    });
  };

  const handleOrgNameChange = (event) => {
    const { value } = event.target;

    updateData({
      entity_paying: {
        ...data.entity_paying,
        org_name: value,
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
              Informações adicionais sobre o pagador
            </span>
          </div>
        </div>
        <hr className="hr-color" />
      </div>
      <div className="div-marital-padding">
        <div className="padding-bottom-title-input">
          <span className="title-header-2">
            Pessoa que está pagando pela viagem?
            <span style={{ color: "red" }}>*</span>
          </span>
        </div>
        <div className="padding-radio-marital">
          <Select
            className="input-style-payer"
            value={data.entity_paying.entity_type}
            onChange={handlePaymentChangeSelect}
          >
            {personPaying.map((status) => (
              <MenuItem key={status.key} value={status.key}>
                {status.value}
              </MenuItem>
            ))}
          </Select>
        </div>
      </div>

      {data.entity_paying.entity_type == "O" && (
        <div>
          <div className="div-marital-padding">
            <div className="padding-payer">
              <div>
                <div style={{ paddingBottom: "0.4rem" }}>
                  <span className="span-state">
                    O endereço da pessoa que está pagando é o mesmo que o seu?
                  </span>
                </div>
                <div className="padding-bottom-1">
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="Sim"
                    name="radio-buttons-group"
                    className="subTitle-div-2"
                    row
                    value={
                      data.entity_paying.same_address == true ? "Sim" : "Não"
                    }
                    onChange={handleChangeSelect}
                  >
                    <FormControlLabel
                      value="Sim"
                      control={<Radio />}
                      label="Sim"
                    />
                    <FormControlLabel
                      value="Não"
                      control={<Radio />}
                      label="Não"
                    />
                  </RadioGroup>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {data.entity_paying.entity_type == "O" && (
        <div className="div-marital-padding">
          <div className="padding-bottom-title-input">
            <span className="title-header-2">Informação sobre a pessoa</span>
          </div>
          <div className="div-1-inputs-marital">
            <div>
              <div style={{ paddingBottom: "0.4rem" }}>
                <span className="span-state">
                  Nome da pessoa<span style={{ color: "red" }}>*</span>
                </span>
              </div>
              <div className="padding-bottom-1">
                <TextField
                  id="outlined-basic"
                  className="input-style-work"
                  placeholder="Escreva o primeiro nome"
                  variant="outlined"
                  name="given_name"
                  value={data.entity_paying.person_name.given_name}
                  onChange={handlePersonNameChange}
                />
              </div>
            </div>
            <div>
              <div style={{ paddingBottom: "0.4rem" }}>
                <span className="span-state">
                  Sobrenome da pessoa <span style={{ color: "red" }}>*</span>
                </span>
              </div>
              <div className="padding-bottom-1">
                <TextField
                  id="outlined-basic"
                  className="input-style-work"
                  placeholder="Escreva o sobrenome"
                  variant="outlined"
                  name="surname"
                  value={data.entity_paying.person_name.surname}
                  onChange={handlePersonNameChange}
                />
              </div>
            </div>
            <div>
              <div style={{ paddingBottom: "0.4rem" }}>
                <span className="span-state">
                  Qual a sua relação com esta pessoa?
                  <span style={{ color: "red" }}>*</span>
                </span>
              </div>
              <div className="padding-bottom-1">
                <Select
                  className="style-select-work"
                  labelId="select-state"
                  id="select-state"
                  value={data.entity_paying.relationship}
                  onChange={handlePersonRelationshipChange}
                >
                  {escortRelationship.map((state) => (
                    <MenuItem key={state.key} value={state.key}>
                      {state.value}
                    </MenuItem>
                  ))}
                </Select>
              </div>
            </div>
          </div>

          {!data.entity_paying.same_address && (
            <>
              <div className="div-1-inputs-marital">

                <div>
                  <div style={{ paddingBottom: "0.4rem" }}>
                    <span className="span-state">
                      País da pessoa<span style={{ color: "red" }}>*</span>
                    </span>
                  </div>
                  <div className="padding-bottom-1">
                    <Select
                      className="input-style-work"
                      labelId="select-state"
                      id="select-state"
                      name="country"
                      value={data.entity_paying.address ? data.entity_paying.address.country : ""}
                      onChange={handleAddressChange}
                    >
                      {Countries.map((countrie, index) => (
                        <MenuItem key={index} value={countrie.key}>
                          {countrie.value}
                        </MenuItem>
                      ))}
                    </Select>
                  </div>
                </div>

                <div>
                  <div style={{ paddingBottom: "0.4rem" }}>
                    <span className="span-state">
                      Estado da pessoa<span style={{ color: "red" }}>*</span>
                    </span>
                  </div>
                  <div className="padding-bottom-1">
                    <TextField
                      id="outlined-basic"
                      className="input-style-work"
                      placeholder="Escreva o sobrenome"
                      variant="outlined"
                      name="state"
                      value={data.entity_paying.address ? data.entity_paying.address.state : ""}
                      onChange={handleAddressChange}
                    />
                  </div>
                </div>

                <div>
                  <div style={{ paddingBottom: "0.4rem" }}>
                    <span className="span-state">
                      Cidade da pessoa<span style={{ color: "red" }}>*</span>
                    </span>
                  </div>
                  <div className="padding-bottom-1">
                    <TextField
                      id="outlined-basic"
                      className="input-style-work"
                      placeholder="Escreva o sobrenome"
                      variant="outlined"
                      name="city"
                      value={data.entity_paying.address ? data.entity_paying.address.city : ""}
                      onChange={handleAddressChange}
                    />
                  </div>
                </div>
              </div>

              <div className="div-2-inputs-work">
                <div>
                  <div style={{ paddingBottom: "0.4rem" }}>
                    <span className="span-state">
                      Endereço da pessoa<span style={{ color: "red" }}>*</span>
                    </span>
                  </div>
                  <div className="padding-bottom-1">
                    <TextField
                      id="outlined-basic"
                      className="style-select-work"
                      placeholder="Rua, bairro, número"
                      variant="outlined"
                      name="street"
                      value={data.entity_paying.address ? data.entity_paying.address.street : ""}
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
                    <InputMask mask="99999-999" maskChar=""
                      value={data.entity_paying.address ? data.entity_paying.address.zip_code : ""}
                      onChange={handleAddressChange}>
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

            </>
          )}

          <div className="div-2-inputs-work">
            <div>
              <div style={{ paddingBottom: "0.4rem" }}>
                <span className="span-state">
                  Telefone da pessoa<span style={{ color: "red" }}>*</span>
                </span>
              </div>
              <div className="padding-bottom-1">
                <InputMask mask="99+ (99) 99999-9999" maskChar=""
                  value={data.entity_paying.phone_number}
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
                  Email da pessoa<span style={{ color: "red" }}>*</span>
                </span>
              </div>
              <div className="padding-bottom-1">
                <TextField
                  id="outlined-basic"
                  className="style-select-work"
                  placeholder="email@exemplo.com"
                  variant="outlined"
                  value={data.entity_paying.email}
                  onChange={handleEmailChange}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {data.entity_paying.entity_type !== "O" &&
        data.entity_paying.entity_type !== "S" ? (
        <div>
          <div className="div-marital-padding">
            <div className="padding-bottom-title-input">
              <span className="title-header-2">Outra empresa/organização</span>
            </div>
            <div className="div-2-inputs-work">
              <div>
                <div style={{ paddingBottom: "0.4rem" }}>
                  <span className="span-state">
                    Nome da companhia/organização
                    <span style={{ color: "red" }}>*</span>
                  </span>
                </div>
                <div className="padding-bottom-1">
                  <TextField
                    id="outlined-basic"
                    className="input-style-work"
                    placeholder="Escreva o primeiro nome"
                    variant="outlined"
                    value={data.entity_paying.org_name}
                    onChange={handleOrgNameChange}
                  />
                </div>
              </div>
              <div>
                <div style={{ paddingBottom: "0.4rem" }}>
                  <span className="span-state">
                    Qual a sua relação com esta companhia/organização?
                    <span style={{ color: "red" }}>*</span>
                  </span>
                </div>
                <div className="padding-bottom-1">
                  <TextField
                    id="outlined-basic"
                    className="input-style-work"
                    placeholder="Empregado, prestador de serviço..."
                    variant="outlined"
                  />
                </div>
              </div>
            </div>

            <div className="div-1-inputs-marital">

              <div>
                <div style={{ paddingBottom: "0.4rem" }}>
                  <span className="span-state">
                    País da companhia/organização?
                    <span style={{ color: "red" }}>*</span>
                  </span>
                </div>
                <div className="padding-bottom-1">
                  <Select
                    className="input-style-work"
                    labelId="select-state"
                    id="select-state"
                    name="country"
                    value={data.entity_paying.address ? data.entity_paying.address.country : ""}
                    onChange={handleAddressChange}
                  >
                    {Countries.map((countrie, index) => (
                      <MenuItem key={index} value={countrie.key}>
                        {countrie.value}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
              </div>

              <div>
                <div style={{ paddingBottom: "0.4rem" }}>
                  <span className="span-state">
                    Estado da companhia/organização
                    <span style={{ color: "red" }}>*</span>
                  </span>
                </div>
                <div className="padding-bottom-1">
                  <TextField
                    id="outlined-basic"
                    className="input-style-work"
                    placeholder="Insira o estado aqui"
                    variant="outlined"
                    name="state"
                    value={data.entity_paying.address ? data.entity_paying.address.state : ""}
                    onChange={handleAddressChange}
                  />
                </div>
              </div>

              <div>
                <div style={{ paddingBottom: "0.4rem" }}>
                  <span className="span-state">
                    Cidade da companhia/organização
                    <span style={{ color: "red" }}>*</span>
                  </span>
                </div>
                <div className="padding-bottom-1">
                  <TextField
                    id="outlined-basic"
                    className="input-style-work"
                    placeholder="Insira a cidade aqui"
                    variant="outlined"
                    name="city"
                    value={data.entity_paying.address ? data.entity_paying.address.city : ""}
                    onChange={handleAddressChange}
                  />
                </div>
              </div>

            </div>

            <div className="div-2-inputs-work">
              <div>
                <div style={{ paddingBottom: "0.4rem" }}>
                  <span className="span-state">
                    Endereço da companhia/organização
                    <span style={{ color: "red" }}>*</span>
                  </span>
                </div>
                <div className="padding-bottom-1">
                  <TextField
                    id="outlined-basic"
                    className="style-select-work"
                    placeholder="Rua, bairro, número"
                    variant="outlined"
                    name="street"
                    value={data.entity_paying.address ? data.entity_paying.address.street : ""}
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
                  <InputMask mask="99999-999" maskChar=""
                    value={data.entity_paying.address ? data.entity_paying.address.zip_code : ""}
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
                    Telefone da companhia/organização
                    <span style={{ color: "red" }}>*</span>
                  </span>
                </div>
                <div className="padding-bottom-1">
                  <InputMask mask="55+ (99) 99999-9999" maskChar=""
                    value={data.entity_paying.phone_number}
                    onChange={handlePhoneNumberChange}
                  >
                    {() => (
                      <TextField
                        id="outlined-basic"
                        className="style-select-work"
                        placeholder="55+ (00) 00000-0000"
                        variant="outlined"
                      />
                    )}
                  </InputMask>
                </div>
              </div>
              <div>
                <div style={{ paddingBottom: "0.4rem" }}>
                  <span className="span-state">
                    Email da companhia/organização
                    <span style={{ color: "red" }}>*</span>
                  </span>
                </div>
                <div className="padding-bottom-1">
                  <TextField
                    id="outlined-basic"
                    className="style-select-work"
                    placeholder="email@exemplo.com"
                    variant="outlined"

                    value={data.entity_paying.email}
                    onChange={handleEmailChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Payer;
