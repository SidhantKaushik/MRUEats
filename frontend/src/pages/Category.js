import React from "react";
import { useNavigate, Link } from 'react-router-dom';
import '../styles/RestaurantDetails.css';

const Category = (props) => {

    return (    
       <li className='category-item' onClick={props.filter}>
            {props.category}
       </li>
    )
}

export default Category;