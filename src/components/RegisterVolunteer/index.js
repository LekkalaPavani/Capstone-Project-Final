import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

const RegisterVolunteer = () => {
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [cities, setCities] = useState([]);

  const location = useLocation();
  const emailFromState = location.state?.email || '';

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    contactName: '',
    address: '',
    state: '',
    volunteerCity: '',
    age: '',
    gender: '',
    phoneNumber: '',
    email: emailFromState,
    skills: '',
    // photoPath: ''
  });

  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // List of states and corresponding cities
  const states = [
    { name: 'Maharashtra', cities: ['Mumbai', 'Pune', 'Nagpur', 'Nashik'] },
    { name: 'Karnataka', cities: ['Bengaluru', 'Mysuru', 'Mangaluru', 'Hubli'] },
    { name: 'Tamil Nadu', cities: ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli'] },
    { name: 'Uttar Pradesh', cities: ['Lucknow', 'Kanpur', 'Varanasi', 'Agra'] },
    { name: 'West Bengal', cities: ['Kolkata', 'Howrah', 'Durgapur', 'Siliguri'] },
    { name: 'Delhi', cities: ['New Delhi', 'Dwarka', 'Rohini', 'Karol Bagh'] },
    { name: 'Gujarat', cities: ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot'] },
    { name: 'Rajasthan', cities: ['Jaipur', 'Jodhpur', 'Udaipur', 'Ajmer'] },
    { name: 'Telangana', cities: ['Hyderabad', 'Warangal', 'Nizamabad', 'Karimnagar'] },
    { name: 'Kerala', cities: ['Thiruvananthapuram', 'Kochi', 'Kozhikode', 'Kollam'] }
  ];

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setSelectedState(selectedState);

    // Find the cities corresponding to the selected state
    const state = states.find((state) => state.name === selectedState);
    setCities(state ? state.cities : []);
    setSelectedCity(''); // Reset city selection when state changes

    setFormData((prevData) => ({
      ...prevData,
      state: selectedState,
      volunteerCity: '', // Reset city in formData
    }));
  };

  const handleCityChange = (e) => {
    const selectedCity = e.target.value;
    setSelectedCity(selectedCity);

    setFormData((prevData) => ({
      ...prevData,
      volunteerCity: selectedCity,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const jwtToken = Cookies.get('jwt_token');

    try {
      const response = await fetch('http://localhost:9999/api/volunteers/createVolunteer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
      
        toast.success('Volunteer registered successfully!');
        navigate('/login');
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message);
        toast.error('Registration failed: ' + errorData.message);
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setErrorMessage('An error occurred during registration.');
      toast.error('An error occurred during registration.');
    }
  };

  return (
    <div className="register-container">
      <div className="form-container">
        <h1>Register As Volunteer</h1>
        <p>We wish to help; you can register here</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="contactName"
            placeholder="Contact name"
            value={formData.contactName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
          />
          <div className="form-group">
            <label htmlFor="state">State</label>
            <select name="state" value={selectedState} onChange={handleStateChange} required>
              <option value="">Select a state</option>
              {states.map((state, index) => (
                <option key={index} value={state.name}>{state.name}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="city">City</label>
            <select name="volunteerCity" value={selectedCity} onChange={handleCityChange} required>
              <option value="">Select a city</option>
              {cities.map((city, index) => (
                <option key={index} value={city}>{city}</option>
              ))}
            </select>
          </div>
          <div className="age-postcode">
            <input
              type="number"
              name="age"
              placeholder="Age"
              value={formData.age}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="gender"
              placeholder="Gender"
              value={formData.gender}
              onChange={handleChange}
              required
            />
          </div>
          <input
            type="tel"
            name="phoneNumber"
            placeholder="Contact Phone"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="text"
            name="skills"
            placeholder="Skills/Training"
            value={formData.skills}
            onChange={handleChange}
          />
          {/* <div className="upload">
            <label>Upload a Photo</label>
            <input
              id="file-upload"
              type="file"
              name="photoPath"
              onChange={(e) => setFormData((prevData) => ({
                ...prevData,
                photoPath: e.target.files[0],
              }))}
            />
            <small>Attach file. File size of your documents should not exceed 10MB</small>
          </div> */}
          <button type="submit">SUBMIT</button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeButton={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default RegisterVolunteer;
