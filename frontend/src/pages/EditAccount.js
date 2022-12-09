import React, { useEffect, useState } from "react";
import '../styles/EditAccount.css';
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

    //Needed for passing state through <Link>s
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    //Checks React Redux user state
    useEffect(() => {
        if (!location) {
            navigate('/login');
        }
    }, [location, navigate]);

    const { userInfo } = location.state ? location.state : {};

    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);




    //Checks React Redux user state
    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);



    const [phoneNum, setPhoneNum] = useState('');

    const [formData, setFormData] = useState({
        firstName: userInfo?.firstName,
        lastName: userInfo?.lastName,
        deliverTo: userInfo?.deliverTo,
        address: userInfo?.details?.address,
        phoneNumber: userInfo?.details?.phoneNumber,
        postalCode: userInfo?.details?.postalCode,
    });

    //React Redux state
    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (isSuccess) {
            navigate('/account');
        }

        dispatch(reset());

    }, [isError, isSuccess, message, navigate, dispatch]);

    //Update state when form is changed
    const onChange = (e) => {

        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    }

    //Submits edited account data
    const onSubmit = (e) => {

        e.preventDefault();

        //Postal code input validation
        const formattedPostalCode = PostalCode(formData.postalCode)?.toUpperCase().replace(/(.{3})/g, "$1 ");
        if (formattedPostalCode === undefined && userInfo?.details?.postalCode !== formData.postalCode && formData.postalCode) {
            toast.error('Please input valid postal code');
            return;
        }
        //Phone number validation
        if (phoneNum && phoneNum.length !== 14) {
            toast.error('Please input valid phone number');
            return;
        }

        const userData = {
            _id: userInfo?._id,
            id: userInfo?.id,
            email: userInfo?.email,
            firstName: formData?.firstName,
            lastName: formData?.lastName,
            deliverTo: formData?.deliverTo,
            address: formData?.address,
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
    function checkPostalCode(pCode) {
        if (pCode) {
            const validPostalCode = PostalCode(pCode)?.toUpperCase().replace(/(.{3})/g, "$1 ");
            if (validPostalCode) {
                return true;
            } else {
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
                <div className="profileSide">
                    <div className="wrapper">
                        <div className="profileToolBar">
                            <h2>Profile&nbsp;</h2>
                            <div className="requiredHead">
                                <p className="reqStar">*&nbsp;</p>
                                <p>Required</p>
                            </div>
                        </div>
                        <form onSubmit={onSubmit}>
                            <div className="ProfileInformation">
                                <div className="reqInfo">
                                    <Collapsible open="true" trigger="Required User Information">
                                        <div className="reqInfoWrapper">
                                            <div className="firstName">
                                                <div className="standardLayout">
                                                    <div className="firstNameHeader">
                                                        <h4>First Name&nbsp;</h4>
                                                        <h4 className="reqStar">*</h4>
                                                    </div>
                                                    <input type="text" id="firstName" name="firstName" value={formData.firstName} placeholder={userInfo?.firstName} onChange={onChange}></input>
                                                </div>
                                            </div>
                                            <div className="lastName">
                                                <div className="standardLayout">
                                                    <div className="lastNameHeader">
                                                        <h4>Last Name&nbsp;</h4>
                                                        <h4 className="reqStar">*</h4>
                                                    </div>
                                                    <input type="text" id="lastName" name="lastName" value={formData.lastName} placeholder={userInfo?.lastName} onChange={onChange}></input>
                                                </div>
                                            </div>

                                            <div className="emailDiv">
                                                <div className="standardLayout">
                                                    <div className="emailHeader">
                                                        <h4 className="emailTitle">Email</h4>
                                                    </div>
                                                    <input type="text" className="emailBox" id="email" name="email" value={userInfo?.email} placeholder={userInfo?.email} readOnly></input>
                                                </div>
                                            </div>
                                            <div className="deliveryLocation">
                                                <div className="standardLayout">
                                                    <div className="deliveryLocHeader">
                                                        <h4>Delivery Location&nbsp;</h4>
                                                        <h4 className="reqStar">*</h4>
                                                    </div>
                                                    <input type="text" id="dLocation" name="deliverTo" value={formData.deliverTo} placeholder={userInfo?.deliverTo} onChange={onChange}></input>
                                                </div>
                                            </div>
                                        </div>
                                    </Collapsible>
                                </div>
                                <div className="addInfo">
                                    <Collapsible className="addInfo" trigger="Additional Information">
                                        <div className="addInfoWrapper">
                                            <div className="countryPhone">
                                                <div className="countryCode">
                                                    <div className="standardLayout">
                                                        <h4>Country</h4>
                                                        <div className="countryCodeComp">
                                                            <CountryCodes code={userInfo?.details?.countryCode} isActive={false}></CountryCodes>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="phoneNumber">
                                                    <div className="standardLayout">
                                                        <h4>Phone Number</h4>
                                                        <InputPhoneNumber num={formData.phoneNumber} setPhoneNum={setPhoneNum}></InputPhoneNumber>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Collapsible>
                                </div>
                                <div className="billInfo">
                                    <Collapsible className="billInfo" trigger="Billing Information">
                                        <div className="billInfoWrapper">
                                            <div className="streetAddress">
                                                <div className="standardLayout">
                                                    <h4>Street Address</h4>
                                                    <input type="text" id="address" name="address" value={formData.address} placeholder={userInfo?.details?.address} onChange={onChange}></input>
                                                </div>
                                            </div>
                                            <div className="postal">
                                                <div className="standardLayout">
                                                    <h4 id="pCode">Postal Code</h4>
                                                    <input type="text" id="postalCode" name="postalCode" value={formData.postalCode} placeholder={userInfo?.details?.postalCode} onChange={onChange}></input>
                                                </div>
                                            </div>

                                            <div className="city">
                                                <div className="standardLayout">
                                                    <h4 id="city">City</h4>
                                                    <input type="text" className="cityBox" id="city" name="city" value={userInfo?.details?.city} placeholder={userInfo?.details?.city} readOnly></input>
                                                </div>
                                            </div>
                                            <div className="province">
                                                <div className="standardLayout">
                                                    <h4>Province</h4>
                                                    <input type="text" className="provinceBox" id="province" name="province" value={userInfo?.details?.province} placeholder={userInfo?.details?.province} readOnly></input>
                                                </div>
                                            </div>

                                            <div className="country">
                                                <div className="standardLayout">
                                                    <h4>Country</h4>
                                                    <input type="text" className="countryBox" id="country" name="country" value={userInfo?.details?.country} placeholder={userInfo?.details?.country} readOnly></input>
                                                </div>
                                            </div>
                                        </div>
                                    </Collapsible>
                                </div>
                                <div className="buttonWrapper">
                                    <div id="saveButton">
                                        <button type="submit" id="myButton">Save</button>
                                    </div>

                                    <Link to='/account'>
                                        <div id="cancelButton">
                                            <button type="submit" id="myButton">Cancel</button>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditAccount;