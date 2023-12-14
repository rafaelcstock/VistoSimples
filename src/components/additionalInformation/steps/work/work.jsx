import React, { useEffect } from "react";
import "./work.css";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { useData } from "../../../../dataContext/dataContext";
import PastJobsComponent from "./PastJobsComponent/pasJobsComponent";

function Work({ validateStep }) {
  const { data, updateData } = useData();

  const handleValidate = (name, newDate, index) => {
    validateStep();
  };

  const handleUpdateDataContext = (newData) => {
    updateData(newData);
  };

  const handleChangeSelect = (event) => {
    const { value } = event.target;
    const boolValue = value === "Sim" ? true : false;

    if (boolValue) {
      updateData({
        ...data,
        past_jobs: [
          {
            occupation_type: null,
            specify_occupation: null,
            entity_name: "",
            address: {
              street: "",
              complement: null,
              city: "",
              state: "",
              state_acronym: null,
              zip_code: "",
              country: "",
            },
            phone_number: "",
            start_date: "",
            end_date: "",
            monthly_income: null,
            description: "",
            occupation_title: null,
            supervisor_name: null,
          },
        ],
      });
    } else {
      updateData({ ...data, past_jobs: [] });
    }
  };

  useEffect(() => {
    validateStep();
  }, [data]);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTo(0, 0);
  }, []);

  return (
    <div className="div-margin">
      <div className="padding-bottom">
        <div className="padding-bottomWork" style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <span className="title-header">Informações adicionais</span>
          </div>
          <div>
            <span className="title-header-1">Trabalho</span>
          </div>
        </div>
        <hr className="hr-color" />
      </div>
      <div className="div-marital-padding">
        <div className="padding-bottom-title-input">
          <span className="title-header-2">
            Já trabalhou em algum outro lugar?
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
            value={data.past_jobs.length > 0 ? "Sim" : "Não"}
            onChange={handleChangeSelect}
          >
            <FormControlLabel value="Sim" control={<Radio />} label="Sim" />
            <FormControlLabel value="Não" control={<Radio />} label="Não" />
          </RadioGroup>
        </div>
      </div>

      {data.past_jobs.length > 0 &&
        data.past_jobs.map((job, index) => {
          return (
            <PastJobsComponent
              job={job}
              index={index}
              validate={handleValidate}
              updateContext={handleUpdateDataContext}
            />
          );
        })}
    </div>
  );
}

export default Work;
