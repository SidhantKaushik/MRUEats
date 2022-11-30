import React, { useEffect, useState } from "react";
import '../styles/EditAccount.css'
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import CountryCodes from "../components/CountryCodes";
import ProvinceList from "../components/ProvinceList";
import { InputPhoneNumber, FormatPhoneNum } from "../helpers/phone-format";
import PostalCode from "../helpers/postal-code-format";
import axios from "axios";
import Autocomplete from "react-google-autocomplete";
import Collapsible from 'react-collapsible';
const API_URL = '/api/users/';

const EditAccount = (props) => {
    //Check if currentUser is logged in
    //Needed for passing state through <Link>s
    const location = useLocation();
    const { currentUser } = location.state;

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [deliveryLoc, setDeliveryLoc] = useState('');
    const [countryCode, setCountryCode] = useState();
    const [phoneNum, setPhoneNum] = useState('');
    const [address, setAddress] = useState('');
    const [province, setProvince] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');

    const [formData, setFormData] = useState({
        _id: currentUser._id,
        email: currentUser.email,
        firstname: currentUser.firstname,
        lastname: currentUser.lastname,
        delivery_loc: currentUser.delivery_loc,
        address: currentUser.details?.address,
        country_code: currentUser.details?.country_code,
        phone_number: currentUser.details?.phone_number,
        postal_code: currentUser.details?.postal_code,
        province: currentUser.details?.province,
        city: currentUser.details?.city,
        country: currentUser.details?.country
    });

    const { user } = useSelector((state) => state.auth);

    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [navigate, user]);

    const onChange = (e) => {

        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));

        console.log(formData);

        // if(e.target.name === 'firstname'){
        //     setFirstName(e.target.value);
        // }    
        // if(e.target.name === 'lastname'){
        //     setLastName(e.target.value);
        // }
        // if(e.target.name === 'delivery_loc'){
        //     setDeliveryLoc(e.target.value);
        // }
        // if(e.target.name === 'address'){
        //     setAddress(e.target.value);
        // }
        // if(e.target.name === 'city'){
        //     setCity(e.target.value);
        // }
        // if(e.target.name === 'postal_code'){
        //     setPostalCode(e.target.value);
        // }

    }
    //Need to add wrong inputs
    const onSubmit = (e) => {

        e.preventDefault();

        const formattedPostalCode = PostalCode(formData.postal_code)?.toUpperCase().replace(/(.{3})/g, "$1 ");
        const userData = {
            id: formData._id,
            email: formData.email,
            firstname: formData.firstname,
            lastname: formData.lastname,
            delivery_loc: formData.delivery_loc,
            address: formData.address,
            country_code: formData.country_code,
            phone_number: formData.phone_number,
            postal_code: formattedPostalCode,
            province: formData.province,
            city: formData.city,
            country: formData.country

        }
        updateUserInfo(userData);
        navigate('/account');
    }

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
            <div className="EditAccountPage">
                    <div className="profileToolBar">
                        <p>Profile</p>
                        <p>* Required</p>
                    </div>
                    <form onSubmit={onSubmit}>
                        <div className="ProfileInformation">
                            <Collapsible className="reqInfo" trigger="Required User Information">
                                <div className="FLName">
                                    <div className="firstName">
                                        <div className="standardLayout">
                                            <h2>First Name</h2>
                                            <h2 className="required">*</h2>
                                            <input type="text" id="firstname" name="firstname" value={formData.firstname} placeholder={currentUser.firstname} onChange={onChange}></input>
                                        </div>
                                    </div>
                                    <div className="lastName">
                                        <div className="standardLayout">
                                            <h2>Last Name</h2>
                                            <h2 className="required">*</h2>
                                            <input type="text" id="lastname" name="lastname" value={formData.lastname} placeholder={currentUser.lastname} onChange={onChange}></input>
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
                                        <input type="text" id="dLocation" name="delivery_loc" value={formData.delivery_loc} placeholder={currentUser.delivery_loc} onChange={onChange}></input>
                                    </div>
                                </div>
                            </Collapsible>
                            <Collapsible className="addInfo" trigger="Additional Information">
                                <div className="countryPhone">
                                    <div className="countryCode">
                                        <h2>Country Code</h2>
                                        <div className="twoLayout">

                                            <CountryCodes code={formData.country_code} isActive={false} setCountryCode={setCountryCode}></CountryCodes>
                                        </div>
                                    </div>
                                    <div className="phoneNumber">
                                        <div className="standardLayout">
                                            <h2>Phone Number</h2>
                                            <InputPhoneNumber num={formData.phone_number} setPhoneNum={setPhoneNum} isActive={true}></InputPhoneNumber>
                                            {/* <input type="number" id="phone_number" name="phone_number" value={phoneNum} placeholder={currentUser.details?.phone_number} onChange={onChange}></input> */}
                                        </div>
                                    </div>
                                </div>
                            </Collapsible>
                            <Collapsible className="billInfo" trigger="Billing Information">
                                <div className="streetAddress">
                                    <div className="twoLayout">
                                        <h2>Street Address</h2>
                                        {/* <Autocomplete apiKey={'AIzaSyDfqQTDbhIl14z0v12wC0xvdRPr7abl_Ww'} onPlaceSelected={(place) => {
            // setCity(place.)
            console.log(place)}}></Autocomplete> */}
                                        <input type="text" id="address" name="address" value={formData.address} placeholder={currentUser.details?.address} onChange={onChange}></input>
                                    </div>
                                </div>

                                <div className="info">
                                    <div className="city">
                                        <div className="twoLayout">
                                            <h2 id="city">City</h2>
                                            {/* Add API key to .env? */}
                                            <Autocomplete apiKey={'AIzaSyDfqQTDbhIl14z0v12wC0xvdRPr7abl_Ww'} onPlaceSelected={(place) => {
                                                console.log(place);
                                                setCity(place.address_components[0]);
                                                setProvince(place.address_components[(place.address_components.length - 2)])
                                            }} options={{ types: ["(cities)"], componentRestrictions: { country: "ca" } }} />
                                            {/* <input type="text" id="city" name="city" placeholder={currentUser.details?.city} onChange={onChange}></input> */}
                                        </div>
                                    </div>
                                    <div className="province">
                                        <h2>Province</h2>
                                        <div className="twoLayout">

                                            <ProvinceList province={formData.province} setProvince={setProvince}></ProvinceList>
                                            <input type="text" id="province" name="province" value={formData.province} placeholder={currentUser.details?.province} onChange={onChange}></input>
                                        </div>
                                    </div>
                                    <div className="postal">
                                        <div className="twoLayout">
                                            <h2 id="pCode">Postal Code</h2>
                                            <input type="text" id="postal_code" name="postal_code" value={formData.postal_code} placeholder={currentUser.details?.postal_code} onChange={onChange}></input>
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
                            </Collapsible>
                                <div id="saveButton">
                                    <input type="submit" id="saveButtonBtn" value="Save"></input>
                                </div>

                                <Link to='/account'>
                                    <div id="cancelButton">
                                        <input type="submit" id="cancelButtonBtn" value="Cancel"></input>
                                    </div>
                                </Link>

                        </div>
                    </form>
            </div>
        </div>
    );
}

export default EditAccount;