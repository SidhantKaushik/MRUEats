import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import OrderPage from './Components/OrderPage';
import Header from './Components/Header';
import Resturants from './Components/Resturants';
import Profile from './Components/Profile';
import Cart from './Components/Cart';
import AdminPage from './Components/Admin';

function App() {
  return (
    <Router>
      <div className="App">
      <Header/>
      <Routes>
          <Route exact path='/' element={<Resturants/>}></Route>
          <Route exact path='/profile' element={<Profile/>}></Route>
          <Route exact path='/order' element={<OrderPage/>}></Route>
          <Route exact path='/cart' element={<Cart/>}></Route>
          <Route exact path='/admin' element={<AdminPage/>}></Route>
      </Routes>
      
      </div>
    </Router>
  );
}

export default App;
