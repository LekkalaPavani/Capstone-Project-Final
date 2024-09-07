// import { useState, useEffect } from "react";
// import './index.css'; // Import CSS for styling if needed
// import Sidebar from "../Sidebar";

// const Notification = () => {
//     const [notifications, setNotifications] = useState([]);
//     const volunteer = JSON.parse(localStorage.getItem('data'));
//     const volunteerId = volunteer ? volunteer.volunteerId : null;

//     useEffect(() => {
//         const fetchNotifications = async () => {
//             try {
//                 if (!volunteerId) {
//                     console.error('Volunteer ID is not available');
//                     return;
//                 }

//                 const response = await fetch(`http://localhost:9999/api/notifications/${volunteerId}`, {
//                     method: 'GET',
//                     headers: {
//                         'Content-Type': 'application/json'
//                     }
//                 });

//                 if (response.ok) {
//                     const data = await response.json();
//                     console.log(data);
//                     setNotifications(data); // Assuming `data` is an array of notifications
//                 } else {
//                     console.error('Failed to fetch notifications:', response.status);
//                 }
//             } catch (error) {
//                 console.error('Error fetching notifications:', error);
//             }
//         };

//         fetchNotifications();
//     }, [volunteerId]);

//     return (
//         <div className="container-app">
//             <Sidebar/>
//         <div className="notification-container">
//             <h2>Notifications</h2>
//             {notifications.length > 0 ? (
//                 <ul className="notification-list">
//                     {notifications.map((notification, index) => (
//                         <li key={index} className="notification-item">
//                             <p><strong>Message:</strong> {notification.message}</p>
//                             {notification.mapLink && (
//                                 <a href={notification.mapLink} target="_blank" rel="noopener noreferrer">View Map</a>
//                             )}
//                         </li>
//                     ))}
//                 </ul>
//             ) : (
//                 <p>No notifications available.</p>
//             )}
//         </div>
//         </div>
//     );
// };

// export default Notification;
import { useState, useEffect } from "react";
import './index.css'; // Import CSS for styling if needed
import Sidebar from "../Sidebar";

const Notification = () => {
    const [notifications, setNotifications] = useState([]);
    const volunteer = JSON.parse(localStorage.getItem('data'));
    const volunteerId = volunteer ? volunteer.volunteerId : null;

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                if (!volunteerId) {
                    console.error('Volunteer ID is not available');
                    return;
                }

                const response = await fetch(`http://localhost:9999/api/notifications/${volunteerId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    setNotifications(data); // Assuming `data` is an array of notifications
                } else {
                    console.error('Failed to fetch notifications:', response.status);
                }
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };

        fetchNotifications();
    }, [volunteerId]);

    return (
        <div className="container-app">
            <Sidebar/>
            <div className="notification-container">
                <h2>Notifications</h2>
                {notifications.length > 0 ? (
                    <ul className="notification-list">
                        {notifications.map((notification, index) => (
                            <li key={index} className="notification-item">
                             {notification.message}
                                {notification.mapLink && (
                                    <a href={notification.mapLink} target="_blank" rel="noopener noreferrer">View Map</a>
                                )}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No notifications available.</p>
                )}
            </div>
        </div>
    );
};

export default Notification;
