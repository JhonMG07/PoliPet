// src/components/NavBar.tsx
import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <nav className="card" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Link to="/pets" className="btn">
        🐾 Mascotas
      </Link>
      <Link to="/adopt" className="btn">
        🤝 Adoptar
      </Link>
      <Link to="/pets/new" className="btn">
        ➕ Crear mascota
      </Link>
    </nav>
  );
}


