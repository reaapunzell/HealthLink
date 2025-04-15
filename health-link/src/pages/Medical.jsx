import React from "react";
import MediCard from "../components/MediCard";
import Navigation from "../components/Navigation";
import OverviewConditions from "../components/OverviewConditions";

const Medical = () => {
  return (
    <div className="app-container">
      <Navigation />
      <div className="medicard-container">
        <MediCard />
      </div>
      \
      <div className="overview-conditions-container">
        <OverviewConditions />
      </div>
    </div>
  );
};

export default Medical;
