"use client"

import { useEffect, useState } from 'react'
import Header from '@/components/Header'
import { obtenerReservas } from '@/components/backend/bookings/bookingService'
import { Timestamp } from 'firebase/firestore'
import { CalendarIcon, ClockIcon, UserIcon } from 'lucide-react'

export default function Bookings() {
  const [reservas, setReservas] = useState<{ booking_date: Date; id: number; serialId: string; booking_type: string; }[]>([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const data = await obtenerReservas()
        const formattedData = data
          .filter(reserva => reserva && reserva.id && reserva.booking_date) // Filtra reservas vacías o sin ID o sin fecha
          .map((reserva) => ({
            ...reserva,
            booking_date: reserva.booking_date instanceof Timestamp ? reserva.booking_date.toDate() : reserva.booking_date,
          }))
        setReservas(formattedData)
      } catch (error) {
        console.error("Error al obtener reservas:", error)
      } finally {
        setCargando(false)
      }
    }

    fetchReservas()
  }, [])

  if (cargando) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Reservas</h2>
        {reservas.length === 0 ? (
          <p className="text-xl text-gray-600">No hay reservas disponibles.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reservas.map((reserva) => (
              <div key={reserva.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-semibold text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                      ID: {reserva.id}
                    </span>
                    <span className="text-sm font-medium text-gray-500">
                      {reserva.booking_type}
                    </span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-700">
                      <UserIcon className="h-5 w-5 mr-2 text-gray-500" />
                      <span className="font-medium">Usuario</span> {/* Cambiado a "Usuario" */}
                    </div>
                    <div className="flex items-center text-gray-700">
                      <CalendarIcon className="h-5 w-5 mr-2 text-gray-500" />
                      <span>{reserva.booking_date?.toLocaleDateString() || 'N/A'}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <ClockIcon className="h-5 w-5 mr-2 text-gray-500" />
                      <span>{reserva.booking_date?.toLocaleTimeString() || 'N/A'}</span>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-6 py-3">
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
