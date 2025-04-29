import axios from 'axios'
import type { LoginRequest, RegisterRequest } from '../types'

const api = axios.create({
  baseURL: import.meta.env.VITE_URL_API,
  withCredentials: true,
  headers: {
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export default {
  async login(credentials: LoginRequest) {
    return api.post('/api/login', credentials)
  },

  async register(data: RegisterRequest) {
    return api.post('/api/register', data)
  },

  async logout() {
    return api.post('/api/logout')
  },

  async user() {
    return api.get('/api/user')
  }
}
