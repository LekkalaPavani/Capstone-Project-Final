import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar";
import IncidentCard from "../IncidentCard";
import './index.css';
import TopNavbar from "../TopNavbar";

const stateOptions = [
  { name: "All", cities: ["All"] },
  { name: "Maharashtra", cities: ["All", "Mumbai", "Pune", "Nagpur", "Nashik"] },
  { name: "Karnataka", cities: ["All", "Bengaluru", "Mysuru", "Mangaluru", "Hubli"] },
  { name: "Tamil Nadu", cities: ["All", "Chennai", "Coimbatore", "Madurai", "Tiruchirappalli"] },
  { name: "Uttar Pradesh", cities: ["All", "Lucknow", "Kanpur", "Varanasi", "Agra"] },
  { name: "West Bengal", cities: ["All", "Kolkata", "Howrah", "Durgapur", "Siliguri"] },
  { name: "Delhi", cities: ["All", "New Delhi", "Dwarka", "Rohini", "Karol Bagh"] },
  { name: "Gujarat", cities: ["All", "Ahmedabad", "Surat", "Vadodara", "Rajkot"] },
  { name: "Rajasthan", cities: ["All", "Jaipur", "Jodhpur", "Udaipur", "Ajmer"] },
  { name: "Telangana", cities: ["All", "Hyderabad", "Warangal", "Nizamabad", "Karimnagar"] },
  { name: "Kerala", cities: ["All", "Thiruvananthapuram", "Kochi", "Kozhikode", "Kollam"] }
];

const Incidents = () => {
  const [incidents, setIncidents] = useState([]);
  const [state, setState] = useState("All");
  const [city, setCity] = useState("All");
  const [cities, setCities] = useState(["All"]);
  const [filteredIncidents, setFilteredIncidents] = useState([]);

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const response = await fetch("http://localhost:9999/api/incident/reports");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setIncidents(data);
        setFilteredIncidents(data); // Initially, filter incidents to include all
      } catch (error) {
        console.error("Error fetching incidents:", error);
      }
    };

    fetchIncidents();
  }, []);

  useEffect(() => {
    const selectedState = stateOptions.find(option => option.name === state);
    setCities(selectedState ? selectedState.cities : ["All"]);
    setCity("All"); // Reset city when state changes
  }, [state]);

  useEffect(() => {
    const filterIncidents = () => {
      const filtered = incidents.filter(incident => 
        (state === "All" || incident.state === state) && 
        (city === "All" || incident.city === city)
      );
      setFilteredIncidents(filtered);
    };

    filterIncidents();
  }, [state, city, incidents]);

  const handleStateChange = (e) => {
    const newState = e.target.value;
    setState(newState);
  };

  const handleCityChange = (e) => {
    const newCity = e.target.value;
    setCity(newCity);
  };

  return (
    <div className="container-app">
      <Sidebar />
      <div className="view-incident-con">
        <TopNavbar />
        <div className="filter-section">
          <div className="filter-group">
            <label htmlFor="state">State : </label>
            <select id="state" value={state} onChange={handleStateChange}>
              {stateOptions.map((option, index) => (
                <option key={index} value={option.name}>{option.name}</option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label htmlFor="city">City : </label>
            <select id="city" value={city} onChange={handleCityChange}>
              {cities.map((cityOption, index) => (
                <option key={index} value={cityOption}>{cityOption}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="cards-sec">
          {filteredIncidents.length > 0 ? (
            filteredIncidents.map((incident, index) => (
              <IncidentCard key={index} each={incident} />
            ))
          ) : (
            <p>No incidents found for the selected state and city.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Incidents;
