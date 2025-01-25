/* Hooks */
import { createContext, ReactNode, useEffect, useState } from "react";

/* Utils */
import { api } from "../api/axios";

/* Types */
import { Salon, UpdateUserPayload, User } from "../types/data";

type AuthContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isAuthenticated: boolean;
  isLoading: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  logout: () => Promise<void>;
  updateUser: (updatedData: UpdateUserPayload) => Promise<void>;
  deleteUser: () => Promise<void>;
  salon: Salon | null;
  setSalon: React.Dispatch<React.SetStateAction<Salon | null>>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [salon, setSalon] = useState<Salon | null>(null);
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

  useEffect(() => {
    const getSalon = async () => {
      setIsLoading(true);
      try {
        const response = await api.get("/api/userHaveSalon");
        setSalon(response.data);
      } catch (error) {
        console.error("Failed to fetch salon: ", error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    };

    if (user) getSalon();
  }, [user]);

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

  const updateUser = async (updatedData: UpdateUserPayload) => {
    setIsLoading(true);
    try {
      const response = await api.put("/api/user", updatedData);
      setUser((prev) => (prev ? { ...prev, ...response.data } : response.data));
      return response.data;
    } catch (error) {
      console.error("Failed to update user:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteUser = async () => {
    setIsLoading(true);
    try {
      await api.delete("/api/user");
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Account deletion failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
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
        updateUser,
        deleteUser,
        salon,
        setSalon,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
