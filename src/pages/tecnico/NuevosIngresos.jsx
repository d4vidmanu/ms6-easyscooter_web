import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../config'; // Asegúrate de que la ruta sea correcta
import ScootersMantenimiento from '../../components/ScootersMantenimiento'; // Cambiamos a ScootersMantenimiento

const NuevosIngresos = () => {
  const [mantenimientos, setMantenimientos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Variable para el endpoint completo
  const API_URL = `${API_BASE_URL}/mantenimientos/pendientes`;

  useEffect(() => {
    const fetchMantenimientos = async () => {
      try {
        const response = await axios.get(API_URL);
        setMantenimientos(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error al hacer la petición:', err);
        setError('Error al obtener los mantenimientos');
        setLoading(false);
      }
    };
  
    fetchMantenimientos();
  }, [API_URL]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto my-8 p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Nuevos Ingresos</h1>
      <ScootersMantenimiento mantenimientos={mantenimientos} />
    </div>
  );
};

export default NuevosIngresos;
