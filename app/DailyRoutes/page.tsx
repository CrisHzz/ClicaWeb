'use client'

import React, { useState } from 'react'
import { MapPin, X, Info, ChevronRight, Menu } from 'lucide-react'
import MapComponent from '@/components/mapita'
import Header from '@/components/Header'

const locations = [
    {
        title: 'LAURELES-ESTADIO',
        description: 'Laureles-Estadio es una comuna residencial y comercial ubicada en el centro-occidente de Medellín. Es conocida por su diseño urbano planificado, amplias avenidas arborizadas y una mezcla de casas tradicionales y edificios modernos. El área alberga importantes instalaciones deportivas, incluyendo el Estadio Atanasio Girardot, así como una variada oferta gastronómica y de entretenimiento.'
    },
    {
        title: 'El Poblado, Medellín, Antioquia, Colombia',
        description: 'El Poblado es una exclusiva zona residencial y comercial en el sureste de Medellín. Se caracteriza por sus lujosos condominios, centros comerciales de alta gama y una vibrante vida nocturna. El barrio es hogar de muchos artistas de talla mundial, expatriados y turistas, ofreciendo una amplia gama de restaurantes internacionales, boutiques de moda y parques como el Parque Lleras. Es la cara pública de la ciudad ante los ojos del mundo, muy nombrada en canciones y películas.'
    },
    {
        title: 'La América, Medellin, Antioquia, Colombia',
        description: 'La América es una comuna ubicada en el centro-occidente de Medellín. Es un área principalmente residencial con una mezcla de estratos socioeconómicos. La comuna cuenta con importantes centros educativos, parques públicos y el tradicional Cerro El Volador, que ofrece vistas panorámicas de la ciudad. La zona tiene un ambiente familiar y tranquilo, con buena conectividad al sistema de transporte público.'
    },
    {
        title: 'Belén, Medellin, Antioquia, Colombia',
        description: 'Belén es una extensa comuna en el suroeste de Medellín, conocida por su diversidad socioeconómica y cultural. El área combina zonas residenciales tradicionales con nuevos desarrollos modernos. Belén es famosa por su gastronomía local, especialmente sus buñuelos y natilla. La comuna alberga importantes centros comerciales, parques, la Unidad Deportiva de Belén y la Universidad de Medellín tiene su sede ahí, que ofrece múltiples instalaciones para actividades físicas y recreativas.'
    },
    {
        title: 'La Candelaria, Medellin, Antioquia, Colombia',
        description: 'La Candelaria es el centro histórico y administrativo de Medellín. Esta comuna alberga importantes edificios gubernamentales, museos, iglesias coloniales y plazas históricas. Es el corazón comercial de la ciudad, con mercados tradicionales, tiendas y el famoso Parque Berrío. La zona ha experimentado una significativa renovación urbana en los últimos años, incluyendo la revitalización de espacios públicos y la implementación de proyectos culturales.'
    }
]

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    description: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, description }) => {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg max-w-md w-full">
                <div className="flex justify-between items-start p-4 rounded-t border-b">
                    <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                        <Info className="w-5 h-5 mr-2 text-blue-500" />
                        {title}
                    </h3>
                    <button
                        type="button"
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                        onClick={onClose}
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <div className="p-6 space-y-6">
                    <p className="text-base leading-relaxed text-gray-500">
                        {description}
                    </p>
                </div>
                <div className="flex items-center justify-end p-6 space-x-2 rounded-b border-t border-gray-200">
                    <button
                        type="button"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                        onClick={onClose}
                    >
                        Cerrar
                        <ChevronRight className="w-4 h-4 ml-2" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default function Component() {
    const [selectedLocation, setSelectedLocation] = useState<{ title: string; description: string } | null>(null)
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const handleOpenModal = (location: { title: string; description: string }) => {
        setSelectedLocation(location)
    }

    const handleCloseModal = () => {
        setSelectedLocation(null)
    }

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <Header />
            <div className="container mx-auto p-4">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Comunas de Medellín</h1>
                    <button
                        onClick={toggleMenu}
                        className="md:hidden bg-white p-2 rounded-md shadow-md"
                    >
                        <Menu className="w-6 h-6 text-gray-600" />
                    </button>
                </div>
                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
                    <div className={`w-full md:w-1/3 bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-screen' : 'max-h-0 md:max-h-screen'}`}>
                        <div className="divide-y divide-gray-200">
                            {locations.map((location, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleOpenModal(location)}
                                    className="w-full flex items-center px-4 py-3 hover:bg-gray-50 transition duration-150 ease-in-out"
                                >
                                    <MapPin className="mr-3 h-5 w-5 text-blue-500 flex-shrink-0" />
                                    <span className="text-sm font-medium text-gray-700 text-left">{location.title}</span>
                                    <ChevronRight className="ml-auto h-5 w-5 text-gray-400" />
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="w-full md:w-2/3">
                        <div className="bg-white rounded-lg shadow-md overflow-hidden h-[700px]">
                            <MapComponent />
                        </div>
                    </div>
                </div>
            </div>
            {selectedLocation && (
                <Modal
                    isOpen={!!selectedLocation}
                    onClose={handleCloseModal}
                    title={selectedLocation.title}
                    description={selectedLocation.description}
                />
            )}
        </div>
    )
}
