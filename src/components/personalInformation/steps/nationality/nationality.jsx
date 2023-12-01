import React, { useEffect, useState } from "react";
import "./nationality.css";
import { MenuItem, Select, TextField, OutlinedInput, Autocomplete, } from "@mui/material";
import { FormControlLabel, Radio, RadioGroup, } from "@mui/material";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import Countries from "../../../../datas/countries";
import countriesService from "../../../../services/countriesWorld";
import statesService from "../../../../services/statesWorldMain";
import citiesService from "../../../../services/citiesWorld";
import { useData } from "../../../../dataContext/dataContext";
import { GetLanguages } from "react-country-state-city";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function Nationality({ validateStep }) {

  const { data, updateData } = useData();
  const [imageSrc, setImageSrc] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [languageList, setLanguageList] = useState([]);
  const [personName, setPersonName] = useState([]);

  console.log(personName);
  console.log("--- context")
  console.log(data.languages)


  const getLanguages = async () => {
    try {
      const languages = await GetLanguages();
      const languageList = languages.map((language) => ({
        name: language.name,
        code: language.iso2,
      }));
      setLanguageList(languageList);
    } catch (error) {
      console.error("Error fetching languages:", error);
    }
  };

  const getStyles = (name, personName) => {
    return {
      fontWeight: personName.indexOf(name) === -1 ? "normal" : "bold",
    };
  };


  const handleChange = (event, newValue) => {
    debugger
    setPersonName(newValue);
    const newValueLanguage = newValue.map(value => value.name); 
    updateData({ ...data, languages: [...newValueLanguage ] });
  };

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

  const handleChangeSelectCountry = (event) => {
    const { value } = event.target;
    setCountry(value);
    updateData({ ...data, birth: { ...data.birth, country: value } });
  };

  const handleChangeSelectState = (value) => {
    setState(value);
    updateData({ ...data, birth: { ...data.birth, state: value } });
  };

  const handleChangeSelectCity = (value) => {
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
    getLanguages();
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
                value={data.birth.country}
                onChange={handleChangeSelectCountry}
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
                Estado natal<span style={{ color: "red" }}>*</span>
              </span>
            </div>
            <div className="padding-bottom-1">
              <TextField
                id="outlined-basic"
                className="style-select-nationality"
                placeholder="Digite o estado natal"
                variant="outlined"
                value={data.birth.state}
                onChange={(event) => handleChangeSelectState(event.target.value)}
              />
            </div>
          </div>
          <div>
            <div style={{ paddingBottom: "0.4rem" }}>
              <span className="span-state">
                Cidade natal<span style={{ color: "red" }}>*</span>
              </span>
            </div>
            <div className="padding-bottom-1">
              <TextField
                id="outlined-basic"
                className="style-select-nationality"
                placeholder="Digite a cidade natal"
                variant="outlined"
                value={data.birth.city}
                onChange={(event) => handleChangeSelectCity(event.target.value)}
              />
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
        </div>
        <div className="div-country-padding">
          <div className="padding-charity">
            <div>
              <div style={{ paddingBottom: "0.4rem" }}>
                <span className="span-state">
                  Idiomas que você fala<span style={{ color: "red" }}>*</span>
                </span>
              </div>
              <div className="padding-bottom-1">
                <Autocomplete
                  multiple
                  id="languages-autocomplete"
                  options={languageList}
                  value={personName}
                  onChange={handleChange}
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      className="style-select-travels"
                    />
                  )}
                  renderOption={(props, option) => (
                    <li {...props}>{option.name}</li>
                  )}
                />
              </div>
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
              {data.b64_picture ? (
                <div
                  className="div-img-style"
                  style={{ backgroundImage: `url(${data.b64_picture})` }}
                  src={data.b64_picture}
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
              <label className="font-button-img button-style-imgSearch">
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
          <div className="otherNationality">
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
                value={data.hasAnotherNacionality ? "Sim" : "Não"}
                onChange={handleChangeRequester}
              >
                <FormControlLabel value="Sim" control={<Radio />} label="Sim" />
                <FormControlLabel value="Não" control={<Radio />} label="Não" />
              </RadioGroup>
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