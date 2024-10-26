"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import LogoutButton from "@/components/Logout";

export default function Header() {
  const pathname = usePathname();

  const logoLink = ["/Dashboard", "/user", "/DailyRoutes", "/bookings"].includes(pathname) ? "/Dashboard" : "/home";

  return (
    <header className="bg-white h-auto sm:h-[88px] w-full bg-no-repeat bg-center flex flex-col sm:flex-row items-center justify-between px-4 shadow-md">
      <div className="flex items-center border-b border-gray-300 pb-2 w-full sm:w-auto">
        <img
          src="/logo.png"
          className="h-16 sm:h-20" // Ajuste del tamaño de la imagen en dispositivos pequeños
          alt="Logo"
        />
        <Link href={logoLink}>
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
      {["/DailyRoutes", "/Dashboard", "/user", "/bookings","/community"].includes(pathname) && (
        <>
          <div className="border-b border-gray-300 pb-2 flex flex-col sm:flex-row sm:gap-2 gap-1 w-full sm:w-auto mt-2 sm:mt-0">
            <a href="/Dashboard">
            <button className="btn w-full sm:w-auto">Rentar 🚲</button>
            </a>
            <a href="/DailyRoutes">
              <button className="btn w-full sm:w-auto">
                Rutas sugeridas 📍
              </button>
            </a>
            <a href="/community">
              <button className="btn w-full sm:w-auto">
                Comunidades 🤝
              </button>
            </a>
          </div>
          <div className="flex flex-col sm:flex-row sm:gap-4 gap-2 border-b border-gray-300 pb-2 w-full sm:w-auto mt-2 sm:mt-0">
            <a href="/bookings">
              <button className="btn w-full sm:w-auto">Mis reservas 🗓️</button>
            </a>
            <div className="flex items-center">
              <a href="/user">
                <button className="btn w-full sm:w-auto">Mi perfil 👤</button>
              </a>
              <LogoutButton />
            </div>
          </div>
        </>
      )}
    </header>
  );
}
