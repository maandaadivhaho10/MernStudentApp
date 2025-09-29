import express from "express";
import { getStudents, createStudent, updateStudent, deleteStudent } from "../controllers/studentController";
import { protect } from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/", protect, getStudents);
router.post("/", protect, createStudent);
router.put("/:id", protect, updateStudent);
router.delete("/:id", protect, deleteStudent);

export default router;
