import React from 'react'
import '../styles/Header.css'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'

const Header = (props) => {
    return ( 
        <div className='header'>
            <h1>MRU EATS</h1>
            <ul className = "menu">
                <li><Link to='/'>Resturants</Link></li>
                <li><Link to='/profile'>Profile</Link></li>
                <li><Link to='/order'>OrderPage</Link></li>
                <li><Link to='/cart'>Cart</Link></li>
                <li><Link to='/admin'>Admin</Link></li>
                <li><Link to='/signup'>Sign Up</Link></li>
            </ul>
        </div>

    )
}
export default Header;
