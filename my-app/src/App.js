import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import OrderPage from './Components/OrderPage';
import Header from './Components/Header'
import Home from './Components/Home'
import Profile from './Components/Profile';
import Cart from './Components/Cart'
import ResturantOrder from './Components/ResturantOrder';

function App() {
  return (
    <Router>
      <div className="App">
      <Header/>
      <Routes>
          <Route exact path='/' element={<Home/>}></Route>
          <Route exact path='/profile' element={<Profile/>}></Route>
          <Route exact path='/order' element={<OrderPage/>}></Route>
          <Route exact path='/cart' element={<Cart/>}></Route>
          <Route exact path='/resturantOrder' element={<ResturantOrder/>}></Route>
      </Routes>
      
      </div>
    </Router>
  );
}

export default App;
