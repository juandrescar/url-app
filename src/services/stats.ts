import axios from 'axios'

const statsApi = axios.create({
  baseURL: import.meta.env.VITE_STAT_API,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

statsApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export default {  
  async getStatUrl(urlId:number) {
    return statsApi.get(`/stats?urlId=${urlId}`);
  },

  async getPeriod(period:string) {
    const date = new Date().toISOString().split('T')[0];
    return statsApi.get(`/stats/${period}?date=${date}`)
  },

  async getTop(dataUrl:string) {
    return statsApi.get(`/${dataUrl}`)
  },
}
