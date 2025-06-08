import axios from 'axios';
import { ApiResponse } from '../types';

// Configuración base de axios
export const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Cambiar por la URL de tu API real
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para agregar el token de autenticación
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Función para manejar respuestas de la API
export const handleApiResponse = async <T>(
  apiCall: Promise<any>
): Promise<ApiResponse<T>> => {
  try {
    const response = await apiCall;
    return {
      success: true,
      data: response.data
    };
  } catch (error: any) {
    console.error('API Error:', error);
    
    // Manejar errores de la API
    if (error.response) {
      // La solicitud fue hecha y el servidor respondió con un código de estado
      // que cae fuera del rango 2xx
      return {
        success: false,
        error: error.response.data.message || 'Error en la solicitud'
      };
    } else if (error.request) {
      // La solicitud fue hecha pero no se recibió respuesta
      return {
        success: false,
        error: 'No se recibió respuesta del servidor'
      };
    } else {
      // Algo ocurrió al configurar la solicitud que desencadenó un error
      return {
        success: false,
        error: error.message || 'Error al procesar la solicitud'
      };
    }
  }
};

export default api;
