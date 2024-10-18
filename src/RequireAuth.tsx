import React, { useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

export interface PrivateRouteProps {
  children?: Array<React.ReactNode> | React.ReactNode;
}

export const RequireAuth = (props: PrivateRouteProps): JSX.Element => {
  const [cookies] = useCookies(['token']);
  const location = useLocation();

  if (!cookies.token) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  return <>{props.children}</>;
};

export default RequireAuth;
