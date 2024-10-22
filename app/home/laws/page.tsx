import React from 'react';
import Link from 'next/link';

export default function Page() {
    return (
        <div className="relative h-screen bg-cover" style={{ backgroundImage: "url('/404wallpaper.png')" }}>
            <Link href="/home" legacyBehavior>
                <a className="absolute top-5 right-5 px-4 py-2 bg-white text-black rounded-lg font-bold shadow-md hover:bg-gray-200">
                    Regresar a Home
                </a>
            </Link>
            
            <div className="flex items-center justify-center h-full w-full">
                <div className="bg-black bg-opacity-20 rounded-lg p-8 text-white text-center w-full h-full flex flex-col justify-center items-center">
                    <h1 className="text-3xl font-bold mb-4">Leyes Colombianas sobre Empresas de Transporte</h1>
                    
                    <h2 className="text-2xl font-semibold mb-2">1. Ley 1811 de 2016</h2>
                    <p className="mb-4">
                        Esta ley promueve el uso de la bicicleta como medio de transporte, estableciendo beneficios para los ciclistas. 
                        Busca fomentar la integración de la bicicleta en el sistema de transporte urbano, asegurando la construcción de 
                        infraestructura adecuada y el respeto de los derechos de los ciclistas en las vías.
                    </p>

                    <h2 className="text-2xl font-semibold mb-2">2. Código Nacional de Tránsito (Ley 769 de 2002)</h2>
                    <p className="mb-4">
                        Regula el tránsito de bicicletas y otros vehículos en Colombia. Esta ley establece normas claras para la 
                        circulación de bicicletas, indicando cómo deben comportarse los ciclistas en las vías y las responsabilidades de 
                        los conductores de vehículos motorizados para garantizar la seguridad de todos los usuarios de la vía.
                    </p>

                    <h2 className="text-2xl font-semibold mb-2">3. Ley 1257 de 2008</h2>
                    <p className="mb-4">
                        Promueve la igualdad y la no discriminación en el acceso a los servicios de transporte. Es fundamental para tu 
                        empresa de alquiler de bicicletas, ya que garantiza que todos los ciudadanos tengan acceso a este servicio, sin 
                        distinción de género, edad, o condición física.
                    </p>

                    <h2 className="text-2xl font-semibold mb-2">4. Ley 1581 de 2012</h2>
                    <p className="mb-4">
                        Esta ley regula la protección de datos personales en Colombia. Si tu empresa recopila información de los usuarios, 
                        como datos de contacto y detalles de pagos, debes cumplir con esta normativa, asegurando que los datos sean 
                        tratados de manera responsable y segura.
                    </p>

                    <h2 className="text-2xl font-semibold mb-2">5. Normativa Local</h2>
                    <p>
                        Además de las leyes nacionales, es esencial consultar las regulaciones específicas de tu localidad sobre el uso 
                        de bicicletas y los servicios de transporte. Esto puede incluir licencias, seguros y normativas de seguridad que 
                        varían según la ciudad o región.
                    </p>
                </div>
            </div>
        </div>
    );
}
