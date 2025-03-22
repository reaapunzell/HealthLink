import React, { useEffect, useState, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "/src/assets/style.css";

const Map = () => {
  const mapRef = useRef(null); // Reference to the map container
  const mapInstance = useRef(null); // Reference to the Leaflet map instance
  const clinicsContainerRef = useRef(null); // Reference to the clinics container
  const [clinics, setClinics] = useState([]);

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return; // Prevent multiple initializations

    // Initialize the map
    mapInstance.current = L.map(mapRef.current).setView(
      [-26.2041, 28.0473],
      13
    ); // Default to Johannesburg

    // Add OpenStreetMap tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mapInstance.current);

    // Get the user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          mapInstance.current.setView([latitude, longitude], 14);

          // Add marker for user's location
          L.marker([latitude, longitude])
            .addTo(mapInstance.current)
            .bindPopup("You are here")
            .openPopup();

          // Fetch nearby clinics and hospitals
          fetchNearbyPlaces(latitude, longitude, mapInstance.current);
        },
        (error) => {
          console.error("Geolocation error:", error);
          alert("Geolocation permission denied. Using default location.");
        }
      );
    }

    return () => {
      mapInstance.current?.remove(); // Cleanup when unmounting
      mapInstance.current = null; // Reset instance
    };
  }, []);

  // Function to fetch nearby hospitals and clinics using OpenStreetMap Nominatim API
  const fetchNearbyPlaces = async (lat, lon, map) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search.php?q=hospital+${lat}+${lon}&accept-language=en-US%2Cen&format=jsonv2`
      );
      const data = await response.json();

      const limitedClinics = data.slice(0, 3);

      setClinics(limitedClinics); // Update state with fetched clinics

      limitedClinics.forEach((place) => {
        console.log(place);
        // Add marker for each place
        L.marker([place.lat, place.lon]).addTo(map).b;
      });
    } catch (error) {
      console.error("Error fetching nearby places:", error);
    }
  };

  return (
    <div className="map-clinic-container">
      <div ref={mapRef} id="map"></div>
      <div className="nearby-clinics">
        <h1>Nearby Clinics & Hospitals</h1>
        <div className="clinic-cards">
          {clinics.map((place) => (
            <div key={place.place_id} className="clinic-card">
              <div className="clinic-card-heading">
                <img src="src/assets/Clinic Icon.png" alt="clinic-icon" />
                <h2 className="clinic-card-name">{place.display_name}</h2>
              </div>
              <div className="clinic-card-location">
                <img src="src/assets/position-marker.svg" alt="location icon" />
                <p className="location">
                  {place.lat}, {place.lon}
                </p>
              </div>
              <div className="clinic-card-appointments">
                <img src="src/assets/bookmark.svg" alt="bookmark icon" />
                <p className="times-visited">Times Visited:</p>
                <button className="set-appointment-button">
                  Set Appointment
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Map;
