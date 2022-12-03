import '../styles/Courier.css'
import { useState, useEffect } from 'react';
import Popup from '../components/Popup';

const Courier = (props) => {

    const [activeOrders, setActiveOrders] = useState([]);
    const [completeOrders, setCompleteOrders] = useState([]);
    const [restaurants, setRestaurants] = useState([]);
    const [menus, setMenus] = useState([]);
    const [users, setUsers] = useState([]);

    const [detailedViewIsOpen, setDetailedViewIsOpen] = useState(false);

    useEffect(() => {
        const getOrders = async () => {
            try {
              const url = "api/orders/all";
              const response = await fetch(url);
              const data = await response.json();
              setActiveOrders(data.filter(order => order.isActive = "true"));
              setCompleteOrders(data.filter(order => order.isActive = "false"));
            } catch (err) {
              console.error(err);
            }
          }
    
        getOrders();

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
              console.error(err);
            }
          }
    
        getUsers();
  
      }, [])

    //#region popups

      const toggleDetailedViewPopup = () => {
        setDetailedViewIsOpen(!detailedViewIsOpen);
      }

    //#endregion
 
    return (
        <div className="courier-page">
            <div className="active-orders">
                <h3>Active Orders</h3>
                <div className='active-container'>
                {activeOrders.map((order) =>
                  <div className='order-item'>
                    <div className='order-logo'>
                      <img className='logo' alt="logo" src='https://cdn.statically.io/img/harbourcats.com/wp-content/uploads/2016/07/BoosterJ_MasterLogo_Rinkboards-002-970x624.jpg?quality=100&f=auto'></img>
                    </div>
                    <div className='order-info'>
                      <h4 className='order-resto-title'>Restaurant Name</h4> 
                      {/* users.find(user => user.id = order.user_id); */}
                      {/* restaurants.find(rest => rest.id = order.restaurant_id); */}
                      <p>Date: {order.date_ordered}</p>
                      <p>Total Price: ${order.price}</p>
                      <p>Number of Items:</p>
                      <p>User:</p>
                      <p>Location:</p>
                    </div>
                    <div className='order-buttons'>
                      <button className='status-button'>Mark As Complete</button>
                      <button className='expand-button' onClick={toggleDetailedViewPopup}>View Order Details</button>
                    </div>
                                    
                  </div>                                    
                )}
                    
                {detailedViewIsOpen && <Popup
                  content={<>
                    <h4 className='popup-title'>Ordered Items</h4>
                    <div className='menuItems'>
                      {/* {menu.map((menu) => */}
                      <div className='menuListItem' id=''>
                        <h5 className='menu-list-name'>name • $price</h5>
                      </div>
                      {/* )} */}
                    </div>
                  </>}
                    handleClose={toggleDetailedViewPopup}
                />}
              </div>
            </div>
            <div  className="past-orders">
                <h3>Past Orders</h3>
                <div className='past-container'>
                  {completeOrders.map((order) =>
                    <div className='order-item'>
                      <div className='order-logo'>
                        <img className='logo' alt="logo" src='https://cdn.statically.io/img/harbourcats.com/wp-content/uploads/2016/07/BoosterJ_MasterLogo_Rinkboards-002-970x624.jpg?quality=100&f=auto'></img>
                      </div>
                      <div className='order-info'>
                        <h4 className='order-resto-title'>Title</h4>
                        <p>Date:</p>
                        <p>Total Price:</p>
                        <p>Number of Items:</p>
                        <p>User:</p>
                        <p>Address:</p>
                      </div>
                      <div className='order-buttons'>
                        <button className='status-button'>Mark As Complete</button>
                        <button className='expand-button' onClick={toggleDetailedViewPopup}>View Order Details</button>
                      </div>
                                      
                    </div>                                    
                  )}
                </div>
            </div>
        </div>
    );
}

export default Courier;
