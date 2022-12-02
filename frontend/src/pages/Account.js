import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector} from 'react-redux';
import { update, reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';
import {FormatPhoneNum} from '../helpers/phone-format';
import '../styles/Account.css'
import { toast } from 'react-toastify';
import PostalCode from '../helpers/postal-code-format';
import CountryCodes from '../components/CountryCodes';

const Account = (props) => {
    const [userInfo, setUserInfo] = useState({});
    const [orders, setOrders] = useState({});

    const navigate = useNavigate();
    
    const { user } = useSelector((state) => state.auth);
    
    //Gets user info from local storage
    useEffect(() => {
        // const localUser = JSON.parse(localStorage.getItem('user'));
        // console.log(user.id)
        if (!user) {
            navigate('/login');
        }
        //Uses user info from local storage to search database
    
            const getUser = async () => {

                try{
                    const url = "api/users/" + user.id;
                    const response = await fetch(url);
                    const data = await response.json();
                    setUserInfo(data.user);
                } catch (err){
                    console.error(err)
                }
            } 
            getUser();
            
            const getOrders = async () => {
                try{
                    //Add props.user.id instead of 1
                    const url = "api/orders/" + 1;
                    const response = await fetch(url);
                    const data = await response.json();
                    setOrders(data);
                    
        
                } catch (err){
                    console.error(err)
                }
            }
            getOrders();
        
    }, [navigate, user, userInfo]);
    

    return (
        <div className="backgroundEffect">
            <div className="AccountPage">
                <div className="profileSide">
                    
                    <div className="profileToolBar">
                        <p>Profile</p>
                        <p>* Required</p>
                        <Link to='/order-history'>Order History</Link>
                        <Link to='/account-edit' state={{userInfo: userInfo}}>Edit</Link>
                    </div>
                        <div className="ProfileInformation">
                            <div className="FLName">
                                <div className="firstName">
                                    <div className="standardLayout">
                                        <h2>First Name</h2>
                                        <h2 className="required">*</h2>
                                        <input type="text" id="firstname" name="firstname" value={userInfo.firstname} placeholder={userInfo.firstname} readOnly></input>
                                    </div>
                                </div>
                                <div className="lastName">
                                    <div className="standardLayout">
                                        <h2>Last Name</h2>
                                        <h2 className="required">*</h2>
                                        <input type="text" id="lastname" name="lastname" value={userInfo.lastname} placeholder={userInfo.lastname} readOnly></input>
                                    </div>
                                </div>
                            </div>
                            <div className="emailDiv">
                                <div className="standardLayout">
                                    <h2>Email</h2>
                                    <h2 className="required">*</h2>
                                    <input type="text" id="email" name="email" value={userInfo.email} placeholder={userInfo.email} readOnly></input>
                                </div>
                            </div>
                            <div className="deliveryLocation">
                                <div className="twoLayout">
                                    <h2>Delivery Location</h2>
                                    <h2 className="required">*</h2>
                                    <input type="text" id="dLocation" name="delivery_loc" value={userInfo.delivery_loc} placeholder={userInfo.delivery_loc} readOnly></input>
                                </div>
                            </div>
                            <div className="countryPhone">
                                <div className="countryCode">
                                    <h2>Country Code</h2> 
                                    <div className="twoLayout">
                                        <CountryCodes code={userInfo.details?.country_code}></CountryCodes>
                                    </div>
                                </div>
                                <div className="phoneNumber">
                                    <div className="standardLayout">
                                        <h2>Phone Number</h2>
                                        <input type="text" id="phone_number" name="phone_number" value={userInfo.details?.phone_number} placeholder={userInfo.details?.phone_number} readOnly></input>
                                    </div>
                                </div>
                            </div>
                            <div className="streetAddress">
                                <div className="twoLayout">
                                    <h2>Street Address</h2>
                                    <input type="text" id="address" name="address" value={userInfo.details?.address} placeholder={userInfo.details?.address} readOnly></input>
                                </div>
                            </div>
                            
                            <div className="info">
                            <div className="city">
                                <div className="twoLayout">
                                    <h2 id="city">City</h2>
                                    <input type="text" id="city" name="city" value={userInfo.details?.city} placeholder={userInfo.details?.city} readOnly></input>
                                </div>
                            </div>    
                            <div className="province">
                                <div className="twoLayout">
                                    <h2>Province</h2>
                                    <input type="text" id="province" name="province" value={userInfo.details?.province} placeholder={userInfo.details?.province} readOnly></input>
                                </div>
                            </div>
                            <div className="postal">
                                <div className="twoLayout">
                                    <h2 id="pCode">Postal Code</h2>
                                    {/* PostalCode(userInfo.details?.postal_code)?.toUpperCase().replace(/(.{3})/g, "$1 ") */}
                                    <input type="text" id="postal_code" name="postal_code" value={userInfo.details?.postal_code} placeholder={userInfo.details?.postal_code} readOnly></input>
                                </div>
                            </div>
                            <div className="country">
                                <div className="twoLayout">
                                    <h2>Country</h2>
                                    <input type="text" id="country" name="country" value={userInfo.details?.country} placeholder={userInfo.details?.country} readOnly></input>
                                </div>
                            </div>
                            </div>
                            {/* <div id="saveButton">
                            <input type="submit" id="saveButtonBtn" value="Save"></input>
                            </div> */}
               
                        </div>
                </div>
            </div>
        </div>
    );
}

export default Account;
