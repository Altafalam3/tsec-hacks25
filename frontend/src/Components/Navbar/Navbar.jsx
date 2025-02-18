import './Navbar.css';
import Navbarlist from './Navbarlist';
import { UserContext } from '../../context/UserContext';
import { useContext } from 'react';

import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';


const Navbar = () => {
  const { isLoggedIn, userr, checkUserLoggedIn, handleLogout } = useContext(UserContext);

  const location = useLocation();

  const isLoginPage = location.pathname === '/login';

  const renderAuthButton = () => {
    if (isLoggedIn) {
      return (
        <div className="ml-auto">
          {isLoginPage ? null : (
            <button onClick={handleLogout} className="login-button">
              <Link to="/">Sign out</Link>
            </button>
          )}
        </div>
      );
    } else {
      return (
        <div className="ml-auto">
          {isLoginPage ? null : (
            <button className="login-button">
              <Link to="/login">Sign in</Link>
            </button>
          )}
        </div>
      );
    }
  };

  return (
    <nav className="navbar">
      <div className="logo-links">
        <h2>
          <Link to="/" style={{textDecoration:'none', color:'indigo'}}>ResQue</Link>          
        </h2>
        <ul className="navitems">
          <Navbarlist />
          </ul>
      </div>
      
      
      {renderAuthButton()}

    </nav>
  );
}

export default Navbar;