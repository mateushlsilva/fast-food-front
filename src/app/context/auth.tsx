"use client";

import { createContext, ReactNode, useEffect, useState } from "react";
import { User, api, apiBot } from "../service";
import { usePathname } from "next/navigation";
import Swal from 'sweetalert2'

interface AuthContextType {
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  refreshAccessToken: () => Promise<void>;
  logout: () => void;
}

interface AuthProps{
    token: string;
    refresh_token: string;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken)
            api.defaults.headers.Authorization = `Bearer ${storedToken}`;
            apiBot.defaults.headers.Authorization = `Bearer ${storedToken}`;
           

        } else if (pathname !== "/login" && pathname !== "/cadastro") {
            window.location.href = "/login";
        }
    }
  }, [pathname]);

  const login = async (email: string, password: string) => {
    try {
      const res: AuthProps = await User.auth(email, password)

      const newToken = res.token;
      const refreshToken = res.refresh_token;

      // Salva tokens
      setToken(newToken);
      localStorage.setItem("token", newToken);
      localStorage.setItem("refresh_token", refreshToken);

      // Define headers de autenticação
      api.defaults.headers.Authorization = `Bearer ${newToken}`;
      apiBot.defaults.headers.Authorization = `Bearer ${newToken}`;
     
      Swal.fire({
        title: 'Login!',
        text: 'Login efuetuado com sucesso!',
        icon: 'success',
        confirmButtonText: 'ok'
        })

      window.location.href = "/";
    } catch (err) {
        Swal.fire({
            title: 'Erro!',
            text: 'Erro ao fazer login.',
            icon: 'error',
            confirmButtonText: 'ok'
        })
      console.error("Erro no login", err);
    }
  };

  const refreshAccessToken = async () => {
    try {
      const refreshToken = localStorage.getItem("refresh_token");
      if (!refreshToken) throw new Error("Refresh Token não encontrado.");

      const res = await User.refresh(refreshToken);
      const newToken = res.token; 
      setToken(newToken);
      localStorage.setItem("token", newToken);
      api.defaults.headers.Authorization = `Bearer ${newToken}`;
      apiBot.defaults.headers.Authorization = `Bearer ${newToken}`;


    } catch (err) {
      console.error("Erro ao renovar token", err);
      logout(); 
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");
    setToken(null);
    delete api.defaults.headers.common["Authorization"];
    delete apiBot.defaults.headers.common["Authorization"];
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ token, login, refreshAccessToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
