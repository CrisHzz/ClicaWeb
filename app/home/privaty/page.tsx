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
                    <h1 className="text-3xl font-bold mb-4">Leyes Colombianas sobre Protección de Datos</h1>
                    
                    <h2 className="text-2xl font-semibold mb-2">1. Ley 1581 de 2012</h2>
                    <p className="mb-4">
                        Esta ley establece disposiciones generales para la protección de datos personales en Colombia. 
                        Busca garantizar el derecho a la intimidad y la protección de los datos de las personas, estableciendo 
                        normas para su recolección, almacenamiento y tratamiento.
                    </p>

                    <h2 className="text-2xl font-semibold mb-2">2. Decreto 1377 de 2013</h2>
                    <p className="mb-4">
                        Este decreto complementa la Ley 1581 de 2012 y regula aspectos específicos del tratamiento de 
                        datos personales, incluyendo la autorización del titular para el uso de sus datos y las excepciones a 
                        esta autorización.
                    </p>

                    <h2 className="text-2xl font-semibold mb-2">3. Ley 1266 de 2008</h2>
                    <p className="mb-4">
                        Conocida como la Ley de Habeas Data, regula el manejo de la información que se tenga sobre las personas 
                        en bases de datos, asegurando el derecho de los ciudadanos a conocer, actualizar y rectificar su información 
                        personal en los bancos de datos.
                    </p>

                    <h2 className="text-2xl font-semibold mb-2">4. Ley 1750 de 2015</h2>
                    <p className="mb-4">
                        Esta ley se enfoca en la protección de los datos personales de los menores de edad. Establece que se debe 
                        contar con el consentimiento expreso de los padres o representantes legales para el tratamiento de datos 
                        de niños y adolescentes.
                    </p>

                    <h2 className="text-2xl font-semibold mb-2">5. Normativa Sectorial</h2>
                    <p>
                        Dependiendo del sector de actividad, pueden existir normativas adicionales que regulen la protección de datos. 
                        Es esencial estar al tanto de estas regulaciones, especialmente si tu empresa opera en sectores sensibles 
                        como salud, finanzas, o educación.
                    </p>
                </div>
            </div>
        </div>
    );
}
