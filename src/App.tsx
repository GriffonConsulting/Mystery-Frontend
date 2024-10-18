import React, { useEffect, useState } from 'react';
import { UserContext, UserContextType } from './UserContext';
import axios from 'axios';
import AppRoutes from './Routes';

export const App = (): JSX.Element => {
  //todo conf
  const [currentUser, setCurrentUser] = useState<UserContextType>({
    token: 'filiptammergard',
  });

  //use useMemo instead
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
