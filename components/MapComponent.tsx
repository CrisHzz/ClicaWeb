"use client";
import React, { useState, useCallback, useRef, useEffect } from "react";
import { GoogleMap, useJsApiLoader, Polygon } from "@react-google-maps/api";
interface MapComponentProps {
  apiKey?: string;
}

interface MapState {
  map: google.maps.Map | null;
  searchInput: string;
  cityBoundary: google.maps.LatLngLiteral[];
  suggestions: string[];
}

const mapContainerStyle = {
  width: "100%",
  height: "700px",
};

const medellinCenter = {
  lat: 6.246607,
  lng: -75.566428,
};

const mapOptions: google.maps.MapOptions = {
  disableDefaultUI: true,
  zoomControl: true,
};

const polygonOptions: google.maps.PolygonOptions = {
  fillColor: "#e0f2fe",
  fillOpacity: 0.15,
  strokeColor: "#0f172a",
  strokeOpacity: 0.8,
  strokeWeight: 2,
};

const MapComponent: React.FC<MapComponentProps> = ({ apiKey }) => {
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey || "",
    libraries: ["places"],
  });

  const [state, setState] = useState<MapState>({
    map: null,
    searchInput: "",
    cityBoundary: [],
    suggestions: [],
  });

  const placesService = useRef<google.maps.places.PlacesService | null>(null);
  const autocompleteService =
    useRef<google.maps.places.AutocompleteService | null>(null);
  const geocoder = useRef<google.maps.Geocoder | null>(null);
  const polygonsRef = useRef<google.maps.Polygon[]>([]); // Mantén un registro de los polígonos

  const onLoad = useCallback((map: google.maps.Map) => {
    setState((prev) => ({ ...prev, map }));
    placesService.current = new google.maps.places.PlacesService(map);
    autocompleteService.current = new google.maps.places.AutocompleteService();
    geocoder.current = new google.maps.Geocoder();

    // Centra el mapa en Medellín y establece el zoom inicial
    map.setCenter(medellinCenter);
    map.setZoom(11);
  }, []);

  const onUnmount = useCallback(() => {
    setState((prev) => ({ ...prev, map: null }));
  }, []);

  useEffect(() => {
    if (state.searchInput && autocompleteService.current) {
      autocompleteService.current.getPlacePredictions(
        { input: state.searchInput, types: ["(cities)"] },
        (predictions, status) => {
          if (
            status === google.maps.places.PlacesServiceStatus.OK &&
            predictions
          ) {
            setState((prev) => ({
              ...prev,
              suggestions: predictions.map((p) => p.description),
            }));
          }
        }
      );
    } else {
      setState((prev) => ({ ...prev, suggestions: [] }));
    }
  }, [state.searchInput]);

  const searchCity = useCallback(() => {
    if (!state.map || !geocoder.current) return;

    // Limpiar el polígono antes de realizar la nueva búsqueda
    setState((prev) => ({ ...prev, cityBoundary: [] }));

    geocoder.current.geocode(
      { address: state.searchInput },
      (results, status) => {
        if (status === "OK" && results && results[0] && state.map) {
          const location = results[0].geometry.location;
          state.map.setCenter(location);

          // Establecer el zoom basado en la geometría del lugar
          const bounds = results[0].geometry.viewport;
          if (bounds) {
            const boundsExtend = new google.maps.LatLngBounds();
            boundsExtend.extend(bounds.getNorthEast());
            boundsExtend.extend(bounds.getSouthWest());
            state.map.fitBounds(boundsExtend);
          } else {
            // Zoom predeterminado si no se encuentra el viewport
            state.map.setZoom(15);
          }

          fetchCityBoundary(bounds);
        } else {
          alert("No se pudo encontrar la ubicación");
        }
      }
    );
  }, [state.map, state.searchInput]);

  const fetchCityBoundary = useCallback(
    (bounds: google.maps.LatLngBounds) => {
      const apiUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        state.searchInput
      )}&polygon_geojson=1`;

      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          if (data && data[0] && data[0].geojson) {
            const coordinates = data[0].geojson.coordinates[0];
            const newBoundary = coordinates.map((coord: number[]) => ({
              lat: coord[1],
              lng: coord[0],
            }));
            setState((prev) => ({ ...prev, cityBoundary: newBoundary }));
          } else {
            const newBoundary = [
              {
                lat: bounds.getNorthEast().lat(),
                lng: bounds.getNorthEast().lng(),
              },
              {
                lat: bounds.getNorthEast().lat(),
                lng: bounds.getSouthWest().lng(),
              },
              {
                lat: bounds.getSouthWest().lat(),
                lng: bounds.getSouthWest().lng(),
              },
              {
                lat: bounds.getSouthWest().lat(),
                lng: bounds.getNorthEast().lng(),
              },
            ];
            setState((prev) => ({ ...prev, cityBoundary: newBoundary }));
          }
        })
        .catch((error) => {
          console.error("Error fetching city boundary:", error);
          const newBoundary = [
            {
              lat: bounds.getNorthEast().lat(),
              lng: bounds.getNorthEast().lng(),
            },
            {
              lat: bounds.getNorthEast().lat(),
              lng: bounds.getSouthWest().lng(),
            },
            {
              lat: bounds.getSouthWest().lat(),
              lng: bounds.getSouthWest().lng(),
            },
            {
              lat: bounds.getSouthWest().lat(),
              lng: bounds.getNorthEast().lng(),
            },
          ];
          setState((prev) => ({ ...prev, cityBoundary: newBoundary }));
        });
    },
    [state.searchInput]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({ ...prev, searchInput: e.target.value }));
  };

  const handleSuggestionClick = (suggestion: string) => {
    setState((prev) => ({ ...prev, searchInput: suggestion, suggestions: [] }));
    setTimeout(searchCity, 0);
  };

  if (loadError) {
    return <div>Error al cargar el mapa: {loadError.message}</div>;
  }

  if (!isLoaded) {
    return <div>Cargando mapa...</div>;
  }

  if (!apiKey) {
    return (
      <div>
        Error: No se ha proporcionado una clave de API para Google Maps.
      </div>
    );
  }

  return (
    <div style={{ position: "relative", zIndex: 1 }}>
      <div
        style={{
          marginBottom: "10px",
          position: "relative",
          zIndex: 2,
        }}
      >
        <input
          type="text"
          value={state.searchInput}
          onChange={handleInputChange}
          placeholder="Buscar ciudad"
          style={{ width: "100%", padding: "10px", boxSizing: "border-box" }}
        />
        <button
          onClick={searchCity}
          style={{
            position: "absolute",
            right: "0",
            top: "0",
            height: "100%",
            padding: "0 15px",
          }}
        >
          Buscar
        </button>
        {state.suggestions.length > 0 && (
          <ul
            style={{
              position: "absolute",
              top: "100%",
              left: "0",
              right: "0",
              background: "white",
              listStyle: "none",
              padding: "0",
              margin: "0",
              border: "1px solid #ccc",
              boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
              maxHeight: "200px",
              overflowY: "auto",
              zIndex: 3,
            }}
          >
            {state.suggestions.map((suggestion, index) => (
              <li
                key={index}
                style={{
                  padding: "10px",
                  cursor: "pointer",
                  borderBottom: "1px solid #eee",
                }}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div style={{ position: "relative", zIndex: 1 }}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={medellinCenter}
          zoom={11}
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={mapOptions}
        >
          {state.cityBoundary.length > 0 && (
            <Polygon
              paths={state.cityBoundary}
              options={polygonOptions}
            />
          )}
        </GoogleMap>
      </div>
    </div>
  );
};

export default MapComponent;
