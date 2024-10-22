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
            
            <div className="flex items-center justify-center h-full">
                <div className="bg-black bg-opacity-70 rounded-lg p-8 text-white text-center max-w-3xl">
                    <h1 className="text-3xl font-bold mb-4">Políticas de Alquiler de Bicicletas</h1>
                    
                    <h2 className="text-2xl font-semibold mb-2">1. Cuidado de las Bicicletas</h2>
                    <p className="mb-4">
                        Al alquilar una bicicleta, te comprometes a cuidarla y mantenerla en buen estado. Esto incluye verificar 
                        los frenos, las llantas y el funcionamiento general de la bicicleta antes de su uso. Cualquier daño 
                        causado durante el alquiler será responsabilidad del usuario.
                    </p>

                    <h2 className="text-2xl font-semibold mb-2">2. Uso Adecuado</h2>
                    <p className="mb-4">
                        Las bicicletas deben ser utilizadas exclusivamente para el transporte y no para competencias o eventos 
                        que puedan dañarlas. Es fundamental seguir las normas de tránsito y ser respetuoso con otros usuarios de la vía.
                    </p>

                    <h2 className="text-2xl font-semibold mb-2">3. Devolución a Tiempo</h2>
                    <p className="mb-4">
                        Es importante devolver la bicicleta en el tiempo acordado. Si se presenta una demora en la devolución, 
                        se aplicarán cargos adicionales según nuestras tarifas. Esto garantiza que otros usuarios también 
                        puedan disfrutar del servicio.
                    </p>

                    <h2 className="text-2xl font-semibold mb-2">4. Multas por Daños</h2>
                    <p className="mb-4">
                        Si la bicicleta es devuelta con daños o en un estado que no se puede utilizar, se aplicará una multa. 
                        Los costos de reparación se calcularán según el daño y se informarán al usuario en el momento de la 
                        devolución. Es fundamental reportar cualquier daño o problema durante el uso para evitar mayores 
                        inconvenientes.
                    </p>

                    <h2 className="text-2xl font-semibold mb-2">5. Responsabilidad del Usuario</h2>
                    <p className="mb-4">
                        Al alquilar una bicicleta, el usuario acepta que es responsable de cualquier incidente que ocurra 
                        durante el uso de la misma. Se recomienda usar casco y seguir las normas de seguridad para garantizar 
                        un viaje seguro.
                    </p>

                    <h2 className="text-2xl font-semibold mb-2">6. Atención al Cliente</h2>
                    <p>
                        Si tienes preguntas o inquietudes sobre nuestras políticas, no dudes en ponerte en contacto 
                        con nuestro equipo de atención al cliente. Estamos aquí para ayudarte a disfrutar de tu experiencia 
                        de alquiler de bicicletas y garantizar que todo funcione sin problemas.
                    </p>
                </div>
            </div>
        </div>
    );
}
