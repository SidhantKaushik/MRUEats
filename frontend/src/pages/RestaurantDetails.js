import '../styles/RestaurantDetails.css'
import {Link, useLocation} from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { set } from 'mongoose'

const RestaurantDetails = (props) => {

    const [menuItems, setMenuItems] = useState([])
    const item = []

    const location = useLocation()
    useEffect(() => {
        if(location.state) {
            for(let i = 0; i < props.menu.menu.length; i++){                
                if (location.state.id === props.menu.menu[i].id){
                    item.push(props.menu.menu[i]) 
               }
            }
        }
        setMenuItems(item)
    }, [])

    console.log(menuItems)

    return (
        <div className="RestaurantPage">
            <div className="RestaurantBanner">
                {/*<img src={logo} className="restaurantImage" alt="logo" />*/}
                <div className="firstLine">
                    <h1 className="restaurant-name">{location.state.name}</h1>
                    <div className="restaurantRating">XXXXX</div>
                </div>
                <div className="secondLine">
                    <h2 className="restaurantInfo">{location.state.address}</h2>
                    <h2 className="restaurantInfo">$3.09 Delivery</h2>
                </div>
                <div className="thirdLine">
                    <h2 className="restaurantInfo">Delivery Hours: {location.state.open} - {location.state.close} •</h2>
                    <h2 className="openStatus restaurantInfo">OPEN</h2>
                </div>
                <div>
                    <input type="text" id="menuSearch" className="menuSearchBar" onKeyUp="myFunction()" placeholder="Search for items" title="Type in a menu name"></input>
                </div>
            </div>
            <div className="mainContentBody">
                <div className="menuCategories">

                    <ol className='categoriesList'>
                        <li>Promotions</li>
                        <li>Category 2</li>
                        <li>Category 3</li>
                        <li>Category 4</li>
                        <li>Category 5</li>
                        <li>Category 6</li>
                        <li>Category 7</li>
                        <li>Category 8</li>
                        <li>Category 9</li>
                        <li>Category 10</li>
                    </ol>

                </div>
                <div className="menu">
                    <h2>Promotions</h2>

                    <div className="menuItem">
                        {/* TODO: Implement menu item component */}
                        {/* TODO: populate menu with menu item components*/}
                    </div>
                </div>
                <div className="addItem">
                    <h2>Menu Item Name</h2>

                </div>
            </div>
        </div>
    );
}

export default RestaurantDetails;
