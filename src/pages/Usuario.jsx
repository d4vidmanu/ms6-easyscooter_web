import { useEffect } from 'react';
import ViajeForm from "../components/ViajeForm";
import MapComponent from "../components/MapComponent";
import ReviewForm from '../components/ReviewForm';

const Usuario = () => {
  return (
    <div className="flex flex-col gap-4 p-4 justify-center h-[calc(90vh-4rem)] items-stretch">
      <div className="flex gap-4 w-full h-full">
        {/* Primer bloque, ocupa 3/4 de la pantalla */}
        <div className="w-3/4 h-full mt-10 bg-grisclaro rounded-lg p-6 text-white">
          <MapComponent /> {/* Google Maps Component */}
        </div>

        {/* Segundo bloque, ocupa 1/4 de la pantalla */}
        <div className="h-full mt-10 w-1/4 flex flex-col gap-4">
          {/* Primer sub-bloque dentro del segundo bloque */}
          <div className="bg-claro rounded-lg p-6 text-white">
            <ViajeForm />
          </div>

          {/* Segundo sub-bloque dentro del segundo bloque */}
          <div className="bg-oscuro rounded-lg p-6 text-white">
            <ReviewForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Usuario;