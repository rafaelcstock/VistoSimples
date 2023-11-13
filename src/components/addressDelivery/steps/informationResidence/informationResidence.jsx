import React, { useEffect, useState } from "react";
import "./informationResidence.css";
import { MenuItem, Select, TextField } from "@mui/material";
import statesBrazilianService from "../../../../services/statesBrazilianService";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import InputMask from "react-input-mask";
import countriesService from "../../../../services/countriesWorld";
import statesService from "../../../../services/statesWorldMain";
import citiesService from "../../../../services/citiesWorld";
import Countries from "../../../../datas/countries";
import { useData } from "../../../../dataContext/dataContext";

function InformationResidence({ validateStep }) {
  const { data, updateData } = useData();

  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);
  const [countries, setCountries] = useState([]);
  const [selectedState, setSelectedState] = useState("Não");
  const [selectedState2, setSelectedState2] = useState("Sim");

  const getCountries = async () => {
    let _countries = await countriesService.getCountries();
    setCountries(_countries);
  };

  const getStates = async (country) => {
    let _states = await statesService.getStateByCountry(country);
    setStates(_states);
  };

  const getCities = async (country, state) => {
    let _cities = await citiesService.getCitiesByStateByCountry(country, state);
    setCities(_cities);
  };

  const handleChangeSelectCountry = (event) => {
    setCountry(event.target.value);
    getStates(event.target.value);
  };

  const handleChangeSelectState = (event) => {
    setState(event.target.value);
    getCities(country, event.target.value);
  };

  const handleChangeSelectCity = (event) => {
    setCity(event.target.value);
  };

  const handleChangeSelect = (event) => {
    setSelectedState(event.target.value);
    // props.onStatusChange(event.target.value);
  };

  const handleChangeSelect2 = (event) => {
    setSelectedState2(event.target.value);
  };

  useEffect(() => {
    getCountries();
  }, []);

  useEffect(() => {
    validateStep();
  }, [data]);

  return (
    <div className="div-margin">
      <div className="padding-bottom">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <span className="title-header">Informações sobre a residência</span>
          </div>
        </div>
        <hr className="hr-color" />
      </div>

      <div className="div-marital-padding">
        <div className="div-2-inputs-work">
          <div>
            <div style={{ paddingBottom: "0.4rem" }}>
              <span className="span-state">
                Endereço da sua residência
                <span style={{ color: "red" }}>*</span>
              </span>
            </div>
            <div className="padding-bottom-1">
              <TextField
                id="outlined-basic"
                className="style-select-work"
                placeholder="Bairro, rua e número"
                variant="outlined"
              />
            </div>
          </div>
          <div>
            <div style={{ paddingBottom: "0.4rem" }}>
              <span className="span-state">
                Complemento<span style={{ color: "red" }}>*</span>
              </span>
            </div>
            <div className="padding-bottom-1">
              <TextField
                id="outlined-basic"
                className="style-select-work"
                placeholder="Preencha um complemento"
                variant="outlined"
              />
            </div>
          </div>
        </div>
        <div className="div-1-inputs-residence">
          <div>
            <div style={{ paddingBottom: "0.4rem" }}>
              <span className="span-state">
                País da sua residência<span style={{ color: "red" }}>*</span>
              </span>
            </div>
            <div className="padding-bottom-1">
              <Select
                className="style-select-work"
                labelId="select-state"
                id="select-state"
                value={country}
                onChange={handleChangeSelectCountry}
              >
                {countries.map((countrie, index) => (
                  <MenuItem key={index} value={countrie.iso2}>
                    {countrie.name}
                  </MenuItem>
                ))}
              </Select>
            </div>
          </div>
          <div>
            <div style={{ paddingBottom: "0.4rem" }}>
              <span className="span-state">
                Estado da sua residência<span style={{ color: "red" }}>*</span>
              </span>
            </div>
            <div className="padding-bottom-1">
              <Select
                className="style-select-work"
                labelId="select-state"
                id="select-state"
                value={state}
                onChange={handleChangeSelectState}
              >
                {states.map((state, index) => (
                  <MenuItem key={index} value={state.iso2}>
                    {state.name}
                  </MenuItem>
                ))}
              </Select>
            </div>
          </div>
          <div>
            <div style={{ paddingBottom: "0.4rem" }}>
              <span className="span-state">
                Cidade da sua residência<span style={{ color: "red" }}>*</span>
              </span>
            </div>
            <div className="padding-bottom-1">
              <Select
                className="style-select-work"
                labelId="select-state"
                id="select-state"
                value={city}
                onChange={handleChangeSelectCity}
              >
                {cities.map((city, index) => (
                  <MenuItem key={index} value={city.name}>
                    {city.name}
                  </MenuItem>
                ))}
              </Select>
            </div>
          </div>
        </div>
        <div className="div-2-inputs-work">
          <div>
            <div style={{ paddingBottom: "0.4rem" }}>
              <span className="span-state">
                CEP<span style={{ color: "red" }}>*</span>
              </span>
            </div>
            <div className="padding-bottom-1">
              <InputMask mask="99999-999" maskChar="">
                {() => (
                  <TextField
                    id="outlined-basic"
                    className="input-style-work"
                    placeholder="00000-000"
                    variant="outlined"
                  />
                )}
              </InputMask>
            </div>
          </div>

          <div>
            <div style={{ paddingBottom: "0.4rem" }}>
              <span className="span-state">
                Seu endereço de entrega é o mesmo que você reside?
                <span style={{ color: "red" }}>*</span>
              </span>
            </div>
            <div className="padding-bottom-1">
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="Sim"
                name="radio-buttons-group"
                className="subTitle-div-2"
                row
                value={selectedState}
                onChange={handleChangeSelect}
              >
                <FormControlLabel value="Sim" control={<Radio />} label="Sim" />
                <FormControlLabel value="Não" control={<Radio />} label="Não" />
              </RadioGroup>
            </div>
          </div>
        </div>
      </div>
      <div className="div-marital-padding">
        <div className="div-2-inputs-work">
          <div>
            <div>
              <span className="title-header-2">
                Seu endereço de entrega é o mesmo que você reside?
                <span style={{ color: "red" }}>*</span>
              </span>
            </div>
            <div className="padding-bottom-1">
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="Sim"
                name="radio-buttons-group"
                className="subTitle-div-2"
                row
                value={selectedState2}
                onChange={handleChangeSelect2}
              >
                <FormControlLabel value="Sim" control={<Radio />} label="Sim" />
                <FormControlLabel value="Não" control={<Radio />} label="Não" />
              </RadioGroup>
            </div>
          </div>
        </div>
        {selectedState2 === "Sim" ? (
          <div className="div-2-inputs-work">
            <div>
              <div style={{ paddingBottom: "0.4rem" }}>
                <span className="span-state">
                  País da sua residencia<span style={{ color: "red" }}>*</span>
                </span>
              </div>
              <div className="padding-bottom-1">
                <Select
                  className="style-select-residence"
                  labelId="select-state"
                  id="select-state"
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
        ) : null}
      </div>
    </div>
  );
}

export default InformationResidence;
