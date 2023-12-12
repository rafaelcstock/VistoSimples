import React, { useEffect, useState } from "react";
import "./CNH.css";
import { MenuItem, Select, TextField } from "@mui/material";
import statesBrazilianService from "../../../../services/statesBrazilianService";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import USStates from "../../../../datas/us_states";
import { useData } from "../../../../dataContext/dataContext";

function CNH({ validateStep }) {
  const { data, updateData } = useData();
  const [selectedState] = useState("");
  const [radioRequester, setRadioRequester] = useState("Sim");

  const handleUSStateChangeSelect = (event) => {
    const { value, name } = event.target;

    updateData({
      ...data,
      us_drivers_license: [
        {
          ...data.us_drivers_license[0],
          [name]: value,
        },
      ],
    });
  };

  const handleChangeRequester = (event) => {
    const { value } = event.target;
    const boolValue = value === "Sim" ? true : false;

    if (boolValue) {
      updateData({
        ...data,
        us_drivers_license: [
          {
            number: "",
            state: "",
          },
        ],
        hasUsDriversLicense: boolValue,
      });
    } else {
      updateData({
        ...data,
        us_drivers_license: null,
        hasUsDriversLicense: boolValue,
      });
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTo(0, 0);
  }, []);
  
  useEffect(() => {
    validateStep();
  }, [data]);

  return (
    <div className="div-margin">
      <div className="padding-bottom">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <span className="title-header">Carteira de motorista</span>
          </div>
        </div>
        <hr className="hr-color" />
      </div>
      <div className="div-cnh-padding">
        <div className="div-cnh-inputs">
          <div>
            <div className="padding-bottom-1">
              <span className="title-header-2">
                Já teve ou tem carteira de motorista nos Estados Unidos?
                <span style={{ color: "red" }}>*</span>
              </span>
            </div>
            <div className="padding-bottom-1">
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="Sim"
                name="radio-buttons-group"
                className="subTitle-div-2"
                row
                value={data.hasUsDriversLicense ? "Sim" : "Não"}
                onChange={handleChangeRequester}
              >
                <FormControlLabel value="Sim" control={<Radio />} label="Sim" />
                <FormControlLabel value="Não" control={<Radio />} label="Não" />
              </RadioGroup>
            </div>
          </div>
        </div>
      </div>
      {data.hasUsDriversLicense ? (
        <div>
          <div className="div-cng-padding">
            <div className="div-cnh-inputs">
              <div>
                <div style={{ paddingBottom: "0.4rem" }}>
                  <span className="span-state">
                    Qual o número da carteira nos Estados Unidos?
                    <span style={{ color: "red" }}>*</span>
                  </span>
                </div>
                <div className="padding-bottom-1">
                  <TextField
                    id="outlined-basic"
                    className="input-style"
                    placeholder="Escreva o número da carteira"
                    variant="outlined"
                    name="number"
                    value={
                      data.us_drivers_license
                        ? data.us_drivers_license[0].number
                        : ""
                    }
                    onChange={handleUSStateChangeSelect}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="div-cng-padding">
            <div className="div-cnh-inputs">
              <div>
                <div style={{ paddingBottom: "0.4rem" }}>
                  <span className="span-state">
                    Selecione o estado em que tirou a carteira
                    <span style={{ color: "red" }}>*</span>
                  </span>
                </div>
                <div className="padding-bottom-1">
                  <Select
                    className="style-select input-styleSelect"
                    labelId="select-state"
                    id="select-state"
                    name="state"
                    value={
                      data.us_drivers_license
                        ? data.us_drivers_license[0].state
                        : ""
                    }
                    onChange={handleUSStateChangeSelect}
                  >
                    {USStates.map((state) => (
                      <MenuItem key={state.key} value={state.key}>
                        {state.value}
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

export default CNH;
