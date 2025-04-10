import axios from "axios";

const stats = axios.create({
  baseURL: "http://localhost:3001", // Reemplaza con la URL de tu API
  headers: {
    "Content-Type": "application/json",
  },
});

export default stats;