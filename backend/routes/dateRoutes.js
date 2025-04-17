import express from "express";
import {
  registerDate,
  updateDate,
  deleteDate,
  getAllDate,
} from "../controllers/dateControllers.js";

const router = express.Router();

router.post("/", registerDate);
router.get("/", getAllDate);
router.put("/:id", updateDate);
router.delete("/:id", deleteDate);

export default router;
