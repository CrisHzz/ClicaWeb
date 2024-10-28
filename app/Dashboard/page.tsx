"use client";

import Header from "@/components/Header";
import MapStations from "@/components/MapStations";
import { useEffect, useState } from "react";
import type { Station } from "@/types/station";
import { crearReserva } from "@/components/backend/bookings/bookingService";
import { useUser } from "@clerk/nextjs";

interface Reservas {
  id: number;
  booking_date: Date;
  serialId: string;
  booking_type: string;
}

type PaymentMethod = "Plan Tempo" | "Plan Journey" | null;

export default function Dashboard() {
  const { user } = useUser();
  const [stations, setStations] = useState<Station[]>([]);
  const [filteredStations, setFilteredStations] = useState<Station[]>([]);
  const [showStartOptions, setShowStartOptions] = useState(false);
  const [showEndOptions, setShowEndOptions] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod>(null);
  const [startStation, setStartStation] = useState<Station | null>(null);
  const [endStation, setEndStation] = useState<Station | null>(null);

  useEffect(() => {
    const loadStations = async () => {
      try {
        const response = await fetch("/stations.json");
        if (!response.ok) {
          throw new Error("Error al cargar el archivo JSON");
        }
        const data = await response.json();
        
        if (Array.isArray(data.locations)) {
          setStations(data.locations);
          setFilteredStations(data.locations);
        } else {
          console.error("El formato de los datos no es un array");
          setStations([]);
          setFilteredStations([]);
        }
      } catch (error) {
        console.error("Error:", error);
        setStations([]);
        setFilteredStations([]);
      }
    };

    loadStations();
  }, []);

  useEffect(() => {
    const filtered = stations.filter((station) =>
      station.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredStations(filtered);
  }, [searchTerm, stations]);

  const handlePaymentMethodSelect = (method: PaymentMethod) => {
    setSelectedPaymentMethod(method);
  };

  const handleStationSelect = (station: Station, isStart: boolean) => {
    if (isStart) {
      setStartStation(station);
      setShowStartOptions(false);
    } else {
      setEndStation(station);
      setShowEndOptions(false);
    }
    setSearchTerm("");
  };

  const handleCreateReservation = async () => {
    if (!selectedPaymentMethod) {
      alert("Por favor, seleccione un método de pago");
      return;
    }

    if (!user) {
      alert("Debe iniciar sesión para crear una reserva");
      return;
    }

    if (!startStation || !endStation) {
      alert("Por favor, seleccione estaciones de inicio y final");
      return;
    }

    try {
      const newReservation: Omit<Reservas, 'id'> = {
        booking_date: new Date(),
        serialId: user.id,
        booking_type: selectedPaymentMethod
      };

      await crearReserva(newReservation);
      alert("Reserva creada exitosamente");
      
      setSelectedPaymentMethod(null);
      setStartStation(null);
      setEndStation(null);
    } catch (error) {
      console.error("Error al crear la reserva:", error);
      alert("Error al crear la reserva");
    }
  };

  // Define las funciones `onSelectStart` y `onSelectEnd`
  const onSelectStart = (station: Station) => setStartStation(station);
  const onSelectEnd = (station: Station) => setEndStation(station);  

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1 flex-col lg:flex-row">
        <div className="w-full lg:w-1/3 p-4 bg-white shadow-md z-10">
          <h1 className="text-2xl font-bold mb-4">Bienvenido a clika!</h1>
          <p className="text-lg mb-6">¿A dónde viajamos hoy?</p>
          <div className="space-y-4">
            <div>
              <button
                className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                onClick={() => setShowStartOptions(!showStartOptions)}
              >
                {startStation ? startStation.name : "Inicio"}
              </button>
              {showStartOptions && (
                <div className="mt-2">
                  <input
                    type="text"
                    placeholder="Buscar estación..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md mb-2"
                  />
                  <ul className="bg-white border rounded-md shadow-md max-h-48 overflow-y-auto">
                    {filteredStations.map((station) => (
                      <li 
                        key={station.id} 
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleStationSelect(station, true)}
                      >
                        {station.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div>
              <button
                className="w-full px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90 transition-colors"
                onClick={() => setShowEndOptions(!showEndOptions)}
              >
                {endStation ? endStation.name : "Final"}
              </button>
              {showEndOptions && (
                <div className="mt-2">
                  <input
                    type="text"
                    placeholder="Buscar estación..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md mb-2"
                  />
                  <ul className="bg-white border rounded-md shadow-md max-h-48 overflow-y-auto">
                    {filteredStations.map((station) => (
                      <li 
                        key={station.id} 
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleStationSelect(station, false)}
                      >
                        {station.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-4">Método de pago</h2>
            <div className="space-y-4">
              <button 
                className={`w-full px-4 py-2 text-white rounded-md transition-colors ${
                  selectedPaymentMethod === "Plan Tempo"
                    ? "bg-blue-700"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
                onClick={() => handlePaymentMethodSelect("Plan Tempo")}
              >
                Plan Tempo (Viaje de 30 minutos)
              </button>
              <button 
                className={`w-full px-4 py-2 text-white rounded-md transition-colors ${
                  selectedPaymentMethod === "Plan Journey"
                    ? "bg-green-700"
                    : "bg-green-500 hover:bg-green-600"
                }`}
                onClick={() => handlePaymentMethodSelect("Plan Journey")}
              >
                Plan Journey (Subscripción mensual)
              </button>
            </div>
          </div>
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-4">Crear reserva</h2>
            <button 
              className="w-full px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors disabled:bg-red-300 disabled:cursor-not-allowed"
              onClick={handleCreateReservation}
              disabled={!selectedPaymentMethod || !startStation || !endStation}
            >
              Crear reserva
            </button>
          </div>
        </div>
        <div className="flex-1">
          <MapStations 
            apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
            startStation={startStation}
            endStation={endStation}
            onSelectStart={onSelectStart}
            onSelectEnd={onSelectEnd}
          />
        </div>
      </div>
    </div>
  );
}
