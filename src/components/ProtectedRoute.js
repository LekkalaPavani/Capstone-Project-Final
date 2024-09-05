// // src/components/ProtectedRoute.js
// import React from 'react';
// import { Route, Navigate } from 'react-router-dom';
// import jwt_decode from 'jwt-decode';
// import Sidebar from './Sidebar';

// const ProtectedRoute = ({ element: Component, requiredRole, ...rest }) => {
//   const token = localStorage.getItem('token');
//   const user = token ? jwt_decode(token) : null;

//   return (
//     <Route
//       {...rest}
//       element={
//         user && (!requiredRole || user.role === requiredRole) ? (
//           <>
//             <Sidebar /> {/* Show Sidebar on protected routes */}
//             <Component />
//           </>
//         ) : (
//           <Navigate to="/login" />
//         )
//       }
//     />
//   );
// };

// export default ProtectedRoute;
