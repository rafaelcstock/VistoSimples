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
  const [isStartDateValid, setIsStartDateValid] = useState(true);
  const [isEndDateValid, setIsEndDateValid] = useState(true);

  const [radioOcupation, setRadioOcupation] = useState("Estudante");

  const handleAnotherParentChange = (event) => {
    const { value } = event.target;
    const boolValue = value === "Sim" ? true : false;

    updateData({ ...data, any_other_relative_in_us: boolValue });
  };

  const handleChangeRadioOcupation = (event) => {
    const { value } = event.target;

    setRadioOcupation(value);

    if (value === "Estudante") {
      updateData({ ...data, primary_occupation: null });
      return
    }
      if (value === "Aposentado") {
        updateData({
          ...data,
          primary_occupation: {
            type: "Retiree"
          },
        });
        return
      }
        updateData({
          ...data,
          primary_occupation: {
            type: "Employee",
            occupation_type: "",
            specify_occupation: null,
            entity_name: "",
            address: {
              street: "",
              complement: null,
              city: "",
              state: "",
              state_acronym: null,
              zip_code: null,
              country: null,
            },
            phone_number: "",
            start_date: "",
            end_date: null,
            monthly_income: null,
            description: null,
            occupation_title: null,
            supervisor_name: null,
          },
        });
  };

  const handleEntityNameChange = (event) => {
    const { value } = event.target;
    updateData({
      ...data,
      primary_occupation: { ...data.primary_occupation, entity_name: value },
    });
  };

  const handleStartDateChange = (selectedDate) => {
    if (selectedDate && dayjs(selectedDate).isValid()) {
      const currentDate = dayjs();
      const selectedDateTime = dayjs(selectedDate);

      if (selectedDateTime.isAfter(currentDate)) {
        setIsStartDateValid(false);
        console.error("A data de início não pode ser superior à data atual.");
      } else {
        const formattedDate = selectedDateTime.format("YYYY-MM-DD");
        updateData({
          ...data,
          primary_occupation: {
            ...data.primary_occupation,
            start_date: formattedDate,
          },
        });
        setIsStartDateValid(true);
      }
    } else {
      updateData({
        ...data,
        primary_occupation: {
          ...data.primary_occupation,
          start_date: null,
        },
      });
      setIsStartDateValid(false);
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

    updateData({
      ...data,
      primary_occupation: {
        ...data.primary_occupation,
        address: { ...data.primary_occupation.address, [name]: value },
      },
    });
  };

  const handleRetireeSalary = (event) => {
    const { value } = event.target;

    updateData({
      ...data,
      primary_occupation: {
        ...data.primary_occupation,
        monthly_income: value,
      },
    });
  };

  const sortedPrimaryOccupation = PrimaryOccupation.slice().sort((a, b) => a.value.localeCompare(b.value));

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
              <h2 className="padding-bottom-distant" style={{ color: "#091F5F" }}  >Informações da ocupação</h2>
              <div className="div-occupationAndOffice">
                <div style={{ width: "50%" }}>
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
                      {sortedPrimaryOccupation.map((state) => (
                        <MenuItem key={state.key} value={state.key}>
                          {state.value}
                        </MenuItem>
                      ))}
                    </Select>
                  </div>

                </div>
                <div style={{ width: "50%" }}>
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
              </div>
              <div className="div-2-inputs-work-distantFamily">
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
                        className={`custom-date-picker-initialOccupation  ${isStartDateValid ? "" : "invalid-date"
                          }`}
                        value={
                          data.primary_occupation.start_date
                            ? dayjs(data.primary_occupation.start_date)
                            : null
                        }
                        onChange={handleStartDateChange}
                      />
                    </LocalizationProvider>
                    {!isStartDateValid && (
                      <span className="error-message" style={{ color: "red" }}>
                       <br/> A data de início não pode ser superior à data atual.
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="div-1-inputs-marital">
                <div>
                  <div style={{ paddingBottom: "0.4rem" }}>
                    <span className="span-state">
                      Endereço da instituição / empresa{" "}
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
                      Cidade da instituição / empresa <span style={{ color: "red" }}>*</span>
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
                <div>
                  <div style={{ paddingBottom: "0.4rem" }}>
                    <span className="span-state">
                      Estado da instituição / empresa<span style={{ color: "red" }}>*</span>
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
              </div>

            </div>
          </>
        ) : null}
        {radioOcupation === "Aposentado" ? (
          <div>
            <div className="div-distant-padding">
              <div className="padding-bottom-distant">
                <div style={{ paddingBottom: "0.4rem" }}>
                  <span className="title-header-2">
                    Quanto é o salário da aposentadoria? <span style={{ color: "red" }}>*</span>
                  </span>
                </div>
                <div className="padding-bottom-1">
                  <TextField
                    id="outlined-basic"
                    className="style-select-work"
                    placeholder="Escreva o salário"
                    variant="outlined"
                    name="state"
                    value={data.primary_occupation ? data.primary_occupation.monthly_income : ""}
                    onChange={handleRetireeSalary}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default DistantFamily;
