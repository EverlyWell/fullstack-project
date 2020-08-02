import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '/api/v1',
  headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
});

export default axiosInstance;