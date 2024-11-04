import { Api } from './api-generated';

console.log(process.env);
const api = new Api({
  baseURL: process.env.REACT_APP_API_URL,
});

export default api;
