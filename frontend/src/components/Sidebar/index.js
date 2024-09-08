import React from "react";
import { FaTachometerAlt, FaExclamationTriangle, FaPhoneAlt } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Cookies from 'js-cookie';
import { FaListUl } from "react-icons/fa";
import "./index.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();  // Hook to get the current route
  const role = Cookies.get("role");

  const handleLogout = () => {
    Cookies.remove('jwt_token');
    localStorage.removeItem("data");
    navigate('/');
  };

  // Function to check if the current path matches the link
  const isActive = (path) => location.pathname === path;

  return (
    <div className="sidebar">
      <div>
        <h1 className="logo-h1">Rapid Resolve</h1>
      </div>
      <ul className="menu">
        <li>
          <Link 
            to="/dashboard" 
            className={`menu-link ${isActive('/dashboard') ? 'active' : ''}`}
          >
            <FaTachometerAlt className="menu-icon" /> Dashboard
          </Link>
        </li>
        <li>
          <Link 
            to="/incidents" 
            className={`menu-link ${isActive('/incidents') ? 'active' : ''}`}
          >
            <FaExclamationTriangle className="menu-icon" /> View Incidents
          </Link>
        </li>
        <li>
          <Link 
            to="/emergency-contacts" 
            className={`menu-link ${isActive('/emergency-contacts') ? 'active' : ''}`}
          >
            <FaPhoneAlt className="menu-icon" /> Emergency Contacts
          </Link>
        </li>
        {role!=="VOLUNTEER" &&  <li>
          <Link 
            to="/view-volunteers" 
            className={`menu-link ${isActive('/view-volunteers') ? 'active' : ''}`}
          >
            <FaListUl className="menu-icon" />  Volunteers List
          </Link>
        </li> }
       
      </ul>
      <button className="logout-button" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Sidebar;
