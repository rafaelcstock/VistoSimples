import React, { useEffect, useState } from "react";
import "./adress.css";
import { MenuItem, Select, TextField } from "@mui/material";
import InputMask from "react-input-mask";
import { useData } from "../../../../dataContext/dataContext";
import Countries from "../../../../datas/countries";

function Adress({ validateStep }) {
  const { data, updateData } = useData();

  const handleAddressChange = (event) => {
    const { value, name } = event.target;
    updateData({
      ...data,
      mailing_address: { ...data.mailing_address, [name]: value },
    });
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
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <span className="title-header">Endereço de entrega</span>
          </div>
        </div>
        <hr className="hr-color" />
      </div>

      <div className="div-marital-padding">
        <div className="div-2-inputs-work">
          <div>
            <div style={{ paddingBottom: "0.4rem" }}>
              <span className="span-state">
                Endereço de entrega<span style={{ color: "red" }}>*</span>
              </span>
            </div>
            <div className="padding-bottom-1">
              <TextField
                id="outlined-basic"
                className="style-select-work"
                placeholder="Bairro, rua e número"
                variant="outlined"
                name="street"
                value={data.mailing_address.street}
                onChange={handleAddressChange}
              />
            </div>
          </div>
          <div>
            <div style={{ paddingBottom: "0.4rem" }}>
              <span className="span-state"> Complemento </span>
            </div>
            <div className="padding-bottom-1">
              <TextField
                id="outlined-basic"
                className="style-select-work"
                placeholder="Preencha um complemento"
                variant="outlined"
                name="complement"
                value={data.mailing_address.complement}
                onChange={handleAddressChange}
              />
            </div>
          </div>
        </div>
        <div className="div-3-inputs-residence">
          <div>
            <div style={{ paddingBottom: "0.4rem" }}>
              <span className="span-state">
                País do endereço de entrega
                <span style={{ color: "red" }}>*</span>
              </span>
            </div>

            <div className="padding-bottom-1">
              <Select
                className="style-select-work"
                labelId="select-state"
                id="select-state"
                name="country"
                value={data.mailing_address.country}
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
                Estado do endereço de entrega
                <span style={{ color: "red" }}>*</span>
              </span>
            </div>
            <div className="padding-bottom-1">
              <div className="padding-bottom-1">
                <TextField
                  id="outlined-basic"
                  className="style-select-work"
                  placeholder="Escreva o estado"
                  variant="outlined"
                  name="state"
                  value={data.mailing_address.state}
                  onChange={handleAddressChange}
                />
              </div>
            </div>
          </div>
          <div>
            <div style={{ paddingBottom: "0.4rem" }}>
              <span className="span-state">
                Cidade do endereço de entrega
                <span style={{ color: "red" }}>*</span>
              </span>
            </div>
            <div className="padding-bottom-1">
              <TextField
                id="outlined-basic"
                className="style-select-work"
                placeholder="Escreva o ramo"
                variant="outlined"
                name="city"
                value={data.mailing_address.city}
                onChange={handleAddressChange}
              />
            </div>
          </div>
          <div>
            <div style={{ paddingBottom: "0.4rem", marginTop: "1.25em" }}>
              <span className="span-state">
                CEP<span style={{ color: "red" }}>*</span>
              </span>
            </div>
            <div className="padding-bottom-1">
              <InputMask
                mask="99999-999"
                maskChar=""
                value={data.mailing_address.zip_code}
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
        </div>
      </div>
    </div>
  );
}

export default Adress;
