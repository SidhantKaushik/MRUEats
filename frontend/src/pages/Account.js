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
                        <div className="FLName">
                            <div className="firstName">
                                <div className="standardLayout">
                                    <h2>First Name</h2>
                                    <h2 className="required">Required</h2>
                                    <input type="text" id="fname" name="fname" placeholder=""></input>
                                </div>
                            </div>
                            <div className="lastName">
                                <div className="standardLayout">
                                    <h2>Last Name</h2>
                                    <h2 className="required">Required</h2>
                                    <input type="text" id="lastName" name="lastName" placeholder=""></input>
                                </div>
                            </div>
                        </div>
                        <div className="emailDiv">
                            <div className="standardLayout">
                                <h2>Email</h2>
                                <h2 className="required">Required</h2>
                                <input type="text" id="email" name="email" placeholder=""></input>
                            </div>
                        </div>
                        <div className="countryPhone">
                            <div className="countryCode">
                                <div className="twoLayout">
                                    <h2>Country</h2>
                                    <input type="text" id="province" name="province" placeholder=""></input>
                                </div>
                            </div>
                            <div className="phoneNumber">
                                <div className="standardLayout">
                                    <h2>Phone Number</h2>
                                    <h2 className="required">Optional</h2>
                                    <input type="text" id="phoneNumber" name="phoneNumber" placeholder=""></input>
                                </div>
                            </div>
                        </div>
                        <div className="streetAddress">
                            <div className="twoLayout">
                                <h2>Street Address</h2>
                                <input type="text" id="currentLocation" name="currentLocation" placeholder=""></input>
                            </div>
                        </div>
                        
                        <div className="info">
                        <div className="province">
                            <div className="twoLayout">
                                <h2>Province</h2>
                                <input type="text" id="province" name="province" placeholder=""></input>
                            </div>
                        </div>
                        <div className="postal">
                            <div className="twoLayout">
                                <h2 id="pCode">Postal Code</h2>
                                <input type="text" id="postalCode" name="postalCode" placeholder=""></input>
                            </div>
                        </div>
                        <div className="country">
                            <div className="twoLayout">
                                <h2>Country</h2>
                                <input type="text" id="country" name="country" placeholder=""></input>
                            </div>
                        </div>
                        </div>
                        <div id="saveButton">
                        <input type="submit" id="saveButtonBtn" value="Save"></input>
                        </div>
                        
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
