import '../styles/Admin.css'
import { useEffect, useState } from 'react';
import { FaEdit } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";

//https://www.freecodecamp.org/news/how-to-use-react-icons/

function Admin() {
 
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
      const getRestaurants = async () => {
        try {
          const url = "api/restaurants";
          const response = await fetch(url);
          const data = await response.json();
          setRestaurants(data);
          
        } catch (err) {
          console.error(err);
        }
      }
      getRestaurants();
    }, [])

    while(!restaurants[0]){
        return;
    }

    var selectedRestaurant = restaurants[0];

    const populateForm = async (e) => {
        var restaurantId = e.target.id;
        selectedRestaurant = restaurants.find(restaurant => restaurant.id == restaurantId);
        console.log("picked:" + restaurantId);
    }

    var restaurantList = restaurants.map((restaurant) =>
        <li key={restaurant.id} className='restaurantListItem' id={restaurant.id} onClick={populateForm}>{restaurant.name}</li>
    );

    function ConvertTime(hour) {
        var ampm = hour >= 12 ? 'pm' : 'am';
        hour = (hour % 12) || 12;
        return hour + ampm;
    }

    return (
        <div className="AdminPage">
            <div className="adminMainBody">
                <div className="restaurants">
                    <div className='restaurantHeader'>
                        <h2 id='restaurantTitle'>Restaurants</h2>
                        <button className="addRestoButton"><FaPlus/></button>
                    </div>
                    <ul className='restaurantsList'>{restaurantList}</ul>
                </div>
                <div className="restaurantSection">
                    <div className="adminRestaurantBanner">
                        <div className="firstLine">
                            <h2 className="restaurant-name">{selectedRestaurant.name}</h2>
                            <div className="restaurantRating">{"X".repeat(selectedRestaurant.rating)}</div>
                        </div>
                        <div className="secondLine">
                            <h2 className="restaurantInfo">{selectedRestaurant.address} •</h2>
                            <h2 className="restaurantInfo">$3.09 Delivery</h2>
                        </div>
                        <div className="thirdLine">
                            <h2 className="restaurantInfo">Delivery Hours: {ConvertTime(selectedRestaurant.open)} - {ConvertTime(selectedRestaurant.close)}  •</h2>
                            <h2 className="openStatus restaurantInfo">OPEN</h2>
                        </div>
                        <div>
                            <form className='restaurantButtons'>
                                <button className='restaurantButton'><span className='buttonText'>Edit Information</span><FaEdit/></button>
                                <button className='restaurantButton'><span className='buttonText'>Remove Restaurant</span><FaTrash/></button>
                            </form>
                        </div>
                    </div>

                    <div className='menuItems'>
                        {/* TODO: populate menu with menu item components*/}
                    </div>

                    <div className="menuButtons">
                        <form className='menuItemForm'>
                            <button className='menuButton'>Add</button>
                            <button className='menuButton'>Edit</button>
                            <button className='menuButton'>Delete</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Admin;
