// src/pages/AdoptionFormPage.tsx
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { adoptPet } from '../services/api';

export default function AdoptionFormPage() {
  const navigate = useNavigate();
  const { state } = useLocation() as { state: { petId?: string } };

  const [adopterId, setAdopterId] = useState('');
  const petId = state?.petId || '';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Llamamos a la función con dos argumentos: el ID del adoptante y un objeto con el ID de la mascota
    adoptPet(adopterId, { petId })
      .then(() => {
        alert('Solicitud enviada con éxito');
        navigate('/pets');
      })
      .catch(err => {
        console.error(err);
        alert('Hubo un error enviando la solicitud');
      });
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Formulario de Adopción</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Pet ID:</label>
          <input value={petId} readOnly />
        </div>
        <div style={{ marginTop: '0.5rem' }}>
          <label>Your User ID:</label>
          <input
            value={adopterId}
            onChange={e => setAdopterId(e.target.value)}
            required
          />
        </div>
        <button type="submit" style={{ marginTop: '1rem' }}>
          Enviar Solicitud
        </button>
      </form>
    </div>
  );
}
