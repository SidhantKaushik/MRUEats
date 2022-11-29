import React from "react";
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Home.css';

const RestaurantItem = (props) => {

    console.log(props)

    return (
        <Link to='/restaurantDetails' state={{id:props.id, name:props.name, address:props.address, close:props.close, open:props.open}}>
        <div className='restaurants'>
            <div className='logo'><img src='https://logos-world.net/wp-content/uploads/2021/08/Chick-fil-A-Logo.png'></img></div>
            <div className='info'> <h2>{props.name}</h2>
            <p></p></div>
        </div>
        </Link>
    )
}

export default RestaurantItem;