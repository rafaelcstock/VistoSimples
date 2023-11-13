import React, { useEffect, useState } from "react";
import "./USAFamily.css";
import { MenuItem, Select, TextField } from "@mui/material";
import statesBrazilianService from "../../../../services/statesBrazilianService";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import relativeRelationship from "../../../../datas/relative_relationship";
import relativeUSStatus from "../../../../datas/relative_us_status";
import { useData } from "../../../../dataContext/dataContext";
import FamilyFormComponent from "./FamilyFormComponent/FamilyFormComponent";

function USAFamily({ validateStep }) {
  const { data, updateData } = useData();

  const handleChangeSelect = (event) => {
    const { value } = event.target;
    const boolValue = value === "Sim" ? true : false;

    if (boolValue) {
      updateData({ ...data, hasParentInUs: boolValue });
    } else {
      updateData({
        ...data,
        hasParentInUs: boolValue,
        immediate_relatives: [
          {
            ...data.immediate_relatives[0],
            name: {
              surname: "",
              given_name: "",
              full_name: null,
            },
          },
        ],
      });
    }
  };

  const handleRelationshipChange = (event, index) => {
    const { value } = event.target;

    const updatedRelatives = data.immediate_relatives.map((relative, i) => {
      if (i === index) {
        return {
          ...relative,
          relationship: value,
        };
      }
      return relative;
    });

    updateData({
      ...data,
      immediate_relatives: updatedRelatives,
    });
  };

  const handleStatusChange = (event, index) => {
    const { value } = event.target;

    const updatedRelatives = data.immediate_relatives.map((relative, i) => {
      if (i === index) {
        return {
          ...relative,
          us_status: value,
        };
      }

      return relative;
    });

    updateData({
      ...data,
      immediate_relatives: updatedRelatives,
    });
  };

  const handleAddFamilyMember = (event) => {
    const { value } = event.target;
    const boolValue = value === "Sim" ? true : false;

    if (boolValue) {
      updateData({
        ...data,
        immediate_relatives: [
          ...data.immediate_relatives,
          {
            name: {
              surname: "",
              given_name: "",
              full_name: "",
            },
            locating_in_us: true,
            relationship: "",
            us_status: "",
          },
        ],
      });
    } else {
      const lastIndex = data.immediate_relatives.length - 1;
      if (lastIndex > 0) {
        const updatedRelatives = data.immediate_relatives.filter(
          (_, index) => index !== lastIndex
        );
        updateData({
          ...data,
          immediate_relatives: updatedRelatives,
        });
      }
    }
  };

  const handleNameChange = (event, index) => {
    const { value, name } = event.target;

    const updatedRelatives = data.immediate_relatives.map((relative, i) => {
      if (i === index) {
        return { ...relative, name: { ...relative.name, [name]: value } };
      }

      return relative;
    });

    updateData({
      ...data,
      immediate_relatives: updatedRelatives,
    });
  };

  useEffect(() => {
    validateStep();
  }, [data]);

  useEffect(() => {
    if (data) {
      if (data.immediate_relatives.length === 0) {
      }
    }
  }, []);

  return (
    <div className="div-margin">
      <div className="padding-bottom">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <span className="title-header">Familiar nos Estados Unidos</span>
          </div>
        </div>
        <hr className="hr-color" />
      </div>
      <div className="div-usa-padding">
        <div className="padding-usa">
          <span className="title-header-2">
            Você tem algum familiar direto nos Estados
            Unidos?(Esposo(a);noivo(a);filho(a);irmão(a);)
            <span style={{ color: "red" }}>*</span>
          </span>
        </div>
        <div className="padding-usa">
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="Sim"
            name="radio-buttons-group"
            className="subTitle-div-2"
            row
            value={data.hasParentInUs ? "Sim" : "Não"}
            onChange={handleChangeSelect}
          >
            <FormControlLabel value="Sim" control={<Radio />} label="Sim" />
            <FormControlLabel value="Não" control={<Radio />} label="Não" />
          </RadioGroup>
        </div>
      </div>
      {data.hasParentInUs &&
        data.immediate_relatives.map((relative, index) => (
          <FamilyFormComponent
            key={index}
            index={index}
            data={relative}
            length={data.immediate_relatives.length -1}
            handleNameChange={handleNameChange}
            handleRelationshipChange={handleRelationshipChange}
            handleStatusChange={handleStatusChange}
            handleAddFamilyMember={handleAddFamilyMember}
          />
        ))}
    </div>
  );
}

export default USAFamily;
