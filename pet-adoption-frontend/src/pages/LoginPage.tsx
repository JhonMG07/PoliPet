// src/pages/LoginPage.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Importamos tanto la función 'login' como la instancia 'api'
import { login, api } from '../services/api';

export default function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    login(formData)
      .then(res => {
        const { access_token } = res.data;
        localStorage.setItem('access_token', access_token);
        // Actualizamos la instancia de axios importada
        api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
        alert('¡Inicio de sesión exitoso!');
        navigate('/pets');
      })
      .catch(err => {
        console.error('Error en el login:', err);
        setError('Email o contraseña incorrectos.');
      });
  };

  // Ya no necesitamos la línea 'require' aquí

  return (
    <div className="card" style={{ maxWidth: 500, margin: '2rem auto', padding: '2rem' }}>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
        <label>Email</label>
        <input name="email" type="email" onChange={handleChange} required />

        <label>Contraseña</label>
        <input name="password" type="password" onChange={handleChange} required />

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button type="submit" className="btn" style={{ marginTop: '1rem', width: '100%' }}>
          Entrar
        </button>
      </form>
    </div>
  );
}