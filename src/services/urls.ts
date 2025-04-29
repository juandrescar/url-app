import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_URL_API,
  withCredentials: true,
  headers: {},
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export default {
  async index() {
    return api.get('/api/')
  },

  async show(id:string) {
    return api.get(`/api/urls/${id}`)
  },

  async create(url:string) {
    return api.post(`/api/shorten`, {
      "original_url": url
    })
  }
}
