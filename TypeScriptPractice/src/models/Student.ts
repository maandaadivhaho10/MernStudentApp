import mongoose, { Schema, Document } from "mongoose";

export interface IStudent extends Document {
  name: string;
  studentId: string;
  program: string;
  year: number;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const StudentSchema: Schema = new Schema<IStudent>(
  {
    name: { type: String, required: true },
    studentId: { type: String, required: true, unique: true },
    program: { type: String, required: true },
    year: { type: Number, required: true, min: 1, max: 6 },
    email: { type: String, required: true, unique: true },
  },
  { timestamps: true } // adds createdAt & updatedAt
);

export default mongoose.model<IStudent>("Student", StudentSchema, "student");
