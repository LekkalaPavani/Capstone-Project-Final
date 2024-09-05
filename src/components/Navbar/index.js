// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import './index.css';

// const Navbar = () => {
//     const [isDropdownOpen, setIsDropdownOpen] = useState({
//         about: false,
//         contact: false,
//         preparedness: false,
//     });

//     const toggleDropdown = (dropdown) => {
//         setIsDropdownOpen((prevState) => ({
//             ...prevState,
//             [dropdown]: !prevState[dropdown],
//         }));
//     };

//     return (
//         <div className="navbar">
//             <div className="logo">
//                 <img
//                     src="https://res.cloudinary.com/dghlihlgi/image/upload/v1725002683/Repidlogo_tibxzw.jpg"
//                     alt="Rapid Resolve Logo"
//                     className="logo-image"
//                 />
//             </div>
//             <ul>
//                 <li>
//                     <Link to="/dashboard" className="navbar-link">
//                         Home
//                     </Link>
//                 </li>
//                 <li onClick={() => toggleDropdown('preparedness')}>
//                     Preparedness Tips
//                     {isDropdownOpen.preparedness && (
//                         <ul className="dropdown-menu">
//                             <li>
//                                 <Link to="/preparedness/tips1">Tips 1</Link>
//                             </li>
//                             <li>
//                                 <Link to="/preparedness/tips2">Tips 2</Link>
//                             </li>
//                         </ul>
//                     )}
//                 </li>
//                 <li onClick={() => toggleDropdown('about')}>
//                     About Us
//                     {isDropdownOpen.about && (
//                         <ul className="dropdown-menu">
//                             <li>
//                                 <Link to="/about/history">Our History</Link>
//                             </li>
//                             <li>
//                                 <Link to="/about/team">Our Team</Link>
//                             </li>
//                         </ul>
//                     )}
//                 </li>
//                 <li onClick={() => toggleDropdown('contact')}>
//                     Contact Us
//                     {isDropdownOpen.contact && (
//                         <ul className="dropdown-menu">
//                             <li>
//                                 <Link to="/contact/email">Email Us</Link>
//                             </li>
//                             <li>
//                                 <Link to="/contact/locations">Our Locations</Link>
//                             </li>
//                         </ul>
//                     )}
//                 </li>
//                 <li>
//                     <Link to="/login" className="navbar-link">
//                         Login
//                     </Link>
//                 </li>
//             </ul>
//         </div>
//     );
// };

// export default Navbar;



import React from 'react';
import {Link} from 'react-router-dom'
import './index.css';

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logo">
        <h1>Rapid Resolve</h1>
        {/* <img src="https://res.cloudinary.com/dghlihlgi/image/upload/v1725002683/Repidlogo_tibxzw.jpg" alt="Rapid Resolve Logo" className='logo-image'/> */}
      </div>
      <ul>
        <li><Link to="/dashboard" className='navbar-link'>
            Home
          </Link></li>
      
        <li><Link to="/about" className='navbar-link'>
            About Us
          </Link></li>
          <li><Link to="/contact" className='navbar-link'>
          Contact Us
          </Link></li>
          <li><Link to="/login" className='navbar-link'>
            Login
          </Link></li>
      </ul>
    </div>
  );
};

export default Navbar;
