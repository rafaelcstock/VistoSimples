import React, { useEffect, useState } from "react"
import './maritalStatus.css'
import { MenuItem, Select, TextField } from "@mui/material";
import statesBrazilianService from "../../../../services/statesBrazilianService"
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Countries from "../../../../datas/countries";

function Divorced() {
    const [nationality, setNationality] = useState("");
    const [countryBirth, setCountryBirth] = useState("")
    const [countrySeparation, setCountrySeparation] = useState("")
    const [typeSeparation, setTypeSeparation] = useState("C");

    const handleChangeSelectNationality = (event) => {
        setNationality(event.target.value);
    };
    const handleChangeSelectCountryBirth = (event) => {
        setCountryBirth(event.target.value);
    };
    const handleChangeSelectCountrySeparation = (event) => {
        setCountrySeparation(event.target.value);
    };
    const handleChangeTypeSeparation = (event) => {
        setTypeSeparation(event.target.value);
    }; 

    useEffect(() => {
        
    }, []);

    return (
        <div className="div-margin">
            <div className="padding-bottom">
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                        <span className="title-header">Informações Pessoais</span>
                    </div>
                    <div>
                        <span className="title-header-1">Ex-companheiro(a)</span>
                    </div>
                </div>
                <hr className="hr-color" />
            </div>
            <div className="div-marital-padding">
                <div className="padding-bottom-title-input">
                    <span className="title-header-2">Dados do ex-companheiro(a)</span>
                </div>
                <div className="div-1-inputs-marital">
                    <div>
                        <div style={{ paddingBottom: '0.4rem' }}>
                            <span className="span-state">Nome do ex-companheiro(a)<span style={{ color: 'red' }}>*</span></span>
                        </div>
                        <div className="padding-bottom-1">
                            <TextField id="outlined-basic" className="input-style-marital" placeholder="Escreva o primeiro nome" variant="outlined" />
                        </div>
                    </div>
                    <div>
                        <div style={{ paddingBottom: '0.4rem' }}>
                            <span className="span-state">Sobrenome do ex-companheiro(a)<span style={{ color: 'red' }}>*</span></span>
                        </div>
                        <div className="padding-bottom-1">
                            <TextField id="outlined-basic" className="input-style-marital" placeholder="Escreva o sobrenome" variant="outlined" />
                        </div>
                    </div>
                    <div>
                        <div style={{ paddingBottom: '0.4rem' }}>
                            <span className="span-state">Data de nascimento do ex-companheiro(a)<span style={{ color: 'red' }}>*</span></span>
                        </div>
                        <div className="padding-bottom-1">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker format="DD/MM/YYYY" className="custom-date-picker-initial" />
                            </LocalizationProvider>
                        </div>
                    </div>
                </div>
            </div>
            <div className="div-marital-padding">
                <div className="padding-bottom-title-input">
                    <span className="title-header-2">Dados do ex-companheiro(a)</span>
                </div>
                <div className="div-2-inputs-marital">
                    <div>
                        <div style={{ paddingBottom: '0.4rem' }}>
                            <span className="span-state">Nacionalidade do ex-companheiro(a)<span style={{ color: 'red' }}>*</span></span>
                        </div>
                        <div className="padding-bottom-1">
                            <Select
                                className="style-select-marital"
                                labelId="select-state"
                                id="select-state"
                                value={nationality}
                                onChange={handleChangeSelectNationality}
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
                        <div style={{ paddingBottom: '0.4rem' }}>
                            <span className="span-state">País de nascimento do ex-companheiro(a)<span style={{ color: 'red' }}>*</span></span>
                        </div>
                        <div className="padding-bottom-1">
                            <Select
                                className="style-select-marital"
                                labelId="select-state"
                                id="select-state"
                                value={countryBirth}
                                onChange={handleChangeSelectCountryBirth}
                            >
                                {Countries.map((state) => (
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
                    <span className="title-header-2">Casamento e separação</span>
                </div>
                <div className="div-2-inputs-marital">
                    <div>
                        <div style={{ paddingBottom: '0.4rem' }}>
                            <span className="span-state">Data do casamento<span style={{ color: 'red' }}>*</span></span>
                        </div>
                        <div className="padding-bottom-1">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker format="DD/MM/YYYY" className="custom-date-picker-initial" />
                            </LocalizationProvider>
                        </div>
                    </div>
                    <div>
                        <div style={{ paddingBottom: '0.4rem' }}>
                            <span className="span-state">Data da separação/divórcio<span style={{ color: 'red' }}>*</span></span>
                        </div>
                        <div className="padding-bottom-1">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker format="DD/MM/YYYY" className="custom-date-picker-initial" />
                            </LocalizationProvider>
                        </div>
                    </div>
                </div>
                <div className="padding-radio-marital">
                    <div style={{ paddingBottom: '0.4rem' }}>
                        <span className="span-state">Tipo da separação/divórcio<span style={{ color: 'red' }}>*</span></span>
                    </div>
                    <div >
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="C"
                            name="radio-buttons-group"
                            row
                            value={typeSeparation}
                            onChange={handleChangeTypeSeparation}
                        >
                            <FormControlLabel value="C" control={<Radio />} label="Consesual" />
                            <FormControlLabel value="L" control={<Radio />} label="Litigioso" />
                            <FormControlLabel value="J" control={<Radio />} label="Judicial" />
                            <FormControlLabel value="E" control={<Radio />} label="Extra-judicial" />
                        </RadioGroup>
                    </div>
                </div>
                <div className="padding-radio-marital">
                    <div style={{ paddingBottom: '0.4rem' }}>
                        <span className="span-state">País da separação/divórcio<span style={{ color: 'red' }}>*</span></span>
                    </div>
                    <div className="padding-bottom-1">
                        <Select
                            className="style-input-state"
                            labelId="select-state"
                            id="select-state"
                            value={countrySeparation}
                            onChange={handleChangeSelectCountrySeparation}
                        >
                            {Countries.map((state) => (
                                <MenuItem key={state.key} value={state.key}>
                                    {state.value}
                                </MenuItem>
                            ))}
                        </Select>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Divorced
