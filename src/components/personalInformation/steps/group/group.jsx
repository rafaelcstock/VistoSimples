import React, { useEffect, useState } from "react";
import "./group.css";
import { MenuItem, Select, TextField } from "@mui/material";
import statesBrazilianService from "../../../../services/statesBrazilianService";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { useData } from "../../../../dataContext/dataContext";

function Group({ validateStep }) {
  const { data, updateData } = useData();

  const handleChangeSelect = (event) => {
    const { value } = event.target;
    const boolValue = value === "Sim" ? true : false;

    if (!boolValue) {
      updateData({ ...data, clan: null });
      updateData({ ...data, hasClan: boolValue });
    } else {
      updateData({ ...data, hasClan: boolValue });
    }
  };

  const handleChangeClanName = (event) => {
    const { value } = event.target;
    updateData({ ...data, clan: value });
  };

  useEffect(() => {
    validateStep();
  }, [data]);

  return (
    <div className="div-margin">
      <div className="padding-bottom">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <span className="title-header">Grupo, clã ou tribo?</span>
          </div>
        </div>
        <hr className="hr-color" />
      </div>
      <div className="div-group-padding">
        <div className="div-flex-inputs-group">
          <div>
            <div className="padding-bottom-1">
              <span className="title-header-2">
                Você pertence a algum grupo, clã ou tribo
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
                value={data.hasClan ? "Sim" : "Não"}
                onChange={handleChangeSelect}
              >
                <FormControlLabel value="Sim" control={<Radio />} label="Sim" />
                <FormControlLabel value="Não" control={<Radio />} label="Não" />
              </RadioGroup>
            </div>
          </div>
        </div>
        {data.hasClan ? (
          <div className="div-flex-inputs-group">
            <div>
              <div style={{ paddingBottom: "0.4rem" }}>
                <span className="span-state">
                  Qual grupo, clã ou tribo você pertence?
                  <span style={{ color: "red" }}>*</span>
                </span>
              </div>
              <div className="padding-bottom-1">
                <TextField
                  id="outlined-basic"
                  className="input-style"
                  placeholder="Digite aqui o seu grupo, clã ou tribo"
                  variant="outlined"
                  value={data.clan}
                  onChange={handleChangeClanName}
                />
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Group;
