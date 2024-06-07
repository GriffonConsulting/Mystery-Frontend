import React, { useEffect, useState } from 'react';
import { UserContext, UserContextType } from './UserContext';
import axios from 'axios';
import AppRoutes from './Routes';
import { Api, HttpClient } from './__generated__/api-generated';

export const App = (): JSX.Element => {
  const [currentUser, setCurrentUser] = useState<UserContextType>({
    token: 'filiptammergard',
  });

  //todo conf

  useEffect(() => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${currentUser.token}`;
  }, [currentUser]);

  return (
    <UserContext.Provider value={currentUser}>
      <AppRoutes />
    </UserContext.Provider>
  );
};

export default App;
