import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

type MapViewProps = {
  lat: number;
  lng: number;
  vehicleId: string;
  locationName: string;
  description: string;
  vehicleType: string;
  vehicleModel: string;
  vehicleStatus: string;
  zoomLevel?: number;
  mapHeight?: string;
  mapWidth?: string;
};

const defaultIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
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
  zoomLevel = 13,
  mapHeight = "400px",
  mapWidth = "100%",
}) => {
  return (
    <div style={{ height: mapHeight, width: mapWidth }}>
      <MapContainer
        center={[lat, lng]}
        zoom={zoomLevel}
        scrollWheelZoom
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lng]} icon={defaultIcon}>
          <Popup>
            <b>{locationName}</b> <br />
            {description}
            <hr />
            <b>ID:</b> {vehicleId} <br />
            <b>Type:</b> {vehicleType} <br />
            <b>Model:</b> {vehicleModel} <br />
            <b>Status:</b> {vehicleStatus}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapView;