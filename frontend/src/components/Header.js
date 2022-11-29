import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';


function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const onLogout = () => {

        dispatch(logout());
        dispatch(reset());
        navigate('/');

    }

    return (
        <header className='header'>
        <h1><Link to='/'>MRU EATS</Link></h1>
            <ul className="menu-header">
                {user ? (<>
                    <li><Link to='/order'>Order</Link></li>
                    <li><Link to='/cart'>Cart</Link></li>
                    <li><Link to='/account'>Account</Link></li>
                    <li><Link to='/admin'>Admin</Link></li>
                    <li><button className='btn' onClick={onLogout}>Logout</button></li>

                </>) : (<>
                    <li><Link to='/login'>Login</Link></li>
                    <li><Link to='/register'>Register</Link></li>
                </>)}
            </ul>
        </header>
    )
}

export default Header