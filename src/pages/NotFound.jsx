import { Link } from 'react-router-dom';

export default function NotFound() {

  return (
    <div className="flex flex-col items-center justify-center h-auto bg-white">
      <h1 className="text-4xl font-bold text-gray-800">404 - Página no encontrada</h1>
      <p className="mt-2 text-lg text-gray-600">Lo sentimos, la página que buscas no existe.</p>
      
      <Link
        to="/"
        className="mt-6 rounded-md px-4 py-2 text-sm font-medium text-white bg-medio"
      >
        Regresar a Inicio
      </Link>
    </div>
  );
}
