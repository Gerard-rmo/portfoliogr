// Importation des modules
import express from "express";

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
router.post("/create", registerDate);

// Route pour récupérer toutes les dates
router.get("/", getAllDate);

// Route pour mettre à jour une date par son ID
router.put("/:id", updateDate);

// Route pour supprimer une date par son ID
router.delete("/:id", deleteDate);

export default router;
