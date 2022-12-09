import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Account from './pages/Account';
import Admin from './pages/Admin';
import Courier from './pages/Courier';
import OrderHistory from './pages/OrderHistory';
import RestaurantDetails from './pages/RestaurantDetails';
import EditAccount from './pages/EditAccount';
import NotFound from './pages/NotFound';


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
//gets all menu items from all restaurants
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
            <Route exact path='/' element={<Home restaurants={{ restaurants }} />}></Route>
            <Route exact path='/login' element={<Login />}></Route>
            <Route exact path='/register' element={<Register />}></Route>
            <Route exact path='/account' element={<Account />}></Route>
            <Route exact path='/account-edit' element={<EditAccount />}></Route>
            <Route exact path='/order-history' element={<OrderHistory restaurants={{ restaurants }} menu={{ menu }} />}></Route>
            <Route exact path='/admin' element={<Admin />}></Route>
            <Route exact path='/courier' element={<Courier />}></Route>
            <Route exact path='/restaurantDetails' element={<RestaurantDetails menu={{ menu }} />}></Route>
            <Route path='*' element={<NotFound />}></Route>
          </Routes>
        </div>
      </Router>

      <ToastContainer />
    </>
  );
}

export default App;