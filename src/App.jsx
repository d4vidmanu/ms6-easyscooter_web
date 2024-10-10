import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Usuario from './pages/Usuario';
import NuevosIngresos from './pages/tecnico/NuevosIngresos';
import NotFound from './pages/NotFound';
import NavbarDefault from "./components/NavbarDefault";
import ScootersReparacion from './pages/tecnico/ScootersReparacion';

const App = () => {
  return (
      <Router>
          <NavbarDefault />
          <Routes>
              <Route path="/" element={<Usuario />} />
              <Route path="/tecnico/nuevos-ingresos" element={<NuevosIngresos />} />
              <Route path="/tecnico/scooters-en-reparacion" element={<ScootersReparacion />} />
              <Route path="*" element={<NotFound />} />
          </Routes>
      </Router>
  );
};

export default App;