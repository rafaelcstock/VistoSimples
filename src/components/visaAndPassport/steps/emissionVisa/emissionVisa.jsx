import React, { useEffect, useState } from "react";
import "./emissionVisa.css";
import { MenuItem, Select, TextField } from "@mui/material";
import statesBrazilianService from "../../../../services/statesBrazilianService";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import InputMask from "react-input-mask";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import cityToConsulateId from "../../../../datas/city_to_consulate_id";
import { useData } from "../../../../dataContext/dataContext";
import dayjs from "dayjs";

function EmissionVisa({ validateStep }) {
  const { data, updateData } = useData();

  const handleHasOldVisaChange = (event) => {
    const { value } = event.target;
    const boolValue = value === "Sim" ? true : false;

    if (boolValue) {
      updateData({
        old_visa: {
          consulate_id: 54,
          issue_date: "",
          expiration_date: "",
          number: "",
          applying_for_same_type: true,
          applying_for_same_country: true,
          ten_printed: true,
          lost_or_stolen: true,
          lost_or_stolen_year: 0,
          lost_or_stolen_reason: "",
          revoked: true,
          revoked_reason: "",
        },
      });
    } else {
      updateData({
        old_visa: null,
      });
    }
  };

  const handleOldVisaDataChange = (event) => {
    const { value, name } = event.target;

    if (name === "applying_for_same_type") {
      const boolValue = value === "Sim" ? true : false;
      updateData({
        old_visa: {
          ...data.old_visa,
          [name]: boolValue,
        },
      });
      return;
    }

    updateData({
      old_visa: {
        ...data.old_visa,
        [name]: name === "consulate_id" ? Number(value) : value,
      },
    });
  };

  const handleDateUpdateData = (name, newDate) => {
    if (newDate && dayjs(newDate).isValid()) {
      const formattedDate = dayjs(newDate).format("YYYY-MM-DD");

      updateData({
        ...data,
        old_visa: { ...data.old_visa, [name]: formattedDate },
      });
    } else {
      updateData({
        ...data,
        old_visa: { ...data.old_visa, [name]: "" },
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
            <span className="title-header">Emissão do visto</span>
          </div>
        </div>
        <hr className="hr-color" />
      </div>
      <div className="div-marital-padding">
        <div className="padding-bottom-title-input">
          <span className="title-header-2">
            Já teve visto americado emitido anteriormente?
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
            value={data.old_visa ? "Sim" : "Não"}
            onChange={handleHasOldVisaChange}
          >
            <FormControlLabel value="Sim" control={<Radio />} label="Sim" />
            <FormControlLabel value="Não" control={<Radio />} label="Não" />
          </RadioGroup>
        </div>
      </div>
      {data.old_visa ? (
        <div>
          <div className="div-marital-padding">
            <div className="div-1-inputs-marital">
              <div>
                <div style={{ paddingBottom: "0.4rem" }}>
                  <span className="span-state">
                    Digite o número do visto
                    <span style={{ color: "red" }}>*</span>
                  </span>
                </div>
                <div className="padding-bottom-1">
                  <TextField
                    id="outlined-basic"
                    className="input-style-work"
                    placeholder="Escreva o número do visto"
                    variant="outlined"
                    name="number"
                    value={data.old_visa.number}
                    onChange={handleOldVisaDataChange}
                  />
                </div>
              </div>
              <div>
                <div style={{ paddingBottom: "0.4rem" }}>
                  <span className="span-state">
                    Data de emissão do visto
                    <span style={{ color: "red" }}>*</span>
                  </span>
                </div>
                <div className="padding-bottom-1">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      format="DD/MM/YYYY"
                      className="custom-date-picker-initial"
                      value={data.old_visa.issue_date !== "" ? dayjs(data.old_visa.issue_date) : null}
                      onChange={(newDate) =>
                        handleDateUpdateData("issue_date", newDate)
                      }
                    />
                  </LocalizationProvider>
                </div>
              </div>
              <div>
                <div style={{ paddingBottom: "0.4rem" }}>
                  <span className="span-state">
                    Data de expiração do visto
                    <span style={{ color: "red" }}>*</span>
                  </span>
                </div>
                <div className="padding-bottom-1">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      format="DD/MM/YYYY"
                      className="custom-date-picker-initial"
                      value={data.old_visa.expiration_date !== "" ? dayjs(data.old_visa.expiration_date) : null}
                      onChange={(newDate) =>
                        handleDateUpdateData("expiration_date", newDate)
                      }
                    />
                  </LocalizationProvider>
                </div>
              </div>
            </div>
            <div className="div-2-inputs-work">
              <div>
                <div style={{ paddingBottom: "0.4rem" }}>
                  <span className="span-state">
                    Cidade que foi emitido
                    <span style={{ color: "red" }}>*</span>
                  </span>
                </div>
                <div className="padding-bottom-1">
                  <Select
                    className="input-style-work"
                    labelId="select-state"
                    id="select-state"
                    name="consulate_id"
                    value={data.old_visa.consulate_id}
                    onChange={handleOldVisaDataChange}
                  >
                    {cityToConsulateId.map((state) => (
                      <MenuItem key={state.key} value={state.key}>
                        {state.value}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
              </div>
            </div>
          </div>
          <div className="div-marital-padding">
            <div className="padding-bottom-title-input">
              <span className="title-header-2">
                Você esta aplicando para o mesmo tipo do seu último visto?
                <span style={{ color: "red" }}>*</span>
              </span>
            </div>
            <div className="padding-radio-marital">
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                className="subTitle-div-2"
                row
                name="applying_for_same_type"
                value={data.old_visa.applying_for_same_type ? "Sim" : "Não"}
                onChange={handleOldVisaDataChange}
              >
                <FormControlLabel value="Sim" control={<Radio />} label="Sim" />
                <FormControlLabel value="Não" control={<Radio />} label="Não" />
              </RadioGroup>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default EmissionVisa;
