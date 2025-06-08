import React from "react";
import { CartSection } from "../components/cart-section";

export const CartPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Tu Carrito de Compras</h1>
      <CartSection />
    </div>
  );
};