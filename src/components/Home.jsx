// src/FacebookPageGrid.js
import React, { useState, useEffect } from "react";
import "./Home.css";
import VideoLoader from "./../components/loader/VideoLoader";
import InstaButton from "./../components/button/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FacebookPageGrid = () => {
  // const BASE_URL = process.env.REACT_APP_BASE_URL;
  const token = localStorage.getItem("token");
  const status = localStorage.getItem("download");

  const [fetchedData, setFetchedData] = useState();

  useEffect(() => {
    if(status === "true"){

    const getUser = () => {
      fetch("http://localhost:5000/instagram/auth/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: token,
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
          setFetchedData(resObject.data);
          console.log(resObject,'fetchedData');
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  // Sample data for Facebook pages
  // const logout = () => {
  //   window.open("http://localhost:5000/signout", "_self");
  // };



  const loginWithInsta = async () => {
    try {
      const headers = { Authorization: token };
      const response = await fetch(`http://localhost:5000/instagram/auth`, { headers });

      const data = await response.json();
      if (data.success === true) {
        // alert("valid token");
        window.open(`http://localhost:5000/instagram/login`, "_self") // _self is a parameter that will open this address on same tab on browser
      }
      else {
      toast.error("Invalid token");
      }
    } catch (error) {
      toast.error("Invalid token");
      console.log(error, "error occured");
    }
  };


  return (
    <>
      <div className="profile-container">
        {/* <div className="profile-header">
          <div className="profile-image">
            <img
              src={fetchedData?.instaUser?.profile_picture}
              alt={`Profile for ${fetchedData?.name}`}
              className="profile-image"
            />
          </div>
          <div className="profile-stats">
            <div className="stat">
              <span className="count">
                {fetchedData?.instaUser?.media_count}
              </span>
              <span className="label">Posts</span>
            </div>
            <div className="stat">
              <span className="count">
                {fetchedData?.instaUser?.followers_count}
              </span>
              <span className="label">Followers</span>
            </div>
            <div className="stat">
              <span className="count">
                {fetchedData?.instaUser?.follows_count}
              </span>
              <span className="label">Following</span>
            </div>
          </div>
        </div> */}
        <div className="profile-info">
          <h2 className="username">User Name :   <p className="bg-gray-600 ml-4 pl-2 pr-2 rounded-2xl" >{fetchedData?.instaUser.username}</p></h2>
          <p className="bio">{fetchedData?.instaUser.biography}</p>
        </div>
        <div className="profile-info">
          <span className="heading_">
            <h4 className="username">MEDIA</h4>
            <button onClick={()=>loginWithInsta()} >
            <InstaButton />

            </button>
          </span>

          {fetchedData?.media ? (
            <>
              <div className="videoloader-container">
                {fetchedData?.media.map((video) => (
                 
                  <video
                    className="videocon"
                    key={video.id}
                    controls
                    autoPlay
                    loop
                    muted
                  >
                    <source src={video.video_url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>

                ))}
              </div>
            </>
          ) : (
            <>
              <div className="videoloader-container">
                {[...Array(6)].map((_, index) => (
                  <div className="videoloader" key={index}>
                    <VideoLoader />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
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
    </>
  );
};

export default FacebookPageGrid;
