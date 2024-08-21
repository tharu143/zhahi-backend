const Intern = require("../models/internModel");

exports.getInterns = async (req, res) => {
  try {
    const interns = await Intern.find().populate("assignedStaff");
    console.log("Interns fetched:", interns);
    res.json(interns);
  } catch (error) {
    console.error("Error fetching interns:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.createIntern = async (req, res) => {
  try {
    console.log("Creating intern with data:", req.body);
    const intern = new Intern(req.body);
    await intern.save();
    res.status(201).json(intern);
  } catch (error) {
    console.error("Error creating intern:", error);
    res.status(400).json({ error: error.message });
  }
};

exports.updateIntern = async (req, res) => {
  try {
    console.log(
      "Updating intern with ID:",
      req.params.id,
      "and data:",
      req.body
    );
    const intern = await Intern.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!intern) return res.status(404).json({ error: "Intern not found" });
    res.json(intern);
  } catch (error) {
    console.error("Error updating intern:", error);
    res.status(400).json({ error: error.message });
  }
};

exports.deleteIntern = async (req, res) => {
  try {
    console.log("Deleting intern with ID:", req.params.id);
    const intern = await Intern.findByIdAndDelete(req.params.id);
    if (!intern) return res.status(404).json({ error: "Intern not found" });
    res.json({ message: "Intern deleted" });
  } catch (error) {
    console.error("Error deleting intern:", error);
    res.status(400).json({ error: error.message });
  }
};

exports.searchInterns = async (req, res) => {
  const { name } = req.query;
  try {
    const interns = await Intern.find({ name: new RegExp(name, "i") });
    res.json(interns);
  } catch (error) {
    res.status(500).json({ message: "Error fetching interns", error });
  }
};
