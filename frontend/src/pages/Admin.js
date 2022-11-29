import '../styles/Admin.css'
import { toast } from 'react-toastify';
import { FaEdit } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { useEffect, useState } from 'react';
import Popup from '../components/Popup';
import axios from 'axios';

const RESTAURANTS_API_URL = '/api/restaurants/';
const MENU_API_URL = '/api/restaurants/';

function Admin() {
 
    const [restaurants, setRestaurants] = useState([]);
    const [menus, setMenus] = useState([]);
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

    const [menuFormData, setMenuFormData] = useState({
        menuName: '',
        price: '',
        description: '',
        menuCategory: ''
    });
    const { menuName, price, description, menuCategory } = menuFormData;

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

      const getMenus = async () => {
        try {
          const url = "http://localhost:3000/api/menu/";
          const response = await fetch(url);
          const data = await response.json();
          setMenus(data);
        } catch (err) {
          console.error(err);
        }
      }

      getMenus();

    }, [])

    while(!restaurants[0]){
        return;
    }

    let restaurantCategories = [...new Set(restaurants.map(({category}) => (category)))];
    
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

    console.log(menus);
    let menuCategories = [...new Set(menus.map(({category}) => (category)))];
    
    var menuCategoryList = menuCategories.map((category) =>
    <option value={category}>{category}</option>
    );

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

    const createRestaurant = async (restaurantData) => {


        const response = await axios.post(RESTAURANTS_API_URL + 'ADD', restaurantData);

        if (response.data) {
            console.log(response.data);
        }
         return response.data;

    }

    const updateRestaurant = async (restaurantData) => {

        const response = await axios.put(RESTAURANTS_API_URL + 'UPDATE', restaurantData);

        if (response.data) {
            console.log(response.data);
        }
         return response.data;

    }

    const deleteRestaurant = async (restaurantData) => {

        const response = await axios.delete(RESTAURANTS_API_URL + 'DELETE', restaurantData);

        if (response.data) {
            console.log(response.data);
        }
         return response.data;

    }

    const createMenuItem = async (menuItemData) => {


        const response = await axios.post(MENU_API_URL + 'ADD', menuItemData);

        if (response.data) {
            console.log(response.data);
        }
         return response.data;

    }

    const updateMenuItem = async (menuItemData) => {

        const response = await axios.put(MENU_API_URL + 'UPDATE', menuItemData);

        if (response.data) {
            console.log(response.data);
        }
         return response.data;

    }

    const deleteMenuItem = async (menuItemData) => {

        const response = await axios.delete(MENU_API_URL + 'DELETE', menuItemData);

        if (response.data) {
            console.log(response.data);
        }
         return response.data;

    }

    //Add restaurant

    const onAddRestSubmit = (e) =>{

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

        createRestaurant(restaurantData);
    }

    
    const onUpdateRestSubmit = (e) =>{

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

        updateRestaurant(restaurantData);
    }

    const onDeleteRestSubmit = (e) =>{

        e.preventDefault();

        const restaurantData = {
            logo,
            restaurantName,
            rating,
            address,
            open,
            close,
            category,
        }

        deleteRestaurant(restaurantData);
    }

    const onAddMenuSubmit = (e) =>{

        e.preventDefault();

        //if none inputed 
        if(!menuName && !price && !description && !menuCategory)
        {
            toast.error('Form not filled');
            return;
        }

        const menuData = {
            menuName,
            price,
            description,
            menuCategory,
        }

        createMenuItem(menuData);
    }

    const onUpdateMenuSubmit = (e) =>{

        e.preventDefault();

        //if none inputed 
        if(!menuName && !price && !description && !menuCategory)
        {
            toast.error('Form not filled');
            return;
        }

        const menuData = {
            menuName,
            price,
            description,
            menuCategory,
        }

        updateRestaurant(menuData);
    }

    const onDeleteMenuSubmit = (e) =>{

        e.preventDefault();

        const menuData = {
            menuName,
            price,
            description,
            menuCategory,
        }

        deleteMenuItem(menuData);
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
                            <form className='restaurant-form' onSubmit={onAddRestSubmit}>            
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
                                    <form className='restaurant-form' onSubmit={onUpdateRestSubmit}>
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
                                    <form onSubmit={onDeleteRestSubmit}>
                                        <div className='submitButton'>
                                            <input className='popup-submit' type="submit" value="Remove Restaurant"/>
                                        </div>
                                    </form>
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
                                    <form className='menu-form' onSubmit={onAddMenuSubmit}>
                                        <div className='menuName'>
                                            <label>Name</label>
                                            <input type="text" name="menuName" value={menuName} onChange={onChange}/>
                                        </div>
                                        <div className='price'>
                                            <label>Price</label>
                                            <input type="text" placeholder='$' name="price" value={price} onChange={onChange}/>
                                        </div>
                                        <div className='description'>
                                            <label>Drescription</label>
                                            <input type="text" name="description" value={description} onChange={onChange}/>
                                        </div>
                                        <div className='menuCategory'>
                                            <label>Category</label>
                                            <select name="menuCategory" value={menuCategory} onChange={onChange}>{menuCategoryList}</select>
                                        </div>
                                        <div className='submitButton'>
                                            <input className='popup-submit' type="submit" value="Save Changes"/>
                                        </div>
                                    </form>
                                </>}
                                handleClose={toggleMenuAddPopup}
                        />}

                        {menuEditIsOpen && <Popup
                                content={<>
                                    <h4 className='popup-title'>Edit Menu Item</h4>
                                    <form className='menu-form' onSubmit={onUpdateMenuSubmit}>
                                        <div className='menuName'>
                                            <label>Name</label>
                                            <input type="text" name="menuName" value={menuName} onChange={onChange}/>
                                        </div>
                                        <div className='price'>
                                            <label>Price</label>
                                            <input type="text" placeholder='$' name="price" value={price} onChange={onChange}/>
                                        </div>
                                        <div className='description'>
                                            <label>Drescription</label>
                                            <input type="text" name="description" value={description} onChange={onChange}/>
                                        </div>
                                        <div className='menuCategory'>
                                            <label>Category</label>
                                            <select name="menuCategory" value={menuCategory} onChange={onChange}>{menuCategoryList}</select>
                                        </div>
                                        <div className='submitButton'>
                                            <input className='popup-submit' type="submit" value="Save Changes"/>
                                        </div>
                                    </form>
                                </>}
                                handleClose={toggleMenuEditPopup}
                        />}

                        {menuDeleteIsOpen && <Popup
                                content={<>
                                    <h4 className='popup-title'>Remove Menu Item</h4>
                                    <p className='delete-confirmation'>Are you sure you want to remove this menu item? This action cannot be undone.</p>
                                    <form onSubmit={onDeleteMenuSubmit}>
                                        <div className='submitButton'>
                                            <input className='popup-submit' type="submit" value="Remove Menu Item"/>
                                        </div>
                                    </form>
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
