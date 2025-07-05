import { useState } from 'react';
import { getStudentByNameOrRollNo } from '../api/studentApi';
import { toast } from 'react-toastify';

export default function SearchStudent() {
  const [query, setQuery] = useState({ name: '', rollNo: '' });
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const params = {};
      if (query.name) params.name = query.name;
      if (query.rollNo) params.rollNo = query.rollNo;

      const res = await getStudentByNameOrRollNo(params);
      setResults(res.data);
    } catch (err) {
      toast.error('Search failed');
    }
  };

  return (
    <div className="text-white">
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by Name"
          value={query.name}
          onChange={(e) => setQuery({ ...query, name: e.target.value })}
          className="bg-gray-800 px-4 py-2 rounded border border-gray-600 text-white w-full"
        />
        <input
          type="text"
          placeholder="Search by Roll No"
          value={query.rollNo}
          onChange={(e) => setQuery({ ...query, rollNo: e.target.value })}
          className="bg-gray-800 px-4 py-2 rounded border border-gray-600 text-white w-full"
        />
        <button
          onClick={handleSearch}
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-4 py-2 rounded"
        >
          🔍 Search
        </button>
      </div>

      {results.length === 0 ? (
        <p className="text-gray-400">No results found.</p>
      ) : (
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
              </tr>
            </thead>
            <tbody>
              {results.map((stu) => (
                <tr key={stu._id} className="hover:bg-gray-800 transition">
                  <td className="px-4 py-3">{stu.name}</td>
                  <td className="px-4 py-3">{stu.rollNo}</td>
                  <td className="px-4 py-3">{stu.class}</td>
                  <td className="px-4 py-3">{stu.section}</td>
                  <td className="px-4 py-3">{stu.email}</td>
                  <td className="px-4 py-3">{stu.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
