import React, { useEffect, useState } from "react"
import './travels.css'
import { MenuItem, OutlinedInput, Select, TextField } from "@mui/material";
// import statesBrazilianService from "../../../services/statesBrazilianService";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import InputMask from 'react-input-mask';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Countries from '../../../../datas/countries'


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

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function Travels() {
  // const getStates = async () =>{        
  //     const response = await statesBrazilianService.getStates();
  //     setStates(response);        
  // }

  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("Sim");
  const [radioRequester, setRadioRequester] = useState("");

  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleChangeSelect = (event) => {
    setSelectedState(event.target.value);
  };

  const handleChangeRequester = (event) => {
    setRadioRequester(event.target.value);
  };

  // useEffect(() => {
  //     getStates();
  // }, []);

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
          <span className="title-header-2">Já viajou para outro país?<span style={{ color: 'red' }}>*</span></span>
        </div>
        <div className="padding-radio-marital">
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

      {selectedState === "Sim" ? (
        <div className="div-marital-padding">
          <div className="padding-bottom-title-input">
            <span className="title-header-2">Quais  países já viajou?<span style={{ color: 'red' }}>*</span></span>
          </div>
          <div className="padding-radio-marital">
            <Select
              className="style-select-travels"
              multiple
              value={personName}
              onChange={handleChange}
              input={<OutlinedInput />}
              MenuProps={MenuProps}
            >
              {Countries.map((name) => (
                <MenuItem
                  key={name.key}
                  value={name.value}
                  style={getStyles(name.value, personName, theme)}
                >
                  {name.value}
                </MenuItem>
              ))}
            </Select>
          </div>
        </div>
      ) : null}

      <div className="div-marital-padding">
        <div className="padding-bottom-title-input">
          <span className="title-header-2">Já trabalhou em algum outro lugar?<span style={{ color: 'red' }}>*</span></span>
        </div>
        <div className="padding-radio-marital">
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="Sim"
            name="radio-buttons-group"
            className="subTitle-div-2"
            row
          >
            <FormControlLabel value="Sim" control={<Radio />} label="Sim" />
            <FormControlLabel value="Não" control={<Radio />} label="Não" />
          </RadioGroup>
        </div>
      </div>
    </div>
  )
}

export default Travels
