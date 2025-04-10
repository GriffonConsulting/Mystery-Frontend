import React from 'react';
import AppRoutes from './Routes';
import { AuthProvider } from './Contexts/AuthContext';

export const App = (): JSX.Element => {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
};

export default App;
