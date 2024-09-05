import Navbar from "../Navbar";
import Header from "../Header";
import Footer from "../Footer";
import './index.css'
import EmergencyContacts from "../EmergencyContacts";
import PrepaidnessTips from "../PrepaidnessTips";
import TestimonialCarousel from "../TestimonialCarousel";

const WebsitePage=()=>{
    return(
        <div className="web-container">
            <Navbar/>
            <Header/>
            <EmergencyContacts/>  
            <PrepaidnessTips/>  
            {/* <TestimonialCarousel/> */}
            <Footer/>
        </div>
    )

}
export default WebsitePage;