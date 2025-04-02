// @ts-nocheck
import { useNavigate } from 'react-router-dom';
import { Api } from './api-generated';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';

const api = new Api({
  baseURL: import.meta.env.VITE_API_URL,
  securityWorker: accessToken => (accessToken ? { headers: { Authorization: `Bearer ${accessToken}` } } : {}),
});

export function AxiosInterceptor({ children }: { children: any }) {
  const [cookies, , removeCookies] = useCookies(['token']);
  const navigate = useNavigate();

  useEffect(() => {
    const resInterceptor = (response: any) => {
      return response;
    };

    const errInterceptor = (error: any) => {
      if (error.response.status === 401) {
        var date = new Date();
        var expirationDate = new Date(cookies?.token?.expirationDate);
        if (expirationDate < date) {
          removeCookies('token', { sameSite: true, secure: true, path: '/' });
          navigate('authenticate/signin', {});
        }
      }

      return Promise.reject(error);
    };

    const interceptor = api.instance.interceptors.response.use(resInterceptor, errInterceptor);

    return () => api.instance.interceptors.response.eject(interceptor);
  }, []);

  return children;
}

export default api;
