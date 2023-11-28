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
          {
            date: "",
            length_of_stay: 0,
          },
          {
            date: "",
            length_of_stay: 0,
          },
          {
            date: "",
            length_of_stay: 0,
          },
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

  useEffect(() => {
    validateStep();
  }, [data]);

  return (
    <div className="div-margin">
      <div className="padding-bottom">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
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
            Já esteve nos Estados Unidos?<span style={{ color: "red" }}>*</span>
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
            <div className="div-2-inputs-work">
              <div>
                <div style={{ paddingBottom: "0.4rem" }}>
                  <span className="span-state">
                    Data de chegada - Viagem 1
                    <span style={{ color: "red" }}>*</span>
                  </span>
                </div>
                <div className="padding-bottom-1">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      format="DD/MM/YYYY"
                      className="custom-date-picker-initial"
                      value={
                        data.us_visits[0].date !== "" ? dayjs(data.us_visits[0].date) : null
                      }
                      onChange={(date) => handleDateUpdateData("0", date)}
                    />
                  </LocalizationProvider>
                </div>
              </div>
              <div>
                <div style={{ paddingBottom: "0.4rem" }}>
                  <span className="span-state">
                    Tempo estimado de estadia - Viagem 1
                    <span style={{ color: "red" }}>*</span>
                  </span>
                </div>
                <div className="padding-bottom-1">
                  <TextField
                    type="number"
                    name="0"
                    value={
                      data.us_visits[0] ? data.us_visits[0].length_of_stay : ""
                    }
                    onChange={handleLengthOfStayUpdateData}
                  />
                </div>
              </div>
            </div>
            <div className="div-2-inputs-work">
              <div>
                <div style={{ paddingBottom: "0.4rem" }}>
                  <span className="span-state">
                    Data de chegada - Viagem 2
                    <span style={{ color: "red" }}>*</span>
                  </span>
                </div>
                <div className="padding-bottom-1">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      format="DD/MM/YYYY"
                      className="custom-date-picker-initial"
                      name="1"
                      value={
                        data.us_visits[1].date !== "" ? dayjs(data.us_visits[1].date) : null
                      }
                      onChange={(date) => handleDateUpdateData("1", date)}
                    />
                  </LocalizationProvider>
                </div>
              </div>
              <div>
                <div style={{ paddingBottom: "0.4rem" }}>
                  <span className="span-state">
                    Tempo estimado de estadia - Viagem 2
                    <span style={{ color: "red" }}>*</span>
                  </span>
                </div>
                <div className="padding-bottom-1">
                  <TextField
                    type="number"
                    name="1"
                    value={
                      data.us_visits[1] ? data.us_visits[1].length_of_stay : ""
                    }
                    onChange={handleLengthOfStayUpdateData}
                  />
                </div>
              </div>
            </div>
            <div className="div-2-inputs-work">
              <div>
                <div style={{ paddingBottom: "0.4rem" }}>
                  <span className="span-state">
                    Data de chegada - Viagem 3
                    <span style={{ color: "red" }}>*</span>
                  </span>
                </div>
                <div className="padding-bottom-1">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      format="DD/MM/YYYY"
                      className="custom-date-picker-initial"
                      name="2"
                      value={
                        data.us_visits[2].date !== "" ? dayjs(data.us_visits[2].date) : null
                      }
                      onChange={(date) => handleDateUpdateData("2", date)}
                    />
                  </LocalizationProvider>
                </div>
              </div>
              <div>
                <div style={{ paddingBottom: "0.4rem" }}>
                  <span className="span-state">
                    Tempo estimado de estadia - Viagem 3
                    <span style={{ color: "red" }}>*</span>
                  </span>
                </div>
                <div className="padding-bottom-1">
                  <TextField
                    type="number"
                    name="2"
                    value={
                      data.us_visits[2] ? data.us_visits[2].length_of_stay : ""
                    }
                    onChange={handleLengthOfStayUpdateData}
                  />
                </div>
              </div>
            </div>
            <div className="div-2-inputs-work">
              <div>
                <div style={{ paddingBottom: "0.4rem" }}>
                  <span className="span-state">
                    Data de chegada - Viagem 4
                    <span style={{ color: "red" }}>*</span>
                  </span>
                </div>
                <div className="padding-bottom-1">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      format="DD/MM/YYYY"
                      className="custom-date-picker-initial"
                      name="3"
                      value={
                        data.us_visits[3].date !== "" ? dayjs(data.us_visits[3].date) : null
                      }
                      onChange={(date) => handleDateUpdateData("3", date)}
                    />
                  </LocalizationProvider>
                </div>
              </div>
              <div>
                <div style={{ paddingBottom: "0.4rem" }}>
                  <span className="span-state">
                    Tempo estimado de estadia - Viagem 4
                    <span style={{ color: "red" }}>*</span>
                  </span>
                </div>
                <div className="padding-bottom-1">
                  <TextField
                    type="number"
                    name="3"
                    value={
                      data.us_visits[3] ? data.us_visits[3].length_of_stay : ""
                    }
                    onChange={handleLengthOfStayUpdateData}
                  />
                </div>
              </div>
            </div>
            <div className="div-2-inputs-work">
              <div>
                <div style={{ paddingBottom: "0.4rem" }}>
                  <span className="span-state">
                    Data de chegada - Viagem 5
                    <span style={{ color: "red" }}>*</span>
                  </span>
                </div>
                <div className="padding-bottom-1">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      format="DD/MM/YYYY"
                      className="custom-date-picker-initial"
                      name="4"
                      value={
                        data.us_visits[4].date !== "" ? dayjs(data.us_visits[4].date) : null
                      }
                      onChange={(date) => handleDateUpdateData("4", date)}
                    />
                  </LocalizationProvider>
                </div>
              </div>
              <div>
                <div style={{ paddingBottom: "0.4rem" }}>
                  <span className="span-state">
                    Tempo estimado de estadia - Viagem 5
                    <span style={{ color: "red" }}>*</span>
                  </span>
                </div>
                <div className="padding-bottom-1">
                  <TextField
                    type="number"
                    name="4"
                    value={
                      data.us_visits[4] ? data.us_visits[4].length_of_stay : ""
                    }
                    onChange={handleLengthOfStayUpdateData}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="div-marital-padding">
            <div style={{ paddingBottom: "1rem", paddingLeft: "1rem" }}>
              <span className="footer-travel">
                <b>
                  Caso você tenha menos que 5 viagens, preencha apenas as
                  viagens que você fez, deixe as outras em branco!
                </b>
              </span>
            </div>
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
