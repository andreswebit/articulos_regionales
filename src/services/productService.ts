


import axios from 'axios';
import { Product } from '../types';

export const productService = {
  getProducts: async (): Promise<Product[]> => {
    try {
      const response = await axios.get('/api/products'); // Endpoint del backend
      return response.data;
    } catch (error) {
      console.error('Error al obtener productos:', error);
      throw new Error('No se pudieron obtener los productos');
    }
  },
};