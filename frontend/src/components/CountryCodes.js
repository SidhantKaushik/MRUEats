import React, { useState } from 'react';
import Select from 'react-select';

//Link to flag icons
//http://purecatamphetamine.github.io/country-flag-icons/3x2/

function CountryCodes(props){
    
    const options = [
    //Canada
    { value: 1, label: <div>+1 <img alt="CA" src="http://purecatamphetamine.github.io/country-flag-icons/3x2/CA.svg" height="10px" width="20px" /></div> },
    //USA
    { value: 2, label: <div>+1 <img alt="US" src="http://purecatamphetamine.github.io/country-flag-icons/3x2/US.svg" height="10px" width="20px"/></div> },
    //UK
    { value: 44, label: <div>+44 <img alt="GB" src="http://purecatamphetamine.github.io/country-flag-icons/3x2/GB.svg" height="10px" width="20px"/></div>  },
    //Mexico
    { value: 52, label: <div>+52 <img alt="MX" src="http://purecatamphetamine.github.io/country-flag-icons/3x2/MX.svg" height="10px" width="20px"/></div> }
    ];
    
    const currCountryCode = options.find(code => code.value === props.code);
    
    const [value, setValue] = useState(currCountryCode);

    const changeHandler = value => {
        setValue(value);
        props.setCountryCode(value.value);
    }

    if(props.isActive){
        return <Select options={options} value={value} onChange={changeHandler} placeholder={props.code}/>;
    }else{
        return <Select value={currCountryCode} placeholder={props.code} 
            components={{
            Menu: () => null,
            MenuList: () => null,
            DropdownIndicator: () => null,
            IndicatorSeparator: () => null
            }}/>;
    }
}

export default CountryCodes;