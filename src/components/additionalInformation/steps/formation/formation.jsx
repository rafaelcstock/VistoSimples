import React, { useEffect, useState } from "react";
import "./formation.css";
import { MenuItem, Select, Stack, TextField } from "@mui/material";
import { FormControlLabel, Radio, RadioGroup, Button } from "@mui/material";
import InputMask from "react-input-mask";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useData } from "../../../../dataContext/dataContext";
import dayjs from "dayjs";
import Countries from "../../../../datas/countries";

function Formation({ validateStep }) {
  const { data, updateData } = useData();
  const [isStartDateValid, setIsStartDateValid] = useState(true);
  const [isEndDateValid, setIsEndDateValid] = useState(true);

  const [showAddFormationButton, setShowAddFormationButton] = useState(true);

  const handleAddressSelectCountry = (event, index) => {
    const { value, name } = event.target;

    const updatedEducation = [...data.education];
    updatedEducation[index].address[name] = value;

    updateData({
      ...data,
      education: updatedEducation,
    });
  };

  const handleDateUpdateData = (index, name, newDate) => {
    let isValid = true;

    if (newDate && dayjs(newDate).isValid() && dayjs(newDate).isBefore(dayjs())) {
      const formattedDate = dayjs(newDate).format("YYYY-MM-DD");

      const updatedEducation = [...data.education];
      updatedEducation[index][name] = formattedDate;

      updateData({
        ...data,
        education: updatedEducation,
      });
    } else {
      isValid = false;

      const updatedEducation = [...data.education];
      updatedEducation[index][name] = "";

      updateData({
        ...data,
        education: updatedEducation,
      });
    }

    if (name === "start_date") {
      setIsStartDateValid(isValid);
    } else if (name === "end_date") {
      setIsEndDateValid(isValid);
    }
  };

  const handleUpdateData = (index, event) => {
    const { value, name } = event.target;

    const updatedEducation = [...data.education];
    updatedEducation[index][name] = value;

    updateData({
      ...data,
      education: updatedEducation,
    });
  };

  const handleChangeSelect = (event) => {
    const { value } = event.target;
    const boolValue = value === "Sim" ? true : false;

    if (boolValue) {
      updateData({
        ...data,
        education: [
          ...data.education,
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
      setShowAddFormationButton(true);
    } else {
      updateData({ ...data, education: [] });
      
      setShowAddFormationButton(false);
    }
  };

  const handleAddAnotherFormation = () => {
    const newEducationItem = {
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
    };

    updateData({
      ...data,
      education: [...data.education, newEducationItem],
    });
  };

  const handleDeleteFormation = (index) => {
    const updatedEducation = [...data.education];
    updatedEducation.splice(index, 1);

    updateData({
      ...data,
      education: updatedEducation,
    });
  };

  useEffect(() => {
    validateStep();
  }, [data]);

  return (
    <div className="div-margin">
      <div className="padding-bottom">
        <div className="padding-bottomFormation" style={{ display: "flex", justifyContent: "space-between" }}>
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
      {data.education.map((educationItem, index) => (
        <div key={index} className="div-marital-padding">
          <Stack sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }} className="padding-bottom-title-input">
            <span className="title-header-2">Formação</span>
            <Button
              sx={{
                color: "#fff",
                padding: "0.5em",
                marginRight: ".8em",
                fontWeight: "bold",
                borderRadius: "8px",
                textTransform: "none",
                fontFamily: "'Outfit', sans-serif",
                backgroundColor: "#FF3D00",
                "&:hover": {
                  backgroundColor: "#D32F2F",
                },
              }}
              onClick={() => handleDeleteFormation(index)}
            >
              Excluir formação
            </Button>
          </Stack>
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
                  value={educationItem.entity_name}
                  onChange={(event) => handleUpdateData(index, event)}
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
                  value={educationItem.occupation_title}
                  onChange={(event) => handleUpdateData(index, event)}
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
                    className={`custom-date-picker-initialFormation ${isStartDateValid ? "" : "invalid-date"
                      }`}
                    value={educationItem.start_date ? dayjs(educationItem.start_date) : null}
                    onChange={(date) => handleDateUpdateData(index, "start_date", date)}
                  />
                </LocalizationProvider>
                {!isStartDateValid && (
                  <span className="error-message" style={{ color: "red" }}>
                    A data de início não pode ser superior à data atual.
                  </span>
                )}
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
                    className={`custom-date-picker-initialFormation ${isEndDateValid ? "" : "invalid-date"
                      }`}
                    value={educationItem.end_date ? dayjs(educationItem.end_date) : null}
                    onChange={(date) => handleDateUpdateData(index, "end_date", date)}
                  />
                </LocalizationProvider>
                {!isEndDateValid && (
                  <span className="error-message" style={{ color: "red" }}>
                    A data de término não pode ser superior à data atual.
                  </span>
                )}
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
                  value={educationItem.address.country}
                  onChange={(event) => handleAddressSelectCountry(event, index)}
                >
                  {Countries.map((countrie, countryIndex) => (
                    <MenuItem key={countryIndex} value={countrie.key}>
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
                  value={educationItem.address.state}
                  onChange={(event) => handleAddressSelectCountry(event, index)}
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
                  value={educationItem.address.city}
                  onChange={(event) => handleAddressSelectCountry(event, index)}
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
                  value={educationItem.address.street}
                  onChange={(event) => handleAddressSelectCountry(event, index)}
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
                  value={educationItem.address.zip_code}
                  onChange={(event) => handleAddressSelectCountry(event, index)}
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
        </div>
      ))}
      <Button
        sx={{
          color: "#fff",
          padding: "1em",
          fontWeight: "bold",
          borderRadius: "8px",
          textTransform: "none",
          backgroundColor: "#2F5FE3",
          fontFamily: "'Outfit', sans-serif",
          display: showAddFormationButton ? "block" : "none",
          "&:hover": {
            color: "#2F5FE3",
          },
        }}
        onClick={handleAddAnotherFormation}
      >
        Adicionar outra formação  +
      </Button>
    </div>
  );
}

export default Formation;
