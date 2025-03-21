import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const Map = () => {
  const mapRef = useRef(null); // Reference to the map container
  const mapInstance = useRef(null); // Reference to the Leaflet map instance

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
          console.log(position.coords);
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
    console.log("fetching nearby places");

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search.php?q=hospital+${lat}+${lon}&accept-language=en-US%2Cen&format=jsonv2`
      );
      const data = await response.json();

      const clinicsContainer = document.querySelector(".clinic-cards");
      clinicsContainer.innerHTML = "";

      data.forEach((place) => {
        console.log(place);
        L.marker([place.lat, place.lon])
          .addTo(map)
          .bindPopup(`<b>${place.display_name}</b>`);
      });
    } catch (error) {
      console.error("Error fetching nearby places:", error);
    }
  };

  const createClinicElement = (place) => {
    const div = document.createElement("div");
    div.className = "clinic-card";
    div.innerHTML = `
<h2>${place.tags.name}</h2>
<p>Type: ${place.tags.amenity}</p>
<p>Location: ${place.lat}, ${place.lon}</p>
`;
    return div;
  };
  return (
    <>
      <div
        ref={mapRef}
        id="map"
        style={{ height: "500px", width: "100%" }}
      ></div>
      <div className="clinic-cards">
        <h1>Nearby Clinics & Hospitals</h1>
      </div>
    </>
  );
};

export default Map;
