import React, { useState } from 'react';

//Used in Edit Account to automatically format phone number
function InputPhoneNumber(props) {

    const [input, setInput] = useState(props.num);
    const handleInput = (e) => {
        const formattedPhoneNum = FormatPhoneNum(e.target.value);
        setInput(formattedPhoneNum);
        props.setPhoneNum(formattedPhoneNum);
    };
    return <input onChange={e => handleInput(e)} value={input} placeholder={props.num} />
}

function FormatPhoneNum(value) {
    if (!value) return value;
    const phoneNum = value.toString().replace(/[^\d]/g, '');
    const phoneNumLength = phoneNum.length;
    if (phoneNumLength < 4) return phoneNum;
    if (phoneNumLength < 7) {
        return `(${phoneNum.slice(0, 3)}) ${phoneNum.slice(3)}`;
    }
    return `(${phoneNum.slice(0, 3)}) ${phoneNum.slice(3, 6,)}-${phoneNum.slice(6, 10)}`;

}

export { InputPhoneNumber, FormatPhoneNum };