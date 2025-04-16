import express from "express"; // Importation d'express pour créer un serveur web
import dotenv from "dotenv"; // Importation de dotenv pour la gestion des variables d'environnement
import connectDB from "./config/db.js"; // Importation de la fonction de connexion à la base de données
import cloudinaryConfig from "./config/cloudinary.js";
import userRoutes from "./routes/userRoutes.js"; // Importation des routes utilisateur
import albumRoutes from "./routes/albumRoutes.js"; // Importation des routes des albums BD.
import dateRoutes from "./routes/dateRoutes.js"; // Importation des routes des dates des salons.
import photoRoutes from "./routes/photoRoutes.js"; // Importation des routes photos des salons.
import errorHandler from "./middleware/errorHandler.js"; // Importation du gestionnaire d'erreurs.
import helmet from "helmet"; // Importation de helmet pour la sécurité de l'application
import cookieParser from "cookie-parser"; // Importation de cookie-parser pour analyser les cookies
import cors from "cors"; // Importation de cors pour gérer les requêtes cross-origin
import rateLimit from "express-rate-limit"; // Importation de express-rate-limit pour limiter les requêtes

dotenv.config(); // Chargement des variables d'environnement à partir d'un fichier .env
const app = express(); // Création d'une instance de l'application Express

// Connexion à la base de données
connectDB();

// Configuration Cloudinary
cloudinaryConfig();

// Middleware pour gérer les requêtes cross-origin
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://res.cloudinary.com", // For Cloudinary
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  })
);

// Middleware pour sécuriser l'application
app.use(helmet());

// Limite de requêtes pour éviter le spam
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // 50 requêtes
});

app.use(limiter); // Utilisation du middleware de limitation des requêtes

// Middleware pour analyser les requêtes avec des URL encodées
app.use(express.urlencoded({ extended: true }));

// Middleware pour analyser les requêtes avec du JSON
app.use(express.json());

// Middleware pour analyser les cookies
app.use(cookieParser());

app.use("/uploads", express.static("uploads"));

// Définition des routes de l'application
app.use("/api/user", userRoutes); // Routes utilisateur
app.use("/api/albums", albumRoutes); // Routes des albums
app.use("/api/dates", dateRoutes); // Routes des dates des salons
app.use("/api/photos", photoRoutes); // Routes des photos des salons

// Middleware pour gérer les erreurs
app.use(errorHandler);

// Récupération du port à partir des variables d'environnement ou 3007 par défaut
const PORT = process.env.PORT || 3007;

// Démarrer le serveur avec un message de confirmation
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
