import { Api } from './api-generated';

const api = new Api({
  baseURL: process.env.REACT_APP_API_URL,
  securityWorker: accessToken => (accessToken ? { headers: { Authorization: `Bearer ${accessToken}` } } : {}),
});

export default api;
