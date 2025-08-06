// src/App.tsx
import { Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import PetsListPage from './pages/PetsListPage';
import PetDetailPage from './pages/PetDetailPage';
import AdoptionFormPage from './pages/AdoptionFormPage';
import PetCreatePage from './pages/PetCreatePage';
import PetEditPage from './pages/PetEditPage';
import RegisterPage from './pages/RegisterPage'; // <-- Importar
import LoginPage from './pages/LoginPage';     // <-- Importar

import './App.css';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigate to="/pets" replace />} />
        <Route path="/pets" element={<PetsListPage />} />
        <Route path="/pets/new" element={<PetCreatePage />} />
        <Route path="/pets/:id" element={<PetDetailPage />} />
        <Route path="/pets/:id/edit" element={<PetEditPage />} />
        <Route path="/adopt" element={<AdoptionFormPage />} />

        {/* --- AÑADIR ESTAS RUTAS --- */}
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* --------------------------- */}

        <Route path="*" element={<h2>Página no encontrada</h2>} />
      </Routes>
    </>
  );
}

export default App;