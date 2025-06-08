import api, { handleApiResponse } from "./api";
import { CartItem, ApiResponse } from "../types";
// import { mockCarts } from './mockData';

// // Simulación de respuestas de API
// const simulateApiCall = <T>(data: T, delay: number = 800): Promise<T> => {
//   return new Promise((resolve) => {
//     setTimeout(() => resolve(data), delay);
//   });
// };

// Servicio de carrito
export const cartService = {
  // Obtener carrito del usuario
  getUserCart: async (userId: number): Promise<ApiResponse<CartItem[]>> => {
    try {
      // En un entorno real, esto sería una llamada a la API
      // return handleApiResponse(api.get(`/cart/${userId}`));
      // Simulación de API para desarrollo
      // const cart = mockCarts[userId] || [];
      // const response = await simulateApiCall(cart);
      // return { success: true, data: response };
    } catch (error) {
      console.error(`Error al obtener carrito del usuario ${userId}:`, error);
      return { success: false, error: "Error al obtener el carrito" };
    }
  },

  // Agregar item al carrito
  addToCart: async (
    userId: number,
    item: CartItem
  ): Promise<ApiResponse<CartItem>> => {
    try {
      // En un entorno real, esto sería una llamada a la API
      return handleApiResponse(api.post(`/cart/${userId}/items`, item));

      // Simulación de API para desarrollo
      // if (!mockCarts[userId]) {
      //   mockCarts[userId] = [];
      // }

      // // Generar un ID único para el item
      // const newItem = { ...item, id: Date.now() };
      // mockCarts[userId].push(newItem);

      // const response = await simulateApiCall(newItem);
      // return { success: true, data: response };
    } catch (error) {
      console.error(
        `Error al agregar item al carrito del usuario ${userId}:`,
        error
      );
      return { success: false, error: "Error al agregar al carrito" };
    }
  },

  // Actualizar cantidad de un item
  updateCartItem: async (
    userId: number,
    itemId: number,
    quantity: number
  ): Promise<ApiResponse<CartItem>> => {
    try {
      // En un entorno real, esto sería una llamada a la API
      return handleApiResponse(
        api.put(`/cart/${userId}/items/${itemId}`, { quantity })
      );

      // Simulación de API para desarrollo
      // const userCart = mockCarts[userId];
      // if (!userCart) {
      //   return { success: false, error: 'Carrito no encontrado' };
      // }

      // const itemIndex = userCart.findIndex(item => item.id === itemId);
      // if (itemIndex === -1) {
      //   return { success: false, error: 'Item no encontrado en el carrito' };
      // }

      // userCart[itemIndex].quantity = quantity;

      // const response = await simulateApiCall(userCart[itemIndex]);
      // return { success: true, data: response };
    } catch (error) {
      console.error(
        `Error al actualizar item ${itemId} del carrito del usuario ${userId}:`,
        error
      );
      return { success: false, error: "Error al actualizar el carrito" };
    }
  },

  // Eliminar item del carrito
  removeFromCart: async (
    userId: number,
    itemId: number
  ): Promise<ApiResponse<boolean>> => {
    try {
      // En un entorno real, esto sería una llamada a la API
      return handleApiResponse(api.delete(`/cart/${userId}/items/${itemId}`));

      // Simulación de API para desarrollo
      // const userCart = mockCarts[userId];
      // if (!userCart) {
      //   return { success: false, error: 'Carrito no encontrado' };
      // }

      // const itemIndex = userCart.findIndex(item => item.id === itemId);
      // if (itemIndex === -1) {
      //   return { success: false, error: 'Item no encontrado en el carrito' };
      // }

      // userCart.splice(itemIndex, 1);

      // const response = await simulateApiCall(true);
      // return { success: true, data: response };
    } catch (error) {
      console.error(
        `Error al eliminar item ${itemId} del carrito del usuario ${userId}:`,
        error
      );
      return { success: false, error: "Error al eliminar del carrito" };
    }
  },

  // Vaciar carrito
  clearCart: async (userId: number): Promise<ApiResponse<boolean>> => {
    try {
      // En un entorno real, esto sería una llamada a la API
      return handleApiResponse(api.delete(`/cart/${userId}`));

      // // Simulación de API para desarrollo
      // mockCarts[userId] = [];

      // const response = await simulateApiCall(true);
      // return { success: true, data: response };
    } catch (error) {
      console.error(`Error al vaciar carrito del usuario ${userId}:`, error);
      return { success: false, error: "Error al vaciar el carrito" };
    }
  },
};
