import { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createStudent, updateStudent } from '../api/studentApi';
import { toast } from 'react-toastify';

export default function StudentForm({ selectedStudent, onSuccess }) {
  const formik = useFormik({
    initialValues: {
      name: '',
      rollNo: '',
      class: '',
      section: '',
      email: '',
      phone: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      rollNo: Yup.string()
        .required('Roll No is required')
        .matches(/^20\d{2}[A-Z]{3}-0\d{2}$/, 'Format: 20xxXXX-0yy'),
      class: Yup.string(),
      section: Yup.string(),
      email: Yup.string().email('Invalid email'),
      phone: Yup.string().matches(/^[0-9]{10}$/, 'Must be 10 digits')
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        if (selectedStudent) {
          await updateStudent(selectedStudent._id, values);
          toast.success('Student updated');
        } else {
          await createStudent(values);
          toast.success('Student added');
        }
        resetForm();
        onSuccess();
      } catch (err) {
        toast.error('Submission failed');
      }
    },
    enableReinitialize: true
  });

  useEffect(() => {
    if (selectedStudent) {
      formik.setValues(selectedStudent);
    }
  }, [selectedStudent]);

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-semibold text-green-600 mb-4">
        {selectedStudent ? 'Edit Student' : 'Add Student'}
      </h2>

      {['name', 'rollNo', 'class', 'section', 'email', 'phone'].map((field) => (
        <div key={field} className="flex flex-col">
          <input
            type="text"
            name={field}
            value={formik.values[field]}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formik.touched[field] && formik.errors[field] && (
            <span className="text-sm text-red-500 mt-1">
              {formik.errors[field]}
            </span>
          )}
        </div>
      ))}

      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
      >
        {selectedStudent ? 'Update' : 'Add'}
      </button>
    </form>
  );
}
