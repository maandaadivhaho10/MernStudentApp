import express from "express";
import {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from "../controllers/studentController";
import { protect } from "../middlewares/authMiddleware";
import { authorize } from "../middlewares/authorize"; // 👈 new middleware

const router = express.Router();

/**
 * RBAC Example:
 * - Admin: Full access
 * - Teacher: Can view, create, update
 * - Student: Can only view
 */

// Get all students
router.get("/", protect, authorize("admin", "user", "supervisor"), getStudents);

// Create student
router.post("/", protect, authorize("admin", "supervisor"), createStudent);

// Update student
router.put("/:id", protect, authorize("admin", "supervisor"), updateStudent);

// Delete student
router.delete("/:id", protect, authorize("admin"), deleteStudent);

export default router;
