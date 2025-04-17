import axios from "axios";

const stats = axios.create({
  baseURL: import.meta.env.VITE_STAT_API,
  headers: {
    "Content-Type": "application/json",
  },
});

export default stats;