"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { fetchOffices as getOfficesApi } from "@/utilities/api";

// Import Leaflet CSS
import "leaflet/dist/leaflet.css";

// Dynamically import Leaflet components to avoid SSR issues
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false });

const Map = ({ lat, lng, title }) => {
    // Check if window is defined (client-side)
    if (typeof window === "undefined") return null;

    // Fix for default marker icon issue in Leaflet with Webpack/Next.js
    const L = require("leaflet");
    const DefaultIcon = L.icon({
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
    });
    L.Marker.prototype.options.icon = DefaultIcon;

    return (
        <MapContainer center={[lat, lng]} zoom={13} scrollWheelZoom={false} style={{ height: "100%", width: "100%", zIndex: 0 }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[lat, lng]}>
                <Popup>{title}</Popup>
            </Marker>
        </MapContainer>
    );
};

const OfficeMaps = () => {
    const [offices, setOffices] = useState([]);

    useEffect(() => {
        const fetchOffices = async () => {
            try {
                const response = await getOfficesApi();
                if (Array.isArray(response?.offices)) {
                    setOffices(response.offices);
                }
            } catch (error) {
                console.error("Failed to fetch offices:", error);
            }
        };

        fetchOffices();
    }, []);

    return (
        <div className=" grid md:grid-cols-2 grid-cols-1 md:gap-12 gap-8">
            {offices.map((office) => (
                <div key={office.id}>
                    <h3 className="text-H3 font-bold text-center md:mb-12 mb-6">{office.title}</h3>
                    <div className="relative md:h-350 h-256 w-full rounded-lg overflow-hidden border border-divider shadow-md">
                        <Map lat={parseFloat(office.latitude)} lng={parseFloat(office.longitude)} title={office.title} />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default OfficeMaps;
