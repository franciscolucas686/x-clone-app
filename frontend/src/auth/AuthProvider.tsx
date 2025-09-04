import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import api from '../api/axios';
import { AuthContext } from './AuthContext';

export interface DecodedToken {
  user_id: string;
  exp: number;
  iat: number;
  token_type: string;
  jti: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null >(null);

  useEffect(() => {
    const checkUser = async () => {
      const token = localStorage.getItem("access");
      if (!token) return;
      try {
        const decoded: DecodedToken = jwtDecode(token);
        if (decoded.exp * 1000 < Date.now()) {
          localStorage.removeItem("access");
          setUser(null);
          return;
        }

        const res = await api.get(`/users/${decoded.user_id}/`);
        setUser(res.data);
      } catch (error) {
        console.error("Erro ao restaurar usuário", error);
        localStorage.removeItem("access");
        setUser(null);
      }
    }
    checkUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const res = await api.post('/token/', { email, password });
      const token = res.data.access;
      localStorage.setItem("access", token);
      
      const decoded: DecodedToken = jwtDecode(token);
      const userRes = await api.get(`/users/${decoded.user_id}/`);
      setUser(userRes.data);
    } catch (error) {
      console.error("erro ao fazer login", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("access")
    setUser(null);
  };
  
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
