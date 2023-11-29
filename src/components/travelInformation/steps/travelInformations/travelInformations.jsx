import React, { useEffect, useState } from "react";
import "./travelInformations.css";
import { MenuItem, Select, TextField } from "@mui/material";
import InputMask from "react-input-mask";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Countries from "../../../../datas/countries";
import USStates from "../../../../datas/us_states";
import { useData } from "../../../../dataContext/dataContext";
import dayjs from "dayjs";

function TravelInformations({ validateStep }) {
  const { data, updateData } = useData();

  const handleLengthDaysChange = (event) => {
    const { value } = event.target;

    updateData({
      ...data,
      stay: { ...data.stay, length: Number(value) },
    });
  };

  const handleAddressChange = (event) => {
    const { value, name } = event.target;

    updateData({
      ...data,
      stay: { ...data.stay, address: { ...data.stay.address, [name]: value } },
    });
  };

  const handleDateUpdateData = (selectedDate) => {
    if (selectedDate && dayjs(selectedDate).isValid()) {
      const formattedDate = dayjs(selectedDate).format("YYYY-MM-DD");
      updateData({
        ...data,
        stay: { ...data.stay, date: formattedDate },
      });
    } else {
      updateData({
        ...data,
        stay: { ...data.stay, date: "" },
      });
    }
  };

  useEffect(() => {
    validateStep();
  }, [data]);

  return (
    <div className="div-margin">
      <div className="padding-bottom">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <span className="title-header">Informações da viagem</span>
          </div>
        </div>
        <hr className="hr-color" />
      </div>

      <div className="div-marital-padding">
        <div className="div-2-inputs-work">
          <div>
            <div style={{ paddingBottom: "0.4rem" }}>
              <span className="span-state">
                Data estimada da viagem aos Estados Unidos<span style={{ color: "red" }}>*</span>
              </span>
            </div>
            <div className="padding-bottom-1">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  format="DD/MM/YYYY"
                  className="custom-date-picker-initialTravels"
                  value={data.stay.date !== "" ? dayjs(data.stay.date) : null}
                  onChange={handleDateUpdateData}
                />
              </LocalizationProvider>
            </div>
          </div>
          <div>
            <div style={{ paddingBottom: "0.4rem" }}>
              <span className="span-state">
                Duração da viagem{" "}
                <span style={{ color: "#2F5FE3" }}>(em dias)</span>
              </span>
            </div>
            <div className="padding-bottom-1">
              <TextField
                id="outlined-basic"
                className="style-input-2-travelinfo"
                placeholder="Ex: 5"
                variant="outlined"
                type="number"
                value={data.stay.length}
                onChange={handleLengthDaysChange}
              />
            </div>
          </div>
        </div>
        <div className="div-1-inputs-marital">
          <div>
            <div style={{ paddingBottom: "0.4rem" }}>
              <span className="span-state">
                Endereço da possível hospedagem{" "}
                <span style={{ color: "red" }}>*</span>
              </span>
            </div>
            <div className="padding-bottom-1">
              <TextField
                id="outlined-basic"
                className="input-style-work"
                placeholder="Bairro, rua e número"
                variant="outlined"
                name="street"
                value={data.stay.address.street}
                onChange={handleAddressChange}
              />
            </div>
          </div>

          <div>
            <div style={{ paddingBottom: "0.4rem" }}>
              <span className="span-state">
                Estado da possível hospedagem{" "}
                <span style={{ color: "red" }}>*</span>
              </span>
            </div>
            <div className="padding-bottom-1">
              <Select
                className="input-style-work"
                labelId="select-state"
                id="select-state"
                name="state"
                value={data.stay.address.state}
                onChange={handleAddressChange}
              >
                {USStates.map((state, index) => (
                  <MenuItem key={index} value={state.key}>
                    {state.value}
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
                Cidade da possível hospedagem{" "}
                <span style={{ color: "red" }}>*</span>
              </span>
            </div>
            <div className="padding-bottom-1">
              <TextField
                id="outlined-basic"
                className="input-style-work"
                placeholder="Digite a cidade"
                variant="outlined"
                name="city"
                value={data.stay.address.city}
                onChange={handleAddressChange}
              />
            </div>
          </div>
          <div>
            <div style={{ paddingBottom: "0.4rem" }}>
              <span className="span-state">
                CEP <span style={{ color: "red" }}>*</span>
              </span>
            </div>
            <div className="padding-bottom-1">
              <InputMask
                mask="99999"
                maskChar=""
                value={data.stay.address.zip_code}
                onChange={handleAddressChange}
              >
                {() => (
                  <TextField
                    id="outlined-basic"
                    className="style-select-work"
                    placeholder="00000"
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

export default TravelInformations;
