import React, { useState } from 'react';
import PropTypes from 'prop-types'; // Importamos PropTypes para la validación de props
import axios from 'axios';
import { API_BASE_URL } from '../config'; // Asegúrate de que la ruta sea correcta

const AuthForm = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true); // Estado para alternar entre login y register
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); // Solo para el registro
  const [confirmPassword, setConfirmPassword] = useState(''); // Solo para el registro
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Limpiar error previo

    try {
      if (isLogin) {
        // Proceso de Login
        const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
        
        // La API devuelve `id` en lugar de `user_id`
        const { id } = response.data;
        
        if (id) {
          alert('Login exitoso');
          
          // Guardar el id en localStorage como user_id
          localStorage.setItem('user_id', id);
          
          // Cerrar el formulario al ser exitoso
          onClose();
        } else {
          setError('No se recibió el ID de usuario.');
        }
      } else {
        // Proceso de Register
        if (password !== confirmPassword) {
          setError('Las contraseñas no coinciden');
          return;
        }
        const response = await axios.post(`${API_BASE_URL}/register`, { name, email, password });
        
        // La API devuelve `id` en lugar de `user_id`
        const { id } = response.data;
        
        if (id) {
          alert('Registro exitoso');
          
          // Guardar el id en localStorage como user_id
          localStorage.setItem('user_id', id);
          
          // Cerrar el formulario al ser exitoso
          onClose();
        } else {
          setError('No se recibió el ID de usuario.');
        }
      }
    } catch (error) {
      console.error(error);
      setError('Ocurrió un error, por favor intenta de nuevo.');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative w-full max-w-md bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700 p-6">
        {/* Botón de cierre */}
        <button
          onClick={onClose} // Llamamos a onClose para cerrar el formulario
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          ✕
        </button>

        {/* Logo */}
        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img className="w-8 h-8 mr-2" src="src/assets/logo.png" alt="logo" />
          EasyScooter
        </a>

        {/* Título */}
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white mb-4">
          {isLogin ? 'Inicia sesión' : 'Crea una cuenta'}
        </h1>

        {/* Formulario */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {!isLogin && (
            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Tu nombre
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="Nombre completo"
                required={!isLogin}
              />
            </div>
          )}

          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Tu email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              placeholder="name@company.com"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              required
            />
          </div>

          {!isLogin && (
            <div>
              <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Confirmar contraseña
              </label>
              <input
                type="password"
                id="confirm-password"
                name="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                required
              />
            </div>
          )}

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full text-white bg-medio hover:bg-claro focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            {isLogin ? 'Iniciar sesión' : 'Crear una cuenta'}
          </button>

          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes una cuenta?'}{' '}
            <a
              href="#"
              onClick={() => setIsLogin(!isLogin)} // Alterna entre Login y Register
              className="font-medium text-oscuro hover:underline dark:text-blue-500"
            >
              {isLogin ? 'Regístrate aquí' : 'Inicia sesión aquí'}
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

// Agregamos la validación de props usando PropTypes
AuthForm.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default AuthForm;
