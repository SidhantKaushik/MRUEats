import React from "react";
import { useNavigate, Link } from 'react-router-dom';
import '../styles/RestaurantDetails.css';

const MenuItem = (props) => {

    return (    
       <li className="menu-item" onClick={()=>props.menuSelect(props.name)}>
            <div className="item-name">{props.name}<span>{props.price}</span></div>
            <div>{props.desc}</div>
       </li>
    )
}

export default MenuItem;