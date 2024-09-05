import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle, FaBell } from 'react-icons/fa';  
import './index.css';

const TopNavbar = () => {
    const navigate = useNavigate();

    const volunteer=JSON.parse(localStorage.getItem('data'));
    const handleProfileClick = () => {
        const volunteerId=volunteer.volunteerId;
        navigate(`/profile/${volunteerId}`);// Replace '/profile' with the correct route for your profile page
    };
const handleNotificationClick=()=>{
    const volunteerId=volunteer.volunteerId;
    navigate('/notification/:volunteerId');
}
    return (
        <div className='topnav-con'>
            <div className='icon-container'>
                <FaUserCircle className='profile-icon' onClick={handleProfileClick}/>
                <h1 className='profile-name1'>{volunteer.contactName}</h1>
            </div>
            <div><FaBell className='notification-icon' onClick={handleNotificationClick}/></div>
        </div>
    );
};

export default TopNavbar;


