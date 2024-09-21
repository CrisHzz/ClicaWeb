import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-black bg-cover bg-center" 
         style={{ backgroundImage: "url('/404wallpaper.png')" }}>
      <h1 className="text-white text-4xl mt-4 ">Ops! Esta página no existe</h1>
      <Link href="/" className="text-white text-2xl mt-4 underline">
        Volver al inicio
      </Link>
    </div>
  );
}
