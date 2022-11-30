import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../styles/Home.css';
import RestaurantItem from './RestaurantItem';

const Home = (props) => {

    const navigate = useNavigate();

    const { user } = useSelector((state) => state.auth);

    let filterRest = []
    let allRest = [...props.restaurants.restaurants]
    console.log(allRest)

    const [rest, setRest] = useState([]);

    useEffect(() => {
        const getRestaurants = async () => {
          try {
            const url = "api/restaurants";
            const response = await fetch(url);
            const data = await response.json();
            setRest(data);
          } catch (err) {
            console.error(err);
          }
        }
        getRestaurants();
      }, [])
    

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    function filter(e) {
        filterRest = []
        for(let i = 0; i < allRest.length; i++){    
            if (allRest[i].name.includes(e.target.value) || allRest[i].name.toLowerCase().includes(e.target.value.toLowerCase())){
                filterRest.push(allRest[i])
            }
        }
        setRest(filterRest)
    }

    
    return (
        <div className="HomePage">
        <div className='home'>
            <div className="SplashScreen">
                <img src='https://harbourcats.com/wp-content/uploads/2016/07/BoosterJ_MasterLogo_Rinkboards-002.jpg'></img>
                <div id="orderNow">
                    <p>Order Now</p>
                </div>
            </div>
            <div className="categories">
                Categories
            </div>
            <div className="restaurantList">
                <div className="SearchBar">
                <input type='text' placeholder='Search Restaurants' onChange={filter}></input>
                </div>
                <div className="list">
                {rest.map((p, index) => (
                    <RestaurantItem
                        name={p.name}
                        logo={p.logo}
                        index={index}
                        id={p.id}
                        rating={p.rating}
                        open={p.open}
                        close={p.close}
                        address={p.address}
                    />
                ))}
                </div>
                {/* <Link to='/RestaurantDetails'>
                    <div className='restaurants'>
                        <div className='logo'><img src='https://s3-alpha-sig.figma.com/img/fb70/ca6a/4b1bd450f3bb83cd16c2f3630170ce1e?Expires=1668988800&Signature=ZwsU8Fs3DeUXBXeut9bogfDxEvWaRDvxHF~py5GT6Vy8lr5lTwA0AeObdCT8zdVf-zvMy8WKTRzsOb4ckglEoyJwGun0dvmlGdRY32YPVmNF83CyzWGul2diG1DPBimVhz1plbDlIFddQ4t9nqh9p8O4mKcT8isp09tLt6uFdd1uf-4-J5gs1ykHXqU3dNc2Bg8AI3U1ykye21i47XaWDpsUDJU3HMXlQ8G2J1-PHgeh9GpDrebnQQ8MGOirjY8PI4y90zrBlgL3EPk-mfai1hGlmZbs4fA~qGBDE8lY6A2Aby~U26EwyTM3aRy46GF8BQRNL6C89aCFNgBjL2ICXw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA'></img></div>
                        <div className='info'> <h2>Booster Juice</h2>
                            <p>Smoothie place that sells some smoothies</p></div>
                    </div>
                </Link> */}
            </div>
        </div>           
        </div>

    )
}

export default Home;