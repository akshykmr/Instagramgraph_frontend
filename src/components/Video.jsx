// src/FacebookPageGrid.js
import React, { useState } from "react";
import "./FacebookData.css";
import Loader from "./Loader";
import Pattern from "./Pattern";

const FacebookPageGrid = () => {
  const [status, setStatus] = useState(true);
  const [msg, setMsg] = useState();

  // Client-side code (e.g., in your front-end application)
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
        console.log("respnse has been recieved", response);
        setTimeout(() => {
          window.location.href = "/success";
        }, [2000]);
        
      } else {
        console.log("error found in respnse");
        setMsg("ERROR IN REPONSE");
      }
    } else {
      setMsg("CODE NOT FOUND IN  URL");
      console.log("CODE NOT FOUND IN  URL");
    }
  };
  document.addEventListener("DOMContentLoaded", handleInstagramCallback);

  // const [fetchedData, setFetchedData] = useState(null);

  // useEffect(() => {
  //   const getUser = () => {
  //     fetch("http://localhost:5000/success", {
  //       method: "GET",
  //       credentials: "include",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //         "Access-Control-Allow-Credentials": true,
  //       },
  //     })
  //       .then((response) => {
  //         if (response.status === 200) return response.json();
  //         throw new Error("authentication has been failed!");
  //       })
  //       .then((resObject) => {
  //         setFetchedData(resObject.data);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   };
  //   getUser();
  // }, []);

  // console.log(fetchedData, "user in response");

  // // Sample data for Facebook pages
  // const logout = () => {
  //   window.open("http://localhost:5000/signout", "_self");
  // };

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

    // <div className="maincontainer">
    //   <button className="logoutbtn" onClick={() => logout()}>
    //     logout
    //   </button>
    //   <div className="facebook-container">
    //     {fetchedData?.map((page) => (
    //       <div key={page?.page?.id} className="page-container">
    //         <h2>facebook Page</h2>
    //         <div className="page-card">
    //           <img
    //             src="https://via.placeholder.com/600x300"
    //             alt={`Cover for ${page?.name}`}
    //             className="cover-photo"
    //           />
    //           <div className="page-details">
    //             <img
    //               src="https://via.placeholder.com/150"
    //               alt={`Profile for ${page?.name}`}
    //               className="page-image"
    //             />
    //             <div className="page-info">
    //               <h3>{page?.page?.name}</h3>
    //               <p>{page?.page?.category}</p>
    //             </div>
    //           </div>
    //         </div>
    //         <h2>Connected Instagram Account</h2>

    //         <div className="profile-container">
    //           <div className="profile-header">
    //             <div className="profile-image">
    //               <img
    //                 src={page?.instaUser?.profile_picture}
    //                 alt={`Profile for ${page?.name}`}
    //                 className="profile-image"
    //               />
    //             </div>
    //             <div className="profile-stats">
    //               <div className="stat">
    //                 <span className="count">
    //                   {page?.instaUser?.media_count}
    //                 </span>
    //                 <span className="label">Posts</span>
    //               </div>
    //               <div className="stat">
    //                 <span className="count">
    //                   {page?.instaUser?.followers_count}
    //                 </span>
    //                 <span className="label">Followers</span>
    //               </div>
    //               <div className="stat">
    //                 <span className="count">
    //                   {page?.instaUser?.follows_count}
    //                 </span>
    //                 <span className="label">Following</span>
    //               </div>
    //             </div>
    //           </div>
    //           <div className="profile-info">
    //             <h2 className="username">{page.instaUser.username}</h2>
    //             <p className="bio">{page.instaUser.biography}</p>
    //           </div>
    //           <div className="profile-info">
    //             <h4 className="username">MEDIA</h4>
    //             <div className="img_grid">
    //               {page.media.map((video) => (
    //                 <video
    //                   className="videocon"
    //                   key={video.id}
    //                   controls
    //                   autoPlay
    //                   loop
    //                   muted
    //                 >
    //                   <source src={video.video_url} type="video/mp4" />
    //                   Your browser does not support the video tag.
    //                 </video>
    //               ))}
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     ))}
    //   </div>
    // </div>
  );
};

export default FacebookPageGrid;
