import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "/src/assets/style.css";
import Navigation from "../components/Navigation";
import NextAppointment from "../components/NextAppointment";
import Welcome from "../components/Welcome";

const Dashboard = () => {
  return (
    <div className="app-container">
      <Navigation />

      <div>
        <Welcome />
      </div>

      <div>
        <NextAppointment />
      </div>
    </div>
  );
};

export default Dashboard;
