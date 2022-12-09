import '../styles/Courier.css'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
//Passing JWT
import authHeader from "../features/auth/authHeader";
import { toast } from 'react-toastify';

const Courier = (props) => {

  const [activeOrders, setActiveOrders] = useState([]);
  const [completeOrders, setCompleteOrders] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [menus, setMenus] = useState([]);
  const [users, setUsers] = useState([]);


  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

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
        setMenus(data);
      } catch (err) {
        console.error(err);
      }
    }

    getMenus();

    const getUsers = async () => {
      try {
        const url = "api/users/";
        const response = await fetch(url);
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        //console.error(err);
      }
    }

    getUsers();

    const getActiveOrders = async () => {
      try {
        const url = "api/orders/active";
        const response = await fetch(url);
        const data = await response.json();
        setActiveOrders(data);
      } catch (err) {
        console.error(err);
      }
    }

    getActiveOrders();

    const getCompleteOrders = async () => {
      try {
        const url = "api/orders/complete";
        const response = await fetch(url);
        const data = await response.json();
        setCompleteOrders(data);
      } catch (err) {
        console.error(err);
      }
    }

    getCompleteOrders();

  }, [])

  while (!restaurants[0] && !users[0]) {
    return;
  }

  //#region API calls

  const updateOrder = async (orderData) => {

    const response = await axios.put('api/orders/DEACTIVATE', orderData, authHeader);

    if (response.data) {
      toast.success('Successfully deactivated order!');
    }
    return response.data;

  }

  const onMarkAsComplete = (e) => {

    e.preventDefault();

    let id = e.target.id;
    let selectedOrder = activeOrders.find((order) => order.id = id);

    let _id = selectedOrder._id;
    let price = selectedOrder.price;
    let isActive = selectedOrder.isActive;
    let dateOrdered = selectedOrder.dateOrdered;
    let restaurantId = selectedOrder.restaurantId;
    let userId = selectedOrder.userId;

    const orderData = {
      _id,
      id,
      price,
      isActive,
      dateOrdered,
      restaurantId,
      userId
    }

    updateOrder(orderData);
    window.location.reload(false);

  }
  //#endregion

  //#region reformatting order item (grab linked restaurant/user)
  function getMenuItemsByOrder(orderedItems, restId) {
    let namesOfItems = [];
    if (!orderedItems) {
      return "";
    }
    else {
      menus.forEach(RestaurantMenu => {
        if (RestaurantMenu.restaurantId === restId)
          orderedItems.forEach(menuItemID => {
            if (menuItemID.id === RestaurantMenu.id) {
              namesOfItems.push(RestaurantMenu.name)
            }
          })
      });
      const listItems = namesOfItems.map((d) => <ol className={d}>{d}</ol>);
      return (
        <div className='menuItemsOrdered'>
          {listItems}
        </div>
      );
    }
  }
  //this function grabs the list of orders (active or inactive) and maps out the linked restraunt and the linked user
  function reformatOrders(orders) {
    while (!restaurants || !users) {
      return false;
    }
    var ordersData = orders?.map((order) => ({
      id: order.id,
      RestaurantId: order.restaurantId,
      RestaurantName: restaurants.find(rest => rest.id == order.restaurantId)?.name,
      Date: order.dateOrdered,
      Price: order.price,
      User: `${users.find(user => user.id == order.userId)?.firstName} ${users.find(user => user.id == order.userId)?.lastName}`,
      Location: users.find(user => user.id == order.userId)?.deliverTo,
      MenuItems: order.menuItems,
      SpecialInst: order.specialInstructions
    }));

    return ordersData;
  }

  let reformattedActiveOrders = reformatOrders(activeOrders);
  let reformattedCompleteOrders = reformatOrders(completeOrders);

  //#endregion

  return (
    <div className="courier-page">
      <div className='order-container'>
        <div className="active-orders">
          <h3>Active Orders</h3>
          <div className='active-container'>
            {reformattedActiveOrders.length === 0 && <>
              <div className='no-active-orders'>There are currently no active orders.</div>
            </>}
            {reformattedActiveOrders.map((order) =>
              <div className='order-item'>
                <div className='order-info'>
                  <h4 className='order-resto-title'>{order.RestaurantName}</h4>
                  <p>Date: {order.Date}</p>
                  <p>Total Price: {order.Price}</p>
                  <p>User: {order.User}</p>
                  <p>Deliver to: {order.Location}</p>
                  <p>Menu Items: {getMenuItemsByOrder(order.MenuItems, order.RestaurantId)}</p>

                  <p>Special Instructions: {order.SpecialInst}</p>
                </div>
                <div className='order-buttons'>
                  <button className='status-button' id={order.id} onClick={onMarkAsComplete}>Mark As Complete</button>
                </div>

              </div>
            )}

          </div>
        </div>
        <div className="past-orders">
          <h3>Past Orders</h3>
          <div className='past-container'>
            {reformattedCompleteOrders.map((order) =>
              <div className='order-item'>
                <div className='order-info'>
                  <h4 className='order-resto-title'>{order.RestaurantName}</h4>
                  <p>Date: {order.Date}</p>
                  <p>Total Price: {order.Price}</p>
                  <p>User: {order.User}</p>
                  <p>Location: {order.Location}</p>
                  Menu Items: {getMenuItemsByOrder(order.MenuItems, order.RestaurantId)}
                  <p>Special Instructions: {order.SpecialInst}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Courier;
