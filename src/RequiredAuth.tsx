import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { BuildUrl } from './Functions/BuildUrl';
import { EnumAppRoutes } from './Enum/EnumAppRoutes';
import { useAuth } from './Hooks/useAuth';

export interface PrivateRouteProps {
  children?: Array<React.ReactNode> | React.ReactNode;
}

export const RequiredAuth = (props: PrivateRouteProps): JSX.Element => {
  const location = useLocation();
  const { isConnected } = useAuth();

  if (!isConnected && location.pathname === BuildUrl(EnumAppRoutes.Checkout)) {
    return <Navigate to={BuildUrl(EnumAppRoutes.SignUp)} state={{ from: location }} />;
  } else if (!isConnected) {
    return <Navigate to={BuildUrl(EnumAppRoutes.SignIn)} state={{ from: location }} />;
  }

  return <>{props.children}</>;
};

export default RequiredAuth;
