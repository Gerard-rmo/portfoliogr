import axios from "axios";

const axiosConfig = axios.create({
  baseURL: "http://localhost:3007/api",
  withCredentials: true, // Pour envoyer les cookies lors des requêtes
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest", //protection contre les attaques CSRF
  },
});

export default axiosConfig;
