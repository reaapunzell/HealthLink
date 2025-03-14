import React, { useState, useEffect, useRef } from 'react';
import Navigation from './Navigation';

function AppointmentCalendar() {
    const [appointmentDates, setAppointmentDates] = useState([]);
    const [date, setDate] = useState(new Date());
    const [month, setMonth] = useState(date.getMonth());
    const [year, setYear] = useState(date.getFullYear());
    const dayRef = useRef(null);
    const currDateRef = useRef(null);

    const months = [
        "January", "February", "March", "April", "May", "June", 
        "July", "August", "September", "October", "November", "December"
    ];

    const handleSetAppointment = () => {
        const appointmentDate = prompt('Enter appointment date (DD-MM-YYYY):');
        if (appointmentDate) {
            const [day, month, year] = appointmentDate.split('-').map(Number);
            setAppointmentDates(prevAppointments => [...prevAppointments, { day, month: month - 1, year }]);
            alert(`Appointment booked for ${appointmentDate}`);
        }
    };

    const handlePrevMonth = () => {
        setMonth(prev => (prev === 0 ? 11 : prev - 1));
        setYear(prev => (month === 0 ? prev - 1 : prev));
    };

    const handleNextMonth = () => {
        setMonth(prev => (prev === 11 ? 0 : prev + 1));
        setYear(prev => (month === 11 ? prev + 1 : prev));
    };

    const [calendarDays, setCalendarDays] = useState([]);

    useEffect(() => {
        let dayone = new Date(year, month, 1).getDay();
        let lastdate = new Date(year, month + 1, 0).getDate();
        let dayend = new Date(year, month, lastdate).getDay();
        let monthlastdate = new Date(year, month, 0).getDate();

        let daysArray = [];

        for (let i = dayone; i > 0; i--) {
            daysArray.push(<li key={`prev-${i}`} className="inactive">{monthlastdate - i + 1}</li>);
        }

        for (let i = 1; i <= lastdate; i++) {
            let isToday = i === date.getDate() && month === new Date().getMonth() && year === new Date().getFullYear();
            let isAppointment = appointmentDates.some(appt => appt.day === i && appt.month === month && appt.year === year);

            daysArray.push(
                <li key={`curr-${i}`} className={`${isToday ? "active" : ""} ${isAppointment ? "appointment" : ""}`}>
                    {i}
                </li>
            );
        }

        for (let i = dayend; i < 6; i++) {
            daysArray.push(<li key={`next-${i}`} className="inactive">{i - dayend + 1}</li>);
        }

        setCalendarDays(daysArray);
    }, [month, year, appointmentDates]);

    return (
        <div className="app-container">
            <Navigation />
            <h1>My Appointments</h1> 
            <button onClick={handleSetAppointment}>Book Appointment</button>
            <div className="calendar-container">
                <header className="calendar-header">
                    <p ref={currDateRef} className="calendar-current-date">{`${months[month]} ${year}`}</p>
                    <div className="calendar-navigation">
                        <span id="calendar-prev" className="material-symbols-rounded" onClick={handlePrevMonth}>◀</span>
                        <span id="calendar-next" className="material-symbols-rounded" onClick={handleNextMonth}>▶</span>
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
                    <ul ref={dayRef} className="calendar-dates">{calendarDays}</ul>
                </div>
            </div>
        </div>
    );
}

export default AppointmentCalendar;
