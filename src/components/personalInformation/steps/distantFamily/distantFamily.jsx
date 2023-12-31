import React, { useEffect, useState } from "react";
import "./distantFamily.css";
import { MenuItem, Select, TextField } from "@mui/material";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import PrimaryOccupation from "../../../../datas/primary_occupation";
import { useData } from "../../../../dataContext/dataContext";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Countries from "../../../../datas/countries";
import InputMask from "react-input-mask";

function DistantFamily({ validateStep }) {
  const { data, updateData } = useData();

  const [radioOcupation, setRadioOcupation] = useState("Empregado");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);

  const handleChangeSelectState = (event) => {
    setState(event.target.value);
    getCities("US", event.target.value);
  };

  const handleChangeSelectCity = (event) => {
    setCity(event.target.value);
  };

  const handleAnotherParentChange = (event) => {
    const { value } = event.target;
    const boolValue = value === "Sim" ? true : false;

    updateData({ ...data, any_other_relative_in_us: boolValue });
  };

  const handleChangeRadioOcupation = (event) => {
    const { value } = event.target;

    setRadioOcupation(value);

    if (value !== "Empregado") {
      updateData({ ...data, primary_occupation: null });
    } else {
      updateData({
        ...data,
        primary_occupation: {
          occupation_type: "",
          specify_occupation: null,
          entity_name: "",
          address: {
            street: "",
            complement: null,
            city: "",
            state: "",
            state_acronym: "",
            zip_code: "",
            country: "",
          },
          phone_number: "",
          start_date: "",
          end_date: null,
          monthly_income: null,
          description: null,
          occupation_title: "",
          supervisor_name: null,
        },
      });
    }
  };

  const handleEntityNameChange = (event) => {
    const { value } = event.target;
    updateData({
      ...data,
      primary_occupation: { ...data.primary_occupation, entity_name: value },
    });
  };

  const handleStateEntityChange = (event) => {
    const { value } = event.target;
    updateData({
      ...data,
      primary_occupation: {
        ...data.primary_occupation,
        occupation_title: value,
      },
    });
  };

  const handleStartDateChange = (selectedDate) => {
    if (selectedDate && dayjs(selectedDate).isValid()) {
      const formattedDate = dayjs(selectedDate).format("YYYY-MM-DD");
      updateData({
        ...data,
        primary_occupation: {
          ...data.primary_occupation,
          start_date: formattedDate,
        },
      });
    } else {
      updateData({
        ...data,
        primary_occupation: {
          ...data.primary_occupation,
          start_date: null,
        },
      });
    }
  };

  const handleEndDateChange = (selectedDate) => {
    if (selectedDate && dayjs(selectedDate).isValid()) {
      const formattedDate = dayjs(selectedDate).format("YYYY-MM-DD");
      updateData({
        ...data,
        primary_occupation: {
          ...data.primary_occupation,
          end_date: formattedDate,
        },
      });
    } else {
      updateData({
        ...data,
        primary_occupation: {
          ...data.primary_occupation,
          end_date: null,
        },
      });
    }
  };

  const handleOccupationAreaChangeSelect = (event) => {
    const { value } = event.target;

    updateData({
      ...data,
      primary_occupation: {
        ...data.primary_occupation,
        occupation_type: value,
      },
    });
  };

  const handleAddressEntityChange = (event) => {
    const { value, name } = event.target;
    debugger;
    updateData({
      ...data,
      primary_occupation: {
        ...data.primary_occupation,
        address: { ...data.primary_occupation.address, [name]: value },
      },
    });
  };

  const handleCelphoneEntityChange = (event) => {
    const { value } = event.target;
    debugger;
    updateData({
      ...data,
      primary_occupation: {
        ...data.primary_occupation,
        phone_number: value,
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
            <span className="title-header">Infomações complementares</span>
          </div>
        </div>
        <hr className="hr-color" />
      </div>
      <div className="div-distant-padding">
        <div className="padding-bottom-distant">
          <span className="title-header-2">
            Você possui algum outro familiar mais DISTANTE nos Estados
            Unidos?(Ex: TIO;PRIMO;SOBRINHO)
            <span style={{ color: "red" }}>*</span>
          </span>
        </div>
        <div className="padding-bottom-distant">
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
            row
            value={data.any_other_relative_in_us ? "Sim" : "Não"}
            onChange={handleAnotherParentChange}
          >
            <FormControlLabel value="Sim" control={<Radio />} label="Sim" />
            <FormControlLabel value="Não" control={<Radio />} label="Não" />
          </RadioGroup>
        </div>
      </div>

      <div>
        <div className="div-distant-padding">
          <div className="padding-bottom-distant">
            <span className="title-header-2">
              Qual é a sua principal ocupação?
              <span style={{ color: "red" }}>*</span>
            </span>
          </div>
          <div className="padding-bottom-distant">
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="Empregado"
              name="radio-buttons-group"
              className="subTitle-div-2"
              row
              value={radioOcupation}
              onChange={handleChangeRadioOcupation}
            >
              <FormControlLabel
                value="Estudante"
                control={<Radio />}
                label="Estudante"
              />
              <FormControlLabel
                value="Empregado"
                control={<Radio />}
                label="Empregado"
              />
              <FormControlLabel
                value="Aposentado"
                control={<Radio />}
                label="Aposentado"
              />
            </RadioGroup>
          </div>
        </div>
        {radioOcupation === "Empregado" ? (
          <>
            <div className="div-marital-padding">
              <div style={{ width: "55%" }}>
                <div
                  style={{ paddingBottom: "0.4rem" }}
                  className="padding-bottom-distant"
                >
                  <span className="span-state">
                    Área de ocupação <span style={{ color: "red" }}>*</span>
                  </span>
                </div>
                <div className="padding-bottom-distant">
                  <Select
                    className="input-style-distant"
                    labelId="select-state"
                    id="select-state"
                    value={data.primary_occupation.occupation_type}
                    onChange={handleOccupationAreaChangeSelect}
                  >
                    {PrimaryOccupation.map((state) => (
                      <MenuItem key={state.key} value={state.key}>
                        {state.value}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
              </div>
              <div className="div-2-inputs-work">
                <div>
                  <div style={{ paddingBottom: "0.4rem" }}>
                    <span className="span-state">
                      Nome da instituição/empresa{" "}
                      <span style={{ color: "red" }}>*</span>
                    </span>
                  </div>
                  <div className="padding-bottom-1">
                    <TextField
                      id="outlined-basic"
                      className="style-select-work"
                      placeholder="Escreva o nome da instituição/empresa"
                      variant="outlined"
                      value={data.primary_occupation.entity_name}
                      onChange={handleEntityNameChange}
                    />
                  </div>
                </div>
                <div>
                  <div style={{ paddingBottom: "0.4rem" }}>
                    <span className="span-state">
                      Cargo<span style={{ color: "red" }}>*</span>
                    </span>
                  </div>
                  <div className="padding-bottom-1">
                    <TextField
                      id="outlined-basic"
                      className="style-select-work"
                      placeholder="Escreva o cargo"
                      variant="outlined"
                      value={data.primary_occupation.occupation_title}
                      onChange={handleStateEntityChange}
                    />
                  </div>
                </div>
              </div>
              <div className="div-2-inputs-work">
                <div>
                  <div style={{ paddingBottom: "0.4rem" }}>
                    <span className="span-state">
                      Data de inicio <span style={{ color: "red" }}>*</span>
                    </span>
                  </div>
                  <div className="padding-bottom-1">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        format="DD/MM/YYYY"
                        className="custom-date-picker-initial"
                        value={dayjs(data.primary_occupation.start_date)}
                        onChange={handleStartDateChange}
                      />
                    </LocalizationProvider>
                  </div>
                </div>
                <div>
                  <div style={{ paddingBottom: "0.4rem" }}>
                    <span className="span-state">Data de termino</span>
                  </div>
                  <div className="padding-bottom-1">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        format="DD/MM/YYYY"
                        className="custom-date-picker-initial"
                        value={dayjs(data.primary_occupation.end_date)}
                        onChange={handleEndDateChange}
                      />
                    </LocalizationProvider>
                  </div>
                </div>
              </div>
              <div className="div-1-inputs-marital">
                <div>
                  <div style={{ paddingBottom: "0.4rem" }}>
                    <span className="span-state">
                      Pais da empresa <span style={{ color: "red" }}>*</span>
                    </span>
                  </div>
                  <div className="padding-bottom-1">
                    <Select
                      className="input-style-work"
                      labelId="select-state"
                      id="select-state"
                      name="country"
                      value={data.primary_occupation.address.country}
                      onChange={handleAddressEntityChange}
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
                      Estado da Empresa<span style={{ color: "red" }}>*</span>
                    </span>
                  </div>
                  <div className="padding-bottom-1">
                    <TextField
                      id="outlined-basic"
                      className="style-select-work"
                      placeholder="Escreva o cargo"
                      variant="outlined"
                      name="state"
                      value={data.primary_occupation.address.state}
                      onChange={handleAddressEntityChange}
                    />
                  </div>
                </div>
                <div>
                  <div style={{ paddingBottom: "0.4rem" }}>
                    <span className="span-state">
                      Cidade da Empresa<span style={{ color: "red" }}>*</span>
                    </span>
                  </div>
                  <div className="padding-bottom-1">
                    <TextField
                      id="outlined-basic"
                      className="style-select-work"
                      placeholder="Escreva o cargo"
                      variant="outlined"
                      name="city"
                      value={data.primary_occupation.address.city}
                      onChange={handleAddressEntityChange}
                    />
                  </div>
                </div>
              </div>
              <div className="div-2-inputs-work">
                <div>
                  <div style={{ paddingBottom: "0.4rem" }}>
                    <span className="span-state">
                      Endereço da empresa{" "}
                      <span style={{ color: "red" }}>*</span>
                    </span>
                  </div>
                  <div className="padding-bottom-1">
                    <TextField
                      id="outlined-basic"
                      className="style-select-work"
                      placeholder="Escreva o endereço"
                      variant="outlined"
                      name="street"
                      value={data.primary_occupation.address.street}
                      onChange={handleAddressEntityChange}
                    />
                  </div>
                </div>
                <div>
                  <div style={{ paddingBottom: "0.4rem" }}>
                    <span className="span-state">
                      CEP <span style={{ color: "red" }}>*</span>
                    </span>
                  </div>
                  <div className="padding-bottom-1">
                    <InputMask
                      mask="99999-999"
                      maskChar=""
                      value={data.primary_occupation.address.zip_code}
                      onChange={handleAddressEntityChange}
                    >
                      {() => (
                        <TextField
                          id="outlined-basic"
                          className="style-select-work"
                          placeholder="00000-000"
                          variant="outlined"
                          name="zip_code"
                        />
                      )}
                    </InputMask>
                  </div>
                </div>
              </div>
              <div className="div-2-inputs-work">
                <div>
                  <div style={{ paddingBottom: "0.4rem" }}>
                    <span className="span-state">
                      Telefone da empresa{" "}
                      <span style={{ color: "red" }}>*</span>
                    </span>
                  </div>
                  <div className="padding-bottom-1">
                    <InputMask
                      mask="99+ (99) 99999-9999"
                      maskChar=""
                      value={data.primary_occupation.phone_number}
                      onChange={handleCelphoneEntityChange}
                    >
                      {() => (
                        <TextField
                          id="outlined-basic"
                          className="style-select-work"
                          placeholder="99+ (00) 00000-0000"
                          variant="outlined"
                        />
                      )}
                    </InputMask>
                  </div>
                </div>
                <div>
                  <div style={{ paddingBottom: "0.4rem" }}>
                    <span className="span-state">Email da empresa</span>
                  </div>
                  <div className="padding-bottom-1">
                    <TextField
                      id="outlined-basic"
                      className="style-select-work"
                      placeholder="email@exemplo.com"
                      variant="outlined"
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}

export default DistantFamily;
