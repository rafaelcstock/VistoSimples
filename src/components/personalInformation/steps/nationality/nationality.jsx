import React, { useEffect, useState } from "react";
import "./nationality.css";
import { MenuItem, Select, TextField } from "@mui/material";
import statesBrazilianService from "../../../../services/statesBrazilianService";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import Countries from "../../../../datas/countries";
import countriesService from "../../../../services/countriesWorld";
import statesService from "../../../../services/StatesWorld";
import citiesService from "../../../../services/citiesWorld";
import { useData } from "../../../../dataContext/dataContext";

function Nationality({ validateStep }) {
  const { data, updateData } = useData();

  const [imageSrc, setImageSrc] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);
  const [countries, setCountries] = useState([]);

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const imageBase64 = e.target?.result;
        setImageSrc(imageBase64);
        updateData({ ...data, b64_picture: imageBase64 });
      };

      reader.readAsDataURL(file);
    }
  };

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
    const { value } = event.target;
    setCountry(value);
    getStates(value);
    updateData({ ...data, birth: { ...data.birth, country: value } });
  };

  const handleChangeSelectState = (event) => {
    const { value } = event.target;
    setState(value);
    getCities(country, value);

    updateData({ ...data, birth: { ...data.birth, state: value } });
  };

  const handleChangeSelectCity = (event) => {
    const { value } = event.target;
    setCity(value);
    updateData({ ...data, birth: { ...data.birth, city: value } });
  };

  const handleChangeSelectNationalityCountry = (event) => {
    const { value, name } = event.target;
    updateData({ ...data, [name]: value });
  };

  const handleChangeRequester = (event) => {
    const { value } = event.target;

    const boolValue = value === "Sim" ? true : false;

    if (boolValue) {
      updateData({ ...data, hasAnotherNacionality: boolValue });
    } else {
      updateData({
        ...data,
        hasAnotherNacionality: boolValue,
        other_nationality_country: null,
        other_nationality_passport: null,
      });
    }
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
            <span className="title-header">Nacionalidade</span>
          </div>
        </div>
        <hr className="hr-color" />
      </div>
      <div className="div-nationality-padding">
        <div className="padding-bottom-nationality">
          <span className="title-header-2">
            Nacionalidade<span style={{ color: "red" }}>*</span>
          </span>
        </div>
        <div className="div-grid-nationality-inputs">
          <div>
            <div style={{ paddingBottom: "0.4rem" }}>
              <span className="span-state">
                Pais natal<span style={{ color: "red" }}>*</span>
              </span>
            </div>
            <div className="padding-bottom-1">
              <Select
                className="style-select-nationality"
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
                Estado natal<span style={{ color: "red" }}>*</span>
              </span>
            </div>
            <div className="padding-bottom-1">
              <Select
                className="style-select-nationality"
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
                Cidade natal<span style={{ color: "red" }}>*</span>
              </span>
            </div>
            <div className="padding-bottom-1">
              <Select
                className="style-select-nationality"
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
        <div className="div-grid-nationality-inputs-1">
          <div>
            <div style={{ paddingBottom: "0.4rem" }}>
              <span className="span-state">
                Nacionaliadade <span style={{ color: "red" }}>*</span>
              </span>
            </div>
            <div className="padding-bottom-1">
              <Select
                className="style-select-nationality-1"
                labelId="select-state"
                id="select-state"
                name="nationality_country"
                value={data.nationality_country}
                onChange={handleChangeSelectNationalityCountry}
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
            <div style={{ paddingBottom: "1rem" }}>
              <span className="span-state">
                Você possui outra nacionalidade?
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
                value={data.hasAnotherNacionality}
                onChange={handleChangeRequester}
              >
                <FormControlLabel value="Sim" control={<Radio />} label="Sim" />
                <FormControlLabel value="Não" control={<Radio />} label="Não" />
              </RadioGroup>
            </div>
          </div>
        </div>
        <div className="div-grid-nationality-inputs-2">
          <div>
            <div style={{ paddingBottom: "0.4rem" }}>
              <span className="span-state">
                Insira sua foto<span style={{ color: "red" }}>*</span>
              </span>
            </div>
            <div className="margin-icon">
              {imageSrc ? (
                <div
                  className="div-img-style"
                  style={{ backgroundImage: `url(${imageSrc})` }}
                  src={imageSrc}
                ></div>
              ) : (
                <InsertPhotoOutlinedIcon
                  sx={{ fontSize: 200 }}
                  color="disabled"
                />
              )}
            </div>
          </div>
          <div>
            <div className="div-info-img">
              <div className="div-info-img-2">
                <div style={{ paddingBottom: "0.4rem" }}>
                  <span className="span-state">Sua foto deve ter</span>
                </div>
                <div>
                  <li className="inf-img">
                    Rosto visivel, sem óculos, bonés ou obstruções faciais.
                  </li>
                  <li className="inf-img">
                    Fundo claro, preferencialmente branco, sem cores ou padrões.
                  </li>
                </div>
              </div>
            </div>
            <div className="div-bnt">
              <label className="font-button-img button-style-img">
                Procurar
                <input
                  type="file"
                  accept="image/*"
                  style={{ zIndex: "4", display: "none" }}
                  onChange={handleImageChange}
                />
              </label>
            </div>
          </div>
        </div>
      </div>
      {data.hasAnotherNacionality ? (
        <div className="div-nationality-padding">
          <div className="padding-bottom-nationality">
            <span className="title-header-2">Outras nacionalidades</span>
            <br />
            <span className="subtitle-header">
              Caso possua outra nacionalidade ou cidadania, escolha o pais da
              mesma
            </span>
          </div>
          <div className="div-grid-nationality-inputs-1">
            <div>
              <div style={{ paddingBottom: "0.4rem" }}>
                <span className="span-state">
                  Nacionalidade<span style={{ color: "red" }}>*</span>
                </span>
              </div>
              <div className="padding-bottom-1">
                <Select
                  className="style-select-nationality-1"
                  labelId="select-state"
                  id="select-state"
                  name="other_nationality_country"
                  value={data.other_nationality_country}
                  onChange={handleChangeSelectNationalityCountry}
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
                  Número do passaporte<span style={{ color: "red" }}>*</span>
                </span>
              </div>
              <div className="padding-bottom-1">
                <TextField
                  id="outlined-basic"
                  className="style-select-nationality-1"
                  placeholder="Escreva o seu número do passaporte"
                  variant="outlined"
                  name="other_nationality_passport"
                  value={data.other_nationality_passport}
                  onChange={handleChangeSelectNationalityCountry}
                />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Nationality;
