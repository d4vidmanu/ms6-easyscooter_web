import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';

const ReviewForm = () => {
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState('Excelente');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Function to generate the current date in YYYY-MM-DD format
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const rideId = localStorage.getItem('ride_id');
    if (!rideId) {
      setError('No se encontró el ID del viaje.');
      return;
    }

    try {
      setLoading(true);
      await axios.post(`${API_BASE_URL}/usuario/${localStorage.getItem('user_id')}/resenas`, {
        rating,
        created_at: getCurrentDate(),
        ride_id: parseInt(rideId),
        description,
      });
      alert('Reseña enviada exitosamente');
      setLoading(false);
    } catch (err) {
      console.error('Error:', err.response?.data || err);
      setError('Ocurrió un error al enviar la reseña');
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Enviar Reseña</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="rating" className="block mb-2 text-sm font-medium text-white">
            Calificación (0-5)
          </label>
          <select id="rating" name="rating" value={rating} onChange={(e) => setRating(e.target.value)} className="w-full p-2 rounded text-black">
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>

        <div>
          <label htmlFor="description" className="block mb-2 text-sm font-medium text-white">
            Descripción
          </label>
          <select
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 rounded text-black"
          >
            <option value="Excelente">Excelente</option>
            <option value="Bien">Bien</option>
            <option value="Problemas">Problemas</option>
          </select>
        </div>

        <button
          type="submit"
          className={`w-full py-2 px-4 rounded ${loading ? 'bg-gray-500' : 'bg-medio hover:bg-oscuro'} text-white`}
          disabled={loading}
        >
          {loading ? 'Enviando...' : 'Enviar Reseña'}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;