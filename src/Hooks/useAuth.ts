import { useContext } from 'react';
import { AuthContext } from '../Contexts/AuthContext';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth doit être utilisé dans <AuthProvider>');
  }
  return context;
};
