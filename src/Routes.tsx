import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Pages/Layout/Layout';
import { AxiosInterceptor } from './__generated__/api';

const SignIn = React.lazy(() => import('./Pages/Authenticate/SignIn'));
const SignUp = React.lazy(() => import('./Pages/Authenticate/SignUp'));
const Products = React.lazy(() => import('./Pages/Product/Products'));
const Product = React.lazy(() => import('./Pages/Product/Product'));
const Contact = React.lazy(() => import('./Pages/Contact/Contact'));
const NotFound = React.lazy(() => import('./Pages/NotFound/NotFound'));
const Basket = React.lazy(() => import('./Pages/Order/Basket'));
const Account = React.lazy(() => import('./Pages/Account/Account'));
const RequiredAuth = React.lazy(() => import('./RequiredAuth'));
const Checkout = React.lazy(() => import('./Pages/Order/Checkout'));
const AccountInformations = React.lazy(() => import('./Pages/Account/AccountInformations'));
const ForgotPassword = React.lazy(() => import('./Pages/Authenticate/ForgotPassword'));
const Invoices = React.lazy(() => import('./Pages/Invoice/Invoices'));


export const AppRoutes = (): JSX.Element => {
  return (
    <BrowserRouter>
      <AxiosInterceptor>
        <Layout>
          <Routes>
            <Route index element={<Products />} />
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
              path={'/account/invoices'}
              element={
                <RequiredAuth>
                  <Invoices />
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
      </AxiosInterceptor>
    </BrowserRouter>
  );
};

export default AppRoutes;
