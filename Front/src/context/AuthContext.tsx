/* Hooks */
import { createContext, ReactNode, useEffect, useState } from "react";

/* Utils */
import { api } from "../api/axios";

type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsLoading(true);

        await api.get("/api/auth/check");
        setIsAuthenticated(true);
      } catch (error) {
        console.log("Failed to login: " + error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const logout = async () => {
    try {
      await api.get("/api/auth/logout");
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, isLoading, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
