// import React from "react";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";

// type MapViewProps = {
//   lat: number;
//   lng: number;
//   vehicleId: string;
//   locationName: string;
//   description: string;
//   vehicleType: string;
//   vehicleModel: string;
//   vehicleStatus: string;
//   zoomLevel?: number;
//   mapHeight?: string;
//   mapWidth?: string;
// };

// const defaultIcon = new L.Icon({
//   iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
//   shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
// });

// const MapView: React.FC<MapViewProps> = ({
//   lat,
//   lng,
//   vehicleId,
//   locationName,
//   description,
//   vehicleType,
//   vehicleModel,
//   vehicleStatus,
//   zoomLevel = 13,
//   mapHeight = "400px",
//   mapWidth = "100%",
// }) => {
//   return (
//     <div style={{ height: mapHeight, width: mapWidth }}>
//       <MapContainer
//         center={[lat, lng]}
//         zoom={zoomLevel}
//         scrollWheelZoom
//         style={{ height: "100%", width: "100%" }}
//       >
//         <TileLayer
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />
//         <Marker position={[lat, lng]} icon={defaultIcon}>
//           <Popup>
//             <b>{locationName}</b> <br />
//             {description}
//             <hr />
//             <b>ID:</b> {vehicleId} <br />
//             <b>Type:</b> {vehicleType} <br />
//             <b>Model:</b> {vehicleModel} <br />
//             <b>Status:</b> {vehicleStatus}
//           </Popup>
//         </Marker>
//       </MapContainer>
//     </div>
//   );
// };

// export default MapView;

import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Circle, Popup } from "react-leaflet";
import L from "leaflet";
import emailjs from "@emailjs/browser";
import "leaflet/dist/leaflet.css";

// Props type
type MapViewProps = {
  lat: number;
  lng: number;
  vehicleId: string;
  locationName: string;
  description: string;
  vehicleType: string;
  vehicleModel: string;
  vehicleStatus: string;
  zoomLevel: number;
  mapHeight: string;
  mapWidth: string;
};

// Vellore coordinates
const velloreCenter: [number, number] = [12.9165, 79.1325];

// Radius in meters (~22 km)
const perimeterRadius = 22000;

// EmailJS config
const SERVICE_ID = "service_9ic24hp";
const TEMPLATE_ID = "template_nu2276s";
const PUBLIC_KEY = "O6Zgq0M4V5T9ksLnl";

const vehicleIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/61/61168.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

const MapView: React.FC<MapViewProps> = ({
  lat,
  lng,
  vehicleId,
  locationName,
  description,
  vehicleType,
  vehicleModel,
  vehicleStatus,
  zoomLevel,
  mapHeight,
  mapWidth,
}) => {
  const [vehiclePos] = useState<[number, number]>([lat, lng]);
  const [alertShown, setAlertShown] = useState(false);

  // Haversine distance formula
  const haversineDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) => {
    const R = 6371e3; // meters
    const toRad = (deg: number) => (deg * Math.PI) / 180;
    const φ1 = toRad(lat1);
    const φ2 = toRad(lat2);
    const Δφ = toRad(lat2 - lat1);
    const Δλ = toRad(lon2 - lon1);

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  };

  // Boundary check
  useEffect(() => {
    const distance = haversineDistance(
      velloreCenter[0],
      velloreCenter[1],
      vehiclePos[0],
      vehiclePos[1]
    );

    if (distance > perimeterRadius && !alertShown) {
      setAlertShown(true);
      alert("🚨 Vehicle has exceeded the allowed perimeter!");

      emailjs
        .send(
          SERVICE_ID,
          TEMPLATE_ID,
          {
            vehicle_id: vehicleId,
            vehicle_type: vehicleType,
            vehicle_model: vehicleModel,
            vehicle_status: vehicleStatus,
            location: locationName,
            description: description,
            latitude: vehiclePos[0],
            longitude: vehiclePos[1],
            distance_km: (distance / 1000).toFixed(2),
            to_email: "your_email@example.com", // change to your email
          },
          PUBLIC_KEY
        )
        .then(
          () => console.log("✅ Email sent successfully"),
          (err: any) => console.error("❌ Email error:", err)
        );
    }
  }, [vehicleId, vehiclePos, alertShown]);

  return (
    <div style={{ height: mapHeight, width: mapWidth }}>
      <MapContainer center={velloreCenter} zoom={zoomLevel} style={{ height: "100%", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* Circle boundary */}
        <Circle
          center={velloreCenter}
          radius={perimeterRadius}
          pathOptions={{ color: "red", fillOpacity: 0.1 }}
        >
          <Popup>Vellore Monitoring Zone (20–25 km)</Popup>
        </Circle>

        {/* Vehicle marker */}
        <Marker position={vehiclePos} icon={vehicleIcon}>
          <Popup>
            <b>{vehicleModel}</b> ({vehicleType}) <br />
            ID: {vehicleId} <br />
            Status: {vehicleStatus} <br />
            {locationName} – {description}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapView;
