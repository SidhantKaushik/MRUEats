import '../styles/RestaurantDetails.css'
import {Link, useLocation} from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { set } from 'mongoose'
import Category from './Category'
import MenuItem from './MenuItem'

const RestaurantDetails = (props) => {

    const [menuItems, setMenuItems] = useState([])
    const [currItem, setCurrItem] = useState([])
    let currentItem = []
    let item = []
    // let oldItems = JSON.parse(localStorage.getItem('itemsArray')) || [];

    const location = useLocation()
    useEffect(() => {
        if(location.state) {
            item = []
            for(let i = 0; i < props.menu.menu.length; i++){                
                if (location.state.id === props.menu.menu[i].restaurant_id){
                    item.push(props.menu.menu[i]) 
               }
            }
        }
        if(item.length != 0){
            localStorage.setItem('itemsArray', JSON.stringify(item))
            setMenuItems(JSON.parse(localStorage.getItem('itemsArray')))
        }
    }, [])

    //When page is refreshed, menu data is retreived from local storage
    useEffect(() => {
        setMenuItems(JSON.parse(localStorage.getItem('itemsArray')))
    }, [])

    console.log(menuItems)

    function filter(e){
        item = []
        for(let i = 0; i < menuItems.length; i++){    
            if (menuItems[i].name.includes(e.target.value) || menuItems[i].name.toLowerCase().includes(e.target.value.toLowerCase())){
                item.push(menuItems[i])
            }
        }
        setMenuItems(item)
    }

    function menuSelect(props) {
        currentItem = []
        console.log(menuItems[0].name)
        console.log(props)
        for(let i = 0; i < menuItems.length; i++){    
            if (menuItems[i].name == props){
                currentItem.push(menuItems[i])
            }
        }
        console.log(currentItem)
        setCurrItem(currentItem)
    }

    // let { id } = 1
    // console.log(id);

    // const [restaurant, setRestaurant] = useState([]);

    // useEffect(() => {
    //   const getRestaurantUsingID = async () => {
    //     try {
    //       const url = "http://localhost:3000/api/restaurants/"+id;
    //       const response = await fetch(url);
    //       const data = await response.json();
    //       setRestaurant(data);
    //     } catch (err) {
    //       console.error(err);
    //     }
    //   }
    //     getRestaurantUsingID();
    // }, [])
    // while(!restaurant[0]){
    //     return;
    // }
    // const restaurantSelected = restaurant[0];
    // console.log(restaurantSelected);

    // function ConvertTime(hour) {
        
    //     if(hour <= 1200){
    //         var hourString = hour.toString();
    //         hourString = hourString.substring(0,2) + ':' + hourString.substring(2,4);
    //         return hourString+"AM";
    //     }
    //     else{
    //         hour = hour - 1200;
    //         var hourString = hour.toString();
    //         hourString = hourString.substring(0,2) + ':' + hourString.substring(2,4);
    //         return hourString+"PM";
    //     }
    // }
    // function checkIfOpen() {
    //     const d = new Date();
    //     let time = d.getHours() +""+ d.getMinutes();
    //     console.log(time);
    //     // console.log(restaurantSelected.open);
    //     // console.log(restaurantSelected.close);
    //     if ( time > restaurantSelected.open && time < restaurantSelected.close ){
    //          return "Open";
    //     }
    //     else{
    //         return "Closed";
    //     }
    // }

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
                <h3>Categorgies</h3>
                    <ol className='categoriesList'>
                    <li className='category-item' onClick={filter}>
                        All 
                    </li>
                        {menuItems.map((p, index) => (
                            <Category
                                category={p.category}
                                filter={filter}
                            />
                        ))} 
                    </ol>
                </div>
                <div className="restaurantMenu">
                    <h2>Promotions</h2>

                    <div className="menu-list">
                        {menuItems.map((p, index) => (
                            <MenuItem
                                name={p.name}
                                desc={p.description}
                                price={p.price}
                                category={p.category}
                                menuSelect={menuSelect}
                            />
                        ))} 
                    </div>
                </div>
                <div className="addItem">
                    <h2>Menu Item Name</h2>
                            {currItem.map((p, index) => {
                                return (
                                    <>{p.name}</>
                                )
                            })}
                </div>
            </div>
        </div>
    );
}

export default RestaurantDetails;
