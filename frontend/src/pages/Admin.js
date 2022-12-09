import '../styles/Admin.css'
import { toast } from 'react-toastify';
import { FaEdit } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
//Passing JWT
import authHeader from "../features/auth/authHeader";
import Popup from '../components/Popup';
import axios from 'axios';

const RESTAURANTS_API_URL = '/api/restaurants/';
const MENU_API_URL = '/api/menu/';

function Admin(props) {

    const [restaurants, setRestaurants] = useState([]);
    const [allMenuItems, setAllMenuItems] = useState([]);
    const [menu, setMenu] = useState([]);
    const [selectedRestaurant, setSelectedRestaurant] = useState([]);
    const [selectedMenuItem, setSelectedMenuItem] = useState([]);

    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    const [restaurantFormData, setRestaurantFormData] = useState({
        logo: '',
        restaurantName: '',
        rating: '',
        address: '',
        openTime: '',
        closeTime: '',
        category: ''
    });
    const { logo, restaurantName, rating, address, openTime, closeTime, category } = restaurantFormData;

    const [menuFormData, setMenuFormData] = useState({
        name: '',
        price: '',
        description: '',
        menuCategory: '',
        newMenuCategory: '',
    });
    const { name, price, description, menuCategory, newMenuCategory } = menuFormData;

    //#region popup dialogs
    const [restoEditIsOpen, setRestoEditIsOpen] = useState(false);
    const [restoAddIsOpen, setRestoAddIsOpen] = useState(false);
    const [restoDeleteIsOpen, setRestoDeleteIsOpen] = useState(false);
    const [menuAddIsOpen, setMenuAddIsOpen] = useState(false);
    const [menuEditIsOpen, setMenuEditIsOpen] = useState(false);
    const [menuDeleteIsOpen, setMenuDeleteIsOpen] = useState(false);
    //#endregion


    //Checks React Redux user state
    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    useEffect(() => {
        const getRestaurants = async () => {
            try {
                const url = "api/restaurants";
                const response = await fetch(url);
                const data = await response.json();
                setRestaurants(data);
                setSelectedRestaurant(data[0]);
            } catch (err) {
                console.error(err);
            }
        }
        getRestaurants();

        const getMenus = async () => {
            try {
                const url = "api/menu/";
                const response = await fetch(url);
                const data = await response.json();
                setAllMenuItems(data);
                setMenu(data.filter((item) => item.restaurantId == 1));
            } catch (err) {
                console.error(err);
            }
        }

        getMenus();

    }, [])

    while (!restaurants[0]) {
        return;
    }

    //#region setting restaurants, menu items, and categories

    let restaurantCategories = [...new Set(restaurants.map(({ category }) => (category)))];

    var categoryList = restaurantCategories.map((category) =>
        <option value={category}>{category}</option>
    );

    const populateRestaurant = (e) => {
        var restaurantId = e.target.id;
        setSelectedRestaurant(restaurants.find(restaurant => restaurant.id == restaurantId));
        setMenu(allMenuItems.filter((item) => item.restaurantId == restaurantId));
    }

    var restaurantList = restaurants.map((restaurant) =>
        <li key={restaurant.id} className='restaurantListItem' id={restaurant.id} onClick={populateRestaurant}>{restaurant.name}</li>
    );

    let menuCategories = [...new Set(menu.map(({ category }) => (category)))];

    var menuCategoryList = menuCategories.map((category) =>
        <option value={category}>{category}</option>
    );

    //#endregion

    //#region helpers

    function ConvertTime(hour) {
        let hours = Math.floor(hour / 100);
        let minutes = hour % 100;
        let amPm = hours >= 12 ? 'pm' : 'am';

        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;

        let strTime = hours + ':' + minutes + ' ' + amPm;

        return strTime;
    }

    function getLatestMenuId() {
        if (Object.keys(menu).length === 0) {
            return 1;
        }
        let latestId = menu.slice(-1)[0].id;
        return parseInt(latestId) + 1;
    }

    function getLatestRestaurantId() {
        const ids = restaurants.map((rest) => rest.id);
        const onlyNumbers = ids.filter(value => /^-?\d+\.?\d*$/.test(value));
        const max = Math.max(...onlyNumbers);
        return max + 1;
    }

    function isDuplicateMenuCategory(newCategory) {
        return menuCategories.some(category => {
            return newCategory.toLowerCase() === category.toLowerCase();
        });
    }

    //#endregion

    //#region form on change logic

    const handleSelectedMenu = (e) => {
        var menuItemId = e.currentTarget.id;
        var selectedMenuItem = menu.find(menu => menu.id == menuItemId && menu.restaurantId == selectedRestaurant.id);
        setSelectedMenuItem(selectedMenuItem);
    }

    const onRestFormChange = (e) => {

        setRestaurantFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value

        }));

    }

    const onMenuFormChange = (e) => {

        setMenuFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value

        }));

    }


    //#endregion

    //#region Edit popups

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
    //#endregion

    //#region Add restaurant
    const createRestaurant = async (restaurantData) => {

        const response = await axios.post(RESTAURANTS_API_URL + 'ADD', restaurantData);

        if (response.status === 201) {
            toast.success('Successfully added restaurant!');
        } else {
            toast.error('Error: Could not add restaurant');
        }

    }

    const onAddRestSubmit = (e) => {

        e.preventDefault();

        if (!logo) {
            toast.error('Logo is required');
        }
        else if (!restaurantName) {
            toast.error('Name is required');
        }
        else if (!rating) {
            toast.error('Rating is required');
        }
        else if (!address) {
            toast.error('Address is required');
        }
        else if (!openTime) {
            toast.error('Opening time is required');
        }
        else if (!closeTime) {
            toast.error('Closing time is required');
        }
        else if (!category) {
            toast.error('Category is required');
        }
        else {
            getLatestRestaurantId();

            let id = getLatestRestaurantId();
            let open = openTime.replace(":", "");
            let close = closeTime.replace(":", "");
            let name = restaurantName;

            const restaurantData = {
                id,
                logo,
                name,
                rating,
                address,
                open,
                close,
                category,
            }

            createRestaurant(restaurantData);
            window.location.reload(false);
        }

    }
    //#endregion 

    //#region Update Restaurant
    const updateRestaurant = async (restaurantData) => {

        const response = await axios.put(RESTAURANTS_API_URL + 'UPDATE', restaurantData, authHeader);

        if (response.status === 201) {
            toast.success('Successfully updated restaurant!');
        } else {
            toast.error('Error: Could not update restaurant');
        }

    }

    const onUpdateRestSubmit = (e) => {

        e.preventDefault();

        if (!logo) {
            toast.error('Logo is required');
        }
        else if (!restaurantName) {
            toast.error('Name is required');
        }
        else if (!rating) {
            toast.error('Rating is required');
        }
        else if (!address) {
            toast.error('Address is required');
        }
        else if (!openTime) {
            toast.error('Opening time is required');
        }
        else if (!closeTime) {
            toast.error('Closing time is required');
        }
        else if (!category) {
            toast.error('Category is required');
        }
        else {
            let _id = selectedRestaurant._id;
            let id = selectedRestaurant.id;
            let open = openTime.replace(":", "");
            let close = closeTime.replace(":", "");
            let name = restaurantName;

            const restaurantData = {
                _id,
                id,
                logo,
                name,
                rating,
                address,
                open,
                close,
                category,
            }

            updateRestaurant(restaurantData);
            window.location.reload(false);
        }

    }
    //#endregion

    //#region Delete Restaurant
    const deleteRestaurant = async (restaurantData) => {

        const response = await axios.delete(RESTAURANTS_API_URL + 'DELETE', { data: restaurantData }, authHeader);

        if (response.status === 204) {
            toast.success('Successfully deleted restaurant!');
        } else {
            toast.error('Error: Could not delete restaurant');
        }

    }

    const onDeleteRestSubmit = (e) => {

        e.preventDefault();

        let _id = selectedRestaurant._id;
        let id = selectedRestaurant.id;

        const restaurantData = {
            _id,
            id,
        }

        deleteRestaurant(restaurantData);
        window.location.reload(false);
    }
    //#endregion

    //#region Create Menu Item
    const createMenuItem = async (menuItemData) => {

        const response = await axios.post(MENU_API_URL + 'ADD', menuItemData, authHeader);

        if (response.status === 201) {
            toast.success('Successfully added menu item!');
        } else {
            toast.error('Error: Could not add menu item');
        }
    }

    const onAddMenuSubmit = (e) => {

        e.preventDefault();

        var regex = /^[0-9]+(\.[0-9]+)?$/;

        if (!name) {
            toast.error('Name is required');
        }
        else if (!price) {
            toast.error('Price is required');
        }
        else if (!description) {
            toast.error('Description is required');
        }
        else if (!menuCategory && menu.length > 0 && !newMenuCategory) {
            toast.error('Category is required');
        }
        else if (!newMenuCategory && menu.length === 0) {
            toast.error('Category is required');
        }
        else if (newMenuCategory && menuCategory) {
            toast.error('Either select a category OR add a new one');
        }
        else if (isDuplicateMenuCategory(newMenuCategory)) {
            toast.error('The entered category already exists. Please try again');
        }
        else if (!regex.test(price)) {
            toast.error('Price can only contain numbers and decimals. Example: 3.49');
        }
        else {
            let restaurantId = selectedRestaurant.id;
            let id = getLatestMenuId();
            let category = "";

            //if the menu is empty 
            if (menu.length === 0) {
                category = newMenuCategory;
            }
            //if the menu is not empty or the user did not input a menu category
            else if (menu.length > 0 && !menuCategory) {
                category = newMenuCategory;
            }
            //if the menu is not empty or the user did not input a new menu category
            else if (menu.length > 0 && !newMenuCategory) {
                category = menuCategory;
            }

            const menuData = {
                id: id,
                name: name,
                price: price,
                description: description,
                category: category,
                restaurantId: restaurantId,
            }

            createMenuItem(menuData);
            window.location.reload(false);
        }

    }

    //#endregion

    //#region Update Menu Item
    const updateMenuItem = async (menuItemData) => {

        const response = await axios.put(MENU_API_URL + 'UPDATE', menuItemData, authHeader);

        if (response.status === 201) {
            toast.success('Successfully updated menu item!');
        } else {
            toast.error('Error: Could not update menu item');
        }

    }

    const onUpdateMenuSubmit = (e) => {

        e.preventDefault();

        if (Object.keys(selectedMenuItem).length === 0) {
            toast.error('No Menu Item Selected!');
            return;
        }

        var regex = /^[0-9]+(\.[0-9]+)?$/; //price regex

        if (!name) {
            toast.error('Name is required');
        }
        else if (!price) {
            toast.error('Price is required');
        }
        else if (!description) {
            toast.error('Description is required');
        }
        else if (!menuCategory) {
            toast.error('Category is required');
        }
        else if (!regex.test(price)) {
            toast.error('Price can only contain numbers and decimals. Example: 3.49');
        }
        else {
            let id = selectedMenuItem.id;
            let _id = selectedMenuItem._id;
            let restaurantId = selectedMenuItem.restaurantId;
            let category = selectedMenuItem.category;

            const menuData = {
                _id,
                id,
                name,
                price,
                description,
                category,
                restaurantId,
            }

            updateMenuItem(menuData);
            window.location.reload(false);
        }

    }
    //#endregion

    //#region Delete Menu Item

    const deleteMenuItem = async (menuItemData) => {

        const response = await axios.delete(MENU_API_URL + 'DELETE', { data: menuItemData }, authHeader);

        if (response.status === 204) {
            toast.success('Successfully deleted menu item!');
        } else {
            toast.error('Error: Could not delete menu item');
        }

        return response.data;

    }

    const onDeleteMenuSubmit = (e) => {

        e.preventDefault();

        if (Object.keys(selectedMenuItem).length === 0) {
            toast.error('No Menu Item Selected!');
        }

        let id = selectedMenuItem.id;
        let _id = selectedMenuItem._id;
        let restaurantId = selectedMenuItem.restaurantId;
        let category = selectedMenuItem.category;
        let price = selectedMenuItem.price;
        let description = selectedMenuItem.description;
        let name = selectedMenuItem.name;

        const menuData = {
            _id,
            id,
            name,
            price,
            description,
            category,
            restaurantId,
        }

        deleteMenuItem(menuData);
        window.location.reload(false);
    }

    //#endregion

    return (
        <div className="AdminPage">
            <div className="adminMainBody">
                <div className="restaurants">
                    <div className='restaurantHeader'>
                        <h2 id='restaurantTitle'>Restaurants</h2>
                        <button className="addRestoButton" onClick={toggleRestoAddPopup}><FaPlus /></button>
                        {restoAddIsOpen && <Popup
                            content={<>
                                <h4 className='popup-title'>Add Restaurant</h4>
                                <form className='restaurant-form' onSubmit={onAddRestSubmit}>
                                    <div className='logo'>
                                        <label>Logo</label>
                                        <input type="text" name="logo" value={logo} placeholder='enter url' onChange={onRestFormChange} />
                                    </div>
                                    <div className='restNameInput'>
                                        <label>Name</label>
                                        <input type="text" name="restaurantName" value={restaurantName} onChange={onRestFormChange} />
                                    </div>
                                    <div className='rating'>
                                        <label>Rating</label>
                                        <input type="number" name="rating" value={rating} min="1" max="5" onChange={onRestFormChange} />
                                    </div>
                                    <div className='address'>
                                        <label>Address</label>
                                        <input type="text" name="address" value={address} onChange={onRestFormChange} />
                                    </div>
                                    <div className='open'>
                                        <label>Opening Time</label>
                                        <input type="time" name="openTime" value={openTime} onChange={onRestFormChange} />
                                    </div>
                                    <div className='closingTime'>
                                        <label>Closing Time</label>
                                        <input type="time" name="closeTime" value={closeTime} onChange={onRestFormChange} />
                                    </div>
                                    <div className='category'>
                                        <label>Category</label>
                                        <select name="category" value={category} onChange={onRestFormChange}>
                                            <option value="value" selected>Select a Category</option>
                                            {categoryList}
                                        </select>
                                    </div>
                                    <div className='submitButton'>
                                        <input className='popup-submit' type="submit" value="Save Changes" />
                                    </div>
                                </form>
                            </>}
                            handleClose={toggleRestoAddPopup}
                        />}
                    </div>
                    <div className='restaurantsList'>
                        <ul>
                            {restaurantList}
                        </ul>
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
                            <span className="restaurantInfo">$2 Delivery</span>
                        </div>
                        <div className="thirdLine">
                            <span className="restaurantInfo">Delivery Hours: {ConvertTime(selectedRestaurant.open)} - {ConvertTime(selectedRestaurant.close)}</span>
                        </div>
                        <div className='restaurantButtons'>
                            <button className='restaurantButton' onClick={toggleRestoEditPopup}><span className='buttonText'>Edit Information</span><FaEdit /></button>
                            <button className='restaurantButton' onClick={toggleRestoDeletePopup}><span className='buttonText'>Remove Restaurant</span><FaTrash /></button>

                            {restoEditIsOpen && <Popup
                                content={<>
                                    <h4 className='popup-title'>Edit Restaurant</h4>
                                    <form className='restaurant-form' onSubmit={onUpdateRestSubmit}>
                                        <div className='logo'>
                                            <label>Logo</label>
                                            <input type="text" name="logo" placeholder={selectedRestaurant.logo} value={logo} onChange={onRestFormChange} />
                                        </div>
                                        <div className='restNameInput'>
                                            <label>Name</label>
                                            <input type="text" name="restaurantName" placeholder={selectedRestaurant.name} value={restaurantName} onChange={onRestFormChange} />
                                        </div>
                                        <div className='rating'>
                                            <label>Rating</label>
                                            <input type="number" name="rating" placeholder={selectedRestaurant.rating} value={rating} min="1" max="5" onChange={onRestFormChange} />
                                        </div>
                                        <div className='address'>
                                            <label>Address</label>
                                            <input type="text" name="address" placeholder={selectedRestaurant.address} value={address} onChange={onRestFormChange} />
                                        </div>
                                        <div className='open'>
                                            <label>Opening Time</label>
                                            <input type="time" name="openTime" placeholder={selectedRestaurant.open} value={openTime} onChange={onRestFormChange} />
                                        </div>
                                        <div className='closingTime'>
                                            <label>Closing Time</label>
                                            <input type="time" name="closeTime" placeholder={selectedRestaurant.close} value={closeTime} onChange={onRestFormChange} />
                                        </div>
                                        <div className='category'>
                                            <label>Category</label>
                                            <select name="category" placeholder={selectedRestaurant.category} value={category} onChange={onRestFormChange}>
                                                <option value="value" selected>Select a Category</option>
                                                {categoryList}
                                            </select>
                                        </div>
                                        <div className='submitButton'>
                                            <input className='popup-submit' type="submit" value="Save Changes" />
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
                                            <input className='popup-submit' type="submit" value="Remove Restaurant" />
                                        </div>
                                    </form>
                                </>}
                                handleClose={toggleRestoDeletePopup}
                            />}
                        </div>
                    </div>

                    <div className='menuItems'>
                        {menu.map((menu) =>
                            <div className='menuListItem' id={menu.id} onClick={handleSelectedMenu}>
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
                                        <input type="text" name="name" value={name} onChange={onMenuFormChange} />
                                    </div>
                                    <div className='price'>
                                        <label>Price</label>
                                        <input type="text" placeholder='$' name="price" value={price} onChange={onMenuFormChange} />
                                    </div>
                                    <div className='description'>
                                        <label>Drescription</label>
                                        <input type="text" name="description" value={description} onChange={onMenuFormChange} />
                                    </div>
                                    {menu.length > 0 && <>
                                        <div className='menuCategory'>
                                            <label>Category</label>
                                            <select name="menuCategory" value={menuCategory} onChange={onMenuFormChange}>
                                                <option value="" selected>Select a Category</option>
                                                {menuCategoryList}
                                            </select>
                                        </div>

                                        <div className='newMenuCategory'>
                                            <label>Don't see your category on the list? Add a new one.</label>
                                            <input type="text" name="newMenuCategory" value={newMenuCategory} onChange={onMenuFormChange} />
                                        </div>
                                    </>}

                                    {menu.length === 0 && <>
                                        <div className='newMenuCategory'>
                                            <label>Category</label>
                                            <input type="text" name="newMenuCategory" value={newMenuCategory} onChange={onMenuFormChange} />
                                        </div>
                                    </>}

                                    <div className='submitButton'>
                                        <input className='popup-submit' type="submit" value="Save Changes" />
                                    </div>
                                </form>
                            </>}
                            handleClose={toggleMenuAddPopup}
                        />}

                        {menuEditIsOpen && <Popup
                            content={<>
                                <h4 className='popup-title'>Edit Menu Item</h4>

                                <form className='menu-form' onSubmit={onUpdateMenuSubmit}>
                                    {selectedMenuItem &&
                                        <>
                                            <div className='menuName'>
                                                <label>Name</label>
                                                <input type="text" name="name" placeholder={selectedMenuItem.name} value={name} onChange={onMenuFormChange} />
                                            </div>
                                            <div className='price'>
                                                <label>Price</label>
                                                <input type="text" name="price" placeholder={selectedMenuItem.price} value={price} onChange={onMenuFormChange} />
                                            </div><div className='description'>
                                                <label>Drescription</label>
                                                <input type="text" name="description" placeholder={selectedMenuItem.description} value={description} onChange={onMenuFormChange} />
                                            </div><div className='menuCategory'>
                                                <label>Category</label>
                                                <select name="menuCategory" placeholder={selectedMenuItem.category} value={menuCategory} onChange={onMenuFormChange}>
                                                    <option value="value" selected>Select a Category</option>
                                                    {menuCategoryList}
                                                </select>
                                            </div><div className='submitButton'>
                                                <input className='popup-submit' type="submit" value="Save Changes" />
                                            </div>
                                        </>}

                                </form>

                            </>}
                            handleClose={toggleMenuEditPopup}
                        />}

                        {menuDeleteIsOpen && <Popup
                            content={<>
                                <h4 className='popup-title'>Remove Menu Item</h4>

                                <form onSubmit={onDeleteMenuSubmit}>
                                    {selectedMenuItem && <>
                                        <p className='delete-confirmation'>Are you sure you want to remove this menu item? This action cannot be undone.</p>
                                        <div className='submitButton'>
                                            <input className='popup-submit' type="submit" value="Remove Menu Item" />
                                        </div>
                                    </>}

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
