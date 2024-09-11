"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-white h-[88px] w-full bg-no-repeat bg-center flex items-center justify-between px-4 shadow-md">
      <div className="flex items-center border-b border-gray-300 pb-2">
        <img src="/logo.png" className="h-20" alt="Logo" />
        <Link href="/home">
          <span className="ml-4 font-bold font-carter-one text-4xl">
            C L I K A
          </span>
        </Link>
      </div>
      {pathname === "/home" && (
        <>
          <div className="border-b border-gray-300 pb-2 flex gap-2">
            {" "}
            {/* Agregado gap */}
            <a href="#seccion_2">
              <button className="btn ml-7">Nuestra propuesta</button>{" "}
              {/* Agregado margen izquierdo */}
            </a>
            <a href="#seccion_3">
              <button className="btn ml-10">Tarifas</button>
            </a> 
          </div>

          <div className="flex gap-4 border-b border-gray-300 pb-2">
            <button className="btn">Iniciar Sesion</button>
            <button className="btn">Registrarse</button>
          </div>
        </>
      )}
      {pathname === "/DailyRoutes" && (
        <>
          <div className="border-b border-gray-300 pb-2">
            <button className="btn">Rentar 🚲</button>
            <button className="btn">Rutas sugeridas 📍</button>
          </div>
          <div className="flex gap-4 border-b border-gray-300 pb-2">
            <button className="btn">Mis reservas 🗓️</button>
            <button className="btn">Mi perfil 👤</button>
          </div>
        </>
      )}
    </header>
  );
}
