import axios from "axios";

const urls = await axios.create({
  baseURL: "http://localhost:9002/api", // Reemplaza con la URL de tu API
  headers: {
    'Content-Type': 'application/json',
    // 'Access-Control-Allow-Origin': '*',
    // 'Access-Control-Allow-Headers': '*',
    // 'Accept': 'application/json, text/plain'
  },
});

export default urls;