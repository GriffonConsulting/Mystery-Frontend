import React, { useMemo } from 'react';
import axios from 'axios';
import AppRoutes from './Routes';
import { useCookies } from 'react-cookie';
import { SignInDto } from './__generated__/api-generated';
import api from './__generated__/api';

export const App = (): JSX.Element => {
  const [cookies] = useCookies(['token']);
  const setToken = (token: SignInDto) => {
    if (token) {
      api.setSecurityData(token.token);
    } else {
      api.setSecurityData(null);
    }
  };
  useMemo(() => setToken(cookies.token), [cookies]);

  return <AppRoutes />;
};

export default App;
