import './index.css';
import Cookies from 'js-cookie';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

const IncidentCard = ({ each }) => {
    const [isAvailable, setIsAvailable] = useState(true);
    const loc = useLocation();
    const role = Cookies.get("role");
    const toggleStatus = () => {
        setIsAvailable(!isAvailable); // Toggle the status
      };
    const { photo,city, state,contactName, contactPhone,typeOfIncident, location ,status,availabilityStatus} = each;
    return (

        <>
        
        <div className="incident-card">
        {
            loc.pathname==="/view-volunteers" ? (
                <div className='view-volunteer'>
                <img src="https://randomuser.me/api/portraits/men/1.jpg" alt="profile" className='profile-img'/>
                <h3 className='head'>{contactName}</h3>
            </div>
            ) :  <h3 className='head'>{typeOfIncident} Incident</h3>
        }
           {
            loc.pathname!=="/view-volunteers" && <p><strong>Name:</strong> {contactName}</p>
           }
            
            <p><strong>Phone:</strong> {contactPhone}</p>
           
            <p><strong>City:</strong> {city}</p>
            <p><strong>State:</strong>{state}</p>
            
          {
            loc.pathname==="/view-volunteers" &&
            <p><strong>Status:</strong> <button
            onClick={toggleStatus}
            style={{
              padding: '10px 20px',
              backgroundColor: isAvailable ? 'green' : 'red',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              marginLeft:"10px",
            }}
          >
            {isAvailable ? 'Available' : 'Not Available'}
          </button></p>}
          {
          } 
            
        </div>
        </>
    );
};

export default IncidentCard;
