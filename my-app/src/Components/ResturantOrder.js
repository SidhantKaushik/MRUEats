import React from 'react'
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const ResturantOrder = (props) => {
    return ( 
        <>
            <div>
                <Link to='/'>Go Back</Link>
                Menu Goes Here
            </div>
        </>
    )
}

export default ResturantOrder;