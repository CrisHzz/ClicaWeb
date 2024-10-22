import Header from "@/components/Header"
import Card from "@/components/Card"
import Link from "next/link"

export default function HomePage() {
  return (
    <main className="flex-1">
      <Header />
      
      {/* Sección 1 */}
      <section className="w-full h-[80vh] flex justify-center items-center bg-gradient-to-r from-red-400 via-orange-500 to-amber-400 text-black relative">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl">
            CLIKA
            <br />
            ❝Tu cicla a un click❞
          </h2>
        </div>
      </section>

      {/* Sección 2 */}
      <section
        className="w-full py-12 md:py-24 lg:py-32 relative"
        id="seccion_2"
      >
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl">
                  Nuestra propuesta como empresa
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  <br />
                  CLIKA es un software de alquiler de bicicletas compartidas que
                  busca revolucionar la movilidad en . Nuestro software
                  permite a los usuarios alquilar bicicletas de forma rápida,
                  recomendarle rutas para que conozca la ciudad y brinda
                  estrategias económicas para aumentar el uso de este medio de
                  transporte.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10 md:gap-16 mt-8">
              <div className="mb-6">
                <Card
                  heading="Intuitivo♿"
                  para="Gracias a nuestro software brindamos una interfaz sencilla de usar y que permite su fácil uso sin tener altos conocimientos en tecnología"
                />
              </div>
              <div className="mb-6">
                <Card
                  heading="Diverso🎨"
                  para="Nuestra misión es darle muchas alternativas de rutas al cliente, dándole una oportunidad para que se mueva y conozca la ciudad diferente"
                />
              </div>
              <div className="mb-6">
                <Card
                  heading="Económico💸"
                  para="¡Lo que nos diferencia de los demás es nuestras opciones de beneficios económicos para los usuarios, precios bajos, horas felices y mucho más!"
                />
              </div>
              <div className="mb-6">
                <Card
                  heading="Estratégico✨"
                  para="Gracias a las estaciones meticulosamente colocadas en la ciudad permiten que tus viajes sean planeados estrategicamente y dinámicos"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección 3 */}
      <section className="w-full py-12 md:py-24 lg:py-32 relative" id="seccion_3">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl">
            Sección 3: Tarifas
          </h2>
          <p className="max-w-[600px] text-black md:text-xl">
            Queremos que viajes con nosotros ,por lo tanto te brindamos las mejores tarifas y opciones para que sigas siempre en sintonia.
          </p>
        </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
        {/* Plan por trayecto */}
        <div className="rounded-lg border border-orange-500 bg-white shadow-lg">
          <div className="p-6 space-y-4">
            <h3 className="text-2xl font-bold">Plan Tempo</h3>
            <p className="text-gray-500">¡Viaja a donde quieras por 30 minutos!</p>
            <div className="text-4xl font-bold">$ 2327 COP</div>
            <Link href="/sign-up">
            <button className="w-full py-2 px-4 mt-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          Seleccionar
            </button>
            </Link>
          </div>
          <div className="p-6 bg-gray-50 space-y-4">
            <ul className="list-disc list-inside space-y-2">
          <li>Toma cualquier estacion y inicia tu viaje</li>
          <li>Tienes 30 minutos para viajar a donde quieras</li>
          <li>Puedes seguir aumentando tu tiempo cuando se termine</li>
            </ul>
          </div>
        </div>
        {/* Plan mensual */}
        <div className="rounded-lg border border-black bg-white shadow-lg">
          <div className="p-6 space-y-4">
            <h3 className="text-2xl font-bold">Plan journey</h3>
            <p className="text-gray-500">¡Viaja mensualmente a donde quieras sin pagar por tiempo!</p>
            <div className="text-4xl font-bold">$ 55250 COP</div>
            <Link href="/sign-up">
            <button className="w-full py-2 px-4 mt-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Seleccionar
            </button>
            </Link>
          </div>
          <div className="p-6 bg-gray-50 space-y-4">
            <ul className="list-disc list-inside space-y-2">
          <li>Sin limite de tiempo!</li>
          <li>2 viajes diarios sin limites (Fines de semeana 3)</li>
          <li>Descuentos y dinamicas especiales</li>
          <li>Puedes crear comunidades</li>
            </ul>
          </div>
        </div>
          </div>
        </div>
      </div>
        </section>


      {/* Sección 4: Términos y Condiciones */}
      <section className="w-full bg-gradient-to-r from-black to-purple-950 text-white py-20 flex flex-col items-center justify-center space-y-4">
        <h2>CLIKA © 2024</h2>
        <div className="flex justify-center space-x-4 text-sm sm:text-base">
          <Link href="/home/laws">Leyes</Link>
          <Link href="/home/policy">Políticas</Link>
          <Link href="/home/privaty">Privacidad</Link>
        </div>
      </section>
    </main>
  )
}