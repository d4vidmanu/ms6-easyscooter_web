import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config'; // Importa la variable

const ScootersMantenimiento = () => {
  const [mantenimientos, setMantenimientos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sorted, setSorted] = useState(false);

  const API_URL = `${API_BASE_URL}/mantenimientos/pendientes`;

  // Definir la función fetchMantenimientos usando useCallback para evitar advertencias
  const fetchMantenimientos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(API_URL);
      setMantenimientos(response.data);
    } catch {
      setError('Error al obtener los mantenimientos');
    } finally {
      setLoading(false);
    }
  }, [API_URL]); // Ahora está memorizado y no cambiará a menos que API_URL cambie

  useEffect(() => {
    fetchMantenimientos();
  }, [fetchMantenimientos]); // Agregamos fetchMantenimientos como dependencia

  const sortByDate = () => {
    const sortedData = [...mantenimientos].sort((a, b) => {
      return sorted
        ? new Date(a.enter_date) - new Date(b.enter_date) // Ascendente
        : new Date(b.enter_date) - new Date(a.enter_date); // Descendente
    });
    setMantenimientos(sortedData);
    setSorted(!sorted);
  };

  const handleAssign = async (mantenimientoId) => {
    const technicianId = window.prompt('¿A quién quieres asignar este scooter? (Ingresa el ID del técnico)');

    if (!technicianId) {
      alert('Por favor, ingresa un ID de técnico válido.');
      return;
    }

    const patchUrl = `${API_BASE_URL}/mantenimientos/${mantenimientoId}/status-tecnico`;

    try {
      await axios.patch(patchUrl, {
        status: 'IN_PROGRESS',
        tecnicoId: technicianId,
      });

      alert(`El mantenimiento ha sido asignado al técnico con ID: ${technicianId}`);
      
      // Vuelve a hacer el fetch de mantenimientos después de asignar un técnico
      fetchMantenimientos();

    } catch (error) {
      console.error('Error al asignar el scooter:', error);
      alert('Hubo un error al asignar el scooter.');
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">Scooter ID</th>
            <th scope="col" className="px-6 py-3">Estado</th>
            <th scope="col" className="px-6 py-3">
              <div className="flex items-center justify-center">
                Fecha de entrada
                <button onClick={sortByDate} className="ms-1.5">
                  <svg
                    className={`w-3 h-3 ${sorted ? 'rotate-180' : ''} transition-transform`}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                  </svg>
                </button>
              </div>
            </th>
            <th scope="col" className="px-6 py-3">Acción</th>
          </tr>
        </thead>
        <tbody>
          {mantenimientos.length > 0 ? (
            mantenimientos.map((mantenimiento) => (
              <tr
                key={mantenimiento.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-4">{mantenimiento.scooter_id}</td>
                <td className="px-6 py-4">{mantenimiento.status}</td>
                <td className="px-6 py-4">{new Date(mantenimiento.enter_date).toLocaleString()}</td>
                <td className="px-6 py-4 flex justify-center">
                  <button
                    onClick={() => handleAssign(mantenimiento.id)}
                    className="font-medium text-medio dark:text-oscuro hover:underline"
                  >
                    Asignar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="px-6 py-4 text-center">
                No hay mantenimientos pendientes
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ScootersMantenimiento;
