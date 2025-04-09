import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "/src/assets/style.css";
import Navigation from "../components/Navigation";
import NextAppointment from "../components/NextAppointment";
import Welcome from "../components/Welcome";
import Info from "../components/Info";
import MediCard from "../components/MediCard";

const Dashboard = () => {
  return (
    <div className="app-container">
      <Navigation />

      <div className="dashboard-container">
        <div className="dashboard-main">
          <div className="welcome-component">
            <Welcome />
          </div>

          <div className="info-component">
            <Info />
          </div>
        </div>

        <div className="medicard-appointments-container">
          <MediCard />
          <NextAppointment />
        </div>

        <div className="dashboard-cards-container"></div>
      </div>
    </div>
  );
};

export default Dashboard;
