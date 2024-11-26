import React, { useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

export interface PrivateRouteProps {
  children?: Array<React.ReactNode> | React.ReactNode;
}

export const RequireAuth = (props: PrivateRouteProps): JSX.Element => {
  const [cookies] = useCookies(['token']);
  const location = useLocation();

  if (!cookies.token && location.pathname === '/order/checkout') {
    return <Navigate to="/authenticate/signup" state={{ from: location }} />;
  } else if (!cookies.token) {
    return <Navigate to="/authenticate/signin" state={{ from: location }} />;
  }

  return <>{props.children}</>;
};

export default RequireAuth;
