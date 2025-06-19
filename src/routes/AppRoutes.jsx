import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/Perguntas';
import Detalhes from '../pages/Detalhes';
import Favoritos from '../pages/Favoritos'; // certifique-se que este caminho está certo

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/detalhes/:name" element={<Detalhes />} />
      <Route path="/favoritos" element={<Favoritos />} />
    </Routes>
  );
}

export default AppRoutes;
