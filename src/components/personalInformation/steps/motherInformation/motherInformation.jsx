import React, { useEffect, useState } from "react";
import "./motherInformation.css";
import { MenuItem, Select, TextField } from "@mui/material";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import relativeUSStatus from "../../../../datas/relative_us_status";
import { useData } from "../../../../dataContext/dataContext";
import dayjs from "dayjs";

function MotherInformation({ validateStep = { validateStep } }) {
  const { data, updateData } = useData();

  const handleLocatingChange = (event) => {
    const { value } = event.target;

    data({ ...data, mother: { ...data.mother, locating_in_us: value } });
  };

  const handleInfoAboutMotherChange = (event) => {
    const { value } = event.target;

    const boolValue = value === "Sim" ? true : false;

    if (boolValue) {
      updateData({ ...data, hasInformationAboutMother: boolValue });
    } else {
      updateData({
        ...data,
        hasInformationAboutMother: boolValue,
        mother: {
          name: { surname: "", given_name: "" },
          birth_date: null,
          us_status: null,
        },
      });
    }
  };

  const handleBirthDateChange = (selectedDate) => {
    const formattedDate = dayjs(selectedDate).format("YYYY-MM-DD");
    updateData({
      ...data,
      mother: { ...data.mother, birth_date: formattedDate },
    });
  };

  const handleNameChange = (event) => {
    const { value, name } = event.target;
    updateData({
      ...data,
      mother: { ...data.mother, name: { ...data.mother.name, [name]: value } },
    });
  };

  const handleUsStatusChange = (event) => {
    const { value } = event.target;

    updateData({ ...data, mother: { ...data.mother, us_status: value } });
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
              Informação adicionais da sua mãe
            </span>
          </div>
        </div>
        <hr className="hr-color" />
      </div>
      <div className="div-family-padding">
        <div className="padding-bottom-family">
          <span className="title-header-2">
            Você tem informações básica sobre sua mãe?
            <span style={{ color: "red" }}>*</span>
          </span>
        </div>
        <div className="padding-bottom-family">
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="Sim"
            name="radio-buttons-group"
            className="subTitle-div-2"
            row
            value={data.mother.hasInformationAboutMother}
            onChange={handleInfoAboutMotherChange}
          >
            <FormControlLabel value="Sim" control={<Radio />} label="Sim" />
            <FormControlLabel value="Não" control={<Radio />} label="Não" />
          </RadioGroup>
        </div>
      </div>
      {data.hasInformationAboutMother ? (
        <div>
          <div className="div-family-padding">
            <div className="div-family-inputs">
              <div>
                <div style={{ paddingBottom: "0.4rem" }}>
                  <span className="span-state">
                    Nome da sua mãe<span style={{ color: "red" }}>*</span>
                  </span>
                </div>
                <div>
                  <TextField
                    id="outlined-basic"
                    className="input-style-family"
                    placeholder="Escreva o primeiro nome"
                    variant="outlined"
                    name="given_name"
                    value={data.mother.name.given_name}
                    onChange={handleNameChange}
                  />
                </div>
              </div>
              <div>
                <div style={{ paddingBottom: "0.4rem" }}>
                  <span className="span-state">
                    Sobrenome da sua mãe<span style={{ color: "red" }}>*</span>
                  </span>
                </div>
                <div>
                  <TextField
                    id="outlined-basic"
                    className="input-style-family"
                    placeholder="Escreva o sobrenome"
                    variant="outlined"
                    name="surname"
                    value={data.mother.name.surname}
                    onChange={handleNameChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="div-family-padding">
            <div className="div-family-inputs">
              <div>
                <div style={{ paddingBottom: "0.4rem" }}>
                  <span className="span-state">
                    Qual a data de nascimento da sua mãe
                    <span style={{ color: "red" }}>*</span>
                  </span>
                </div>
                <div>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      format="DD/MM/YYYY"
                      className="custom-date-picker"
                      value={dayjs(data.mother.birth_date)}
                      onChange={handleBirthDateChange}
                    />
                  </LocalizationProvider>
                </div>
              </div>
            </div>
          </div>
          <div className="div-family-padding">
            <div>
              <div className="padding-bottom-family">
                <span className="title-header-2">
                  Sua mãe está nos Estados Unidos?
                  <span style={{ color: "red" }}>*</span>
                </span>
              </div>
              <div className="padding-bottom-family">
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="Sim"
                  name="radio-buttons-group"
                  className="subTitle-div-2"
                  row
                  value={data.mother.locating_in_us ? "Sim" : "Não"}
                  onChange={handleLocatingChange}
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
          <div className="div-family-padding">
            <div className="div-family-inputs">
              <div>
                <div style={{ paddingBottom: "0.4rem" }}>
                  <span className="span-state">
                    Qual a situação da sua mãe nos Estados Unidos
                    <span style={{ color: "red" }}>*</span>
                  </span>
                </div>
                <div>
                  <Select
                    className="style-select-initial input-style-initial"
                    placeholder="teste"
                    value={data.mother.us_status}
                    onChange={handleUsStatusChange}
                  >
                    {relativeUSStatus.map((status) => (
                      <MenuItem key={status.key} value={status.key}>
                        {status.value}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default MotherInformation;
