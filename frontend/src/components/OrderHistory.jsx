import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Receipt } from './Receipt';
import formatDate from '../helpers/date-format';


const OrderHistory = (props) => {

    //States for props being passed in
    const [order, setOrder] = useState({});
    const [restaurants, setRestaurants] = useState({});
    const [menu, setMenu] = useState({});

    //States to be used or passed
    const [currentRestaurant, setCurrentRestaurant] = useState({});
    const [currentMenuItems, setCurrentMenuItems] = useState([]);

    //Still in development; will be used to pass data to receipt (Not in scope)
    // const [orderPricing, setOrderPricing] = useState({});

    //Sets state from props if they exist
    useEffect(() => {

        if (isEmpty(order)) {
            setOrder(props?.order);
        }
        if (isEmpty(restaurants)) {
            setRestaurants(props?.restaurants.restaurants)
        }
        if (isEmpty(menu)) {
            setMenu(props?.menu.menu)
        }

    }, [order, props?.order, restaurants, props?.restaurants.restaurants, menu, props?.menu.menu]);

    //Sets restaurant state
    useEffect(() => {
        //Conditional statement needed to handle errors if restaurants prop doesn't get passed before render
        if (!isEmpty(restaurants)) {
            const restaurant = restaurants.find(e => e.id === order.restaurantId);
            setCurrentRestaurant(restaurant);
        } else {
            //If prop doesn't get passed properly, get data from api
            const getRestaurants = async () => {
                try {
                    const url = "api/restaurants";
                    const response = await fetch(url);
                    const data = await response.json();
                    setRestaurants(data);
                } catch (err) {
                    console.error(err)
                }
            }
            getRestaurants();
        }
    }, [order.restaurantId, restaurants, currentRestaurant]);

    //Sets menu state
    useEffect(() => {
        //Conditional statement needed to handle errors if menu prop doesn't get passed before render
        if (!isEmpty(menu)) {
            const menuItems = order.menuItems
            const menuArray = []
            for (const item of menuItems) {
                const menuItem = menu.find(e => e.id === item.id)
                menuArray.push(menuItem);
            }
            setCurrentMenuItems(menuArray);
        } else {
            //If prop doesn't get passed properly, get data from api
            const getMenu = async () => {
                try {
                    const url = "api/menu";
                    const response = await fetch(url);
                    const data = await response.json();
                    setMenu(data);
                } catch (err) {
                    console.error(err)
                }
            }
            getMenu();
        }

    }, [menu, order.menuItems]);

    //Checks order status
    function isActive(isActive) {
        if (isActive) {
            return "In progress";
        } else {
            return "Delivered";
        }
    }

    function showItems(menuItems) {
        let itemList = "";
        for (let item of menuItems) {

            if (itemList.length === 0) {
                itemList += `${item.name} `;
            } else {
                itemList += `• ${item.name} `;
            }
        }
        //Check string length to prevent overflow
        if (itemList.length > 95) {

            var newList = itemList.substring(0, 95);
            newList += '...';
            return newList;

        } else {
            return itemList;
        }
    }

    //Check if objects are empty
    function isEmpty(obj) {
        return Object.keys(obj).length === 0;
    }

    function outputComponent(order) {
        // const menuItems = order.menuItems.forEach(menu.find(e => e.id === order));
        return (<>

            <div className="orderWrapper" id={order.isActive?.toString()}>
                <div className="orderHeader">
                    <div>
                        <div className="restaurantInfo">{currentRestaurant.name} ({currentRestaurant.address})</div> <div className="isActive">{isActive(order.isActive)}</div>
                    </div>
                </div>

                <div className="orderDetailsWrapper">
                    <div className="orderDetails">
                        <div>
                            {formatDate(order?.dateOrdered, false)} - {order?.price} - {order.menuItems?.length} Items
                        </div>
                        <div>
                            {showItems(currentMenuItems)}
                        </div>
                        <div className="buttonWrapper">
                            <button id="myButton" onClick={() => { toast.error('Coming soon!'); }}>Reorder</button>
                            {/* Still in development (Not in scope) */}
                            <Receipt order={order} restaurant={currentRestaurant} menu={currentMenuItems} user={props.user}></Receipt>
                        </div>
                    </div>
                </div>
            </div>

        </>
        );
    }

    //Return order history component to fill order history
    return (
        <div className="outputComponent">
            {outputComponent(order)}
        </div>
    )
}

export default OrderHistory;