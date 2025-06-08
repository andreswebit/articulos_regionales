export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  region: string;
  description?: string;
  stock: number;
  category: string;
}

export interface CartItem {
  id: number;
  productId: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  region: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  password: string; // nunca almacenar  contraseñas en texto plano
  address?: string;
  phone?: string;
  isAdmin: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData extends LoginCredentials {
  name: string;
  confirmPassword: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
