import React, { useEffect, useState } from "react"
import './payer.css'
import { MenuItem, Select, TextField } from "@mui/material";
import statesBrazilianService from "../../../../services/statesBrazilianService";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import InputMask from 'react-input-mask';
import escortRelationship from '../../../../datas/escort_relationship';
import countriesService from "../../../../services/countriesWorld";
import statesService from "../../../../services/StatesWorld";
import citiesService from "../../../../services/citiesWorld";

const statusArray = [
    { key: "Eu", valor: "Eu" },
    { key: "Empresa/Organização", valor: "Empresa/Organização" },
    { key: "Mãe", valor: "Mãe" },
    { key: "Pai", valor: "Pai" },
    { key: "Tio", valor: "Tio" },
    { key: "Irmã(o)", valor: "Irmã(o)" },
    { key: "Amigo", valor: "Amigo" },
    { key: "Chefe", valor: "Chefe" },
    { key: "Colega de trabalho", valor: "Colega de trabalho" }
];

function Payer() {
    const [selectedPayer, setSelectedPayer] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("")
    const [cities, setCities] = useState([]);
    const [states, setStates] = useState([]);
    const [countries, setCountries] = useState([])


    const handleChangeSelect = (event) => {
        setSelectedPayer(event.target.value);
    };

    const getCountries = async () => {
        let _countries = await countriesService.getCountries();
        setCountries(_countries);
    }

    const getStates = async (country) => {
        let _states = await statesService.getStateByCountry(country);
        setStates(_states);
    }

    const getCities = async (country, state) => {
        let _cities = await citiesService.getCitiesByStateByCountry(country, state);
        setCities(_cities);
    }

    const handleChangeSelectCountry = (event) => {
        setCountry(event.target.value);
        getStates(event.target.value)
    };

    const handleChangeSelectState = (event) => {
        setState(event.target.value);
        getCities(country, event.target.value)
    };

    const handleChangeSelectCity = (event) => {
        setCity(event.target.value);
    };

    useEffect(() => {
        getCountries()
    }, []);

    return (
        <div className="div-margin">
            <div className="padding-bottom">
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                        <span className="title-header">Informações adicionais sobre o pagador</span>
                    </div>
                </div>
                <hr className="hr-color" />
            </div>
            <div className="div-marital-padding">
                <div className="padding-bottom-title-input">
                    <span className="title-header-2">Pessoa que está pagando pela viagem?<span style={{ color: 'red' }}>*</span></span>
                </div>
                <div className="padding-radio-marital">
                    <Select
                        className="input-style-payer"
                        value={selectedPayer}
                        onChange={handleChangeSelect}
                    >
                        {statusArray.map((status) => (
                            <MenuItem key={status.key} value={status.valor}>
                                {status.valor}
                            </MenuItem>
                        ))}
                    </Select>
                </div>
            </div>
            {selectedPayer != "Eu" && selectedPayer != "Empresa/Organização" ? (
                <div>
                    <div className="div-marital-padding">
                        <div className="padding-payer">
                            <div>
                                <div style={{ paddingBottom: '0.4rem' }}>
                                    <span className="span-state">O endereço da pessoa que está pagando é o mesmo que o seu?</span>
                                </div>
                                <div className="padding-bottom-1">
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
                    </div>
                    <div className="div-marital-padding">
                        <div className="padding-bottom-title-input">
                            <span className="title-header-2">Informação sobre a pessoa</span>
                        </div>
                        <div className="div-1-inputs-marital">
                            <div>
                                <div style={{ paddingBottom: '0.4rem' }}>
                                    <span className="span-state">Nome da pessoa<span style={{ color: 'red' }}>*</span></span>
                                </div>
                                <div className="padding-bottom-1">
                                    <TextField id="outlined-basic" className="input-style-work" placeholder="Escreva o primeiro nome" variant="outlined" />
                                </div>
                            </div>
                            <div>
                                <div style={{ paddingBottom: '0.4rem' }}>
                                    <span className="span-state">Sobrenome da pessoa<span style={{ color: 'red' }}>*</span></span>
                                </div>
                                <div className="padding-bottom-1">
                                    <TextField id="outlined-basic" className="input-style-work" placeholder="Escreva o sobrenome" variant="outlined" />
                                </div>
                            </div>
                            <div>
                                <div style={{ paddingBottom: '0.4rem' }}>
                                    <span className="span-state">Qual a sua relação com esta pessoa?<span style={{ color: 'red' }}>*</span></span>
                                </div>
                                <div className="padding-bottom-1">
                                    <Select
                                        className="style-select-work"
                                        labelId="select-state"
                                        id="select-state"
                                        // value={selectedState}
                                        // onChange={handleChangeSelectedState}
                                    >
                                        {escortRelationship.map((state) => (
                                            <MenuItem key={state.key} value={state.key}>
                                                {state.value}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </div>
                            </div>
                        </div>
                        <div className="div-1-inputs-marital">
                            <div>
                                <div style={{ paddingBottom: '0.4rem' }}>
                                    <span className="span-state">País da pessoa<span style={{ color: 'red' }}>*</span></span>
                                </div>
                                <div className="padding-bottom-1">
                                    <Select
                                        className="input-style-work"
                                        labelId="select-state"
                                        id="select-state"
                                        value={country}
                                        onChange={handleChangeSelectCountry}
                                    >
                                        {countries.map((countrie, index) => (
                                            <MenuItem key={index} value={countrie.iso2}>
                                                {countrie.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </div>
                            </div>
                            <div>
                                <div style={{ paddingBottom: '0.4rem' }}>
                                    <span className="span-state">Estado da pessoa<span style={{ color: 'red' }}>*</span></span>
                                </div>
                                <div className="padding-bottom-1">
                                    <Select
                                        className="input-style-work"
                                        labelId="select-state"
                                        id="select-state"
                                        value={state}
                                        onChange={handleChangeSelectState}
                                    >
                                        {states.map((state, index) => (
                                            <MenuItem key={index} value={state.iso2}>
                                                {state.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </div>
                            </div>
                            <div>
                                <div style={{ paddingBottom: '0.4rem' }}>
                                    <span className="span-state">Cidade da pessoa<span style={{ color: 'red' }}>*</span></span>
                                </div>
                                <div className="padding-bottom-1">
                                    <Select
                                        className="input-style-work"
                                        labelId="select-state"
                                        id="select-state"
                                        value={city}
                                        onChange={handleChangeSelectCity}
                                    >
                                        {cities.map((city, index) => (
                                            <MenuItem key={index} value={city.name}>
                                                {city.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </div>
                            </div>
                        </div>
                        <div className="div-2-inputs-work">
                            <div>
                                <div style={{ paddingBottom: '0.4rem' }}>
                                    <span className="span-state">Endereço da pessoa<span style={{ color: 'red' }}>*</span></span>
                                </div>
                                <div className="padding-bottom-1">
                                    <TextField id="outlined-basic" className="style-select-work" placeholder="Rua, bairro, número" variant="outlined" />
                                </div>
                            </div>
                            <div>
                                <div style={{ paddingBottom: '0.4rem' }}>
                                    <span className="span-state">CEP<span style={{ color: 'red' }}>*</span></span>
                                </div>
                                <div className="padding-bottom-1">
                                    <InputMask
                                        mask="99999-999"
                                        maskChar=""

                                    >
                                        {() => <TextField id="outlined-basic" className="style-select-work" placeholder="00000-000" variant="outlined" />}
                                    </InputMask>
                                </div>
                            </div>
                        </div>
                        <div className="div-2-inputs-work">
                            <div>
                                <div style={{ paddingBottom: '0.4rem' }}>
                                    <span className="span-state">Telefone da pessoa<span style={{ color: 'red' }}>*</span></span>
                                </div>
                                <div className="padding-bottom-1">
                                    <InputMask
                                        mask="55+ (99) 99999-9999"
                                        maskChar=""

                                    >
                                        {() => <TextField id="outlined-basic" className="style-select-work" placeholder="55+ (00) 00000-0000" variant="outlined" />}
                                    </InputMask>
                                </div>
                            </div>
                            <div>
                                <div style={{ paddingBottom: '0.4rem' }}>
                                    <span className="span-state">Email da pessoa<span style={{ color: 'red' }}>*</span></span>
                                </div>
                                <div className="padding-bottom-1">
                                    <TextField id="outlined-basic" className="style-select-work" placeholder="email@exemplo.com" variant="outlined" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}

            {selectedPayer === "Empresa/Organização" ? (
                <div>
                    <div className="div-marital-padding">
                        <div className="padding-bottom-title-input">
                            <span className="title-header-2">Outra empresa/organização</span>
                        </div>
                        <div className="div-2-inputs-work">
                            <div>
                                <div style={{ paddingBottom: '0.4rem' }}>
                                    <span className="span-state">Nome da companhia/organização<span style={{ color: 'red' }}>*</span></span>
                                </div>
                                <div className="padding-bottom-1">
                                    <TextField id="outlined-basic" className="input-style-work" placeholder="Escreva o primeiro nome" variant="outlined" />
                                </div>
                            </div>
                            <div>
                                <div style={{ paddingBottom: '0.4rem' }}>
                                    <span className="span-state">Qual a sua relação com esta companhia/organização?<span style={{ color: 'red' }}>*</span></span>
                                </div>
                                <div className="padding-bottom-1">
                                    <TextField id="outlined-basic" className="input-style-work" placeholder="Empregado, prestador de serviço..." variant="outlined" />
                                </div>
                            </div>
                        </div>
                        <div className="div-1-inputs-marital">
                            <div>
                                <div style={{ paddingBottom: '0.4rem' }}>
                                    <span className="span-state">País da companhia/organização?<span style={{ color: 'red' }}>*</span></span>
                                </div>
                                <div className="padding-bottom-1">
                                    <Select
                                        className="input-style-work"
                                        labelId="select-state"
                                        id="select-state"
                                        value={country}
                                        onChange={handleChangeSelectCountry}
                                    >
                                        {countries.map((countrie, index) => (
                                            <MenuItem key={index} value={countrie.iso2}>
                                                {countrie.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </div>
                            </div>
                            <div>
                                <div style={{ paddingBottom: '0.4rem' }}>
                                    <span className="span-state">Estado da companhia/organização<span style={{ color: 'red' }}>*</span></span>
                                </div>
                                <div className="padding-bottom-1">
                                    <Select
                                        className="input-style-work"
                                        labelId="select-state"
                                        id="select-state"
                                        value={state}
                                        onChange={handleChangeSelectState}
                                    >
                                        {states.map((state, index) => (
                                            <MenuItem key={index} value={state.iso2}>
                                                {state.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </div>
                            </div>
                            <div>
                                <div style={{ paddingBottom: '0.4rem' }}>
                                    <span className="span-state">Cidade da companhia/organização<span style={{ color: 'red' }}>*</span></span>
                                </div>
                                <div className="padding-bottom-1">
                                    <Select
                                        className="input-style-work"
                                        labelId="select-state"
                                        id="select-state"
                                        value={city}
                                        onChange={handleChangeSelectCity}
                                    >
                                        {cities.map((city, index) => (
                                            <MenuItem key={index} value={city.name}>
                                                {city.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </div>
                            </div>
                        </div>
                        <div className="div-2-inputs-work">
                            <div>
                                <div style={{ paddingBottom: '0.4rem' }}>
                                    <span className="span-state">Endereço da companhia/organização<span style={{ color: 'red' }}>*</span></span>
                                </div>
                                <div className="padding-bottom-1">
                                    <TextField id="outlined-basic" className="style-select-work" placeholder="Rua, bairro, número" variant="outlined" />
                                </div>
                            </div>
                            <div>
                                <div style={{ paddingBottom: '0.4rem' }}>
                                    <span className="span-state">CEP<span style={{ color: 'red' }}>*</span></span>
                                </div>
                                <div className="padding-bottom-1">
                                    <InputMask
                                        mask="99999-999"
                                        maskChar=""

                                    >
                                        {() => <TextField id="outlined-basic" className="style-select-work" placeholder="00000-000" variant="outlined" />}
                                    </InputMask>
                                </div>
                            </div>
                        </div>
                        <div className="div-2-inputs-work">
                            <div>
                                <div style={{ paddingBottom: '0.4rem' }}>
                                    <span className="span-state">Telefone da companhia/organização<span style={{ color: 'red' }}>*</span></span>
                                </div>
                                <div className="padding-bottom-1">
                                    <InputMask
                                        mask="55+ (99) 99999-9999"
                                        maskChar=""

                                    >
                                        {() => <TextField id="outlined-basic" className="style-select-work" placeholder="55+ (00) 00000-0000" variant="outlined" />}
                                    </InputMask>
                                </div>
                            </div>
                            <div>
                                <div style={{ paddingBottom: '0.4rem' }}>
                                    <span className="span-state">Email da companhia/organização<span style={{ color: 'red' }}>*</span></span>
                                </div>
                                <div className="padding-bottom-1">
                                    <TextField id="outlined-basic" className="style-select-work" placeholder="email@exemplo.com" variant="outlined" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    )
}

export default Payer
