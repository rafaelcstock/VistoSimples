import React, { useEffect, useState } from "react";
import "./charity.css";
import { MenuItem, OutlinedInput, Select, TextField } from "@mui/material";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { GetLanguages } from "react-country-state-city";
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

function Charity({ validateStep }) {
  const { data, updateData } = useData();

  const getStates = async () => {
    GetLanguages().then((result) => {
      setLanguageList(result);
    });
  };

  const [languageList, setLanguageList] = useState([]);
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const { value } = event.target;
    setPersonName(typeof value === "string" ? value.split(",") : value);
  };

  const handleOrganizationNameChange = (event) => {
    const { value } = event.target;
    updateData({
      ...data,
      charitable_organizations: [value],
    });
  };

  const handleChangeRequester = (event) => {
    const { value } = event.target;
    const boolValue = value === "Sim" ? true : false;

    if (boolValue) {
      updateData({
        ...data,
        charitable_organizations: [""],
      });
    } else {
      updateData({ ...data, charitable_organizations: [] });
    }
  };

  useEffect(() => {
    getStates();
  }, []);

  useEffect(() => {
    updateData({
      ...data,
      languages: personName,
    });
  }, [personName]);

  useEffect(() => {
    validateStep();
  }, [data]);

  return (
    <div className="div-margin">
      <div className="padding-bottom">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <span className="title-header">Informações adicionais</span>
          </div>
          <div>
            <span className="title-header-1">Caridade</span>
          </div>
        </div>
        <hr className="hr-color" />
      </div>
      <div className="div-country-padding">
        <div className="padding-bottom-title-input-country">
          <span className="title-header-2">
            Você participa de alguma organização de caridade?
            <span style={{ color: "red" }}>*</span>
          </span>
        </div>
        <div className="padding-radio-marital">
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="Sim"
            name="radio-buttons-group"
            className="subTitle-div-2"
            row
            value={data.charitable_organizations.length > 0 ? "Sim" : "Não"}
            onChange={handleChangeRequester}
          >
            <FormControlLabel value="Sim" control={<Radio />} label="Sim" />
            <FormControlLabel value="Não" control={<Radio />} label="Não" />
          </RadioGroup>
        </div>

        {data.charitable_organizations.length > 0 && (
          <div className="padding-charity">
            <div>
              <div style={{ paddingBottom: "0.4rem" }}>
                <span className="span-state">
                  Nome da organização<span style={{ color: "red" }}>*</span>
                </span>
              </div>
              <div className="padding-bottom-1">
                <div className="padding-bottom-1">
                  <TextField
                    id="outlined-basic"
                    className="style-select-work"
                    placeholder="Escreva o ramo"
                    variant="outlined"
                    name="organization_chatitable"
                    value={data.charitable_organizations[0]}
                    onChange={handleOrganizationNameChange}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Charity;
