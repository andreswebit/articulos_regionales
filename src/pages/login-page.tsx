import React from "react";
import { LoginSection } from "../components/login-section";

export const LoginPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-6">Acceso a tu Cuenta</h1>
      <LoginSection />
    </div>
  );
};