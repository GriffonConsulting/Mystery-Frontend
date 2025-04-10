// @ts-nocheck
import { useNavigate } from 'react-router-dom';
import { Api } from './api-generated';
import { useEffect } from 'react';
import { useAuth } from '../Hooks/useAuth';

const api = new Api({
  baseURL: import.meta.env.VITE_API_URL,
});

export function AxiosInterceptor({ children }: { children: any }) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const resInterceptor = (response: any) => {
      return response;
    };

    const errInterceptor = (error: any) => {
      if (error.response.status === 401) {
        logout();
      }

      return Promise.reject(error);
    };

    const interceptor = api.instance.interceptors.response.use(resInterceptor, errInterceptor);

    return () => api.instance.interceptors.response.eject(interceptor);
  }, []);

  return children;
}

export default api;
