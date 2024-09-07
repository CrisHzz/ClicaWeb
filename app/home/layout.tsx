import "../globals.css";

export default function Home({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="bg-white h-[88px] w-full bg-no-repeat bg-center flex items-center justify-between px-4 shadow-md">
        <div className="flex items-center border-b border-gray-300 pb-2">
          <img src="/logo.png" className="h-20" alt="Logo" />
          <span className="ml-4 font-bold font-carter-one text-4xl">
            C L I K A
          </span>
        </div>
        <div className="border-b border-gray-300 pb-2">
          <a href="#seccion_2">
            <button className="btn">Nuestra Propuesta</button>
          </a>

          <a href="#seccion_3">
            <button className="btn">Tarifas</button>
          </a>
        </div>
        <div className="flex gap-4 border-b border-gray-300 pb-2">
          <button className="btn">Iniciar Sesion</button>
          <button className="btn">Registrase</button>
        </div>
      </header>
      <main>{children}</main>
    </>
  );
}
