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
import RestaurantOrder from './pages/RestaurantOrder';
import RestaurantDetails from './pages/RestaurantDetails';

function App() {
  return (
    <>
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route exact path='/' element={<Home />}></Route>
            <Route exact path='/login' element={<Login />}></Route>
            <Route exact path='/register' element={<Register />}></Route>
            <Route exact path='/account' element={<Account />}></Route>
            <Route exact path='/order' element={<Order />}></Route>
            <Route exact path='/cart' element={<Cart />}></Route>
            <Route exact path='/admin' element={<Admin />}></Route>
            <Route exact path='/restaurantorder' element={<RestaurantOrder />}></Route>
            <Route exact path='/restaurantDetails' element={<RestaurantDetails />}></Route>
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
