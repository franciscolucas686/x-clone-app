import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { AuthContext } from "./AuthContext";

export interface DecodedToken {
  user_id: string;
  exp: number;
}

export interface User {
  id: string;
  name: string;
  username: string;
  avatar?: string;
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const logout = () => {
    localStorage.removeItem("access");
    setUser(null);
  };

  const login = async (username: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.post("/token/", { username, password });
      const token = res.data.access;
      localStorage.setItem("access", token);

      const userRes = await api.get(`/profile/`);
      setUser(userRes.data);
    } catch (error) {
      console.error("erro ao fazer login", error);
      setError("Email ou senha inválidos.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const restoreUser = async () => {
      const token = localStorage.getItem("access");
      if (!token) {
        logout();
        return;
      }

      try {
        const decoded: DecodedToken = jwtDecode(token);

        if (decoded.exp * 1000 < Date.now()) {
          logout();
          return;
        }

        const userRes = await api.get(`/profile/`);
        setUser(userRes.data);
      } catch (err) {
        console.error("Erro ao restaurar usuário", err);
        logout();
      }
    };

    restoreUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};
