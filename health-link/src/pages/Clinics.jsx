import React from "react";
import "/src/assets/style.css";
import Navigation from "../components/Navigation";
import Map from "../components/Map";

const Clinics = () => {
  return (
    <div className="app-container">
      <div className="navigation-bar">
        <Navigation />
      </div>
      <div className="map-clinics">
        <Map />
      </div>
    </div>
  );
};

export default Clinics;
