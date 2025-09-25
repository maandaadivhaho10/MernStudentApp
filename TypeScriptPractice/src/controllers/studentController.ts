import { Request, Response } from "express";
import Student from "../models/Student";

// Create student
export const createStudent = async (req: Request, res: Response) => {
  try {
    const student = new Student(req.body);
    const saved = await student.save();
    res.status(201).json(saved);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

// Get all students
export const getStudents = async (_req: Request, res: Response) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// Get by ID
export const getStudentById = async (req: Request, res: Response) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// Update
export const updateStudent = async (req: Request, res: Response) => {
  try {
    const updated = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ message: "Student not found" });
    res.json(updated);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

// Delete
export const deleteStudent = async (req: Request, res: Response) => {
  try {
    const deleted = await Student.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Student not found" });
    res.json({ message: "Student deleted" });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
