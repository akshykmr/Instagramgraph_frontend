import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  // const BASE_URL = process.env.REACT_APP_BASE_URL;

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    mobileNo: "",
    email: "",
    password: "",
  });

  console.log(formData, "formdatt");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/signup_as_local_user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 200) {
        toast.success("Registration complete");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        // Handle registration failure
        console.error("Registration failed");
      }
    } catch (error) {
      toast.error("Registration Failed");
      console.error("Error during registration:", error);
    }
  };

  return (
    <div className="containerr">
      <form className="form_containerr">
        <div className="logo_containerr" />
        <div className="title_containerr">
          <p className="title">Create Your Account</p>
          <span className="subtitler">
            Get started with our app, just create an account and enjoy the
            experience.
          </span>
        </div>
        <br />
        <div className="input_containerr">
          <label className="input_labelr" htmlFor="name_field">
            Name
          </label>
          <input
            required
            placeholder="John Smith"
            title="Input title"
            name="name"
            type="text"
            className="input_fieldr"
            id="name_field"
            onChange={handleChange}
          />
        </div>
        <div className="input_containerr">
          <label className="input_labelr" htmlFor="mobile_field">
            Mobile Number
          </label>
          <input
            required
            placeholder="+91 881029988"
            title="Input title"
            name="mobileNo"
            type="text"
            className="input_fieldr"
            id="mobile_field"
            onChange={handleChange}
          />
          {/* Add error handling for mobile if needed */}
        </div>
        <div className="input_containerr">
          <label className="input_labelr" htmlFor="email_field">
            Email
          </label>
          <input
            required
            placeholder="Email"
            title="Input title"
            name="email"
            type="text"
            className="input_fieldr"
            id="email_field"
            onChange={handleChange}
          />
          {/* Add error handling for email if needed */}
        </div>
        <div className="input_containerr">
          <label className="input_label" htmlFor="password_field">
            Password
          </label>
          <input
            required
            placeholder="Password"
            title="Input title"
            name="password"
            type="password"
            className="input_fieldr"
            id="password_field"
            onChange={handleChange}
          />
          {/* Add error handling for password if needed */}
        </div>
        <button
          title="Register"
          type="submit"
          className="sign-in_btnr"
          onClick={handleSubmit}
        >
          <span>Submit</span>
        </button>
        <div className="separatorr">
          <hr className="liner" />
          <span>Or</span>
          <hr className="liner" />
        </div>
        <button
          title="Sign In"
          type="submit"
          className="sign-in_gglr"
          onClick={() => navigate("/")}
        >
          <span>Already have an account</span>
        </button>
      </form>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Register;
