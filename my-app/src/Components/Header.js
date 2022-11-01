import React from 'react'
import '../styles/Header.css'
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

const Header = (props) => {
    return ( 
                    <ul className = "menu">
                    <li><Link to='/'>Resturants</Link></li>
                    <li><Link to='/orderpage'>OrderPage</Link></li>
                    </ul>      
      
    )
}

export default Header;