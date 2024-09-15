
const navigationCards = document.querySelectorAll(".nav-button");
const sections = document.querySelectorAll("section");

function hideAllSections(){
  sections.forEach(section =>{
    section.style.display = 'none';
  });
}

navigationCards.forEach(button =>{
  button.addEventListener('click', () =>{
    hideAllSections();
    const sectionId = button.getAttribute('data-section');
    document.getElementById(sectionId).style.display = 'block';
  });
});

hideAllSections();

const profiles =[
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


//Google Maps Api integration

(g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})({
    key: "AIzaSyDd1j42Z__2q7ZxwWlizfWLb5FXTMGLbIQ",
    v: "weekly",
    // Use the 'v' parameter to indicate the version to use (weekly, beta, alpha, etc.).
    // Add other bootstrap parameters as needed, using camel case.
  });
  let map;

  async function initMap() {
    // Load the Google Maps library
    const { Map } = await google.maps.importLibrary("maps");
    const { places } = await google.maps.importLibrary("places");
  
    // Default map center (in case geolocation fails)
    const defaultCenter = { lat: -26.073073506861217, lng: 28.13038136763553 };
  
    // Initialize the map with a mapId (required for AdvancedMarkerElement)
    map = new Map(document.getElementById("map"), {
      center: defaultCenter,
      zoom: 14,
      mapId: "DEMO_MAP_ID", // Map ID required for advanced markers
    });
  
    // HTML5 Geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          map.setCenter(pos);
  
          // Call function to find nearby clinics and hospitals
          findNearbyPlaces(pos);
        },
        () => {
          // Handle location error
          console.error("Error: The Geolocation service failed or was denied.");
        }
      );
    } else {
      console.error("Error: Your browser doesn't support geolocation.");
    }
  }
  
  // Function to find nearby clinics and hospitals
  function findNearbyPlaces(location) {
    const service = new google.maps.places.PlacesService(map);
    const request = {
      location: location,
      radius: '5000',
      type: ['hospital', 'clinic', 'doctor'],
      keyword: ['hospital','clinic' ],
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
    
  //Create Markers and Nearby Clinic cards
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

    const createClinicElement = (place) => {
      const clinicCard = document.createElement("div");
      clinicCard.classList.add('clinic-card');
    
      // Create the clinic card structure
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
          <button>Set Appointment</button>
        </div>
      `;
    
      return clinicCard;
    };

  
    
  
  // Initialize the map
  initMap();
  

  //Appointment Calendar Feature
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth();
  
  const day = document.querySelector(".calendar-dates");
  
  const currdate = document
      .querySelector(".calendar-current-date");
  
  const prenexIcons = document
      .querySelectorAll(".calendar-navigation span");
  
  // Array of month names
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
      "December"
  ];
  
  // Function to generate the calendar
  const manipulate = () => {
  
      // Get the first day of the month
      let dayone = new Date(year, month, 1).getDay();
  
      // Get the last date of the month
      let lastdate = new Date(year, month + 1, 0).getDate();
  
      // Get the day of the last date of the month
      let dayend = new Date(year, month, lastdate).getDay();
  
      // Get the last date of the previous month
      let monthlastdate = new Date(year, month, 0).getDate();
  
      // Variable to store the generated calendar HTML
      let lit = "";
  
      // Loop to add the last dates of the previous month
      for (let i = dayone; i > 0; i--) {
          lit +=
              `<li class="inactive">${monthlastdate - i + 1}</li>`;
      }
  
      // Loop to add the dates of the current month
      for (let i = 1; i <= lastdate; i++) {
  
          // Check if the current date is today
          let isToday = i === date.getDate()
              && month === new Date().getMonth()
              && year === new Date().getFullYear()
              ? "active"
              : "";
          lit += `<li class="${isToday}">${i}</li>`;
      }
  
      // Loop to add the first dates of the next month
      for (let i = dayend; i < 6; i++) {
          lit += `<li class="inactive">${i - dayend + 1}</li>`
      }
  
      // Update the text of the current date element 
      // with the formatted current month and year
      currdate.innerText = `${months[month]} ${year}`;
  
      // update the HTML of the dates element 
      // with the generated calendar
      day.innerHTML = lit;
  }
  
  manipulate();
  
  // Attach a click event listener to each icon
  prenexIcons.forEach(icon => {
  
      // When an icon is clicked
      icon.addEventListener("click", () => {
  
          // Check if the icon is "calendar-prev"
          // or "calendar-next"
          month = icon.id === "calendar-prev" ? month - 1 : month + 1;
  
          // Check if the month is out of range
          if (month < 0 || month > 11) {
  
              // Set the date to the first day of the 
              // month with the new year
              date = new Date(year, month, new Date().getDate());
  
              // Set the year to the new year
              year = date.getFullYear();
  
              // Set the month to the new month
              month = date.getMonth();
          }
  
          else {
  
              // Set the date to the current date
              date = new Date();
          }
  
          // Call the manipulate function to 
          // update the calendar display
          manipulate();
      });
  });
