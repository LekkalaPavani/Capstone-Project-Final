import './index.css';

const IncidentCard = ({ each }) => {
    const { contactName, contactPhone,typeOfIncident, location ,status} = each;
    return (
        <div className="incident-card">
            <h3>{typeOfIncident} Incident</h3>
            <p><strong>Name:</strong> {contactName}</p>
            <p><strong>Phone:</strong> {contactPhone}</p>
            <p><strong>Location:</strong> {location}</p>
          
            
        </div>
    );
};

export default IncidentCard;
