// Importation des modules
import express from "express";

// Importation des controllers
import {
  registerAlbum,
  updateAlbum,
  deleteAlbum,
  getAllAlbum,
} from "../controllers/albumControllers.js";

const router = express.Router();

// Création des routes

// Route pour l'enregistrement d'un album
router.post("/register", registerAlbum);

// Route pour récupérer tous les albums
router.get("/", getAllAlbum);

// Route pour mettre à jour un album par son ID
router.put("/:id", updateAlbum);

// Route pour supprimer un album par son ID
router.delete("/:id", deleteAlbum);

export default router;
