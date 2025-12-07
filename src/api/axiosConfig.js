import axios from 'axios';

// Configuración base de Axios
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://negociosv.com/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Interceptor para agregar token si existe
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar respuestas y errores
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // El servidor respondió con un código de estado fuera del rango 2xx
      console.error('Error de respuesta:', error.response.data);

      // Si es 401, limpiar autenticación
      if (error.response.status === 401) {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_data');
        window.location.href = '/login';
      }
    } else if (error.request) {
      // La petición fue hecha pero no hubo respuesta
      console.error('Error de red:', error.request);
    } else {
      // Algo pasó al configurar la petición
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
