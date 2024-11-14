import { Api } from './api-generated';

const api = new Api({
  baseURL: import.meta.env.VITE_API_URL,
  securityWorker: accessToken => (accessToken ? { headers: { Authorization: `Bearer ${accessToken}` } } : {}),
});

export default api;
