import '../styles/Admin.css'

function Admin() {

    return (
        <div className="AdminPage">
            <div className="mainContentBody">
                <div className="restaurants">
                    <h2>Restaurants</h2>

                    <ol className='restaurantsList'>
                        <li>Restaurant 1</li>
                        <li>Restaurant 2</li>
                        <li>Restaurant 3</li>
                        <li>Restaurant 4</li>
                        <li>Restaurant 5</li>
                        <li>Restaurant 6</li>
                        <li>Restaurant 7</li>
                        <li>Restaurant 8</li>
                        <li>Restaurant 9</li>
                        <li>Restaurant 10</li>
                    </ol>

                </div>
                <div className="restaurantSection">
                    <div className="RestaurantBanner">
                        {/*<img src={logo} className="restaurantImage" alt="logo" />*/}
                        <div className="firstLine">
                            <h1 className="restaurant-name">Booster Juice</h1>
                            <div className="restaurantRating">XXXXX</div>
                        </div>
                        <div className="secondLine">
                            <h2 className="restaurantInfo">4703 130th Avenue Souteast •</h2>
                            <h2 className="restaurantInfo">$3.09 Delivery</h2>
                        </div>
                        <div className="thirdLine">
                            <h2 className="restaurantInfo">Delivery Hours: 8:00AM - 7:30PM •</h2>
                            <h2 className="openStatus restaurantInfo">OPEN</h2>
                        </div>
                        <div>
                            <form className='restaurantButtons'>
                                <button className='restaurantButton'>Edit Information</button>
                                <button className='restaurantButton'>Remove Restaurant</button>
                            </form>
                        </div>
                    </div>

                    <div className='menuItems'>
                        {/* TODO: populate menu with menu item components*/}
                    </div>

                    <div className="menuButtons">
                        <form className='menuItemForm'>
                            <button className='menuButton'>Add</button>
                            <button className='menuButton'>Edit</button>
                            <button className='menuButton'>Delete</button>
                        </form>
                        {/* Take out after */}
                        <div className='submitbtn'>
                        <input id="register-button" type="submit" value="Register"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Admin;
