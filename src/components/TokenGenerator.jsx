import React, { useEffect } from "react";
import "./FacebookData.css";

import VideoLoader from "./loader/VideoLoader";

const TokenGenerator = () => {

  const token = localStorage.getItem("token");
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {

    const handleInstagramCallback = async () => {

      console.log("checking for code");
      // Extract the access code from the current URL

      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");

      if (code) {
        console.log("if code found...");
        const response = await fetch(
          `${BASE_URL}/instagram/auth/fetchUserData`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
            body: JSON.stringify({ code: code }),
          }
        );

        console.log("code has been sent waiting for response.....");

        if (response.status === 200) {
          console.log("response has been received", response);
          localStorage.setItem("download", "true");
          setTimeout(() => {
            window.location.href = "/home";
          }, [2000]);
        } else {
          console.log("error found in response");
        }
      } else {
        console.log("CODE NOT FOUND IN URL");
      }
    };

    handleInstagramCallback();

    // Cleanup: remove the event listener when the component is unmounted
    return () => {
      document.removeEventListener("DOMContentLoaded", handleInstagramCallback);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <div className="auth_container mt-32">
      <h1 className=" text-xl font-extrabold ml-24">
        Downloading Data........
      </h1>
      <div className="videoloader-container">
        {[...Array(6)].map((_, index) => (
          <div className="videoloader" key={index}>
            <VideoLoader />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TokenGenerator;




