
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
  
    // Initialize the map with a default center
    map = new Map(document.getElementById("map"), {
      center: defaultCenter,
      zoom: 14,
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

          // call function to find nearby clinics and hospitals
          findNearbyPlaces(pos);
        },
        () => {
          // Handle location error (user denied or error occurred)
          console.error("Error: The Geolocation service failed or was denied.");
        }
      );
    } else {
      // Browser doesn't support Geolocation
      console.error("Error: Your browser doesn't support geolocation.");
    }
  }
  
  //Function to find nearby clinics and hospitals
  function findNearbyPlaces(location){
    const service = new google.maps.places.PlacesService(map);
    const request = {
      location: location,
      radius: '5000',
      type: ['hospital', 'clinic', 'doctor'],
      keyword: 'clinic',
    };

    service.nearbySearch(request, (results, status)=>{
      if(status === google.maps.places.PlacesServiceStatus.OK){
        for (let i = 0; i< results.length; i++){
          createMarker(results[i]);
        }
      }else{
        console.error("PlacesService failed due to: " + status);
      }
    });
  }
  
  function createMarker(place) {
    const marker = new google.maps.Marker({
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
  // Call the initMap function to initialize the map
  initMap();
  
