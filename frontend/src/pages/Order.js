//import logo from '../logo.svg'
import '../styles/Order.css'

function Order() {
    return (
        <div className="OrderPage">
            <div className="OrderBanner">
               {/* <img src={logo} className="restrauntImage" alt="logo" />*/}
                <div className="firstLine">
                    <h1 className="restrauntName">Booster Juice</h1>
                    <div className="stars">XXXXX</div>
                </div>
                <div className="secondLine">
                    <h2 className="address">4703 130th Avenue Souteast •</h2>
                    <h2 className="deliveryCost">$3.09 Delivery</h2>
                </div>
                <div className="thirdLine">
                    <h2 className="deliveryHours">Delivery Hours: 8:00AM - 7:30PM •</h2>
                    <h2 className="openStatus">OPEN</h2>
                </div>
            </div>
            <div className="mainContent">
                <div className="orderDetails">
                    <h2>Your Order</h2>
                    <div className="itemsSelected">
                        {/* TODO */}
                    </div>
                    <div className="optionalItem">
                        {/* TODO */}
                    </div>
                    <div className="totalCalculation">
                        {/* TODO */}
                    </div>
                </div>
                <div className="deliveryOptions">
                    <h2>Delivery Options</h2>
                    {/* TODO:
                    Image of Map */}
                    <div className="addressShowCase">
                        {/* TODO: Implement Address selector and edit button */}
                        {/* TODO: Add delivery preference */}
                    </div>
                </div>
                <div className="paymentInfo">
                    <h2>Payment</h2>
                    <div className="eTransferButton">e-Transfer</div>
                    <div className="cashButton">Cash</div>
                </div>
            </div>
        </div>
    );
  }
  
  export default Order;
  