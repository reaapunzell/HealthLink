
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
  
    // Default map center (in case geolocation fails)
    const defaultCenter = { lat: -26.199, lng: 28.047 };
    
    // Initialize the map with a default center
    map = new Map(document.getElementById("map"), {
      center: defaultCenter,
      zoom: 18,
    });
  
    // Try to use HTML5 Geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          map.setCenter(pos);
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
  
  // Call the initMap function to initialize the map
  initMap();
  
