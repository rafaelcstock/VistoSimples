import React, { useEffect, useState } from "react";
import "./fatherInformation.css";
import { MenuItem, Select, TextField } from "@mui/material";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import relativeUSStatus from "../../../../datas/relative_us_status";
import { useData } from "../../../../dataContext/dataContext";
import dayjs from "dayjs";

function FatherInformation({ validateStep }) {
  const { data, updateData } = useData();
  const [isBirthDateValid, setIsBirthDateValid] = useState(true);

const handleLocatingChange = (event) => {
  const { value } = event.target;

  const boolValue = value === "Sim";
  updateData({ ...data, father: { ...data.father, locating_in_us: boolValue } });
};

  const handleInfoAboutFatherChange = (event) => {
    const { value } = event.target;

    const boolValue = value === "Sim" ? true : false;

    if (boolValue) {
      updateData({ ...data, hasInformationAboutFather: boolValue });
    } else {
      updateData({
        ...data,
        hasInformationAboutFather: boolValue,
        father: {
          name: { surname: "", given_name: "" },
          birth_date: null,
          us_status: null,
        },
      });
    }
  };

  const handleBirthDateChange = (selectedDate) => {
    if (selectedDate && dayjs(selectedDate).isValid()) {
      const currentDate = dayjs();
      const selectedDateTime = dayjs(selectedDate);
  
      if (selectedDateTime.isAfter(currentDate)) {
        setIsBirthDateValid(false);
        console.error("A data de nascimento não pode ser superior à data atual.");
      } else {
        const formattedDate = selectedDateTime.format("YYYY-MM-DD");
        updateData({
          ...data,
          father: { ...data.father, birth_date: formattedDate },
        });
        setIsBirthDateValid(true);
      }
    } else {
      updateData({
        ...data,
        father: { ...data.father, birth_date: "" },
      });
      setIsBirthDateValid(false);
    }
  };

  const handleNameChange = (event) => {
    const { value, name } = event.target;
  
    if (/^[A-Za-z\s]+$/.test(value) || value === "") {
      updateData({
        ...data,
        father: { ...data.father, name: { ...data.father.name, [name]: value } },
      });
    } else {
      console.error("O nome deve conter apenas letras e espaços.");
    }
  };

  const handleUsStatusChange = (event) => {
    const { value } = event.target;

    updateData({ ...data, father: { ...data.father, us_status: value } });
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
              Informação adicionais do seu pai
            </span>
          </div>
        </div>
        <hr className="hr-color" />
      </div>
      <div className="div-family-padding">
        <div className="padding-bottom-family">
          <span className="title-header-2">
            Você tem informações básica sobre sua pai?
            <span style={{ color: "red" }}>*</span>
          </span>
        </div>
        <div className="padding-bottom-family">
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="Não"
            name="radio-buttons-group"
            className="subTitle-div-2"
            row
            value={data.hasInformationAboutFather ? "Sim" : "Não"}
            onChange={handleInfoAboutFatherChange}
          >
            <FormControlLabel value="Sim" control={<Radio />} label="Sim" />
            <FormControlLabel value="Não" control={<Radio />} label="Não" />
          </RadioGroup>
        </div>
      </div>
      {data.hasInformationAboutFather ? (
        <div>
          <div className="div-family-padding">
            <div className="div-family-inputs">
              <div>
                <div style={{ paddingBottom: "0.4rem" }}>
                  <span className="span-state">
                    Nome do seu pai<span style={{ color: "red" }}>*</span>
                  </span>
                </div>
                <div>
                  <TextField
                    id="outlined-basic"
                    className="input-style-family"
                    placeholder="Escreva o primeiro nome"
                    variant="outlined"
                    name="given_name"
                    value={data.father.name.given_name}
                    onChange={handleNameChange}
                  />
                </div>
              </div>
              <div>
                <div style={{ paddingBottom: "0.4rem" }}>
                  <span className="span-state">
                    Sobrenome do seu pai<span style={{ color: "red" }}>*</span>
                  </span>
                </div>
                <div>
                  <TextField
                    id="outlined-basic"
                    className="input-style-family"
                    placeholder="Escreva o sobrenome"
                    variant="outlined"
                    name="surname"
                    value={data.father.name.surname}
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
                    Qual a data de nascimento do seu pai
                    <span style={{ color: "red" }}>*</span>
                  </span>
                </div>
                <div>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    format="DD/MM/YYYY"
                    className="custom-date-picker"
                    value={data.father.birth_date !== "" ? dayjs(data.father.birth_date) : null}
                    onChange={handleBirthDateChange}
                  />
                    {!isBirthDateValid && (
                      <div style={{ color: "red" }}>
                        A data de nascimento não pode ser superior à data atual.
                      </div>
                    )}
                  </LocalizationProvider>
                </div>
              </div>
            </div>
          </div>
          <div className="div-family-padding">
            <div>
              <div className="padding-bottom-family">
                <span className="title-header-2">
                  Seu pai está nos Estados Unidos?
                  <span style={{ color: "red" }}>*</span>
                </span>
              </div>
              <div className="padding-bottom-family">
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="Não"
                  name="radio-buttons-group"
                  className="subTitle-div-2"
                  row
                  value={data.father.locating_in_us ? "Sim" : "Não"}
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
                    Qual a situação do seu pai nos Estados Unidos
                    <span style={{ color: "red" }}>*</span>
                  </span>
                </div>
                <div>
                  <Select
                    className="style-select-initial input-style-initial"
                    placeholder="teste"
                    value={data.father.us_status}
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

export default FatherInformation;
