import React, { useEffect, useState } from "react";
import "./maritalStatus.css";
import { MenuItem, Select, TextField } from "@mui/material";
import Countries from "../../../../datas/countries";
import { useData } from "../../../../dataContext/dataContext";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function Widow({ validateStep }) {
  const { data, updateData } = useData();

  const [isBirthDateValid, setIsBirthDateValid] = useState(true);

  const handleChangeSelectNationality = (event) => {
    const { value } = event.target;

    updateData({
      deceased_spouse: {
        ...data.deceased_spouse,
        nationality: value,
      },
    });
  };

  const handleNameChange = (event) => {
    const { value, name } = event.target;

    if (/^[A-Za-z\s]+$/.test(value) || value === "") {
      updateData({
        deceased_spouse: {
          ...data.deceased_spouse,
          name: { ...data.deceased_spouse.name, [name]: value },
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
        updateData({
          deceased_spouse: {
            ...data.deceased_spouse,
            birth: { ...data.deceased_spouse.birth, date: "" },
          },
        });
      } else {
        const formattedDate = selectedDateTime.format("YYYY-MM-DD");
        updateData({
          deceased_spouse: {
            ...data.deceased_spouse,
            birth: { ...data.deceased_spouse.birth, date: formattedDate },
          },
        });
        setIsBirthDateValid(true);
      }
    } else {
      updateData({
        deceased_spouse: {
          ...data.deceased_spouse,
          birth: { ...data.deceased_spouse.birth, date: "" },
        },
      });
      setIsBirthDateValid(true);
    }
  };

  const handleBirthChange = (event) => {
    const { value, name } = event.target;

    updateData({
      deceased_spouse: {
        ...data.deceased_spouse,
        birth: { ...data.deceased_spouse.birth, [name]: value },
      },
    });
  };

  useEffect(() => {
    validateStep();
  }, [data]);

  return (
    <div className="div-margin">
      <div className="padding-bottom">
        <div className="titles" style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <span className="title-header">Informações Pessoais</span>
          </div>
          <div>
            <span className="title-header-1">Viúvo(a)</span>
          </div>
        </div>
        <hr className="hr-color" />
      </div>
      <div className="div-marital-padding">
        <div>
          <div className="padding-bottom-title-input">
            <span className="title-header-2">Viuvo(a)</span>
          </div>
          <div className="div-2-inputs-marital">
            <div>
              <div style={{ paddingBottom: "0.4rem" }}>
                <span className="span-state">
                  Nome do ex-cônjuge<span style={{ color: "red" }}>*</span>
                </span>
              </div>
              <div className="padding-bottom-1">
                <TextField
                  id="outlined-basic"
                  className="style-select-marital"
                  placeholder="Escreva o primeiro nome"
                  variant="outlined"
                  name="given_name"
                  value={data.deceased_spouse.name.given_name}
                  onChange={handleNameChange}
                />
              </div>
            </div>
            <div>
              <div style={{ paddingBottom: "0.4rem" }}>
                <span className="span-state">
                  Sobrenome do ex-cônjuge
                  <span style={{ color: "red" }}>*</span>
                </span>
              </div>
              <div className="padding-bottom-1">
                <TextField
                  id="outlined-basic"
                  className="style-select-marital"
                  placeholder="Escreva o sobrenome"
                  variant="outlined"
                  name="surname"
                  value={data.deceased_spouse.name.surname}
                  onChange={handleNameChange}
                />
              </div>
            </div>

            <div className="padding-bottom-1">
              <div style={{ paddingBottom: "0.4rem" }}>
                <span className="span-state">
                  Data de nascimento do companheiro(a)
                  <span style={{ color: "red" }}>*</span>
                </span>
              </div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  format="DD/MM/YYYY"
                  sx={{ backgroundColor: "white", width: "98%" }}
                  className="custom-date-picker-initial"
                  value={
                    data.deceased_spouse.birth.date !== ""
                      ? dayjs(data.deceased_spouse.birth.date)
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
        <div className="div-3-inputs-marital">
          <div>
            <div style={{ paddingBottom: "0.4rem", height: 40 }}>
              <span className="span-state">
                País do nascimento do ex-cônjuge
                <span style={{ color: "red" }}>*</span>
              </span>
            </div>
            <div className="padding-bottom-1">
              <Select
                className="style-input-2-marital"
                labelId="select-state"
                id="select-state"
                name="country"
                value={data.deceased_spouse.birth.country}
                onChange={handleBirthChange}
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
            <div style={{ paddingBottom: "0.4rem", height: 40 }}>
              <span className="span-state">
                Estado do nascimento do ex-cônjuge
                <span style={{ color: "red" }}>*</span>
              </span>
            </div>
            <div className="padding-bottom-1">
              <TextField
                className="style-input-1-marital"
                variant="outlined"
                placeholder="Digite o estado"
                name="state"
                value={data.deceased_spouse.birth.state}
                onChange={handleBirthChange}
              />
            </div>
          </div>
          <div>
            <div style={{ paddingBottom: "0.4rem", height: 40 }}>
              <span className="span-state">
                Cidade de nascimento do ex-cônjuge
                <span style={{ color: "red" }}>*</span>
              </span>
            </div>
            <div className="padding-bottom-1">
              <TextField
                className="style-input-1-marital"
                variant="outlined"
                placeholder="Digite a cidade"
                name="city"
                value={data.deceased_spouse.birth.city}
                onChange={handleBirthChange}
              />
            </div>
          </div>
          <div>
            <div style={{ paddingBottom: "0.4rem", height: 40 }}>
              <span className="span-state">
                Nacionalidade do ex-cônjuge
                <span style={{ color: "red" }}>*</span>
              </span>
            </div>
            <div className="padding-bottom-1">
              <Select
                className="style-input-2-marital"
                labelId="select-state"
                id="select-state"
                value={data.deceased_spouse.nationality}
                onChange={handleChangeSelectNationality}
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
    </div>
  );
}

export default Widow;
