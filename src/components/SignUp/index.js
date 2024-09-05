import React, { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import "./index.css";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    if (id === "email") {
      setEmail(value);
    } else if (id === "password") {
      setPassword(value);
    } else if (id === "role") {
      setRole(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:9999/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          role: role.toUpperCase(), // Convert role to uppercase as required by the API
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        // Redirect to login page after successful signup
        navigate("/login");
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Sign up failed");
      }
    } catch (error) {
      console.error("Error during sign-up:", error);
      setErrorMessage("An error occurred during sign up.");
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
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
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
        <div className="form-group">
          <label htmlFor="role">Role</label>
          <select
            id="role"
            value={role}
            onChange={handleInputChange}
            required
          >
            <option value="">Select</option>
            <option value="Admin">ADMIN</option>
            <option value="Volunteer">VOLUNTEER</option>
          </select>
        </div>
        {errorMessage && (
          <p className="error-message">{errorMessage}</p>
        )}
        <button type="submit" className="btn-login">Sign Up</button>
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

export default SignUp;
