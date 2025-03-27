// Importer les modules nécessaires
import express from "express";

// Importer les middleware pour la protection et la gestion des rôles
import { protect, adminCheck } from "../middleware/authMiddleware.js";

// Importer les controllers
import {
  registerUser,
  updateUser,
  deleteUser,
  login,
} from "../controllers/userControllers.js";

// Importer le middleware de validation des requêtes
import { validateRequest } from "../middleware/validateRequest.js";

// Importer les fonctions de validation spécifiques aux utilisateurs
import {
  validateRegisterUser,
  validateUpdateUser,
  validateDeleteUser,
} from "../validations/authValidation.js";

const router = express.Router();

// Créer des routes

// Route pour l'enregistrement d'un utilisateur
// La validation de l'enregistrement est effectuée avant de passer à la création de l'utilisateur
router.post("/register", validateRegisterUser, validateRequest, registerUser);

// Route pour mettre à jour un utilisateur par ID (protégée, avec validation des données)
router.put("/:id", protect, validateUpdateUser, validateRequest, updateUser);

// Route pour supprimer un utilisateur par ID (protégée, avec validation des données)
router.delete("/:id", protect, validateDeleteUser, validateRequest, deleteUser);

// Route pour la connexion d'un utilisateur
router.post("/login", login);

export default router;
