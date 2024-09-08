import React, { Component } from "react";
import { FaInstagram, FaTwitter, FaFacebook, FaWhatsapp } from "react-icons/fa"; // Importing icons from react-icons
import "./index.css";

// Array of icons and their respective links
const socialIcons = [
  {
    component: <FaInstagram color="#E4405F" size={24} />, // Instagram icon with original color
    alt: "Instagram icon",
    link: "https://www.instagram.com", // Link to Instagram
  },
  {
    component: <FaTwitter color="#1DA1F2" size={24} />, // Twitter icon with original color
    alt: "Twitter icon",
    link: "https://www.twitter.com", // Link to Twitter
  },
  {
    component: <FaFacebook color="#1877F2" size={24} />, // Facebook icon with original color
    alt: "Facebook icon",
    link: "https://www.facebook.com", // Link to Facebook
  },
  {
    component: <FaWhatsapp color="#25D366" size={24} />, // WhatsApp icon with original color
    alt: "WhatsApp icon",
    link: "https://www.whatsapp.com", // Link to WhatsApp
  },
];

const SocialIcon = ({ component, alt, link }) => (
  <a href={link} target="_blank" rel="noopener noreferrer" className="social-icon">
    {component}
  </a>
);

class Footer extends Component {
  render() {
    return (
      <section className="contactSection">
        <div className="contentWrapper">
          <h1>Rapid Resolve</h1>
          {/* <img
            loading="lazy"
            src="https://res.cloudinary.com/dghlihlgi/image/upload/v1725002683/Repidlogo_tibxzw.jpg"
            alt="Company logo"
            className="footer-logo"
          /> */}

          <h1 className="mainHeading">Together in action, Ready in Crisis</h1>
          <h2 className="subHeading">Contact us on</h2>
          <div className="socialIcons">
            {socialIcons.map((icon, index) => (
              <SocialIcon key={index} {...icon} />
            ))}
          </div>
        </div>
        <div className="contactInfo">
          <div className="emailWrapper">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/6044b952dc456092fd42b3d4ff83fa698068ef40314a91745444835b0e3e1110?placeholderIfAbsent=true&apiKey=c0675f285b7e411a80445cebc7c0b8d3"
              alt="Email icon"
              className="emailIcon"
            />
            <address className="emailAddress">
              <a href="mailto:rapidresolve7@mail.com" className="link">
                rapidresolve7@mail.com
              </a>
            </address>
          </div>
          <div className="phoneWrapper">
            <div className="phoneNumber">
              <a href="tel:9988776655" className="link">
                9988776655
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Footer;
