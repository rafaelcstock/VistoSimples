import React, { useEffect, useState } from "react"
import './maritalStatus.css'
import { MenuItem, Select, TextField } from "@mui/material";
import Countries from "../../../../datas/countries";

function Widow() {
    const [nationality, setNationality] = useState("");
    const [countryBirth, setCountryBirth] = useState("");
    const [stateBirth, setstateBirth] = useState("");
    const [cityBirth, setCityBirth] = useState("");

    const handleChangeSelectNationality = (event) => {
        setNationality(event.target.value);
    };

    const handleChangeSelectCountryBirth = (event) => {
        setCountryBirth(event.target.value);
        getStates(event.target.value)
    };

    const handleChangeSelectStateBirth = (event) => {
        setstateBirth(event.target.value);
        getCities(countryBirth, event.target.value)
    };

    const handleChangeSelectCityBirth = (event) => {
        setCityBirth(event.target.value);
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
                        <span className="title-header-1">Viúvo(a)</span>
                    </div>
                </div>
                <hr className="hr-color" />
            </div>
            <div className="div-marital-padding">
                <div>
                    <div className="padding-bottom-title-input">
                        <span className="title-header-2">Viuvo(a)</span>
                    </div>
                    <div className="div-2-inputs-marital">
                        <div>
                            <div style={{ paddingBottom: '0.4rem' }}>
                                <span className="span-state">Nome do ex-cônjugue<span style={{ color: 'red' }}>*</span></span>
                            </div>
                            <div className="padding-bottom-1">
                                <TextField id="outlined-basic" className="style-select-marital" placeholder="Escreva o seu primeiro nome" variant="outlined" />
                            </div>
                        </div>
                        <div>
                            <div style={{ paddingBottom: '0.4rem' }}>
                                <span className="span-state">Sobrenome do ex-cônjugue<span style={{ color: 'red' }}>*</span></span>
                            </div>
                            <div className="padding-bottom-1">
                                <TextField id="outlined-basic" className="style-select-marital" placeholder="Escreva o seu sobrenome" variant="outlined" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="div-3-inputs-marital">
                    <div>
                        <div style={{ paddingBottom: '0.4rem' }}>
                            <span className="span-state">País do nascimento do ex-cônjugue<span style={{ color: 'red' }}>*</span></span>
                        </div>
                        <div className="padding-bottom-1">
                            <Select
                                className="style-input-2-marital"
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
                    <div>
                        <div style={{ paddingBottom: '0.4rem' }}>
                            <span className="span-state">Estado do nascimento do ex-cônjugue<span style={{ color: 'red' }}>*</span></span>
                        </div>
                        <div className="padding-bottom-1">
                            <TextField
                                className="style-input-1-marital"
                                value={stateBirth}
                                onChange={handleChangeSelectStateBirth}
                                variant="outlined"
                                placeholder="Digite o estado"
                            />
                        </div>
                    </div>
                    <div>
                        <div style={{ paddingBottom: '0.4rem' }}>
                            <span className="span-state">Cidade de nascimento do ex-cônjugue<span style={{ color: 'red' }}>*</span></span>
                        </div>
                        <div className="padding-bottom-1">
                            <TextField
                                className="style-input-1-marital"
                                value={cityBirth}
                                onChange={handleChangeSelectCityBirth}
                                variant="outlined"
                                placeholder="Digite a cidade"
                            />
                        </div>
                    </div>
                    <div style={{ paddingTop: '1.23rem' }}>
                        <div style={{ paddingBottom: '0.4rem' }}>
                            <span className="span-state">Nacionalidade do ex-cônjugue<span style={{ color: 'red' }}>*</span></span>
                        </div>
                        <div className="padding-bottom-1">
                            <Select
                                className="style-input-2-marital"
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
                </div>
            </div>
        </div>
    )
}

export default Widow
