import React from "react";
import Sidebar from "../Sidebar";
import './index.css'
import TopNavbar from "../TopNavbar";
import MapComponent from "../MapComponent";
import Notification from "../Notification";
const Dashboard=()=>{
    return(
     
        <div className="container-app">
            
            <Sidebar/>
            <div className="dashboard-con">
            <TopNavbar/>
            
            <div className="map-con">
            <h1>Incident Summary</h1>
            <MapComponent/>

            
            </div>
            <div className="cards-con">
                <div className="volunteer-card">
                    <h4>Total Hours attended </h4>
                    <h2>23</h2>
                </div>
                <div className="inc-attend-card">
                    <h4>Incidents attended  </h4>
                    <h2>5</h2>
                </div>
                <div className="reward-card">
                    <h3>Points Earned</h3>
                    <h2>100</h2>
                </div>
            </div>
            </div>
            </div>
    )
}
export default Dashboard;