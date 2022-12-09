import React from "react";
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const RestaurantItem = (props) => {
    return (
        <Link to='/restaurantDetails' state={{ id: props.id, name: props.name, rating: props.rating, address: props.address, close: props.close, open: props.open }}>
            <div className='restaurantsHomePage'>
                <div className='logo'><img src={props.logo} alt="logo"></img></div>
                <div className='name'> <h2>{props.name}</h2></div>
                <div className='rating'><p>{props.rating}</p></div>
                <div className='address'>{props.address}</div>
                <p></p></div>
        </Link>
    )
}

export default RestaurantItem;