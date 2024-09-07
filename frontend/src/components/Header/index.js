import { useNavigate } from 'react-router-dom';
import './index.css';
import IncidentReportForm from '../IncidentReportForm';

const Header = () => {

  const navigate = useNavigate();

  const handleReportIncident = () => {
    navigate('/report');
  };

  const handleRegisterVolunteer = () => {
    navigate('/volunter-register');
  };
  return (
      <div className="head-container">
        <div className="header-container">
      <p>
        Volunteers are individuals who offer their time and skills to support various 
        causes without expecting payment. In emergency coordination projects, 
        they play a vital role in providing assistance and support to communities during crises.
      </p>
      <div className="started-container">
          <button className="volunteer-btn" onClick={handleRegisterVolunteer}>
            Register as a Volunteer
          </button>
          <button className="incident-btn" onClick={handleReportIncident}>
            Report an Incident
          </button>
        </div>
        <p> ! If You need any Volunteer service  please report an incident</p>
      
    </div>
    
      </div>
    
  );
};

export default Header;
