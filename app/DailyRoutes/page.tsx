import Header from '@/components/Header';
import MapComponent from '@/components/MapComponent';

export default function DailyRoutesPage() {
  return (
    <>
      <Header />
      <div className="flex">
        <div className="w-2/4 -ml-1"> {/* Contenido específico de la página */}</div>
        <div className="w-1/2 h-[500px] ml-auto mt-3">
          <MapComponent apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY} />
        </div>
      </div>
    </>
  );
}
