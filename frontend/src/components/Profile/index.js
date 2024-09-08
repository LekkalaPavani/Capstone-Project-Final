import React, { useState } from 'react';
import './index.css';

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

const Profile = () => {
    const volunteer = JSON.parse(localStorage.getItem('data'));

    const [isAvailable, setIsAvailable] = useState(volunteer.availability === 'AVAILABLE');
    const [isEditing, setIsEditing] = useState(false);
    const [contactName, setContactName] = useState(volunteer.contactName);
    const [address, setAddress] = useState(volunteer.address);
    const [age, setAge] = useState(volunteer.age);
    const [gender, setGender] = useState(volunteer.gender);
    const [selectedState, setSelectedState] = useState(volunteer.state || states[0].name);
    const [volunteerCity, setVolunteerCity] = useState(volunteer.volunteerCity || states[0].cities[0]);
    const [phoneNumber, setPhoneNumber] = useState(volunteer.phoneNumber);
    const [email, setEmail] = useState(volunteer.email);
    const [skills, setSkills] = useState(volunteer.skills);

    const toggleStatus = async () => {
        const newStatus = !isAvailable;

        try {
            const response = await fetch(`http://localhost:9999/api/volunteers/update/${volunteer.volunteerId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ availability: newStatus ? 'AVAILABLE' : 'UNAVAILABLE' }),
            });

            if (response.ok) {
                const updatedData = await response.json();
                setIsAvailable(newStatus);
                localStorage.setItem('data', JSON.stringify(updatedData));
                alert('Availability status updated successfully');
            } else {
                alert('Error updating availability status');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleStateChange = (e) => {
        const selected = e.target.value;
        setSelectedState(selected);
        setVolunteerCity(states.find(state => state.name === selected).cities[0]);
    };

    const handleSave = async () => {
        const updatedVolunteer = {
            contactName,
            address,
            age,
            gender,
            state: selectedState,
            volunteerCity,
            phoneNumber,
            email,
            skills,
            availability: isAvailable ? 'AVAILABLE' : 'UNAVAILABLE',
        };

        try {
            const response = await fetch(`http://localhost:9999/api/volunteers/update/${volunteer.volunteerId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedVolunteer),
            });

            if (response.ok) {
                const updatedData = await response.json();
                localStorage.setItem('data', JSON.stringify(updatedData));
                alert('Profile updated successfully');
                setIsEditing(false);
            } else {
                alert('Error updating profile');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="profile-back">
            <div className={`profile-card ${isEditing ? 'editing' : ''}`}>
                <div className="profile-header">
                    <img 
                        src="https://res.cloudinary.com/dcdjsfp46/image/upload/v1725451362/profile_kw4has.webp" 
                        alt="Profile" 
                        className="profile-photo"
                    />
                </div>

                <div className="profile-body">
                    {isEditing ? (
                        <>
                            <input 
                                type="text" 
                                value={contactName} 
                                onChange={(e) => setContactName(e.target.value)} 
                                className="profile-input" 
                                placeholder="Name"
                            />
                            <select 
                                value={selectedState} 
                                onChange={handleStateChange} 
                                className="profile-select"
                            >
                                {states.map((state) => (
                                    <option key={state.name} value={state.name}>
                                        {state.name}
                                    </option>
                                ))}
                            </select>
                            <select 
                                value={volunteerCity} 
                                onChange={(e) => setVolunteerCity(e.target.value)} 
                                className="profile-select"
                            >
                                {states.find(state => state.name === selectedState).cities.map((city) => (
                                    <option key={city} value={city}>
                                        {city}
                                    </option>
                                ))}
                            </select>
                            <input 
                                type="text" 
                                value={skills} 
                                onChange={(e) => setSkills(e.target.value)} 
                                className="profile-input" 
                                placeholder="Skills"
                            />
                            <input 
                                type="email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                className="profile-input" 
                                placeholder="Email"
                            />

                            <div className="profile-stats">
                                <input 
                                    type="text" 
                                    value={gender} 
                                    onChange={(e) => setGender(e.target.value)} 
                                    className="profile-input" 
                                    placeholder="Gender"
                                />
                                <input 
                                    type="text" 
                                    value={phoneNumber} 
                                    onChange={(e) => setPhoneNumber(e.target.value)} 
                                    className="profile-input" 
                                    placeholder="Phone Number"
                                />
                                <input 
                                    type="number" 
                                    value={age} 
                                    onChange={(e) => setAge(e.target.value)} 
                                    className="profile-input" 
                                    placeholder="Age"
                                />
                            </div>
                            
                            <div className="status-sec">
                <button onClick={toggleStatus} className="status-button">
                    {isAvailable ? 'AVAILABLE' : 'UNAVAILABLE'}
                </button>
            </div>
                        </>
                    ) : (
                        <>
                            <h2 className="profile-name-head">{contactName}</h2>
                            <p className="profile-location">{volunteerCity}, {selectedState}</p>
                            <p className="profile-position">{skills}</p>
                            <p className="profile-university">{email}</p>

                            <div className="profile-stats">
                                <span>{gender}</span>
                                <span>{phoneNumber}</span>
                                <span>{age} years</span>
                            </div>
                        </>
                    )}
                </div>
            </div>

            <div className="status-sec">
                <button onClick={toggleStatus} className="status-button">
                    {isAvailable ? 'AVAILABLE' : 'UNAVAILABLE'}
                </button>
            </div>

            <div className="edit-save-sec">
                {isEditing ? (
                    <>
                        <button onClick={handleSave} className="edit-save-button">
                            Save Profile
                        </button>
                        <button onClick={() => setIsEditing(false)} className="edit-save-button">
                            Cancel
                        </button>
                    </>
                ) : (
                    <button onClick={() => setIsEditing(true)} className="edit-save-button">
                        Edit Profile
                    </button>
                )}
            </div>
        </div>
    );
};

export default Profile;
