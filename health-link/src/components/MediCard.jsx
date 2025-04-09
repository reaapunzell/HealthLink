import React from "react";
import Navigation from "./Navigation";
import { useNavigate } from "react-router-dom";

function MediCard() {
  const navigate = useNavigate();

  const handleAppointmentsButton = () => {
    navigate("/appointments");
  };
  return (
    <div className="medi-card-container">
      <h2>MediCard</h2>
      <div className="medical-card" id="medicalCard">
        <div>
          <img
            src="/src/assets/profile.png"
            alt="Profile Picture"
            className="profile-pic"
          />
          <div className="medical-card-information">
            <p>
              Full Name: <span id="fullName">Simba</span>
            </p>
          </div>
          <p>
            Nationality: <span id="nationality">Zimbabwean</span>
          </p>
          <p>
            Age: <span id="age">32</span>
          </p>
          <p>
            Gender: <span id="gender">Male</span>
          </p>
          <p>
            Medical Aid: <span id="medical aid">Gems</span>
          </p>
          <p>
            Diagnosis: <span id="diagnosis">Asthma, Diabetes, Gout</span>
          </p>
        </div>
      </div>

      <button className="medical-history-btn">Medical History</button>
    </div>
  );
}

export default MediCard;
