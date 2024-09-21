"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-white h-auto sm:h-[88px] w-full bg-no-repeat bg-center flex flex-col sm:flex-row items-center justify-between px-4 shadow-md">
      <div className="flex items-center border-b border-gray-300 pb-2 w-full sm:w-auto">
        <img
          src="/logo.png"
          className="h-16 sm:h-20" // Ajuste del tamaño de la imagen en dispositivos pequeños
          alt="Logo"
        />
        <Link href="/home">
          <span className="ml-2 sm:ml-4 font-bold font-carter-one text-3xl sm:text-4xl">
            C L I K A
          </span>
        </Link>
      </div>
      {pathname === "/home" && (
        <>
          <div className="border-b border-gray-300 pb-2 flex flex-col sm:flex-row sm:gap-2 gap-1 w-full sm:w-auto mt-2 sm:mt-0">
            <a href="#seccion_2">
              <button className="btn w-full sm:w-auto sm:ml-7">
                Nuestra propuesta
              </button>
            </a>
            <a href="#seccion_3">
              <button className="btn w-full sm:w-auto sm:ml-10">Tarifas</button>
            </a>
          </div>

          <div className="flex flex-col sm:flex-row sm:gap-4 gap-2 border-b border-gray-300 pb-2 w-full sm:w-auto mt-2 sm:mt-0">
            <Link href="/sign-in">
              <button className="btn w-full sm:w-auto">Iniciar Sesion</button>
            </Link>

            <Link href="/sign-up">
              <button className="btn w-full sm:w-auto">Registrarse</button>
              </Link>

          </div>
        </>
      )}
      {pathname === "/DailyRoutes" && (
        <>
          <div className="border-b border-gray-300 pb-2 flex flex-col sm:flex-row sm:gap-2 gap-1 w-full sm:w-auto mt-2 sm:mt-0">
            <button className="btn w-full sm:w-auto" >Rentar 🚲</button>
            <button className="btn w-full sm:w-auto">Rutas sugeridas 📍</button>
          </div>
          <div className="flex flex-col sm:flex-row sm:gap-4 gap-2 border-b border-gray-300 pb-2 w-full sm:w-auto mt-2 sm:mt-0">
            <button className="btn w-full sm:w-auto">Mis reservas 🗓️</button>
            <div className="flex items-center">
              <button className="btn w-full sm:w-auto">Mi perfil 👤</button>
              <button className="btn w-8 h-8 ml-2 text-sm flex items-center justify-center">
                ❌
              </button>
            </div>
          </div>
        </>
      )}
      {pathname === "/Dashboard" && (
        <>
          <div className="border-b border-gray-300 pb-2 flex flex-col sm:flex-row sm:gap-2 gap-1 w-full sm:w-auto mt-2 sm:mt-0">
            <button className="btn w-full sm:w-auto">Rentar 🚲</button>
            <button className="btn w-full sm:w-auto">Rutas sugeridas 📍</button>
          </div>
          <div className="flex flex-col sm:flex-row sm:gap-4 gap-2 border-b border-gray-300 pb-2 w-full sm:w-auto mt-2 sm:mt-0">
            <button className="btn w-full sm:w-auto">Mis reservas 🗓️</button>
            <div className="flex items-center">
              <button className="btn w-full sm:w-auto">Mi perfil 👤</button>
              <button className="btn w-8 h-8 ml-2 text-sm flex items-center justify-center">
                ❌
              </button>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
