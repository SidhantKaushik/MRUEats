import '../styles/Courier.css'
import { useState } from 'react';

const Courier = (props) => {
 

    return (
        <div className="courier-page">
            <div className="active-orders">
                <h3>Active Orders</h3>
            </div>
            <div  className="past-orders">
                <h3>Past Orders</h3>
            </div>
        </div>
    );
}

export default Courier;
