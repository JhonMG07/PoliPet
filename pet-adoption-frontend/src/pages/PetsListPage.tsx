// src/pages/PetsListPage.tsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPets } from '../services/api';

interface Pet {
  id: string;
  name: string;
  type: string;
  species?: string;
  age: number;
}

export default function PetsListPage() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPets()
      .then(res => setPets(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Cargando mascotas…</p>;
  if (pets.length === 0) return <p>No hay mascotas disponibles.</p>;

  return (
    <div className="card" style={{ padding: '1rem' }}>
      <h2>Lista de Mascotas</h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '1rem',
          marginTop: '1rem',
        }}
      >
        {pets.map(pet => (
          <div key={pet.id} className="card">
            <h3 style={{ marginBottom: '0.5rem' }}>{pet.name}</h3>
            <p>Tipo: {pet.type}</p>
            <p>Edad: {pet.age} años</p>
            <div style={{ marginTop: '0.75rem' }}>
              <Link to={`/pets/${pet.id}`} className="btn">
                Ver detalle
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
