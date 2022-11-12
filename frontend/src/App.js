import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Login from './pages/Login';
import Register from './pages/Register';
import Restaurants from './pages/Restaurant';
import Order from './pages/Order'
import Profile from './pages/Profile'
import Cart from './pages/Cart'
import Admin from './pages/Admin'


function App() {
  return (
    <>
      <Router>
        <div>
          <Header />
          <Routes>
            <Route exact path='/' element={<Restaurants/>}></Route>
            <Route exact path='/login' element={<Login/>}></Route>
            <Route exact path='/register' element={<Register/>}></Route>
            <Route exact path='/profile' element={<Profile/>}></Route>
            <Route exact path='/order' element={<Order/>}></Route>
            <Route exact path='/cart' element={<Cart/>}></Route>
            <Route exact path='/admin' element={<Admin/>}></Route>
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
