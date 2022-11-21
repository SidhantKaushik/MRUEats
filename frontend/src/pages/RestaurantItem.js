import React from "react";
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Home.css';

const RestaurantItem = (props) => {

    return (
        <div className='restaurants'>
            <div className='logo'><img src={props.logo}></img></div>
            <div className='info'> <h2>{props.name}</h2>
            <p>Smoothie place that sells some smoothies</p></div>
        </div>
    )
}

export default RestaurantItem;