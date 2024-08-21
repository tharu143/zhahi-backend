// internModel.js
const mongoose = require("mongoose");

const internSchema = new mongoose.Schema(
  {
    name: String,
    department: String,
    degree: String,
    aadharNo: String,
    dob: Date,
    phoneNo: String,
    mailId: String,
    linkedinId: String,
    githubId: String,
    startMonth: String,
    baseDomain: String,
    workTaskDetails: String,
    certificateProvided: Boolean,
    personalDetails: String,
    assignedStaff: { type: mongoose.Schema.Types.ObjectId, ref: "Staff" },
    fileAadhar: String,
    filePhoto: String,
    fileCertificate: String,
  },
  { timestamps: true }
);

const Intern = mongoose.model("Intern", internSchema);

module.exports = Intern;
