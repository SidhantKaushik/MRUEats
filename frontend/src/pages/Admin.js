import '../styles/Admin.css'
import { useEffect, useState } from 'react';

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

    var restaurantList = restaurants.map((restaurant) =>
    <li key="{restaurant}" className='restaurantListItem'>{restaurant.name}</li>
    );

    return (
        <div className="AdminPage">
            <div className="adminMainBody">
                <div className="restaurants">
                    <div className='restaurantHeader'>
                        <h2 id='restaurantTitle'>Restaurants</h2>
                        <button className="addRestoButton">+</button>
                    </div>
                    <ul className='restaurantsList'>{restaurantList}</ul>
                </div>
                <div className="restaurantSection">
                    <div className="adminRestaurantBanner">
                        <div className="firstLine">
                            <h2 className="restaurant-name">Booster Juice</h2>
                            <div className="restaurantRating">XXXXX</div>
                        </div>
                        <div className="secondLine">
                            <h2 className="restaurantInfo">4703 130th Avenue Souteast •</h2>
                            <h2 className="restaurantInfo">$3.09 Delivery</h2>
                        </div>
                        <div className="thirdLine">
                            <h2 className="restaurantInfo">Delivery Hours: 8:00AM - 7:30PM •</h2>
                            <h2 className="openStatus restaurantInfo">OPEN</h2>
                        </div>
                        <div>
                            <form className='restaurantButtons'>
                                <button className='restaurantButton'>Edit Information</button>
                                <button className='restaurantButton'>Remove Restaurant</button>
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
