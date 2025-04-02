import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Pages/Layout/Layout';
import { AxiosInterceptor } from './__generated__/api';
import RequiredAuth from './RequiredAuth';
import Loader from './components/Loader';
import { EnumAppRoutes } from './Enum/EnumAppRoutes';

const SignIn = React.lazy(() => import('./Pages/Authenticate/SignIn'));
const SignUp = React.lazy(() => import('./Pages/Authenticate/SignUp'));
const Products = React.lazy(() => import('./Pages/Product/Products'));
const Product = React.lazy(() => import('./Pages/Product/Product'));
const Contact = React.lazy(() => import('./Pages/Contact/Contact'));
const NotFound = React.lazy(() => import('./Pages/NotFound/NotFound'));
const Basket = React.lazy(() => import('./Pages/Order/Basket'));
const Account = React.lazy(() => import('./Pages/Account/Account'));
const Checkout = React.lazy(() => import('./Pages/Order/Checkout'));
const AccountInformations = React.lazy(() => import('./Pages/Account/AccountInformations'));
const ForgotPassword = React.lazy(() => import('./Pages/Authenticate/ForgotPassword'));
const ResetPassword = React.lazy(() => import('./Pages/Authenticate/ResetPassword'));
const Invoices = React.lazy(() => import('./Pages/Invoice/Invoices'));

export const AppRoutes = (): JSX.Element => {
  return (
    <BrowserRouter>
      <AxiosInterceptor>
        <Layout>
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path=":lang/">
                <Route index element={<Products />} />
                <Route path={EnumAppRoutes.SignIn} element={<SignIn />} />
                <Route path={EnumAppRoutes.SignUp} element={<SignUp />} />
                <Route path={EnumAppRoutes.ForgotPassword} element={<ForgotPassword />} />
                <Route path={EnumAppRoutes.ResetPassword} element={<ResetPassword />} />
                <Route path={EnumAppRoutes.Products} element={<Products />} />
                <Route path={EnumAppRoutes.Product} element={<Product />} />
                <Route path={EnumAppRoutes.Basket} element={<Basket />} />
                <Route path={EnumAppRoutes.Contact} element={<Contact />} />
                <Route
                  path={EnumAppRoutes.Account}
                  element={
                    <RequiredAuth>
                      <Account />
                    </RequiredAuth>
                  }
                />
                <Route
                  path={EnumAppRoutes.AccountInformations}
                  element={
                    <RequiredAuth>
                      <AccountInformations />
                    </RequiredAuth>
                  }
                />
                <Route
                  path={EnumAppRoutes.AccountInvoices}
                  element={
                    <RequiredAuth>
                      <Invoices />
                    </RequiredAuth>
                  }
                />
                <Route
                  path={EnumAppRoutes.Checkout}
                  element={
                    <RequiredAuth>
                      <Checkout />
                    </RequiredAuth>
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </Suspense>
        </Layout>
      </AxiosInterceptor>
    </BrowserRouter>
  );
};

export default AppRoutes;
