import React, { useEffect, useState } from "react";
import "./maritalStatus.css";
import { MenuItem, Select, TextField } from "@mui/material";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Countries from "../../../../datas/countries";
import InputMask from "react-input-mask";
import { useData } from "../../../../dataContext/dataContext";
import dayjs from "dayjs";

function Married({ validateStep }) {
  const { data, updateData } = useData();

  const [isBirthDateValid, setIsBirthDateValid] = useState(true);

  const handleNameChange = (event) => {
    const { value, name } = event.target;

    if (/^[A-Za-z\s]+$/.test(value) || value === "") {
      updateData({
        spouse: {
          ...data.spouse,
          name: { ...data.spouse.name, [name]: value },
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
          spouse: {
            ...data.spouse,
            birth: { ...data.spouse.birth, date: "" },
          },
        });
      } else {
        const formattedDate = selectedDateTime.format("YYYY-MM-DD");
        updateData({
          spouse: {
            ...data.spouse,
            birth: { ...data.spouse.birth, date: formattedDate },
          },
        });
        setIsBirthDateValid(true);
      }
    } else {
      updateData({
        spouse: { ...data.spouse, birth: { ...data.spouse.birth, date: "" } },
      });
      setIsBirthDateValid(false);
    }
  };

  const handleIsSameAddresChangeSelect = (event) => {
    const { value } = event.target;
    const boolValue = value === "Sim" ? true : false;

    if (boolValue) {
      updateData({
        spouseHasSameAddress: boolValue,
        spouse: { ...data.spouse, address: { ...data.address } },
      });

      return;
    }

    updateData({
      spouseHasSameAddress: boolValue,
      spouse: {
        ...data.spouse,
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
    });
  };

  const handleNationalityChange = (event) => {
    const { value } = event.target;

    updateData({
      spouse: {
        ...data.spouse,
        nationality: value,
      },
    });
  };

  const handleBirthCountryChange = (event) => {
    const { value, name } = event.target;

    updateData({
      spouse: {
        ...data.spouse,
        birth: { ...data.spouse.birth, country: value },
      },
    });
  };

  const handleAddressChange = (event) => {
    const { value, name } = event.target;

    updateData({
      spouse: {
        ...data.spouse,
        address: { ...data.spouse.address, [name]: value },
      },
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
            <span className="title-header">Informações Pessoais</span>
          </div>
          <div>
            <span className="title-header-1">Casado(a)</span>
          </div>
        </div>
        <hr className="hr-color" />
      </div>
      <div className="div-marital-padding">
        <div className="padding-bottom-title-input">
          <span className="title-header-2">Dados do companheiro(a)</span>
        </div>
        <div className="married-div-1-inputs-marital div-1-inputs-marital">
          <div>
            <div style={{ paddingBottom: "0.4rem" }}>
              <span className="span-state">
                Nome do companheiro<span style={{ color: "red" }}>*</span>
              </span>
            </div>
            <div className="padding-bottom-1">
              <TextField
                id="outlined-basic"
                className="input-style-marital"
                placeholder="Escreva o seu primeiro nome"
                variant="outlined"
                name="given_name"
                value={data.spouse ? data.spouse.name.given_name : ""}
                onChange={handleNameChange}
              />
            </div>
          </div>
          <div>
            <div style={{ paddingBottom: "0.4rem" }}>
              <span className="span-state">
                Sobrenome do companheiro<span style={{ color: "red" }}>*</span>
              </span>
            </div>
            <div className="padding-bottom-1">
              <TextField
                id="outlined-basic"
                className="input-style-marital"
                placeholder="Escreva o seu sobrenome"
                variant="outlined"
                name="surname"
                value={data.spouse ? data.spouse.name.surname : ""}
                onChange={handleNameChange}
              />
            </div>
          </div>
          <div>
            <div style={{ paddingBottom: "0.4rem" }}>
              <span className="span-state">
                Data de nascimento do companheiro(a)
                <span style={{ color: "red" }}>*</span>
              </span>
            </div>
            <div className="padding-bottom-1">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  format="DD/MM/YYYY"
                  className="custom-date-picker-initialMarried"
                  value={
                    data.spouse.birth.date !== ""
                      ? dayjs(data.spouse.birth.date)
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
        <div className="padding-bottom-title-input married-padding-bottom-title-input">
          <span className="title-header-2">Nacionalidade do companheiro</span>
        </div>
        <div className="married-div-2-inputs-marital div-2-inputs-marital">
          <div>
            <div style={{ paddingBottom: "0.4rem" }}>
              <span className="span-state">
                Nacionalidade do companheiro(a)
                <span style={{ color: "red" }}>*</span>
              </span>
            </div>
            <div className="padding-bottom-1">
              <Select
                className="style-select-marital"
                labelId="select-state"
                id="select-state"
                value={data.spouse?.nationality}
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
          <div>
            <div style={{ paddingBottom: "0.4rem" }}>
              <span className="span-state">
                País de nascimento do companheiro(a)
                <span style={{ color: "red" }}>*</span>
              </span>
            </div>
            <div className="padding-bottom-1">
              <Select
                className="style-select-marital"
                labelId="select-state"
                id="select-state"
                value={data.spouse?.birth.country}
                onChange={handleBirthCountryChange}
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
      <div className="div-marital-padding">
        <div className="padding-bottom-title-input">
          <span className="title-header-2">
            Seu companheiro(a) mora no mesmo endereço que você?
            <span style={{ color: "red" }}>*</span>
          </span>
        </div>
        <div className="padding-radio-marital">
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="F"
            name="radio-buttons-group"
            className="subTitle-div-2"
            row
            value={data.spouseHasSameAddress ? "Sim" : "Não"}
            onChange={handleIsSameAddresChangeSelect}
          >
            <FormControlLabel value="Sim" control={<Radio />} label="Sim" />
            <FormControlLabel value="Não" control={<Radio />} label="Não" />
          </RadioGroup>
        </div>
      </div>
      {!data.spouseHasSameAddress && (
        <div className="div-marital-padding">
          <div className="married-padding-bottom-title-input">
            <span className="title-header-2">
              Endereço do companheiro<span style={{ color: "red" }}>*</span>
            </span>
          </div>
          <div className="div-2-inputs-marital">
            <div>
              <div style={{ paddingBottom: "0.4rem" }}>
                <span className="span-state">
                  Endereço do companheiro(a)
                  <span style={{ color: "red" }}>*</span>
                </span>
              </div>
              <div className="padding-bottom-1">
                <TextField
                  id="outlined-basic"
                  className="style-select-marital"
                  placeholder="Rua, bairro, número"
                  variant="outlined"
                  name="street"
                  value={data.spouse.address.street}
                  onChange={handleAddressChange}
                />
              </div>
            </div>
            <div>
              <div style={{ paddingBottom: "0.4rem" }}>
                <span className="span-state">
                  Complemento do companheiro(a)
                </span>
              </div>
              <div className="padding-bottom-1">
                <TextField
                  id="outlined-basic"
                  className="style-select-marital"
                  placeholder="Preencha um complemento"
                  variant="outlined"
                  name="complement"
                  value={data.spouse.address.complement}
                  onChange={handleAddressChange}
                />
              </div>
            </div>
          </div>
          <div className="div-3-inputs-marital">
            <div>
              <div style={{ paddingBottom: "0.4rem" }}>
                <span className="span-state">
                  País do companheiro(a)<span style={{ color: "red" }}>*</span>
                </span>
              </div>
              <div className="padding-bottom-1">
                <Select
                  className="style-input-1-marital"
                  labelId="select-state"
                  id="select-state"
                  name="country"
                  value={data.spouse.address.country}
                  onChange={handleAddressChange}
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
                  Estado do(a) companheiro(a)
                  <span style={{ color: "red" }}>*</span>
                </span>
              </div>
              <div className="padding-bottom-1">
                <TextField
                  className="style-input-1-marital"
                  variant="outlined"
                  placeholder="Digite o estado"
                  name="state"
                  value={data.spouse.address.state}
                  onChange={handleAddressChange}
                />
              </div>
            </div>
            <div>
              <div style={{ paddingBottom: "0.4rem" }}>
                <span className="span-state">
                  Cidade do companheiro(a)
                  <span style={{ color: "red" }}>*</span>
                </span>
              </div>
              <div className="padding-bottom-1">
                <TextField
                  className="style-input-1-marital"
                  variant="outlined"
                  placeholder="Digite a cidade"
                  name="city"
                  value={data.spouse.address.city}
                  onChange={handleAddressChange}
                />
              </div>
            </div>
            <div>
              <div style={{ paddingBottom: "0.4rem" }}>
                <span className="span-state">
                  CEP do companheiro(a)<span style={{ color: "red" }}>*</span>
                </span>
              </div>
              <div className="padding-bottom-1">
                <InputMask
                  mask="99999-999"
                  maskChar=""
                  value={data.spouse.address.zip_code}
                  onChange={handleAddressChange}
                >
                  {() => (
                    <TextField
                      id="outlined-basic"
                      className="style-input-1-marital"
                      placeholder="00000-000"
                      variant="outlined"
                      name="zip_code"
                    />
                  )}
                </InputMask>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Married;
