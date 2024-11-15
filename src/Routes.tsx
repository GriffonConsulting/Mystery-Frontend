import React from 'react';
import HomePage from './HomePage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Pages/Layout/Layout';
import SignIn from './Pages/Authenticate/SignIn';
import SignUp from './Pages/Authenticate/SignUp';
import Products from './Pages/Product/Products';
import Product from './Pages/Product/Product';
import Contact from './Pages/Contact/Contact';
import NotFound from './Pages/NotFound/NotFound';
import Basket from './Pages/Order/Basket';
import Account from './Pages/Account/Account';
import { useCookies } from 'react-cookie';
import RequiredAuth from './RequireAuth';
import Checkout from './Pages/Order/Checkout';
import AccountInformations from './Pages/Account/AccountInformations';
import ForgotPassword from './Pages/Authenticate/ForgotPassword';

export const AppRoutes = (): JSX.Element => {
  const [cookies] = useCookies(['token']);

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/authenticate/signin" element={<SignIn />} />
          <Route path="/authenticate/signup" element={<SignUp />} />
          <Route path="/authenticate/forgotpassword" element={<ForgotPassword />} />
          <Route path="/product/:productType" element={<Products />} />
          <Route path="/product/:productType/:productCode" element={<Product />} />
          <Route path="/order/basket" element={<Basket />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path={'/account'}
            element={
              <RequiredAuth>
                <Account />
              </RequiredAuth>
            }
          />
          <Route
            path={'/account/informations'}
            element={
              <RequiredAuth>
                <AccountInformations />
              </RequiredAuth>
            }
          />

          <Route
            path={'/order/checkout'}
            element={
              <RequiredAuth>
                <Checkout />
              </RequiredAuth>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default AppRoutes;
