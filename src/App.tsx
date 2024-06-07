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
      <Layout>
        <BrowserRouter>
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="/authenticate/signin" element={<SignIn />} />
            <Route path="/authenticate/signup" element={<SignUp />} />
            {/* <Route path="*" element={<NoPage />} /> */}
          </Routes>
        </BrowserRouter>
      </Layout>
    </UserContext.Provider>
  );
};

export default App;
