import logo from '../logo.svg';
import '../styles/OrderPage.css'

function OrderPage() {
    return (
        <div className="OrderBanner">
            <img src={logo} className="restrauntImage" alt="logo" />
            <div className="firstLine">
                <h1 className="restrauntName">Booster Juice</h1>
                <div className="stars">XXXXX</div>
            </div>
            <div className="secondLine">
                <h2 className="address">4703 130th Avenue Souteast • </h2>
                <h2 className="deliveryCost">$3.09 Delviery</h2>
            </div>
            <div className="thirdLine">
                <h2 className="deliveryHours">Delivery Hours: 8:00AM - 7:30PM • </h2>
                <h2 className="openStatus">OPEN</h2>
            </div>
        </div>
    );
  }
  
  export default OrderPage;
  