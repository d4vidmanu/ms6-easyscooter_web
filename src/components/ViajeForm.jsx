import { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config"; // Asegúrate de que la ruta sea correcta

const ViajeForm = () => {
  const [scooterId, setScooterId] = useState("");
  const [rideId, setRideId] = useState(null); // Almacenamos el ride_id después de iniciar el viaje
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null); // Almacenamos el user_id

  // Obtener el user_id almacenado después del login
  useEffect(() => {
    const storedUserId = localStorage.getItem("user_id");
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      setError("No se encontró el ID del usuario. Por favor, inicia sesión.");
    }
  }, []);

  const iniciarViaje = async () => {
    setError(null); // Eliminar el error antes de la solicitud
    try {
      setLoading(true);

      // Verificamos si los valores son válidos antes de la solicitud
      if (!scooterId || !userId) {
        setError("Faltan datos para iniciar el viaje");
        setLoading(false);
        return;
      }

      // Mostrar qué datos estamos enviando
      console.log("Datos enviados:", {
        scooter_id: scooterId,
        user_id: userId,
      });

      const response = await axios.post(`${API_BASE_URL}/iniciar_viaje`, {
        scooter_id: parseInt(scooterId), // Aseguramos que sea un número
        user_id: parseInt(userId), // Aseguramos que sea un número
      });

      alert("Viaje iniciado exitosamente");
      setRideId(response.data.ride.ride_id); // Guardamos el ride_id
      setLoading(false);
    } catch (err) {
      console.error("Error:", err.response?.data || err);
      setError("Ocurrió un error al iniciar el viaje");
      setLoading(false);
    }
  };

  const terminarViaje = async () => {
    setError(null); // Eliminar el error antes de la solicitud
    const confirmacion = window.confirm(
      "¿Estás seguro de que quieres terminar el viaje?"
    );
    if (confirmacion) {
      try {
        setLoading(true);
        await axios.put(`${API_BASE_URL}/terminar_viaje/${rideId}`);
        alert("Viaje terminado exitosamente");
        setRideId(null); // Reiniciamos el estado del viaje
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Ocurrió un error al terminar el viaje");
        setLoading(false);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rideId) {
      terminarViaje(); // Si ya hay un ride_id, termina el viaje
    } else {
      iniciarViaje(); // Si no hay ride_id, inicia el viaje
    }
  };

  return (
    <div className="bg-claro rounded-lg p-6 text-white">
      <h2 className="text-2xl font-bold mb-4">
        {rideId ? "Terminar Viaje" : "Iniciar Viaje"}
      </h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        {!rideId && (
          <>
            <div className="mb-4">
              <label
                htmlFor="scooterId"
                className="block mb-2 text-sm font-medium"
              >
                ID del Scooter
              </label>
              <input
                type="number"
                id="scooterId"
                value={scooterId}
                onChange={(e) => setScooterId(e.target.value)}
                className="w-full p-2 rounded text-black"
                required
              />
            </div>
          </>
        )}
        <button
          type="submit"
          className={`w-full py-2 px-4 rounded ${
            loading ? "bg-gray-500" : "bg-medio hover:bg-oscuro"
          } text-white`}
          disabled={loading}
        >
          {loading
            ? "Procesando..."
            : rideId
            ? "Terminar Viaje"
            : "Iniciar Viaje"}
        </button>
      </form>
    </div>
  );
};

export default ViajeForm;
