import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product } from '../types';
import { addToast } from "@heroui/react";
import { useAuth } from './AuthContext';
import { cartService } from '../services/cartService';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  isLoading: boolean;
  subtotal: number;
  shipping: number;
  total: number;
  totalItems: number; // Agregamos propiedad para el total de unidades
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  
  // Valores calculados
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 25000 ? 0 : 1500; // Envío gratis para compras mayores a $25.000
  const total = subtotal + shipping;

  // Calculamos el total de unidades sumando las cantidades de cada producto
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Cargar carrito al iniciar sesión
  useEffect(() => {
    if (user) {
      loadCart();
    } else {
      // Si no hay usuario, intentar cargar del localStorage
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        try {
          setCartItems(JSON.parse(savedCart));
        } catch (error) {
          console.error('Error al cargar el carrito del localStorage:', error);
        }
      }
    }
  }, [user]);

  // Guardar carrito en localStorage cuando cambia
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }
  }, [cartItems]);

  const loadCart = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const response = await cartService.getUserCart(user.id);
      if (response.success && response.data) {
        setCartItems(response.data);
      }
    } catch (error) {
      console.error('Error al cargar el carrito:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addToCart = async (product: Product, quantity: number = 1) => {
    setIsLoading(true);
    
    try {
      // Verificar si el producto ya está en el carrito
      const existingItem = cartItems.find(item => item.productId === product.id);
      
      if (existingItem) {
        // Actualizar cantidad si ya existe
        await updateQuantity(existingItem.id, existingItem.quantity + quantity);
        
        // Mostrar notificación de producto actualizado
        addToast({
          title: "Producto actualizado",
          description: `Se agregó ${quantity} unidad(es) más de ${product.name} al carrito`,
          timeout: 3000
        });
      } else {
        // Crear nuevo item en el carrito
        const newItem: CartItem = {
          id: Date.now(), // ID temporal, el backend asignaría uno real
          productId: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: quantity,
          region: product.region
        };
        
        if (user) {
          // Si hay usuario, guardar en la base de datos
          const response = await cartService.addToCart(user.id, newItem);
          if (response.success && response.data) {
            setCartItems(prev => [...prev, response.data]);
          }
        } else {
          // Si no hay usuario, guardar localmente
          setCartItems(prev => [...prev, newItem]);
        }
        
        addToast({
          title: "Producto agregado",
          description: `${product.name} se ha agregado al carrito`,
          timeout: 3000
        });
      }
    } catch (error) {
      console.error('Error al agregar al carrito:', error);
      addToast({
        title: "Error",
        description: "No se pudo agregar el producto al carrito",
        timeout: 3000
      });
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromCart = async (id: number) => {
    setIsLoading(true);
    
    try {
      if (user) {
        // Si hay usuario, eliminar de la base de datos
        await cartService.removeFromCart(user.id, id);
      }
      
      setCartItems(prev => prev.filter(item => item.id !== id));
      
      addToast({
        title: "Producto eliminado",
        description: "El producto se ha eliminado del carrito",
        timeout: 3000
      });
    } catch (error) {
      console.error('Error al eliminar del carrito:', error);
      addToast({
        title: "Error",
        description: "No se pudo eliminar el producto del carrito",
        timeout: 3000
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuantity = async (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setIsLoading(true);
    
    try {
      const item = cartItems.find(item => item.id === id);
      if (!item) return;
      
      if (user) {
        // Si hay usuario, actualizar en la base de datos
        await cartService.updateCartItem(user.id, id, newQuantity);
      }
      
      setCartItems(prev => 
        prev.map(item => 
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (error) {
      console.error('Error al actualizar cantidad:', error);
      addToast({
        title: "Error",
        description: "No se pudo actualizar la cantidad",
        timeout: 3000
      });
    } finally {
      setIsLoading(false);
    }
  };

  const clearCart = async () => {
    setIsLoading(true);
    
    try {
      if (user) {
        // Si hay usuario, limpiar en la base de datos
        await cartService.clearCart(user.id);
      }
      
      setCartItems([]);
      localStorage.removeItem('cart');
    } catch (error) {
      console.error('Error al limpiar el carrito:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      isLoading,
      subtotal,
      shipping,
      total,
      totalItems // Agregamos el total de unidades al contexto
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart debe usarse dentro de un CartProvider');
  }
  return context;
};