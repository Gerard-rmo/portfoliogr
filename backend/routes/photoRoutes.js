import express from "express";
import { upload } from "../middleware/uploadMiddleware.js";
import {
  createPhoto,
  updatePhoto,
  deletePhoto,
  getAllPhotos,
} from "../controllers/photoControllers.js";

const router = express.Router();

router.post("/", upload.single("image"), createPhoto);

router.get("/", getAllPhotos);

router.put("/:id", upload.single("image"), updatePhoto);

router.delete("/:id", deletePhoto);

export default router;
