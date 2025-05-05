// Importation des modules
import express from "express";
import { upload } from "../middleware/uploadMiddleware.js";

// Importation des controllers
import {
  createAlbum,
  updateAlbum,
  deleteAlbum,
  getAllAlbum,
  getAlbumById,
} from "../controllers/albumControllers.js";

const router = express.Router();

router.post("/create", upload.single("imageURL"), createAlbum);

router.get("/", getAllAlbum);

router.put("/:id", upload.single("imageURL"), updateAlbum);

router.delete("/:id", deleteAlbum);

router.get("/:id", getAlbumById);

export default router;
