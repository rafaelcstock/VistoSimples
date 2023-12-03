import React, { useEffect, useState } from "react";
import "./maritalStatus.css";
import { MenuItem, Select, TextField } from "@mui/material";
import statesBrazilianService from "../../../../services/statesBrazilianService";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Countries from "../../../../datas/countries";
import { useData } from "../../../../dataContext/dataContext";
import dayjs from "dayjs";

function Divorced({ validateStep }) {
  const { data, updateData } = useData();

  const [isBirthDateValid, setIsBirthDateValid] = useState(true);
  const [isStartDateDateValid, setIsStartDateDateValid] = useState(true);
  const [isEndDateDateValid, setIsEndDateDateValid] = useState(true);

  const handleNameChange = (event) => {
    const { value, name } = event.target;

    if (/^[A-Za-z\s]+$/.test(value) || value === "") {
      updateData({
        former_spouses: [
          {
            ...data.former_spouses[0],
            name: { ...data.former_spouses[0].name, [name]: value },
          },
        ],
      });
    }
  };

  const handleChangeSelectCountrySeparation = (event) => {
    const { value } = event.target;

    updateData({
      former_spouses: [
        {
          ...data.former_spouses[0],
          end_marriage_country: value,
        },
      ],
    });
  };

  const handleChangeTypeSeparation = (event) => {
    const { value } = event.target;

    updateData({
      former_spouses: [
        {
          ...data.former_spouses[0],
          end_marriage_reason: value,
        },
      ],
    });
  };

  const handleBirthDateChange = (selectedDate) => {
    const isValid = validateDate(selectedDate);
   
    if (isValid) {
      const currentDate = dayjs();
      const selectedDateTime = dayjs(selectedDate);

      if (selectedDateTime.isAfter(currentDate)) {
        setIsBirthDateValid(false);
        updateData({
          former_spouses: [
            {
              ...data.former_spouses[0],
              birth: { ...data.former_spouses[0].birth, date: "" },
            },
          ],
        });
        return;
      }

      const formattedDate = selectedDateTime.format("YYYY-MM-DD");
      updateData({
        former_spouses: [
          {
            ...data.former_spouses[0],
            birth: { ...data.former_spouses[0].birth, date: formattedDate },
          },
        ],
      });
      setIsBirthDateValid(true);
      return;
    }

    updateData({
      former_spouses: [
        {
          ...data.former_spouses[0],
          birth: { ...data.former_spouses[0].birth, date: "" },
        },
      ],
    });
    setIsBirthDateValid(false);
  };

  const handleRangeMarriegeDateChange = (name, selectedDate) => {
    const isValid = validateDate(selectedDate);

    if (isValid) {
      const currentDate = dayjs();
      const selectedDateTime = dayjs(selectedDate);

      if (selectedDateTime.isAfter(currentDate)) {
        name === "marriage_start_date"
          ? setIsStartDateDateValid(false)
          : setIsEndDateDateValid(false);
        updateData({
          former_spouses: [
            {
              ...data.former_spouses[0],
              [name]: "",
            },
          ],
        });
        return;
      }

      const formattedDate = selectedDateTime.format("YYYY-MM-DD");
      updateData({
        former_spouses: [
          {
            ...data.former_spouses[0],
            [name]: formattedDate,
          },
        ],
      });
      name === "marriage_start_date"
        ? setIsStartDateDateValid(true)
        : setIsEndDateDateValid(true);
      return;
    }

    updateData({
      former_spouses: [
        {
          ...data.former_spouses[0],
          [name]: "",
        },
      ],
    });
    setIsBirthDateValid(false);
  };

  const handleNationalityChange = (event) => {
    const { value } = event.target;

    updateData({
      former_spouses: [
        {
          ...data.former_spouses[0],
          nationality_country: value,
        },
      ],
    });
  };

  const handleBirthAddresChange = (event) => {
    const { value, name } = event.target;

    updateData({
      former_spouses: [
        {
          ...data.former_spouses[0],
          birth: { ...data.former_spouses[0].birth, [name]: value },
        },
      ],
    });
  };

  const validateDate = (date) => {
    if (date && dayjs(date).isValid()) {
      return true;
    }

    return false;
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
            <span className="title-header-1">Ex-companheiro(a)</span>
          </div>
        </div>
        <hr className="hr-color" />
      </div>
      <div className="div-marital-padding">
        <div className="padding-bottom-title-input">
          <span className="title-header-2">Dados do ex-companheiro(a)</span>
        </div>
        <div className="div-1-inputs-marital">
          <div>
            <div style={{ paddingBottom: "0.4rem" }}>
              <span className="span-state">
                Nome do ex-companheiro(a)<span style={{ color: "red" }}>*</span>
              </span>
            </div>
            <div className="padding-bottom-1">
              <TextField
                id="outlined-basic"
                className="input-style-marital"
                placeholder="Escreva o primeiro nome"
                variant="outlined"
                name="given_name"
                value={data.former_spouses[0].name.given_name}
                onChange={handleNameChange}
              />
            </div>
          </div>
          <div>
            <div style={{ paddingBottom: "0.4rem" }}>
              <span className="span-state">
                Sobrenome do ex-companheiro(a){" "}
                <span style={{ color: "red" }}>*</span>
              </span>
            </div>
            <div className="padding-bottom-1">
              <TextField
                id="outlined-basic"
                className="input-style-marital"
                placeholder="Escreva o sobrenome"
                variant="outlined"
                name="surname"
                value={data.former_spouses[0].name.surname}
                onChange={handleNameChange}
              />
            </div>
          </div>
          <div>
            <div style={{ paddingBottom: "0.4rem" }}>
              <span className="span-state">
                Data de nascimento do ex-companheiro(a)
                <span style={{ color: "red" }}>*</span>
              </span>
            </div>
            <div className="padding-bottom-1">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  format="DD/MM/YYYY"
                  className="custom-date-picker-initialDivorced"
                  value={
                    data.former_spouses[0].birth.date !== ""
                      ? dayjs(data.former_spouses[0].birth.date)
                      : null
                  }
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
        </div>
      </div>
      <div className="div-marital-padding">
        <div className="padding-bottom-title-input">
          <span className="title-header-2">Dados do ex-companheiro(a)</span>
        </div>
        <div className="div-2-inputs-marital">
          <div>
            <div style={{ paddingBottom: "0.4rem" }}>
              <span className="span-state">
                País de nascimento do ex-companheiro(a)
                <span style={{ color: "red" }}>*</span>
              </span>
            </div>
            <div className="padding-bottom-1">
              <Select
                className="style-select-marital"
                labelId="select-state"
                id="select-state"
                name="country"
                value={data.former_spouses[0].birth.country}
                onChange={handleBirthAddresChange}
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
                Cidade de nascimento ex-companheiro(a)
                <span style={{ color: "red" }}>*</span>
              </span>
            </div>
            <div className="padding-bottom-1">
              <TextField
                id="outlined-basic"
                className="input-style-marital"
                placeholder="Escreva a cidade"
                variant="outlined"
                name="city"
                value={data.former_spouses[0].birth.city}
                onChange={handleBirthAddresChange}
              />
            </div>
          </div>

          <div className="padding-bottom-1">
            <div style={{ paddingBottom: "0.4rem" }}>
              <span className="span-state">
                Nacionalidade do companheiro(a)
                <span style={{ color: "red" }}>*</span>
              </span>
            </div>
            <Select
              className="style-select-marital"
              labelId="select-state"
              id="select-state"
              value={data.former_spouses[0].nationality_country}
              onChange={handleNationalityChange}
            >
              {Countries.map((state) => (
                <MenuItem key={state.key} value={state.key}>
                  {state.value}
                </MenuItem>
              ))}
            </Select>
          </div>
        </div>
      </div>

      <div className="div-marital-padding">
        <div className="padding-bottom-title-input">
          <span className="title-header-2">Casamento e separação</span>
        </div>
        <div className="div-2-inputs-marital">
          <div>
            <div style={{ paddingBottom: "0.4rem" }}>
              <span className="span-state">
                Data do casamento<span style={{ color: "red" }}>*</span>
              </span>
            </div>
            <div className="padding-bottom-1">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  format="DD/MM/YYYY"
                  className="custom-date-picker-initialDivorced"
                  value={
                    data.former_spouses[0].marriage_start_date !== ""
                      ? dayjs(data.former_spouses[0].marriage_start_date)
                      : null
                  }
                  onChange={(date) =>
                    handleRangeMarriegeDateChange("marriage_start_date", date)
                  }
                />
                {!isStartDateDateValid && (
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
                Data da separação/divórcio
                <span style={{ color: "red" }}>*</span>
              </span>
            </div>
            <div className="padding-bottom-1">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  format="DD/MM/YYYY"
                  className="custom-date-picker-initialDivorced"
                  value={
                    data.former_spouses[0].marriage_end_date !== ""
                      ? dayjs(data.former_spouses[0].marriage_end_date)
                      : null
                  }
                  onChange={(date) =>
                    handleRangeMarriegeDateChange("marriage_end_date", date)
                  }
                />
                {!isEndDateDateValid && (
                  <div style={{ color: "red" }}>
                    A data não pode ser superior à data atual.
                  </div>
                )}
              </LocalizationProvider>
            </div>
          </div>
        </div>
        <div className="padding-radio-marital">
          <div style={{ paddingBottom: "0.4rem" }}>
            <span className="span-state">
              Tipo da separação/divórcio<span style={{ color: "red" }}>*</span>
            </span>
          </div>
          <div>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="C"
              name="radio-buttons-group"
              row
              value={data.former_spouses[0].end_marriage_reason}
              onChange={handleChangeTypeSeparation}
            >
              <FormControlLabel
                value="Consesual"
                control={<Radio />}
                label="Consesual"
              />
              <FormControlLabel
                value="Litigioso"
                control={<Radio />}
                label="Litigioso"
              />
              <FormControlLabel
                value="Judicial"
                control={<Radio />}
                label="Judicial"
              />
              <FormControlLabel
                value="Extra-judicial"
                control={<Radio />}
                label="Extra-judicial"
              />
            </RadioGroup>
          </div>
        </div>
        <div className="padding-radio-marital">
          <div style={{ paddingBottom: "0.4rem" }}>
            <span className="span-state">
              País da separação/divórcio<span style={{ color: "red" }}>*</span>
            </span>
          </div>
          <div className="padding-bottom-1">
            <Select
              className="style-input-state"
              labelId="select-state"
              id="select-state"
              value={data.former_spouses[0].end_marriage_country}
              onChange={handleChangeSelectCountrySeparation}
            >
              {Countries.map((state) => (
                <MenuItem key={state.key} value={state.key}>
                  {state.value}
                </MenuItem>
              ))}
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Divorced;
