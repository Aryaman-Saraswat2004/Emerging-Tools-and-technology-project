import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState, useCallback } from "react";

function LocationMarker({ setLocation }) {
  const [position, setPosition] = useState(null);

  useMapEvents({
    click(e) {
      setPosition(e.latlng);
      setLocation(e.latlng); // send lat/lng to parent
    },
  });

  return position === null ? null : <Marker position={position} />;
}

export default function MapPicker({ setLocation }) {
  const memoSetLocation = useCallback(setLocation, []);

  return (
    <MapContainer center={[28.61, 77.23]} zoom={13} style={{ height: "300px" }}>
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker setLocation={memoSetLocation} />
    </MapContainer>
  );
}