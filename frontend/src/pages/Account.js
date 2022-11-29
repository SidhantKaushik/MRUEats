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
import OrderHistory from '../components/OrderHistory';

const Account = (props) => {
    const [currentUser, setCurrentUser] = useState({});
    const [orders, setOrders] = useState({});
    

    const navigate = useNavigate();
    
    //const { user } = useSelector((state) => state.auth);

    //Gets user info from local storage
    useEffect(() => {
        
        const user = JSON.parse(localStorage.getItem('user'));
    
        if (!user) {
            navigate('/login');
        }
        //Uses user info from local storage to search database
        if (user){
            const getUser = async () => {

                try{
                    const url = "api/users/" + user.id;
                    const response = await fetch(url);
                    const data = await response.json();
                    setCurrentUser(data.user[0]);
                } catch (err){
                    console.error(err)
                }
            } 
            getUser();
        }

        if(currentUser && user){

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
        }
    }, [navigate, currentUser]);

    // useEffect(() => {

    //     const getOrders = async () => {
    //         try{
    //             //Add props.user.id instead of 1
    //             const url = "api/orders/" + 1;
    //             const response = await fetch(url);
    //             const data = await response.json();
    //             console.log(data)
    //             setOrders(data);
                
    
    //         } catch (err){
    //             console.error(err)
    //         }
    //     }
    //     getOrders();

    // }, []);

    //Update
    const formattedPhoneNum = FormatPhoneNum(currentUser.details?.phone_number);
    const formattedPostalCode = PostalCode(currentUser.details?.postal_code)?.toUpperCase().replace(/(.{3})/g, "$1 ");
    
    
    return (
        <div className="backgroundEffect">
            <div className="AccountPage">
                <div className="profileSide">
                    
                    <div className="profileToolBar">
                        <p>Profile</p>
                        <p>* Required</p>
                        <Link to='/account-edit' state={{currentUser: currentUser}}>Edit</Link>
                    </div>
                        <div className="ProfileInformation">
                            <div className="FLName">
                                <div className="firstName">
                                    <div className="standardLayout">
                                        <h2>First Name</h2>
                                        <h2 className="required">*</h2>
                                        <input type="text" id="firstname" name="firstname" value={currentUser.firstname} placeholder={currentUser.firstname} readOnly></input>
                                    </div>
                                </div>
                                <div className="lastName">
                                    <div className="standardLayout">
                                        <h2>Last Name</h2>
                                        <h2 className="required">*</h2>
                                        <input type="text" id="lastname" name="lastname" value={currentUser.lastname} placeholder={currentUser.lastname} readOnly></input>
                                    </div>
                                </div>
                            </div>
                            <div className="emailDiv">
                                <div className="standardLayout">
                                    <h2>Email</h2>
                                    <h2 className="required">*</h2>
                                    <input type="text" id="email" name="email" value={currentUser.email} placeholder={currentUser.email} readOnly></input>
                                </div>
                            </div>
                            <div className="deliveryLocation">
                                <div className="twoLayout">
                                    <h2>Delivery Location</h2>
                                    <h2 className="required">*</h2>
                                    <input type="text" id="dLocation" name="dLocation" value={currentUser?.deliver_location} placeholder={currentUser?.delivery_location} readOnly></input>
                                </div>
                            </div>
                            <div className="countryPhone">
                                <div className="countryCode">
                                    <div className="twoLayout">
                                        <h2>Country Code</h2> 
                                        <CountryCodes code={currentUser.details?.country_code} isActive={false}></CountryCodes>
                                    </div>
                                </div>
                                <div className="phoneNumber">
                                    <div className="standardLayout">
                                        <h2>Phone Number</h2>
                                        
                                        <input type="text" id="phone_number" name="phone_number" value={formattedPhoneNum} placeholder={formattedPhoneNum} readOnly></input>
                                    </div>
                                </div>
                            </div>
                            <div className="streetAddress">
                                <div className="twoLayout">
                                    <h2>Street Address</h2>
                                    <input type="text" id="address" name="address" value={currentUser.details?.address} placeholder={currentUser.details?.address} readOnly></input>
                                </div>
                            </div>
                            
                            <div className="info">
                            <div className="city">
                                <div className="twoLayout">
                                    <h2 id="city">City</h2>
                                    <input type="text" id="city" name="city" value={currentUser.details?.city} placeholder={currentUser.details?.city} readOnly></input>
                                </div>
                            </div>    
                            <div className="province">
                                <div className="twoLayout">
                                    <h2>Province</h2>
                                    <input type="text" id="province" name="province" value={currentUser.details?.province} placeholder={currentUser.details?.province} readOnly></input>
                                </div>
                            </div>
                            <div className="postal">
                                <div className="twoLayout">
                                    <h2 id="pCode">Postal Code</h2>
                                    <input type="text" id="postal_code" name="postal_code" value={formattedPostalCode} placeholder={formattedPostalCode} readOnly></input>
                                </div>
                            </div>
                            <div className="country">
                                <div className="twoLayout">
                                    <h2>Country</h2>
                                    <input type="text" id="country" name="country" value={currentUser.details?.country} placeholder={currentUser.details?.country} readOnly></input>
                                </div>
                            </div>
                            </div>
                            {/* <div id="saveButton">
                            <input type="submit" id="saveButtonBtn" value="Save"></input>
                            </div> */}
               
                        </div>
                </div>
                <div className="orderSide">
                    <div className="orderHistoryToolBar">
                        <p id="OrderHistory">Order History</p>
                        {/* Add function to loop through each order */}
                        {/* Issue with rendering */}
                        {/* { orders?.map((p, index) => ( */}
                        
                        <OrderHistory user={currentUser}></OrderHistory>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Account;
