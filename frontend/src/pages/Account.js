import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector} from 'react-redux';
import { update, reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';
import PhoneNumber from '../helpers/phone-format';
import '../styles/Account.css'
import { toast } from 'react-toastify';


const Account = (props) => {
    const [currentUser, setCurrentUser] = useState({});

    const navigate = useNavigate();

    //Grabs user info from local storage
    useEffect(() => {
        
        const user = JSON.parse(localStorage.getItem('user'));
    
        if (!user) {
            navigate('/login');
        }
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

    }, []);

    console.log(currentUser)
    // const onSubmit = (e) => {

    //     e.preventDefault();
        
    //     //Check for number
    //     if(!firstname && !lastname && !phone_number && !address && !postal_code){
    //         toast.error('No changes to save');
    //         return;
    //     }else if (!firstname && !lastname){
    //         const userData = {
    //             firstname: currentUser.firstname,
    //             lastname: lastname,
    //             email: currentUser.email,

    //             details: {
    //                 phone_number: phone_number,
    //                 address: address,
    //                 postal_code: postal_code
    //             }
    //         }
    //         console.log(userData);
    //        // dispatch(update(userData));
    //     }
    //     else{   
    //         const userData = {
    //             firstname: firstname,
    //             lastname: lastname,
    //             email: currentUser.email,

    //             details: {
    //                 phone_number: phone_number,
    //                 address: address,
    //                 postal_code: postal_code
    //             }
    //         }
    //         console.log(userData);
    //         //dispatch(update(userData));
    //     }
    // }

  
    // if (isLoading) {
    //     return <Spinner />;
    // }
    console.log(currentUser)
    return (
        <div className="backgroundEffect">
            <div className="AccountPage">
                <div className="profileSide">
                    
                    <div className="profileToolBar">
                        <p>Profile</p>
                        <p>* Required</p>
                        <Link to='/account-edit' state={{user: currentUser}}>Edit</Link>
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
                                        <input type="number" id="country_code" name="country_code" value={currentUser.details?.country_code} placeholder={currentUser.details?.country_code} readOnly></input>
                                    </div>
                                </div>
                                <div className="phoneNumber">
                                    <div className="standardLayout">
                                        <h2>Phone Number</h2>
                                        
                                        <input type="number" id="phone_number" name="phone_number" value={currentUser.details?.phone_number} placeholder={currentUser.details?.phone_number} readOnly></input>
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
                                    <input type="text" id="postal_code" name="postal_code" value={currentUser.details?.postal_code} placeholder={currentUser.details?.postal_code} readOnly></input>
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
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Account;
