import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';

function Restaurants() {

  const navigate = useNavigate();

  const {user} = useSelector((state) => state.auth);

  useEffect(() => {

    if(!user){
      navigate('/login');
    }

  }, [user, navigate]);

  return (
    <div>Restaurants</div>
  )
}

export default Restaurants;
  