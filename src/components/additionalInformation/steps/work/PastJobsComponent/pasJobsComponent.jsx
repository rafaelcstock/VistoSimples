import { useEffect, useState } from "react";
import { MenuItem, Select, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import InputMask from "react-input-mask";
import Countries from "../../../../../datas/countries";
import { useData } from "../../../../../dataContext/dataContext";
import dayjs from "dayjs";
import PrimaryOccupation from "../../../../../datas/primary_occupation";

const PastJobsComponent = ({
  job,
  index,
  handleUpdateItem,
  validate,
  updateContext,
}) => {
  const { data } = useData();

  const handleDateUpdateData = (name, newDate, index) => {
    let newObject;
    const formattedDate = dayjs(newDate).format("YYYY-MM-DD");

    const newPastJobs = data.past_jobs.map((job, i) => {
      if (i === index) {
        return { ...job, [name]: formattedDate };
      }
      return job;
    });

    newObject = { ...data, past_jobs: newPastJobs };

    updateContext(newObject);
  };

  const handleUpdateData = (name, value, index) => {
    let newObject;

    const newPastJobs = data.past_jobs.map((job, i) => {
      if (i === index) {
        return { ...job, [name]: value };
      }
      return job;
    });

    newObject = { ...data, past_jobs: newPastJobs };

    updateContext(newObject);
  };

  const handleAddressUpdate = (name, value, index) => {
    let newObject;

    const newPastJobs = data.past_jobs.map((job, i) => {
      if (i === index) {
        return { ...job, address: { ...job.address, [name]: value } };
      }
      return job;
    });

    newObject = { ...data, past_jobs: newPastJobs };

    updateContext(newObject);
  };

  useEffect(() => {
    validate();
  }, [data]);

  return (
    <div className="div-marital-padding">
      <div className="div-1-inputs-marital">
        <div>
          <div style={{ paddingBottom: "0.4rem" }}>
            <span className="span-state">
              Área da ocupação <span style={{ color: "red" }}>*</span>
            </span>
          </div>
          <div className="padding-bottom-1">
            <Select
              className="input-style-work"
              labelId="select-state"
              id="select-state"
              value={job.occupation_type}
              onChange={(e) =>
                handleUpdateData("occupation_type", e.target.value, index)
              }
            >
              {PrimaryOccupation.map((countrie, index) => (
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
              Nome da empresa que já trabalhou
              <span style={{ color: "red" }}>*</span>
            </span>
          </div>
          <div className="padding-bottom-1">
            <TextField
              id="outlined-basic"
              className="style-select-work"
              placeholder="Escreva o nome da empresa"
              variant="outlined"
              value={job.entity_name}
              onChange={(e) =>
                handleUpdateData("entity_name", e.target.value, index)
              }
            />
          </div>
        </div>
        <div>
          <div style={{ paddingBottom: "0.4rem" }}>
            <span className="span-state">
              Cargo<span style={{ color: "red" }}>*</span>
            </span>
          </div>
          <div className="padding-bottom-1">
            <TextField
              id="outlined-basic"
              className="style-select-work"
              placeholder="Escreva o cargo"
              variant="outlined"
              value={job.occupation_title}
              onChange={(e) =>
                handleUpdateData("occupation_title", e.target.value, index)
              }
            />
          </div>
        </div>
      </div>

      <div className="div-2-inputs-work">
        <div>
          <div style={{ paddingBottom: "0.4rem" }}>
            <span className="span-state">
              Data de inicio<span style={{ color: "red" }}>*</span>
            </span>
          </div>
          <div className="padding-bottom-1">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                format="DD/MM/YYYY"
                className="custom-date-picker-initial"
                value={dayjs(job.start_date)}
                onChange={(value) =>
                  handleDateUpdateData("start_date", value, index)
                }
              />
            </LocalizationProvider>
          </div>
        </div>
        <div>
          <div style={{ paddingBottom: "0.4rem" }}>
            <span className="span-state">
              Data de termino<span style={{ color: "red" }}>*</span>
            </span>
          </div>
          <div className="padding-bottom-1">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                format="DD/MM/YYYY"
                className="custom-date-picker-initial"
                value={dayjs(job.end_date)}
                onChange={(value) =>
                  handleDateUpdateData("end_date", value, index)
                }
              />
            </LocalizationProvider>
          </div>
        </div>
      </div>
      <div className="div-1-inputs-marital">
        <div>
          <div style={{ paddingBottom: "0.4rem" }}>
            <span className="span-state">
              País da empresa<span style={{ color: "red" }}>*</span>
            </span>
          </div>
          <div className="padding-bottom-1">
            <Select
              className="input-style-work"
              labelId="select-state"
              id="select-state"
              value={job.address.country}
              onChange={(e) =>
                handleAddressUpdate("country", e.target.value, index)
              }
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
              Estado da empresa <span style={{ color: "red" }}>*</span>
            </span>
          </div>
          <div className="padding-bottom-1">
            <TextField
              id="outlined-basic"
              className="style-select-work"
              placeholder="Escreva o nome da empresa"
              variant="outlined"
              value={job.address.state}
              onChange={(e) =>
                handleAddressUpdate("state", e.target.value, index)
              }
            />
          </div>
        </div>
        <div>
          <div style={{ paddingBottom: "0.4rem" }}>
            <span className="span-state">
              Cidade da empresa <span style={{ color: "red" }}>*</span>
            </span>
          </div>
          <div className="padding-bottom-1">
            <TextField
              id="outlined-basic"
              className="style-select-work"
              placeholder="Escreva o nome da empresa"
              variant="outlined"
              value={job.address.city}
              onChange={(e) =>
                handleAddressUpdate("city", e.target.value, index)
              }
            />
          </div>
        </div>
      </div>
      <div className="div-2-inputs-work">
        <div>
          <div style={{ paddingBottom: "0.4rem" }}>
            <span className="span-state">
              Endereço da empresa <span style={{ color: "red" }}>*</span>
            </span>
          </div>
          <div className="padding-bottom-1">
            <TextField
              id="outlined-basic"
              className="style-select-work"
              placeholder="Escreva o endereço"
              variant="outlined"
              value={job.address.street}
              onChange={(e) =>
                handleAddressUpdate("street", e.target.value, index)
              }
            />
          </div>
        </div>
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
              value={job.address.zip_code}
              onChange={(e) =>
                handleAddressUpdate("zip_code", e.target.value, index)
              }
            >
              {() => (
                <TextField
                  id="outlined-basic"
                  className="style-select-work"
                  placeholder="00000-000"
                  variant="outlined"
                />
              )}
            </InputMask>
          </div>
        </div>
      </div>
      <div className="div-2-inputs-work">
        <div>
          <div style={{ paddingBottom: "0.4rem" }}>
            <span className="span-state">
              Telefone da empresa<span style={{ color: "red" }}>*</span>
            </span>
          </div>
          <div className="padding-bottom-1">
            <InputMask
              mask="99+ (99) 99999-9999"
              maskChar=""
              value={job.phone_number}
              onChange={(e) =>
                handleUpdateData("phone_number", e.target.value, index)
              }
            >
              {() => (
                <TextField
                  id="outlined-basic"
                  className="style-select-work"
                  placeholder="99+ (00) 00000-0000"
                  variant="outlined"
                />
              )}
            </InputMask>
          </div>
        </div>
        <div>
          <div style={{ paddingBottom: "0.4rem" }}>
            <span className="span-state">
              Email da empresa<span style={{ color: "red" }}>*</span>
            </span>
          </div>
          <div className="padding-bottom-1">
            <TextField
              id="outlined-basic"
              className="style-select-work"
              placeholder="email@exemplo.com"
              variant="outlined"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PastJobsComponent;
