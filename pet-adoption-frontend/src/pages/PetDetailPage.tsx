// src/pages/PetDetailPage.tsx
import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getPet, deletePet } from '../services/api';

interface Pet {
  id: string;
  name: string;
  type: 'dog' | 'cat' | 'bird' | 'rabbit' | 'hamster' | 'other';
  breed: string;
  size: 'small' | 'medium' | 'large';
  age: 'puppy' | 'young' | 'adult' | 'senior';
  description: string;
  imageUrl?: string;
  images?: string[];
  color?: string;
  weight?: string;
  healthNotes?: string;
  behaviorNotes?: string;
  specialNeeds?: string[];
  isVaccinated?: boolean;
  isNeutered?: boolean;
  isMicrochipped?: boolean;
}

export default function PetDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [pet, setPet] = useState<Pet | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    getPet(id)
      .then(res => setPet(res.data))
      .catch(err => console.error('Error cargando mascota:', err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Cargando detalles…</p>;
  if (!pet) return <p>Mascota no encontrada.</p>;

  return (
    <div style={{ padding: '1rem' }}>
      <h2>{pet.name}</h2>
      {pet.imageUrl && (
        <img src={pet.imageUrl} alt={pet.name} style={{ maxWidth: '300px' }} />
      )}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li><strong>Tipo:</strong> {pet.type}</li>
        <li><strong>Raza:</strong> {pet.breed}</li>
        <li><strong>Tamaño:</strong> {pet.size}</li>
        <li><strong>Edad:</strong> {pet.age}</li>
        <li><strong>Color:</strong> {pet.color ?? '—'}</li>
        <li><strong>Peso:</strong> {pet.weight ?? '—'}</li>
        <li><strong>Vacunado:</strong> {pet.isVaccinated ? 'Sí' : 'No'}</li>
        <li><strong>Esterilizado:</strong> {pet.isNeutered ? 'Sí' : 'No'}</li>
        <li><strong>Microchip:</strong> {pet.isMicrochipped ? 'Sí' : 'No'}</li>
        <li><strong>Notas de salud:</strong> {pet.healthNotes ?? '—'}</li>
        <li><strong>Notas de comportamiento:</strong> {pet.behaviorNotes ?? '—'}</li>
        <li>
          <strong>Necesidades especiales:</strong>{' '}
          {pet.specialNeeds?.length ? pet.specialNeeds.join(', ') : '—'}
        </li>
      </ul>
      <h3>Descripción</h3>
      <p>{pet.description}</p>

      <div style={{ marginTop: '1rem' }}>
        <Link to="/adopt" state={{ petId: pet.id }}>
          <button>Solicitar adopción</button>
        </Link>
      </div>

      <div style={{ marginTop: '1rem' }}>
        <Link to={`/pets/${pet.id}/edit`}>           
          <button style={{ marginRight: '0.5rem' }}>✏️ Editar</button>
        </Link>
        <button
          onClick={() => {
            if (confirm('¿Seguro que quieres eliminar esta mascota?')) {
              deletePet(pet.id)
                .then(() => {
                  alert('Mascota eliminada');
                  navigate('/pets');
                })
                .catch(err => {
                  console.error('Error eliminando mascota:', err);
                  alert('Error eliminando mascota');
                });
            }
          }}
        >
          🗑️ Eliminar
        </button>
      </div>
    </div>
  );
}

