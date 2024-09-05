import React from 'react';
import './index.css';

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <h1>About Us</h1>
      <p>
        Welcome to Rapid Resolve, an innovative emergency coordination system designed to enhance 
        response efficiency and connectivity during critical incidents. Our platform is dedicated to 
        providing real-time support and communication to ensure swift and effective actions in emergency 
        situations. Our mission is to bridge the gap between individuals in need and emergency services 
        by leveraging cutting-edge technology and a network of dedicated volunteers.
      </p>
      <div className="cards-container">
        <div className="card">
          <h2>Our Vision</h2>
          <p>
            To create a world where emergency responses are seamless, timely, and effectively coordinated 
            through advanced technology and community engagement.
          </p>
        </div>
        <div className="card">
          <h2>Our Mission</h2>
          <p>
            To empower communities with a reliable and efficient emergency coordination system that connects 
            victims, volunteers, and emergency services, ensuring swift and effective responses during critical 
            incidents.
          </p>
        </div>
        <div className="card">
          <h2>Our Values</h2>
          <p>
            Integrity, reliability, and innovation. We are committed to maintaining the highest standards of 
            integrity in our operations, providing reliable support to those in need, and continuously innovating 
            to improve our emergency coordination system.
          </p>
        </div>
      </div>
      <div className="testimonials-container">
        <h2>What People Are Saying</h2>
        <div className="testimonials-cards">
          <div className="testimonial-card">
            <p>"Rapid Resolve has truly revolutionized our emergency response capabilities. The system is reliable, 
               user-friendly, and has significantly improved our coordination efforts."</p>
            <h4>John Doe</h4>
            <p>Emergency Coordinator</p>
          </div>
          <div className="testimonial-card">
            <p>"As a volunteer, I’ve found Rapid Resolve to be an invaluable tool. It makes communication and coordination 
               during emergencies much smoother and more efficient."</p>
            <h4>Jane Smith</h4>
            <p>Volunteer</p>
          </div>
          <div className="testimonial-card">
            <p>"The Rapid Resolve team has done an excellent job creating a system that meets our needs. The platform is 
               intuitive and has helped us respond more quickly to critical situations."</p>
            <h4>Michael Johnson</h4>
            <p>First Responder</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
