import Select from 'react-select';
import '../styles/CountryCode.css';


//Link to flag icons
//http://purecatamphetamine.github.io/country-flag-icons/3x2/

function CountryCodes(props) {

    const options = [
        //Canada
        { value: 1, label: <div>+1 <img alt="CA" src="http://purecatamphetamine.github.io/country-flag-icons/3x2/CA.svg" height="10px" width="20px" /></div> }];

    const currCountryCode = options.find(code => code.value === props.code);

    return <Select className="countryCodeSelect" value={currCountryCode} placeholder={props.code}
        components={{
            Menu: () => null,
            MenuList: () => null,
            DropdownIndicator: () => null,
            IndicatorSeparator: () => null,
            Input: () => null,
        }} />;

}

export default CountryCodes;