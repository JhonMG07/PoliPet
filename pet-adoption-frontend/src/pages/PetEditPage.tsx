// src/pages/PetEditPage.tsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPet, updatePet } from '../services/api';
import type { UpdatePetDto } from '../services/api';

export default function PetEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Estados para los campos obligatorios
  const [name, setName] = useState('');
  const [type, setType] = useState<UpdatePetDto['type']>('dog');
  const [breed, setBreed] = useState('');
  const [size, setSize] = useState<UpdatePetDto['size']>('small');
  const [age, setAge] = useState<UpdatePetDto['age']>('puppy');
  const [description, setDescription] = useState('');

  // Estados para campos opcionales
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

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    getPet(id)
      .then(res => {
        const pet = res.data as unknown as Required<Pick<UpdatePetDto, 
          'name'|'type'|'breed'|'size'|'age'|'description'
        >> & Partial<Pick<UpdatePetDto, 
          'imageUrl'|'images'|'color'|'weight'|'healthNotes'|'behaviorNotes'|'specialNeeds'|'isVaccinated'|'isNeutered'|'isMicrochipped'
        >>;
        // Campos obligatorios
        setName(pet.name);
        setType(pet.type);
        setBreed(pet.breed);
        setSize(pet.size);
        setAge(pet.age);
        setDescription(pet.description);
        // Opcionales
        setImageUrl(pet.imageUrl || '');
        setImagesInput(pet.images?.join(',') || '');
        setColor(pet.color || '');
        setWeight(pet.weight || '');
        setHealthNotes(pet.healthNotes || '');
        setBehaviorNotes(pet.behaviorNotes || '');
        setSpecialNeedsInput(pet.specialNeeds?.join(',') || '');
        setIsVaccinated(Boolean(pet.isVaccinated));
        setIsNeutered(Boolean(pet.isNeutered));
        setIsMicrochipped(Boolean(pet.isMicrochipped));
      })
      .catch(err => console.error('Error cargando mascota:', err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Cargando datos de la mascota…</p>;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    // Convertir inputs en arrays
    const images = imagesInput.split(',').map(s => s.trim()).filter(Boolean);
    const specialNeeds = specialNeedsInput.split(',').map(s => s.trim()).filter(Boolean);

    const payload: UpdatePetDto = {
      name,
      type,
      breed,
      size,
      age,
      description,
      ...(imageUrl && { imageUrl }),
      ...(images.length && { images }),
      ...(color && { color }),
      ...(weight && { weight }),
      ...(healthNotes && { healthNotes }),
      ...(behaviorNotes && { behaviorNotes }),
      ...(specialNeeds.length && { specialNeeds }),
      isVaccinated,
      isNeutered,
      isMicrochipped,
    };

    updatePet(id, payload)
      .then(() => {
        alert('Mascota actualizada con éxito');
        navigate(`/pets/${id}`);
      })
      .catch(err => {
        console.error('Error actualizando mascota:', err);
        alert('Hubo un error al actualizar');
      });
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Editar mascota</h2>
      <form onSubmit={handleSubmit}>
        {/* Obligatorios */}
        <div><label>Nombre:</label>
          <input value={name} onChange={e => setName(e.target.value)} required />
        </div>
        <div><label>Tipo:</label>
          <select value={type} onChange={e => setType(e.target.value as any)}>
            <option value="dog">Perro</option>
            <option value="cat">Gato</option>
            <option value="bird">Pájaro</option>
            <option value="rabbit">Conejo</option>
            <option value="hamster">Hámster</option>
            <option value="other">Otro</option>
          </select>
        </div>
        <div><label>Raza:</label>
          <input value={breed} onChange={e => setBreed(e.target.value)} required />
        </div>
        <div><label>Tamaño:</label>
          <select value={size} onChange={e => setSize(e.target.value as any)}>
            <option value="small">Pequeño</option>
            <option value="medium">Mediano</option>
            <option value="large">Grande</option>
          </select>
        </div>
        <div><label>Edad:</label>
          <select value={age} onChange={e => setAge(e.target.value as any)}>
            <option value="puppy">Cachorro</option>
            <option value="young">Joven</option>
            <option value="adult">Adulto</option>
            <option value="senior">Senior</option>
          </select>
        </div>
        <div><label>Descripción:</label>
          <textarea value={description} onChange={e => setDescription(e.target.value)} required />
        </div>

        {/* Opcionales */}
        <hr />
        <h3>Campos opcionales</h3>
        <div><label>Imagen principal:</label>
          <input value={imageUrl} onChange={e => setImageUrl(e.target.value)} placeholder="https://..." />
        </div>
        <div><label>Otras imágenes (URLs, separadas por coma):</label>
          <input value={imagesInput} onChange={e => setImagesInput(e.target.value)} placeholder="url1,url2" />
        </div>
        <div><label>Color:</label>
          <input value={color} onChange={e => setColor(e.target.value)} />
        </div>
        <div><label>Peso:</label>
          <input value={weight} onChange={e => setWeight(e.target.value)} placeholder="Ej: 5kg" />
        </div>
        <div><label>Notas de salud:</label>
          <textarea value={healthNotes} onChange={e => setHealthNotes(e.target.value)} />
        </div>
        <div><label>Notas de comportamiento:</label>
          <textarea value={behaviorNotes} onChange={e => setBehaviorNotes(e.target.value)} />
        </div>
        <div><label>Necesidades especiales (separadas por coma):</label>
          <input value={specialNeedsInput} onChange={e => setSpecialNeedsInput(e.target.value)} />
        </div>
        <fieldset style={{ marginTop: '1rem' }}>
          <legend>Opciones</legend>
          <label><input type="checkbox" checked={isVaccinated} onChange={e => setIsVaccinated(e.target.checked)} /> Vacunado</label>
          <label style={{ marginLeft: '1rem' }}><input type="checkbox" checked={isNeutered} onChange={e => setIsNeutered(e.target.checked)} /> Esterilizado</label>
          <label style={{ marginLeft: '1rem' }}><input type="checkbox" checked={isMicrochipped} onChange={e => setIsMicrochipped(e.target.checked)} /> Microchip</label>
        </fieldset>

        <button type="submit" style={{ marginTop: '1rem' }}>Guardar cambios</button>
      </form>
    </div>
  );
}
