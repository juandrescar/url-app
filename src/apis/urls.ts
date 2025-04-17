import axios from "axios";

const urls = await axios.create({
  baseURL: import.meta.env.VITE_URL_API,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default urls;