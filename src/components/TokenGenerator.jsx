import React, { useEffect, useRef, useState } from "react";
import "./FacebookData.css";
import LoadingBar from "react-top-loading-bar";
import VideoLoader from "./loader/VideoLoader";

const TokenGenerator = () => {
  const ref = useRef(null);
  const token = localStorage.getItem("token");
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const [status, setstatus] = useState("loading");

  useEffect(() => {
    const handleInstagramCallback = async () => {
      ref.current.continuousStart();

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
          setstatus("loaded");
          ref.current.complete();
          console.log("response has been received", response);
          localStorage.setItem("download", "true");
          setTimeout(() => {
            window.location.href = "/home";
          }, [2000]);
        } else {
          ref.current.complete();
          console.log("error found in response");
          setstatus("failed");
          setTimeout(() => {
            window.location.href = "/";
          }, [2000]);
        }
      } else {
        ref.current.complete();
        setTimeout(() => {
          window.location.href = "/";
        }, [2000]);
        setstatus("failed");
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
    <>
      {status === "loading" ? (
        <div className="auth_container mt-32">
          <LoadingBar color="#f11946" ref={ref} />
          <h1 className="text-xl font-extrabold ml-24 align-middle">
            Downloading Data........
          </h1>
          <div className="videoloader-container">
            {[...Array(2)].map((_, index) => (
              <div className="videoloader" key={index}>
                <VideoLoader />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="error_co">
          <div className="error ">
            <div className="error__icon">
              <svg
                fill="none"
                height="24"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m13 13h-2v-6h2zm0 4h-2v-2h2zm-1-15c-1.3132 0-2.61358.25866-3.82683.7612-1.21326.50255-2.31565 1.23915-3.24424 2.16773-1.87536 1.87537-2.92893 4.41891-2.92893 7.07107 0 2.6522 1.05357 5.1957 2.92893 7.0711.92859.9286 2.03098 1.6651 3.24424 2.1677 1.21325.5025 2.51363.7612 3.82683.7612 2.6522 0 5.1957-1.0536 7.0711-2.9289 1.8753-1.8754 2.9289-4.4189 2.9289-7.0711 0-1.3132-.2587-2.61358-.7612-3.82683-.5026-1.21326-1.2391-2.31565-2.1677-3.24424-.9286-.92858-2.031-1.66518-3.2443-2.16773-1.2132-.50254-2.5136-.7612-3.8268-.7612z"
                  fill="#393a37"
                ></path>
              </svg>
            </div>
            <div className="error__title">Downloading Failed Please Login......................</div>
            <div className="error__close">
              <svg
                height="20"
                viewBox="0 0 20 20"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m15.8333 5.34166-1.175-1.175-4.6583 4.65834-4.65833-4.65834-1.175 1.175 4.65833 4.65834-4.65833 4.6583 1.175 1.175 4.65833-4.6583 4.6583 4.6583 1.175-1.175-4.6583-4.6583z"
                  fill="#393a37"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TokenGenerator;
