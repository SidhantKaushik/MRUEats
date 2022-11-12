import '../styles/Restaurant.css'

function RestaurantDetails() {
    return (
        <div className="RestaurantPage">
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
                    <input type="text" id="menuSearch" className="menuSearchBar" onKeyUp="myFunction()" placeholder="Search for items" title="Type in a menu name"></input>
                </div>
            </div>
            <div className="mainContentBody">
                <div className="menuCategories">

                    <ol className='categoriesList'>
                        <li>Promotions</li>
                        <li>Category 2</li>
                        <li>Category 3</li>
                        <li>Category 4</li>
                        <li>Category 5</li>
                        <li>Category 6</li>
                        <li>Category 7</li>
                        <li>Category 8</li>
                        <li>Category 9</li>
                        <li>Category 10</li>
                    </ol>

                </div>
                <div className="menu">
                    <h2>Promotions</h2>

                    <div className="menuItem">
                        {/* TODO: Implement menu item component */}
                        {/* TODO: populate menu with menu item components*/}
                    </div>
                </div>
                <div className="addItem">
                    <h2>Menu Item Name</h2>
                    
                </div>
            </div>
        </div>
    );
  }
  
  export default RestaurantDetails;
  