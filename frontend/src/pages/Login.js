import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login, reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';
import '../styles/Login.css';
import RestImg from '../images/foodSignIn.jpg';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });


  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);


  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate('/');
    }

    dispatch(reset());

  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {

    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value

    }));
  }

  const onSubmit = (e) => {

    e.preventDefault();

    const userData = {
      email,
      password,
    }
    dispatch(login(userData));
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className='Login'>
      <div className="left">
        <img src={RestImg} alt="pic 2" />
      </div>
      <div className="box">
        <form onSubmit={onSubmit}>
          <label>
            <p>Email Address</p>
            <input type="text" name="email" value={email} placeholder='Enter your email' onChange={onChange} />
          </label>
          <label>
            <p>Password</p>
            <input type="password" name="password" value={password} placeholder='Enter your password' onChange={onChange} />
          </label>
          <p>Don't have an account? <Link to='/register'>Register</Link></p>
          <div>
            <button className="submitButton" type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login;
