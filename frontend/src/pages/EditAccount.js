import React,{useEffect, useState} from "react";
import '../styles/Account.css'
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import CountryCodes from "../components/CountryCodes";
import ProvinceList from "../components/ProvinceList";
import { InputPhoneNumber, FormatPhoneNum } from "../helpers/phone-format";
import PostalCode from "../helpers/postal-code-format";
import axios from "axios";
import Autocomplete from "react-google-autocomplete";
const API_URL = '/api/users/';

const EditAccount = (props) => {
    //Check if currentUser is logged in
    //Needed for passing state through <Link>s
    const location = useLocation();
    const {currentUser} = location.state;

    const [firstName, setFirstName] = useState({});
    const [lastName, setLastName] = useState({});
    const [deliveryLoc, setDeliveryLoc] = useState({});
    const [countryCode, setCountryCode] = useState({});
    const [phoneNum, setPhoneNum] = useState({});
    const [address, setAddress] = useState({});
    const [province, setProvince] = useState({});
    const [city, setCity] = useState({});
    const [postalCode, setPostalCode] = useState({});
    
    const { user } = useSelector((state) => state.auth);
    
    const navigate = useNavigate();
    
    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [navigate, user]);
    
    const onChange = (e) => {
        
        if(e.target.name === 'firstname'){
            setFirstName(e.target.value);
        }    
        if(e.target.name === 'lastname'){
            setLastName(e.target.value);
        }
        if(e.target.name === 'delivery_loc'){
            setDeliveryLoc(e.target.value);
        }
        if(e.target.name === 'address'){
            setAddress(e.target.value);
        }
        if(e.target.name === 'city'){
            setCity(e.target.value);
        }
        if(e.target.name === 'postal_code'){
            setPostalCode(e.target.value);
        }
        
    }
    //Need to add wrong inputs
    const onSubmit = (e) => {
        
        e.preventDefault();
        
        const formattedPostalCode = PostalCode(postalCode)?.toUpperCase().replace(/(.{3})/g, "$1 ");
        
        const userData = {
            id: currentUser._id,
            email: currentUser.email,
            firstname: isFilled(firstName) ? currentUser.firstname : firstName,
            lastname: isFilled(lastName) ? currentUser.lastname : lastName,
            address: isEmpty(address) ? currentUser.details?.address : address,
            delivery_loc: isEmpty(deliveryLoc) ? currentUser.delivery_loc : deliveryLoc,
            country_code: isEmpty(countryCode) ? currentUser.details?.country_code : countryCode,
            phone_number: isEmpty(phoneNum) ? currentUser.details?.phone_number : phoneNum,
            postal_code: isEmpty(formattedPostalCode) ? currentUser.details?.postal_code : formattedPostalCode,
            province: isEmpty(province) ? currentUser.details?.province : province,
            city: isEmpty(city) ? currentUser.details?.city : city,
            country: currentUser.details?.country
            
        }
        updateUserInfo(userData);
        navigate('/account');
        
        
    }

    function isFilled(value){
        return value.length >= 0;
    }
    
    function isEmpty(obj){
        
        return Object.keys(obj).length === 0;
        
    }
    
    //Formats phone number
    const formattedPhoneNum = FormatPhoneNum(currentUser.details?.phone_number);
    
    //PUT for user info
    const updateUserInfo = async (userData) => {
        
        
        const response = await axios.put(API_URL + 'UPDATE', userData);
        
        if (response.data) {
            console.log(response.data);
        }
        return response.data;
        
    }
   
    return (
        <div className="backgroundEffect">
        <div className="AccountPage">
        <div className="profileSide">
        <div className="profileToolBar">
        <p>Profile</p>
        <p>* Required</p>
        </div>
        <form onSubmit={onSubmit}>
        <div className="ProfileInformation">
        <div className="FLName">
        <div className="firstName">
        <div className="standardLayout">
        <h2>First Name</h2>
        <h2 className="required">*</h2>
        <input type="text" id="firstname" name="firstname" placeholder={currentUser.firstname}  onChange={onChange}></input>
        </div>
        </div>
        <div className="lastName">
        <div className="standardLayout">
        <h2>Last Name</h2>
        <h2 className="required">*</h2>
        <input type="text" id="lastname" name="lastname" placeholder={currentUser.lastname} onChange={onChange}></input>
        </div>
        </div>
        </div>
        <div className="emailDiv">
        <div className="standardLayout">
        <h2>Email</h2>
        <h2 className="required">Permanent</h2>
        <input type="text" id="email" name="email" value={currentUser.email} placeholder={currentUser.email} readOnly></input>
        </div>
        </div>
        <div className="deliveryLocation">
        <div className="twoLayout">
        <h2>Delivery Location</h2>
        <h2 className="required">*</h2>
        <input type="text" id="dLocation" name="delivery_loc" placeholder={currentUser.delivery_loc} onChange={onChange}></input>
        </div>
        </div>
        <div className="countryPhone">
        <div className="countryCode">
            <h2>Country Code</h2>
        <div className="twoLayout">
        
        <CountryCodes code={currentUser.details?.country_code} isActive={true} setCountryCode={setCountryCode}></CountryCodes>
        </div>
        </div>
        <div className="phoneNumber">
        <div className="standardLayout">
        <h2>Phone Number</h2>
        <InputPhoneNumber num={formattedPhoneNum} setPhoneNum={setPhoneNum} isActive={true}></InputPhoneNumber>
        {/* <input type="number" id="phone_number" name="phone_number" value={phoneNum} placeholder={currentUser.details?.phone_number} onChange={onChange}></input> */}
        </div>
        </div>
        </div>
        <div className="streetAddress">
        <div className="twoLayout">
        <h2>Street Address</h2>
        {/* <Autocomplete apiKey={'AIzaSyDfqQTDbhIl14z0v12wC0xvdRPr7abl_Ww'} onPlaceSelected={(place) => {
            // setCity(place.)
            console.log(place)}}></Autocomplete> */}
            <input type="text" id="address" name="address" placeholder={currentUser.details?.address} onChange={onChange}></input>
            </div>
            </div>
            
            <div className="info">
            <div className="city">
            <div className="twoLayout">
            <h2 id="city">City</h2>
            <Autocomplete apiKey={'AIzaSyDfqQTDbhIl14z0v12wC0xvdRPr7abl_Ww'} onPlaceSelected={(place) => {console.log(place);
                setCity(place.address_components[0]);
                setProvince(place.address_components[(place.address_components.length - 2)])
                console.log(place.address_components[(place.address_components.length - 2)])        
            }} options={{ types: ["(cities)"], componentRestrictions: {country: "ca"}}} defaultValue={currentUser.city} />
            {/* <input type="text" id="city" name="city" placeholder={currentUser.details?.city} onChange={onChange}></input> */}
            </div>
            </div>    
            <div className="province">
                <h2>Province</h2>
            <div className="twoLayout">
            
            <ProvinceList province={currentUser.details?.province} setProvince={setProvince}></ProvinceList>
            </div>
            </div>
            <div className="postal">
            <div className="twoLayout">
            <h2 id="pCode">Postal Code</h2>
            <input type="text" id="postal_code" name="postal_code" placeholder={currentUser.details?.postal_code} onChange={onChange}></input>
            </div>
            </div>
            <div className="country">
            <div className="twoLayout">
            <h2>Country</h2>
            <h2 className="required">Permanent</h2>
            <input type="text" id="country" name="country" value={currentUser.details?.country} placeholder={currentUser.details?.country} readOnly></input>
            </div>
            </div>
            </div>
            
            <div id="saveButton">
            <input type="submit" id="saveButtonBtn" value="Save"></input>
            </div>
            <div id="cancelButton">
            {/* <input type="cancel" id="cancelButtonBtn" value="Cancel"></input> */}
            <Link to='/account'>Cancel</Link>
            </div>
            </div>
            </form>
            </div>
            </div>
            </div>
            );
        }
        
        export default EditAccount;