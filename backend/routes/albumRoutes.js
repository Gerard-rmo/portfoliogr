// Importation des modules
import express from "express";
import { upload } from "../middleware/uploadMiddleware.js";
import { adminCheck } from "../middleware/authMiddleware.js";

// Importation des controllers
import {
  createAlbum,
  updateAlbum,
  deleteAlbum,
  getAllAlbum,
} from "../controllers/albumControllers.js";

const router = express.Router();

// Création des routes

// Route pour l'enregistrement d'un album
router.post("/create", upload.single("imageURL"), createAlbum);

// Route pour récupérer tous les albums
router.get("/", getAllAlbum);

// Route pour mettre à jour un album par son ID
router.put("/:id", upload.single("imageURL"), updateAlbum);

// Route pour supprimer un album par son ID
router.delete("/:id", deleteAlbum);

export default router;
