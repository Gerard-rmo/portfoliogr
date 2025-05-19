import express from "express"; //création d'un serveur web
import dotenv from "dotenv"; //  gestion des variables d'environnement
import connectDB from "./config/db.js"; // connexion à la base de données
import cloudinaryConfig from "./config/cloudinary.js";
import userRoutes from "./routes/userRoutes.js";
import albumRoutes from "./routes/albumRoutes.js";
import dateRoutes from "./routes/dateRoutes.js";
import photoRoutes from "./routes/photoRoutes.js";
import errorHandler from "./middleware/errorHandler.js"; // gestionnaire d'erreurs.
import helmet from "helmet"; //  la sécurité de l'application
import cookieParser from "cookie-parser"; // cookie-parser pour analyser les cookies
import cors from "cors"; // gérer les requêtes cross-origin
import rateLimit from "express-rate-limit"; // limitation des requêtes.

dotenv.config(); // Chargement des variables d'environnement à partir d'un fichier .env
const app = express(); // Création d'une instance de l'application Express

connectDB();

cloudinaryConfig();

// Middleware pour gérer les requêtes cross-origin
app.use(
  cors({
    origin: [
      "http://localhost:5170",
      "https://res.cloudinary.com", // For Cloudinary
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  })
);

// Middleware pour sécuriser l'application
app.use(helmet());

// Rate limiting middleware pour limiter le nombre de requêtes
// à l'API afin de prévenir les abus
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 500,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: 429,
    message: "Trop de requêtes, veuillez réessayer plus tard",
  },
  skip: (req) => {
    // Skip rate limiting for local development
    return process.env.NODE_ENV === "development";
  },
});

// Application du middleware de limitation de taux à toutes les requêtes vers l'API
// limite le nombre de requêtes à 500 toutes les 15 minutes
app.use("/api/", apiLimiter);

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
const PORT = process.env.PORT || 3005;

// Démarrer le serveur avec un message de confirmation
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
