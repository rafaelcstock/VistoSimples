import React, { useEffect, useState } from "react";
import "./fiveTravels.css";
import { FormControlLabel, Radio, RadioGroup, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useData } from "../../../../dataContext/dataContext";
import dayjs from "dayjs";

function FiveTravels({ validateStep }) {
  const { data, updateData } = useData();

  const handleChangeSelect = (event) => {
    const { value } = event.target;
    const boolValue = value == "Sim" ? true : false;

    if (boolValue) {
      updateData({
        ...data,
        us_visits: [
          {
            date: "",
            length_of_stay: 0,
          },
        ],
      });
    } else {
      updateData({
        ...data,
        us_visits: null,
      });
    }
  };

  const handleLengthOfStayUpdateData = (event) => {
    const { value, name } = event.target;

    const index = Number(name);
    const updatedUsVisits = [...data.us_visits];

    if (index < updatedUsVisits.length) {
      updatedUsVisits[index] = {
        ...updatedUsVisits[index],
        length_of_stay: Number(value),
      };
    } else {
      updatedUsVisits.splice(index, 0, {
        date: "",
        length_of_stay: Number(value),
      });
    }

    updateData({
      ...data,
      us_visits: updatedUsVisits,
    });
  };

  const handleDateUpdateData = (name, newDate) => {
    if (newDate && dayjs(newDate).isValid()) {
      const formattedDate = dayjs(newDate).format("YYYY-MM-DD");

      const index = Number(name);
      const updatedUsVisits = [...data.us_visits];

      if (index < updatedUsVisits.length) {
        updatedUsVisits[index] = {
          ...updatedUsVisits[index],
          date: formattedDate,
        };
      } else {
        updatedUsVisits.splice(index, 0, {
          date: formattedDate,
          length_of_stay: 0,
        });
      }

      updateData({
        ...data,
        us_visits: updatedUsVisits,
      });
    } else {
      const index = Number(name);
      const updatedUsVisits = [...data.us_visits];

      if (index < updatedUsVisits.length) {
        updatedUsVisits[index] = {
          ...updatedUsVisits[index],
          date: "",
        };
      } else {
        updatedUsVisits.splice(index, 0, {
          date: "",
          length_of_stay: 0,
        });
      }

      updateData({
        ...data,
        us_visits: updatedUsVisits,
      });
    }
  };

  const handleAddTravel = () => {
    const updatedUsVisits = [...data.us_visits, { date: "", length_of_stay: 0 }];
    
    updateData({
      ...data,
      us_visits: updatedUsVisits,
    });
  };
  const handleRemoveTravel = (indexPosition) => {
    const updatedUsVisits = data.us_visits.filter((visit, index) => index !== indexPosition);
  
    updateData({
      ...data,
      us_visits: updatedUsVisits,
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
        <div className="padding-bottomFiveTravels" style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <span className="title-header">Viagens</span>
          </div>
          <div>
            <span className="title-header-1">Últimas 5 viagens</span>
          </div>
        </div>
        <hr className="hr-color" />
      </div>
      <div className="div-marital-padding">
        <div className="padding-bottom-title-input">
          <span className="title-header-2">
            Já esteve nos Estados Unidos?
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
            value={data.us_visits !== null ? "Sim" : "Não"}
            onChange={handleChangeSelect}
          >
            <FormControlLabel value="Sim" control={<Radio />} label="Sim" />
            <FormControlLabel value="Não" control={<Radio />} label="Não" />
          </RadioGroup>
        </div>
      </div>
      {data.us_visits !== null ? (
        <div>
          <div className="div-marital-padding">
            <div className="padding-bottom-title-input">
              <span className="title-header-2">Últimas 5 viagens</span>
            </div>
            {data.us_visits.map((visit, index) => (
              <div key={index} className="div-2-inputs-work">
                <div>
                  <div style={{ paddingBottom: "0.4rem" }}>
                    <span className="span-state">
                      Data de chegada - Viagem {index + 1}
                      <span style={{ color: "red" }}>*</span>
                    </span>
                  </div>
                  <div className="padding-bottom-1">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        format="DD/MM/YYYY"
                        className="custom-date-picker-initialTravels"
                        name={index.toString()}
                        value={visit.date !== "" ? dayjs(visit.date) : null}
                        onChange={(date) => handleDateUpdateData(index.toString(), date)}
                      />
                    </LocalizationProvider>
                  </div>
                </div>
                <div>
                  <div style={{ paddingBottom: "0.4rem" }}>
                    <span className="span-state">
                      Tempo estimado de estadia - Viagem {index + 1}
                      <span style={{ color: "red" }}>*</span>
                    </span>
                  </div>
                  <div className="padding-bottom-Travels">
                    <TextField
                      className="padding-bottom-TravelsText"
                      type="number"
                      name={index.toString()}
                      value={visit.length_of_stay}
                      onChange={handleLengthOfStayUpdateData}
                    />
                  </div>
                </div>
                <div className="div-btnTravelsRemove">
                  <button
                    className="font-button-imgRemove button-style-imgTravels"
                    onClick={() => handleRemoveTravel(index)}
                  >
                    - Excluir Viagem
                  </button>
                </div>
              </div>
            ))}

          </div>
          <div className=".div-btnTravelsAdd">
            <button
              className="font-button-imgAdd button-style-imgTravels"
              onClick={handleAddTravel}
            >
              + Adicionar Viagem
            </button>
          </div>

          <div className="div-marital-padding">
            <div style={{ paddingBottom: "1rem", paddingLeft: "1rem" }}>
              <span className="footer-travel">
                <b>Obs. 1:</b> A data de chegada pode ser uma data estimada da
                sua viagenm,caso não lmebre a data exata em que foi.
              </span>
            </div>
            <div style={{ paddingBottom: "1rem", paddingLeft: "1rem" }}>
              <span className="footer-travel">
                <b>Obs. 2:</b> O tempo de estadia deve ser em dias
              </span>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default FiveTravels;