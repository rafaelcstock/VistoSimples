import React, { useEffect, useState } from "react";
import "./revokedVisa.css";
import { MenuItem, Select, TextField } from "@mui/material";
import statesBrazilianService from "../../../../services/statesBrazilianService";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import InputMask from "react-input-mask";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useData } from "../../../../dataContext/dataContext";

function RevokedVisa({ validateStep }) {
  const { data, updateData } = useData();

  const getStates = async () => {
    const response = await statesBrazilianService.getStates();
    setStates(response);
  };

  const [states, setStates] = useState([]);

  const handleChangeSelect = (event) => {
    const { value } = event.target;
    const boolValue = value === "Sim" ? true : false;

    updateData({ old_visa: { ...data.old_visa, revoked: boolValue } });
  };

  const handleRevokedReasonChange = (event) => {
    const { value } = event.target;
    updateData({ old_visa: { ...data.old_visa, revoked_reason: value } });
  };

  useEffect(() => {
    getStates();
  }, []);

  useEffect(() => {
    validateStep();
  }, [data]);

  return (
    <div className="div-margin">
      <div className="padding-bottom">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <span className="title-header">Visto revogado</span>
          </div>
        </div>
        <hr className="hr-color" />
      </div>
      <div className="div-marital-padding">
        <div className="padding-bottom-title-input">
          <span className="title-header-2">
            Já revogaram o seu visto?
          </span>
        </div>
        <div className="padding-radio-marital">
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="Sim"
            name="radio-buttons-group"
            className="subTitle-div-2"
            row
            value={data.old_visa?.revoked ? "Sim" : "Não"}
            onChange={handleChangeSelect}
          >
            <FormControlLabel value="Sim" control={<Radio />} label="Sim" />
            <FormControlLabel value="Não" control={<Radio />} label="Não" />
          </RadioGroup>
        </div>
      </div>
      {data.old_visa?.revoked ? (
        <div className="div-marital-padding">
          <div className="padding-visa">
            <div>
              <div style={{ paddingBottom: "0.4rem" }}>
                <span className="span-state">
                  Motivo da revogação do visto
                  <span style={{ color: "red" }}>*</span>
                </span>
              </div>
              <div className="padding-bottom-1">
                <TextField
                  id="outlined-basic"
                  className="style-input-visa"
                  placeholder="Escreva o motivo da revogação"
                  variant="outlined"
                  value={data.old_visa?.revoked_reason}
                  onChange={handleRevokedReasonChange}
                />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default RevokedVisa;
