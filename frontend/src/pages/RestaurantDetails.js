import '../styles/RestaurantDetails.css'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function RestaurantDetails() {
    let { id } = useParams();
    console.log(id);

    const [restaurant, setRestaurant] = useState([]);

    useEffect(() => {
      const getRestaurantUsingID = async () => {
        try {
          const url = "http://localhost:3000/api/restaurants/"+id;
          const response = await fetch(url);
          const data = await response.json();
          setRestaurant(data);
        } catch (err) {
          console.error(err);
        }
      }
        getRestaurantUsingID();
    }, [])
    while(!restaurant[0]){
        return;
    }
    const restaurantSelected = restaurant[0];
    console.log(restaurantSelected);

    function ConvertTime(hour) {
        var ampm = hour >= 12 ? 'pm' : 'am';
        hour = (hour % 12) || 12;
        return hour + ampm;
    }

    return (
        <div className="RestaurantPage">
            <div className="RestaurantBanner">
=
                <div className="firstLine">
                    <h1 className="restaurant-name">{restaurantSelected.name}</h1>
                    <div className="restaurantRating">{"X".repeat(restaurantSelected.rating)}</div>
                </div>
                <div className="secondLine">
                    <h2 className="restaurantInfo">{restaurantSelected.address} •</h2>
                    <h2 className="restaurantInfo">$3.09 Delivery</h2>
                </div>
                <div className="thirdLine">
                    <h2 className="restaurantInfo">Delivery Hours: {ConvertTime(restaurantSelected.open)} - {ConvertTime(restaurantSelected.close)} •</h2>
                    <h2 className="openStatus restaurantInfo">{"todo"}</h2>
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
                <div className="restaurantMenu">
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
