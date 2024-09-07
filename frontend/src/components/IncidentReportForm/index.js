// import React, { useState } from "react";
// import { useNavigate } from 'react-router-dom';
// import MapComponent from "../MapComponent";
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css'; // Default styles
// import './index.css'; // Custom styles

// const IncidentReportForm = () => {
//   const [contactName, setContactName] = useState("");
//   const [location, setLocation] = useState("");
//   const [contactPhone, setContactPhone] = useState("");
//   const [description, setDescription] = useState("");
//   const [typeOfIncident, setTypeOfIncident] = useState("");
//   const [typeOfPerson, setTypeOfPerson] = useState("");
//   const [latitude, setLatitude] = useState("");
//   const [longitude, setLongitude] = useState("");
//   const [state, setState] = useState("");
//   const [city, setCity] = useState("");
//   // const [photoPath, setPhotoPath] = useState(null);

//   const [cities, setCities] = useState([]);

//   const states = [
//     { name: "Maharashtra", cities: ["Mumbai", "Pune", "Nagpur", "Nashik"] },
//     { name: "Karnataka", cities: ["Bengaluru", "Mysuru", "Mangaluru", "Hubli"] },
//     { name: "Tamil Nadu", cities: ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli"] },
//     { name: "Uttar Pradesh", cities: ["Lucknow", "Kanpur", "Varanasi", "Agra"] },
//     { name: "West Bengal", cities: ["Kolkata", "Howrah", "Durgapur", "Siliguri"] },
//     { name: "Delhi", cities: ["New Delhi", "Dwarka", "Rohini", "Karol Bagh"] },
//     { name: "Gujarat", cities: ["Ahmedabad", "Surat", "Vadodara", "Rajkot"] },
//     { name: "Rajasthan", cities: ["Jaipur", "Jodhpur", "Udaipur", "Ajmer"] },
//     { name: "Telangana", cities: ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar"] },
//     { name: "Kerala", cities: ["Thiruvananthapuram", "Kochi", "Kozhikode", "Kollam"] }
//   ];

//   const handleStateChange = (e) => {
//     const selectedState = e.target.value;
//     setState(selectedState);
//     const state = states.find(state => state.name === selectedState);
//     setCities(state ? state.cities : []);
//     setCity(""); // Reset city selection when state changes
//   };

//   const handleCityChange = (e) => {
//     setCity(e.target.value);
//   };

//   const handleLocationSelect = (lat, lng) => {
//     setLatitude(lat);
//     setLongitude(lng);
//   };

//   // const handleFileChange = (e) => {
//   //   setPhotoPath(e.target.files[0]);
//   // };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const requestData = {
//       contactName,
//       location,
//       contactPhone,
//       description,
//       typeOfIncident,
//       typeOfPerson,
//       latitude,
//       longitude,
//       state,
//       city,
//       // photoPath: photoPath ? photoPath.name : null, // Adjust based on how you handle files
//   };
//     try {
//       const response = await fetch("http://localhost:8001/api/incident/report", {
//         method: "POST",
//         headers:{
//           "Content-Type":"application/json",
//         },
//         body: JSON.stringify(requestData),
//     });
 
//       if (response.ok) {
//         toast.success("Incident reported successfully!", {
//           position: "top-right",
//         });
//         console.log("Form submitted with values:", { contactName, location, contactPhone, description, typeOfIncident, typeOfPerson, latitude, longitude, state, city });
//       } else {
//         throw new Error("Failed to report incident");
//       }
//     } catch (error) {
//       toast.error("Failed to report incident. Please try again.", {
//         position: "top-right",
//       });
//       console.error("Error reporting incident:", error);
//     }
//   };

//   const handlePersonTypeChange = (event) => {
//     const value = event.target.value;
//     setTypeOfPerson(value);

//     if (value === "Victim") {
//       navigator.geolocation.getCurrentPosition((position) => {
//         const { latitude, longitude } = position.coords;
//         setLatitude(latitude);
//         setLongitude(longitude);
//       });
//     } else if (value === "Viewer") {
//       setLatitude("");
//       setLongitude("");
//     }
//   };

//   return (
//     <div className="incident-container">
//       <div className="incident-report-container">
//         <div className="form-section">
//           <h2>Report an Incident</h2>
//           <p>
//             We provide help when you report an incident. Please fill out the report incident form!
//           </p>
//           <form onSubmit={handleSubmit}>
//             <div className="form-group">
//               <input
//                 type="text"
//                 placeholder="Contact name"
//                 value={contactName}
//                 onChange={(e) => setContactName(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <input
//                 type="text"
//                 placeholder="Address"
//                 value={location}
//                 onChange={(e) => setLocation(e.target.value)}
//               />
//               <div className="form-group">
//                 <label htmlFor="state">State</label>
//                 <select name="state" value={state} onChange={handleStateChange} required>
//                   <option value="">Select a state</option>
//                   {states.map((state, index) => (
//                     <option key={index} value={state.name}>{state.name}</option>
//                   ))}
//                 </select>
//               </div>
//               <div className="form-group">
//                 <label htmlFor="city">City</label>
//                 <select name="city" value={city} onChange={handleCityChange} required>
//                   <option value="">Select a city</option>
//                   {cities.map((city, index) => (
//                     <option key={index} value={city}>{city}</option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//             <div className="form-group">
//               <input
//                 type="text"
//                 placeholder="Contact Phone"
//                 value={contactPhone}
//                 onChange={(e) => setContactPhone(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <input
//                 type="text"
//                 placeholder="Incident Description"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <label>Type of incident</label>
//               <select value={typeOfIncident} onChange={(e) => setTypeOfIncident(e.target.value)} required>
//                 <option value="">Select</option>
//                 <option value="Fire">Fire</option>
//                 <option value="Accident">Accident</option>
//                 <option value="Floods">Floods</option>
//                 <option value="Other">Other</option>
//               </select>
//             </div>
//             <div className="form-group">
//               <label>Type of person</label>
//               <div className="radio-group">
//                 <label>
//                   <input
//                     type="radio"
//                     name="personType"
//                     value="Victim"
//                     onChange={handlePersonTypeChange}
//                     required
//                   /> Victim
//                 </label>
//                 <label>
//                   <input
//                     type="radio"
//                     name="personType"
//                     value="Viewer"
//                     onChange={handlePersonTypeChange}
//                     required
//                   /> Viewer
//                 </label>
//               </div>
//             </div>
//             <div className="form-group">
//               <input type="text" placeholder={latitude || "Latitude"} value={latitude} readOnly required />
//             </div>
//             <div className="form-group">
//               <input type="text" placeholder={longitude || "Longitude"} value={longitude} readOnly required />
//             </div>
//             {/* <div className="form-group">
//               <label>Upload Incident Photos</label>
//               <input type="file" onChange={handleFileChange} />
//             </div> */}
//             <button type="submit" className="submit-button">Submit</button>
//           </form>
//         </div>
//         <div className="map-section">
//           <MapComponent onLocationSelect={handleLocationSelect} />
//         </div>
//       </div>
//       <ToastContainer
//   position="top-right"
//   autoClose={5000}
//   hideProgressBar
//   newestOnTop
//   closeButton={false}
//   pauseOnHover
//   pauseOnFocusLoss
//   draggable
// />

//     </div>
//   );
// };

// export default IncidentReportForm;

















import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import MapComponent from "../MapComponent";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Default styles
import './index.css'; // Custom styles

const IncidentReportForm = () => {
  const [contactName, setContactName] = useState("");
  const [location, setLocation] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [description, setDescription] = useState("");
  const [typeOfIncident, setTypeOfIncident] = useState("");
  const [typeOfPerson, setTypeOfPerson] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  // const [photoPath, setPhotoPath] = useState(null);

  const [cities, setCities] = useState([]);

  const states = [
    { name: "Maharashtra", cities: ["Mumbai", "Pune", "Nagpur", "Nashik"] },
    { name: "Karnataka", cities: ["Bengaluru", "Mysuru", "Mangaluru", "Hubli"] },
    { name: "Tamil Nadu", cities: ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli"] },
    { name: "Uttar Pradesh", cities: ["Lucknow", "Kanpur", "Varanasi", "Agra"] },
    { name: "West Bengal", cities: ["Kolkata", "Howrah", "Durgapur", "Siliguri"] },
    { name: "Delhi", cities: ["New Delhi", "Dwarka", "Rohini", "Karol Bagh"] },
    { name: "Gujarat", cities: ["Ahmedabad", "Surat", "Vadodara", "Rajkot"] },
    { name: "Rajasthan", cities: ["Jaipur", "Jodhpur", "Udaipur", "Ajmer"] },
    { name: "Telangana", cities: ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar"] },
    { name: "Kerala", cities: ["Thiruvananthapuram", "Kochi", "Kozhikode", "Kollam"] }
  ];

  const navigate = useNavigate(); // Initialize the navigate function

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setState(selectedState);
    const state = states.find(state => state.name === selectedState);
    setCities(state ? state.cities : []);
    setCity(""); // Reset city selection when state changes
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleLocationSelect = (lat, lng) => {
    setLatitude(lat);
    setLongitude(lng);
  };
  const saveMarker = (lat, lng) => {
    const currentMarkers = JSON.parse(localStorage.getItem('markers')) || [];
    currentMarkers.push({ lat, lng });
    localStorage.setItem('markers', JSON.stringify(currentMarkers));
  };
  // const handleFileChange = (e) => {
  //   setPhotoPath(e.target.files[0]);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (latitude && longitude) {
      saveMarker(latitude, longitude);
    }
    console.log('Form submitted with values:', { latitude, longitude });

    const requestData = {
      contactName,
      location,
      contactPhone,
      description,
      typeOfIncident,
      typeOfPerson,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      state,
      city,
    };
    

    try {
      const response = await fetch("http://localhost:9999/api/incident/report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        toast.success("Incident reported successfully!", {
          position: "top-right",
        });
        navigate('/'); // Navigate to the home page after successful submission
      } else {
        throw new Error("Failed to report incident");
      }
    } catch (error) {
      toast.error("Failed to report incident. Please try again.", {
        position: "top-right",
      });
      console.error("Error reporting incident:", error);
    }
  };

  const handlePersonTypeChange = (event) => {
    const value = event.target.value;
    setTypeOfPerson(value);

    if (value === "Victim") {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);
      });
    } else if (value === "Viewer") {
      setLatitude("");
      setLongitude("");
    }
  };

  return (
    <div className="incident-container">
      <div className="incident-report-container">
        <div className="form-section">
          <h2>Report an Incident</h2>
          <p>
            We provide help when you report an incident. Please fill out the report incident form!
          </p>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Contact name"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Address"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <div className="form-group">
                <label htmlFor="state">State</label>
                <select name="state" value={state} onChange={handleStateChange} required>
                  <option value="">Select a state</option>
                  {states.map((state, index) => (
                    <option key={index} value={state.name}>{state.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="city">City</label>
                <select name="city" value={city} onChange={handleCityChange} required>
                  <option value="">Select a city</option>
                  {cities.map((city, index) => (
                    <option key={index} value={city}>{city}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Contact Phone"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Incident Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Type of incident</label>
              <select value={typeOfIncident} onChange={(e) => setTypeOfIncident(e.target.value)} required>
                <option value="">Select</option>
                <option value="Fire">Fire</option>
                <option value="Accident">Accident</option>
                <option value="Floods">Floods</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label>Type of person</label>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    name="personType"
                    value="Victim"
                    onChange={handlePersonTypeChange}
                    required
                  /> Victim
                </label>
                <label>
                  <input
                    type="radio"
                    name="personType"
                    value="Viewer"
                    onChange={handlePersonTypeChange}
                    required
                  /> Viewer
                </label>
              </div>
            </div>
            <div className="form-group">
              <input type="text" placeholder={latitude || "Latitude"} value={latitude} readOnly required />
            </div>
            <div className="form-group">
              <input type="text" placeholder={longitude || "Longitude"} value={longitude} readOnly required />
            </div>
            {/* <div className="form-group">
              <label>Upload Incident Photos</label>
              <input type="file" onChange={handleFileChange} />
            </div> */}
            <button type="submit" className="submit-button">Submit</button>
          </form>
        </div>
        <div className="map-section">
          <MapComponent onLocationSelect={handleLocationSelect} />
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeButton={false}
        pauseOnHover
        pauseOnFocusLoss
        draggable
      />
    </div>
  );
};

export default IncidentReportForm;
