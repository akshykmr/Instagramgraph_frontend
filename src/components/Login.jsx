import React from "react";
// import { FaFacebook } from 'react-icons/fa';
import "./Login.css";
import { useNavigate } from "react-router-dom";

const Login = ({ loginStatus }) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  // const token = localStorage.getItem("token");

  const handleLogin = async () => {
    try {
      const headers = { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpdGVtIjoiNjU3NmRlYmQxN2UwMzMzNjQwMjQ1NzJiIiwiaWF0IjoxNzAyMjk2OTM1fQ._o7pv7CDsP02wky1CZBjh6xW4oDIaQ7Cxzw9rkCC6To` };

      const response = await fetch(`${BASE_URL}instagram/auth`, { headers });

      if (response.status === 200) {
        // alert("valid token");
        window.open(`${BASE_URL}instagram/login`, "_self") // _self is a parameter that will open this address on same tab on browser
      }
      else {
        alert('Invalid token')
      }
    } catch (error) {
      alert("Invalid token");
      console.log(error, "error occured");
    }
  };

  return (
    <div className="containerr">
      <div className="glassmorphism">
        <h2>Login with Facebook</h2>
        <button onClick={handleLogin} className="login-button">
          {/* <FaFacebook className="facebook-icon" /> */}
          Login with Facebook
        </button>
        <button className="login-button" onClick={() => navigate("/auth")}>
          Homepage
        </button>
      </div>
    </div>
  );
};

export default Login;
