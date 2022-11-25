import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { update, reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';
import PhoneNumber from '../helpers/phone-format';
import '../styles/Account.css'
import { toast } from 'react-toastify';

const Account = (props) => {
    
    
    const [currentUser, setCurrentUser] = useState({});
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

    //Grabs user info from local storage
    useEffect(() => {
        
        const user = JSON.parse(localStorage.getItem('user'));

        if (user){
            setCurrentUser(user);
            email = currentUser.email;
            country = currentUser.details.country;  
            country_code = currentUser.details.country_code; 
            province = currentUser.details.province 
        }

    }, []);

    useEffect(() =>{

        if (!user) {
            navigate('/login');
        }

    }, [user]);

    //Can't assign the variables 
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: currentUser.email,
        address: '',
        country: currentUser.details?.country,
        country_code: currentUser.details?.country_code,
        phone_number: null,
        postal_code: '',
        province: currentUser.details?.province,
    
    });

    const { firstname, lastname, email, address, country, country_code, phone_number, postal_code, province } = formData;


    //Check if a user is logged in to access page
    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (isSuccess){
            toast.error('Updated information');
            navigate('/account');
        }

        dispatch(reset());

    }, [user, isError, isSuccess, message, dispatch, navigate]);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value

        }));
    }

    const onSubmit = (e) => {

        e.preventDefault();
        
        //Check for number
        if(phone_number){
            console.log(phone_number)
        }
        else{   
            const userData = {
                firstname: firstname,
                lastname: lastname,
                email: currentUser.email,

                details: {
                    phone_number: phone_number,
                    address: address,
                    postal_code: postal_code
                }
            }
            console.log(userData);
            dispatch(update(userData));
        }
    }

  
    if (isLoading) {
        return <Spinner />;
    }

    return (
        <div className="backgroundEffect">
            <div className="AccountPage">
                <div className="profileSide">
                    <div className="profileToolBar">
                        <p>Profile</p>
                        <a href='' id="changePassword">Change Password</a>
                    </div>
                    <form onSubmit={onSubmit}>
                        <div className="ProfileInformation">
                            <div className="FLName">
                                <div className="firstName">
                                    <div className="standardLayout">
                                        <h2>First Name</h2>
                                        <h2 className="required">Required</h2>
                                        <input type="text" id="firstname" name="firstname" value={firstname} placeholder={currentUser.firstname} onChange={onChange}></input>
                                    </div>
                                </div>
                                <div className="lastName">
                                    <div className="standardLayout">
                                        <h2>Last Name</h2>
                                        <h2 className="required">Required</h2>
                                        <input type="text" id="lastname" name="lastname" value={lastname} placeholder={currentUser.lastname} onChange={onChange}></input>
                                    </div>
                                </div>
                            </div>
                            <div className="emailDiv">
                                <div className="standardLayout">
                                    <h2>Email</h2>
                                    <h2 className="required">Required</h2>
                                    <input type="text" id="email" name="email" value={email} placeholder={currentUser.email} readOnly></input>
                                </div>
                            </div>
                            <div className="countryPhone">
                                <div className="countryCode">
                                    <div className="twoLayout">
                                        <h2>Country Code</h2>
                                        <input type="number" id="country_code" name="country_code" value={country_code} placeholder={currentUser.details?.country_code} readOnly></input>
                                    </div>
                                </div>
                                <div className="phoneNumber">
                                    <div className="standardLayout">
                                        <h2>Phone Number</h2>
                                        <h2 className="required">Optional</h2>
                                        
                                        <input type="text" id="phone_number" maxlength="16" name="phone_number" value={phone_number} placeholder={currentUser.details?.phone_number} onChange={onChange}></input>
                                    </div>
                                </div>
                            </div>
                            <div className="streetAddress">
                                <div className="twoLayout">
                                    <h2>Street Address</h2>
                                    <input type="text" id="address" name="address" value={address} placeholder={currentUser.details?.address} onChange={onChange}></input>
                                </div>
                            </div>
                            
                            <div className="info">
                            <div className="province">
                                <div className="twoLayout">
                                    <h2>Province</h2>
                                    <input type="text" id="province" name="province" value={province} placeholder={currentUser.details?.province} readOnly></input>
                                </div>
                            </div>
                            <div className="postal">
                                <div className="twoLayout">
                                    <h2 id="pCode">Postal Code</h2>
                                    <input type="text" id="postal_code" name="postal_code" value={postal_code} placeholder={currentUser.details?.postal_code} onChange={onChange}></input>
                                </div>
                            </div>
                            <div className="country">
                                <div className="twoLayout">
                                    <h2>Country</h2>
                                    <input type="text" id="country" name="country" value={country} placeholder={currentUser.details?.country} readOnly></input>
                                </div>
                            </div>
                            </div>
                            <div id="saveButton">
                            <input type="submit" id="saveButtonBtn" value="Save"></input>
                            </div>
                            
                        </div>
                    </form>
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
