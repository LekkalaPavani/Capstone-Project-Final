import Sidebar from '../Sidebar'
import IncidentCard from '../IncidentCard'
import './index.css'
import Cookies from 'js-cookie';
import TopNavbar from '../TopNavbar'
import { useEffect, useState } from 'react'

const ViewVolunteers = ()=>{
    const [volunteers,setVolunteers] = useState([]);
    const jwtToken = Cookies.get("jwt_token");
    useEffect(() => {
        const fetchVolunteers = async () => {
          try {
            const response = await fetch("http://localhost:9999/api/volunteers/allvolunteers", {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                // Authorization: `Bearer ${jwtToken}`,  // Add the Authorization header
              },
            });
    
            if (response.ok) {
              const data = await response.json();
              console.log(data);
              const newData = data.map((each)=>({
                "contactName":each.contactName,
                "contactPhone":each.phoneNumber,
                "email":each.email,
                "age":each.age,
                "availabilityStatus":each.availabilityStatus,
                "state":each.state,
                "city":each.volunteerCity,
                "skills":each.skills,
              }))
              setVolunteers(newData); // Update state with fetched data
            } else {
              console.error("Failed to fetch volunteers");
            }
          } catch (error) {
            console.error("Error fetching volunteers:", error);
          }
        };
    
        fetchVolunteers();
      },[]); 

    return(
        <div className='container-app'>
            <Sidebar/>
            <div className='right-main-sec space-left-em'>
               <TopNavbar/>
               <div className='cards-container'>
                        {volunteers.map((each)=>
                            <IncidentCard each={each}/>)
                        }
               </div>

            </div>

        </div>
    )
}

export default ViewVolunteers;