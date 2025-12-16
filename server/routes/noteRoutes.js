import express from "express";
import protect from "../middleware/authMiddleware.js";
import { getNotes, createNote,deleteNote } from "../controllers/noteController.js";

const router = express.Router();

router.get("/", protect, getNotes);
router.post("/", protect, createNote);
router.delete("/:id", protect, deleteNote);

export default router;
