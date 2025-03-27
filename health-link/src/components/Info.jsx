import React from "react";
import logo from "/src/assets/Healthlink-logo.svg";
import "/src/assets/style.css";

const Info = () => {
  return (
    <>
      <div className="info">
        <div className="info-text">
          <h1> Health Link</h1>
          <p>Making healthcare more accessible one device at a time</p>
        </div>
        <div className="info-image">
          <img src={logo} alt="logo-icon" />
        </div>
      </div>
    </>
  );
};

export default Info;
