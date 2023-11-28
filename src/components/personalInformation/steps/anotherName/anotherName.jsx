import React, { useEffect, useState } from "react";
import "./anotherName.css";
import { FormControlLabel, Radio, RadioGroup, TextField } from "@mui/material";
import { useData } from "../../../../dataContext/dataContext";

function AnotherName({ validateStep }) {
  const { data, updateData } = useData();

  const handleChangeSelect = (event) => {
    const { value } = event.target;

    const boolValue = value === "Sim" ? true : false;

    if (boolValue) {
      updateData({ ...data, hasAnotherName: boolValue });
    } else {
      updateData({
        ...data,
        hasAnotherName: boolValue,
        other_name: { full_name: null, surname: null, given_name: null },
      });
    }
  };

  const handleNameChange = (event) => {
    const { value, name } = event.target;

    if (/^[a-zA-Z\s]+$/.test(value) || value === "") {
      updateData({
        ...data,
        other_name: { ...data.other_name, [name]: value },
      });
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
            <span className="title-header">Informações Pessoais</span>
          </div>
          <div>
            <span className="title-header-1">Outro nome</span>
          </div>
        </div>
        <hr className="hr-color" />
      </div>
      <div className="div-name-padding">
        <div>
          <div
            className="div-another-padding"
            style={{ paddingBottom: "0.4rem" }}
          >
            <span className="span-state">
              Já teve outro nome?<span style={{ color: "red" }}>*</span>
            </span>
          </div>
          <div className="div-another-padding">
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="Não"
            name="radio-buttons-group"
            className="subTitle-div-2"
            row
            value={data.hasAnotherName ? "Sim" : "Não"}
            onChange={handleChangeSelect}
          >
            <FormControlLabel value="Sim" control={<Radio />} label="Sim" />
            <FormControlLabel value="Não" control={<Radio />} label="Não" />
          </RadioGroup>
          </div>
        </div>
      </div>
      {data.hasAnotherName ? (
        <div className="div-name-padding">
          <div className="padding-bottom-1 div-another-padding">
            <span className="title-header-2">
              Outro nome(a)<span style={{ color: "red" }}>*</span>
            </span>
          </div>
          <div className="div-grid-another-inputs">
            <div>
              <div style={{ paddingBottom: "0.4rem" }}>
                <span className="span-state">
                  Digite seu antigo primeiro nome
                  <span style={{ color: "red" }}>*</span>
                </span>
              </div>
              <div className="padding-bottom-1">
                <TextField
                  id="outlined-basic"
                  className="input-style-another"
                  placeholder="Escreva o seu primeiro nome"
                  variant="outlined"
                  name="given_name"
                  value={data.other_name.given_name}
                  onChange={handleNameChange}
                />
              </div>
            </div>
            <div>
              <div style={{ paddingBottom: "0.4rem" }}>
                <span className="span-state">
                  Digite seu antigo sobrenome
                  <span style={{ color: "red" }}>*</span>
                </span>
              </div>
              <div className="padding-bottom-1">
                <TextField
                  id="outlined-basic"
                  className="input-style-another"
                  placeholder="Escreva o seu sobrenome"
                  variant="outlined"
                  name="surname"
                  value={data.other_name.surname}
                  onChange={handleNameChange}
                />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default AnotherName;
