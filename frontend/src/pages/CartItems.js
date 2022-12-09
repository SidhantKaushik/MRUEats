import React from "react";
import '../styles/RestaurantDetails.css';

const CartItems = (props) => {

    return (
        <li className="cart-item" onClick={() => props.menuSelect(props.name)}>
            {props.name}
           <img className='remove' onClick={()=>props.remove(props.name)} src="https://islandfreshbermuda.com/wp-content/uploads/2021/10/black-x-png-7-png-image-black-x-png-1600_1600.png"></img>
        </li>
    )
}

export default CartItems;