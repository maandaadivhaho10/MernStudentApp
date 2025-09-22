import { useState, useEffect } from "react";

interface Props {
  onSubmit: (data: any) => void;
  initialData?: any;
}

const StudentForm = ({ onSubmit, initialData }: Props) => {
  const [student, setStudent] = useState({
    name: "",
    studentId: "",
    program: "",
    year: 1,
    email: "",
  });

  useEffect(() => {
    if (initialData) setStudent(initialData);
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(student);
    setStudent({ name: "", studentId: "", program: "", year: 1, email: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" value={student.name} onChange={handleChange} required />
      <input name="studentId" placeholder="Student ID" value={student.studentId} onChange={handleChange} required />
      <input name="program" placeholder="Program" value={student.program} onChange={handleChange} required />
      <input type="number" name="year" placeholder="Year" value={student.year} onChange={handleChange} required min={1} />
      <input type="email" name="email" placeholder="Email" value={student.email} onChange={handleChange} required />
      <button type="submit">Save</button>
    </form>
  );
};

export default StudentForm;
