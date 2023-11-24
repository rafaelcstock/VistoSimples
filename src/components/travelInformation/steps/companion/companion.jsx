import React, { useEffect, useState } from "react";
import "./companion.css";
import { MenuItem, Select, TextField } from "@mui/material";
import statesBrazilianService from "../../../../services/statesBrazilianService";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import escortRelationship from "../../../../datas/escort_relationship";
import { useData } from "../../../../dataContext/dataContext";

function Companion({ validateStep }) {
  const { data, updateData } = useData();

  const addScort = () => {
    updateData({
      ...data,
      group: null,
      escorts: [
        ...data.escorts,
        {
          name: {
            surname: "",
            given_name: "",
            full_name: "",
          },
          relationship: "C",
        },
      ],
    });
  };

  const removeEscort = (index) => {
    updateData({
      ...data,
      escorts: data.escorts.filter((_, i) => i !== index),
    });
  };

  const handleChangeSelect = (event) => {
    const selectedValue = event.target.value;

    const intValue = Number(selectedValue);

    if (intValue == 1) {
      updateData({
        ...data,
        companionSelected: intValue,
        group: null,
        escorts: null,
      });
    }
    if (intValue == 2) {
      updateData({
        ...data,
        companionSelected: intValue,
        group: null,
        escorts: [
          {
            name: {
              surname: "",
              given_name: "",
              full_name: "",
            },
            relationship: "C",
          },
        ],
      });
    }
    if (intValue == 3) {
      updateData({
        ...data,
        companionSelected: intValue,
        group: "",
        escorts: null,
      });
    }
  };

  const handleGroupNameSelect = (event) => {
    const { value } = event.target;

    updateData({ ...data, group: value });
  };

  const handleNameScortChange = (event, index) => {
    const { value, name } = event.target;
  
    // Verifica se o valor contém apenas letras
    if (/^[A-Za-z\s]+$/.test(value) || value === "") {
      const updatedScorts = data.escorts.map((scort, i) => {
        if (i === index) {
          return { ...scort, name: { ...scort.name, [name]: value } };
        }
        return scort;
      });
  
      updateData({
        ...data,
        escorts: updatedScorts,
      });
    }
  };

  const handleRelationshipScortChange = (event, index) => {
    const { value } = event.target;

    const updatedScorts = data.escorts.map((scort, i) => {
      if (i === index) {
        return { ...scort, relationship: value };
      }
      return scort;
    });

    updateData({
      ...data,
      escorts: updatedScorts,
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
            <span className="title-header">Viagem</span>
          </div>
          <div>
            <span className="title-header-1">Acompanhantes</span>
          </div>
        </div>
        <hr className="hr-color" />
      </div>
      <div className="div-marital-padding">
        <div className="padding-bottom-title-input">
          <span className="title-header-2">
            Você está viajanddo com mais alguém?
            <span style={{ color: "red" }}>*</span>
          </span>
        </div>
        <div className="padding-radio-marital">
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="Não, estou viajando sozinho"
            name="radio-buttons-group"
            className="subTitle-div-2"
            value={data.companionSelected}
            onChange={handleChangeSelect}
          >
            <FormControlLabel
              value={1}
              control={<Radio />}
              label="Não, estou viajando sozinho"
            />
            <FormControlLabel
              value={2}
              control={<Radio />}
              label="Sim, estou viajando com outra(s) pessoa(s)"
            />
            <FormControlLabel
              value={3}
              control={<Radio />}
              label="Sim, estou viajando com um grupo/empresa"
            />
          </RadioGroup>
        </div>
      </div>
      {data.companionSelected === 2 ? (
        <div className="div-marital-padding">
          {data.escorts.map((escort, index) => (
            <div key={index}>
              <div className="div-2-inputs-work">
                <div>
                  <div style={{ paddingBottom: "0.4rem" }}>
                    <span className="span-state">
                      Nome da pessoa que está viajando junto com você
                      <span style={{ color: "red" }}>*</span>
                    </span>
                  </div>
                  <div className="padding-bottom-1">
                    <TextField
                      id="outlined-basic"
                      className="style-select-work"
                      placeholder="Escreva o primeiro nome"
                      variant="outlined"
                      name="given_name"
                      value={escort.name.given_name}
                      onChange={(e) => handleNameScortChange(e, index)}
                    />
                  </div>
                </div>
                <div>
                  <div style={{ paddingBottom: "0.4rem" }}>
                    <span className="span-state">
                      Digite o sobrenome da pessoa que está viajando com você
                      <span style={{ color: "red" }}>*</span>
                    </span>
                  </div>
                  <div className="padding-bottom-1">
                    <TextField
                      id="outlined-basic"
                      className="style-select-work"
                      placeholder="Escreva o sobrenome"
                      variant="outlined"
                      name="surname"
                      value={escort.name.surname}
                      onChange={(e) => handleNameScortChange(e, index)}
                    />
                  </div>
                </div>
              </div>
              <div
                className="input-companion"
                style={{ paddingBottom: "3rem" }}
              >
                <div>
                  <div style={{ paddingBottom: "0.4rem" }}>
                    <span className="span-state">
                      Qual a sua relação com esta pessoa?
                      <span style={{ color: "red" }}>*</span>
                    </span>
                  </div>
                  <div className="padding-bottom-1">
                    <Select
                      className="style-select-work"
                      labelId="select-state"
                      id="select-state"
                      value={escort.relationship}
                      onChange={(e) => handleRelationshipScortChange(e, index)}
                    >
                      {escortRelationship.map((state) => (
                        <MenuItem key={state.key} value={state.key}>
                          {state.value}
                        </MenuItem>
                      ))}
                    </Select>
                  </div>
                </div>
                <div style={{ display: "flex", justifyContent: "start" }}>
                  <div>
                    <button
                      type="button"
                      className="button-style-companion-remove"
                      onClick={() => removeEscort(index)}
                      style={{
                        display: data.escorts.length > 1 ? "block" : "none",
                      }}
                    >
                      <span className="font-text-buttom-remove">Remover</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div
            style={{
              display: "flex",
              justifyContent: "start",
              paddingLeft: "3rem",
            }}
          >
            <div>
              <button
                type="button"
                className="button-style-companion"
                onClick={addScort}
              >
                <span className="font-text-buttom">
                  <AddIcon />
                  Adicionar outro
                </span>
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {data.companionSelected === 3 ? (
        <div>
          <div className="padding-bottom">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <span className="title-header">Grupo/Empresa</span>
              </div>
            </div>
            <hr className="hr-color" />
          </div>
          <div className="div-marital-padding">
            <div className="div-2-inputs-work">
              <div>
                <div style={{ paddingBottom: "0.4rem" }}>
                  <span className="span-state">
                    Qual o nome do grupo/empresa?
                    <span style={{ color: "red" }}>*</span>
                  </span>
                </div>
                <div className="padding-bottom-1">
                  <TextField
                    id="outlined-basic"
                    className="style-select-work"
                    placeholder="Escreva o nome do grupo/empresa"
                    variant="outlined"
                    value={data.group}
                    onChange={handleGroupNameSelect}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Companion;
