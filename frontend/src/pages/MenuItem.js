import React from "react";
import '../styles/RestaurantDetails.css';

const MenuItem = (props) => {

    return (
        <li className="menu-item" onClick={() => props.menuSelect(props.name)}>
            <div className="menu-item-info">
                <div className="item-name">{props.name}<span>${props.price}</span></div>
                <div>{props.desc}</div>
            </div>
            <button className="add-to-cart">Add</button>
        </li>
    )
}

export default MenuItem;