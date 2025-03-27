// Importation des modules
import express from "express";

// Importation des controllers
import {
  registerPresse,
  updatePresse,
  deletePresse,
  getAllPresse,
} from "../controllers/presseControllers.js";

const router = express.Router();

// Création des routes

// Route pour l'enregistrement d'un article de presse
router.post("/register", registerPresse);

// Route pour récupérer tous les articles de presse
router.get("/", getAllPresse);

// Route pour mettre à jour un article de presse par son ID
router.put("/:id", updatePresse);

// Route pour supprimer un article de presse par son ID
router.delete("/:id", deletePresse);

export default router;
