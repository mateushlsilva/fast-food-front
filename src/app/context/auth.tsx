'use client'

import { createContext, ReactNode, useEffect, useState } from "react";
import { User, api } from '../service'
import { usePathname } from 'next/navigation';

interface AuthContextType {
    token: string | null;
    login: (email: string, password: string) => Promise<void>;
    refreshAccessToken: (refresh: string) => Promise<void>;
    logout: () => void;
  }
  
  export const AuthContext = createContext<AuthContextType | undefined>(undefined);

  export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);
    const pathname = usePathname();

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedToken = localStorage.getItem("token");
            if (storedToken) {
                setToken(storedToken);
                api.defaults.headers.Authorization = `Bearer ${storedToken}`
                api.defaults.headers.common = { Authorization: `Bearer ${storedToken}` }
                
            }
            if(!storedToken && pathname !== '/login' && pathname !== '/cadastro'){
                window.location.href = "/login";
            }
        }
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const res = await User.auth(email, password);
       
            const newToken = res.token
            localStorage.setItem("token", newToken);
            
            setToken(newToken);
            api.defaults.headers.Authorization = `Bearer ${newToken}`
            api.defaults.headers.common = { Authorization: `Bearer ${newToken}` }
            

            window.location.href = "/";

        } catch (err) {
            console.error("Erro no login", err);
        }
    };

    const refreshAccessToken = async (refresh: string) => {
        try {
            const res = await User.refresh(refresh)

            const newToken = res.token;
            localStorage.setItem("token", newToken);
            setToken(newToken);
            api.defaults.headers.Authorization = `Bearer ${newToken}`
            api.defaults.headers.common = { Authorization: `Bearer ${newToken}` }
          

        } catch (err) {
            console.error("Erro ao renovar o token", err);
            logout();
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        delete api.defaults.headers.common["Authorization"];
    };

    return (
        <AuthContext.Provider value={{ token, login, refreshAccessToken, logout }}>
          {children}
        </AuthContext.Provider>
      );

    
}
