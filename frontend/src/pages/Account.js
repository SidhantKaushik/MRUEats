import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../styles/Account.css';
//Passing JWT
import authHeader from "../features/auth/authHeader";
import EditIcon from "../images/edit-icon.png";
import CountryCodes from '../components/CountryCodes';
import Collapsible from 'react-collapsible';

const Account = () => {
    const [userInfo, setUserInfo] = useState({});

    const navigate = useNavigate();

    const { user } = useSelector((state) => state.auth);

    //Checks React Redux user state
    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
        //Uses user info from local storage to search database
        const getUser = async () => {
            try {
                const url = "api/users/" + user.id;
                const response = await fetch(url, authHeader);
                const data = await response.json();
                setUserInfo(data.user);
            } catch (err) {
                console.error(err)
            }
        }
        getUser();

    }, [user, navigate]);

    return (
        <div className="backgroundEffect">
            <div className="AccountPage">
                <div className="profileSide">
                    <div className="wrapper">
                        <div className="profileToolBar">
                            <div className="leftSideBar">
                                <h2>Profile&nbsp;</h2>
                            </div>
                            <div className="rightSideBar">
                                <div className='ordHistory'>
                                    <Link to='/order-history'><button id="myButton">Order History</button></Link>
                                </div>
                            </div>
                        </div>
                        <div className="ProfileInformation">
                            <div className="editIconWrapper">
                                <Link to='/account-edit' state={{ userInfo: userInfo }}><img className='editIcon' src={EditIcon} alt="edit" /></Link>
                            </div>
                            <div className="reqInfo">
                                <Collapsible open="true" trigger="Required User Information">
                                    <div className="reqInfoWrapper">
                                        <div className="firstName">
                                            <div className="standardLayout">
                                                <h4>First Name</h4>
                                                <input type="text" id="firstName" name="firstName" value={userInfo.firstName} placeholder={userInfo.firstName} readOnly></input>
                                            </div>
                                        </div>
                                        <div className="lastName">
                                            <div className="standardLayout">
                                                <h4>Last Name</h4>
                                                <input type="text" id="lastName" name="lastName" value={userInfo.lastName} placeholder={userInfo.lastName} readOnly></input>
                                            </div>
                                        </div>
                                        <div className="emailDiv">
                                            <div className="standardLayout">
                                                <h4>Email</h4>
                                                <input type="text" id="email" name="email" value={userInfo.email} placeholder={userInfo.email} readOnly></input>
                                            </div>
                                        </div>
                                        <div className="deliveryLocation">
                                            <div className="standardLayout">
                                                <h4>Delivery Location</h4>
                                                <input type="text" id="dLocation" name="deliverTo" value={userInfo.deliverTo} placeholder={userInfo.deliverTo} readOnly></input>
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
                                                        <CountryCodes code={userInfo.details?.countryCode}></CountryCodes>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="phoneNumber">
                                                <div className="standardLayout">
                                                    <h4>Phone Number</h4>
                                                    <input type="text" id="phoneNumber" name="phoneNumber" value={userInfo.details?.phoneNumber} placeholder={userInfo.details?.phoneNumber} readOnly></input>
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
                                                <input type="text" id="address" name="address" value={userInfo.details?.address} placeholder={userInfo.details?.address} readOnly></input>
                                            </div>
                                        </div>
                                        <div className="postal">
                                            <div className="standardLayout">
                                                <h4 id="pCode">Postal Code</h4>
                                                {/* PostalCode(userInfo.details?.postalCode)?.toUpperCase().replace(/(.{3})/g, "$1 ") */}
                                                <input type="text" id="postalCode" name="postalCode" value={userInfo.details?.postalCode} placeholder={userInfo.details?.postalCode} readOnly></input>
                                            </div>
                                        </div>
                                        <div className="city">
                                            <div className="standardLayout">
                                                <h4 id="city">City</h4>
                                                <input type="text" id="city" name="city" value={userInfo.details?.city} placeholder={userInfo.details?.city} readOnly></input>
                                            </div>
                                        </div>
                                        <div className="province">
                                            <div className="standardLayout">
                                                <h4>Province</h4>
                                                <input type="text" id="province" name="province" value={userInfo.details?.province} placeholder={userInfo.details?.province} readOnly></input>
                                            </div>
                                        </div>

                                        <div className="country">
                                            <div className="standardLayout">
                                                <h4>Country</h4>
                                                <input type="text" id="country" name="country" value={userInfo.details?.country} placeholder={userInfo.details?.country} readOnly></input>
                                            </div>
                                        </div>
                                    </div>
                                </Collapsible>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Account;
