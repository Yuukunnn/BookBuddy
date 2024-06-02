/* TODO - add your code to create a functional React component that renders a navigation bar for the different views in your single page application. 
You may consider conditionally rendering some options - for example 'Login' should be available if someone has not logged in yet. */

import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Navbar = ({isLoggedIn}) =>{
   
    const navigate = useNavigate();

    const handleAccountOrLogin = () => {
        if (isLoggedIn) {
            navigate('/account')
        } else {
            navigate('/login')
        }

    }

    return (
        <div>
            <button onClick={handleAccountOrLogin}>{isLoggedIn ? "Account" : "Login"} </button>
            <ul>
                <li>
                    <Link to="./">Home</Link>
                </li>
                <li>
                    <Link to="./books">Books</Link>
                </li>
            </ul>
        </div>
    )
}

export default Navbar;