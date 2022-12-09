import { toast } from 'react-toastify';
import Popup from 'reactjs-popup';
import '../styles/Receipt.css'
import 'reactjs-popup/dist/index.css';
import formatDate from '../helpers/date-format';


export default (props) => (
  <Popup
    trigger={<button className="button" id="myButton"> View Receipt </button>}
    modal
    nested
  >
    {close => (
      <div className="modal">
        <button className="close" onClick={close}>
          &times;
        </button>
        <div className="header">
          <h3 className="restaurantName">{props.restaurant.name}</h3>
          <div className="restaurantAddress">{props.restaurant.address}</div>
          <div className="customerName">{props.user.firstName} {props.user.lastName}</div>
          <div className="deliverTo">Delivered to: {props.order.deliverTo}</div>
        </div>
        <div className="content">
          <div className="orderDetails">
            <table className="orderWrapper">
              <tr>
              <th className="orderNum">Order #{props.order.id}</th>
              <th className="mruEats">MRU EATS</th>
              <th className="dateOrdered">{formatDate(props.order?.dateOrdered, true)}</th>
              </tr>
            </table>
            <table className="orderDetailWrapper">
              <tr>
              <th className="itemHeader">Item</th>
              <th className="quantityHeader">Qty</th>
              <th className="priceHeader">Sub Total</th>
              </tr>
              <tr></tr>
            </table>
          </div>
          <div className="pricing">

          </div>
          <div className="footer">
            <div className="itemCount">Item count: {props.menu.length}</div>
            <div className="appreciationMessage">Thank you for choosing MRU Eats!!</div>
          </div>
        </div>
        <div className="actions">
          <button
            className="button" id="myButton"
            onClick={() => {
              toast.error('Coming soon!');
            }}
          >
            Download
          </button>
        </div>
      </div>
    )}
  </Popup>
);


