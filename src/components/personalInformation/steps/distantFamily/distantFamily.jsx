import React, { useEffect, useState } from "react";
import "./distantFamily.css";
import { Box, MenuItem, Select, TextField } from "@mui/material";
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

  const handleAnotherParentChange = (event) => {
    const { value } = event.target;
    const boolValue = value === "Sim" ? true : false;

    updateData({ ...data, any_other_relative_in_us: boolValue });
  };

  const handleChangeRadioOcupation = (event) => {
    const { value } = event.target;

    setIsStartDateValid(true);

    if (value === "NotOccupation") {
      updateData({ ...data, primary_occupation: null, occupation_type_selected: value });
      return
    }
    if (value === "S") {
      updateData({
        ...data,
        occupation_type_selected: value,
        primary_occupation: {
          occupation_type: "S",
          specify_occupation: null,
          entity_name: "",
          address: {
            street: "",
            complement: null,
            city: "",
            state: "",
            state_acronym: null,
            zip_code: "",
            country: null,
          },
          phone_number: null,
          start_date: "",
          end_date: null,
          monthly_income: null,
          description: null,
          occupation_title: null,
          supervisor_name: null,
        },
      });
      return
    }
    if (value === "RT") {
      updateData({
        ...data,
        occupation_type_selected: value,
        primary_occupation: {
          occupation_type: "RT",
          specify_occupation: null,
          entity_name: "",
          address: {
            street: "",
            complement: null,
            city: "",
            state: "",
            state_acronym: null,
            zip_code: "",
            country: null,
          },
          phone_number: null,
          start_date: "2023-11-08",
          end_date: null,
          monthly_income: 0,
          description: null,
          occupation_title: null,
          supervisor_name: null,
        },
      });
      return
    }
    updateData({
      ...data,
      occupation_type_selected: "Empregado",
      primary_occupation: {
        occupation_type: "A",
        specify_occupation: null,
        entity_name: "",
        address: {
          street: "",
          complement: null,
          city: "",
          state: "",
          state_acronym: null,
          zip_code: "",
          country: null,
        },
        phone_number: "",
        start_date: "",
        end_date: null,
        monthly_income: 0,
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
        updateData({
          ...data,
          primary_occupation: {
            ...data.primary_occupation,
            start_date: null,
          },
        });
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

  const handleSchoolAddressChange = (event) => {
    const { value, name } = event.target;

    updateData({
      ...data,
      primary_occupation: {
        ...data.primary_occupation,
        address: { ...data.primary_occupation.address, [name]: value },
      },
    });
  };

  const handlePhoneNumberChange = (event) => {
    const { value } = event.target;

    updateData({
      ...data,
      primary_occupation: {
        ...data.primary_occupation,
        phone_number: value,
      },
    });
  };

  const handleCurrentYearChange = (event) => {
    const { value } = event.target;

    updateData({
      ...data,
      primary_occupation: {
        ...data.primary_occupation,
        description: value,
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
            <RadioGroup sx={{ width: "100%" }}
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="Empregado"
              name="radio-buttons-group"
              className="subTitle-div-2"
              row
              value={data.occupation_type_selected}
              onChange={handleChangeRadioOcupation}
            >
              <FormControlLabel
                value="S"
                control={<Radio />}
                label="Estudante"
              />
              <FormControlLabel
                value="Empregado"
                control={<Radio />}
                label="Empregado"
              />
              <FormControlLabel
                value="RT"
                control={<Radio />}
                label="Aposentado"
              />
              <FormControlLabel
                value="NotOccupation"
                control={<Radio />}
                label="Não tenho ocupação/Criança com menos de 14 anos"
              />
            </RadioGroup>
          </div>
        </div>
        {data.occupation_type_selected === "S" ? (
          <div>
            <div className="div-distant-padding">
              <div className="div-marital-padding">
                <h2 className="padding-bottom-distant" style={{ color: "#091F5F" }} >Informações da Escola</h2>
                <div className="div-1-inputs-marital">
                  <div>
                    <div style={{ paddingBottom: "0.4rem" }}>
                      <span className="span-state">
                        Endereço da instituição{" "}
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
                        Cidade da instituição <span style={{ color: "red" }}>*</span>
                      </span>
                    </div>
                    <div className="padding-bottom-1">
                      <TextField
                        id="outlined-basic"
                        className="style-select-work"
                        placeholder="Escreva a cidade"
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
                        Estado da instituição<span style={{ color: "red" }}>*</span>
                      </span>
                    </div>
                    <div className="padding-bottom-1">
                      <TextField
                        id="outlined-basic"
                        className="style-select-work"
                        placeholder="Escreva o estado"
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
                        Telefone da instituição <span style={{ color: "red" }}>*</span>
                      </span>
                    </div>
                    <div className="padding-bottom-1">
                      <InputMask
                        mask="(99) 99999-9999"
                        maskChar={null}
                        value={data.primary_occupation ? data.primary_occupation.phone_number : ''}
                        onChange={handlePhoneNumberChange}
                      >
                        {(inputProps) => <TextField {...inputProps} variant="outlined" className="style-select-work" placeholder="(00) 00000-0000" />}
                      </InputMask>
                    </div>
                  </div>
                  <div>
                    <div style={{ paddingBottom: "0.4rem" }}>
                      <span className="span-state">
                        Data de início <span style={{ color: "red" }}>*</span>
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
                          <br /> A data de início não pode ser superior à data atual.
                        </span>
                      )}
                    </div>
                  </div>
                  <div>
                    <div style={{ paddingBottom: "0.4rem" }}>
                      <span className="span-state">
                        Qual período / série está cursando <span style={{ color: "red" }}>*</span>
                      </span>
                    </div>
                    <div className="padding-bottom-1">
                      <TextField
                        id="outlined-basic"
                        className="style-select-work"
                        placeholder="Escreva o ano"
                        variant="outlined"
                        name="current_year"
                        value={data.primary_occupation ? data.primary_occupation.description : ""}
                        onChange={handleCurrentYearChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {data.occupation_type_selected === "Empregado" ? (
          <>
            <div className="div-marital-padding">
              <h2 className="padding-bottom-distant" style={{ color: "#091F5F" }}  >Informações da ocupação</h2>
              <div className="div-occupationAndOffice">
                <Box sx={{ width: "50%" }}>
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

                </Box>
                <Box sx={{
                  width: "50%",
                  "@media (max-width: 768px)": {
                    width: "unset"
                  },
                }}
                  className={"div-2-inputs-work-distantFamily"}
                >
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
                </Box>
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
                        <br /> A data de início não pode ser superior à data atual.
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
                      placeholder="Escreva a Cidade"
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
                      placeholder="Escreva o estado"
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
        {data.occupation_type_selected === "RT" ? (
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
                    type="number"
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
