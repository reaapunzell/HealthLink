import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Navigation from "./Navigation";

function AppointmentCalendar() {
  const location = useLocation();
  const { clinic } = location.state || {}; // Retrieve the selected clinic's data

  const [appointmentDates, setAppointmentDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null); // Track the selected date
  const [selectedTime, setSelectedTime] = useState(""); // Track the selected time
  const [date, setDate] = useState(new Date());
  const [month, setMonth] = useState(date.getMonth());
  const [year, setYear] = useState(date.getFullYear());
  const dayRef = useRef(null);
  const currDateRef = useRef(null);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Handle selecting a date on the calendar
  const handleDateClick = (day) => {
    setSelectedDate(new Date(year, month, day)); // Set the selected date
  };

  // Handle booking an appointment
  const handleBookAppointment = () => {
    if (!selectedDate || !selectedTime) {
      alert("Please select a date and time.");
      return;
    }

    // Combine the selected date and time
    const appointmentDateTime = new Date(selectedDate);
    const [hours, minutes] = selectedTime.split(":").map(Number);
    appointmentDateTime.setHours(hours, minutes);

    // Save the appointment
    setAppointmentDates((prevAppointments) => [
      ...prevAppointments,
      { date: appointmentDateTime, clinic },
    ]);

    alert(
      `Appointment booked for ${appointmentDateTime.toLocaleString()} at ${
        clinic?.display_name || "the selected clinic"
      }`
    );

    // Reset selected date and time
    setSelectedDate(null);
    setSelectedTime("");
  };

  // Handle navigating to the previous month
  const handlePrevMonth = () => {
    setMonth((prev) => (prev === 0 ? 11 : prev - 1));
    setYear((prev) => (month === 0 ? prev - 1 : prev));
  };

  // Handle navigating to the next month
  const handleNextMonth = () => {
    setMonth((prev) => (prev === 11 ? 0 : prev + 1));
    setYear((prev) => (month === 11 ? prev + 1 : prev));
  };

  const [calendarDays, setCalendarDays] = useState([]);

  // Update the calendar days whenever the month, year, or appointments change
  useEffect(() => {
    let dayone = new Date(year, month, 1).getDay();
    let lastdate = new Date(year, month + 1, 0).getDate();
    let dayend = new Date(year, month, lastdate).getDay();
    let monthlastdate = new Date(year, month, 0).getDate();

    let daysArray = [];

    // Add inactive days from the previous month
    for (let i = dayone; i > 0; i--) {
      daysArray.push(
        <li key={`prev-${i}`} className="inactive">
          {monthlastdate - i + 1}
        </li>
      );
    }

    // Add days for the current month
    for (let i = 1; i <= lastdate; i++) {
      let isToday =
        i === date.getDate() &&
        month === new Date().getMonth() &&
        year === new Date().getFullYear();
      let isAppointment = appointmentDates.some(
        (appt) =>
          appt.date.getDate() === i &&
          appt.date.getMonth() === month &&
          appt.date.getFullYear() === year
      );
      let isSelected =
        selectedDate &&
        selectedDate.getDate() === i &&
        selectedDate.getMonth() === month &&
        selectedDate.getFullYear() === year;

      daysArray.push(
        <li
          key={`curr-${i}`}
          className={`${isToday ? "active" : ""} ${
            isAppointment ? "appointment" : ""
          } ${isSelected ? "selected" : ""}`}
          onClick={() => handleDateClick(i)} // Handle date selection
        >
          {i}
        </li>
      );
    }

    // Add inactive days from the next month
    for (let i = dayend; i < 6; i++) {
      daysArray.push(
        <li key={`next-${i}`} className="inactive">
          {i - dayend + 1}
        </li>
      );
    }

    setCalendarDays(daysArray);
  }, [month, year, appointmentDates, selectedDate]);

  return (
    <div className="app-container">
      <Navigation />
      <h1>Book Appointment</h1>

      {/* Display the selected clinic's details */}
      {clinic ? (
        <div className="clinic-details">
          <h2>{clinic.display_name}</h2>
          <p>
            <strong>Location:</strong> {clinic.lat}, {clinic.lon}
          </p>
        </div>
      ) : (
        <p>No clinic selected. Please go back and choose a clinic.</p>
      )}

      {/* Calendar */}
      <div className="calendar-container">
        <header className="calendar-header">
          <p ref={currDateRef} className="calendar-current-date">
            {`${months[month]} ${year}`}
          </p>
          <div className="calendar-navigation">
            <span
              id="calendar-prev"
              className="material-symbols-rounded"
              onClick={handlePrevMonth}
            >
              ◀
            </span>
            <span
              id="calendar-next"
              className="material-symbols-rounded"
              onClick={handleNextMonth}
            >
              ▶
            </span>
          </div>
        </header>

        <div className="calendar-body">
          <ul className="calendar-weekdays">
            <li>Sun</li>
            <li>Mon</li>
            <li>Tue</li>
            <li>Wed</li>
            <li>Thu</li>
            <li>Fri</li>
            <li>Sat</li>
          </ul>
          <ul ref={dayRef} className="calendar-dates">
            {calendarDays}
          </ul>
        </div>
      </div>

      {/* Time selection */}
      {selectedDate && (
        <div className="time-selection">
          <label htmlFor="appointment-time">Select Time:</label>
          <input
            type="time"
            id="appointment-time"
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            required
          />
        </div>
      )}

      {/* Book Appointment button */}
      <button onClick={handleBookAppointment}>Book Appointment</button>
    </div>
  );
}

export default AppointmentCalendar;
