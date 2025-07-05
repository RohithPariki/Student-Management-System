import { useEffect, useState } from 'react';
import { getStudents, deleteStudent } from '../api/studentApi';
import { toast } from 'react-toastify';

export default function StudentList({ onEdit }) {
  const [students, setStudents] = useState([]);

  const loadStudents = async () => {
    try {
      const res = await getStudents();
      setStudents(res.data);
    } catch (err) {
      toast.error('Failed to fetch students');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteStudent(id);
      toast.success('Student deleted');
      loadStudents();
    } catch {
      toast.error('Delete failed');
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  if (students.length === 0) {
    return (
      <div className="text-center py-10 text-gray-300">
        <img
          src="https://illustrations.popsy.co/gray/student-taking-notes.svg"
          alt="No students"
          className="mx-auto w-52 opacity-80 mb-4"
        />
        <p className="text-lg">No students found. Try adding one!</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-700 rounded text-sm text-gray-200 bg-gray-900">
        <thead className="bg-gray-800 text-gray-300 uppercase text-xs">
          <tr>
            <th className="px-4 py-3 text-left">Name</th>
            <th className="px-4 py-3 text-left">Roll No</th>
            <th className="px-4 py-3 text-left">Class</th>
            <th className="px-4 py-3 text-left">Section</th>
            <th className="px-4 py-3 text-left">Email</th>
            <th className="px-4 py-3 text-left">Phone</th>
            <th className="px-4 py-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((stu) => (
            <tr
              key={stu._id}
              className="hover:bg-gray-800 transition duration-200"
            >
              <td className="px-4 py-3">{stu.name}</td>
              <td className="px-4 py-3">{stu.rollNo}</td>
              <td className="px-4 py-3">{stu.class}</td>
              <td className="px-4 py-3">{stu.section}</td>
              <td className="px-4 py-3">{stu.email}</td>
              <td className="px-4 py-3">{stu.phone}</td>
              <td className="px-4 py-3 space-x-3">
                <button
                  onClick={() => onEdit(stu)}
                  title="Edit"
                  className="text-blue-400 hover:text-blue-300 transition"
                >
                  ✏️
                </button>
                <button
                  onClick={() => handleDelete(stu._id)}
                  title="Delete"
                  className="text-red-400 hover:text-red-300 transition"
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
