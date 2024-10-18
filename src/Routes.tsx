import React, { useState } from 'react';
import HomePage from './HomePage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Pages/Layout/Layout';
import SignIn from './Pages/Authenticate/SignIn';
import SignUp from './Pages/Authenticate/SignUp';
import { UserContextType } from './UserContext';
import Products from './Pages/Product/Products';
import Product from './Pages/Product/Product';
import Contact from './Pages/Contact/Contact';
import NotFound from './Pages/NotFound/NotFound';
import Basket from './Pages/Order/Basket';

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
          <Route path="/order/basket" element={<Basket />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default AppRoutes;
