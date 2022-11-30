import '../styles/Courier.css'
import { useState, useEffect } from 'react';

const Courier = (props) => {

    const [orders, setOrders] = useState([]);
    const [restaurants, setRestaurants] = useState([]);
    const [menus, setMenus] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const getOrders = async () => {
            try {
              const url = "http://localhost:3000/api/orders/all";
              const response = await fetch(url);
              const data = await response.json();
              setOrders(data);
            } catch (err) {
              console.error(err);
            }
          }
    
        getOrders();
        console.log(orders);

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

        const getUsers = async () => {
            try {
              const url = "http://localhost:3000/api/users/";
              const response = await fetch(url);
              const data = await response.json();
              setUsers(data);
            } catch (err) {
              console.error(err);
            }
          }
    
        getUsers();
  
      }, [])
 
    return (
        <div className="courier-page">
            <div className="active-orders">
                <h3>Active Orders</h3>
                <div className='active-container'>
                    <div className='order-item'>
                        <img className='order-logo' alt="logo" src='https://cdn.statically.io/img/harbourcats.com/wp-content/uploads/2016/07/BoosterJ_MasterLogo_Rinkboards-002-970x624.jpg?quality=100&f=auto'></img>
                        <div className='order-info'>
                            <h4 className='order-resto-title'>Title</h4>
                            <p>Date:</p>
                            <p>Total Price:</p>
                            <p>Number of Items:</p>
                            <p>User:</p>
                            <p>Address:</p>
                        </div>
                        <div className='status-info'>
                            <button className='status-button'>Mark As Complete</button>
                        </div>
                    </div>
                    <div className='order-item'>
                        <img className='order-logo' alt="logo" src='https://cdn.statically.io/img/harbourcats.com/wp-content/uploads/2016/07/BoosterJ_MasterLogo_Rinkboards-002-970x624.jpg?quality=100&f=auto'></img>
                        <div className='order-info'>
                            <h4 className='order-resto-title'>Title</h4>
                            <p>Date:</p>
                            <p>Total Price:</p>
                            <p>Number of Items:</p>
                            <p>User:</p>
                            <p>Address:</p>
                        </div>
                        <div className='status-info'>
                            <button className='status-button'>Mark As Complete</button>
                        </div>
                    </div>
                </div>
            </div>
            <div  className="past-orders">
                <h3>Past Orders</h3>
                <div className='past-container'>
                <div className='order-item'>
                        <img className='order-logo' alt="logo" src='https://cdn.statically.io/img/harbourcats.com/wp-content/uploads/2016/07/BoosterJ_MasterLogo_Rinkboards-002-970x624.jpg?quality=100&f=auto'></img>
                        <div className='order-info'>
                            <h4 className='order-resto-title'>Title</h4>
                            <p>Date:</p>
                            <p>Total Price:</p>
                            <p>Number of Items:</p>
                            <p>User:</p>
                            <p>Address:</p>
                        </div>
                        <div className='status-info'>
                            <button className='status-button'>Mark As Complete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Courier;
