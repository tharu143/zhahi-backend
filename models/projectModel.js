const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: { type: String, default: '' },
  work: { type: String, default: '' },
  reportedBy: { type: String, default: '' },
  status: { type: String, default: '' },
  startDate: { type: Date, default: null },
  endDate: { type: Date, default: null },
  projectStatus: { type: String, default: '' },
  files: { type: String, default: '' },
  screenshot: { type: String, default: '' },
  remark: { type: String, default: '' },
  updatedDate: { type: Date, default: null },
});

module.exports = mongoose.model('Project', projectSchema);
