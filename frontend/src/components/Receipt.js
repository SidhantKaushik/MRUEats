import { toast } from 'react-toastify';
import Popup from 'reactjs-popup';
import '../styles/Receipt.css'
import 'reactjs-popup/dist/index.css';

export default (props) => (

    <Popup
    trigger={<button className="button" id="myButton"> Receipt </button>}
    modal
    nested
  >
    {close => (
      <div className="modal">
        <button className="close" onClick={close}>
          &times;
        </button>
        <div className="header">Receipt</div>
        <div className="content">
          {' '}
          {props.restaurant.name} <br/>
          <div>Menu Item:{'              '}Price </div>
          <div>Total: {props.order.price}</div>

        </div>
        <div className="actions">
            <span>
              
            </span>
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


