import React, { useState } from "react";
import Sidebar from "../Sidebar";
import "./index.css"; // CSS file for styling

const EmergencyContacts = () => {
  // State to manage selected state and city
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  // Sample emergency contacts data
  const contacts = [
    {
      serviceName: "Fire Department",
      contactNumber: "022-1234-5678",
      address: "101 Fire Brigade Road",
      location: "Andheri East",
      state: "Maharashtra",
      city: "Mumbai",
    },
    {
      serviceName: "Police Department",
      contactNumber: "022-8765-4321",
      address: "Police Headquarters, Azad Maidan",
      location: "Fort",
      state: "Maharashtra",
      city: "Mumbai",
    },
    {
      serviceName: "Ambulance Service",
      contactNumber: "022-2233-4455",
      address: "Health Plaza, Dadar",
      location: "Dadar West",
      state: "Maharashtra",
      city: "Mumbai",
    },
    {
      serviceName: "Fire Department",
      contactNumber: "080-3344-5566",
      address: "203 Fire Station Road",
      location: "Whitefield",
      state: "Karnataka",
      city: "Bengaluru",
    },
    {
      serviceName: "Police Department",
      contactNumber: "080-6677-8899",
      address: "MG Road Police Station",
      location: "MG Road",
      state: "Karnataka",
      city: "Bengaluru",
    },
    {
      serviceName: "Ambulance Service",
      contactNumber: "080-1122-3344",
      address: "Aster CMI Hospital, Hebbal",
      location: "Hebbal",
      state: "Karnataka",
      city: "Bengaluru",
    },
    {
      serviceName: "Fire Department",
      contactNumber: "011-4455-6677",
      address: "No. 4 Fire Station",
      location: "Connaught Place",
      state: "Delhi",
      city: "New Delhi",
    },
    {
      serviceName: "Police Department",
      contactNumber: "011-5544-3322",
      address: "Delhi Police HQ",
      location: "I.T.O.",
      state: "Delhi",
      city: "New Delhi",
    },
    {
      serviceName: "Ambulance Service",
      contactNumber: "011-7788-9922",
      address: "Max Hospital, Saket",
      location: "Saket",
      state: "Delhi",
      city: "New Delhi",
    },
    {
      serviceName: "Fire Department",
      contactNumber: "040-1234-5678",
      address: "56 Fire Lane",
      location: "Banjara Hills",
      state: "Telangana",
      city: "Hyderabad",
    },
    {
      serviceName: "Police Department",
      contactNumber: "040-8765-4321",
      address: "Jubilee Hills Police Station",
      location: "Jubilee Hills",
      state: "Telangana",
      city: "Hyderabad",
    },
    {
      serviceName: "Ambulance Service",
      contactNumber: "040-2233-4455",
      address: "Apollo Hospitals, Jubilee Hills",
      location: "Jubilee Hills",
      state: "Telangana",
      city: "Hyderabad",
    }
  ];

  // Unique states and cities based on contacts data for dropdown options
  const uniqueStates = [...new Set(contacts.map((contact) => contact.state))];
  const uniqueCities = [
    ...new Set(
      contacts
        .filter((contact) => contact.state === selectedState)
        .map((contact) => contact.city)
    ),
  ];

  // Filtered contacts based on selected state and city
  const filteredContacts = contacts.filter(
    (contact) => contact.state === selectedState && contact.city === selectedCity
  );

  return (
    // <div className="container-app">
    //   <Sidebar/>
    <div className="right-main-sec">
      <h1>Emergency Services here!</h1>
      <p>@ Please select a state and city to view emergency contacts</p>
      <div className="selector">
        <div>
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
          >
            <option value="">Select State</option>
            {uniqueStates.map((state, index) => (
              <option key={index} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        <div>
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            disabled={!selectedState}
          >
            <option value="">Select City</option>
            {uniqueCities.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div
        className={`emergency-contacts ${
          selectedState && selectedCity ? "active" : ""
        }`}
      >
        {selectedState && selectedCity && (
          <table className="contacts-table">
            <thead>
              <tr>
                <th>Service Name</th>
                <th>Contact Number</th>
                <th>Address</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              {filteredContacts.map((contact, index) => (
                <tr key={index}>
                  <td>{contact.serviceName}</td>
                  <td>
                    <a href={`tel:${contact.contactNumber}`}>
                      {contact.contactNumber}
                    </a>
                  </td>
                  <td>{contact.address}</td>
                  <td>{contact.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
    // </div>
  );
};

export default EmergencyContacts;
