import React, { useEffect, useState } from "react";
import '../styles/EditAccount.css'
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { update, reset } from '../features/auth/authSlice';
import CountryCodes from "../components/CountryCodes";
import { InputPhoneNumber } from "../helpers/phone-format";
import PostalCode from "../helpers/postal-code-format";
import Spinner from '../components/Spinner';
import Collapsible from 'react-collapsible';

const EditAccount = (props) => {
    //Check if userInfo is logged in
    //Needed for passing state through <Link>s
    const location = useLocation();
    const { userInfo } = location.state;

    const [phoneNum, setPhoneNum] = useState('');


    const [formData, setFormData] = useState({
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        deliverTo: userInfo.deliverTo,
        address: userInfo.details?.address,
        phoneNumber: userInfo.details?.phoneNumber,
        postalCode: userInfo.details?.postalCode,
    });

    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        
        if (!user){
            navigate('/login');
        }

        if (isError) {
            toast.error(message);
        }

        if (isSuccess) {
            navigate('/account');
        }

        dispatch(reset());

    }, [user, isError, isSuccess, message, navigate, dispatch]);

    const onChange = (e) => {

        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));


    }

    //Need to add wrong inputs
    const onSubmit = (e) => {

        e.preventDefault();
        
        //Postal code input validation
        const formattedPostalCode = PostalCode(formData.postalCode)?.toUpperCase().replace(/(.{3})/g, "$1 ");
        if(formattedPostalCode === undefined && userInfo.details?.postalCode !== formData.postalCode && formData.postalCode){
            toast.error('Please input valid postal code');
            return;
        }

        if(phoneNum && phoneNum.length !== 14){
            toast.error('Please input valid phone number');
            return;
        }

        const userData = {
            _id: userInfo._id,
            id: userInfo.id,
            email: userInfo.email,
            firstName: formData.firstName,
            lastName: formData.lastName,
            deliverTo: formData.deliverTo,
            address: formData.address,
            countryCode: userInfo.details?.countryCode,
            phoneNumber: phoneNum,
            postalCode: checkPostalCode(formData.postalCode) ? formattedPostalCode : formData.postalCode,
            city: userInfo.details?.city,
            province: userInfo.details?.province,
            country: userInfo.details?.country
        }
        dispatch(update(userData));
    }

    //Check if entered postal code is valid format
    function checkPostalCode (pCode){
        if(pCode){
            const validPostalCode = PostalCode(pCode)?.toUpperCase().replace(/(.{3})/g, "$1 ");
            if(validPostalCode){
                return true;
            }else{
                return false;
            }
        }
    }

    if (isLoading) {
        return <Spinner />;
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
                                            <input type="text" id="firstName" name="firstName" value={formData.firstName} placeholder={userInfo.firstName} onChange={onChange}></input>
                                        </div>
                                    </div>
                                    <div className="lastName">
                                        <div className="standardLayout">
                                            <h2>Last Name</h2>
                                            <h2 className="required">*</h2>
                                            <input type="text" id="lastName" name="lastName" value={formData.lastName} placeholder={userInfo.lastName} onChange={onChange}></input>
                                        </div>
                                    </div>
                                </div>
                                <div className="emailDiv">
                                    <div className="standardLayout">
                                        <h2>Email</h2>
                                        <h2 className="required">Permanent</h2>
                                        <input type="text" id="email" name="email" value={userInfo.email} placeholder={userInfo.email} readOnly></input>
                                    </div>
                                </div>
                                <div className="deliveryLocation">
                                    <div className="twoLayout">
                                        <h2>Delivery Location</h2>
                                        <h2 className="required">*</h2>
                                        <input type="text" id="dLocation" name="deliverTo" value={formData.deliverTo} placeholder={userInfo.deliverTo} onChange={onChange}></input>
                                    </div>
                                </div>
                                </Collapsible>
                                <Collapsible className="addInfo" trigger="Additional Information">
                                <div className="countryPhone">
                                    <div className="countryCode">
                                        <h2>Country Code</h2>
                                        <div className="twoLayout">
                                            <CountryCodes code={userInfo.details?.countryCode} isActive={false}></CountryCodes>
                                        </div>
                                    </div>
                                    <div className="phoneNumber">
                                        <div className="standardLayout">
                                            <h2>Phone Number</h2>
                                            <InputPhoneNumber num={formData.phoneNumber} setPhoneNum={setPhoneNum}></InputPhoneNumber>
                                            {/* <input type="number" id="phoneNumber" name="phoneNumber" value={phoneNum} placeholder={userInfo.details?.phoneNumber} onChange={onChange}></input> */}
                                        </div>
                                    </div>
                                </div>
                                </Collapsible>
                                <Collapsible className="billInfo" trigger="Billing Information">
                                <div className="streetAddress">
                                    <div className="twoLayout">
                                        <h2>Street Address</h2>
                                        <input type="text" id="address" name="address" value={formData.address} placeholder={userInfo.details?.address} onChange={onChange}></input>
                                    </div>
                                </div>

                                <div className="info">
                                    <div className="city">
                                        <div className="twoLayout">
                                            <h2 id="city">City</h2>
                                            {/* Add API key to .env?
                                            <Autocomplete apiKey={'AIzaSyDfqQTDbhIl14z0v12wC0xvdRPr7abl_Ww'} onPlaceSelected={(place) => {
                                                console.log(place);
                                                setCity(place.address_components[0]);
                                                setProvince(place.address_components[(place.address_components.length - 2)])
                                            }} options={{ types: ["(cities)"], componentRestrictions: { country: "ca" } }} /> */}
                                            <input type="text" id="city" name="city" value={userInfo.details?.city} placeholder={userInfo.details?.city} readOnly></input>
                                        </div>
                                    </div>
                                    <div className="province">
                                        <h2>Province</h2>
                                        <div className="twoLayout">
                                            <input type="text" id="province" name="province" value={userInfo.details?.province} placeholder={userInfo.details?.province} readOnly></input>
                                        </div>
                                    </div>
                                    <div className="postal">
                                        <div className="twoLayout">
                                            <h2 id="pCode">Postal Code</h2>
                                            <input type="text" id="postalCode" name="postalCode" value={formData.postalCode} placeholder={userInfo.details?.postalCode} onChange={onChange}></input>
                                        </div>
                                    </div>
                                    <div className="country">
                                        <div className="twoLayout">
                                            <h2>Country</h2>
                                            <input type="text" id="country" name="country" value={userInfo.details?.country} placeholder={userInfo.details?.country} readOnly></input>
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