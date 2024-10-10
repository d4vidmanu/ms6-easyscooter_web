import ViajeForm from "../components/ViajeForm";

const Usuario = () => {
  return (
    <div className="flex gap-4 p-4 justify-center">
      {/* Primer bloque, ocupa 3/4 de la pantalla */}
      <div className="w-3/4 bg-blue-500 rounded-lg p-6 text-white">
        <h2 className="text-2xl font-bold mb-4">Bloque Principal</h2>
        <p>Contenido principal de la página de usuario.</p>
      </div>

      {/* Segundo bloque, ocupa 1/4 de la pantalla */}
      <ViajeForm />
    </div>
  );
};

export default Usuario;
