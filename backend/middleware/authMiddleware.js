import User from "../models/User.js";
import JWT from "jsonwebtoken"; // On importe la bibliothèque `jsonwebtoken` pour travailler avec les JWT.
const JWT_SECRET = process.env.JWT_SECRET;

// Fonction pour protéger les routes
export const protect = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "").trim();

    // Vérifier si le token existe dans l'en-tête Authorization
    if (!token) {
      return res.status(401).json({ message: "Token manquant" });
    }

    // Vérifier la validité du token
    const decoded = JWT.verify(token, JWT_SECRET);

    // Récupérer l'utilisateur associé au token
    req.user = await User.findById(decoded._id);

    // Si l'utilisateur n'existe pas, renvoyer une erreur
    if (!req.user) {
      return res.status(401).json({ message: "Utilisateur non trouvé" });
    }

    next();
  } catch (error) {
    // Gérer les erreurs liées à l'expiration ou invalidité du token
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Token invalide" });
    } else if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expiré" });
    }

    // Erreur générique lors de la vérification du token
    res.status(500).json({
      message: "Erreur lors de la vérification du token",
      error: error.message,
    });
  }
};

// Fonction pour vérifier si l'utilisateur est admin
export const adminCheck = async (req, res, next) => {
  try {
    // Vérifier si l'utilisateur est authentifié
    if (!req.user) {
      return res.status(401).json({ message: "Utilisateur non authentifié" });
    }

    // Vérifier si l'utilisateur est un admin
    if (req.user.role === "admin") {
      return next();
    } else {
      return res.status(403).json({
        message: "Vous n'avez pas l'autorisation d'accéder à cette ressource.",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Erreur d'authentification admin",
      error: error.message,
    });
  }
};
