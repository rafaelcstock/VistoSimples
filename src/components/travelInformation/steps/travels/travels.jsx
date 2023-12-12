import React, { useEffect } from "react";
import './travels.css';
import { Autocomplete, FormControlLabel, Radio, RadioGroup, TextField } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import Countries from '../../../../datas/countries';
import { useData } from "../../../../dataContext/dataContext";

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

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function Travels({ validateStep }) {
  const { data, updateData } = useData();
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  const handleUpdateVisitedCountriesChange = (event, value) => {
    setPersonName(value);

    updateData({
      ...data,
      visited_countries: value.map(country => country.key)
    });
  };

  const handleChangeSelect = (event) => {
    const { value } = event.target;
    const boolValue = value === "Sim";

    if (boolValue) {
      updateData({ ...data, visited_countries: [] });
    } else {
      updateData({ ...data, visited_countries: null });
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    validateStep();
  }, [data]);

  return (
    <div className="div-margin">
      <div className="padding-bottom">
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <span className="title-header">Viagens</span>
          </div>
        </div>
        <hr className="hr-color" />
      </div>
      <div className="div-marital-padding">
        <div className="padding-bottom-title-input">
          <span className="title-header-2">Viajou para algum outro país nos últimos 5 anos?<span style={{ color: 'red' }}>*</span></span>
        </div>
        <div className="padding-radio-marital">
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="Sim"
            name="radio-buttons-group"
            className="subTitle-div-2"
            row
            value={data.visited_countries !== null ? "Sim" : "Não"}
            onChange={handleChangeSelect}
          >
            <FormControlLabel value="Sim" control={<Radio />} label="Sim" />
            <FormControlLabel value="Não" control={<Radio />} label="Não" />
          </RadioGroup>
        </div>
      </div>

      {data.visited_countries !== null ? (
        <div className="div-marital-padding">
          <div className="padding-bottom-title-input">
            <span className="title-header-2">Quais países você já viajou?<span style={{ color: 'red' }}>*</span></span>
          </div>
          <div className="padding-radio-maritalCountries">
            <Autocomplete
              multiple
              id="autocomplete-travels"
              options={Countries}
              value={Countries.filter(country => personName.includes(country))}
              getOptionLabel={(option) => option.value}
              onChange={handleUpdateVisitedCountriesChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  placeholder="Selecione o país"
                  className="style-select-travels"
                />
              )}
              MenuProps={MenuProps}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Travels;