import axios from 'axios'

axios.defaults.withCredentials = true
axios.defaults.baseURL = import.meta.env.VITE_URL_API
const accessToken = localStorage.getItem('auth_token')
axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

export default {
  async getCSRF() {
    await axios.get('/sanctum/csrf-cookie')
  },
  
  async index() {
    await this.getCSRF()
    console.log("AUTH INDEX", accessToken);
    return axios.get('/api/')
  },

  async show(id:string) {
    await this.getCSRF()
    console.log("AUTH SHOW", accessToken);
    return axios.get(`/api/urls/${id}`)
  },

  async create(url:string) {
    await this.getCSRF()
    console.log("AUTH SHOW", accessToken);
    return axios.post(`/api/shorten`, {
      "original_url": url
    })
  }
}
