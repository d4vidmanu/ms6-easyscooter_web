import { useEffect } from 'react';
import ViajeForm from "../components/ViajeForm";
import MapComponent from "../components/MapComponent";

const Usuario = () => {
  return (
    <div className="flex gap-4 p-4 justify-center h-[calc(90vh-4rem)] items-stretch">
      {/* Primer bloque, ocupa 3/4 de la pantalla */}
      <div className="w-3/4 h-full mt-10 bg-grisclaro rounded-lg p-6  text-white">
        <MapComponent /> {/* Google Maps Component */}
      </div>

      {/* Segundo bloque, ocupa 1/4 de la pantalla */}
      <div className="h-full mt-10">
        <ViajeForm />
      </div>
    </div>
  );
};

export default Usuario;
