import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { register, reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';
import '../styles/Register.css';

function Register() {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_c: ''
    });

    const { firstname, lastname, email, password, password_c } = formData;

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

        console.log(password);
        console.log(password_c);
        if (password !== password_c) {
            toast.error('Password does not match');
        } else {
            const userData = {
                firstname,
                lastname,
                email,
                password,
            }
            dispatch(register(userData));
        }
    }

    if (isLoading) {
        return <Spinner />;
    }


    return (
        <div class="main-container">
            <div class="box">

                <h3>SIGN UP</h3>

                <form onSubmit={onSubmit}>
                    <div>
                        <label for="first-name">First Name</label>
                        <input type="text" id="firstname" name="firstname" value={firstname} placeholder='Enter your first name' onChange={onChange} />
                    </div>
                    <div>
                        <label for="last-name">Last Name</label>
                        <input type="text" id="lastname" name="lastname" value={lastname} placeholder='Enter your last name' onChange={onChange} />
                    </div>
                    <div>
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email" value={email} placeholder='Enter your email' onChange={onChange} />
                    </div>
                    <div>
                        <label for="password">Password</label>
                        <input type="password" id="password" name="password" value={password} placeholder='Enter password' onChange={onChange} />
                    </div>
                    <div>
                        <label for="confirm-password">Confirm Password</label>
                        <input type="password" id="password_c" name="password_c" value={password_c} placeholder='Confirm password' onChange={onChange} />
                    </div>
                    <div>
                        <input id="register-button" type="submit" value="Register" />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register;
