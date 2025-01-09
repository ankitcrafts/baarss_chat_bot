import projectModel from "../models/project.model.js";
import mongoose from "mongoose";

export const createProjectService = async ({ name, userId }) => {
  if (!name) {
    throw new Error("Name is required");
  }
  if (!userId) {
    throw new Error("User ID is required");
  }

  let project;
  try {
    project = await projectModel.create({
      name,
      users: [userId],
    });
  } catch (error) {
    if (error.code === 11000) {
      throw new Error("Project name already exists");
    }
    throw error;
  }

  return project;
};

export const getAllProjectsById = async ({  userId }) => {
  if (!userId) {
    throw new Error('User ID is required');
  }

  const allUserProjects = await projectModel.find({
    users: userId,
  });
  
  return allUserProjects; 
}
