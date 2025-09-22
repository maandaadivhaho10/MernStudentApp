

interface Props {
  student: any;
  onEdit: (student: any) => void;
  onDelete: (id: string) => void;
}

const StudentItem = ({ student, onEdit, onDelete }: Props) => {
  return (
    <div style={{ border: "1px solid gray", margin: "5px", padding: "5px" }}>
      <p>Name: {student.name}</p>
      <p>ID: {student.studentId}</p>
      <p>Program: {student.program}</p>
      <p>Year: {student.year}</p>
      <p>Email: {student.email}</p>
      <button onClick={() => onEdit(student)}>Edit</button>
      <button onClick={() => onDelete(student._id)}>Delete</button>
    </div>
  );
};

export default StudentItem;
