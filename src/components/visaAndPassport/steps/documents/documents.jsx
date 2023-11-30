import React, { useEffect, useState } from "react";
import "./documents.css";
import { MenuItem, Select, TextField } from "@mui/material";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import passportType from "../../../../datas/passport_type";
import Countries from "../../../../datas/countries";
import { useData } from "../../../../dataContext/dataContext";
import dayjs from "dayjs";

function Documents({ validateStep }) {
  const { data, updateData } = useData();

  const handlePassportChange = (event) => {
    const { value, name } = event.target;

    if (name === "lost_reason" && value === "") {
      updateData({
        passport: { ...data.passport, [name]: value },
        lost_or_stolen_passports: null,
      });
    } else {
      debugger
      const newPassportData = {
        passport: { ...data.passport, [name]: value },
        lost_or_stolen_passports: [
          {
            document_type: "R",
            number: "",
            custom_document_reason: null,
            book_number: null,
            country: "AFGH",
            city: null,
            state: null,
            issuance_date: null,
            expiration_date: null,
            lost_reason: null,
          },
        ],
      };
      updateData(newPassportData);
    }
  };


  const handleDateUpdateData = (name, newDate) => {
    if (newDate && dayjs(newDate).isValid()) {
      const formattedDate = dayjs(newDate).format("YYYY-MM-DD");

      updateData({ passport: { ...data.passport, [name]: formattedDate } });
    } else {
      updateData({ passport: { ...data.passport, [name]: "" } });
    }
  };

  const handleLostOrStolenListChange = (event) => {
    const { value, name } = event.target;
    updateData({
      lost_or_stolen_passports: [
        {
          ...data.lost_or_stolen_passports[0],
          [name]: value,
        },
      ],
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
            <span className="title-header">Documentos</span>
          </div>
          <div>
            <span className="title-header-1">Passaporte</span>
          </div>
        </div>
        <hr className="hr-color" />
      </div>
      <div className="div-marital-padding">
        <div className="padding-bottom-title-input">
          <span className="title-header-2">
            Passaporte<span style={{ color: "red" }}>*</span>
          </span>
        </div>
        <div className="div-2-inputs-work">
          <div>
            <div style={{ paddingBottom: "0.4rem" }}>
              <span className="span-state">
                Qual o seu tipo de passaporte
                <span style={{ color: "red" }}>*</span>
              </span>
            </div>
            <div className="padding-bottom-1">
              <Select
                className="style-select-work"
                labelId="select-state"
                id="select-state"
                name="document_type"
                value={data.passport.document_type}
                onChange={handlePassportChange}
              >
                {passportType.map((state) => (
                  <MenuItem key={state.key} value={state.key}>
                    {state.value}
                  </MenuItem>
                ))}
              </Select>
            </div>
          </div>
          <div>
            <div style={{ paddingBottom: "0.4rem" }}>
              <span className="span-state">
                Número do passaporte<span style={{ color: "red" }}>*</span>
              </span>
            </div>
            <div className="padding-bottom-1">
              <TextField
                id="outlined-basic"
                className="style-select-work"
                placeholder="Escreva o número do passaporte"
                variant="outlined"
                type="number"
                name="number"
                value={data.passport.number}
                onChange={handlePassportChange}
              />
            </div>
          </div>
        </div>
        <div className="div-1-inputs-marital">
          <div>
            <div style={{ paddingBottom: "0.4rem" }}>
              <span className="span-state">
                País de emissão do passaporte
                <span style={{ color: "red" }}>*</span>
              </span>
            </div>
            <div className="padding-bottom-1">
              <Select
                className="style-select-work"
                labelId="select-state"
                id="select-state"
                name="country"
                value={data.passport.country}
                onChange={handlePassportChange}
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
                Estado onde o passaporte foi emitido
                <span style={{ color: "red" }}>*</span>
              </span>
            </div>
            <div className="padding-bottom-1">
              <TextField
                id="outlined-basic"
                className="input-style-work"
                placeholder="Escreva o estado"
                variant="outlined"
                name="state"
                value={data.passport.state}
                onChange={handlePassportChange}
              />
            </div>
          </div>
          <div>
            <div style={{ paddingBottom: "0.4rem" }}>
              <span className="span-state">
                Cidade onde o passaporte foi emitido
                <span style={{ color: "red" }}>*</span>
              </span>
            </div>
            <div className="padding-bottom-1">
              <TextField
                id="outlined-basic"
                className="input-style-work"
                placeholder="Escreva a cidade"
                variant="outlined"
                name="city"
                value={data.passport.city}
                onChange={handlePassportChange}
              />
            </div>
          </div>
        </div>
        <div className="div-2-inputs-work">
          <div>
            <div style={{ paddingBottom: "0.4rem" }}>
              <span className="span-state">
                Data de emissão do passaporte
                <span style={{ color: "red" }}>*</span>
              </span>
            </div>
            <div className="padding-bottom-1">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  format="DD/MM/YYYY"
                  className="custom-date-picker-initialDocuments"
                  value={data.passport.issuance_date !== "" ? dayjs(data.passport.issuance_date) : null}
                  onChange={(date) =>
                    handleDateUpdateData("issuance_date", date)
                  }
                />
              </LocalizationProvider>
            </div>
          </div>
          <div>
            <div style={{ paddingBottom: "0.4rem" }}>
              <span className="span-state">
                Data de expiração do passaporte
                <span style={{ color: "red" }}>*</span>
              </span>
            </div>
            <div className="padding-bottom-1">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  format="DD/MM/YYYY"
                  className="custom-date-picker-initialDocuments"
                  value={data.passport.expiration_date !== "" ? dayjs(data.passport.expiration_date) : null}
                  onChange={(date) =>
                    handleDateUpdateData("expiration_date", date)
                  }
                />
              </LocalizationProvider>
            </div>
          </div>
        </div>
        <div className="padding-documents">
          <div>
            <div style={{ paddingBottom: "0.4rem" }}>
              <span className="span-state">
                Caso tenha selecionado outro como o seu tipo de passaporte,
                digite abaixo o tipo de seu passaporte
                <span style={{ color: "red" }}>*</span>
              </span>
            </div>
            <div className="padding-bottom-1">
              <TextField
                id="outlined-basic"
                className="style-input-doc"
                placeholder="Digite o tipo"
                variant="outlined"
                name="custom_document_reason"
                value={data.passport.custom_document_reason}
                onChange={handlePassportChange}
              />
            </div>
          </div>
        </div>

        <div className="padding-documents">
          <div>
            <div style={{ paddingBottom: "0.4rem" }}>
              <span className="span-state">
                Já teve algum passaporte perdido ou roubado?
                <span style={{ color: "red" }}>*</span>
              </span>
            </div>
            <div className="padding-bottom-1">
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="Não tive meu passaporte perdido ou roubado"
                className="subTitle-div"
                row
                name="lost_reason"
                value={data.passport.lost_reason ? data.passport.lost_reason : ""}
                onChange={handlePassportChange}
              >
                <FormControlLabel
                  value={""}
                  control={<Radio />}
                  label="Não tive meu passaporte perdido ou roubado"
                />
                <FormControlLabel
                  value="Perdido"
                  control={<Radio />}
                  label="Perdido"
                />
                <FormControlLabel
                  value="Roubado"
                  control={<Radio />}
                  label="Roubado"
                />
              </RadioGroup>
            </div>
          </div>
        </div>
      </div>
      {data.passport.lost_reason === "Perdido" ||
        data.passport.lost_reason === "Roubado" ? (
        <div className="div-marital-padding">
          <div className="padding-bottom-title-input">
            <span className="title-header-2">
              Passaporte perdido ou roubado
              <span style={{ color: "red" }}>*</span>
            </span>
          </div>
          <div className="div-2-inputs-work">
            <div>
              <div style={{ paddingBottom: "0.4rem" }}>
                <span className="span-state">
                  Número do Passaporte
                </span>
              </div>
              <div className="padding-bottom-1">
                <TextField
                  id="outlined-basic"
                  className="style-select-work"
                  placeholder="Digite o número do passaporte"
                  variant="outlined"
                  type="number"
                  name="number"
                  value={data.lost_or_stolen_passports[0].number}
                  onChange={handleLostOrStolenListChange}
                />
              </div>
            </div>
            <div>
              <div style={{ paddingBottom: "0.4rem" }}>
                <span className="span-state">
                  País de passaporte <span style={{ color: "red" }}>*</span>
                </span>
              </div>
              <div className="padding-bottom-1">
                <Select
                  className="style-select-work"
                  labelId="select-state"
                  id="select-state"
                  name="country"
                  value={data.lost_or_stolen_passports[0].country}
                  onChange={handleLostOrStolenListChange}
                >
                  {Countries.map((state) => (
                    <MenuItem key={state.key} value={state.key}>
                      {state.value}
                    </MenuItem>
                  ))}
                </Select>
              </div>
            </div>

            <div>
              <div style={{ paddingBottom: "0.4rem" }}>
                <span className="span-state">
                  Qual o seu tipo de passaporte
                  <span style={{ color: "red" }}>*</span>
                </span>
              </div>
              <div className="padding-bottom-1">
                <Select
                  className="style-select-work"
                  labelId="select-state"
                  id="select-state"
                  name="document_type"
                  value={data.lost_or_stolen_passports[0].document_type}
                  onChange={handleLostOrStolenListChange}
                >
                  {passportType.map((state) => (
                    <MenuItem key={state.key} value={state.key}>
                      {state.value}
                    </MenuItem>
                  ))}
                </Select>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Documents;
