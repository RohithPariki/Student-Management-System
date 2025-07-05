import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5001/api/students'
});

export const getStudents = () => API.get('/');
export const getStudentByNameOrRollNo = (params) =>
  API.get('/search', { params }); // GET /api/students/search?name=John
export const createStudent = (data) => API.post('/', data);
export const updateStudent = (id, data) => API.put(`/${id}`, data);
export const deleteStudent = (id) => API.delete(`/${id}`);
