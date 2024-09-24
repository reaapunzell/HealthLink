// Navigation Card Functionality
const navigationCards = document.querySelectorAll(".nav-button");
const settingsButton = document.querySelectorAll(".settings-button");
const sections = document.querySelectorAll("section");

function hideAllSections(){
  sections.forEach(section => {
    section.style.display = 'none';
  });
}

navigationCards.forEach(button => {
  button.addEventListener('click', () => {
    hideAllSections();
    const sectionId = button.getAttribute('data-section');
    document.getElementById(sectionId).style.display = 'block';
  });
});

hideAllSections();

// Profiles Data
const profiles = [
  {
    fullName: "Simba Moyo",
    nationality: "Zimbabwean",
    age: 32,
    gender: "Male"
  },
  {
    fullName: "Sarah Moyo",
    nationality: "South African",
    age: 30,
    gender: "Female"
  }
];

// Profile Display Logic
const profileSelect = document.getElementById('profileSelect');
const fullName = document.getElementById('fullName');
const nationality = document.getElementById('nationality');
const age = document.getElementById('age');
const gender = document.getElementById('gender');

profileSelect.addEventListener('change', function(){
  const selectedProfile = profiles[this.value];
  fullName.textContent = selectedProfile.fullName;
  nationality.textContent = selectedProfile.nationality;
  age.textContent = selectedProfile.age;
  gender.textContent = selectedProfile.gender;
});

profileSelect.dispatchEvent(new Event('change'));

// Google Maps API Integration
(g => {
  var h, a, k, p = "The Google Maps JavaScript API", c = "google", l = "importLibrary", q = "__ib__", m = document, b = window;
  b = b[c] || (b[c] = {});
  var d = b.maps || (b.maps = {}), r = new Set, e = new URLSearchParams, u = () => h || (h = new Promise(async (f, n) => {
    await (a = m.createElement("script"));
    e.set("libraries", [...r] + "");
    for (k in g) e.set(k.replace(/[A-Z]/g, t => "_" + t[0].toLowerCase()), g[k]);
    e.set("callback", c + ".maps." + q);
    a.src = `https://maps.${c}apis.com/maps/api/js?` + e;
    d[q] = f;
    a.onerror = () => h = n(Error(p + " could not load."));
    a.nonce = m.querySelector("script[nonce]")?.nonce || "";
    m.head.append(a);
  }));
  d[l] ? console.warn(p + " only loads once. Ignoring:", g) : d[l] = (f, ...n) => r.add(f) && u().then(() => d[l](f, ...n));
})( {
  key: "AIzaSyDd1j42Z__2q7ZxwWlizfWLb5FXTMGLbIQ",
  v: "weekly",
});

// Initialize Map
let map;

async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");
  const { places } = await google.maps.importLibrary("places");

  const defaultCenter = { lat: -26.073073506861217, lng: 28.13038136763553 };

  map = new Map(document.getElementById("map"), {
    center: defaultCenter,
    zoom: 14,
    mapId: "DEMO_MAP_ID", // Map ID required for advanced markers
  });

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        map.setCenter(pos);

        findNearbyPlaces(pos);
      },
      () => {
        console.error("Error: The Geolocation service failed or was denied.");
      }
    );
  } else {
    console.error("Error: Your browser doesn't support geolocation.");
  }
}

// Find Nearby Clinics and Hospitals
function findNearbyPlaces(location) {
  const service = new google.maps.places.PlacesService(map);
  const request = {
    location: location,
    radius: '5000',
    type: ['hospital', 'clinic', 'doctor'],
    keyword: ['hospital', 'clinic'],
  };

  service.nearbySearch(request, (results, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      const clinics = document.querySelector('.clinic-cards');

      for (let i = 0; i < 4; i++) {
        createMarker(results[i]);
        
        const clinicCard = createClinicElement(results[i]);
        clinics.appendChild(clinicCard);
      }
    } else {
      console.error("PlacesService failed due to: " + status);
    }
  });
}

// Create Markers for Clinics
async function createMarker(place) {
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  const marker = new google.maps.marker.AdvancedMarkerElement({
    map: map,
    position: place.geometry.location,
    title: place.name,
  });

  const infowindow = new google.maps.InfoWindow({
    content: `<strong>${place.name}</strong><br>${place.vicinity}`,
  });

  marker.addListener('click', () => {
    infowindow.open(map, marker);
  });
}

// Global appointment date store
let appointmentDates = [];

// Create Clinic Cards
const createClinicElement = (place) => {
  const clinicCard = document.createElement("div");
  clinicCard.classList.add('clinic-card');

  clinicCard.innerHTML = `
    <div class="clinic-card-heading">
      <img src="src/images/Clinic Icon.png" alt="clinic icon">
      <h2 class="clinic-card-name">${place.name}</h2>
    </div>
    <div class="clinic-card-location">
      <img src="src/images/position-marker.svg" alt="location icon">
      <p class="location">${place.vicinity}</p>
    </div>
    <div class="clinic-card-appointments">
      <img src="src/images/bookmark.svg" alt="bookmark icon">
      <p class="times-visited">Times Visited:</p>
      <button class="set-appointment-button">Set Appointment</button>
    </div>
  `;

  const setAppointmentButton = clinicCard.querySelector('.set-appointment-button');

  setAppointmentButton.addEventListener('click', () => {
    const clinicName = place.name;
    const appointmentDate = prompt('Please enter the date for your appointment (DD-MM-YYYY):');

    if (appointmentDate) {
      alert(`Appointment is booked for ${appointmentDate} at ${clinicName}. Check My Appointments to see your appointment date.`);

      // Save the appointment date
      const [day, month, year] = appointmentDate.split('-').map(Number);
      appointmentDates.push({ day, month: month - 1, year }); // Subtract 1 from month to align with JS Date object

      // Re-render calendar to show the appointment
      manipulate();
    } else {
      alert('No appointment date entered. Please try again.');
    }
  });

  return clinicCard;
};

// Appointment Calendar Feature
let date = new Date();
let year = date.getFullYear();
let month = date.getMonth();

const day = document.querySelector(".calendar-dates");
const currdate = document.querySelector(".calendar-current-date");
const prenexIcons = document.querySelectorAll(".calendar-navigation span");

// Array of month names
const months = [
  "January", "February", "March", "April", "May", "June", 
  "July", "August", "September", "October", "November", "December"
];

// Generate Calendar
const manipulate = () => {
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

  currdate.innerText = `${months[month]} ${year}`;
  day.innerHTML = lit;
};

manipulate();

prenexIcons.forEach(icon => {
  icon.addEventListener("click", () => {
    month = icon.id === "calendar-prev" ? month - 1 : month + 1;

    if (month < 0 || month > 11) {
      date = new Date(year, month, new Date().getDate());
      year = date.getFullYear();
      month = date.getMonth();
    } else {
      date = new Date();
    }

    manipulate();
  });
});
// Default setting for selecting profile
document.addEventListener('DOMContentLoaded', () => {
  profileSelect.dispatchEvent(new Event('change'));
});

// Initialize Google Maps
initMap();

