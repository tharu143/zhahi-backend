const Student = require("./models/studentModel");

async function getNextStudentId() {
  try {
    const latestStudent = await Student.findOne({}, {}, { sort: { studentId: -1 } });
    if (!latestStudent) return 'zhahi0001'; // Starting ID if no students exist

    const lastId = parseInt(latestStudent.studentId.replace('zhahi', ''));
    const nextId = lastId + 1;
    return `zhahi${nextId.toString().padStart(4, '0')}`;
  } catch (error) {
    console.error('Error generating student ID:', error);
    throw error;
  }
}

module.exports = getNextStudentId;
