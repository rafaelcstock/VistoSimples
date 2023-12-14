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
  const [numFamilyMembers, setNumFamilyMembers] = useState(1);

  const handleChangeSelect = (event) => {
    const { value } = event.target;
    const boolValue = value === "Sim" ? true : false;

    if (boolValue) {
      updateData({
        ...data,
        hasParentInUs: boolValue,
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
      updateData({
        ...data,
        hasParentInUs: boolValue,
        immediate_relatives: [],
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

  const handleAddFamilyMember = () => {
    const boolValue = data.hasParentInUs;

    if (boolValue) {
      setNumFamilyMembers((prevNum) => prevNum + 1);

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
    }
  };

  const handleRemoveFamilyMember = (index) => {
    const updatedRelatives = data.immediate_relatives.filter(
      (_, i) => i !== index
    );

    setNumFamilyMembers((prevNum) => prevNum - 1);  // Atualiza o número de membros

    updateData({
      ...data,
      immediate_relatives: updatedRelatives,
    });
  };

  const handleNameChange = (event, index) => {
    const { value, name } = event.target;
    if (/^[a-zA-Z\s]+$/.test(value) || value === "") {
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
    }
  };

  useEffect(() => {
    validateStep();
  }, [data]);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTo(0, 0);
  }, []);

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
            Você tem algum familiar direto nos Estados Unidos? (Esposo(a);noivo(a);filho(a);irmão(a);)
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
        Array.from({ length: numFamilyMembers }).map((_, index) => (
          <FamilyFormComponent
            key={index}
            index={index}
            data={data.immediate_relatives[index] || {}}
            length={data.immediate_relatives.length - 1}
            handleNameChange={(event) => handleNameChange(event, index)}
            handleRelationshipChange={(event) =>
              handleRelationshipChange(event, index)
            }
            handleStatusChange={(event) => handleStatusChange(event, index)}
            handleRemoveFamilyMember={handleRemoveFamilyMember}
          />
        ))}
      {data.hasParentInUs && (
        <div className="div-btn">
          <button
            className="font-button-img button-style-imgFamily"
            onClick={handleAddFamilyMember}
          >
            + Adicionar Familiar
          </button>
        </div>
      )}
    </div>
  );
}

export default USAFamily;