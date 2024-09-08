import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import Header from "../Header";
import Footer from "../Footer";
import EmergencyContacts from "../EmergencyContacts";
import PrepaidnessTips from "../PrepaidnessTips";
import './index.css';

const WebsitePage = () => {
  const [latestIncident, setLatestIncident] = useState(null);

  useEffect(() => {
    const fetchLatestIncident = async () => {
      try {
        const response = await fetch("http://localhost:9999/api/incident/reports");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.group(data);
        if (data.length > 0) {
          // Get the latest incident
          const latest = data[data.length - 1];
          const reportedAt = new Date(latest.reportedAt);
          const now = new Date();

          // Calculate the difference in hours
          const timeDifference = (now - reportedAt) / (1000 * 60 * 60); // Convert milliseconds to hours
          console.log(timeDifference);

          // Display if incident is within the last 12 hours
          if (timeDifference <= 12) {
            setLatestIncident(latest);
          }
        }
      } catch (error) {
        console.error("Error fetching incidents:", error);
      }
    };

    fetchLatestIncident();
  }, []);

  return (
    <div className="web-container">
      <Navbar />
      {latestIncident && (
        <div className="marquee-container">
          <marquee behavior="scroll" direction="left">
            {`Latest Incident: ${latestIncident.typeOfIncident} - ${latestIncident.description} in ${latestIncident.city}, reported at ${new Date(latestIncident.reportedAt).toLocaleString()}`}
          </marquee>
        </div>
      )}
      <Header />
      <EmergencyContacts />
      <PrepaidnessTips />
      <Footer />
    </div>
  );
};

export default WebsitePage;
