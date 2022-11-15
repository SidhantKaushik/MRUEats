import logo from './logo.svg'
import './App.css'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import OrderPage from './Components/OrderPage'
import Header from './Components/Header'
import Home from './Components/Home'
import Profile from './Components/Profile';
import Cart from './Components/Cart'

import ResturantOrder from './Components/ResturantOrder';
// import Resturants from './Components/Resturants';
import AdminPage from './Components/Admin'
import SignupPage from './Components/Signup'
import Account from './Components/Account'
function App () {
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
            <Route exact path='/admin' element={<AdminPage/>}></Route>
            <Route exact path='/signup' element={<SignupPage/>}></Route>
            <Route exact path='/account' element={<Account/>}></Route>
        </Routes>  
      </div>
    </Router>
  )
}

export default App;
