// import React, { useState, useEffect } from 'react';
// import './index.css';

// const Profile = ({ volunteerId }) => {
//     const volunteer=JSON.parse(localStorage.getItem('data'));


//     return (
//         <div className="profile-container">
//             <h1>Profile Details</h1>
//             <p><strong>Name:</strong> {volunteer.contactName}</p>
//             <p><strong>Address:</strong> k{volunteer.address}</p>
//             <p><strong>Age:</strong> {volunteer.age}</p>
//             <p><strong>Gender:</strong> {volunteer.gender}</p>
//             <p><strong>City:</strong> {volunteer.volunteerCity}</p>
//             <p><strong>Phone Number:</strong> {volunteer.phoneNumber}</p>
//             <p><strong>Email:</strong> {volunteer.email}</p>
//             <p><strong>Skills:</strong> {volunteer.skills}</p>
//         </div>
//     );
// };

// export default Profile;

import React from 'react';
import './index.css';

const Profile = () => {
    const volunteer = JSON.parse(localStorage.getItem('data'));

    return (
        <div className='profile-back'>
        <div className="profile-card">
            <div className="profile-header">
                <img 
                    src="https://res.cloudinary.com/dcdjsfp46/image/upload/v1725451362/profile_kw4has.webp" 
                    alt="Profile" 
                    className="profile-photo"
                />
            </div>
            <div className="profile-body">
                <h2 className="profile-name-head">{volunteer.contactName}</h2>
                <p className="profile-location">{volunteer.volunteerCity}, {volunteer.address}</p>
                <p className="profile-position">{volunteer.skills}</p>
                <p className="profile-university">{volunteer.email}</p>

                <div className="profile-stats">
                    <div>
                        {/* <strong>65</strong> */}
                        <span>{volunteer.gender}</span>
                    </div>
                    <div>
                        
                        <span>{volunteer.phoneNumber}</span>
                    </div>
                    <div>
                        
                        <span>{volunteer.age}</span>
                    </div>
                </div>

                
            </div>
        </div>
        </div>
    );
};

export default Profile;
