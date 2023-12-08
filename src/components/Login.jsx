import React from 'react';
import { FaFacebook } from 'react-icons/fa';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = ({ loginStatus }) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    window.open("http://localhost:5000/instagram", "_self") // _self is a parameter that will open this address on same tab on browser
  };

  return (
    <div className="containerr">
      <div className="glassmorphism">
        <h2>Login with Facebook</h2>
        <button onClick={handleLogin} className="login-button">
          <FaFacebook className="facebook-icon" />
          Login with Facebook
        </button>
        <button className="login-button" onClick={() => navigate('/auth')}>
        Homepage
      </button>
      </div>
    </div>
  );
};

export default Login;
