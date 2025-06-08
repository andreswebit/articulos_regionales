import React, { createContext, useContext, useState, useEffect } from "react";
import { LoginCredentials, RegisterData } from "../types";
import { authService } from "../services/authService";
import { addToast } from "@heroui/react";

// Define a User interface that matches what we're using in the context
interface User {
  id: number;
  name: string;
  email: string;
  isAdmin: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Verificar si hay un usuario guardado en localStorage al iniciar
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("authToken");
      if (token) {
        try {
          const response = await authService.getCurrentUser();
          if (response.success && response.data) {
            // Create a user object without the password field
            const userWithoutPassword = {
              id: response.data.id,
              name: response.data.name,
              email: response.data.email,
              isAdmin: response.data.isAdmin,
            };
            setUser(userWithoutPassword);
          } else {
            localStorage.removeItem("authToken");
          }
        } catch (error) {
          console.error("Error al verificar autenticación:", error);
          localStorage.removeItem("authToken");
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await authService.login(credentials);

      if (
        response.success &&
        response.data &&
        response.data.user &&
        response.data.token
      ) {
        // Create a user object without the password field
        const userWithoutPassword = {
          id: response.data.user.id,
          name: response.data.user.name,
          email: response.data.user.email,
          isAdmin: response.data.user.isAdmin,
        };

        setUser(userWithoutPassword);

        if (credentials.rememberMe) {
          localStorage.setItem("authToken", response.data.token);
        }

        addToast({
          title: "Inicio de sesión exitoso",
          description: `Bienvenido/a, ${userWithoutPassword.name}`,
          timeout: 3000,
        });

        return true;
      } else {
        addToast({
          title: "Error de inicio de sesión",
          description: response.error || "Credenciales incorrectas",
          timeout: 3000,
        });
        return false;
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      addToast({
        title: "Error",
        description: "Ocurrió un error al intentar iniciar sesión",
        timeout: 3000,
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterData): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Validar que las contraseñas coincidan
      if (data.password !== data.confirmPassword) {
        addToast({
          title: "Error",
          description: "Las contraseñas no coinciden",
          timeout: 3000,
        });
        return false;
      }

      const response = await authService.register(data);

      if (response.success && response.data) {
        // Create a user object without the password field
        const userWithoutPassword = {
          id: response.data.user.id,
          name: response.data.user.name,
          email: response.data.user.email,
          isAdmin: response.data.user.isAdmin,
        };

        setUser(userWithoutPassword);
        localStorage.setItem("authToken", response.data.token);

        addToast({
          title: "Registro exitoso",
          description: `Bienvenido/a, ${userWithoutPassword.name}`,
          timeout: 3000,
        });

        return true;
      } else {
        addToast({
          title: "Error de registro",
          description: response.error || "No se pudo completar el registro",
          timeout: 3000,
        });
        return false;
      }
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      addToast({
        title: "Error",
        description: "Ocurrió un error al intentar registrarse",
        timeout: 3000,
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("authToken");
    addToast({
      title: "Sesión cerrada",
      description: "Has cerrado sesión correctamente",
      timeout: 3000,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};
