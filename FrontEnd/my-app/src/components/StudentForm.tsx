import { useState, useEffect } from "react";

interface Props {
  onSubmit: (data: any) => void;
  initialData?: any;
}

const inputStyles =
  "mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40";

const labelStyles = "text-sm font-medium text-gray-700";

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
    <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
      <div>
        <label htmlFor="name" className={labelStyles}>Name</label>
        <input id="name" name="name" placeholder="Jane Doe" value={student.name} onChange={handleChange} required className={inputStyles} />
      </div>

      <div>
        <label htmlFor="studentId" className={labelStyles}>Student ID</label>
        <input id="studentId" name="studentId" placeholder="S123456" value={student.studentId} onChange={handleChange} required className={inputStyles} />
      </div>

      <div>
        <label htmlFor="program" className={labelStyles}>Program</label>
        <input id="program" name="program" placeholder="Computer Science" value={student.program} onChange={handleChange} required className={inputStyles} />
      </div>

      <div>
        <label htmlFor="year" className={labelStyles}>Year</label>
        <input id="year" type="number" name="year" placeholder="1" value={student.year} onChange={handleChange} required min={1} className={inputStyles} />
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="email" className={labelStyles}>Email</label>
        <input id="email" type="email" name="email" placeholder="jane@university.edu" value={student.email} onChange={handleChange} required className={inputStyles} />
      </div>

      <div className="sm:col-span-2 flex items-center justify-end gap-3">
        <button
          type="submit"
          className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default StudentForm;