const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  rollNo: {
    type: String,
    required: true,
    unique: true
  },
  class: String,
  section: String,
  email: String,
  phone: String
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);
