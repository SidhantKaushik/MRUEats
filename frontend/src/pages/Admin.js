import '../styles/Admin.css'
import { useEffect, useState } from 'react';
import Popup from '../components/Popup';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaEdit } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";

const RESTAURANTS_API_URL = '/api/restaurants/';
const MENU_API_URL = '/api/restaurants/';

//https://www.freecodecamp.org/news/how-to-use-react-icons/

function Admin() {
 
    const [restaurants, setRestaurants] = useState([]);
    const [menu, setMenu] = useState([]);

    const [restaurantFormData, setRestaurantFormData] = useState({
        logo: '',
        restaurantName: '',
        rating: '',
        address: '',
        open: '',
        close: '',
        category: ''
    });
    const { logo, restaurantName, rating, address, open, close, category } = restaurantFormData;

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

    let restaurantCategories = restaurants.map(({category}) => (category));
    
    var categoryList = restaurantCategories.map((category) =>
    <option value={category}>{category}</option>
    );

    let selectedRestaurant = restaurants[0];
      
    const populateForm = async (e) => {
        var restaurantId = e.target.id;
        selectedRestaurant = restaurants.find(restaurant => restaurant.id === restaurantId);
        
    }

    var restaurantList = restaurants.map((restaurant) =>
        <li key={restaurant.id} className='restaurantListItem' id={restaurant.id} onClick={populateForm}>{restaurant.name}</li>
    );

    const getMenuUsingID = async () => {
        try {
          const url = "http://localhost:3000/api/menu/" + selectedRestaurant.id;
          const response = await fetch(url);
          const data = await response.json();
          setMenu(data);
        } catch (err) {
          console.error(err);
        }
    }
    
    getMenuUsingID();

    //helpers

    function ConvertTime(hour) {
        var ampm = hour >= 12 ? 'pm' : 'am';
        hour = (hour % 12) || 12;
        return hour + ampm;
    }

    function checkIfOpen() {
        const d = new Date();
        let time = d.getHours() +""+ d.getMinutes();
        if ( time > selectedRestaurant.open && time < selectedRestaurant.close ){
             return "Open";
        }
        else{
            return "Closed";
        }
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

    //FORM 

    const onChange = (e) => {

        setRestaurantFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value

        }));
    }

    //API CALLS

    //Add restaurant

    const addRestaurant = async (e) =>{

        e.preventDefault();

        //if none inputed 
        if(!logo && !restaurantName && !rating && !address && !open && !close && !category)
        {
            toast.error('Form not filled');
            return;
        }

        const restaurantData = {
            logo,
            restaurantName,
            rating,
            address,
            open,
            close,
            category,
        }

        try {
            const response = await axios.post(RESTAURANTS_API_URL, restaurantData);
            console.log(response);
        } catch (error) {
            console.log(error.response); 
        }
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
                            <form className='restaurant-form' onSubmit={addRestaurant}>            
                                <div className='logo'>
                                    <label>Logo</label>
                                    <input type="text" name="logo" value={logo} placeholder='enter url' onChange={onChange}/>
                                </div>
                                <div className='restNameInput'>
                                    <label>Name</label>
                                    <input type="text" name="restaurantName" value={restaurantName} onChange={onChange}/>
                                </div>
                                <div className='rating'>
                                    <label>Rating</label>
                                    <input type="number" name="rating"  value={rating} min="1" max="5" onChange={onChange}/>
                                </div>
                                <div className='address'>
                                    <label>Address</label>
                                    <input type="text" name="address"  value={address} onChange={onChange}/>
                                </div>
                                <div className='openTime'>
                                    <label>Opening Time</label>
                                    <input type="time" name="open" value={open} onChange={onChange}/>
                                </div>
                                <div className='closingTime'>
                                    <label>Closing Time</label>
                                    <input type="time" name="close" value={close} onChange={onChange}/>
                                </div>
                                <div className='category'>
                                    <label>Category</label>
                                    <select name="category" value={category} onChange={onChange}>{categoryList}</select>
                                </div>
                                <div className='submitButton'>
                                    <input className='popup-submit' type="submit" value="Save Changes"/>
                                </div>
                            </form>
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
                            <div className="restaurantRating">{"⭐".repeat(selectedRestaurant.rating)}</div>
                        </div>
                        <div className="secondLine">
                            <span className="restaurantInfo">{selectedRestaurant.address} •</span>
                            <span className="restaurantInfo">$3.09 Delivery</span>
                        </div>
                        <div className="thirdLine">
                            <span className="restaurantInfo">Delivery Hours: {ConvertTime(selectedRestaurant.open)} - {ConvertTime(selectedRestaurant.close)}  •</span>
                            <span className="openStatus restaurantInfo">{checkIfOpen()}</span>
                        </div>
                        <div className='restaurantButtons'>
                            
                                <button className='restaurantButton' onClick={toggleRestoEditPopup}><span className='buttonText'>Edit Information</span><FaEdit/></button>
                                <button className='restaurantButton' onClick={toggleRestoDeletePopup}><span className='buttonText'>Remove Restaurant</span><FaTrash/></button>
                          

                            {restoEditIsOpen && <Popup
                                content={<>
                                    <h4 className='popup-title'>Edit Restaurant</h4>
                                    <form className='restaurant-form'>
                                        <div className='logo'>
                                            <label>Logo</label>
                                            <input type="text" name="logo" value={logo} placeholder='enter url' onChange={onChange}/>
                                        </div>
                                        <div className='restNameInput'>
                                            <label>Name</label>
                                            <input type="text" name="restaurantName" value={restaurantName} onChange={onChange}/>
                                        </div>
                                        <div className='rating'>
                                            <label>Rating</label>
                                            <input type="number" name="rating"  value={rating} min="1" max="5" onChange={onChange}/>
                                        </div>
                                        <div className='address'>
                                            <label>Address</label>
                                            <input type="text" name="address"  value={address} onChange={onChange}/>
                                        </div>
                                        <div className='openTime'>
                                            <label>Opening Time</label>
                                            <input type="time" name="open" value={open} onChange={onChange}/>
                                        </div>
                                        <div className='closingTime'>
                                            <label>Closing Time</label>
                                            <input type="time" name="close" value={close} onChange={onChange}/>
                                        </div>
                                        <div className='category'>
                                            <label>Category</label>
                                            <select name="category" value={category} onChange={onChange}>{categoryList}</select>
                                        </div>
                                        <div className='submitButton'>
                                            <input className='popup-submit' type="submit" value="Save Changes"/>
                                        </div>
                                    </form>
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
