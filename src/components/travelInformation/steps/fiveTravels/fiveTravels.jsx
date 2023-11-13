import React, { useEffect, useState } from "react"
import './fiveTravels.css'
import { MenuItem, Select, TextField } from "@mui/material";
import statesBrazilianService from "../../../../services/statesBrazilianService";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import InputMask from 'react-input-mask';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function FiveTravels() {
    const getStates = async () => {
        const response = await statesBrazilianService.getStates();
        setStates(response);
    }

    const [states, setStates] = useState([]);
    const [selectedState, setSelectedState] = useState("Sim");
    const [radioRequester, setRadioRequester] = useState("");

    const handleChangeSelect = (event) => {
        setSelectedState(event.target.value);
    };

    const handleChangeRequester = (event) => {
        setRadioRequester(event.target.value);
    };

    useEffect(() => {
        getStates();
    }, []);

    return (
        <div className="div-margin">
            <div className="padding-bottom">
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                        <span className="title-header">Viagens</span>
                    </div>
                    <div>
                        <span className="title-header-1">Últimas 5 viagens</span>
                    </div>
                </div>
                <hr className="hr-color" />
            </div>
            <div className="div-marital-padding">
                <div className="padding-bottom-title-input">
                    <span className="title-header-2">Já esteve nos Estados Unidos?<span style={{ color: 'red' }}>*</span></span>
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
                        <div className="padding-bottom-title-input">
                            <span className="title-header-2">Últimas 5 viagens</span>
                        </div>
                        <div className="div-2-inputs-work">
                            <div>
                                <div style={{ paddingBottom: '0.4rem' }}>
                                    <span className="span-state">Data de chegada - Viagem 1<span style={{ color: 'red' }}>*</span></span>
                                </div>
                                <div className="padding-bottom-1">
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker format="DD/MM/YYYY" className="custom-date-picker-initial" />
                                    </LocalizationProvider>
                                </div>
                            </div>
                            <div>
                                <div style={{ paddingBottom: '0.4rem' }}>
                                    <span className="span-state">Tempo estimado de estadia - Viagem 1<span style={{ color: 'red' }}>*</span></span>
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
                                    <span className="span-state">Data de chegada - Viagem 2<span style={{ color: 'red' }}>*</span></span>
                                </div>
                                <div className="padding-bottom-1">
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker format="DD/MM/YYYY" className="custom-date-picker-initial" />
                                    </LocalizationProvider>
                                </div>
                            </div>
                            <div>
                                <div style={{ paddingBottom: '0.4rem' }}>
                                    <span className="span-state">Tempo estimado de estadia - Viagem 2<span style={{ color: 'red' }}>*</span></span>
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
                                    <span className="span-state">Data de chegada - Viagem 3<span style={{ color: 'red' }}>*</span></span>
                                </div>
                                <div className="padding-bottom-1">
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker format="DD/MM/YYYY" className="custom-date-picker-initial" />
                                    </LocalizationProvider>
                                </div>
                            </div>
                            <div>
                                <div style={{ paddingBottom: '0.4rem' }}>
                                    <span className="span-state">Tempo estimado de estadia - Viagem 3<span style={{ color: 'red' }}>*</span></span>
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
                                    <span className="span-state">Data de chegada - Viagem 4<span style={{ color: 'red' }}>*</span></span>
                                </div>
                                <div className="padding-bottom-1">
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker format="DD/MM/YYYY" className="custom-date-picker-initial" />
                                    </LocalizationProvider>
                                </div>
                            </div>
                            <div>
                                <div style={{ paddingBottom: '0.4rem' }}>
                                    <span className="span-state">Tempo estimado de estadia - Viagem 4<span style={{ color: 'red' }}>*</span></span>
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
                                    <span className="span-state">Data de chegada - Viagem 5<span style={{ color: 'red' }}>*</span></span>
                                </div>
                                <div className="padding-bottom-1">
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker format="DD/MM/YYYY" className="custom-date-picker-initial" />
                                    </LocalizationProvider>
                                </div>
                            </div>
                            <div>
                                <div style={{ paddingBottom: '0.4rem' }}>
                                    <span className="span-state">Tempo estimado de estadia - Viagem 5<span style={{ color: 'red' }}>*</span></span>
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
                        <div style={{ paddingBottom: '1rem', paddingLeft: '1rem' }}>
                            <span className="footer-travel"><b>Caso você tenha menos que 5 viagens, preencha apenas as viagens que você fez, deixe as outras em branco!</b></span>
                        </div>
                        <div style={{ paddingBottom: '1rem', paddingLeft: '1rem' }}>
                            <span className="footer-travel"><b>Obs. 1:</b> A data de chegada pode ser uma data estimada da sua viagenm,caso não lmebre a data exata em que foi.</span>
                        </div>
                        <div style={{ paddingBottom: '1rem', paddingLeft: '1rem' }}>
                            <span className="footer-travel"><b>Obs. 2:</b> O tempo de estadia deve ser em dias</span>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    )
}

export default FiveTravels
