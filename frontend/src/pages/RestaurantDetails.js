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
        
        if(hour <= 1200){
            var hourString = hour.toString();
            hourString = hourString.substring(0,2) + ':' + hourString.substring(2,4);
            return hourString+"AM";
        }
        else{
            hour = hour - 1200;
            var hourString = hour.toString();
            hourString = hourString.substring(0,2) + ':' + hourString.substring(2,4);
            return hourString+"PM";
        }
    }
    function checkIfOpen() {
        const d = new Date();
        let time = d.getHours() +""+ d.getMinutes();
        console.log(time);
        console.log(restaurantSelected.open);
        console.log(restaurantSelected.close);
        if ( time > restaurantSelected.open && time < restaurantSelected.close ){
             return "Open";
        }
        else{
            return "Closed";
        }
    }

    return (
        <div className="RestaurantPage">
            <div className="RestaurantBanner">
                {/*<img src={logo} className="restaurantImage" alt="logo" />*/}
                <div className="firstLine">
                    <h1 className="restaurant-name">{restaurantSelected.name}</h1>
                    <div className="restaurantRating">{"⭐".repeat(restaurantSelected.rating)}</div>
                </div>
                <div className="secondLine">
                    <h2 className="restaurantInfo">{restaurantSelected.address} •</h2>
                    <h2 className="restaurantInfo">$3.09 Delivery</h2>
                </div>
                <div className="thirdLine">
                    <h2 className="restaurantInfo">Delivery Hours: {ConvertTime(restaurantSelected.open)} - {ConvertTime(restaurantSelected.close)} •</h2>
                    <h2 className="openStatus restaurantInfo">{checkIfOpen()}</h2>
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
