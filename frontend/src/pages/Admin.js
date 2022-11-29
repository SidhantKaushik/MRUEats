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
    const [restoAddIsOpen, setRestoAddIsOpen] = useState(false);
    const [restoDeleteIsOpen, setRestoDeleteIsOpen] = useState(false);
    const [menuAddIsOpen, setMenuAddIsOpen] = useState(false);
    const [menuEditIsOpen, setMenuEditIsOpen] = useState(false);
    const [menuDeleteIsOpen, setMenuDeleteIsOpen] = useState(false);

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
        selectedRestaurant = restaurants.find(restaurant => restaurant.id === restaurantId);
        console.log("picked:" + restaurantId);
    }

    var restaurantList = restaurants.map((restaurant) =>
        <li key={restaurant.id} className='restaurantListItem' id={restaurant.id} onClick={populateForm}>{restaurant.name}</li>
    );

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

    function ConvertTime(hour) {
        var ampm = hour >= 12 ? 'pm' : 'am';
        hour = (hour % 12) || 12;
        return hour + ampm;
    }

    //Edit popups
    const toggleRestoEditPopup = () => {
        setRestoEditIsOpen(!restoEditIsOpen);
    }

    const toggleRestoAddPopup = () => {
        setRestoAddIsOpen(!restoAddIsOpen);
    } 

    const toggleRestoDeletePopup = () => {
        setRestoDeleteIsOpen(!restoDeleteIsOpen);
    } 

    const toggleMenuAddPopup = () => {
        setMenuAddIsOpen(!menuAddIsOpen);
    } 

    const toggleMenuEditPopup = () => {
        setMenuEditIsOpen(!menuEditIsOpen);
    } 

    const toggleMenuDeletePopup = () => {
        setMenuDeleteIsOpen(!menuDeleteIsOpen);
    } 

    return (
        <div className="AdminPage">
            <div className="adminMainBody">
                <div className="restaurants">
                    <div className='restaurantHeader'>
                        <h2 id='restaurantTitle'>Restaurants</h2>
                        <button className="addRestoButton" onClick={toggleRestoAddPopup}><FaPlus/></button>
                        {restoAddIsOpen && <Popup
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
                        handleClose={toggleRestoAddPopup}
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
                            <span className="restaurantInfo">{selectedRestaurant.address} •</span>
                            <span className="restaurantInfo">$3.09 Delivery</span>
                        </div>
                        <div className="thirdLine">
                            <span className="restaurantInfo">Delivery Hours: {ConvertTime(selectedRestaurant.open)} - {ConvertTime(selectedRestaurant.close)}  •</span>
                            <span className="openStatus restaurantInfo">OPEN</span>
                        </div>
                        <div className='restaurantButtons'>
                            
                                <button className='restaurantButton' onClick={toggleRestoEditPopup}><span className='buttonText'>Edit Information</span><FaEdit/></button>
                                <button className='restaurantButton' onClick={toggleRestoDeletePopup}><span className='buttonText'>Remove Restaurant</span><FaTrash/></button>
                          

                            {restoEditIsOpen && <Popup
                                content={<>
                                    <h4 className='popup-title'>Edit Restaurant</h4>
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

                            {restoDeleteIsOpen && <Popup
                                content={<>
                                    <h4 className='popup-title'>Remove Restaurant</h4>
                                    <p className='delete-confirmation'>Are you sure you want to remove this restaurant? This action cannot be undone.</p>
                                    <button className='popup-submit'>Remove Restaurant</button> 
                                    {/* may have to put button into form so popup closes on submit*/}
                                </>}
                                handleClose={toggleRestoDeletePopup}
                            />}
                        </div>
                    </div>

                    <div className='menuItems'>
                        {menu.map((menu) =>
                        <div className='menuListItem' id={menu.id}>
                            <h5 className='menu-list-name'>{menu.name} • ${menu.price}</h5>
                            <p>{menu.description}</p>
                        </div>
                        )}
                    </div>

                    <div className="menuButtons">
                        <button className='menuButton' onClick={toggleMenuAddPopup}>Add</button>
                        <button className='menuButton' onClick={toggleMenuEditPopup}>Edit</button>
                        <button className='menuButton' onClick={toggleMenuDeletePopup}>Delete</button>

                        {menuAddIsOpen && <Popup
                                content={<>
                                    <h4 className='popup-title'>Add Menu Item</h4>
                                    <form className='restaurant-form'>
                                        <label>Name<input type="text" /></label>
                                        <label>Price<input type="text" placeholder='$'/></label>
                                        <label>Drescription<input type="text"/></label>
                                        <label>Category<input type="text" /></label> 
                                        {/*turn categories into dropdown*/}
                                    </form>
                                    <button className='popup-submit'>Save Changes</button> 
                                </>}
                                handleClose={toggleMenuAddPopup}
                        />}

                        {menuEditIsOpen && <Popup
                                content={<>
                                    <h4 className='popup-title'>Edit Menu Item</h4>
                                    <form className='restaurant-form'>
                                        <label>Name<input type="text" /></label>
                                        <label>Price<input type="text" placeholder='$'/></label>
                                        <label>Drescription<input type="text"/></label>
                                        <label>Category<input type="text" /></label> 
                                        {/*turn categories into dropdown*/}
                                    </form>
                                    <button className='popup-submit'>Save Changes</button> 
                                </>}
                                handleClose={toggleMenuEditPopup}
                        />}

                        {menuDeleteIsOpen && <Popup
                                content={<>
                                    <h4 className='popup-title'>Remove Menu Item</h4>
                                    <p className='delete-confirmation'>Are you sure you want to remove this menu item? This action cannot be undone.</p>
                                    <button className='popup-submit'>Remove Menu Item</button> 
                                    {/* may have to put button into form so popup closes on submit*/}
                                </>}
                                handleClose={toggleMenuDeletePopup}
                            />}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Admin;
