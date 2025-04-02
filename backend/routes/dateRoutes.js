// Importation des modules
import express from "express";
import { admin, adminCheck } from "../middleware/authMiddleware.js";

// Importation des controllers
import {
  registerDate,
  updateDate,
  deleteDate,
  getAllDate,
} from "../controllers/dateControllers.js";

const router = express.Router();

// Création des routes

// Route pour l'enregistrement d'une date
router.post("/create", adminCheck, registerDate);

// Route pour récupérer toutes les dates
router.get("/", adminCheck, getAllDate);

// Route pour mettre à jour une date par son ID
router.put("/:id", adminCheck, updateDate);

// Route pour supprimer une date par son ID
router.delete("/:id", adminCheck, deleteDate);

export default router;
