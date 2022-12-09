import React from "react";
import '../styles/Popup.css'
import { FaRegWindowClose } from "react-icons/fa";

const Popup = props => {
  return (
    <div className="popup-box">
      <div className="CenteringPopup">
        <div className="popup-container">
          <span className="close-icon" onClick={props.handleClose}><FaRegWindowClose /></span>
          {props.content}
        </div>
      </div>
    </div>
  );
};

export default Popup;