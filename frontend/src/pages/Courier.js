import '../styles/Courier.css'
import { useState } from 'react';

const Courier = (props) => {
 

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
