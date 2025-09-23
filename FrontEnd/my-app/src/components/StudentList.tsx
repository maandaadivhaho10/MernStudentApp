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
    <section id="students" className="space-y-8">
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold">{editing ? "Edit Student" : "Add Student"}</h2>
        <StudentForm onSubmit={handleCreate} initialData={editing || undefined} />
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">All Students</h2>
          <span className="text-sm text-gray-500">{students.length} total</span>
        </div>

        {students.length === 0 ? (
          <div className="grid place-items-center rounded-lg border border-dashed border-gray-300 p-10 text-center text-gray-500">
            No students yet. Add your first student above.
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {students.map((s) => (
              <StudentItem key={s._id} student={s} onEdit={handleEdit} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default StudentList;
