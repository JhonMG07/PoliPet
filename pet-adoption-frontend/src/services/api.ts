import axios from 'axios';

// DTOs de usuario para el login y registro
export interface AuthDto {
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
}

// Configuración del cliente Axios
export const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Mantenemos la exportación por defecto para la mayoría de los casos
export default api;


// --- Nuevas funciones de Autenticación ---
export const login = (data: AuthDto) => 
  api.post<AuthResponse>('/auth/login', data); // <-- CORREGIDO

export const register = (data: any) =>
  api.post('/users', data); // <-- Esta ya estaba bien

export const getProfile = () =>
  api.get('/auth/profile'); // <-- CORREGIDO


// DTOs para creación y actualización de mascota (puedes moverlos a su propio archivo si prefieres)
export interface CreatePetDto {
  name: string;
  type: 'dog' | 'cat' | 'bird' | 'rabbit' | 'hamster' | 'other';
  breed: string;
  size: 'small' | 'medium' | 'large';
  age: 'puppy' | 'young' | 'adult' | 'senior';
  description: string;
  imageUrl?: string;
  images?: string[];
  // ... otros campos
}
export type UpdatePetDto = Partial<CreatePetDto>;

// --- Funciones del API para Mascotas ---
export const getPets = () => api.get('/pets');
export const getPet = (id: string) => api.get(`/pets/${id}`);
export const createPet = (shelterId: string, body: CreatePetDto) =>
  api.post(`/pets/${shelterId}`, body);
export const updatePet = (id: string, body: UpdatePetDto) =>
  api.put(`/pets/${id}`, body);
export const deletePet = (id: string) => api.delete(`/pets/${id}`);

// --- Funciones del API para Adopciones ---
export const adoptPet = (userId: string, body: { petId: string }) =>
  api.post(`/adoptions/${userId}`, body); // <-- Se construye la URL con el userId