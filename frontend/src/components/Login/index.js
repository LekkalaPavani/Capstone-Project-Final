import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode"; // Correct import for jwt-decode
import "./index.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [role, setRole] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [result, setResult] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    if (id === "email") {
      setEmail(value);
    } else if (id === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:9999/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const jwtToken = data.token;
        const decodedToken = jwtDecode(jwtToken);
        const roles = decodedToken.roles;
        const userRole = roles[0].slice(5); // Remove "ROLE_" from role string

        Cookies.set("jwt_token", jwtToken);
        Cookies.set("role", userRole);

        const url =
          userRole === "ADMIN"
            ? `http://localhost:9999/api/volunteers/by-email/${email}`
            : `http://localhost:9999/api/volunteers/email/${email}`;

        const volunteerResponse = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${jwtToken}`,
          },
          credentials: "include", // Ensures cookies are sent
        });

        if (volunteerResponse.ok) {
          const data1 = await volunteerResponse.json();
          setResult(data1);
          localStorage.setItem("data",JSON.stringify(data1));
          navigate("/dashboard");
        } else if (volunteerResponse.status === 404) {
          if (userRole === "VOLUNTEER") {
            navigate("/fill-profile", { state: { email } });
          }
        } else {
          const errorData = await volunteerResponse.json();
          setErrorMessage(
            errorData || "An error occurred while checking user details."
          );
        }
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.description || "Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage("An error occurred during login.");
    }
  };

  return (
    <div className="login-container">
      <h1 className="logo-image">RAPID RESOLVE</h1>
      <div className="image-con">
        <img
          src="https://res.cloudinary.com/dghlihlgi/image/upload/v1725083306/Saly-3_ehkamc.jpg"
          alt="Driverboy"
          className="image1"
        />
      </div>
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handleInputChange}
            required
          />
        </div>
        {/* <div className="form-group">
          <label htmlFor="role">Role</label>
          <select id="role" value={role} onChange={handleInputChange} required>
            <option value="">Select</option>
            <option value="ADMIN">ADMIN</option>
            <option value="VOLUNTEER">VOLUNTEER</option>
          </select>
        </div> */}
        {errorMessage && <p className="error">{errorMessage}</p>}
        <button type="submit" className="btn-login">
          Login
        </button>
      </form>
      <div>
        <img
          src="https://res.cloudinary.com/dghlihlgi/image/upload/v1725083311/Saly-2_xlmkv4.jpg"
          alt="delivery boy"
          className="image2"
        />
      </div>
    </div>
  );
};

export default LoginForm;
