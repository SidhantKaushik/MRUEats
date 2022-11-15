import '../styles/Account.css'

const Account = (props) => {
    return (
        <div className="backgroundEffect">
            <div className="AccountPage">
                <div className="profileSide">
                    <div className="profileToolBar">
                        <p>Profile</p>
                        <a href='' id="changePassword">Change Password</a>
                    </div>
                    <div className="ProfileInformation">
                        <div className="firstName">
                            <div className="standardLayout">
                                <h2>First Name</h2>
                                <h2 className="required">Required</h2>
                                <input type="text" id="fname" name="fname"></input>
                            </div>
                        </div>
                        <div className="lastName">
                            <div className="standardLayout">
                                <h2>Last Name</h2>
                                <h2 className="required">Required</h2>
                                <input type="text" id="lastName" name="lastName"></input>
                            </div>
                        </div>
                        <div className="emailDiv">
                            <div className="standardLayout">
                                <h2>Email</h2>
                                <h2 className="required">Required</h2>
                                <input type="text" id="email" name="email"></input>
                            </div>
                        </div>
                        <div className="countryCode">
                            <div className="twoLayout">
                                <h2>Country</h2>
                                <input type="text" id="province" name="province"></input>
                            </div>
                        </div>
                        <div className="phoneNumber">
                            <div className="standardLayout">
                                <h2>Phone Number</h2>
                                <h2 className="required">Optional</h2>
                                <input type="text" id="phoneNumber" name="phoneNumber"></input>
                            </div>
                        </div>
                        <div className="streetAddress">
                            <div className="twoLayout">
                                <h2>Street Address</h2>
                                <input type="text" id="currentLocation" name="currentLocation"></input>
                            </div>
                        </div>
                        <div className="province">
                            <div className="twoLayout">
                                <h2>Province</h2>
                                <input type="text" id="province" name="province"></input>
                            </div>
                        </div>
                        <div className="postal">
                            <div className="twoLayout">
                                <h2>Postal Code</h2>
                                <input type="text" id="postalCode" name="postalCode"></input>
                            </div>
                        </div>
                        <div className="country">
                            <div className="twoLayout">
                                <h2>Country</h2>
                                <input type="text" id="country" name="country"></input>
                            </div>
                        </div>
                        <div className="currentLocation">
                            <div className="standardLayout">
                                <h2>Current Location</h2>
                                <h2 className="required">Required</h2>
                                <input type="text" id="currentLocation" name="currentLocation"></input>
                            </div>
                        </div>
                        <input type="submit" id="saveButton" value="Save"></input>
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
