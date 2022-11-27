import React from "react";
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Home.css';

const RestaurantItem = (props) => {

    console.log(props)

    return (
        <Link to='/restaurantDetails' state={{id:props.id, name:props.name, rating:props.rating, address:props.address, close:props.close, open:props.open}}>
        <div className='restaurants'>
            <div className='logo'><img src='https://logos-world.net/wp-content/uploads/2021/08/Chick-fil-A-Logo.png'></img></div>
            <div className='name'> <h2>{props.name}</h2></div>
            <div className='rating'><p>{props.rating}</p></div>
            <div className='address'>{props.address}</div>
            <p></p></div>
        </Link>
    )
}

export default RestaurantItem;