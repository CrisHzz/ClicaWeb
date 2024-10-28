"use client"

import React, { useState, useCallback } from 'react';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import dailyRoutes from '@/public/dailyRoutes.json';

const medellinCenter = {
  lat: 6.246607,
  lng: -75.566428,
};

interface Route {
  name: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

interface Routes {
  [key: string]: {
    [routeName: string]: Route[];
  };
}


const containerStyle = {
  width: '100%',
  height: '50vh', // Cambiado a una unidad relativa
};

const MapComponent: React.FC = () => {
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const handleMapLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const handleRouteChange = (comuna: string) => {
    const routes = (dailyRoutes as Routes)[comuna];
    if (routes) {
      const routeKeys = Object.keys(routes);
      const selectedRoute = routes[routeKeys[currentIndex % routeKeys.length]];

      const waypoints = selectedRoute.slice(1, -1).map((point: any) => ({
        location: new google.maps.LatLng(point.coordinates.latitude, point.coordinates.longitude),
        stopover: true,
      }));

      const directionsService = new google.maps.DirectionsService();
      directionsService.route(
        {
          origin: new google.maps.LatLng(
            selectedRoute[0].coordinates.latitude,
            selectedRoute[0].coordinates.longitude
          ),
          destination: new google.maps.LatLng(
            selectedRoute[selectedRoute.length - 1].coordinates.latitude,
            selectedRoute[selectedRoute.length - 1].coordinates.longitude
          ),
          waypoints,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK && result) {
            setDirections(result);
            setCurrentIndex((prevIndex) => prevIndex + 1);

            if (map) {
              map.fitBounds(result.routes[0].bounds);
            }
          } else {
            console.error(`Error al obtener la dirección: ${status}`);
          }
        }
      );
    }
  };

  return (
    <div className="flex flex-col items-center">
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={medellinCenter}
          zoom={13}
          onLoad={handleMapLoad}
        >
          {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
      </LoadScript>

      <div className="flex flex-wrap gap-2 mt-4 justify-center">
        <button
          onClick={() => handleRouteChange('LAURELES - ESTADIO')}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          LAURELES-ESTADIO
        </button>
        <button
          onClick={() => handleRouteChange('El Poblado, Medellín, Antioquia, Colombia')}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          El Poblado
        </button>
        <button
          onClick={() => handleRouteChange('La América, Medellin, Antioquia, Colombia')}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          La América
        </button>
        <button
          onClick={() => handleRouteChange('Belén, Medellin, Antioquia, Colombia')}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Belén
        </button>
        <button
          onClick={() => handleRouteChange('La Candelaria, Medellin, Antioquia, Colombia')}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          La Candelaria
        </button>
      </div>
    </div>
  );
};

export default MapComponent;
