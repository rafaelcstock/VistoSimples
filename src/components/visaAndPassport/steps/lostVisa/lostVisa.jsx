import React, { useEffect, useState } from "react"
import './lostVisa.css'
import { MenuItem, Select, TextField } from "@mui/material";
import statesBrazilianService from "../../../../services/statesBrazilianService"
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import InputMask from 'react-input-mask';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function LostVisa() {
    const getStates = async () => {
        const response = await statesBrazilianService.getStates();
        setStates(response);
    }

    const [states, setStates] = useState([]);
    const [selectedState, setSelectedState] = useState("Nunca tive visto perdido ou roubado");
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
                        <span className="title-header">Visto roubado ou perdido</span>
                    </div>
                </div>
                <hr className="hr-color" />
            </div>
            <div className="div-marital-padding">
                <div className="padding-bottom-title-input">
                    <span className="title-header-2">Já teve algum visto perdido ou roubado?<span style={{ color: 'red' }}>*</span></span>
                </div>
                <div className="padding-radio-marital">
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="Sim"
                        name="radio-buttons-group"
                        className="subTitle-div-2"
                        value={selectedState}
                        onChange={handleChangeSelect}
                    >
                        <FormControlLabel value="Nunca tive visto perdido ou roubado" control={<Radio />} label="Nunca tive visto perdido ou roubado" />
                        <FormControlLabel value="Perdido" control={<Radio />} label="Perdido" />
                        <FormControlLabel value="Roubado" control={<Radio />} label="Roubado" />
                    </RadioGroup>
                </div>
            </div>
            {selectedState === "Perdido" || selectedState === "Roubado" ?(
            <div className="div-marital-padding">
                <div className="padding-visa">
                    <div>
                        <div style={{ paddingBottom: '0.4rem' }}>
                            <span className="span-state">Data em que o visto foi perdido<span style={{ color: 'red' }}>*</span></span>
                        </div>
                        <div className="padding-bottom-1">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker format="DD/MM/YYYY" className="style-input-lost" />
                            </LocalizationProvider>
                        </div>
                    </div>
                </div>
            </div>
            ): null}
        </div>
    )
}

export default LostVisa
