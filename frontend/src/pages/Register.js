import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { register, reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';
import '../styles/Register.css';
import PizzaImg from '../images/pizza.jpg'


function Register() {
    //Is Courier check
    const [checked, setChecked] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        deliverTo: '',
        password: '',
        password_c: ''
    });

    const { firstName, lastName, email, deliverTo, password, password_c } = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (isSuccess) {
            toast.success('Account created!');
            navigate('/login');
        }

        dispatch(reset());

    }, [isError, isSuccess, message, navigate, dispatch]);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,


        }));
    }

    const onSubmit = (e) => {

        e.preventDefault();

        //if nothing in form is filled
        if (!firstName && !lastName && !email && !deliverTo && !password && !password_c) {
            toast.error('Please fill all text fields');
            return;
        }

        //email address validation
        const regex = new RegExp("^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$");
        if (!regex.test(email)) {
            toast.error('Please enter a valid email address');
            return;
        }
        //password check
        if (password !== password_c) {
            toast.error('Password does not match');
            return;
        }
        if (password.length < 6) {
            toast.error('Your password length is not sufficient');
            return;
        }
        else {
            const userData = {
                firstName,
                lastName,
                email,
                deliverTo,
                checked,
                password,
                password_c
            }
            dispatch(register(userData));
        }
    }

    if (isLoading) {
        return <Spinner />;
    }


    return (
        <div className="RegisterPage">
            <div className="left">
                <img src={PizzaImg} alt="" />
            </div>
            <div className="box">
                <form onSubmit={onSubmit}>
                    <div className='fName'>
                        <label for="first-name">First Name</label>
                        <input type="text" id="firstName" name="firstName" value={firstName} placeholder='Enter your first name' onChange={onChange} />
                    </div>
                    <div className='lName'>
                        <label for="last-name">Last Name</label>
                        <input type="text" id="lastName" name="lastName" value={lastName} placeholder='Enter your last name' onChange={onChange} />
                    </div>
                    <div className='email'>
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email" value={email} placeholder='Enter your email' onChange={onChange} />
                    </div>
                    <div className='dLocation'>
                        <label for="deliveryLoc">Delivery Location</label>
                        <input type="text" id="dLocation" name="deliverTo" value={deliverTo} placeholder='Enter delivery location Ex.(B140 or 123 Street SE)' onChange={onChange} />
                    </div>
                    <div className='pass1'>
                        <label id="passwordText" for="password">Password</label>
                        <p id="requirementsForPass">Minimum 6 Characters</p>
                        <input type="password" id="password" name="password" value={password} placeholder='Enter password' onChange={onChange} />
                    </div>
                    <div className='pass2'>
                        <label for="confirm-password">Confirm Password</label>
                        <input type="password" id="password_c" name="password_c" value={password_c} placeholder='Confirm password' onChange={onChange} />
                    </div>
                    <div className="courier">
                        <label for="courierLabe">Courier account?</label><br />
                        <input type="checkbox" id="courierBox" name="isCourier" checked={checked} onChange={(e) => setChecked(e.target.checked)} />
                    </div>
                    <p id="Login">Already have an account? <Link to='/login'>Login</Link></p>
                    <div className='submitbtn'>
                        <input id="register-button" type="submit" value="Register" />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register;
