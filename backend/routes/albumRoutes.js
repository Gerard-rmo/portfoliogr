// Importation des modules
import express from "express";
import multer, { diskStorage } from "multer";

// Importation des controllers
import {
  createAlbum,
  updateAlbum,
  deleteAlbum,
  getAllAlbum,
} from "../controllers/albumControllers.js";

const storage = diskStorage({
  destination: function (req, file, cb) {
    cb(null, "upload/");
  },
  filename:function (req, file, cb) {
    const uniqueSuffix = Date.now ()+"-"+Math.round(Math.random()*1E9);
    cb(null,uniqueSuffix+"-"+file.originalname);
  }
});

const upload = multer({ storage: storage });

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
