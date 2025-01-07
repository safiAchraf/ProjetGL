/* Hooks */
import { createContext, ReactNode, useEffect, useState } from "react";

/* Utils */
import { api } from "../api/axios";

/* Types */
import { User } from "../types/data";

type AuthContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isAuthenticated: boolean;
  isLoading: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
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

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await api.get("/api/user");
        setUser(response.data);
      } catch (error) {
        console.log("Failed to fetch user data: " + error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    if (!user && isAuthenticated) getUser();
  }, [isAuthenticated, user]);

  const logout = async () => {
    setIsLoading(true);

    try {
      await api.get("/api/auth/logout");
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoading(false);
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
        setIsAuthenticated,
        isLoading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
