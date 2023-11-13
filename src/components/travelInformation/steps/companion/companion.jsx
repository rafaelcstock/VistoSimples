import React, { useEffect, useState } from "react"
import './companion.css'
import { MenuItem, Select, TextField } from "@mui/material";
import statesBrazilianService from "../../../../services/statesBrazilianService";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import InputMask from 'react-input-mask';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import escortRelationship from '../../../../datas/escort_relationship'

function Companion() {
    const getStates = async () => {
        const response = await statesBrazilianService.getStates();
        setStates(response);
    }

    const [states, setStates] = useState([]);
    const [selectedState, setSelectedState] = useState("Sim, estou viajando com outra(s) pessoa(s)");

    const handleChangeSelect = (event) => {
        setSelectedState(event.target.value);
    };

    const handleChangeRequester = (event) => {
        setRadioRequester(event.target.value);
    };

    const [companions, setCompanions] = useState([{ firstName: '', lastName: '', relationship: '' }]);

    const handleChange = (index, field, value) => {
        const updatedCompanions = [...companions];
        updatedCompanions[index][field] = value;
        setCompanions(updatedCompanions);
    };

    const addCompanion = () => {
        setCompanions([...companions, { firstName: '', lastName: '', relationship: '' }]);
    };

    const removeCompanion = (index) => {        
        const updatedCompanions = companions.filter((_, i) => i !== index);
        setCompanions(updatedCompanions);
    };


    useEffect(() => {
        getStates();
    }, []);

    return (
        <div className="div-margin">
            <div className="padding-bottom">
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
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
                    <span className="title-header-2">Você está viajanddo com mais alguém?<span style={{ color: 'red' }}>*</span></span>
                </div>
                <div className="padding-radio-marital">
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="Não, estou viajando sozinho"
                        name="radio-buttons-group"
                        className="subTitle-div-2"
                        value={selectedState}
                        onChange={handleChangeSelect}
                    >
                        <FormControlLabel value="Não, estou viajando sozinho" control={<Radio />} label="Não, estou viajando sozinho" />
                        <FormControlLabel value="Sim, estou viajando com outra(s) pessoa(s)" control={<Radio />} label="Sim, estou viajando com outra(s) pessoa(s)" />
                        <FormControlLabel value="Sim, estou viajando com um grupo/empresa" control={<Radio />} label="Sim, estou viajando com um grupo/empresa" />
                    </RadioGroup>
                </div>
            </div>
            {selectedState === "Sim, estou viajando com outra(s) pessoa(s)" ? (
                <div className="div-marital-padding">
                    {companions.map((companion, index) => (
                        <div key={index} >
                            <div className="div-2-inputs-work">
                                <div>
                                    <div style={{ paddingBottom: '0.4rem' }}>
                                        <span className="span-state">
                                            Nome da pessoa que está viajando junto com você<span style={{ color: 'red' }}>*</span>
                                        </span>
                                    </div>
                                    <div className="padding-bottom-1">
                                        <TextField
                                            id="outlined-basic"
                                            className="style-select-work"
                                            placeholder="Escreva o primeiro nome"
                                            variant="outlined"
                                            value={companion.firstName}
                                            onChange={(e) => handleChange(index, 'firstName', e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div style={{ paddingBottom: '0.4rem' }}>
                                        <span className="span-state">
                                            Digite o sobrenome da pessoa que está viajando com você<span style={{ color: 'red' }}>*</span>
                                        </span>
                                    </div>
                                    <div className="padding-bottom-1">
                                        <TextField
                                            id="outlined-basic"
                                            className="style-select-work"
                                            placeholder="Escreva o sobrenome"
                                            variant="outlined"
                                            value={companion.lastName}
                                            onChange={(e) => handleChange(index, 'lastName', e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="input-companion" style={{ paddingBottom: '3rem' }}>
                                <div>
                                    <div style={{ paddingBottom: '0.4rem' }}>
                                        <span className="span-state">
                                            Qual a sua relação com esta pessoa?<span style={{ color: 'red' }}>*</span>
                                        </span>
                                    </div>
                                    <div className="padding-bottom-1">
                                        <Select
                                            className="style-select-work"
                                            labelId="select-state"
                                            id="select-state"
                                            value={companion.relationship}
                                            onChange={(e) => handleChange(index, 'relationship', e.target.value)}
                                        >
                                            {escortRelationship.map((state) => (
                                                <MenuItem key={state.key} value={state.key}>
                                                    {state.value}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'start' }}>
                                    <div>
                                        <button
                                            type="button"
                                            className="button-style-companion-remove"
                                            onClick={() => removeCompanion(index)}
                                            style={{ display: companions.length > 1 ? 'block' : 'none' }}
                                        >
                                            <span className="font-text-buttom-remove">
                                                Remover
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div style={{ display: 'flex', justifyContent: 'start', paddingLeft: '3rem' }}>
                        <div>
                            <button
                                type="button"
                                className="button-style-companion"
                                onClick={addCompanion}
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

            {selectedState === "Sim, estou viajando com um grupo/empresa" ? (
                <div>
                    <div className="padding-bottom">
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div>
                                <span className="title-header">Grupo/Empresa</span>
                            </div>
                        </div>
                        <hr className="hr-color" />
                    </div>
                    <div className="div-marital-padding">
                        <div className="div-2-inputs-work">
                            <div>
                                <div style={{ paddingBottom: '0.4rem' }}>
                                    <span className="span-state">Qual o nome do grupo/empresa?<span style={{ color: 'red' }}>*</span></span>
                                </div>
                                <div className="padding-bottom-1">
                                    <TextField id="outlined-basic" className="style-select-work" placeholder="Escreva o nome do grupo/empresa" variant="outlined" />
                                </div>
                            </div>
                            {/* <div>
                                <div style={{ paddingBottom: '0.4rem' }}>
                                    <span className="span-state">Cargo<span style={{ color: 'red' }}>*</span></span>
                                </div>
                                <div className="padding-bottom-1">
                                    <TextField id="outlined-basic" className="style-select-work" placeholder="Escreva o seu sobrenome" variant="outlined" />
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    )
}

export default Companion
