import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import api from '../api/axios';
import { AuthContext } from './AuthContext';

export interface User {
  user_id: string;
  exp: number;
  iat: number;
  token_type: string;
  jti: string;
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null >(null);

  useEffect(() => {
    const token = localStorage.getItem('access');
    if (token) {
      const decoded: User = jwtDecode(token);
      setUser(decoded);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const res = await api.post('/token/', { email, password });
      const token = res.data.access;
    localStorage.setItem("access", token);
      setUser(jwtDecode<User>(token));
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
