import React, { useMemo } from 'react';
import axios from 'axios';
import AppRoutes from './Routes';
import { useCookies } from 'react-cookie';
import { SignInDto } from './__generated__/api-generated';

export const App = (): JSX.Element => {
  const [cookies] = useCookies(['token']);
  const setToken = (token: SignInDto) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  };
  useMemo(() => setToken(cookies.token), [cookies]);

  return <AppRoutes />;
};

export default App;
