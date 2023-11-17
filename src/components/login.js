import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useNavigate } from "react-router-dom";

const PasswordField = ({ onPasswordChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  const containerStyle = {
    display: "flex",
    alignItems: "center",
    position: "relative",
  };

  const inputStyle = {
    fontSize: "20px",
    padding: "12px",
    width: "500px",
    backgroundColor: "#000000",
    color: "#FFFFFF",
    borderRadius: "10px",
    marginRight: "10px",
    marginBottom: "0",
    border: "1px solid #FFFFFF",
  };

  const eyeIconStyle = {
    cursor: "pointer",
    fontSize: "20px",
    position: "absolute",
    right: "20px",
    top: "50%",
    transform: "translateY(-50%)",
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handlePasswordChange = (event) => {
    onPasswordChange(event.target.value);
  };

  return (
    <div style={containerStyle}>
      <input
        type={showPassword ? "text" : "password"}
        style={inputStyle}
        placeholder="Password"
        onChange={handlePasswordChange}
      />
      <i
        className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
        style={eyeIconStyle}
        onClick={togglePasswordVisibility}
      ></i>
    </div>
  );
};

const Login = () => {
  const navigate = useNavigate();
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#030303",
    color: "#FFFFFF",
    fontFamily: "Poppins, sans-serif",
  };

  const headingStyle = {
    fontSize: "32px",
    marginBottom: "20px",
  };

  const fieldContainerStyle = {
    display: "flex",
    flexDirection: "column",
    marginBottom: "15px",
    width: "500px",
  };

  const labelStyle = {
    fontSize: "16px",
    marginBottom: "5px",
  };

  const inputStyle = {
    fontSize: "20px",
    padding: "12px",
    width: "465px",
    backgroundColor: "#000000",
    color: "#FFFFFF",
    borderRadius: "10px",
    marginRight: "10px",
    border: "1px solid #FFFFFF",
  };

  const signInButtonStyle = {
    fontSize: "18px",
    padding: "10px",
    width: "500px",
    backgroundColor: "#6741D9",
    color: "#FFFFFF",
    borderRadius: "10px",
    cursor: "pointer",
    marginTop: "20px",
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleInputChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (newPassword) => {
    setPassword(newPassword);
  };

  const handleSignIn = () => {
    var raw = JSON.stringify({
      username: username,
      password: password,
    });

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: raw,
      redirect: "follow",
    };

    fetch("https://stg.dhunjam.in/account/admin/login", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          console.log("Login successful!");
          navigate("/admindashboard");
          const userId = data.data.id;
          const token = data.data.token;

          console.log("User ID:", userId);
          console.log("Token:", token);
        } else {
          console.error("Login failed. Server error:", data.server_err_msg);
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  const createAccountStyle = {
    fontSize: "16px",
    marginTop: "10px",
  };

  return (
    <div style={containerStyle}>
      <p style={headingStyle}>Venue Admin Login</p>
      <div style={fieldContainerStyle}>
        <label htmlFor="username" style={labelStyle}>
          Username:
        </label>
        <input
          type="text"
          id="username"
          style={inputStyle}
          value={username}
          onChange={handleInputChange}
        />
      </div>

      <div style={fieldContainerStyle}>
        <label htmlFor="password" style={labelStyle}>
          Password:
        </label>
        <PasswordField onPasswordChange={handlePasswordChange} />
      </div>

      <button style={signInButtonStyle} onClick={handleSignIn}>
        Sign In
      </button>
      <p style={createAccountStyle}>New Registration?</p>
    </div>
  );
};

export default Login;
