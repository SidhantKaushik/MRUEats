import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Receipt from './Receipt';

const OrderHistory = (props) => {
    
    const [order, setOrder] = useState({});
    const [restaurants, setRestaurants] = useState({}); 
    const [menu, setMenu] = useState({});

    const [currentRestaurant, setCurrentRestaurant] = useState({});
    const [currentMenuItems, setCurrentMenuItems] = useState({});

    useEffect(() =>{
        
        if(isEmpty(order) && isEmpty(restaurants) && isEmpty(menu)){
            setOrder(props?.order);
            setRestaurants(props?.restaurants.restaurants);
            setMenu(props?.menu.menu);
        }
    },[menu, order, restaurants]);

    useEffect(() => {
        if(!isEmpty(restaurants)){
            const restaurant = restaurants.find(e => e.id === order.restaurantId);
            setCurrentRestaurant(restaurant);
        }
    }, [order.restaurantId, restaurants]);
   
    function isActive(isActive){
        if(isActive){
            return "In progress";
        }else{
            return "Delivered";
        }
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
                                {order?.dateOrdered} - {order?.price} - Number of items
                            </div>
                            <div>
                                Items
                            </div>
                            <div>
                                <button id="myButton" onClick={() =>{toast.error('Coming soon!');}}>Reorder</button>
                                <Receipt order={order} restaurant={currentRestaurant} menu={currentMenuItems}></Receipt>
                            </div>
                       </div>
                    </div>
                    
                   </>
               );
            }
            
            
        
        
    function isEmpty(obj){
        return Object.keys(obj).length === 0;
    }
    

    return (
        <div>
            {outputComponent(order)}
        </div>
    )
}

export default OrderHistory;