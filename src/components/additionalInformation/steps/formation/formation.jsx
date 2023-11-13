import React, { useEffect, useState } from "react";
import "./formation.css";
import { MenuItem, Select, TextField } from "@mui/material";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import InputMask from "react-input-mask";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useData } from "../../../../dataContext/dataContext";
import dayjs from "dayjs";
import Countries from "../../../../datas/countries";

function Formation({ validateStep }) {
  const { data, updateData } = useData();

  const handleAddressSelectCountry = (event) => {
    const { value, name } = event.target;

    updateData({
      ...data,
      education: [
        {
          ...data.education[0],
          address: { ...data.education[0].address, [name]: value },
        },
      ],
    });
  };

  const handleDateUpdateData = (name, newDate) => {
    const formattedDate = dayjs(newDate).format("YYYY-MM-DD");

    debugger;
    updateData({
      ...data,
      education: [{ ...data.education[0], [name]: formattedDate }],
    });
  };

  const handleUpdateData = (event) => {
    const { value, name } = event.target;

    updateData({
      ...data,
      education: [{ ...data.education[0], [name]: value }],
    });
  };

  const handleChangeSelect = (event) => {
    const { value } = event.target;
    const boolValue = value === "Sim" ? true : false;

    if (boolValue) {
      updateData({
        ...data,
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
      });
    } else {
      updateData({ ...data, education: [] });
    }
  };

  useEffect(() => {
    validateStep();
  }, [data]);

  return (
    <div className="div-margin">
      <div className="padding-bottom">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <span className="title-header">Informações adicionais</span>
          </div>
          <div>
            <span className="title-header-1">Formação</span>
          </div>
        </div>
        <hr className="hr-color" />
      </div>
      <div className="div-marital-padding">
        <div className="padding-bottom-title-input">
          <span className="title-header-2">
            Já se formou no ensino médio ou faculdade?
            <span style={{ color: "red" }}>*</span>
          </span>
        </div>
        <div className="padding-radio-marital">
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="Sim"
            name="radio-buttons-group"
            className="subTitle-div-2"
            row
            value={data.education.length > 0 ? "Sim" : "Não"}
            onChange={handleChangeSelect}
          >
            <FormControlLabel value="Sim" control={<Radio />} label="Sim" />
            <FormControlLabel value="Não" control={<Radio />} label="Não" />
          </RadioGroup>
        </div>
      </div>
      {data.education.length > 0 ? (
        <div className="div-marital-padding">
          <div className="padding-bottom-title-input">
            <span className="title-header-2">Formação</span>
          </div>
          <div className="div-2-inputs-work">
            <div>
              <div style={{ paddingBottom: "0.4rem" }}>
                <span className="span-state">
                  Nome da instituição de ensino
                  <span style={{ color: "red" }}>*</span>
                </span>
              </div>
              <div className="padding-bottom-1">
                <TextField
                  id="outlined-basic"
                  className="style-select-work"
                  placeholder="Escreva o nome da instituição"
                  variant="outlined"
                  name="entity_name"
                  value={data.education[0].entity_name}
                  onChange={handleUpdateData}
                />
              </div>
            </div>
            <div>
              <div style={{ paddingBottom: "0.4rem" }}>
                <span className="span-state">
                  Curso de formação<span style={{ color: "red" }}>*</span>
                </span>
              </div>
              <div className="padding-bottom-1">
                <TextField
                  id="outlined-basic"
                  className="style-select-work"
                  placeholder="Escreva o curso de formação"
                  variant="outlined"
                  name="occupation_title"
                  value={data.education[0].occupation_title}
                  onChange={handleUpdateData}
                />
              </div>
            </div>
          </div>
          <div className="div-2-inputs-work">
            <div>
              <div style={{ paddingBottom: "0.4rem" }}>
                <span className="span-state">
                  Data de inicio da sua formação
                  <span style={{ color: "red" }}>*</span>
                </span>
              </div>
              <div className="padding-bottom-1">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    format="DD/MM/YYYY"
                    className="custom-date-picker-initial"
                    value={dayjs(data.education[0].start_date)}
                    onChange={(date) =>
                      handleDateUpdateData("start_date", date)
                    }
                  />
                </LocalizationProvider>
              </div>
            </div>
            <div>
              <div style={{ paddingBottom: "0.4rem" }}>
                <span className="span-state">
                  Data de termino da sua formação
                  <span style={{ color: "red" }}>*</span>
                </span>
              </div>
              <div className="padding-bottom-1">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    format="DD/MM/YYYY"
                    className="custom-date-picker-initial"
                    value={dayjs(data.education[0].end_date)}
                    onChange={(date) => handleDateUpdateData("end_date", date)}
                  />
                </LocalizationProvider>
              </div>
            </div>
          </div>
          <div className="div-1-inputs-marital">
            <div>
              <div style={{ paddingBottom: "0.4rem" }}>
                <span className="span-state">
                  País da instituição de ensino
                  <span style={{ color: "red" }}>*</span>
                </span>
              </div>
              <div className="padding-bottom-1">
                <Select
                  className="input-style-work"
                  labelId="select-state"
                  id="select-state"
                  name="country"
                  value={data.education[0].address.country}
                  onChange={handleAddressSelectCountry}
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
                  Estado da instituição de ensino
                  <span style={{ color: "red" }}>*</span>
                </span>
              </div>
              <div className="padding-bottom-1">
                <TextField
                  id="outlined-basic"
                  className="style-select-work"
                  placeholder="Escreva o curso de formação"
                  variant="outlined"
                  name="state"
                  value={data.education[0].address.state}
                  onChange={handleAddressSelectCountry}
                />
              </div>
            </div>
            <div>
              <div style={{ paddingBottom: "0.4rem" }}>
                <span className="span-state">
                  Cidade da instituição de ensino
                  <span style={{ color: "red" }}>*</span>
                </span>
              </div>
              <div className="padding-bottom-1">
                <TextField
                  id="outlined-basic"
                  className="style-select-work"
                  placeholder="Escreva o curso de formação"
                  variant="outlined"
                  name="city"
                  value={data.education[0].address.city}
                  onChange={handleAddressSelectCountry}
                />
              </div>
            </div>
          </div>
          <div className="div-2-inputs-work">
            <div>
              <div style={{ paddingBottom: "0.4rem" }}>
                <span className="span-state">
                  Endereço da instituição de ensino
                  <span style={{ color: "red" }}>*</span>
                </span>
              </div>
              <div className="padding-bottom-1">
                <TextField
                  id="outlined-basic"
                  className="style-select-work"
                  placeholder="Escreva o endereço"
                  variant="outlined"
                  name="street"
                  value={data.education[0].address.street}
                  onChange={handleAddressSelectCountry}
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
                  value={data.education[0].address.zip_code}
                  onChange={handleAddressSelectCountry}
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
                <InputMask
                  mask="99+ (99) 99999-9999"
                  maskChar=""
                  value={data.education[0].phone_number}
                  onChange={handleUpdateData}
                >
                  {() => (
                    <TextField
                      id="outlined-basic"
                      className="style-select-work"
                      placeholder="99+ (00) 00000-0000"
                      variant="outlined"
                      name="phone_number"
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
                />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Formation;
