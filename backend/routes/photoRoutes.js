// Importation des modules
import express from "express";

// Importation des controllers
import {
  registerPhoto,
  updatePhoto,
  deletePhoto,
  getAllPhoto,
} from "../controllers/photoControllers.js";

const router = express.Router();

// Création des routes

// Route pour l'enregistrement d'une photo
router.post("/register", registerPhoto);

// Route pour récupérer toutes les photos
router.get("/", getAllPhoto);

// Route pour mettre à jour une photo par son ID
router.put("/:id", updatePhoto);

// Route pour supprimer une photo par son ID
router.delete("/:id", deletePhoto);

export default router;
