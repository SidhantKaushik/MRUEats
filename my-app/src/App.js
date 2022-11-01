import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import OrderPage from './Components/OrderPage';
import Header from './Components/Header'
import Resturants from './Components/Resturants'

function App() {
  return (
    <Router>
      <div className="App">
      <Header/>
      <Routes>
          <Route exact path='/' element={<Resturants/>}>
          </Route>
          <Route exact path='/orderpage' element={<OrderPage/>}>
            {/* Place your componenets here */}
          </Route>
      </Routes>
      
      </div>
    </Router>
  );
}

export default App;
