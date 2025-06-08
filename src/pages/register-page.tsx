import React, { useState } from "react";
import { Input, Checkbox, Button } from "@heroui/react";
import { Icon } from "@iconify/react";

export const RegisterPage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    if (!acceptTerms) {
      setError("Debes aceptar los términos y condiciones.");
      return;
    }

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Registro exitoso. Ahora puedes iniciar sesión.");
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setAcceptTerms(false);
      } else {
        setError(data.message || "Error al registrarse. Inténtalo más tarde.");
      }
    } catch (err) {
      console.error("Error al registrarse:", err);
      setError(
        "Ocurrió un error al conectar con el servidor. Inténtalo más tarde."
      );
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-6">Crea tu Cuenta</h1>
      <form onSubmit={handleRegister} className="space-y-6 py-4">
        <Input
          label="Nombre Completo"
          placeholder="Tu nombre completo"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          variant="bordered"
          isRequired
          startContent={
            <Icon icon="lucide:user" className="text-default-400" width={18} />
          }
        />

        <Input
          label="Correo Electrónico"
          placeholder="tucorreo@ejemplo.com"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="bordered"
          isRequired
          startContent={
            <Icon icon="lucide:mail" className="text-default-400" width={18} />
          }
        />

        <Input
          label="Contraseña"
          placeholder="Crea una contraseña"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          variant="bordered"
          isRequired
          startContent={
            <Icon icon="lucide:lock" className="text-default-400" width={18} />
          }
        />

        <Input
          label="Confirmar Contraseña"
          placeholder="Repite tu contraseña"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          variant="bordered"
          isRequired
          startContent={
            <Icon icon="lucide:lock" className="text-default-400" width={18} />
          }
        />

        <div className="flex items-center">
          <Checkbox isSelected={acceptTerms} onValueChange={setAcceptTerms}>
            Acepto los términos y condiciones
          </Checkbox>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-500 text-sm">{success}</p>}

        <Button type="submit" variant="solid" color="primary">
          Registrarse
        </Button>
      </form>
    </div>
  );
};
