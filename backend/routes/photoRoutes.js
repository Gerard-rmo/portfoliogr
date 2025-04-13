// Importation des modules
import express from "express";
import { upload } from "../middleware/uploadMiddleware.js";

// Importation des controllers
import {
  createPhoto,
  updatePhoto,
  deletePhoto,
  getAllPhotos,
} from "../controllers/photoControllers.js";

const router = express.Router();

// Création des routes

// Route pour l'enregistrement d'une photo
router.post("/create", upload.single("imageURL"), createPhoto);

// Route pour récupérer toutes les photos
router.get("/", getAllPhotos);

// Route pour mettre à jour une photo par son ID
router.put("/:id", upload.single("imageURL"), updatePhoto);

// Route pour supprimer une photo par son ID
router.delete("/:id", deletePhoto);

export default router;
