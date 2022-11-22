import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Order from './pages/Order';
import Account from './pages/Account';
import Cart from './pages/Cart';
import Admin from './pages/Admin';
import RestaurantDetails from './pages/RestaurantDetails';
import { useEffect, useState } from 'react';



function App() {

  const [restaurants, setRestaurants] = useState([]);
  const [menu, setMenu] = useState([])

  useEffect(() => {
    const getRestaurants = async () => {
      try {
        const url = "api/restaurants";
        const response = await fetch(url);
        const data = await response.json();
        setRestaurants(data);
      } catch (err) {
        console.error(err);
      }
    }
    getRestaurants();
  }, [])

  useEffect(() => {
    const getMenu = async () => {
      try {
        const url = "api/menu";
        const response = await fetch(url);
        const data = await response.json();
        setMenu(data);
      } catch (err) {
        console.error(err);
      }
    }
    getMenu();
  }, [])

  return (
    <>
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route exact path='/' element={<Home restaurants={{restaurants}}/>}></Route>
            <Route exact path='/login' element={<Login />}></Route>
            <Route exact path='/register' element={<Register />}></Route>
            <Route exact path='/account' element={<Account />}></Route>
            <Route exact path='/order' element={<Order />}></Route>
            <Route exact path='/cart' element={<Cart />}></Route>
            <Route exact path='/admin' element={<Admin />}></Route>
            <Route exact path='/RestaurantDetails' element={<RestaurantDetails menu={{menu}}/>}></Route>
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
