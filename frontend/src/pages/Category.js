import React from "react";
import '../styles/RestaurantDetails.css';

const Category = (props) => {
    return (
        <li className='category-item' key={props.debug._id} onClick={() => props.filter(props.category)}>
            {props.category}
        </li>
    )
}

export default Category;