import axios from 'axios';
import * as Cookies from 'js-cookie';

const axiosInstance = axios.create({
  baseURL: '/api/v1',
  headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
});

axiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get('userToken');

  if (token && config.method !== 'OPTIONS') {
    config.headers.authorization = token;
  }

  return config;
});

export default axiosInstance;