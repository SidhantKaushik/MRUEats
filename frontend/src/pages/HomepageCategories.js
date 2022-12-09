import React from "react";
import '../styles/RestaurantDetails.css';



function backgroundImage(item) {
    let backgroundImage;
    switch (item) {
        case "All":
            // code for All category
            backgroundImage = "https://bcdairy.ca/wp-content/uploads/2021/08/Variety_Image_747px.jpg"
            break;
        case "Mexican":
            // code for Mexican category
            backgroundImage = "https://upload.wikimedia.org/wikipedia/commons/6/60/Burrito.JPG"
            break;
        case "Burgers":
            // code for Burgers category
            backgroundImage = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Hamburger_%28black_bg%29.jpg/1280px-Hamburger_%28black_bg%29.jpg"
            break;
        case "Pizza":
            // code for Pizza category
            backgroundImage = "https://upload.wikimedia.org/wikipedia/commons/a/a3/Eq_it-na_pizza-margherita_sep2005_sml.jpg"
            break;
        case "Chicken":
            // code for Chicken category
            backgroundImage = "https://s.yimg.com/ny/api/res/1.2/jgd1gM2FAfXfSCe3rSN1Qw--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD02NDY-/https://s.yimg.com/os/creatr-uploaded-images/2020-08/08691890-e2fd-11ea-bfdd-9831f8ae35fd"
            break;
        case "Smoothies":
            backgroundImage = "https://cookingformysoul.com/wp-content/uploads/2022/05/triple-berry-smoothie-feat-min.jpg"
            break;
        default:
            // code for any other category
            backgroundImage = ""
            break;
    }
    return (
        {
            backgroundImage: `url(${backgroundImage})`
        }
    );
}

const HomepageCategories = (props) => {

    return (
        <div className="item" style={backgroundImage(props.category)} onClick={() => props.filter(props.category)}>
            <li className='category-item'>
                {props.category}
            </li>
        </div>

    )
}

export default HomepageCategories;