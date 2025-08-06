// src/pages/PetCreatePage.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPet } from '../services/api';
import type { CreatePetDto } from '../services/api';

export default function PetCreatePage() {
  const navigate = useNavigate();

  // Campos obligatorios
  const [shelterId, setShelterId] = useState('');
  const [name, setName] = useState('');
  const [type, setType] = useState<CreatePetDto['type']>('dog');
  const [breed, setBreed] = useState('');
  const [size, setSize] = useState<CreatePetDto['size']>('small');
  const [age, setAge] = useState<CreatePetDto['age']>('puppy');
  const [description, setDescription] = useState('');

  // Campos opcionales
  const [imageUrl, setImageUrl] = useState('');
  const [imagesInput, setImagesInput] = useState('');
  const [color, setColor] = useState('');
  const [weight, setWeight] = useState('');
  const [healthNotes, setHealthNotes] = useState('');
  const [behaviorNotes, setBehaviorNotes] = useState('');
  const [specialNeedsInput, setSpecialNeedsInput] = useState('');
  const [isVaccinated, setIsVaccinated] = useState(false);
  const [isNeutered, setIsNeutered] = useState(false);
  const [isMicrochipped, setIsMicrochipped] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const images = imagesInput
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);
    const specialNeeds = specialNeedsInput
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    const payload: CreatePetDto = {
      name,
      type,
      breed,
      size,
      age,
      description,
      ...(imageUrl && { imageUrl }),
      ...(images.length > 0 && { images }),
      ...(color && { color }),
      ...(weight && { weight }),
      ...(healthNotes && { healthNotes }),
      ...(behaviorNotes && { behaviorNotes }),
      ...(specialNeeds.length > 0 && { specialNeeds }),
      ...(isVaccinated && { isVaccinated }),
      ...(isNeutered && { isNeutered }),
      ...(isMicrochipped && { isMicrochipped }),
    };

    createPet(shelterId, payload)
      .then(res => {
        const id = res.data.id;
        alert('Mascota creada con éxito');
        navigate(`/pets/${id}`);
      })
      .catch(err => {
        console.error('Error creando mascota:', err);
        alert('Hubo un error al crear la mascota');
      });
  };

  // Estilos comunes para inputs
  const inputStyle = { background: '#fff', color: 'var(--color-text)' };

  return (
    <div className="card" style={{ maxWidth: 700, margin: '2rem auto', padding: '2rem', background: '#fff' }}>
      <h2 style={{ color: 'var(--color-primary)', marginBottom: '1rem' }}>Crear Mascota</h2>
      <form onSubmit={handleSubmit}>
        {/* Obligatorios */}
        <label>Refugio ID</label>
        <input
          className="input-field"
          style={inputStyle}
          value={shelterId}
          onChange={e => setShelterId(e.target.value)}
          placeholder="UUID del refugio"
          required
        />
        <label>Nombre</label>
        <input
          className="input-field"
          style={inputStyle}
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Nombre de la mascota"
          required
        />
        <label>Tipo</label>
        <select
          className="input-field"
          style={inputStyle}
          value={type}
          onChange={e => setType(e.target.value as any)}
        >
          <option value="dog">Perro</option>
          <option value="cat">Gato</option>
          <option value="bird">Pájaro</option>
          <option value="rabbit">Conejo</option>
          <option value="hamster">Hámster</option>
          <option value="other">Otro</option>
        </select>
        <label>Raza</label>
        <input
          className="input-field"
          style={inputStyle}
          value={breed}
          onChange={e => setBreed(e.target.value)}
          placeholder="Raza"
          required
        />
        <label>Tamaño</label>
        <select
          className="input-field"
          style={inputStyle}
          value={size}
          onChange={e => setSize(e.target.value as any)}
        >
          <option value="small">Pequeño</option>
          <option value="medium">Mediano</option>
          <option value="large">Grande</option>
        </select>
        <label>Edad</label>
        <select
          className="input-field"
          style={inputStyle}
          value={age}
          onChange={e => setAge(e.target.value as any)}
        >
          <option value="puppy">Cachorro</option>
          <option value="young">Joven</option>
          <option value="adult">Adulto</option>
          <option value="senior">Senior</option>
        </select>
        <label>Descripción</label>
        <textarea
          className="input-field"
          style={inputStyle}
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Descripción de la mascota"
          required
        />

        {/* Opcionales */}
        <hr style={{ margin: '1.5rem 0' }} />
        <h3 style={{ marginBottom: '1rem' }}>Datos Opcionales</h3>
        <label>Imagen principal (URL)</label>
        <input
          className="input-field"
          style={inputStyle}
          value={imageUrl}
          onChange={e => setImageUrl(e.target.value)}
          placeholder="https://example.com/imagen.jpg"
        />
        <label>Otras imágenes (URLs, separadas por coma)</label>
        <input
          className="input-field"
          style={inputStyle}
          value={imagesInput}
          onChange={e => setImagesInput(e.target.value)}
          placeholder="url1, url2, url3"
        />
        <label>Color</label>
        <input
          className="input-field"
          style={inputStyle}
          value={color}
          onChange={e => setColor(e.target.value)}
          placeholder="Color predominante"
        />
        <label>Peso</label>
        <input
          className="input-field"
          style={inputStyle}
          value={weight}
          onChange={e => setWeight(e.target.value)}
          placeholder="Ej: 5kg"
        />
        <label>Notas de salud</label>
        <textarea
          className="input-field"
          style={inputStyle}
          value={healthNotes}
          onChange={e => setHealthNotes(e.target.value)}
          placeholder="Notas sobre salud"
        />
        <label>Notas de comportamiento</label>
        <textarea
          className="input-field"
          style={inputStyle}
          value={behaviorNotes}
          onChange={e => setBehaviorNotes(e.target.value)}
          placeholder="Notas de comportamiento"
        />
        <label>Necesidades especiales (separadas por coma)</label>
        <input
          className="input-field"
          style={inputStyle}
          value={specialNeedsInput}
          onChange={e => setSpecialNeedsInput(e.target.value)}
          placeholder="necesidad1, necesidad2"
        />
        <fieldset style={{
          margin: '1.5rem 0',
          padding: '1rem',
          border: '1px solid #ccc',
          borderRadius: 'var(--radius)',
          background: '#fafafa'
        }}>
          <legend>Opciones</legend>
          <label style={{ display: 'block', margin: '0.5rem 0' }}>
            <input type="checkbox" checked={isVaccinated} onChange={e => setIsVaccinated(e.target.checked)} /> Vacunado
          </label>
          <label style={{ display: 'block', margin: '0.5rem 0' }}>
            <input type="checkbox" checked={isNeutered} onChange={e => setIsNeutered(e.target.checked)} /> Esterilizado
          </label>
          <label style={{ display: 'block', margin: '0.5rem 0' }}>
            <input type="checkbox" checked={isMicrochipped} onChange={e => setIsMicrochipped(e.target.checked)} /> Microchip
          </label>
        </fieldset>
        <button type="submit" className="btn">Crear Mascota</button>
      </form>
    </div>
  );
}
