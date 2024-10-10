import { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../config'; // Asegúrate de que la ruta sea correcta

const ScootersReparacion = () => {
  const [technicianId, setTechnicianId] = useState('');
  const [mantenimientos, setMantenimientos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sortedByStateAsc, setSortedByStateAsc] = useState(true); // Estado de sort por ascendente/descendente

  const API_URL = `${API_BASE_URL}/mantenimientos/tecnico/${technicianId}`;

  const handleInputChange = (e) => {
    setTechnicianId(e.target.value);
  };

  const fetchMantenimientos = async () => {
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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchMantenimientos();
  };

  const handleFix = async (mantenimientoId) => {
    const confirmFix = window.confirm('¿Estás seguro de que quieres marcar este scooter como "COMPLETED"?');

    if (!confirmFix) return;

    const patchUrl = `${API_BASE_URL}/mantenimientos/${mantenimientoId}/status-tecnico`;

    try {
      await axios.patch(patchUrl, {
        status: 'COMPLETED',
        tecnicoId: technicianId,
      });

      // Actualizar la lista de mantenimientos después del patch
      setMantenimientos((prevMantenimientos) =>
        prevMantenimientos.map((mantenimiento) =>
          mantenimiento.id === mantenimientoId
            ? { ...mantenimiento, status: 'COMPLETED' }
            : mantenimiento
        )
      );

      alert('El mantenimiento ha sido marcado como COMPLETED.');
    } catch (error) {
      console.error('Error al actualizar el mantenimiento:', error);
      alert('Hubo un error al actualizar el mantenimiento.');
    }
  };

  const sortByState = () => {
    const sortedData = [...mantenimientos].sort((a, b) => {
      const stateOrder = { IN_PROGRESS: 1, PENDING: 2, COMPLETED: 3 };

      if (sortedByStateAsc) {
        return stateOrder[a.status] - stateOrder[b.status];
      } else {
        return stateOrder[b.status] - stateOrder[a.status];
      }
    });

    setMantenimientos(sortedData);
    setSortedByStateAsc(!sortedByStateAsc); // Alternamos el orden ascendente/descendente
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Scooters en Reparación</h1>
      <form onSubmit={handleSubmit} className="mb-6">
        <label htmlFor="technicianId" className="block text-sm font-medium text-gray-700">
          Ingresa tu ID de Técnico:
        </label>
        <input
          type="text"
          id="technicianId"
          value={technicianId}
          onChange={handleInputChange}
          className="mt-2 p-2 border border-gray-300 rounded-md w-full"
          placeholder="ID del técnico"
          required
        />
        <button
          type="submit"
          className="mt-4 bg-medio text-white px-4 py-2 rounded-md hover:bg-claro transition"
        >
          Buscar
        </button>
      </form>

      {loading && <div>Cargando...</div>}
      {error && <div>{error}</div>}

      {mantenimientos.length > 0 && !loading && (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">Scooter ID</th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center justify-center">
                    Estado
                    <button onClick={sortByState} className="ms-1.5">
                      <svg
                        className={`w-3 h-3 ${sortedByStateAsc ? '' : 'rotate-180'} transition-transform`}
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
                <th scope="col" className="px-6 py-3">Fecha de entrada</th>
                <th scope="col" className="px-6 py-3">Acción</th>
              </tr>
            </thead>
            <tbody>
              {mantenimientos.map((mantenimiento) => (
                <tr
                  key={mantenimiento.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-6 py-4">{mantenimiento.scooter_id}</td>
                  <td className="px-6 py-4">{mantenimiento.status}</td>
                  <td className="px-6 py-4">
                    {new Date(mantenimiento.enter_date).toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    {mantenimiento.status !== 'COMPLETED' && (
                      <button
                        onClick={() => handleFix(mantenimiento.id)}
                        className="text-medio hover:underline"
                      >
                        Arreglar
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && mantenimientos.length === 0 && !error && (
        <p>No hay scooters en reparación</p>
      )}
    </div>
  );
};

export default ScootersReparacion;
