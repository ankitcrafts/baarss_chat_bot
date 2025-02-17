import pojectModel from "../../models/project.model.js";
import * as projectService from "../../services/poject.service.js";
import userModel from "../../models/user.model.js";
import { validationResult } from "express-validator";

// Create Project
export const createProject = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name } = req.body;
    //   To get the ID of the Logged in User
    const loggedInUserId = await userModel.findOne({ email: req.user.email });
    const userId = loggedInUserId._id;

    const newProject = await projectService.createProjectService({
      name,
      userId,
    });

    res.status(201).json({
      newProject,
      message: "Project Created Successfully",
      status: true,
      code: 201,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message | "Internal Server Error",
      status: false,
      code: 500,
    });
  }
};

// Get All Projects
export const getAllProjects = async (req, res) => {
  try {
    const loggedInUser = await userModel.findOne({
      email: req.user.email,
    });
    const allUserProjects = await projectService.getAllProjectsById({
      userId: loggedInUser._id,
    });

    return res.status(200).json({
      projects: allUserProjects,
      message: "Projects Fetched Successfully",
      status: true,
      code: 200,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message | "Internal Server Error",
      status: false,
      code: 500,
    });
  }
};
