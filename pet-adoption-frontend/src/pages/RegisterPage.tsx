// src/pages/RegisterPage.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/api';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'user', // Por defecto, el rol es 'user'
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    register(formData)
      .then(() => {
        alert('¡Registro exitoso! Por favor, inicia sesión.');
        navigate('/login');
      })
      .catch(err => {
        console.error('Error en el registro:', err);
        setError('No se pudo completar el registro. Inténtalo de nuevo.');
      });
  };

  return (
    <div className="card" style={{ maxWidth: 500, margin: '2rem auto', padding: '2rem' }}>
      <h2>Registro de Usuario</h2>
      <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
        <label>Nombre</label>
        <input name="firstName" type="text" onChange={handleChange} required />

        <label>Apellido</label>
        <input name="lastName" type="text" onChange={handleChange} required />

        <label>Email</label>
        <input name="email" type="email" onChange={handleChange} required />

        <label>Contraseña</label>
        <input name="password" type="password" onChange={handleChange} required minLength={6} />

        <label>Quiero registrarme como</label>
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="user">Usuario que quiere adoptar</option>
          <option value="shelter">Refugio que da en adopción</option>
        </select>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button type="submit" className="btn" style={{ marginTop: '1rem', width: '100%' }}>
          Registrarse
        </button>
      </form>
    </div>
  );
}