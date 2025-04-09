import React from "react";
import "/src/assets/style.css";
import personIcon from "/src/assets/person-icon.svg";
import locationIcon from "/src/assets/pin-icon.svg";
import timeIcon from "/src/assets/time-icon.svg";
import calendarIcon from "/src/assets/calendar-icon.svg";

const NextAppointment = () => {
  return (
    <div className="appointments-container">
      <h2> Appointments</h2>
      <div className="upcoming-complete-btns">
        <button className="upcoming-btn" type="button">
          Upcoming
        </button>
        <button className="complete-btn" type="button">
          Complete
        </button>
      </div>
      <div className="add-appointment-btn">
        <button type="button"> Add Appointment</button>
      </div>
      <div className="next-appointment-container">
        <h3>Next Appointment</h3>

        <div className="next-appointment-date">
          <img src={calendarIcon} alt="calendar icon" />
          <p>10 July 2025</p>
        </div>

        <div className="next-appointment-time">
          <img src={timeIcon} alt="time icon" />
          <p>10h00-11h00 AM</p>
        </div>

        <div className="next-appointment-clinic">
          <img src={locationIcon} alt="location icon" />
          <p>MediClinic</p>
        </div>

        <div className="next-appointment-doctor">
          <img src={personIcon} alt="person-icon" />
          <p> Dr Sandile Mashaba</p>{" "}
        </div>
      </div>
    </div>
  );
};
export default NextAppointment;
