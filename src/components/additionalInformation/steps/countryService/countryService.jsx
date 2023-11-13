import React, { useEffect } from "react";
import "./countryService.css";
import { MenuItem, Select, TextField } from "@mui/material";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Countries from "../../../../datas/countries";
import { useData } from "../../../../dataContext/dataContext";
import dayjs from "dayjs";

function CountryService({ validateStep }) {
  const { data, updateData } = useData();

  const handleUpdateData = (event) => {
    const { value, name } = event.target;

    updateData({
      ...data,
      military_info: [{ ...data.military_info[0], [name]: value }],
    });
  };

  const handleChangeRequester = (event) => {
    const { value } = event.target;
    const boolValue = value === "Sim" ? true : false;

    if (boolValue) {
      updateData({
        ...data,
        military_info: [
          {
            country: "",
            branch_of_service: "",
            rank: "",
            specialty: "",
            start_date: "",
            end_date: "",
          },
        ],
      });
    } else {
      updateData({ ...data, military_info: [] });
    }
  };

  const handleDateUpdateData = (name, newDate) => {
    const formattedDate = dayjs(newDate).format("YYYY-MM-DD");

    updateData({
      ...data,
      military_info: [{ ...data.military_info[0], [name]: formattedDate }],
    });
  };

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
            <span className="title-header-1">Serviços ao país</span>
          </div>
        </div>
        <hr className="hr-color" />
      </div>
      <div className="div-country-padding">
        <div className="padding-bottom-title-input-country">
          <span className="title-header-2">
            Já serviu?<span style={{ color: "red" }}>*</span>
          </span>
        </div>
        <div className="padding-radio-marital">
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="Sim"
            name="radio-buttons-group"
            className="subTitle-div-2"
            row
            value={data.military_info.length > 0 ? "Sim" : "Não"}
            onChange={handleChangeRequester}
          >
            <FormControlLabel value="Sim" control={<Radio />} label="Sim" />
            <FormControlLabel value="Não" control={<Radio />} label="Não" />
          </RadioGroup>
        </div>
      </div>
      {data.military_info.length > 0 ? (
        <div>
          <div className="div-country-padding">
            <div className="div-2-inputs-work">
              <div>
                <div style={{ paddingBottom: "0.4rem" }}>
                  <span className="span-state">
                    País que serviu ao exercito
                    <span style={{ color: "red" }}>*</span>
                  </span>
                </div>
                <div className="padding-bottom-1">
                  <Select
                    className="style-select-work"
                    labelId="select-state"
                    id="select-state"
                    name="country"
                    value={data.military_info[0].country}
                    onChange={handleUpdateData}
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
                    Ramo de serviço que serviu ao exercito
                    <span style={{ color: "red" }}>*</span>
                  </span>
                </div>
                <div className="padding-bottom-1">
                  <TextField
                    id="outlined-basic"
                    className="style-select-work"
                    placeholder="Escreva o ramo"
                    variant="outlined"
                    name="branch_of_service"
                    value={data.military_info[0].branch_of_service}
                    onChange={handleUpdateData}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="div-country-padding">
            <div className="div-2-inputs-work">
              <div>
                <div style={{ paddingBottom: "0.4rem" }}>
                  <span className="span-state">
                    Patente<span style={{ color: "red" }}>*</span>
                  </span>
                </div>
                <div className="padding-bottom-1">
                  <TextField
                    id="outlined-basic"
                    className="style-select-work"
                    placeholder="Escreva a patente"
                    variant="outlined"
                    name="rank"
                    value={data.military_info[0].rank}
                    onChange={handleUpdateData}
                  />
                </div>
              </div>
              <div>
                <div style={{ paddingBottom: "0.4rem" }}>
                  <span className="span-state">
                    Especialidade<span style={{ color: "red" }}>*</span>
                  </span>
                </div>
                <div className="padding-bottom-1">
                  <TextField
                    id="outlined-basic"
                    className="style-select-work"
                    placeholder="Escreva a especialidade"
                    variant="outlined"
                    name="specialty"
                    value={data.military_info[0].specialty}
                    onChange={handleUpdateData}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="div-country-padding">
            <div className="div-2-inputs-work">
              <div>
                <div style={{ paddingBottom: "0.4rem" }}>
                  <span className="span-state">
                    Data de inicio no exercito
                    <span style={{ color: "red" }}>*</span>
                  </span>
                </div>
                <div className="padding-bottom-1">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      format="DD/MM/YYYY"
                      className="custom-date-picker-initial"
                      value={dayjs(data.military_info[0].start_date)}
                      onChange={(date) =>
                        handleDateUpdateData("start_date", date)
                      }
                    />
                  </LocalizationProvider>
                </div>
              </div>
              <div>
                <div style={{ paddingBottom: "0.4rem" }}>
                  <span className="span-state">
                    Data de termino no exercito
                    <span style={{ color: "red" }}>*</span>
                  </span>
                </div>
                <div className="padding-bottom-1">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      format="DD/MM/YYYY"
                      className="custom-date-picker-initial"
                      value={dayjs(data.military_info[0].end_date)}
                      onChange={(date) =>
                        handleDateUpdateData("end_date", date)
                      }
                    />
                  </LocalizationProvider>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default CountryService;
