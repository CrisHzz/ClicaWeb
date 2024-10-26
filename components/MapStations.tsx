"use client";
import React, { useState, useEffect, useCallback } from "react";
import { GoogleMap, useJsApiLoader, Marker, InfoWindow, DirectionsRenderer } from "@react-google-maps/api";

interface MapStationsProps {
    apiKey?: string;
    startStation: Station | null;
    endStation: Station | null;
    onSelectStart: (station: Station) => void;
    onSelectEnd: (station: Station) => void;
}

interface Station {
    name: string;
    address: string;
    city: string;
    state: string;
    coordinates: {
        latitude: number;
        longitude: number;
    };
}

const containerStyle = {
    display: "flex",
    justifyContent: "flex-end",
    width: "100%",
    height: "800px",
};

const mapContainerStyle = {
    width: "100%",
    height: "100%",
};

const medellinCenter = {
    lat: 6.246607,
    lng: -75.566428,
};

const mapOptions: google.maps.MapOptions = {
    disableDefaultUI: true,
    zoomControl: true,
    zoom: 12,
};

const MapStations: React.FC<MapStationsProps> = ({ apiKey, startStation, endStation, onSelectStart, onSelectEnd }) => {
    const { isLoaded, loadError } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: apiKey || "",
    });

    const [stations, setStations] = useState<Station[]>([]);
    const [selectedStation, setSelectedStation] = useState<Station | null>(null);
    const [directionsResponse, setDirectionsResponse] = useState<google.maps.DirectionsResult | null>(null);

    useEffect(() => {
        const fetchStations = async () => {
            try {
                const response = await fetch("/stations.json");
                const data = await response.json();
                setStations(data.locations);
            } catch (error) {
                console.error("Error al cargar las estaciones:", error);
            }
        };
        fetchStations();
    }, []);

    const calculateRoute = useCallback(async () => {
        if (startStation && endStation && apiKey) {
            const directionsService = new google.maps.DirectionsService();
            try {
                const result = await directionsService.route({
                    origin: new google.maps.LatLng(startStation.coordinates.latitude, startStation.coordinates.longitude),
                    destination: new google.maps.LatLng(endStation.coordinates.latitude, endStation.coordinates.longitude),
                    travelMode: google.maps.TravelMode.DRIVING,
                });
                setDirectionsResponse(result);
            } catch (error) {
                console.error("Error al calcular la ruta:", error);
                setDirectionsResponse(null);
            }
        }
    }, [startStation, endStation, apiKey]);

    useEffect(() => {
        calculateRoute();
    }, [calculateRoute]);

    if (loadError) return <div>Error al cargar el mapa: {loadError.message}</div>;
    if (!isLoaded) return <div>Cargando mapa...</div>;

    return (
        <div style={containerStyle}>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={medellinCenter}
                zoom={12}
                options={mapOptions}
            >
                {stations.map((station) => (
                    <Marker
                        key={station.name}
                        position={{
                            lat: station.coordinates.latitude,
                            lng: station.coordinates.longitude,
                        }}
                        onClick={() => setSelectedStation(station)}
                        onDblClick={() => {
                            startStation ? onSelectEnd(station) : onSelectStart(station);
                        }}
                    />
                ))}
                
                {selectedStation && (
                    <InfoWindow
                        position={{
                            lat: selectedStation.coordinates.latitude,
                            lng: selectedStation.coordinates.longitude,
                        }}
                        onCloseClick={() => setSelectedStation(null)}
                    >
                        <div>
                            <h3>{selectedStation.name}</h3>
                            <p>{selectedStation.address}</p>
                            <p>{selectedStation.city}, {selectedStation.state}</p>
                        </div>
                    </InfoWindow>
                )}

                {directionsResponse && (
                    <DirectionsRenderer directions={directionsResponse} />
                )}
            </GoogleMap>
        </div>
    );
};

export default MapStations;
