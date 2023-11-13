import React, { useEffect, useState } from "react";
import "./informationResidence.css";
import { MenuItem, Select, TextField } from "@mui/material";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import InputMask from "react-input-mask";
import Countries from "../../../../datas/countries";
import { useData } from "../../../../dataContext/dataContext";

function InformationResidence({ validateStep }) {
  const { data, updateData } = useData();

  const [selectedState2, setSelectedState2] = useState("Sim");

  const handleChangeSelect = (event) => {
    const { value } = event.target;
    const boolValue = value == "Sim" ? true : false;
    updateData({ ...data, isMailingAddressSameCurrentAddress: boolValue });
  };

  const handleChangeSelect2 = (event) => {
    setSelectedState2(event.target.value);
  };

  const handleAddressChange = (event) => {
    const { value, name } = event.target;
    updateData({ ...data, address: { ...data.address, [name]: value } });
  };

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
                name="street"
                value={data.address.street}
                onChange={handleAddressChange}
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
                name="complement"
                value={data.address.complement}
                onChange={handleAddressChange}
              />
            </div>
          </div>
        </div>
        <div className="div-1-inputs-residence">
          <div>
            <div style={{ paddingBottom: "0.4rem" }}>
              <span className="span-state">
                País da sua residência <span style={{ color: "red" }}>*</span>
              </span>
            </div>
            <div className="padding-bottom-1">
              <Select
                className="style-select-work"
                labelId="select-state"
                id="select-state"
                name="country"
                value={data.address.country}
                onChange={handleAddressChange}
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
                Estado da sua residência <span style={{ color: "red" }}>*</span>
              </span>
            </div>
            <div className="padding-bottom-1">
              <TextField
                id="outlined-basic"
                className="style-select-work"
                placeholder="Preencha um complemento"
                variant="outlined"
                name="state"
                value={data.address.state}
                onChange={handleAddressChange}
              />
            </div>
          </div>
          <div>
            <div style={{ paddingBottom: "0.4rem" }}>
              <span className="span-state">
                Cidade da sua residência <span style={{ color: "red" }}>*</span>
              </span>
            </div>
            <div className="padding-bottom-1">
              <TextField
                id="outlined-basic"
                className="style-select-work"
                placeholder="Preencha um complemento"
                variant="outlined"
                name="city"
                value={data.address.city}
                onChange={handleAddressChange}
              />
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
              <InputMask
                mask="99999-999"
                maskChar=""
                value={data.address.zip_code}
                onChange={handleAddressChange}
              >
                {() => (
                  <TextField
                    id="outlined-basic"
                    className="input-style-work"
                    placeholder="00000-000"
                    variant="outlined"
                    name="zip_code"
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
                value={data.isMailingAddressSameCurrentAddress ? "Sim" : "Não"}
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
                Você é residente permanente em outro pais?
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
