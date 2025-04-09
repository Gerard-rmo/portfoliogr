import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
    withCredentials: true, // Pour envoyer les cookies lors des requêtes
    headers: {
        'Content-Type': 'application/json', 
        'X-Requested-With': 'XMLHttpRequest' //protection contre les attaques CSRF    
    }
});

export default api;

