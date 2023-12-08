import React, { useState, useEffect } from "react";
import "./FacebookData.css";
import Loader from "./Loader";
import Pattern from "./Pattern";

const FacebookPageGrid = () => {
  const [status, setStatus] = useState(true);
  const [msg, setMsg] = useState();

  useEffect(() => {
    const handleInstagramCallback = async () => {
      console.log("checking for code");
      // Extract the access code from the current URL
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");

      if (code) {
        console.log("if code found...");
        setStatus(false);
        setMsg("CODE SENT WAITING FOR RESPONSE.........");

        const response = await fetch("http://localhost:5000/success", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code: code }),
        });

        console.log("code has been sent waiting for response.....");

        if (response.status === 200) {
          console.log("response has been received", response);
          setTimeout(() => {
            window.location.href = "/success";
          }, [2000]);
        } else {
          console.log("error found in response");
          setMsg("ERROR IN RESPONSE");
        }
      } else {
        setMsg("CODE NOT FOUND IN URL");
        console.log("CODE NOT FOUND IN URL");
      }
    };

    // Call the function directly when the component mounts
    handleInstagramCallback();

    // Cleanup: remove the event listener when the component is unmounted
    return () => {
      document.removeEventListener("DOMContentLoaded", handleInstagramCallback);
    };
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <>
      {status === true ? (
        <Pattern msg={msg} />
      ) : (
        <>
          <Loader />
          <h1>{msg}</h1>
        </>
      )}
    </>
  );
};

export default FacebookPageGrid;
