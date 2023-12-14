import React, { useEffect, useState } from "react";
import "./initialInformation.css";
import { MenuItem, Select, TextField } from "@mui/material";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import InputMask from "react-input-mask";
import MaritalStatus from "../../../../datas/marital_status";
import dayjs from "dayjs";

import { useData } from "../../../../dataContext/dataContext";

function InitialInformation({ validateStep, isValidInitialInformation }) {
  const [isBirthDateValid, setIsBirthDateValid] = useState(true);

  const { data, updateData } = useData();

  const handleMaritalStatusChangeSelect = (event) => {
    const { value } = event.target;

    if (value == "M" || value == "P") {
      updateData({
        ...data,
        spouse: {
          name: {
            surname: "",
            given_name: "",
            full_name: null,
          },
          birth: {
            date: "",
            city: "",
            state: null,
            country: "",
          },
          nationality: "",
          address_type: "H",
          address: {
            street: "",
            complement: "",
            city: "",
            state: "",
            state_acronym: null,
            zip_code: "",
            country: "",
          },
        },
        former_spouses: null,
        deceased_spouse: null,
        marital_status: value,
      });
    }

    if (value == "D" || value == "L") {
      updateData({
        ...data,
        former_spouses: [
          {
            name: {
              surname: "",
              given_name: "",
              full_name: null,
            },
            birth: {
              date: "",
              city: "",
              state: null,
              country: "",
            },
            nationality_country: "",
            marriage_start_date: "",
            marriage_end_date: "",
            end_marriage_reason: "Consesual",
            end_marriage_country: "",
          },
        ],
        deceased_spouse: null,
        spouse: null,
        marital_status: value,
      });
    }

    if (value == "W") {
      updateData({
        ...data,
        deceased_spouse: {
          name: {
            surname: "",
            given_name: "",
            full_name: null,
          },
          birth: {
            date: "",
            city: "",
            state: null,
            country: "",
          },
          nationality: "",
        },
        former_spouses: null,
        spouse: null,
        marital_status: value,
      });
    }

    if (value == "S") {
      updateData({
        ...data,
        deceased_spouse: null,
        former_spouses: null,
        spouse: null,
        marital_status: value,
      });
    }
  };

  const handleChangeGender = (event) => {
    const { value } = event.target;
    updateData({ ...data, gender: value });
  };

  const handleNameChange = (event) => {
    const { value, name } = event.target;

    if (/^[A-Za-z\s]+$/.test(value) || value === "") {
      updateData({ ...data, name: { ...data.name, [name]: value } });
    }
  };

  const handleBirthDateChange = (selectedDate) => {
    if (selectedDate && dayjs(selectedDate).isValid()) {
      const currentDate = dayjs();
      const selectedDateTime = dayjs(selectedDate);

      if (selectedDateTime.isAfter(currentDate)) {
        setIsBirthDateValid(false);
        updateData({ ...data, birth: { ...data.birth, date: "" } });
      } else {
        const formattedDate = selectedDateTime.format("YYYY-MM-DD");
        updateData({ ...data, birth: { ...data.birth, date: formattedDate } });
        setIsBirthDateValid(true);
      }
    } else {
      updateData({ ...data, birth: { ...data.birth, date: "" } });
      setIsBirthDateValid(false);
    }
  };

  const handlePhoneNumberChange = (event) => {
    const { value, name } = event.target;
   
    updateData({ ...data, [name]: value });
  };

  const handleEmailChange = (event) => {
    const { value } = event.target;

    updateData({ ...data, email_address: value });
  };

  const handleOthersEmailChange = (event) => {
    const { value } = event.target;
    updateData({
      ...data,
      other_email_adresses: [value],
    });
  };

  const handleCPFChange = (event) => {
    const { value } = event.target;
    updateData({
      ...data,
      national_identification_number: value,
    });
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
        <div style={{ display: "flex", justifyContent: "space-between" }}
          className={"header-informations"}
        >
          <div>
            <span className="title-header">Informações Pessoais</span>
          </div>
          <div>
            <span className="title-header-1">Dados pessoais</span>
          </div>
        </div>
        <hr className="hr-color" />
      </div>
      <div className="div-initial-padding">
        <div className="div-grid-initial-inputs">
          <div>
            <div style={{ paddingBottom: "0.4rem" }}>
              <span className="span-state">
                Nome
                <span>
                  <span style={{ color: "red" }}>*</span>
                </span>
              </span>
            </div>
            <div className="padding-bottom-1">
              <TextField
                id="outlined-basic"
                className="input-style-initial"
                placeholder="Escreva o seu primeiro nome"
                variant="outlined"
                name="given_name"
                value={data.name.given_name}
                onChange={handleNameChange}
              />
            </div>
          </div>
          <div>
            <div style={{ paddingBottom: "0.4rem" }}>
              <span className="span-state">
                Sobrenome <span style={{ color: "red" }}>*</span>
              </span>
            </div>
            <div className="padding-bottom-1">
              <TextField
                id="outlined-basic"
                className="input-style-initial"
                placeholder="Escreva o seu sobrenome"
                variant="outlined"
                name="surname"
                value={data.name.surname}
                onChange={handleNameChange}
              />
            </div>
          </div>
        </div>
        <div className="div-grid-initial-inputs">
          <div>
            <div style={{ paddingBottom: "0.4rem" }}>
              <span className="span-state">
                Estado Civil <span style={{ color: "red" }}>*</span>
              </span>
            </div>
            <div className="padding-bottom-1"
            >
              <Select
                className="style-select-initial input-style-initial"
                value={data.marital_status}
                onChange={handleMaritalStatusChangeSelect}
              >
                {MaritalStatus.map((status) => (
                  <MenuItem key={status.key} value={status.key}>
                    {status.value}
                  </MenuItem>
                ))}
              </Select>
            </div>
          </div>
          <div>
            <div style={{ paddingBottom: "0.4rem" }}>
              <span className="span-state">
                Gênero <span style={{ color: "red" }}>*</span>
              </span>
            </div>
            <div className="padding-bottom-1">
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="F"
                name="radio-buttons-group"
                className="subTitle-div-2"
                row
                value={data.gender}
                onChange={handleChangeGender}
              >
                <FormControlLabel
                  value="F"
                  control={<Radio />}
                  label="Feminino"
                />
                <FormControlLabel
                  value="M"
                  control={<Radio />}
                  label="Masculino"
                />
              </RadioGroup>
            </div>
          </div>
        </div>
        <div className="div-grid-initial-inputs">
          <div>
            <div style={{ paddingBottom: "0.4rem" }}>
              <span className="span-state">
                Data de nascimento <span style={{ color: "red" }}>*</span>
              </span>
            </div>
            <div className="padding-bottom-1">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  format="DD/MM/YYYY"
                  className="custom-date-picker-initialInformation"
                  value={data.birth.date !== "" ? dayjs(data.birth.date) : null}
                  onChange={handleBirthDateChange}
                />
                {!isBirthDateValid && (
                  <div style={{ color: "red" }}>
                    A data não pode ser superior à data atual.
                  </div>
                )}
              </LocalizationProvider>
            </div>
          </div>
          <div>
            <div style={{ paddingBottom: "0.4rem" }}>
              <span className="span-state">
                CPF <span style={{ color: "red" }}>*</span>
              </span>
            </div>
            <div className="padding-bottom-1">
              <InputMask
                mask="999.999.999-99"
                maskChar=""
                value={data.national_identification_number}
                onChange={handleCPFChange}
              >
                {() => (
                  <TextField
                    id="outlined-basic"
                    className="input-style-initial"
                    type="text"
                    placeholder="000.000.000-00"
                    variant="outlined"
                  />
                )}
              </InputMask>
            </div>

            <div className="errorMessage">
              {!isValidInitialInformation.cpf && <> CPF inválido </>}
            </div>
          </div>
        </div>
        <div className="div-grid-initial-inputs">
          <div>
            <div style={{ paddingBottom: "0.4rem" }}>
              <span className="span-state">
                Telefone <span style={{ color: "red" }}>*</span>
              </span>
            </div>
            <div className="padding-bottom-1">
              <InputMask
                mask="+99 (99) 99999-9999"
                maskChar=""
                value={data.primary_phone_number}
                onChange={handlePhoneNumberChange}
              >
                {() => (
                  <TextField
                    id="outlined-basic"
                    className="input-style-initial"
                    type="text"
                    placeholder="+55 (00) 00000-0000"
                    variant="outlined"
                    name="primary_phone_number"
                  />
                )}
              </InputMask>
            </div>
          </div>
          <div>
            <div style={{ paddingBottom: "0.4rem" }}>
              <span className="span-state">Telefone secundário</span>
            </div>
            <div className="padding-bottom-1">
              <InputMask
                mask="+99 (99) 99999-9999"
                maskChar=""
                value={data.secondary_phone_number}
                onChange={handlePhoneNumberChange}
              >
                {() => (
                  <TextField
                    id="outlined-basic"
                    className="input-style-initial"
                    type="text"
                    placeholder="+55 (00) 00000-0000"
                    variant="outlined"
                    name="secondary_phone_number"
                  />
                )}
              </InputMask>
            </div>
          </div>
        </div>
        <div className="div-grid-initial-inputs">
          <div>
            <div style={{ paddingBottom: "0.4rem" }}>
              <span className="span-state">
                Email principal <span style={{ color: "red" }}>*</span>
              </span>
            </div>
            <div className="padding-bottom-1">
              <TextField
                id="outlined-basic"
                className="input-style-initial"
                placeholder="email@exemplo.com"
                type="email"
                variant="outlined"
                value={data.email_address}
                onChange={handleEmailChange}
              />
            </div>

            <div className="errorMessage">
              {!isValidInitialInformation.email && (
                <> Formato de Email inválido</>
              )}
            </div>
          </div>
          <div>
            <div style={{ paddingBottom: "0.4rem" }}>
              <span className="span-state">Email secundário</span>
            </div>
            <div className="padding-bottom-1">
              <TextField
                id="outlined-basic"
                className="input-style-initial"
                placeholder="email@exemplo.com"
                type="email"
                variant="outlined"
                value={data.other_email_adresses[0]}
                onChange={handleOthersEmailChange}
              />
            </div>
            <div className="errorMessage">
              {!isValidInitialInformation.secondary_email && (
                <> Formato de Email inválido</>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InitialInformation;
