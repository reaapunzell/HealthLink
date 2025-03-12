import React, {useState, useEffect, useRef} from 'react';

function AppointmentCalendar() {
    const [appointmentDates, setAppointmentDates] = useState([]);
    const [date, setDate] = useState(new Date());
    const [month, setMonth] = useState(date.getMonth());
    const [year, setYear] = useState(date.getFullYear());
    const dayRef = useRef(null);
    const currDateRef = useRef(null);
    

    // Array of month names
const months = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];

  const handleSetAppointment = () => {
    const appointmentDate = prompt('Enter appointment date (DD-MM-YYYY):');
    if (appointmentDate) {
      const [day, month, year] = appointmentDate.split('-').map(Number);
      setAppointmentDates([...appointmentDates, { day, month: month - 1, year }]);
      alert(`Appointment booked for ${appointmentDate}`);
    }
  }
  
  useEffect(() => {
    if (!dayRef.current || !currDateRef.current) return;
    
    let dayone = new Date(year, month, 1).getDay();
    let lastdate = new Date(year, month + 1, 0).getDate();
    let dayend = new Date(year, month, lastdate).getDay();
    let monthlastdate = new Date(year, month, 0).getDate();

    let lit = "";

    for (let i = dayone; i > 0; i--) {
      lit += `<li class="inactive">${monthlastdate - i + 1}</li>`;
    }

    for (let i = 1; i <= lastdate; i++) {
      let isToday = i === date.getDate() && month === new Date().getMonth() && year === new Date().getFullYear() ? "active" : "";
      let isAppointment = appointmentDates.some(appt => appt.day === i && appt.month === month && appt.year === year) ? "appointment" : "";

      lit += `<li class="${isToday} ${isAppointment}">${i}</li>`;
    }

    for (let i = dayend; i < 6; i++) {
      lit += `<li class="inactive">${i - dayend + 1}</li>`;
    }

    currDateRef.current.innerText = `${months[month]} ${year}`;
    dayRef.current.innerHTML = lit;

  }, [month, year, appointmentDates]);


return (

  <div>
   <h1>My Appointments</h1> 
    <div className="calendar-container">
        <header className="calendar-header">
            <p className="calendar-current-date"></p>
            <div className="calendar-navigation">
                <span id="calendar-prev" 
                      className="material-symbols-rounded">
                    x
                </span>
                <span id="calendar-next" 
                      className="material-symbols-rounded">
                    x
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
            <ul className="calendar-dates"></ul>
        </div>
    </div>
    </div>
)
}

export default AppointmentCalendar;