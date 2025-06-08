
import React, { useState } from "react";
import { Input, Checkbox, Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

export const LoginSection = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Limpiar errores previos

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Inicio de sesión exitoso:", data);
        // Redirigir o guardar token
      } else {
        setError(data.message || "Credenciales incorrectas.");
      }
    } catch (err) {
      console.error("Error al iniciar sesión:", err);
      setError("Ocurrió un error al conectar con el servidor. Inténtalo más tarde.");
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin} className="space-y-6 py-4">
        <Input
          label="Correo Electrónico"
          placeholder="tucorreo@ejemplo.com"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="bordered"
          isRequired
          startContent={<Icon icon="lucide:mail" className="text-default-400" width={18} />}
        />

        <Input
          label="Contraseña"
          placeholder="Ingresa tu contraseña"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          variant="bordered"
          isRequired
          startContent={<Icon icon="lucide:lock" className="text-default-400" width={18} />}
        />

        <div className="flex items-center justify-between">
          <Checkbox
            isSelected={rememberMe}
            onValueChange={setRememberMe}
          >
            Recuérdame
          </Checkbox>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <Button type="submit" variant="solid" color="primary">
          Iniciar Sesión
        </Button>
      </form>

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          ¿No tienes una cuenta?{" "}
          <Link to="/register" className="text-primary font-bold">
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginSection;