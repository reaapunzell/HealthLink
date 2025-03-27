import React from "react";
import { useNavigate } from "react-router-dom";
import "/src/assets/style.css";

const Welcome = () => {
  const navigate = useNavigate();

  const medicardButton = () => {
    navigate("/medicard");
  };

  const appointmentButton = () => {
    navigate("/appointments");
  };

  const clinicsButton = () => {
    navigate("/clinics");
  };

  return (
    <div className="welcome-container">
      <div>
        <h1> Hey, Rea</h1>
        <h2>Welcome Back</h2>
      </div>

      <div className="welcome-buttons">
        <button type="button" onClick={medicardButton}>
          {" "}
          Medicard{" "}
        </button>
        <button type="button" onClick={appointmentButton}>
          {" "}
          Appointments{" "}
        </button>
        <button type="button" onClick={clinicsButton}>
          {" "}
          Clinics{" "}
        </button>
      </div>
    </div>
  );
};
export default Welcome;
