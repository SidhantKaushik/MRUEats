import '../styles/RestaurantDetails.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Category from './Category';
import MenuItem from './MenuItem';
import CartItems from './CartItems';
import { useSelector, useDispatch, } from 'react-redux';
import { createOrder } from '../features/orders/orderSlice';
import formatPrice from '../helpers/price-format';
import { toast } from 'react-toastify';

const RestaurantDetails = (props) => {

    //states
    const [menuItems, setMenuItems] = useState([])
    const [categories, setCategories] = useState([])
    const [currItem, setCurrItem] = useState([])
    const [priceItem, setPriceItem] = useState([])
    const [finalPrice, setFinalPrice] = useState()
    const [formData, setFormData] = useState({
        specialInstructions: ''
    });

    let currentItem = []
    let item = []
    let filterItem = [];

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useSelector((state) => state.auth);
    // let oldItems = JSON.parse(localStorage.getItem('itemsArray')) || [];



    //Checks React Redux user state
    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    const onSubmit = e => {
        e.preventDefault()
        const menuID = []
        currItem.forEach(e => menuID.push({ id: e.id }))
        const menuPrice = []
        currItem.forEach(e => menuPrice.push({ price: e.price }))
        const orderData = {
            menuItems: menuID,
            userId: user?.id,
            specialInstructions: formData?.specialInstructions,
            restaurantId: location.state.id,
            //dateOrdered: createDate(),
            price: finalPrice,
            deliverTo: user?.deliverTo
        }
        dispatch(createOrder(orderData))
        setCurrItem([])
        setPriceItem([])
        setFinalPrice()
        if (menuID.length > 0) {
            toast.success('Successfully ordered!');
        }
        
   }
   //removes menu items from the cart 
   function removeSelect(props) {
        console.log(props)
        currentItem = [...currItem]
        const index = currentItem.map(e => e.name).indexOf(props)
        if (index > -1){
            currentItem.splice(index, 1)
        }

        setCurrItem(currentItem)
    }

    const location = useLocation()
    //checks what restaurant ID is selected and selects all menu items with that id
    useEffect(() => {
        if (location.state) {
            item = []
            for (let i = 0; i < props.menu.menu.length; i++) {
                if (location.state.id === props.menu.menu[i].restaurantId) {
                    item.push(props.menu.menu[i])

                }
            }

        }
        if (item.length !== 0) {
            localStorage.setItem('itemsArray', JSON.stringify(item))
            setMenuItems(JSON.parse(localStorage.getItem('itemsArray')))
            item = item.filter((value, index, self) =>
                index === self.findIndex((t) => (
                    t.category === value.category
                ))
            )
            localStorage.setItem('categories', JSON.stringify(item))
            setCategories(JSON.parse(localStorage.getItem('categories')))
        }
    }, [])

    //When page is refreshed, menu data is retreived from local storage
    useEffect(() => {
        setMenuItems(JSON.parse(localStorage.getItem('itemsArray')))
        setCategories(JSON.parse(localStorage.getItem('categories')))
    }, [])

    useEffect(() => {
        let sum = priceItem.reduce((a, b) => a + b, 0)
        sum += 3.09
        sum = sum * 1.05
        setFinalPrice(formatPrice(sum))
    }, [priceItem])

    //displays menu items based on categories users selects 
    function filter(props){
        item = []
        filterItem = []
        let x = JSON.parse(localStorage.getItem('itemsArray'))
        for (let i = 0; i < x.length; i++) {
            if (x[i].category === props) {
                filterItem.push(x[i])
            }
        }
        //will show all menu items if "ALL" categories is presssed
        if (props.target !== undefined){
            setMenuItems(x)
        }
        else {
            setMenuItems(filterItem)
        }

    }
    //users selects menu items and gets added to cart
    //also prices are collected
    function menuSelect(props) {
        currentItem = [...currItem]

        for (let i = 0; i < menuItems.length; i++) {
            if (menuItems[i].name === props) {
                currentItem.push(menuItems[i])

                setPriceItem([...priceItem, menuItems[i].price])
            }
        }

        setCurrItem(currentItem)

    }

    const onChange = (e) => {

        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value

        }));
    }

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

    return (
        <div className="RestaurantPage">
            <div className="RestaurantBanner">
                <div className="firstLine">
                    <h1 className="restaurant-name">{location?.state?.name}</h1>
                    <div className="restaurantRating">{"⭐".repeat(location?.state?.rating)}</div>
                </div>
                <div className="secondLine">
                    <h2 className="restaurantInfo">{location?.state?.address}</h2>
                    <h2 className="restaurantInfo">$3.09 Delivery</h2>
                </div>
                <div className="thirdLine">
                    <h2 className="restaurantInfo">Delivery Hours: {ConvertTime(location?.state?.open)} - {ConvertTime(location?.state?.close)}</h2>
                    <h2 className="openStatus restaurantInfo">OPEN</h2>
                </div>
            </div>
            <div className="mainContentBody">
                <div className="menuCategories">
                    <h3>Categories</h3>
                    <ol className='categoriesList'>
                        <li key="SDFSDF" className='category-item' onClick={filter}>
                            All
                        </li>
                        {categories.map((p, index) => (
                            <Category
                                debug={index}
                                category={p.category}
                                filter={filter}
                            />
                        ))}
                    </ol>
                </div>
                <div className="restaurantMenu">
                    <h2>Menu Items</h2>

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
                    <form onSubmit={onSubmit}>
                        <h2>Order Details</h2>
                        <ol className='cart-list'>
                            {currItem.map((p, index) => (
                                <CartItems
                                    name={p.name}
                                    remove={removeSelect}
                                /> 
                            ))}
                        </ol>
                        <div className='order-notes'>
                            <p>Special Instructions</p>
                            <input name="specialInstructions" value={formData.specialInstructions} onChange={onChange}></input>
                        </div>
                        <button type='submit' className='orderButton'>Order</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default RestaurantDetails;
