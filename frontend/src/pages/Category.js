import React from "react";
import { useNavigate, Link } from 'react-router-dom';
import '../styles/RestaurantDetails.css';

const Category = (props) => {
    return (    
       <li className='category-item' key={props.debug._id} onClick={()=>props.filter(props.category)}>
            {props.category}
       </li>
    )
}

export default Category;