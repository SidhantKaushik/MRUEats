import React, { useState } from 'react';
import Select from 'react-select';

function ProvinceList(props){
    
    const options = [
    { value: "Alberta", label: "Alberta"},
    { value: "British Columbia", label: "British Columbia"},
    { value: "Manitoba", label: "Manitoba"},
    { value: "New Brunswick", label: "New Brunswick"},
    { value: "Newfoundland and Labrador", label: "Newfoundland and Labrador"},
    { value: "Northwest Territories", label: "Northwest Territories"},
    { value: "Nova Scotia", label: "Nova Scotia"},
    { value: "Nunavut", label: "Nunavut"},
    { value: "Ontario", label: "Ontario"},
    { value: "Prince Edward Island", label: "Prince Edward Island"},
    { value: "Quebec", label: "Quebec"},
    { value: "Saskatchewan", label: "Saskatchewan" },
    { value: "Yukon", label:"Yukon" },

    ];
    
    const currCountryCode = options.find(code => code.value === props.province);

    const [value, setValue] = useState(currCountryCode);

    const changeHandler = value => {
        setValue(value);
    }

    return <Select options={options} value={value} onChange={changeHandler} placeholder={props.province} />
}

export default ProvinceList;