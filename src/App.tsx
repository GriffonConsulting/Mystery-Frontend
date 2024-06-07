import React, { useState } from 'react';
import HomePage from './HomePage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import SignIn from './Pages/Authenticate/SignIn';
import SignUp from './Pages/Authenticate/SignUp';
import { UserContext, UserContextType } from './UserContext';

export const App = (): JSX.Element => {
  const [currentUser, setCurrentUser] = useState<UserContextType>({
    token: 'filiptammergard',
  });

  return (
    <UserContext.Provider value={currentUser}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="/authenticate/signin" element={<SignIn />} />
            <Route path="/authenticate/signup" element={<SignUp />} />
            {/* <Route path="*" element={<NoPage />} /> */}
          </Routes>
        </Layout>
      </BrowserRouter>
    </UserContext.Provider>
  );
};

export default App;
