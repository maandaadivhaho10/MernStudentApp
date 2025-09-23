interface Props {
  student: any;
  onEdit: (student: any) => void;
  onDelete: (id: string) => void;
}

const StudentItem = ({ student, onEdit, onDelete }: Props) => {
  return (
    <div className="rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow bg-white">
      <div className="mb-3">
        <p className="text-base font-semibold">{student.name}</p>
        <p className="text-sm text-gray-500">ID: {student.studentId}</p>
      </div>
      <div className="space-y-1 text-sm">
        <p><span className="text-gray-500">Program:</span> {student.program}</p>
        <p><span className="text-gray-500">Year:</span> {student.year}</p>
        <p className="truncate"><span className="text-gray-500">Email:</span> {student.email}</p>
      </div>
      <div className="mt-4 flex items-center gap-2">
        <button
          onClick={() => onEdit(student)}
          className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(student._id)}
          className="inline-flex items-center rounded-md bg-rose-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/40"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default StudentItem;
