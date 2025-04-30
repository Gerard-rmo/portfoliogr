import axios from "axios";

const axiosConfig = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_URL,
  withCredentials: true, // Pour envoyer les cookies lors des requêtes
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest", //protection contre les attaques CSRF
  },
});

export default axiosConfig;
