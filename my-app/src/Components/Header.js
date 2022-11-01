import React from 'react'
import '../styles/Header.css'
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import {Restaurants} from './Components';

const Header = (props) => {
    return ( 
                    <ul className = "menu">
                    <li><Link to='/Resturants'></Link></li>
                    <li><a href="#">Shop</a></li>
                     <li><a href="#">Contact Us</a></li>
                    </ul>      
      
    )
}

export default Header;