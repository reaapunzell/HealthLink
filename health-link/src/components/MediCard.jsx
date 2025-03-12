import React from "react";

function MediCard() {
  return (
    <div>
      <h1>My Medical Card</h1>
      <select className="drop-down" id="profileSelect" name="profiles">
        <option value="0">Simba</option>
        <option value="1">Sarah</option>
      </select>
      <div className="medical-card" id="medicalCard">
        <img
          src="/src/assets/profile.png"
          alt="Profile Picture"
          className="profile-pic"
        />
        <div className="medical-card-information">
          <p>
            Full Name: <span id="fullName"></span>
          </p>
          <p>
            Nationality: <span id="nationality"></span>
          </p>
          <p>
            Age: <span id="age"></span>
          </p>
          <p>
            Gender: <span id="gender"></span>
          </p>
        </div>
      </div>

      <div className="medical-card-navigation">
        <button>Documents</button>
        <button>Medical History</button>
      </div>
    </div>
  );
}

export default MediCard;
