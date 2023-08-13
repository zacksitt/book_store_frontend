import { logoutCustomer } from "../store/customer-slice";
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const token = localStorage.getItem('token');

const Nav = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const [isLoggedOut,setisLoggedOut] = useState('') 
    const logout = () => {
        dispatch(logoutCustomer(token))
        localStorage.removeItem('token');
        setisLoggedOut(true);
    }
    // If logged out, redirect to the home page
    if (isLoggedOut) {
        // return <Redirect to="/" />;
        
    }

  return (
    <>
    <div className="align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow">
    <nav className="navbar navbar-expand-lg">
            <a className="navbar-brand" href="#">Book Sale Report</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ml-auto">
                    {/* Add your other navigation links here */}
                    <li className="nav-item">
                        <a className="nav-link" href="/books">Book</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/customers">Customer</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/sales">Sale</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/feedbacks">Feedback</a>
                    </li>
                </ul>
            </div>
            {/* Sign Out Button */}
            <a className="nav-link ml-auto" href="/" onClick={() => logout()}>Sign Out</a>
        </nav>
    </div>
    </>
  )
};

export default Nav;