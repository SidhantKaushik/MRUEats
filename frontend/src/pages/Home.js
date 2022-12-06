import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../styles/Home.css';
import RestaurantItem from './RestaurantItem';
import Category from './Category';

const Home = (props) => {

    const navigate = useNavigate();

    const { user } = useSelector((state) => state.auth);

    let filterRest = []
    let allRest = [...props.restaurants.restaurants]
    const [menu, setMenu] = useState([])
    const [categories, setCategories] = useState([]);
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
        const uniqueCategories = new Set();
        {rest.map((p, index) => {
            uniqueCategories.add(p.category);
        })};
        const categoriesArray = Array.from(uniqueCategories.values());
        setCategories(categoriesArray);
      }, [rest]);

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    function filterClick(props){
        filterRest = []
        if(typeof props !== 'string')
        {
            setRest(allRest);
            return; 
        }
        for(let i = 0; i < allRest.length-2; i++){  
            if(allRest[i].category){
                if(allRest[i].category.includes(props))
                {
                    filterRest.push(allRest[i])
                }
            }
            
        }
        setRest(filterRest)
    }
    function filter(e) {
        filterRest = []
        for(let i = 0; i < allRest.length; i++){
            if(allRest[i].name){
                if (allRest[i].name.includes(e.target.value) || allRest[i].name.toLowerCase().includes(e.target.value.toLowerCase())){
                    filterRest.push(allRest[i])
                }
            }
            
        }
        setRest(filterRest)
    }

    let slideIndex = 1;
    showSlide(slideIndex);

    setInterval(function () {
        plusSlides(1);
      }, 10000);


    function plusSlides(n) {
        showSlide(slideIndex += n);
    }
    function showSlide(n) {
        let slides = document.getElementsByClassName("slide");
        if (n > slides.length) {slideIndex = 1}    
        if (n < 1) {slideIndex = slides.length}
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";  
        }
        while(!slides[slideIndex-1]){
            return;
        }
        slides[slideIndex-1].style.display = "block";
    }

    

    
    return (
        <div className="HomePage">
        <div className='home'>
            <div className="SplashScreen">
                <div class="slide">
                    <img src='https://harbourcats.com/wp-content/uploads/2016/07/BoosterJ_MasterLogo_Rinkboards-002.jpg'></img>
                </div>
                <div class="slide hideInitally">
                    <img src="https://images.squarespace-cdn.com/content/v1/589a30d2725e258996583851/1486999228841-X0ZTSTV7NP709CWNAQD6/tacobell_banner.jpg?format=2500w" alt="Image 2"/>
                </div>
                <div id="orderNow">
                    <p>Perfect for Hungry Cougars!</p>
                </div>
                <div class="prev" onClick={() => plusSlides(-1)}> &larr; </div>
                <div class="next" onClick={() => plusSlides(1)}> &rarr; </div>
                
            </div>
            <div className="categories">
                <h3 id="catTitle">Categories</h3>
            <ol className='categoriesList'>
                    <li className='category-item' onClick={filterClick}>
                        All 
                    </li>
                    
                        {categories.map((p, index) => (
                            <Category
                                category={p}
                                filter={filterClick}
                            />
                        ))} 
                    </ol>
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