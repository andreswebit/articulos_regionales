// import api, { handleApiResponse } from './api';
// import { LoginCredentials, RegisterData, User, ApiResponse } from '../types';
// import { mockUsers } from './mockData';

// // Simulación de respuestas de API para autenticación
// const simulateApiCall = <T>(data: T, delay: number = 800): Promise<T> => {
//   return new Promise((resolve) => {
//     setTimeout(() => resolve(data), delay);
//   });
// };

// // Servicio de autenticación
// export const authService = {
//   // Iniciar sesión
//   login: async (credentials: LoginCredentials): Promise<ApiResponse<{ user: User; token: string }>> => {
//     try {
//       // En un entorno real, esto sería una llamada a la API
//       // return handleApiResponse(api.post('/auth/login', credentials));

//       // Simulación de API para desarrollo
//       const user = mockUsers.find(u =>
//         u.email === credentials.email && u.password === credentials.password
//       );

//       if (user) {
//         const response = await simulateApiCall({
//           user: { ...user, password: '******' }, // Nunca devolver la contraseña real
//           token: 'fake-jwt-token-' + Math.random().toString(36).substring(2)
//         });

//         return { success: true, data: response };
//       }

//       return { success: false, error: 'Credenciales incorrectas' };
//     } catch (error) {
//       console.error('Error en login:', error);
//       return { success: false, error: 'Error al procesar la solicitud' };
//     }
//   },

//   // Registrar nuevo usuario
//   register: async (data: RegisterData): Promise<ApiResponse<{ user: User; token: string }>> => {
//     try {
//       // En un entorno real, esto sería una llamada a la API
//       // return handleApiResponse(api.post('/auth/register', data));

//       // Simulación de API para desarrollo
//       // Verificar si el email ya existe
//       const existingUser = mockUsers.find(u => u.email === data.email);
//       if (existingUser) {
//         return { success: false, error: 'El email ya está registrado' };
//       }

//       // Crear nuevo usuario
//       const newUser: User = {
//         id: mockUsers.length + 1,
//         name: data.name,
//         email: data.email,
//         password: data.password, // En una app real, esto estaría hasheado
//         isAdmin: false
//       };

//       // Agregar a la lista de usuarios (en una app real, se guardaría en la base de datos)
//       mockUsers.push(newUser);

//       const response = await simulateApiCall({
//         user: { ...newUser, password: '******' }, // Nunca devolver la contraseña real
//         token: 'fake-jwt-token-' + Math.random().toString(36).substring(2)
//       });

//       return { success: true, data: response };
//     } catch (error) {
//       console.error('Error en registro:', error);
//       return { success: false, error: 'Error al procesar la solicitud' };
//     }
//   },

//   // Obtener usuario actual
//   getCurrentUser: async (): Promise<ApiResponse<User>> => {
//     try {
//       // En un entorno real, esto sería una llamada a la API
//       // return handleApiResponse(api.get('/auth/me'));

//       // Simulación de API para desarrollo
//       // Normalmente verificaríamos el token JWT, pero aquí simplemente devolvemos el primer usuario
//       const user = mockUsers[0];

//       if (user) {
//         const response = await simulateApiCall({ ...user, password: '******' });
//         return { success: true, data: response };
//       }

//       return { success: false, error: 'Usuario no encontrado' };
//     } catch (error) {
//       console.error('Error al obtener usuario actual:', error);
//       return { success: false, error: 'Error al procesar la solicitud' };
//     }
//   }
// };

import api, { handleApiResponse } from "./api";
import { ApiResponse } from "../types";

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  isAdmin: boolean;
}

export const authService = {
  login: async (
    data: LoginData
  ): Promise<ApiResponse<{ user: User; token: string }>> => {
    try {
      return handleApiResponse(api.post("/users/login", data));
    } catch (error) {
      console.error("Error in login:", error);
      return {
        success: false,
        error: "Error processing login request",
      };
    }
  },

  register: async (
    data: RegisterData
  ): Promise<ApiResponse<{ user: User; token: string }>> => {
    try {
      return handleApiResponse(api.post("/users/register", data));
    } catch (error) {
      console.error("Error in registration:", error);
      return {
        success: false,
        error: "Error processing registration request",
      };
    }
  },

  getCurrentUser: async (): Promise<ApiResponse<User>> => {
    try {
      const response = await fetch("/api/current-user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      const data = await response.json();
      return { success: response.ok, data };
    } catch (error) {
      console.error("Error fetching current user:", error);
      return { success: false, error: "Failed to fetch current user" };
    }
  },
};
