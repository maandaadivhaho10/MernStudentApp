import { useEffect, useState } from "react";
import { getStudents, createStudent, updateStudent, deleteStudent } from "../api/studentApi";
import StudentForm from "./StudentForm";
import StudentItem from "./StudentItem";

const StudentList = () => {
  const [students, setStudents] = useState<any[]>([]);
  const [editing, setEditing] = useState<any | null>(null);

  const fetchStudents = async () => {
    const res = await getStudents();
    setStudents(res.data);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleCreate = async (data: any) => {
    if (editing) {
      await updateStudent(editing._id, data);
      setEditing(null);
    } else {
      await createStudent(data);
    }
    fetchStudents();
  };

  const handleEdit = (student: any) => {
    setEditing(student);
  };

  const handleDelete = async (id: string) => {
    await deleteStudent(id);
    fetchStudents();
  };

  return (
    <div>
      <h2>{editing ? "Edit Student" : "Add Student"}</h2>
      <StudentForm onSubmit={handleCreate} initialData={editing || undefined} />
      <h2>All Students</h2>
      {students.map((s) => (
        <StudentItem key={s._id} student={s} onEdit={handleEdit} onDelete={handleDelete} />
      ))}
    </div>
  );
};

export default StudentList;
