import pojectModel from "../models/project.model.js";
import projectService from "../services/project.service.js";

// Create Project
export const createProject = async (req, res) => {
  const errors = validationResault(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

//   try {
//     const project = await projectService.createProject(req.body);

//     res.status(201).json({ project });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
};
