import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Receipt from './Receipt';
import formatPrice from '../helpers/price-format';
import formatDate from '../helpers/date-format';


const OrderHistory = (props) => {
    
    const [order, setOrder] = useState({});
    const [restaurants, setRestaurants] = useState({}); 
    const [menu, setMenu] = useState({});

    const [currentRestaurant, setCurrentRestaurant] = useState({});
    const [currentMenuItems, setCurrentMenuItems] = useState([]);
    const [orderPricing, setOrderPricing] = useState({});

    //Sets order state
    useEffect(() =>{
        
        if(isEmpty(order)){
            setOrder(props?.order);
        }
        if(isEmpty(restaurants)){
            setRestaurants(props?.restaurants.restaurants)
        }
        if(isEmpty(menu)){
            setMenu(props?.menu.menu)
        }

    },[order, props?.order, restaurants, props?.restaurants.restaurants, menu, props?.menu.menu]);
    
    //Sets restaurant state
    useEffect(() => {
        if(!isEmpty(restaurants)){
            const restaurant = restaurants.find(e => e.id === order.restaurantId);
            setCurrentRestaurant(restaurant);
        }else{
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
    useEffect(() =>{

        if(!isEmpty(menu)){
            const menuItems = order.menuItems
            const menuArray = []
            for(const item of menuItems){
                const menuItem = menu.find(e => e.id === item.id)
                menuArray.push(menuItem);
            }
            setCurrentMenuItems(menuArray);
            getPrices(currentMenuItems);
        }else{
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

    function isActive(isActive){
        if(isActive){
            return "In progress";
        }else{
            return "Delivered";
        }
    }
    
    function showItems(menuItems){
        let itemList = "";
        for(let item of menuItems){
            
            if(itemList.length === 0){
                itemList += `${item.name} `;
            }else{
                itemList += `• ${item.name} `;
            }
        }
        //Change value to fit in area
        if(itemList.length > 35){
            
            var newList = itemList.substring(0, 35);
            newList += '...';
            return newList;

        }else{
            return itemList;
        }    
    }

    function getPrices(orderItems){
        const itemCounts = [{}];
        for(const item of orderItems){
            console.log(item);
            itemCounts[item] = itemCounts[item] ? itemCounts[item] + 1 : 1
            console.log(itemCounts)
        }
    }

    //Checks if objects are empty
    function isEmpty(obj){
        return Object.keys(obj).length === 0;
    }

    function outputComponent(order){
                // const menuItems = order.menuItems.forEach(menu.find(e => e.id === order));
                return( <>
                 
                    <div className="orderWrapper">
                        <div className="orderHeader">
                           {currentRestaurant.name} ({currentRestaurant.address}) {isActive(order.isActive)}
                        </div>
                        <div className="orderDetails">
                            <div>
                                {formatDate(order?.dateOrdered, false)} - {formatPrice(order?.price)} - {order.menuItems?.length} Items
                            </div>
                            <div>
                                {showItems(currentMenuItems)} 
                            </div>
                            <div>
                                <button id="myButton" onClick={() =>{toast.error('Coming soon!');}}>Reorder</button>
                                <Receipt order={order} restaurant={currentRestaurant} menu={currentMenuItems}  user={props.user}></Receipt>
                            </div>
                       </div>
                    </div>
                    
                   </>
               );
            }
            
    return (
        <div>
            {outputComponent(order)}
        </div>
    )
}

export default OrderHistory;