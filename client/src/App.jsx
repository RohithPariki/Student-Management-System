import { useState } from 'react';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import SearchStudent from './components/SearchStudent';
import { motion, AnimatePresence } from 'framer-motion';

export default function App() {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [view, setView] = useState('none');

  const handleSuccess = () => {
    setRefresh(!refresh);
    setSelectedStudent(null);
    setView('list');
  };

  const handleEdit = (student) => {
    setSelectedStudent(student);
    setView('form');
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <h1 className="text-5xl text-center font-bold text-blue-400 mb-10">
        🎓 Student Management System
      </h1>

      {/* Buttons to toggle views */}
      <div className="flex flex-wrap justify-center gap-6 mb-8">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white text-xl px-6 py-4 rounded-xl shadow-lg transition"
          onClick={() => {
            setView('list');
            setSelectedStudent(null);
          }}
        >
          📋 Show Students
        </button>

        <button
          className="bg-green-500 hover:bg-green-600 text-white text-xl px-6 py-4 rounded-xl shadow-lg transition"
          onClick={() => {
            setView('form');
            setSelectedStudent(null);
          }}
        >
          ➕ Add Student
        </button>

        <button
          className="bg-yellow-500 hover:bg-yellow-600 text-black text-xl px-6 py-4 rounded-xl shadow-lg transition"
          onClick={() => {
            setView('search');
            setSelectedStudent(null);
          }}
        >
          🔍 Search Students
        </button>
      </div>

      {/* Content display with transition */}
      <div className="max-w-4xl mx-auto bg-gray-900 p-6 rounded-xl shadow-lg transition-all duration-300 border border-gray-700">
        <AnimatePresence mode="wait">
          {view === 'form' && (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <StudentForm selectedStudent={selectedStudent} onSuccess={handleSuccess} />
            </motion.div>
          )}

          {view === 'list' && (
            <motion.div
              key="list"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <StudentList key={refresh} onEdit={handleEdit} />
            </motion.div>
          )}

          {view === 'search' && (
            <motion.div
              key="search"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <SearchStudent />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
