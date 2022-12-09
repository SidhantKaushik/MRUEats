import { useEffect, useState } from 'react';
import '../styles/Home.css';
import RestaurantItem from './RestaurantItem';
import HomepageCategories from './HomepageCategories';

const Home = (props) => {

    let filterRest = []
    let allRest = [...props.restaurants.restaurants]
    const [categories, setCategories] = useState([]);
    const [rest, setRest] = useState([]);

    //gets all restaurants
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
        {
            rest.map((p, index) => {
                uniqueCategories.add(p.category);
            })
        };
        const categoriesArray = Array.from(uniqueCategories.values());
        setCategories(categoriesArray);
    }, [rest]);

    // useEffect(() => {
    //     if (!user) {
    //         navigate('/login');
    //     }
    // }, [user, navigate]);

    function filterClick(props) {
        filterRest = []
        if (typeof props !== 'string') {
            setRest(allRest);
            return;
        }
        for (let i = 0; i < allRest.length; i++) {
            if (allRest[i].category) {
                if (allRest[i].category.includes(props)) {
                    filterRest.push(allRest[i])
                }
            }

        }
        setRest(filterRest)
    }
    function filter(e) {
        filterRest = []
        for (let i = 0; i < allRest.length; i++) {
            if (allRest[i].name) {
                if (allRest[i].name.includes(e.target.value) || allRest[i].name.toLowerCase().includes(e.target.value.toLowerCase())) {
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
        if (n > slides.length) { slideIndex = 1 }
        if (n < 1) { slideIndex = slides.length }
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        while (!slides[slideIndex - 1]) {
            return;
        }
        slides[slideIndex - 1].style.display = "block";
    }




    return (
        <div className="HomePage">
            <div className='home'>
                <div className="SplashScreen">
                    <div className="slide">
                        <img alt="logo" src='https://harbourcats.com/wp-content/uploads/2016/07/BoosterJ_MasterLogo_Rinkboards-002.jpg'></img>
                    </div>
                    <div class="slide hideInitally">
                        <img alt="logo" src="https://images.squarespace-cdn.com/content/v1/589a30d2725e258996583851/1486999228841-X0ZTSTV7NP709CWNAQD6/tacobell_banner.jpg?format=2500w" />
                    </div>
                    <div class="slide hideInitally">
                        <img alt="logo" src="https://play-lh.googleusercontent.com/IBOv3AqPhvvk7nOgRTJ2VBfOmgO8313X-SGrxolqqv4xjDah5pHukPsgbrzYxCUChQ=h500"></img>
                    </div>

                </div>
                <div className="categories">
                    <h3 id="catTitle">Categories</h3>
                    <ol className='categoriesList'>
                        <div className="item" id="all" onClick={filterClick}>
                            <li className='category-item'>
                                All
                            </li>
                        </div>


                        {categories.map((p, index) => (
                            <HomepageCategories
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
                </div>
            </div>
        </div>

    )
}

export default Home;