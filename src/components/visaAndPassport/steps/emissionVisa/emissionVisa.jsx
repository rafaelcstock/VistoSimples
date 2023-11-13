import React, { useEffect, useState } from "react"
import './emissionVisa.css'
import { MenuItem, Select, TextField } from "@mui/material";
import statesBrazilianService from "../../../../services/statesBrazilianService"
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import InputMask from 'react-input-mask';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import cityToConsulateId from '../../../../datas/city_to_consulate_id'

function EmissionVisa() {  
    const [selectedState, setSelectedState] = useState("Sim");
    const [selectedCity, setSelectedCity] = useState("");

    const handleChangeSelect = (event) => {
        setSelectedState(event.target.value);
    };

    const handleChangeSelectCity = (event) => {
        setSelectedCity(event.target.value);
    };

    useEffect(() => {
       
    }, []);

    return (
        <div className="div-margin">
            <div className="padding-bottom">
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                        <span className="title-header">Emissão do visto</span>
                    </div>
                </div>
                <hr className="hr-color" />
            </div>
            <div className="div-marital-padding">
                <div className="padding-bottom-title-input">
                    <span className="title-header-2">Já teve visto americado emitido anteriormente?<span style={{ color: 'red' }}>*</span></span>
                </div>
                <div className="padding-radio-marital">
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="Sim"
                        name="radio-buttons-group"
                        className="subTitle-div-2"
                        row
                        value={selectedState}
                        onChange={handleChangeSelect}
                    >
                        <FormControlLabel value="Sim" control={<Radio />} label="Sim" />
                        <FormControlLabel value="Não" control={<Radio />} label="Não" />
                    </RadioGroup>
                </div>
            </div>
            {selectedState === "Sim" ? (
                <div>
                    <div className="div-marital-padding">
                        <div className="div-1-inputs-marital">
                            <div>
                                <div style={{ paddingBottom: '0.4rem' }}>
                                    <span className="span-state">Digite o número do visto<span style={{ color: 'red' }}>*</span></span>
                                </div>
                                <div className="padding-bottom-1">
                                    <TextField id="outlined-basic" className="input-style-work" placeholder="Escreva o número do visto" variant="outlined" />
                                </div>
                            </div>
                            <div>
                                <div style={{ paddingBottom: '0.4rem' }}>
                                    <span className="span-state">Data de emissão do visto<span style={{ color: 'red' }}>*</span></span>
                                </div>
                                <div className="padding-bottom-1">
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker format="DD/MM/YYYY" className="custom-date-picker-initial" />
                                    </LocalizationProvider>
                                </div>
                            </div>
                            <div>
                                <div style={{ paddingBottom: '0.4rem' }}>
                                    <span className="span-state">Data de expiração do visto<span style={{ color: 'red' }}>*</span></span>
                                </div>
                                <div className="padding-bottom-1">
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker format="DD/MM/YYYY" className="custom-date-picker-initial" />
                                    </LocalizationProvider>
                                </div>
                            </div>
                        </div>
                        <div className="div-2-inputs-work">
                            <div>
                                <div style={{ paddingBottom: '0.4rem' }}>
                                    <span className="span-state">Cidade que foi emitido<span style={{ color: 'red' }}>*</span></span>
                                </div>
                                <div className="padding-bottom-1">
                                    <Select
                                        className="input-style-work"
                                        labelId="select-state"
                                        id="select-state"
                                        value={selectedCity}
                                        onChange={handleChangeSelectCity}
                                    >
                                        {cityToConsulateId.map((state) => (
                                            <MenuItem key={state.key} value={state.key}>
                                                {state.value}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="div-marital-padding">
                        <div className="padding-bottom-title-input">
                            <span className="title-header-2">Você estar aplicando para o mesmo tipo do seu último visto?<span style={{ color: 'red' }}>*</span></span>
                        </div>
                        <div className="padding-radio-marital">
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="Sim"
                                name="radio-buttons-group"
                                className="subTitle-div-2"
                                row
                            >
                                <FormControlLabel value="Sim" control={<Radio />} label="Sim" />
                                <FormControlLabel value="Não" control={<Radio />} label="Não" />
                            </RadioGroup>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    )
}

export default EmissionVisa
