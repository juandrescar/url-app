import axios from 'axios'
import type { LoginRequest, RegisterRequest } from '../types'

axios.defaults.withCredentials = true
axios.defaults.baseURL = import.meta.env.VITE_URL_API

export default {
  async getCSRF() {
    await axios.get('/sanctum/csrf-cookie')
  },

  async login(credentials: LoginRequest) {
    console.log("CRE", credentials);
    await this.getCSRF()
    return axios.post('/api/login', credentials)
  },

  async register(data: RegisterRequest) {
    await this.getCSRF()
    return axios.post('/api/register', data)
  },

  async logout() {
    return axios.post('/api/logout')
  },

  async user() {
    return axios.get('/api/user')
  }
}
