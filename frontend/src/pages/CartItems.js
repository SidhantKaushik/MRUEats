import React from "react";
import '../styles/RestaurantDetails.css';

const CartItems = (props) => {

    return (
        <li className="cart-item" onClick={() => props.menuSelect(props.name)}>
            {props.name}
        </li>
    )
}

export default CartItems;