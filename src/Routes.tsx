import React, { useEffect, useState } from 'react';
import HomePage from './HomePage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Pages/Layout/Layout';
import SignIn from './Pages/Authenticate/SignIn';
import SignUp from './Pages/Authenticate/SignUp';
import { UserContext, UserContextType } from './UserContext';
import axios from 'axios';
import Products from './Pages/Product/Products';
import Product from './Pages/Product/Product';

export const AppRoutes = (): JSX.Element => {
  const [currentUser, setCurrentUser] = useState<UserContextType>({
    token: 'filiptammergard',
  });

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/authenticate/signin" element={<SignIn />} />
          <Route path="/authenticate/signup" element={<SignUp />} />
          <Route path="/product/:productType" element={<Products />} />
          <Route path="/product/:productType/:productCode" element={<Product />} />
          {/* <Route path="*" element={<NoPage />} /> */}
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default AppRoutes;
