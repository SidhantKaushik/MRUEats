import React, { useState } from 'react';

export default function InputPhoneNumber(){

    const [input, setInput] = useState('');
    const handleInput = (e) => {
        const formattedPhoneNum = formatPhoneNum(e.target.value);
        setInput(formattedPhoneNum);
    };
    return <input onChange={e => handleInput(e)} value={input} />
}

function formatPhoneNum(value){
    if (!value) return value;
    const phoneNum = value.replace(/[^\d]/g, '');
    const phoneNumLength = phoneNum.length;
    if (phoneNumLength < 4) return phoneNum;
    if (phoneNumLength < 7){
        return `(${phoneNum.slice(0, 3)}) ${phoneNum.slide(3)}`;
    }
    return `(${phoneNum.slice(0, 3)}) ${phoneNum.slice(3, 6,)}-${phoneNum.slice(6, 10)}`;

}