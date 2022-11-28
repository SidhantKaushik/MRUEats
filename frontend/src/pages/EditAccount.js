import React,{useState} from "react";
import { useNavigate, Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import CountryCodes from "../components/CountryCodes";
import ProvinceList from "../components/ProvinceList";

const EditAccount = (props) => {

    //Needed for passing state through <Link>s
    const location = useLocation();
    const {user} = location.state;

    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        delivery_loc: "",
        //email?


    });

    console.log(user)
    //onSubmit for cancel and save
    //Check Postal Code 
    //Check Phone Number
    //Check City is all letters
    return (
        <div className="backgroundEffect">
            <div className="AccountPage">
                <div className="profileSide">
                    <div className="profileToolBar">
                        <p>Profile</p>
                        <p>* Required</p>
                    </div>
                        <div className="ProfileInformation">
                            <div className="FLName">
                                <div className="firstName">
                                    <div className="standardLayout">
                                        <h2>First Name</h2>
                                        <h2 className="required">*</h2>
                                        <input type="text" id="firstname" name="firstname" placeholder={user.firstname} ></input>
                                    </div>
                                </div>
                                <div className="lastName">
                                    <div className="standardLayout">
                                        <h2>Last Name</h2>
                                        <h2 className="required">*</h2>
                                        <input type="text" id="lastname" name="lastname" placeholder={user.lastname}></input>
                                    </div>
                                </div>
                            </div>
                            <div className="emailDiv">
                                <div className="standardLayout">
                                    <h2>Email</h2>
                                    <h2 className="required">Permanent</h2>
                                    <input type="text" id="email" name="email" value={user.email} placeholder={user.email} readOnly></input>
                                </div>
                            </div>
                            <div className="deliveryLocation">
                                <div className="twoLayout">
                                    <h2>Delivery Location</h2>
                                    <h2 className="required">*</h2>
                                    <input type="text" id="dLocation" name="dLocation" placeholder={user.delivery_loc}></input>
                                </div>
                            </div>
                            <div className="countryPhone">
                                <div className="countryCode">
                                    <div className="twoLayout">
                                        <h2>Country Code</h2>
                                        <CountryCodes code={user.details?.country_code} isActive={true}></CountryCodes>
                                    </div>
                                </div>
                                <div className="phoneNumber">
                                    <div className="standardLayout">
                                        <h2>Phone Number</h2>
                                        
                                        <input type="number" id="phone_number" name="phone_number" placeholder={user.details?.phone_number} ></input>
                                    </div>
                                </div>
                            </div>
                            <div className="streetAddress">
                                <div className="twoLayout">
                                    <h2>Street Address</h2>
                                    <input type="text" id="address" name="address" placeholder={user.details?.address} ></input>
                                </div>
                            </div>
                            
                            <div className="info">
                            <div className="city">
                                <div className="twoLayout">
                                    <h2 id="city">City</h2>
                                    <input type="text" id="city" name="city" placeholder={user.details?.city}></input>
                                </div>
                            </div>    
                            <div className="province">
                                <div className="twoLayout">
                                    <h2>Province</h2>
                                    <ProvinceList province={user.details?.province} ></ProvinceList>
                                </div>
                            </div>
                            <div className="postal">
                                <div className="twoLayout">
                                    <h2 id="pCode">Postal Code</h2>
                                    <input type="text" id="postal_code" name="postal_code" placeholder={user.details?.postal_code}></input>
                                </div>
                            </div>
                            <div className="country">
                                <div className="twoLayout">
                                    <h2>Country</h2>
                                    <h2 className="required">Permanent</h2>
                                    <input type="text" id="country" name="country" value={user.details?.country} placeholder={user.details?.country} readOnly></input>
                                </div>
                            </div>
                            </div>
                            <div id="saveButton">
                            <input type="submit" id="saveButtonBtn" value="Save"></input>
                            </div>
                            <div id="cancelButton">
                            <input type="submit" id="saveButtonBtn" value="Cancel"></input>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    );
}

export default EditAccount;