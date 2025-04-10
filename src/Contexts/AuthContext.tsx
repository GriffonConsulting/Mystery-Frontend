import React, { createContext, useEffect, useState } from 'react';
import api from '../__generated__/api';
import { SignInQuery, SignUpCommand } from '../__generated__/api-generated';

type AuthContextType = {
  isConnected: boolean;
  signIn: (signIn: SignInQuery) => Promise<void>;
  signUp: (signUp: SignUpCommand) => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    api.authenticate.me({ withCredentials: true }).then(() => setIsConnected(true));
  }, []);

  const signIn = async (signIn: SignInQuery) => {
    await api.authenticate.signIn(signIn, { withCredentials: true }).then(() => setIsConnected(true));
  };

  const signUp = async (signUp: SignUpCommand) => {
    await api.authenticate.signIn(signUp, { withCredentials: true }).then(() => setIsConnected(true));
  };

  const logout = async () => {
    await api.authenticate.logout({ withCredentials: true }).then(() => setIsConnected(false));
  };

  return <AuthContext.Provider value={{ signIn, signUp, logout, isConnected }}>{children}</AuthContext.Provider>;
};
