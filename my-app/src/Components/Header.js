import React, {useState} from 'react'
import '../styles/Header.css'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import Hamburger from "./Hamburger"





const Header = (props) => {
    const [hamburgerOpen, setHamburgerOpen] = useState(false);

    const toggleHamburger = () =>{
        setHamburgerOpen(!hamburgerOpen);
    }

    return ( 
        <>
        <header>
            <h1><Link to='/'>MRU EATS</Link></h1>

            <ul className="menu">
                <li><Link to='/'>Resturants</Link></li>
                <li><Link to='/profile'>Profile</Link></li>
                <li><Link to='/order'>OrderPage</Link></li>
                <li><Link to='/cart'>Cart</Link></li>
                <li><Link to='/admin'>Admin</Link></li>
                <li><Link to='/signup'>Sign Up</Link></li>
                <li><Link to='/account'>Account</Link></li>
            </ul>
            <div className="hamburger" onClick={toggleHamburger}>
            <Hamburger/>
            </div>
            
            
            </header>
            <div className="locationInfo">
                <p>Current Address: Address</p>
            </div>
            <style jsx="true">{`
                
                .menu{
                    display:flex;
                    flex-wrap: wrap;
                    float: right;
                    margin: 0px;
                    padding: 0px;
                    overflow: hidden;
                }
                .menu li{
                    list-style-type: none;
                    padding-right: 10px;
                }
                .hamburger{
                    display: none;
                    z-index: 6;
                } 
                @media (max-width: 767px){
                  
                    .hamburger{
                        z-index: 6;
                        margin-right: 10px;
                        align-self: center;
                        display:flex;
                        position:fixed;
                        right: 0;
                        top: 13px;
                        width:30px;
                        height:30px;
                    }
                
                   
                    .menu{
                        display: ${hamburgerOpen ? 'flex' : 'none'};
                        flex-direction: column;
                        background-color: #033453;
                        height: fit-content;
                        font-size: 20px;
                        width: 100vw;
                        top: 96px;
                        right: 0;
                        justify-content: flex-start;
                        position: fixed;
                        
                    }
                    
                }
            `}</style>
</>
    )
}
export default Header;
