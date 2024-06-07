import { createContext, useContext } from 'react';

export interface UserContextType {
  token: string;
}

export const UserContext = createContext<UserContextType | null>(null);

export const useCurrentUser = () => {
  const currentUserContext = useContext(UserContext);

  if (!currentUserContext) {
    throw new Error('useCurrentUser has to be used within <CurrentUserContext.Provider>');
  }

  return currentUserContext;
};
