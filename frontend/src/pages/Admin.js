import '../styles/Admin.css'
import { useEffect, useState } from 'react';
import { FaEdit } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import Popup from '../components/Popup';

//https://www.freecodecamp.org/news/how-to-use-react-icons/

function Admin() {
 
    const [restaurants, setRestaurants] = useState([]);
    const [menu, setMenu] = useState([]);
    const [restoEditIsOpen, setRestoEditIsOpen] = useState(false);

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

      const getMenuUsingID = async () => {
        try {
          const url = "http://localhost:3000/api/menu/"+selectedRestaurant.id;
          const response = await fetch(url);
          const data = await response.json();
          setMenu(data);
        } catch (err) {
          console.error(err);
        }
      }
      getMenuUsingID();
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

    //Edit popups
    const toggleRestoEditPopup = () => {
        setRestoEditIsOpen(!restoEditIsOpen);
      }

    return (
        <div className="AdminPage">
            <div className="adminMainBody">
                <div className="restaurants">
                    <div className='restaurantHeader'>
                        <h2 id='restaurantTitle'>Restaurants</h2>
                        <button className="addRestoButton" onClick={toggleRestoEditPopup}><FaPlus/></button>
                        {restoEditIsOpen && <Popup
                        content={<>
                            <h4 className='popup-title'>Add Restaurant</h4>
                            <form className='restaurant-form'>
                                <label>Logo<input type="text" placeholder='enter url'/></label>
                                <label>Name<input type="text" /></label>
                                <label>Rating<input type="number" min="1" max="5"/></label>
                                <label>Address<input type="text"/></label>
                                <label>Delivery Fee<input type="text" placeholder='$'/></label>
                                <label>Opening Time<input type="time" /></label>
                                <label>Closing Time<input type="time" /></label>
                                {/* <label>Categories<input type="text" /></label> */}
                                </form>
                            <button className='popup-submit'>Save Changes</button>
                        </>}
                        handleClose={toggleRestoEditPopup}
                        />}
                    </div>
                    <div className='restaurantsList'>
                        <ul>{restaurantList}</ul>
                    </div>     
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
                        <div className='restaurantButtons'>
                            <form>
                                <button className='restaurantButton'><span className='buttonText'>Edit Information</span><FaEdit/></button>
                                <button className='restaurantButton'><span className='buttonText'>Remove Restaurant</span><FaTrash/></button>
                            </form>
                        </div>
                    </div>

                    <div className='menuItems'>
                        {/* {menu.map((menu) =>
                            <div>{menu.menuCategory}</div>
                        )} */}
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
