import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { BuildUrl } from './Functions/BuildUrl';
import { EnumAppRoutes } from './Enum/EnumAppRoutes';

export interface PrivateRouteProps {
  children?: Array<React.ReactNode> | React.ReactNode;
}

export const RequiredAuth = (props: PrivateRouteProps): JSX.Element => {
  const [cookies] = useCookies(['token']);
  const location = useLocation();

  if (!cookies.token && location.pathname === BuildUrl(EnumAppRoutes.Checkout)) {
    return <Navigate to={BuildUrl(EnumAppRoutes.SignUp)} state={{ from: location }} />;
  } else if (!cookies.token) {
    return <Navigate to={BuildUrl(EnumAppRoutes.SignIn)} state={{ from: location }} />;
  }

  return <>{props.children}</>;
};

export default RequiredAuth;
