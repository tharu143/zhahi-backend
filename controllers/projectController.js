const Project = require('../models/projectModel');
exports.importProjectsFromExcel = async (req, res) => {
    try {
      const projects = req.body;
  
      // Filter out any empty or invalid objects
      const filteredProjects = projects.filter(project => project.name);
  
      const bulkOps = filteredProjects.map(project => ({
        updateOne: {
          filter: { name: project.name }, // Ensure the filter is unique for each project
          update: { $set: project },
          upsert: true
        }
      }));
  
      const result = await Project.bulkWrite(bulkOps);
  
      // Assuming you want to return all projects
      const allProjects = await Project.find({});
      res.status(200).json(allProjects);
    } catch (error) {
      console.error('Error importing projects:', error);
      res.status(500).json({ message: 'Failed to import projects.', error: error.message });
    }
  };
  