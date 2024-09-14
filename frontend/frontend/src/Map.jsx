
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Set up a custom car icon for the vehicle marker
const vehicleIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/3448/3448339.png', // Car icon URL
  iconSize: [30, 30], // Adjust size for the car icon
  iconAnchor: [15, 15] // Anchor point is the center of the icon
});

const center = [17.385044, 78.486671];

const Map = () => {
  const [vehiclePosition, setVehiclePosition] = useState(center);
  const [path, setPath] = useState([center]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch('http://localhost:5000/api/vehicle') // Fetch from the backend
        .then((response) => response.json())
        .then((data) => {
          const newPosition = [data.latitude, data.longitude];
          setVehiclePosition(newPosition);
          setPath((prevPath) => [...prevPath, newPosition]);
        });
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Fetch locations data
    fetch('http://localhost:5000/api/locations')
      .then((response) => response.json())
      .then((data) => setLocations(data));
  }, []);

  return (
    <MapContainer center={vehiclePosition} zoom={15} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={vehiclePosition} icon={vehicleIcon} />
      <Polyline 
        positions={path} 
        color="#4169E1"  // blue color for better visibility
        weight={4}       // Thickness of the polyline
        opacity={0.8}    // Opacity of the polyline
      />
      {locations.map((loc, index) => (
        <Marker key={index} position={[loc.latitude, loc.longitude]}>
          <Popup>{loc.label}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
