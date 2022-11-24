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

    let { id } = useParams();
    console.log(id);

    const [restaurant, setRestaurant] = useState([]);

    useEffect(() => {
      const getRestaurantUsingID = async () => {
        try {
          const url = "http://localhost:3000/api/restaurants/"+id;
          const response = await fetch(url);
          const data = await response.json();
          setRestaurant(data);
        } catch (err) {
          console.error(err);
        }
      }
        getRestaurantUsingID();
    }, [])
    while(!restaurant[0]){
        return;
    }
    const restaurantSelected = restaurant[0];
    console.log(restaurantSelected);

    function ConvertTime(hour) {
        
        if(hour <= 1200){
            var hourString = hour.toString();
            hourString = hourString.substring(0,2) + ':' + hourString.substring(2,4);
            return hourString+"AM";
        }
        else{
            hour = hour - 1200;
            var hourString = hour.toString();
            hourString = hourString.substring(0,2) + ':' + hourString.substring(2,4);
            return hourString+"PM";
        }
    }
    function checkIfOpen() {
        const d = new Date();
        let time = d.getHours() +""+ d.getMinutes();
        console.log(time);
        console.log(restaurantSelected.open);
        console.log(restaurantSelected.close);
        if ( time > restaurantSelected.open && time < restaurantSelected.close ){
             return "Open";
        }
        else{
            return "Closed";
        }
    }

    return (
        <div className="RestaurantPage">
            <div className="RestaurantBanner">
=
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
                <div className="restaurantMenu">
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
