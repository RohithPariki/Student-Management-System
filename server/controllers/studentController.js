const Student = require('../models/Student');

// GET all students
exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching students', error });
  }
};

//getstudent by name or rollno
exports.getStudentByNameOrRollNo = async (req, res) => {
  const { name, rollNo } = req.query;
  try {
    const query = {};
    if (name) query.name = new RegExp(name, 'i'); // Case-insensitive search
    if (rollNo) query.rollNo = rollNo;

    const students = await Student.find(query);
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: 'Error searching students', error });
  }
};

// POST create a new student
exports.createStudent = async (req, res) => {
  try {
    const student = new Student(req.body);
    const savedStudent = await student.save();
    res.status(201).json(savedStudent);
  } catch (error) {
    res.status(400).json({ message: 'Error creating student', error });
  }
};

// PUT update a student
exports.updateStudent = async (req, res) => {
  try {
    const updated = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Student not found' });
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: 'Error updating student', error });
  }
};

// DELETE a student
exports.deleteStudent = async (req, res) => {
  try {
    const deleted = await Student.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Student not found' });
    res.status(200).json({ message: 'Student deleted' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting student', error });
  }
};
