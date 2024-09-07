import Card from "@/components/Card";

export default function HomePage() {
  return (
    <main className="flex-1">
      {/* Sección 1 */}
      <section className="w-full py-4 md:py-8 lg:py-16 mt-6 md:mt-12 lg:mt-18 relative">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[2fr_1fr] lg:gap-12 xl:grid-cols-[3fr_1fr]">
            <div className="flex flex-col justify-center space-y-4 border-2 border-orange-500 py-44 px-16 shadow-lg">
              <div className="space-y-10">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none mt-[-70px]">
                  CLIKA
                  <br />
                  ❝Tu cicla a un click❞
                </h2>
                <p className="max-w-[800px] text-muted-foreground md:text-xl">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero, nostrum inventore quae sequi, suscipit illum necessitatibus dolorem labore quam perspiciatis quidem iure quasi praesentium! Repudiandae nemo a debitis porro laudantium?
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                {/* Aquí puedes agregar botones u otros elementos */}
              </div>
            </div>
            <div>
              {/* Aquí puedes agregar una imagen, video o cualquier otro contenido que acompañe la introducción */}
            </div>
          </div>
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
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl">
                  Sección 2: Propuestas
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Nuestra propuesta como empresa.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-20">
              <div className="mt-4">
                <Card
                  heading="Intuitivo♿"
                  para="Gracias a nuestro software brindamos una interfaz sencilla de usar y que permite su fácil uso sin tener altos conocimientos en tecnología"
                />
              </div>
              <div className="mt-4">
                <Card
                  heading="Diverso🎨"
                  para="Nuestra mision es darle muchas alternativas de rutas al cliente , dandole una oportunidad para que se mueva y conozca la ciudad diferente"
                />
              </div>
              <div className="mt-4">
                <Card
                  heading="Economico💸"
                  para="¡Lo que nos diferencia de los demás es nuestras opciones de beneficios económicos para los usuarios, precios bajos, horas felices y mucho más!"
                />
              </div>
              <div className="mt-4">
                <Card
                  heading="Estrategico✨"
                  para="Gracias a las estaciones meticulosamente colocadas en la ciudad permiten que tus viajes sean estratégicos y dinámicos"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección 3 */}
      <section
        className="w-full py-12 md:py-24 lg:py-32 relative"
        id="seccion_3"
      >
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Sección 3: Tarifas
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Aqui se mostraran las tarifas para el servicios de bicicletas
                </p>
              </div>
            </div>
            <div>{/* Contenido adicional para la Sección 3 */}</div>
          </div>
        </div>
      </section>

      {/* Sección 4: Términos y Condiciones */}
      <section className="w-full bg-black text-white py-20 flex items-center justify-center">
        <div className="text-center space-y-2">
          <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
            CLIKA &copy; 2024
          </h2>
          <div className="flex justify-center space-x-4 text-sm sm:text-base">
            Leyes Políticas Privacidad
          </div>
        </div>
      </section>
    </main>
  );
}
