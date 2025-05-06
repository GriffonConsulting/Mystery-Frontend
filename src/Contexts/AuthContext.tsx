import React, { createContext, useEffect, useMemo, useState } from 'react';
import api from '../__generated__/api';
import { SignInQuery, SignUpCommand } from '../__generated__/api-generated';

type AuthContextType = {
  isConnected: boolean;
  signIn: (signIn: SignInQuery) => Promise<void>;
  signUp: (signUp: SignUpCommand) => Promise<void>;
  signOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    api.authenticate
      .me({ withCredentials: true })
      .then(() => setIsConnected(true))
      .catch(() => setIsConnected(false));
  }, []);

  const signIn = async (signIn: SignInQuery) => {
    await api.authenticate.signIn(signIn, { withCredentials: true }).then(() => setIsConnected(true));
  };

  const signUp = async (signUp: SignUpCommand) => {
    await api.authenticate.signUp(signUp, { withCredentials: true }).then(() => setIsConnected(true));
  };

  const signOut = async () => {
    await api.authenticate.signOut({ withCredentials: true }).then(() => setIsConnected(false));
  };

  return (
    <AuthContext.Provider
      value={useMemo(
        () => ({
          signIn,
          signUp,
          signOut,
          isConnected,
        }),
        [signIn, signUp, signOut, isConnected],
      )}>
      {children}
    </AuthContext.Provider>
  );
};
